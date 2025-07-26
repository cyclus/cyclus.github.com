Understanding the Dynamic Resource Exchange (DRE)
=================================================

In this lesson, we will explore the Dynamic Resource Exchange (DRE), which is the
heart of every Cyclus simulation time step. The DRE coordinates the exchange of
resources between agents in the simulation, enabling complex supply chain modeling.

In this lesson, we will:

1. Understand the overall DRE process and its role in simulation
2. Learn about the five phases of the DRE
3. Explore how agents participate in the exchange
4. Understand the relationship between Tick, DRE, and Tock phases
5. See how preferences and constraints work in the exchange

Overview
--------------

The Dynamic Resource Exchange (DRE) is the core mechanism that enables agents in
a Cyclus simulation to trade resources with each other. Every ``Trader`` that is
registered with the simulation ``Context`` is automatically included in the exchange.
Agents can either implement the ``Trader`` interface as a mixin or can be composed
of one or more traders. Note that the ``Facility`` class derives from the
``Trader`` interface, and therefore all agents that derive from ``Facility`` are
also traders.

On each time step, there is a separate ``ResourceExchange`` instance for each
concrete ``Resource`` type (i.e., ``Materials`` and ``Products``) of which the
kernel is aware. For example, there is an exchange for ``Material`` resources and
another for ``Product`` resources.

The DRE operates as a market mechanism where:

* **Consumers** (agents that need resources) issue requests for bids
* **Producers** (agents that have resources) respond with bids
* **Preferences** are assigned to bid-request pairs
* **Constraints** are applied to limit exchanges
* **Trades** are executed based on the solution

The DRE is comprised of five phases which execute in series:

* Request for Bids (RFB) Phase
* Response to Request for Bids (RRFB) Phase  
* Preference Adjustment (PA) Phase
* Solution Phase
* Trade Execution Phase

Understanding the Time Step Structure
------------------------------------

Before diving into the DRE phases, it's important to understand how the DRE fits
into the overall simulation time step structure. Each time step in Cyclus follows
this sequence:

.. code-block:: c++

    // From Timer::RunSim() in src/timer.cc
    DoBuild();                    // Build new agents
    DoTick();                     // Agent Tick phase
    DoResEx(&matl_manager, &genrsrc_manager);  // DRE execution
    DoTock();                     // Agent Tock phase  
    DoDecision();                 // Agent Decision phase
    DoDecom();                    // Decommission agents

The DRE occurs between the ``Tick()`` and ``Tock()`` phases, which means:

* **Tick()** - Agents prepare for the exchange (e.g., update capacity, set preferences)
* **DRE** - The exchange itself occurs
* **Tock()** - Agents respond to the exchange results (e.g., process received materials)

This ordering is critical because it ensures that:
1. All agents have updated their state before the exchange
2. The exchange has access to the most current information
3. Agents can react to exchange results before the next time step

The Five DRE Phases
--------------------

Request for Bids (RFB) Phase
+++++++++++++++++++++++++++++

In the Request for Bids (RFB) phase, the exchange queries all registered traders
regarding their demand for a given resource type. Querying is provided through
the ``Trader`` interface's "get requests" functions for a given resource type,
e.g., ``GetMatlRequests()`` (C++) or ``get_material_requests()`` (Python).

Requests are modeled as collections of ``RequestPortfolio`` instances, where each
portfolio includes a collection of ``Request`` objects and a collection of
``CapacityConstraint`` objects. A portfolio is sufficiently met if one or more
of its constituent requests are met and all of its constraints are satisfied.

A request provides:
* A target resource (quantity and composition)
* A commodity identifier
* A preference for that commodity-resource combination

For example, a reactor facility might request fuel:

.. code-block:: c++

    std::set<RequestPortfolio<Material>::Ptr> Reactor::GetMatlRequests() {
      std::set<RequestPortfolio<Material>::Ptr> ports;
      
      double amt = fresh_fuel_.space();
      if (amt <= 0) return ports;
      
      Material::Ptr dummy = cyclus::NewBlankMaterial(amt);
      RequestPortfolio<Material>::Ptr port(new RequestPortfolio<Material>());
      port->AddRequest(dummy, this, in_commodity);
      ports.insert(port);
      return ports;
    }

Response to Request for Bids (RRFB) Phase
+++++++++++++++++++++++++++++++++++++++++

In the Response to Request for Bids (RRFB) phase, the exchange queries all
registered traders regarding their supply for a given resource type. Querying is
provided through the ``Trader`` interface's "get bids" functions for a given
resource type, e.g., ``GetMatlBids()`` (C++) or ``get_material_bids()`` (Python).

Bids are modeled as collections of ``BidPortfolio`` instances, where each
portfolio includes a collection of ``Bid`` objects and a collection of
``CapacityConstraint`` objects. A portfolio is not violated if any of its
constituent bids are connected to their requests and all of its constraints are
satisfied.

A bid is comprised of:
* A request to which it is responding
* A resource that it is offering in response to the request
* Optional constraints on the bidder's capacity

For example, a fuel fabrication facility might respond to fuel requests:

.. code-block:: c++

    std::set<BidPortfolio<Material>::Ptr> FuelFab::GetMatlBids(
        CommodMap<Material>::type& commod_requests) {
      std::set<BidPortfolio<Material>::Ptr> ports;
      
      std::vector<Request<Material>*>& requests = commod_requests[out_commodity];
      for (std::vector<Request<Material>*>::iterator it = requests.begin();
           it != requests.end(); ++it) {
        double qty = std::min((*it)->quantity(), inventory.quantity());
        if (qty > 0) {
          Material::Ptr offer = inventory.Pop(qty);
          BidPortfolio<Material>::Ptr port(new BidPortfolio<Material>());
          port->AddBid(**it, offer, this);
          ports.insert(port);
        }
      }
      return ports;
    }

Preference Adjustment (PA) Phase
++++++++++++++++++++++++++++++++

In the Preference Adjustment (PA) phase, requesters are allowed to view which
bids were matched to their requests, and adjust their preference for the given
bid-request pairing. Querying is provided through the ``Agent`` interface, so all
Cyclus archetypes may adjust preferences. The "adjust prefs" functions are based
on a given resource type, e.g., ``AdjustMaterialPrefs`` (C++) or
``adjust_material_prefs()`` (Python).

Preferences are used by resource exchange solvers to inform their solution
method. The default preference for all bids is one (1). Agents will only utilize
the PA phase if there is a reason to update preferences over the default
provided in their original request.

Preferences can be adjusted by both the original ``Trader`` placing requests as
well as any parent ``Agent`` instances, with the trader adjusting first and the
most senior parent adjusting last. In the supported Region-Institution-Facility
agent relationship, Facilities adjust first, followed by Institution and Region
parent agents.

For example, an agent might prefer trades with agents of the same type:

.. code-block:: c++

    virtual void Reactor::AdjustMatlPrefs(PrefMap<Material>::type& prefs) {
      PrefMap<Material>::type::iterator pmit;
      for (pmit = prefs.begin(); pmit != prefs.end(); ++pmit) {
        Request<Material>* req = pmit->first;
        Reactor* cast = dynamic_cast<Reactor*>(req->requester());
        if (cast != NULL) {
          // We prefer trading with other reactors
          for (mit = pmit->second.begin(); mit != pmit->second.end(); ++mit) {
            mit->second = mit->second + 10;
          }
        }
      }
    }

Solution Phase
+++++++++++++

The Solution Phase is straightforward from a module developer point of view.
Given requests, bids for those requests, and preferences for each request-bid
pairing, a ``ExchangeSolver`` selects request-bid pairs to satisfy and the
quantity of each resource to assign to each satisfied request-bid pairing.

The solution timing and actual pairings will depend on the concrete solver that
is employed by the Cyclus kernel. The solver uses optimization techniques to
maximize the global preference while satisfying all constraints.

Trade Execution Phase
++++++++++++++++++++

When satisfactory request-bid pairings are determined, a final communication is
executed for each bidder and requester during the Trade Execution Phase.
Bidders are notified of their winning bids through the ``Trader`` "get trades"
functions (e.g., ``GetMatlTrades()`` in C++ and ``get_material_trades()`` in
Python), and requesters are provided their satisfied requests through the
``Trader`` "accept trades" functions (e.g., ``AcceptMatlTrades()`` in C++ and
``accept_material_trades()`` in Python).

For example, a facility might accept material trades:

.. code-block:: c++

    void Reactor::AcceptMatlTrades(const std::vector<Trade<Material>>& trades) {
      std::vector<Trade<Material>>::const_iterator it;
      for (it = trades.begin(); it != trades.end(); ++it) {
        fresh_fuel_.Push(it->bid->offer());
      }
    }

And offer material in trades:

.. code-block:: c++

    void Reactor::GetMatlTrades(const std::vector<Trade<Material>>& trades,
                                std::vector<std::pair<Trade<Material>, Material::Ptr>>& responses) {
      std::vector<Trade<Material>>::const_iterator it;
      for (it = trades.begin(); it != trades.end(); ++it) {
        Material::Ptr response = spent_fuel_.Pop(it->bid->offer()->quantity());
        responses.push_back(std::make_pair(*it, response));
      }
    }

Understanding Constraints
------------------------

Constraints play a crucial role in the DRE by limiting what trades can be made.
There are several types of constraints:

**Capacity Constraints** - Limit the total quantity that can be exchanged
**Exclusive Constraints** - Ensure only one request in a portfolio is satisfied
**Mutual Constraints** - Ensure all requests in a portfolio are satisfied together

For example, an enrichment facility might have a SWU (Separative Work Unit)
constraint:

.. code-block:: c++

    // The facility can only provide 500 SWUs total
    CapacityConstraint<Material> swu_constraint(500.0, swu_conversion);
    port->AddConstraint(swu_constraint);
```

This ensures that the total SWUs used across all bids cannot exceed 500.

Understanding Preferences
-----------------------

Preferences determine which trades are favored in the exchange. Higher preference
values indicate more desirable trades. Preferences can be:

* **Static** - Set when the request is created
* **Dynamic** - Adjusted during the PA phase based on bid characteristics

For example, a repository might prefer material with lower heat load:

.. code-block:: c++

    virtual void Repository::AdjustMatlPrefs(PrefMap<Material>::type& prefs) {
      PrefMap<Material>::type::iterator pmit;
      for (pmit = prefs.begin(); pmit != prefs.end(); ++pmit) {
        for (mit = pmit->second.begin(); mit != pmit->second.end(); ++mit) {
          double heat_load = CalculateHeatLoad(mit->first->bid->offer());
          // Lower heat load = higher preference
          mit->second = mit->second - heat_load;
        }
      }
    }

Debugging the DRE
-----------------

The DRE can be complex, and debugging it can be challenging. Cyclus provides
several tools to help:

**Environment Variable Debugging**
Set the environment variable to enable detailed DRE logging:

.. code-block:: console

    $ export CYCLUS_DEBUG_DRE=1
    $ cyclus input.xml

**Logging Levels**
Use different verbosity levels to see DRE information:

.. code-block:: console

    $ cyclus -v 3 input.xml  # Shows DRE phase information
    $ cyclus -v 4 input.xml  # Shows detailed DRE debugging

**Common Issues**
* **No trades executed** - Check if requests and bids are being generated
* **Unexpected trade quantities** - Check capacity constraints
* **Wrong trades selected** - Check preference values
* **Missing agents** - Ensure agents are properly registered as traders

Best Practices
--------------

When implementing DRE interactions in your archetypes:

1. **Always check capacity** before making requests or bids
2. **Use meaningful preference values** to guide trade selection
3. **Implement constraints carefully** to avoid over-constraining
4. **Test with simple cases first** before complex scenarios
5. **Use logging** to understand what's happening in the exchange
6. **Consider the timing** - Tick() prepares, DRE executes, Tock() responds

The DRE is a powerful mechanism that enables complex supply chain modeling in
Cyclus. Understanding how it works will help you create more effective and
realistic archetypes. 