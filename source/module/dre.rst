.. _dre:

Dynamic Resource Exchange
=========================

The Dynamic Resource Exchange (DRE) is the heart of a |cyclus| simulation time
step. Every ``cyclus::Trader`` that is registered with the ``cyclus::Context``
are automatically included in the exchange. |cyclus| agents can either implement
the ``cyclus::Trader`` interface as a mixin or can be composed of one or more
``cyclus::Trader``\ s. Note that ``cyclus::Facility`` derives the
``cyclus::Trader`` interface, therefore all agents that derive from
``cyclus::Facility`` also get the interface.

At any given time step, there is a separate ``cyclus::ResourceExchange`` 
instance for each concrete ``cyclus::Resource`` of which the kernel is
aware. For example, there is an exchange for ``cyclus::Material``\ s and another
for ``cyclus::Product``\ s.

The DRE is comprised of five phases:

* :ref:`rfb`
* :ref:`rrfb`
* :ref:`adj`
* :ref:`solve`
* :ref:`trade`
* :ref:`examples`

.. _rfb:

Request For Bids Phase
----------------------

In the Request for Bids (RFB) phase, the exchange queries all registered traders
regarding their demand for a given resource type. Querying is provided through
the ``cyclus::Trader`` interface's ``Get*Requests`` for a given resource type,
e.g., ``GetMatlRequests``.

Requests are modeled as collections of ``cyclus::RequestPortfolio``\ s, where each
portfolio includes a collection of ``cyclus::Request``\ s and a collection of
``cyclus::CapacityConstraint``\ s. A portfolio is sufficiently met if one or more
of its constituent requests are met and all of its constraints are satisfied.

A request provides a target resource, a commodity, and a preference for that
commodity-resource combination. A constraint provides a constraining value and a
conversion function that can convert a potential resource into the units of the
capacity (see :ref:`rrfb` for a more detailed example).

For example, consider a facility of type ``FooFac`` that needs 5 kg fuel,
which is a ``cyclus::Material`` resource type. It knows of two commodities in
the simulation that meet its demand, ``FuelA`` and ``FuelB``, and it prefers
``FuelA`` over ``FuelB``. A valid ``GetMatlRequests`` implementation would then
be:

.. code-block:: c++

    virtual std::set<cyclus::RequestPortfolio<cyclus::Material>::Ptr>
        FooFac::GetMatlRequests() {
      using cyclus::RequestPortfolio;
      using cyclus::Material;
      using cyclus::CapacityConstraint;

      double request_qty = 10; // kg
      std::string recipeA = "recipeA";
      std::string commoda = "FuelA";
      Material::Ptr targetA = 
          Material::CreateUntracked(request_qty, context()->GetRecipe(recipeA));

      std::string recipeB = "recipeB";
      std::string commodB = "FuelB";
      Material::Ptr targetB = 
          Material::CreateUntracked(request_qty, context()->GetRecipe(recipeB));
      
      CapacityConstraint<Material> cc(request_qty);
      
      RequestPortfolio<Material>::Ptr port(new RequestPortfolio<Material>());
      port->AddRequest(targeta, this, commodA);
      port->AddRequest(targetb, this, commodB);
      port->AddConstraint(cc);

      std::set<RequestPortfolio<Material>::Ptr> ports();
      ports.insert(port);
      return ports;  
    }

.. _rrfb:

Response to Request For Bids Phase
----------------------------------

In the Response to Request for Bids (RRFB) phase, the exchange queries all
registered traders regarding their supply for a given resource type. Querying is
provided through the ``cyclus::Trader`` interface's ``Get*Bids`` for a given
resource type, e.g., ``GetMatlBids``.

Bids are modeled as collections of ``cyclus::BidPortfolio``\ s, where each
portfolio includes a collection of ``cyclus::Bid``\ s and a collection of
``cyclus::CapacityConstraint``\ s. A portfolio is not violated if any of its
constituent bids are connected to their requests and all of its constraints are
satisfied.

A bid is comprised of a request to which it is responding and a resource that it is
offering in response to the request.

Black Box Examples
++++++++++++++++++

Consider a facility of type ``FooFac`` that has 10 kg of fuel of commodity type
``FuelA`` that it can provide. Furthermore, consider that its capacity to
fulfill orders is constrained by the total amount of a given nuclide. A valid
``GetMatlBids`` implementation would then be:

.. code-block:: c++

    class NucConverter : public cyclus::Converter<cyclus::Material> {
     public:
      NucConverter(int nuc) : nuc_(nuc) {};

      virtual double convert(
          cyclus::Material::Ptr m,
      	  cyclus::Arc const * a = NULL,
      	  cyclus::ExchangeTranslationContext<cyclus::Material> const * ctx = NULL) const {
        cyclus::MatQuery mq(m);
  	return mq.mass(nuc_);
      }

     private:
      int nuc_; 
    };

    virtual std::set<cyclus::BidPortfolio<cyclus::Material>::Ptr>
      FooFac::GetMatlBids(
        cyclus::CommodMap<cyclus::Material>::type& commod_requests) {
      using cyclus::BidPortfolio;
      using cyclus::CapacityConstraint;
      using cyclus::Converter;
      using cyclus::Material;
      using cyclus::Request;

      // respond to all requests of my commodity
      std::string my_commodity = "FuelA";
      BidPortfolio<Material>::Ptr port(new BidPortfolio<Material>());
      std::vector<Request<Material>*>& requests = commod_requests[my_commdoity];
      std::vector<Request<Material>*>::iterator it;
      for (it = requests.begin(); it != requests.end(); ++it) {
        std::string recipe = "recipe";
        std::string commod = "Fuel";
        for (it = requests.begin(); it != requests.end(); ++it) {      
          Material::Ptr offer = 
              Material::CreateUntracked(request_qty, context()->GetRecipe(recipe));
	port->AddBid(*it, offer, this);
      }

      // add a custom constraint for Pu-239
      int pu = 932390000; // Pu-239 
      Converter<Material>::Ptr conv(new NucConverter(pu));
      double max_pu = 8.0; // 1 Signifigant Quantity of Pu-239
      CapacityConstraint<Material> constr(max_pu, conv);
      port->AddConstraint(constr);

      std::set<BidPortfolio<Material>::Ptr> ports;
      ports.insert(port);
      return ports;
    }

White Box Examples
+++++++++++++++++++

Consider a case where a facility's bid depends on the type of the requester's
``cyclus::Agent``, and the bidder determines its offer based on the requester's
interface:

.. code-block:: c++

    cyclus::Material::Ptr FooFac::SpecialFooOffer() {
      std::string recipe = "recipe";
      double quantity = 10;
      Material::Ptr target = 
          Material::CreateUntracked(quantity, context()->GetRecipe(recipe));
      return target;
    };

    virtual std::set<cyclus::BidPortfolio<cyclus::Material>::Ptr>
      FooFac::GetMatlBids(
        cyclus::CommodMap<cyclus::Material>::type& commod_requests) {
      using cyclus::BidPortfolio;
      using cyclus::Material;
      using cyclus::Request;

      // respond to all requests of my commodity
      std::string my_commodity = "FuelA";
      BidPortfolio<Material>::Ptr port(new BidPortfolio<Material>());
      std::vector<Request<Material>*>& requests = commod_requests[my_commdoity];
      std::vector<Request<Material>*>::iterator it;
      for (it = requests.begin(); it != requests.end(); ++it) {
        Material::Ptr offer;
	Agent* agent = it->requester();
	FooFac* cast = dynamic_cast<FooFac*>(agent);
	if (cast != NULL) {
	    offer = cast->SpecialFooOffer(); // get a special response that the requester wants
	} else { 
	    double qty = it->quantity();     
      	    std::string recipe = "some_other_recipe";
      	    Material::Ptr offer = Material::CreateUntracked(qty, context()->GetRecipe(recipe));
	}	    
	port->AddBid(*it, offer, this);
      }

      std::set<BidPortfolio<Material>::Ptr> ports;
      ports.insert(port);
      return ports;
    }

.. _adj:

Preference Adjustment Phase
---------------------------

In the Preference Adjustment (PA) phase, requesters are allowed to view which
bids were matched to their requests, and adjust their preference for the given
bid-request pairing. Querying is provided through the ``cyclus::Trader`` and
``cyclus::Agent`` interfaces' ``Adjust*Prefs`` for a given resource type, e.g.,
``AdjustMaterialPrefs``.

Preferences are used by resource exchange solvers to inform their solution
method. Agents will only utilize the PA phase if there is a reason to update
preferences over the default provided in their original request.

Preferences can be adjusted by both the original ``cyclus::Trader`` placing
requests as well as any parent ``cyclus::Agent``\s, with the trader adjusting
first and the most senior parent adjusting last. In the supported
Region-Institution-Facility agent relationship, Facilities adjust first,
followed by Institution and Region parent agents. The calling chain is shown in
Figure 1, with the orange box representing a call through the ``cyclus::Trader``
interface and a green box representing the ``cyclus::Agent`` interface.

.. figure:: dre-1.svg
    :align: center

    **Figure 1:** R-I-F Preference Adjustment Call Chain

.. blockdiag code below

    http://interactive.blockdiag.com/?compression=deflate&src=eJxtjTELAjEMRvf7FeEmHQQdDofqKriKu9Q2tMHSHDGHiNx_t1cVRBzz8j3eObG7eLIBHg0AC2FWq8QZttCzqFjS8sjs8XQjr7HwVbc0HxaRQtQC193EDhgmd7OAfb4q6aDvs91ZR4n0DrOjWI8yb01ThCA89LUN_zaFjz8rx4mlBIMg5kpeUfOdNFUcn5VaRHw

    blockdiag {
      orientation = portrait
      node_width = 150;
      node_height = 75;
      Region <- Institution <- "Facility (Trader)";

      group {
        "Facility (Trader)"
	}
      group {
        color = green
	Region; Institution;
	}
      }    


Black Box Examples
++++++++++++++++++

For example, suppose that an agent prefers potential trades in which the bidder
has the same parent agent as it does. A valid ``AdjustMatlPrefs`` implementation
would then be:

.. code-block:: c++

    virtual void FooFac::AdjustMatlPrefs(
        cyclus::PrefMap<cyclus::Material>::type& prefs) {
      cyclus::PrefMap<cyclus::Material>::type::iterator pmit;
      for (pmit = prefs.begin(); pmit != prefs.end(); ++pmit) {
        std::map<Bid<Material>*, double>::iterator mit;
        Request<Material>* req = pmit->first;
	for (mit = pmit->second.begin(); mit != pmit->second.end(); ++mit) {
          Bid<Material>* bid = mit->first;
	  if (parent() == bid->bidder()->manager()->parent())
	    mit->second += 1; // bump pref if parents are equal
	} 
      }
    }

Alternatively, a ``cyclus::Institution`` managing a ``cyclus::Facility`` could
adjust preferences as follows

.. code-block:: c++

    virtual void FooInst::AdjustMatlPrefs(
        cyclus::PrefMap<cyclus::Material>::type& prefs) {
      cyclus::PrefMap<cyclus::Material>::type::iterator pmit;
      for (pmit = prefs.begin(); pmit != prefs.end(); ++pmit) {
        std::map<Bid<Material>*, double>::iterator mit;
        Request<Material>* req = pmit->first;
	for (mit = pmit->second.begin(); mit != pmit->second.end(); ++mit) {
          Bid<Material>* bid = mit->first;
	  Agent* you = bid->bidder()->manager()->parent();
	  Agent* me = this;
	  if (me == you)
	    mit->second += 1; // bump pref if the parent is me (institutions are equal)
	} 
      }
    }

Finally, a ``cyclus::Region`` managing a ``cyclus::Institution`` could adjust
preferences as

.. code-block:: c++

    virtual void FooRegion::AdjustMatlPrefs(
        cyclus::PrefMap<cyclus::Material>::type& prefs) {
      cyclus::PrefMap<cyclus::Material>::type::iterator pmit;
      for (pmit = prefs.begin(); pmit != prefs.end(); ++pmit) {
        std::map<Bid<Material>*, double>::iterator mit;
        Request<Material>* req = pmit->first;
	for (mit = pmit->second.begin(); mit != pmit->second.end(); ++mit) {
          Bid<Material>* bid = mit->first;
	  Agent* you = bid->bidder()->manager()->parent()->parent();
	  Agent* me = this;
	  if (me == you)
	    mit->second += 1; // bump pref if the grandparent is me (regions are equal)
	} 
      }
    }


White Box Examples
++++++++++++++++++

Consider a scenario in which preferences will only be adjusted if the requester
and bidder are of the same type:

.. code-block:: c++

    virtual void FooFac::AdjustMatlPrefs(
        cyclus::PrefMap<cyclus::Material>::type& prefs) {
      cyclus::PrefMap<cyclus::Material>::type::iterator pmit;
      for (pmit = prefs.begin(); pmit != prefs.end(); ++pmit) {
        std::map<Bid<Material>*, double>::iterator mit;
        Request<Material>* req = pmit->first;
	FooFac* cast = dynamic_cast<FooFac*>(req->requester()->manager());
        double pref = mit->second;
	if (cast != NULL) 
	    pref *= 10; // we like this guy!
	mit->second = pref;
      }
    }

.. _solve:

Solution Phase
--------------

The Solution Phase is straightforward from a module developer point of
view. Given requests, bids for those requests, and preferences for each
request-bid pairing, a ``cyclus::ExchangeSolver`` selects request-bid pairs to
satisfy and the quantity each resource to assign to each satisfied request-bid
pairing. The solution times and actual pairings will depend on the concrete
solver that is employed by the |cyclus| kernel. At present, only the
``cyclus::GreedySolver`` is available.

.. _trade:

Trade Execution Phase
---------------------

When satisfactory request-bid pairings are determined, a final communication is
executed for each bidder and requester during the Trade Execution Phase. Bidders
are notified of their winning bids through the ``cyclus::Trader`` ``Get*Trades``
member function (e.g. ``GetMatlTrades``), and requesters are provided their
satisfied requests through the ``cyclus::Trader`` ``Accept*Trades`` member
function (e.g. ``AcceptMatlTrades``).

Traders can implement a ``TradeResponse`` function that provides a
``cyclus::Material::Ptr`` given a ``cyclus::Trade``. It can then implement its
Trader interface as follows:

.. code-block:: c++

    void FooFac::GetMatlTrades(
      const std::vector< cyclus::Trade<cyclus::Material> >& trades,
      std::vector<std::pair<cyclus::Trade<cyclus::Material>,
      cyclus::Material::Ptr> >& responses) {
      using cyclus::Material;
      using cyclus::Trade;

      std::vector< Trade<Material> >::const_iterator it;
      for (it = trades.begin(); it != trades.end(); ++it) {
        Material::Ptr mat = it->bid->offer();
        Material::Ptr response = TradeResponse(mat);
        responses.push_back(std::make_pair(*it, response));
      }
    }

Similarly, Traders can implement an ``AcceptTrade`` function that accepts a
``cyclus::Material::Ptr`` given a ``cyclus::Trade``. It can then implement its
Trader interface as follows:

.. code-block:: c++

    void FooFac::AcceptMatlTrades(
      const std::vector< std::pair<cyclus::Trade<cyclus::Material>,
      cyclus::Material::Ptr> >& responses) {
      std::vector< std::pair<cyclus::Trade<cyclus::Material>,
          cyclus::Material::Ptr> >::const_iterator it;
      for (it = responses.begin(); it != responses.end(); ++it) {
        AcceptTrade(it->second);
      }
    }

The implementation logic for each of these functions is determined by how each
individual agent handles their resource inventories. Accordingly, their
implementation will be unique to each agent. Some initial examples can be found
in the ``cyclus::Source`` and ``cyclus::Sink`` agents, where ``cyclus::Source``
implements ``GetMatlTrades`` as a bidder and ``cyclus::Sink`` implements
``AcceptMatlTrades`` as a requester.

.. _examples:

Examples
--------

Mixin-based Trader Behavior
+++++++++++++++++++++++++++

Trader behavior can be specialized based on mixins that an archetype uses. For
example, consider an interface that helps determines preferences based on
the equality of the parent of a ``cyclus::Agent``.

.. code-block:: c++
 
  class PrefGetter {
   public:
    double GetPref(cyclus::Agent* mine, cyclus::Agent* yours) {
       return (mine == yours) ? 1 : 0.5;
    } 
  };

A trader who then wants behavior based on whether a bidder's manager inherits
from ``PrefGetter`` can then implement its preference adjustment as follows:

.. code-block:: c++

    virtual void FooFac::AdjustMatlPrefs(
        cyclus::PrefMap<cyclus::Material>::type& prefs) {

      cyclus::PrefMap<cyclus::Material>::type::iterator pmit;
      for (pmit = prefs.begin(); pmit != prefs.end(); ++pmit) {

        std::map<Bid<Material>*, double>::iterator mit;
        Request<Material>* req = pmit->first;
	cyclus::Agent* reqagent = req->requester()->manager();
	for (mit = pmit->second.begin(); mit != pmit->second.end(); ++mit) {

          Bid<Material>* bid = mit->first;
	  cyclus::Agent* bidagent = bid->bidder()->manager();
	  PrefGetter* pg_cast = dynamic_cast<PrefGetter*>(bidagent);

	  if (pg_cast != NULL) {
	    // special behavior for the mixin
	    mit->second = cast->GetPref(reqagent->parent(), 
	                                bidagent->parent()); 
	  } else {
	    mit->second = 0; // choose any (reasonable) default behavior
	  }
	} 
      }
    }

.. warning::

   Using a dynamic-checking approach will limit the interoperability of your
   archetype with others. Some mixins are provided by the |Cyclus| kernel in its
   :ref:`toolkit <toolkit>`, which is part of the core library.

.. warning::

   Using a mixin-based approach will require special implementation of restart
   related functions *if* the mixin has state associated with it (i.e., members
   that are initialized from an input file and/or stored from timestep to
   timestep). For further reading, see the ``pragma cyclus impl`` directive in
   :ref:`cycpp`.

.. _white_box:

Non-Black Box Behavior
+++++++++++++++++++++++++++

Cyclus provides a simulation framework that supports black-box entity
interaction, i.e., any entity in the simulation can interact with any other
entity through its ``cyclus::Agent`` interface. However, there is nothing
stopping an archetype developer from implementing logic that is specific to a
implemented archetype.

For example, take a facility that informs a trader what composition of material
it wants given another facility's inventory. 

.. code-block:: c++
 
  class TradeInformer: public cyclus::Facility {
   public:
    #pragma cyclus

    cyclus::Material::Ptr IdealMatl(const cyclus::ResourceBuff& buffer) {
       // provide whatever implementation is desired
    } 
  };

A provider of material can then implement its ``GetMatlBids`` as follows:

.. code-block:: c++

    virtual std::set<cyclus::BidPortfolio<cyclus::Material>::Ptr>
      FooFac::GetMatlBids(
        cyclus::CommodMap<cyclus::Material>::type& commod_requests) {
      using cyclus::BidPortfolio;
      using cyclus::Material;
      using cyclus::Request;
      using cyclus::Agent;

      // respond to all requests of my commodity
      std::string my_commodity = "FuelA";
      BidPortfolio<Material>::Ptr port(new BidPortfolio<Material>());
      std::vector<Request<Material>*>& requests = commod_requests[my_commodity];
      std::vector<Request<Material>*>::iterator it;
      for (it = requests.begin(); it != requests.end(); ++it) {
        Material::Ptr offer;
	Agent* agent = it->requester();
	TradeInformer* cast = dynamic_cast<TradeInformer*>(agent);
	if (cast != NULL) {
	    offer = cast->IdealMatl(inventory); // inventory is a state variable cyclus::ResourceBuff
	} else { 
	    double qty = it->quantity();     
      	    std::string recipe = "recipe";
      	    Material::Ptr offer = Material::CreateUntracked(qty, context()->GetRecipe(recipe));
	}	    
	port->AddBid(*it, offer, this);
      }

      std::set<BidPortfolio<Material>::Ptr> ports;
      ports.insert(port);
      return ports;
    }

Further Reading
---------------

For a more in depth (and historical) discussion, see `CEP 18
<http://fuelcycle.org/cep/cep18.html>`_.
