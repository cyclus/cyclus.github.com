.. _toolkit:

The (Experimental) Cyclus Toolkit
=================================

Currently in an experimental state, the |cyclus| toolkit aims to provide
functionality relevant to a variety of :term:`archetypes <archetype>` that do
not belong strictly in the :term:`cyclus kernel`.

Resourcebuff
++++++++++++

*ResourceBuff will soon be deprecated in favor of ``ResBuf``.*

The ``cyclus::toolkit::ResourceBuff`` class provides provides a canonical
methodology for dealing with collections of ``cyclus::Resources``.
:term:`Archetypes <archetype>` in both |cyclus| and Cycamore make use of this
class.  ``ResourceBuff``\ s are usually used as member variables of
archetypes.  The Cyclus preprocessor has special handling for ``ResourceBuff``
\ - it can generate all needed code for proper persistence and intiialization
of the buffer.  For this to work, you must annotate the buffer member variable
with a Cyclus pre-processor :ref:`pragma <pragma-cyclus-var>` in one of the
following ways:

.. code-block:: c++

    // Option 1: minimum required annotation
    #pragma cyclus var {}
    cyclus::toolkit::ResourceBuff mybuf;

    // Option 2: you can set a specify buffer capacity
    #pragma cyclus var {'capacity': 245.6}
    cyclus::toolkit::ResourceBuff mybuf;

    // Option 3: you can reference another annotated member variable's value
    // as the capacity
    #pragma cyclus var {}
    double buf_cap;
    #pragma cyclus var {'capacity': 'buf_cap'}
    cyclus::toolkit::ResourceBuff mybuf;

You can read the `API documentation
<http://fuelcycle.org/cyclus/api/classcyclus_1_1toolkit_1_1ResourceBuff.html>`_ for
more details on how to use the buffer.

ResBuf
++++++++++++

The ``cyclus::toolkit::ResBuf`` class provides provides a canonical
methodology for dealing with collections of Resources.  ``ResBuf``\ s
are usually used as member variables of archetypes.  The Cyclus preprocessor
has special handling for ``ResBuf`` - it can generate all needed code
for proper persistence and intiialization of the buffer.  For this to work,
you must annotate the buffer member variable with a Cyclus pre-processor
:ref:`pragma <pragma-cyclus-var>` in one of the following ways:

.. code-block:: c++

    // Option 1: minimum required annotation
    #pragma cyclus var {}
    cyclus::toolkit::ResBuf<cyclus::Material> mybuf;

    // Option 2: you can set a specify buffer capacity
    #pragma cyclus var {'capacity': 245.6}
    cyclus::toolkit::ResBuf<cyclus::Material> mybuf;

    // Option 3: you can reference another annotated member variable's value
    // as the capacity
    #pragma cyclus var {}
    double buf_cap;
    #pragma cyclus var {'capacity': 'buf_cap'}
    cyclus::toolkit::ResBuf<cyclus::Material> mybuf;

You can read the `API documentation
<http://fuelcycle.org/cyclus/api/classcyclus_1_1toolkit_1_1ResBuf.html>`_ for
more details on how to use the buffer.

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
