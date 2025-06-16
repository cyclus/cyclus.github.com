
Advanced Agent Creation
===============================

This chapter offers a comprehensive walkthrough of developing a fully functional and feature-rich **Cyclus Facility archetype**. It is intended for users who have completed the basic C++ agent tutorial and are ready to begin writing production-grade archetypes with more advanced capabilities.

By the end of this chapter, you will understand how to:

* Declare validated input parameters and manage internal state.
* Interact with Cyclus's Dynamic Resource Exchange (DRE) to request and accept trades.
* Use toolkit classes for material management, querying, and time series.
* Implement lifecycle methods (`Tick`, `Tock`, `EnterNotify`) effectively.
* Incorporate logging, testing, and optional output recording.

The concepts are demonstrated using a simplified but illustrative example facility: an **AdvancedReactor**, which consumes fuel, burns it for a defined residence time, and then discharges spent fuel.


1. Agent Structure and Metadata
--------------------------------

Begin by defining the agent header file with proper Cyclus metadata and parameter declarations.

.. code-block:: c++

  // advanced_reactor.h
  #ifndef ADVANCED_REACTOR_H_
  #define ADVANCED_REACTOR_H_

  #include <string>
  #include <queue>
  #include "cyclus.h"
  #include "toolkit/resource_buff.h"
  #include "toolkit/mat_query.h"
  #include "toolkit/commod_map_inst.h"
  #include "toolkit/time_series.h"

  class AdvancedReactor : public cyclus::Facility {
  public:
  AdvancedReactor(cyclus::Context* ctx);
  virtual ~AdvancedReactor() {}

  #pragma cyclus note {
    "doc": "An advanced reactor facility that models fuel intake, burnup, and discharge."
  }


Next, add some core parameters to the advanced reactor:

.. code-block:: c++

  #pragma cyclus var {"tooltip": "Maximum fresh fuel inventory (kg)", "units": "kg"}
  double fresh_fuel_cap;

  #pragma cyclus var {"tooltip": "Maximum spent fuel inventory (kg)", "units": "kg"}
  double spent_fuel_cap;

  #pragma cyclus var {"tooltip": "Residence time in core (timesteps)", "default": 3, "lbound": 1}
  int residence_time;

  #pragma cyclus var {"tooltip": "Input commodity for fresh fuel"}
  std::string in_commodity;

  #pragma cyclus var {"tooltip": "Output commodity for spent fuel"}
  std::string out_commodity;

  #pragma cyclus var {"tooltip": "Recipe for spent fuel"}
  std::string out_recipe;


Add some basic functions to the header file. These will be defined more thoroughly
later on.

.. code-block:: c++

  virtual std::string str();
  virtual void EnterNotify();
  virtual void Tick();
  virtual void Tock();

  // DRE Functions:
  virtual std::set<cyclus::RequestPortfolio<cyclus::Material>::Ptr> GetMatlRequests();
  virtual std::set<cyclus::BidPortfolio<cyclus::Material>::Ptr> GetMatlBids(
      cyclus::CommodMap<cyclus::Material>::type& commod_requests);
  virtual void AcceptMatlTrades(
      const std::map<cyclus::Trade<cyclus::Material>, cyclus::Material::Ptr>& responses);
  virtual cyclus::Material::Ptr OfferMatl(
      cyclus::Material::Ptr request);

Finally, we can add some material buffers and a TimeSeries, then cap the file
off!

.. code-block:: c++
    
  private:
  cyclus::toolkit::ResourceBuff fresh_fuel_;  // buffer for incoming fuel
  cyclus::toolkit::ResourceBuff spent_fuel_;  // buffer for outgoing waste

  std::queue<std::pair<int, cyclus::Material::Ptr>> core_;  // (entry_time, material)

  cyclus::toolkit::TimeSeries<double> power_output_;  // optional logging


  };

  #endif  // ADVANCED_REACTOR_H_


2. Defining Facility Behavior in the .cc File
---------------------------------------------

Implement the generic facility methods:

.. code-block:: c++

  #include "advanced_reactor.h"

  using cyclus::Material;
  using cyclus::Trade;
  using cyclus::Context;

  AdvancedReactor::AdvancedReactor(Context* ctx)
  : cyclus::Facility(ctx),
  fresh_fuel_(), spent_fuel_(), power_output_("power_output") {}

  std::string AdvancedReactor::str() {
    std::stringstream ss;
    ss << Facility::str() << "\n"
    << "Fresh fuel buffer: " << fresh_fuel_.quantity() << " / " << fresh_fuel_cap << " kg\n"
    << "Spent fuel buffer: " << spent_fuel_.quantity() << " / " << spent_fuel_cap << " kg\n"
    << "Core loading: " << core_.size() << " assemblies";
    return ss.str();
  }

  void AdvancedReactor::EnterNotify() {
    cyclus::Facility::EnterNotify();
    fresh_fuel_.capacity(fresh_fuel_cap);
    spent_fuel_.capacity(spent_fuel_cap);
  }

In this facility, the tick function will simply check if the fuel has
been in the core for a certain amount of time, and then "discharge" it if so.
Tock, on the other hand, will move fresh fuel to the core if there's room to do
so.

.. code-block:: c++

  void AdvancedReactor::Tick() {
    // discharge spent fuel if residence time reached
    while (!core_.empty() && context()->time() - core_.front().first >= residence_time) {
      cyclus::Material::Ptr m = core_.front().second->Transmute(out_recipe);
      spent_fuel_.Push(m);
      core_.pop();
    }
  }

  void AdvancedReactor::Tock() {
    // move fresh fuel to core if there's room
    while (!fresh_fuel_.empty()) {
      cyclus::Material::Ptr m = fresh_fuel_.Pop();
      core_.push(std::make_pair(context()->time(), m));
    }
  }

Next, we will implement the simplest version of the DRE functions. A more detailed
explaination of these functions, and interacting with the DRE can be found in the
next chapter of this tutorial.

.. code-block:: c++

  std::set<RequestPortfolio<Material>::Ptr> AdvancedReactor::GetMatlRequests() {
    std::set<RequestPortfolio<Material>::Ptr> ports;
    double qty = fresh_fuel_.space();

    if (qty > 0) {
      Material::Ptr dummy = cyclus::NewBlankMaterial(qty);
      RequestPortfolio<Material>::Ptr port(new RequestPortfolio<Material>());
      port->AddRequest(dummy, this, in_commodity);
      ports.insert(port);
    }

    return ports;
  }

  std::set<cyclus::BidPortfolio<Material>::Ptr> AdvancedReactor::GetMatlBids(
  cyclus::CommodMap<Material>::type& commod_requests) {

    std::set<cyclus::BidPortfolio<Material>::Ptr> ports;
    if (spent_fuel_.quantity() <= 0) return ports;

    for (auto& pair : commod_requests[out_commodity]) {
      Material::Ptr offer = spent_fuel_.Peek();
      cyclus::BidPortfolio<Material>::Ptr port(new cyclus::BidPortfolio<Material>());
      port->AddBid(pair, offer, this);
      ports.insert(port);
    }

    return ports;
  }

  void AdvancedReactor::AcceptMatlTrades(
  const std::map<Trade<Material>, Material::Ptr>& responses) {
    for (auto& pair : responses) {
      fresh_fuel_.Push(pair.second);
    }
  }

  Material::Ptr AdvancedReactor::OfferMatl(Material::Ptr request) {
    return spent_fuel_.PopQty(request->quantity());
  }


3. Advanced Features
--------------------

Some additional, often helpful, options that are available in Cyclus are covered
briefly here. `MatQuery` is covered in more depth later in this tutorial, while
other functionality can be found elsewhere on the website.

**a. Material Inspection**

If desired, you can use `cyclus::toolkit::MatQuery` to inspect the isotopic 
makeup of a `Cyclus::Material`:

.. code-block:: c++

  cyclus::toolkit::MatQuery mq(mat);
  double u235 = mq.mass_frac("U235");

This is helpful for tracking enrichment or decay over time, and can be a powerful
tool for many more advanced features you may wish to implement in your agents.

**b. Time Series Logging**

The `TimeSeries` feature can be used to track the value of a variable over time
in the SQLite output file via a unique table:

.. code-block:: c++

  power_output_.Get(context())->AddValue("power_output", current_mw);

**c. Error Handling and Validation**

Logging is one of the most helpful tools we have in CYCLYS to inform users of
the internal state of Agents while the simulation is running. This is a great
debugging tool, and should be used whenever possible. For more information on
the Cyclus logging system, search for "Logging" on the website.

.. code-block:: c++

  if (fresh_fuel_.space() <= 0) {
    LOG(cyclus::WARN) << "No room for new fuel";
  }


4. Testing Notes
----------------

* Use Google Test (`gtest`) in the `tests/` directory.
* Validate:

  * Behavior under full/empty buffer conditions
  * Core loading and discharge timing
  * Material transformation into output recipe


5. Summary and Next Steps
-------------------------

This advanced tutorial walked through the full implementation of a robust Cyclus
Facility agent with:

* Input validation and toolkit buffers
* Core DRE interactions for both input and output commodities
* Material transformation and storage logic
* Optional logging and diagnostics