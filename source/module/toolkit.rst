The (Experimental) Cyclus Toolkit
=================================

Currently in an experimental state, the |cyclus| toolkit aims to provide
functionality relevant to a variety of :term:`archetypes <archetype>` that do
not belong strictly in the :term:`cyclus kernel`.

Resourcebuff
++++++++++++

The ``cyclus::toolkit::ResourceBuff`` class provides provides a canonical
methodology for dealing with collections of
``cyclus::Resources``. :term:`Archetypes <archetype>` in both |cyclus| and
Cycamore make use of this class.

MatQuery
++++++++

The ``cyclus::toolkit::MatQuery`` class provides some easy-to-use functions that
interrogate the ``cyclus::Material`` object. For example, one can query the mass
or number of moles of a given nuclide.

Enrichment
++++++++++

A number of functions are provided in ``toolkit/enrichment.h`` that assist in
enrichment-related calculations. Some highlights include a representation of
uranium assays in ``cyclus::toolkit::Assays``, as well as functions to calculate
feed, tails, and SWU quantity requirements.

Commodity Recipe Context
++++++++++++++++++++++++

The ``cyclus::toolkit::CommodityRecipeContext`` class provides a mapping between
commodities and recipes that can be updated as a simulation progresses.

Symbolic Functions
++++++++++++++++++

The ``cyclus::toolkit::SymbolicFunction`` class and its derivatives provide an
object-oriented hierarchy to represent symbolic functions. Factory methods are
provided by the ``cyclus::toolkit::SymbFunctionFactory`` class.

Agent Managed Classes
+++++++++++++++++++++

There are a number of interfaces provided in the |cyclus| toolkit that can be
used as either as `mixins <http://en.wikipedia.org/wiki/Mixin>`_ or as
composable, agent-managed state variables:

* ``cyclus::toolkit::Builder``: an interface for adding information about agents
  that can be built by the manager

* ``cyclus::toolkit::BuildingManager``: an interface for making build decisions
  based on supply, demand, and agents that can be built

* ``cyclus::toolkit::CommodityProducer``: an interface for adding information
  about commodities that can be produced by the manager

* ``cyclus::toolkit::CommodityProducerManager``: an interface that allows an
  agent to query a collection of ``cyclus::toolkit::CommodityProducer``\ s

* ``cyclus::toolkit::SupplyDemandManager``: an interface for querying the supply
  and demand on commodities
