.. summary Documentation for |Cyclus| Users

|Cyclus| User Guide
===================

This guide covers the basics of installation, creating simulation input files,
and running them.  If you haven't already, you should take a look at
:ref:`Fundamental Concepts in Cyclus <basics-concepts>`.


Installing |Cyclus|
--------------------

.. toctree::
   :maxdepth: 1

   install


Writing Input Files
---------------------

.. toctree::
    :glob:
    :maxdepth: 1

    writing_input
    find_agents
    sim_schema

..
       input_specs/overview/*
       input_specs/region/*
       input_specs/inst/*
       input_specs/facility/*
       input_specs/examples/*

Running Simulations
--------------------

.. toctree::
    :maxdepth: 1

    running_sims
    server

You can also run a simulation right now from the comfort of your browser :ref:`here
<try-it>`!

Tutorials
----------

* :doc:`ANS 2015 Annual Meeting Tutorial <tutorial/index>` - using the user interface and cloud simulation environment

.. toctree::
   :hidden:

   tutorial/index

Archetypes
----------

Collections of :term:`archetypes <archetype>` are provided by various teams
and individuals for use by |Cyclus| users.

Cycamore
~~~~~~~~
   The Cycamore library of archetypes is provided by the |Cyclus| development
   team as a basic set of archetypes for modeling simple nuclear fuel cycles.

.. toctree::
    :maxdepth: 2

    cycamoreagents

Cyclus Testing
~~~~~~~~~~~~~~
   The |Cyclus| kernel includes some archetype for testing the basic
   functionality of the kenel.

.. toctree::
   :maxdepth: 2

   cyclusagents


Third-Party Archetypes
~~~~~~~~~~~~~~~~~~~~~~

Several useful archetypes have been developed by the community outside the
purview of the Cyclus project itself and are listed here.  These archetypes do
not necessarily adhere to the same standards of quality (documentation,
testint, etc.) as Cyclus and Cycamore code - users are responsible for
evaluating their suitability.

**Bright-lite**
   The University of Texas - Austin is developing a set of archetypes for fuel
   fabrication and reactors that rely on interpolation tables for more
   accurate prediction of fresh fuel compositions and estimates of fuel
   depletion.

**Cyborg**
   The University of Tennessee is working with Oak Ridge National Lab to
   develop archetypes that will use ORIGEN calculations to improve the
   estimate of nuclear fuel properties.

**Mbmore Archetypes** (https://github.com/mbmcgarry/mbmore)
    Facility archetypes that utilize a random number generator to create
    non-deterministic behaviors.  General methods controlling the behavior
    (including random number generation and Gaussian distributions) are defined in
    the `behavior functions
    <https://github.com/mbmcgarry/mbmore/blob/master/src/behavior_functions.h>`_.

- `:mbmore:RandomEnrich
  <https://github.com/mbmcgarry/mbmore/blob/master/src/RandomEnrich.h#242>`_
  Based on cycamore enrichment facility, it can have variable tails assay,
  and bidding behavior can be set to occur at Every X timestep or at Random
  timesteps.

- `:mbmore:RandomSink
  <https://github.com/mbmcgarry/mbmore/blob/master/src/RandomSink.h#L78>`_
  Based on cycamore sink facility, it can accept multiple recipes, has
  modifiable material preference, material request behavior can be set,
  trading can be suppressed before a specified timestep, material requests
  can occur at Every X timestep or at Random timesteps, and quantity
  requested can be varied using a Gaussian distribution function.

**rwc Archetypes** (https://github.com/rwcarlsen/rwc-archetypes)
    This is a collection of miscellaneous archetypes made by Robert Carlsen to
    support optimization work and other side projects:

- `:rwc:LookInst
  <https://github.com/rwcarlsen/rwc-archetypes/blob/master/look_inst.h>`_
  This archetype allows the user to specify an arbitrary power capacity
  time series that the institution will automatically deploy power
  generating facilities (of multiple types) to match. It uses a look-ahead
  mechanism to see if its chosen deployments were not "good" and adjusts
  its deployment decisions accordingly. This archetype currently requires
  rwcarlsen/cyclus#restart branch of Cyclus to work.

- `:rwc:FleetReactor
  <https://github.com/rwcarlsen/rwc-archetypes/blob/master/fleet_reactor.h>`_
  This reactor models an entire reactor fleet as a single, homogenous
  unit.  Like the Cycamore reactor, it just uses static, user-specified
  compositions for fresh and spent fuel. Refueling is incremental -
  occuring every time step. It is approximately a continuous flow fleet
  model much like the way system-dynamics simulators represent facilities.
  It "pretends" to be many reactors to the Cyclus kernel - allowing other
  agents to deploy/decommission single-reactor units, but these
  single-reactors just adjust the size/capacity of the homogenous fleet.

- `:rwc:PatternSink
  <https://github.com/rwcarlsen/rwc-archetypes/blob/master/pattern_sink.h>`_
  Pattern sink is identical to the Cycamore sink facility except it has an
  additional parameter that allows the user to control the frequency with
  which the facility requests material - i.e. the user can tell the
  facility to only request material every Nth time step.

- `:rwc:Storage
  <https://github.com/rwcarlsen/rwc-archetypes/blob/master/storage.h>`_
  This facility is very similar to the Cycamore storage facility, and was
  originally created before Cycamore's existed. It has slightly more
  careful handling of discrete material objects (e.g. not ever splitting
  them) and is a bit more sophisticated with respect to resource exchange
  for offering/bidding its inventory. It would be good to use
  implementation details from this archetype to improve the Cycamore
  storage archetype.

Visualization & Analysis
--------------------------

.. toctree::
    :maxdepth: 2

    cymetric/index
    dbdoc
    analysis_usecases
