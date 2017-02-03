.. _dre:

Dynamic Resource Exchange
=========================
The Dynamic Resource Exchange (DRE) is the heart of a |cyclus| simulation time
step. Every ``Trader`` that is registered with the ``Context``
is automatically included in the exchange. |cyclus| agents can either implement
the ``Trader`` interface as a mixin or can be composed of one or more
traders. Note that the ``Facility`` class derives the
``Trader`` interface, and therefore all agents that derive from
``Facility`` are also traders.

On each time step, there is a separate ``ResourceExchange``
instance for each concrete ``Resource`` (i.e. ``Materials`` and ``Products``) of which
the kernel is aware. For example, there is an exchange for ``Material``
resources and another for ``Product`` resources.

The DRE is comprised of five phases which execure in series:

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
the ``Trader`` interface's "get requests" for a given resource type,
e.g., ``GetMatlRequests()`` (C++) or ``get_material_requests()`` (Python) functions.

Requests are modeled as collections of ``RequestPortfolio`` instances, where each
portfolio includes a collection of ``Request`` objects and a collection of
``CapacityConstraint`` objects. A portfolio is sufficiently met if one or more
of its constituent requests are met and all of its constraints are satisfied.

A request provides a target resource, a commodity, and a preference for that
commodity-resource combination. A constraint provides a constraining value and a
conversion function that can convert a potential resource into the units of the
capacity (see :ref:`rrfb` for a more detailed example).

For example, consider a facility of type ``FooFac`` that needs 5 kg fuel,
where the fuel is represented by a ``Material`` resource. It knows of two commodities in
the simulation that meet its demand, ``FuelA`` and ``FuelB``, and it prefers
``FuelA`` over ``FuelB``. A valid get material request implementation would then
be:

**C++:**

.. code-block:: c++

    virtual std::set<cyclus::RequestPortfolio<cyclus::Material>::Ptr> FooFac::GetMatlRequests() {
      using cyclus::RequestPortfolio;
      using cyclus::Material;
      using cyclus::CapacityConstraint;

      double request_qty = 10; // kg
      std::string recipeA = "recipeA";
      std::string commoda = "FuelA";
      Material::Ptr targetA = Material::CreateUntracked(request_qty,
                                                        context()->GetRecipe(recipeA));

      std::string recipeB = "recipeB";
      std::string commodB = "FuelB";
      Material::Ptr targetB = Material::CreateUntracked(request_qty,
                                                        context()->GetRecipe(recipeB));

      CapacityConstraint<Material> cc(request_qty);

      RequestPortfolio<Material>::Ptr port(new RequestPortfolio<Material>());
      port->AddRequest(targeta, this, commodA);
      port->AddRequest(targetb, this, commodB);
      port->AddConstraint(cc);

      std::set<RequestPortfolio<Material>::Ptr> ports();
      ports.insert(port);
      return ports;
    }

**Python:**

.. code-block:: python

    import cyclus.typesystem as ts

    def get_material_requests(self):
        request_qty = 10.0  # kg
        # Material Target A
        recipe_a = self.context().get_recipe("recipeA")
        target_a = ts.Material.create_untracked(request_qty, recipe_a)
        # Material Target B
        recipe_b = self.context().get_recipe("recipeB")
        target_b = ts.Material.create_untracked(request_qty, recipe_b)
        # commodity mapping to request target
        commods = {"FuelA": target_a, "FuelB": target_b}

        # The Python interface allow you to return a few different structures,
        # depending on your needs.  In its simplest form, if you do not not have
        # any capacity constraints, you can just return the commoditer mapping!
        return commods

        # If you do have a capacity constraint, you need to provide a portfolio
        # dict. This is simply a dict with two keys: "commodities" and "constraints".
        # The "commodities" value is the same as above. The "constraints" value is
        # either a float or an iterable of floats.
        # single constraint:
        port = {"commodities": commods, "constraints": request_qty}
        return port
        # many constraints:
        port = {"commodities": commods, "constraints": [request_qty, request_qty*2]}
        return port

        # lastly, if you need to return many portfolios, simply return a list of
        # portfolio dictionaries!
        ports = [{"commodities": {"FuelA": target_a}, "constraints": request_qty},
                 {"commodities": {"FuelB": target_b}, "constraints": request_qty}]
        return ports


.. _rrfb:

Response to Request For Bids Phase
----------------------------------
In the Response to Request for Bids (RRFB) phase, the exchange queries all
registered traders regarding their supply for a given resource type. Querying is
provided through the ``Trader`` interface's "get bids" for a given
resource type, e.g. ``GetMatlBids()`` (C++) or ``get_material_bids()`` (Python).

Bids are modeled as collections of ``BidPortfolio``, where each
portfolio includes a collection of ``Bid`` objects and a collection of
``CapacityConstraint`` objectss. A portfolio is not violated if any of its
constituent bids are connected to their requests and all of its constraints are
satisfied.

A bid is comprised of a request to which it is responding and a resource that it is
offering in response to the request.

Black Box Examples
++++++++++++++++++
Consider a facility of type ``FooFac`` that has 10 kg of fuel of commodity type
``FuelA`` that it can provide. Furthermore, consider that its capacity to
fulfill orders is constrained by the total amount of a given nuclide. A valid
get material bids implementation would then be:

**C++:**

.. code-block:: c++

    class NucConverter : public cyclus::Converter<cyclus::Material> {
     public:
      NucConverter(int nuc) : nuc_(nuc) {};

      virtual double convert(cyclus::Material::Ptr m, cyclus::Arc const * a = NULL,
                             cyclus::ExchangeTranslationContext<cyclus::Material> const * ctx = NULL) const {
        cyclus::MatQuery mq(m);
        return mq.mass(nuc_);
      }

     private:
      int nuc_;
    };

    virtual std::set<cyclus::BidPortfolio<cyclus::Material>::Ptr> FooFac::GetMatlBids(
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
          Material::Ptr offer = Material::CreateUntracked(request_qty,
                                                          context()->GetRecipe(recipe));
          port->AddBid(*it, offer, this);
        }
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


**Python:**

.. code-block:: python

    # Note that the Python interface does not yet support custom constraint functions.
    # these are fairly rare in practice and is a forth coming feature.
    import cyclus.typesystem as ts

    def get_material_bids(self, requests):
        """This function takes as input a requests dictionary, which maps
        commodity names to tuples of Request instances. For example::

            requests = {
                "FuelA": (MaterialRequest1, MaterialRequest2),
                "FuelB": (MaterialRequest3, MaterialRequest4),
                }

        For more information on MaterialRequests and ProductRequests, please see
        the cyclus.typesystem docs.
        """
        # Like with get_material_requests(), many potential bid structures can be returned
        # depending on you need. If the commodity that you trade in wasn't requested this
        # time step, you can just return None.
        if 'FuelA' not in requests:
            return

        # Alternitavely, you may return a bid portfolio. Let's start by constructing the
        # bids. If you don't want to offer a bid that is different than the request,
        # you can just provide the requests. The bids are then a list of the request objects
        reqs = requests['FuelA']
        bids = [req for req in reqs]
        # Or if you do want to offer something different than the request, the bids list
        # list contains dictionaries with "request" and "offer" keys
        recipe_comp = self.context.get_recipe(self.recipe_name)
        bids = []
        for req in reqs:
            qty = min(req.target.quantity, self.capacity)
            mat = ts.Material.create_untracked(qty, recipe_comp)
            bids.append({'request': req, 'offer': mat})
        # now that we have the bids, we can add this to a bid portfolio dict, which
        # contains a "bids" key.
        port = {"bids": bids}
        return port

        # if you need to add capcity constraint(s), also include a "constraints" key
        # in the bids portfolio dict.
        port = {"bids": bids, "constraints": self.capacity}
        return port

        # Of course you may also return many bid portfolios by putting the many
        # dicts in the above form in a list.
        ports = [{"bids": bids[::2], "constraints": self.capacity},
                 {"bids": bids[1::2], "constraints": self.capacity}]
        return ports


White Box Examples
+++++++++++++++++++
Consider a case where a facility's bid depends on the type of the requester's
``Agent``, and the bidder determines its offer based on the requester's
interface:

**C++:**

.. code-block:: c++

    cyclus::Material::Ptr FooFac::SpecialFooOffer() {
      std::string recipe = "recipe";
      double quantity = 10;
      Material::Ptr target = Material::CreateUntracked(quantity,
                                                       context()->GetRecipe(recipe));
      return target;
    };

    virtual std::set<cyclus::BidPortfolio<cyclus::Material>::Ptr> FooFac::GetMatlBids(
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


**Python:**

.. code-block:: python

    from cyclus.typesystem import ts

    def special_foo_offer(self):
        recipe = self.context.get_recipe("recipe")
        target = ts.Material.create_untracked(10, recipe)
        return target

    def get_material_bids(self, requests):
        reqs = requests["FuelA"]
        bids = []
        for req in reqs:
            if isinstance(req.requester, FooFac):
                offer = self.special_foo_offer()
            else:
                qty = req.quantity
                recipe = self.context.get_recipe("some_other_recipe")
                offer = ts.Material.create_untracked(qty, recipe)
            bids.append(req)
        return {"bids": bids}


.. _adj:

Preference Adjustment Phase
---------------------------
In the Preference Adjustment (PA) phase, requesters are allowed to view which
bids were matched to their requests, and adjust their preference for the given
bid-request pairing. Querying is provided through the ``Agent`` interface, so all cyclus
archetypes may adjust preferences. The "adjust prefs: functions are based on a given resource
type, e.g. ``AdjustMaterialPrefs`` (C++) or ``adjust_material_prefs()`` (Python).

Preferences are used by resource exchange solvers to inform their solution
method. The default preference for all bids is zero. Agents will only utilize
the PA phase if there is a reason to update preferences over the default
provided in their original request.

Preferences can be adjusted by both the original ``Trader`` placing
requests as well as any parent ``Agent`` instances, with the trader adjusting
first and the most senior parent adjusting last. In the supported
Region-Institution-Facility agent relationship, Facilities adjust first,
followed by Institution and Region parent agents. The calling chain is shown in
Figure 1, with the orange box representing a call through the ``Trader``
interface and a green box representing the ``Agent`` interface.

.. figure:: dre-1.svg
    :align: center
    :height: 500

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
has the same parent agent as it does. A valid adjust material preferences implementation
would then be:

**C++:**

.. code-block:: c++

    virtual void FooFac::AdjustMatlPrefs(cyclus::PrefMap<cyclus::Material>::type& prefs) {
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


**Python:**

.. code-block:: python

    def adjust_material_prefs(self, prefs):
        """The adjustment methods have a single argument which is a prefernce dictionary.
        It maps (Request, Bid) tuples to float valued prefernces.  For example::

            prefs = {
                (Request1, Bid1): 1.0,
                (Request1, Bid2): 2.0,
                (Request2, Bid3): 1.0,
                }

        This function may return None or a dictionary of the same form. Note that the
        return value does not need to have all of the same keys as were passed in. Rather,
        it can return only those request-bid pairs that it actually wants to update.
        """
        # If you don't want to do any prefernce adjustment, just return None.
        return None

        # Otherwise we can loop though and update those that matter.
        updates = {}
        for (req, bid), pref in prefs.items():
            # favor bids if the parents are the same
            if self.parent_id == bid.bidder.parent_id:
                updates[req, bid] = pref + 1.0
        return updates


Alternatively, an ``Institution`` managing a ``Facility`` could
adjust preferences as follows:

**C++:**

.. code-block:: c++

    virtual void FooInst::AdjustMatlPrefs(cyclus::PrefMap<cyclus::Material>::type& prefs) {
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


**Python:**

.. code-block:: python

    def adjust_material_prefs(self, prefs):
        updates = {}
        for (req, bid), pref in prefs.items():
            if self.id == bid.bidder.parent_id:
                updates[req, bid] = pref + 1.0
        return updates


Finally, a ``Region`` managing a ``Institution`` could adjust
preferences as

**C++:**

.. code-block:: c++

    virtual void FooRegion::AdjustMatlPrefs(cyclus::PrefMap<cyclus::Material>::type& prefs) {
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


**Python:**

.. code-block:: python

    def adjust_material_prefs(self, prefs):
        updates = {}
        for (req, bid), pref in prefs.items():
            if self.id == bid.bidder.parent.parent_id:
                updates[req, bid] = pref + 1.0
        return updates



White Box Examples
++++++++++++++++++
Consider a scenario in which preferences will only be adjusted if the requester
and bidder are of the same type:

**C++:**

.. code-block:: c++

    virtual void FooFac::AdjustMatlPrefs(cyclus::PrefMap<cyclus::Material>::type& prefs) {
      cyclus::PrefMap<cyclus::Material>::type::iterator pmit;
      for (pmit = prefs.begin(); pmit != prefs.end(); ++pmit) {
        Request<Material>* req = pmit->first;
        FooFac* cast = dynamic_cast<FooFac*>(req->requester()->manager());
        if (cast != NULL) {
          for (mit = pmit->second.begin(); mit != pmit->second.end(); ++mit) {
            mit->second = pref + 10; // we like this trader!
          }
        }
      }
    }


**Python:**

.. code-block:: python

    def adjust_material_prefs(self, prefs):
        updates = {}
        for (req, bid), pref in prefs.items():
            if not isinstance(req.requester, FooFac):
                continue
            updates[req, bid] = pref + 10.0  # we like this trader
        return updates


.. _solve:

Solution Phase
--------------
The Solution Phase is straightforward from a module developer point of
view. Given requests, bids for those requests, and preferences for each
request-bid pairing, a ``ExchangeSolver`` selects request-bid pairs to
satisfy and the quantity each resource to assign to each satisfied request-bid
pairing. The solution times and actual pairings will depend on the concrete
solver that is employed by the |cyclus| kernel.

.. _trade:

Trade Execution Phase
---------------------
When satisfactory request-bid pairings are determined, a final communication is
executed for each bidder and requester during the Trade Execution Phase. Bidders
are notified of their winning bids through the ``Trader`` "get trades"
functions (e.g. ``GetMatlTrades()`` in C++ and ``get_material_trades()`` in Python),
and requesters are provided their
satisfied requests through the ``Trader`` "accept trades"
functions (e.g. ``AcceptMatlTrades()`` in C++ and ``accept_material_trades()`` in Python).

By convention in C++, traders can implement a ``TradeResponse()`` function that provides a
``Material::Ptr`` given a ``Trade``. It can then implement its
Trader interface as follows:

**C++:**

.. code-block:: c++

    void FooFac::GetMatlTrades(const std::vector< cyclus::Trade<cyclus::Material> >& trades,
                               std::vector<std::pair<cyclus::Trade<cyclus::Material>, cyclus::Material::Ptr> >& responses) {
      using cyclus::Material;
      using cyclus::Trade;

      std::vector< Trade<Material> >::const_iterator it;
      for (it = trades.begin(); it != trades.end(); ++it) {
        Material::Ptr mat = it->bid->offer();
        Material::Ptr response = TradeResponse(mat);
        responses.push_back(std::make_pair(*it, response));
      }
    }

**Python:**

.. code-block:: python

    import cyclus.typesystem as ts

    def get_material_trades(self, trades):
        """In Python, the get trades functions take a single trades aregument and
        should return a responses dict.  The trades is list of Trade objects, see the
        cyclus.typesystem docs for more information.

        The reponses should be a dict whose keys are these trades and whose values
        are tracked resource instances. For example, Materials.
        """
        # here we respond with what the trade request was.
        responses = {}
        for trade in trades:
            mat = ts.Material.create(self, trade.amt, trade.request.target.comp())
            responses[trade] = mat
        return responses


Similarly, Traders can implement an "accept trade" function that accepts a
the resources from a ``Trade``. It can then implement its
Trader interface as follows:

**C++:**

.. code-block:: c++

    void FooFac::AcceptMatlTrades(const std::vector< std::pair<cyclus::Trade<cyclus::Material>, cyclus::Material::Ptr> >& responses) {
      std::vector< std::pair<cyclus::Trade<cyclus::Material>, cyclus::Material::Ptr> >::const_iterator it;
      for (it = responses.begin(); it != responses.end(); ++it) {
        AcceptTrade(it->second);
      }
    }


**Python:**

.. code-block:: python

    def accept_material_trades(self, responses):
        """In the Python interface, this accepts a responses dict that has the same format as
        the responses returned from get_material_trades() above. That is, responses maps
        Trades to Materials. This function is responsible for storing these traded materails
        somewhere in the agent's inventories. This is the end of the dynamic resource
        exchange and so this function shouldn't return anything.
        """
        for mat in responses.values():
            self.inventory.push(mat)


The implementation logic for each of these functions is determined by how each
individual agent handles their resource inventories. Accordingly, their
implementation will be unique to each agent. Some initial examples can be found
in the ``Source`` and ``Sink`` agents, where ``Source``
implements ``GetMatlTrades()`` or ``get_material_trades()`` as a bidder and ``Sink``
implements ``AcceptMatlTrades()`` or ``accept_material_trades()`` as a requester.

.. _examples:

Examples
--------

Mixin-based Trader Behavior [C++]
+++++++++++++++++++++++++++++++++

.. note:: The Python interface can easily handle mix-in behavior for
          Python agents via subclassing and using ``super()`` on any agent.

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

    virtual void FooFac::AdjustMatlPrefs(cyclus::PrefMap<cyclus::Material>::type& prefs) {
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

Non-Black Box Behavior [C++]
++++++++++++++++++++++++++++

.. note:: The Python interface can trivially handle non-black box behavior for
          Python agents by using ``isinstance()`` on any agent.

Cyclus provides a simulation framework that supports black-box entity
interaction, i.e., any entity in the simulation can interact with any other
entity through its ``Agent`` interface. However, there is nothing
stopping an archetype developer from implementing logic that is specific to a
implemented archetype.

For example, take a facility that informs a trader what composition of material
it wants given another facility's inventory.

.. code-block:: c++

  class TradeInformer: public cyclus::Facility {
   public:
    #pragma cyclus

    cyclus::Material::Ptr IdealMatl(const cyclus::toolkit::ResBuf& buffer) {
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
          offer = cast->IdealMatl(inventory); // inventory is a state variable ResBuf
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
