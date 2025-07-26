Advanced Archetype Techniques
=============================

In this lesson, we will explore advanced techniques for developing sophisticated
archetypes in Cyclus. These techniques go beyond the basic toolkit features and
enable more complex, realistic, and powerful agent behaviors.

In this lesson, we will:

1. Master the MatQuery toolkit for material analysis
2. Implement direct DRE functions without toolkit policies
3. Use time series recording for advanced analytics
4. Add position tracking and geospatial capabilities
5. Implement custom database tables and logging
6. Explore advanced toolkit features and patterns

Material Query and Analysis
--------------------------

The ``cyclus::toolkit::MatQuery`` class provides powerful tools for analyzing
material compositions and properties. This is essential for sophisticated
archetypes that need to make decisions based on material characteristics.

Basic MatQuery Usage
++++++++++++++++++++

MatQuery allows you to easily extract information from material objects:

.. code-block:: c++

    #include "toolkit/mat_query.h"
    
    void MyFacility::AnalyzeMaterial(Material::Ptr mat) {
      cyclus::toolkit::MatQuery mq(mat);
      
      // Get basic quantities
      double total_mass = mq.qty();  // Total mass in kg
      
      // Get nuclide-specific information
      double u235_mass = mq.mass(922350000);  // Mass of U-235 in kg
      double u235_moles = mq.moles(922350000);  // Moles of U-235
      double u235_mass_frac = mq.mass_frac(922350000);  // Mass fraction
      double u235_atom_frac = mq.atom_frac(922350000);  // Atom fraction
      
      // Work with sets of nuclides
      std::set<cyclus::Nuc> uranium_nuclides;
      uranium_nuclides.insert(922350000);
      uranium_nuclides.insert(922380000);
      double total_u_mass_frac = mq.mass_frac(uranium_nuclides);
    }

Advanced Material Analysis
+++++++++++++++++++++++++

MatQuery is particularly useful for enrichment facilities and other
composition-sensitive processes:

.. code-block:: c++

    bool EnrichmentFacility::ValidFeed(Material::Ptr mat) {
      cyclus::toolkit::MatQuery mq(mat);
      
      // Check for sufficient uranium content
      double u235_frac = mq.atom_frac(922350000);
      double u238_frac = mq.atom_frac(922380000);
      double total_u_frac = u235_frac + u238_frac;
      
      // Must have uranium and reasonable enrichment
      if (total_u_frac < 0.001) return false;  // No uranium
      if (u235_frac / total_u_frac > 0.05) return false;  // Too enriched
      
      return true;
    }
    
    double EnrichmentFacility::CalculateSWU(Material::Ptr mat, double product_assay) {
      cyclus::toolkit::MatQuery mq(mat);
      
      // Calculate feed assay
      double u235_mass = mq.mass(922350000);
      double u238_mass = mq.mass(922380000);
      double feed_assay = u235_mass / (u235_mass + u238_mass);
      
      // Use enrichment toolkit for SWU calculation
      cyclus::toolkit::Assays assays(feed_assay, product_assay, tails_assay_);
      return cyclus::toolkit::SwuRequired(mat->quantity(), assays);
    }

Direct DRE Implementation
------------------------

While the toolkit provides convenient buy/sell policies, sometimes you need
more control over the DRE process. Here's how to implement DRE functions
directly without using toolkit policies.

Request Generation
+++++++++++++++++

Implementing ``GetMatlRequests()`` gives you complete control over what your
agent requests:

.. code-block:: c++

    std::set<RequestPortfolio<Material>::Ptr> MyFacility::GetMatlRequests() {
      std::set<RequestPortfolio<Material>::Ptr> ports;
      
      // Check if we need material
      double needed = CalculateNeededAmount();
      if (needed <= 0) return ports;
      
      // Create request portfolio
      RequestPortfolio<Material>::Ptr port(new RequestPortfolio<Material>());
      
      // Create material request
      Material::Ptr dummy = Material::CreateUntracked(needed, 
                                                     context()->GetRecipe("nat_u"));
      
      // Add request with commodity and preference
      Request<Material>* req = port->AddRequest(dummy, this, "uranium", 1.0);
      
      // Add capacity constraint if needed
      CapacityConstraint<Material> cc(needed);
      port->AddConstraint(cc);
      
      ports.insert(port);
      return ports;
    }

Bid Generation
+++++++++++++

Implementing ``GetMatlBids()`` allows you to respond to requests with custom logic:

.. code-block:: c++

    std::set<BidPortfolio<Material>::Ptr> MyFacility::GetMatlBids(
        CommodMap<Material>::type& commod_requests) {
      std::set<BidPortfolio<Material>::Ptr> ports;
      
      // Check if we have material to offer
      if (inventory.quantity() <= 0) return ports;
      
      // Create bid portfolio
      BidPortfolio<Material>::Ptr port(new BidPortfolio<Material>());
      
      // Respond to requests for our commodity
      std::vector<Request<Material>*>& requests = commod_requests[out_commodity];
      for (std::vector<Request<Material>*>::iterator it = requests.begin();
           it != requests.end(); ++it) {
        
        double available = inventory.quantity();
        double requested = (*it)->quantity();
        double offer_qty = std::min(available, requested);
        
        if (offer_qty > 0) {
          Material::Ptr offer = inventory.Pop(offer_qty);
          port->AddBid(**it, offer, this);
        }
      }
      
      // Add capacity constraint
      CapacityConstraint<Material> cc(inventory.quantity());
      port->AddConstraint(cc);
      
      ports.insert(port);
      return ports;
    }

Preference Adjustment
++++++++++++++++++++

Implementing ``AdjustMatlPrefs()`` allows you to dynamically adjust trade
preferences based on material characteristics:

.. code-block:: c++

    void MyFacility::AdjustMatlPrefs(PrefMap<Material>::type& prefs) {
      PrefMap<Material>::type::iterator pmit;
      for (pmit = prefs.begin(); pmit != prefs.end(); ++pmit) {
        Request<Material>* req = pmit->first;
        
        // Adjust preferences based on bid characteristics
        for (mit = pmit->second.begin(); mit != pmit->second.end(); ++mit) {
          Bid<Material>* bid = mit->first;
          Material::Ptr offer = bid->offer();
          
          // Prefer material with higher U-235 content
          cyclus::toolkit::MatQuery mq(offer);
          double u235_frac = mq.atom_frac(922350000);
          mit->second = mit->second + u235_frac * 100;
          
          // Penalize material from certain facility types
          if (dynamic_cast<Reactor*>(bid->bidder()) != NULL) {
            mit->second = mit->second - 50;  // Prefer fresh fuel
          }
        }
      }
    }

Trade Execution
++++++++++++++

Implementing trade execution functions gives you control over how trades are
processed:

.. code-block:: c++

    void MyFacility::AcceptMatlTrades(
        const std::vector<std::pair<Trade<Material>, Material::Ptr>>& responses) {
      
      for (std::vector<std::pair<Trade<Material>, Material::Ptr>>::const_iterator it = 
           responses.begin(); it != responses.end(); ++it) {
        
        Material::Ptr mat = it->second;
        std::string commod = it->first.request->commodity();
        
        // Process based on commodity
        if (commod == "uranium") {
          uranium_inventory.Push(mat);
        } else if (commod == "fuel") {
          fuel_inventory.Push(mat);
        }
        
        // Record trade details
        RecordTrade(mat, commod);
      }
    }
    
    void MyFacility::GetMatlTrades(
        const std::vector<Trade<Material>>& trades,
        std::vector<std::pair<Trade<Material>, Material::Ptr>>& responses) {
      
      for (std::vector<Trade<Material>>::const_iterator it = trades.begin();
           it != trades.end(); ++it) {
        
        double requested_qty = it->amt;
        Material::Ptr response = inventory.Pop(requested_qty);
        
        responses.push_back(std::make_pair(*it, response));
      }
    }

Time Series Recording
--------------------

Cyclus provides powerful time series recording capabilities that allow you to
track agent performance over time.

Basic Time Series Recording
++++++++++++++++++++++++++

Use the toolkit's time series functions to record agent metrics:

.. code-block:: c++

    #include "toolkit/timeseries.h"
    
    void MyReactor::Tock() {
      // Record power output
      if (is_operating) {
        cyclus::toolkit::RecordTimeSeries<cyclus::toolkit::POWER>(this, power_output);
        cyclus::toolkit::RecordTimeSeries<double>("supplyPOWER", this, power_output);
      } else {
        cyclus::toolkit::RecordTimeSeries<cyclus::toolkit::POWER>(this, 0);
        cyclus::toolkit::RecordTimeSeries<double>("supplyPOWER", this, 0);
      }
      
      // Record custom metrics
      cyclus::toolkit::RecordTimeSeries<double>("fuel_inventory", this, 
                                               fuel_inventory.quantity());
      cyclus::toolkit::RecordTimeSeries<double>("core_temperature", this, 
                                               core_temperature);
    }

Custom Time Series
+++++++++++++++++

You can create custom time series for any metric:

.. code-block:: c++

    void EnrichmentFacility::Tock() {
      // Record enrichment-specific metrics
      cyclus::toolkit::RecordTimeSeries<cyclus::toolkit::ENRICH_SWU>(this, 
                                                                     swu_used);
      cyclus::toolkit::RecordTimeSeries<cyclus::toolkit::ENRICH_FEED>(this, 
                                                                      feed_used);
      
      // Record custom metrics
      cyclus::toolkit::RecordTimeSeries<double>("tails_assay", this, tails_assay);
      cyclus::toolkit::RecordTimeSeries<double>("product_assay", this, product_assay);
      cyclus::toolkit::RecordTimeSeries<double>("separation_factor", this, 
                                               separation_factor);
    }

Position Tracking
----------------

The position toolkit allows you to add geographic coordinates to your agents,
enabling spatial analysis and regional modeling.

Adding Position to Archetypes
++++++++++++++++++++++++++++

Include the position snippet in your archetype header:

.. code-block:: c++

    #include "toolkit/position.h"
    
    class MyFacility : public cyclus::Facility {
     public:
      MyFacility(cyclus::Context* ctx);
      virtual ~MyFacility() {}
      
      virtual void EnterNotify();
      
     private:
      // Include the position snippet
      #include "toolkit/position.cycpp.h"
      
      // Your other member variables...
    };

Initializing Position
++++++++++++++++++++

Initialize the position in your ``EnterNotify()`` method:

.. code-block:: c++

    void MyFacility::EnterNotify() {
      // Initialize position with user-provided coordinates
      InitializePosition();
      
      // You can also set position programmatically
      coordinates.set_position(latitude, longitude);
      coordinates.RecordPosition(this);
    }

Using Position Data
++++++++++++++++++

You can use position data for distance calculations and regional analysis:

.. code-block:: c++

    void MyFacility::AdjustMatlPrefs(PrefMap<Material>::type& prefs) {
      PrefMap<Material>::type::iterator pmit;
      for (pmit = prefs.begin(); pmit != prefs.end(); ++pmit) {
        for (mit = pmit->second.begin(); mit != pmit->second.end(); ++mit) {
          Bid<Material>* bid = mit->first;
          Agent* bidder = bid->bidder();
          
          // Prefer nearby suppliers
          if (dynamic_cast<cyclus::Facility*>(bidder) != NULL) {
            cyclus::Facility* facility = dynamic_cast<cyclus::Facility*>(bidder);
            
            // Calculate distance (if both have positions)
            double distance = coordinates.Distance(facility->coordinates);
            
            // Prefer closer suppliers
            mit->second = mit->second + (1000.0 / (distance + 1.0));
          }
        }
      }
    }

Custom Database Tables
---------------------

Cyclus allows you to create custom database tables for detailed analysis and
reporting.

Creating Custom Tables
+++++++++++++++++++++

Use the context's ``NewDatum()`` function to create custom tables:

.. code-block:: c++

    void MyFacility::Tick() {
      // Calculate metrics
      double efficiency = CalculateEfficiency();
      double cost = CalculateOperatingCost();
      double inventory_level = inventory.quantity();
      
      // Record to custom table
      context()->NewDatum("MyFacilityMetrics")
               ->AddVal("AgentId", id())
               ->AddVal("Time", context()->time())
               ->AddVal("Efficiency", efficiency)
               ->AddVal("OperatingCost", cost)
               ->AddVal("InventoryLevel", inventory_level)
               ->AddVal("Status", is_operating ? "operating" : "shutdown")
               ->Record();
    }

Complex Data Recording
+++++++++++++++++++++

You can record complex data structures and relationships:

.. code-block:: c++

    void MyReactor::RecordFuelCycle() {
      // Record fuel cycle information
      context()->NewDatum("FuelCycleData")
               ->AddVal("AgentId", id())
               ->AddVal("Time", context()->time())
               ->AddVal("CycleNumber", current_cycle)
               ->AddVal("FuelAssemblies", core.count())
               ->AddVal("PowerOutput", power_output)
               ->AddVal("Burnup", average_burnup)
               ->Record();
      
      // Record individual assembly data
      for (int i = 0; i < core.count(); i++) {
        Material::Ptr assembly = core.Peek(i);
        cyclus::toolkit::MatQuery mq(assembly);
        
        context()->NewDatum("AssemblyData")
                 ->AddVal("AgentId", id())
                 ->AddVal("Time", context()->time())
                 ->AddVal("AssemblyIndex", i)
                 ->AddVal("U235Content", mq.mass(922350000))
                 ->AddVal("Burnup", assembly_burnup[i])
                 ->Record();
      }
    }

Advanced Toolkit Features
------------------------

Cyclus provides several advanced toolkit features for sophisticated archetypes.

Commodity Producer Manager
++++++++++++++++++++++++++

The commodity producer manager helps track and manage facilities that produce
specific commodities:

.. code-block:: c++

    #include "toolkit/commodity_producer_manager.h"
    
    class MyInstitution : public cyclus::Institution {
     private:
      cyclus::toolkit::CommodityProducerManager manager_;
      
     public:
      virtual void Build(cyclus::Agent* parent) {
        Institution::Build(parent);
        manager_.RegisterAllChildren(this);
      }
      
      virtual void Tick() {
        // Get total capacity for a commodity
        double total_capacity = manager_.TotalCapacity("electricity");
        
        // Check if we need to build more facilities
        if (total_capacity < required_capacity) {
          context()->SchedBuild("PowerPlant");
        }
      }
    };

Symbolic Functions
++++++++++++++++++

The symbolic function toolkit allows you to create mathematical expressions:

.. code-block:: c++

    #include "toolkit/symb_func.h"
    
    void MyFacility::SetupCostFunction() {
      // Create a cost function based on throughput
      cyclus::toolkit::SymbFunctionFactory factory;
      
      // Cost = base_cost + throughput * variable_cost
      std::string expr = "base_cost + throughput * variable_cost";
      cost_function_ = factory.Create(expr);
      
      // Set parameters
      cost_function_->SetVariable("base_cost", 1000.0);
      cost_function_->SetVariable("variable_cost", 50.0);
    }
    
    double MyFacility::CalculateCost(double throughput) {
      cost_function_->SetVariable("throughput", throughput);
      return cost_function_->Eval();
    }

Enrichment Toolkit
++++++++++++++++++

The enrichment toolkit provides specialized functions for enrichment calculations:

.. code-block:: c++

    #include "toolkit/enrichment.h"
    
    double EnrichmentFacility::CalculateEnrichment(Material::Ptr feed,
                                                   double product_assay,
                                                   double tails_assay) {
      cyclus::toolkit::MatQuery mq(feed);
      double feed_assay = mq.atom_frac(922350000);
      
      // Use enrichment toolkit
      cyclus::toolkit::Assays assays(feed_assay, product_assay, tails_assay);
      double swu_required = cyclus::toolkit::SwuRequired(feed->quantity(), assays);
      double feed_required = cyclus::toolkit::FeedQty(feed->quantity(), assays);
      
      return swu_required;
    }

Best Practices for Advanced Archetypes
-------------------------------------

Performance Optimization
++++++++++++++++++++++

* Use MatQuery efficiently - create one instance and reuse it
* Minimize database writes in tight loops
* Use appropriate data structures for your use case

.. code-block:: c++

    class OptimizedFacility : public cyclus::Facility {
     private:
      // Cache MatQuery objects
      std::map<Material::Ptr, cyclus::toolkit::MatQuery> mq_cache_;
      
     public:
      void AnalyzeMaterial(Material::Ptr mat) {
        // Reuse MatQuery objects
        if (mq_cache_.find(mat) == mq_cache_.end()) {
          mq_cache_[mat] = cyclus::toolkit::MatQuery(mat);
        }
        
        cyclus::toolkit::MatQuery& mq = mq_cache_[mat];
        // Use mq for analysis...
      }
    };

Error Handling
++++++++++++++

* Always check for null pointers and valid data
* Use appropriate exception handling
* Provide meaningful error messages

.. code-block:: c++

    void MyFacility::ProcessMaterial(Material::Ptr mat) {
      if (!mat) {
        throw cyclus::ValueError("Material pointer is null");
      }
      
      cyclus::toolkit::MatQuery mq(mat);
      if (mq.qty() <= 0) {
        throw cyclus::ValueError("Material has zero or negative quantity");
      }
      
      // Process material...
    }

Testing Advanced Features
++++++++++++++++++++++++

* Test MatQuery with known compositions
* Verify time series recording
* Test position calculations
* Validate custom database tables

.. code-block:: c++

    TEST(AdvancedFeaturesTest, MatQueryAnalysis) {
      // Create test material
      CompMap comp;
      comp[922350000] = 0.05;  // 5% U-235
      comp[922380000] = 0.95;  // 95% U-238
      Composition::Ptr c = Composition::CreateFromAtom(comp);
      Material::Ptr mat = Material::CreateUntracked(100.0, c);
      
      // Test MatQuery
      cyclus::toolkit::MatQuery mq(mat);
      EXPECT_DOUBLE_EQ(5.0, mq.mass(922350000));
      EXPECT_DOUBLE_EQ(0.05, mq.atom_frac(922350000));
    }

Debugging Advanced Features
++++++++++++++++++++++++++

* Use logging to track complex behaviors
* Add debug output for time series data
* Verify position calculations
* Check database table contents

.. code-block:: c++

    void MyFacility::DebugDRE() {
      LOG(cyclus::LEV_INFO4, "MyFacility") 
          << "Processing DRE at time " << context()->time();
      
      // Log material analysis
      for (auto& mat : inventory.PopN(inventory.count())) {
        cyclus::toolkit::MatQuery mq(mat);
        LOG(cyclus::LEV_INFO5, "MyFacility")
            << "Material: " << mq.qty() << " kg, "
            << "U-235: " << mq.atom_frac(922350000);
      }
    }

The advanced techniques covered in this tutorial enable you to create
sophisticated, realistic archetypes that can model complex fuel cycle
scenarios. By mastering these tools, you can develop archetypes that provide
detailed analysis, accurate physics modeling, and comprehensive reporting
capabilities. 