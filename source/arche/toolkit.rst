.. _toolkit:

The (Experimental) Cyclus Toolkit
=================================
Currently in an experimental state, the |cyclus| toolkit aims to provide
functionality relevant to a variety of :term:`archetypes <archetype>` that do
not belong strictly in the :term:`cyclus kernel`.

ResBuf
++++++++++++
The ``cyclus::toolkit::ResBuf`` (C++) or ``cyclus.typesystem.ResBuf`` (Python) class
provides provides a canonical
methodology for dealing with collections of Resources.  ``ResBufs``
are usually used as member variables of archetypes.  The Cyclus preprocessor
has special handling for ``ResBuf`` as it can generate all needed code
for proper persistence and intiialization of the buffer.  For this to work,
you must annotate the buffer member variable with a Cyclus pre-processor
:ref:`pragma <pragma-cyclus-var>` (C++) or set a class attribute (Python)
in one of the following ways:

.. note::

    ``ResourceBuff`` has been deprecated in favor of ``ResBuf``.

**C++:**

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

**Python:**

.. code-block:: python

    from cyclus.agents import Facility
    import cyclus.typesystem as ts

    class MyFacility(Facility):
        # Option 1: minimum required annotation
        mybuf = ts.ResBufMaterialInv()

        # Option 2: you can set a specify buffer capacity
        mybuf = ts.ResBufMaterialInv(capacity=245.6)

        # Option 3: you can reference another annotated member variable's value
        # as the capacity
        buf_cap = ts.Double()
        mybuf = ts.ResBufMaterialInv(capacity='buf_cap')

You can read the `ResBuf API documentation
<http://fuelcycle.org/cyclus/api/classcyclus_1_1toolkit_1_1ResBuf.html>`_ for
more details on how to use the buffer.

MatQuery [C++]
++++++++++++++
The ``cyclus::toolkit::MatQuery`` class provides some easy-to-use functions that
interrogate the ``cyclus::Material`` object. For example, one can query the mass
or number of moles of a given nuclide.

Enrichment [C++]
++++++++++++++++
A number of functions are provided in ``toolkit/enrichment.h`` that assist in
enrichment-related calculations. Some highlights include a representation of
uranium assays in ``cyclus::toolkit::Assays``, as well as functions to calculate
feed, tails, and SWU quantity requirements.

Commodity Recipe Context [C++]
+++++++++++++++++++++++++++++++
The ``cyclus::toolkit::CommodityRecipeContext`` class provides a mapping between
commodities and recipes that can be updated as a simulation progresses.

Symbolic Functions [C++]
++++++++++++++++++++++++
The ``cyclus::toolkit::SymbolicFunction`` class and its derivatives provide an
object-oriented hierarchy to represent symbolic functions. Factory methods are
provided by the ``cyclus::toolkit::SymbFunctionFactory`` class.

Agent Managed Classes [C++]
+++++++++++++++++++++++++++
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
  agent to query a collection of ``cyclus::toolkit::CommodityProducers``

* ``cyclus::toolkit::SupplyDemandManager``: an interface for querying the supply
  and demand on commodities

Geographic Informasion System (GIS) Class [C++]
+++++++++++++++++++++++++++++++++++++++++++++++
  The ``cyclus::toolkit::GIS`` class provide an option to add geographic coordinates
  of its friend classes. Haversine distance calculations between two facilities or
  agents with GIS coordinates can be performed as well.
