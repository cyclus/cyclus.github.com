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

**Bright-lite** (https://github.com/bright-dev/Bright-lite)
   The University of Texas - Austin developed a set of archetypes for fuel
   fabrication and reactors that rely on interpolation tables for more
   accurate prediction of fresh fuel compositions and estimates of fuel
   depletion.

**Cyborg** (https://github.com/sskutnik/cyborg)
   The University of Tennessee worked with Oak Ridge National Lab to
   develop archetypes that will use ORIGEN calculations to improve the
   estimate of nuclear fuel properties.

**Mbmore Archetypes** (https://github.com/cnerg/mbmore)
    Facility archetypes that utilize a random number generator to create
    non-deterministic behaviors.  General methods controlling the behavior
    (including random number generation and Gaussian distributions) are defined in
    the `behavior functions
    <https://github.com/cnerg/mbmore/blob/main/src/behavior_functions.h>`_.

- `:mbmore:RandomEnrich
  <https://github.com/cnerg/mbmore/blob/main/src/RandomEnrich.h>`_

- `:mbmore:RandomSink
  <https://github.com/cnerg/mbmore/blob/main/src/RandomSink.h>`_

**rwc Archetypes** (https://github.com/rwcarlsen/rwc-archetypes)
    This is a collection of miscellaneous archetypes made by Robert Carlsen to
    support optimization work and other side projects:

- `:rwc:LookInst
  <https://github.com/rwcarlsen/rwc-archetypes/blob/master/look_inst.h>`_

- `:rwc:FleetReactor
  <https://github.com/rwcarlsen/rwc-archetypes/blob/master/fleet_reactor.h>`_

- `:rwc:PatternSink
  <https://github.com/rwcarlsen/rwc-archetypes/blob/master/pattern_sink.h>`_

- `:rwc:Storage
  <https://github.com/rwcarlsen/rwc-archetypes/blob/master/storage.h>`_

**Peddler** (https://github.com/ergs/peddler)
    Peddler is a Cyclus Package used to simulate the transport of material from one 
    facility to another.

- `peddler:truck <https://github.com/ergs/peddler/blob/master/peddler/truck.py>`_

- `peddler:reactor <https://github.com/ergs/peddler/blob/master/peddler/reactor.py>`_


**Cyder** (https://github.com/arfc/cyder)
    A generic nuclear repository model intended to be used within the Cyclus nuclear 
    fuel cycle simulator. It contains a conditioning facility and a nuclear repository 
    model that places spent fuel packages in a repository based on its temperature and 
    the constraints of the repository.


**OpenMCyclus** (https://github.com/arfc/openmcyclus/)
    OpenMCyclus introduces an archetype that couples OpenMC depletion with Cyclus a 
    reactor.

- `openmcyclus:DepleteReactor <https://github.com/arfc/openmcyclus/blob/main/openmcyclus/DepleteReactor.py>`_


**D3ploy** (https://github.com/arfc/d3ploy/)
    A collection of Cyclus manager archetypes for demand driven deployment. The goal 
    of this package is to provide three types of mathematical basis for predicting 
    supply and demand of commodities within Cyclus; Non-optimizing (NO) deterministic 
    optimization (DO), and Stochastic optimization (SO).

- `d3ploy:DemandDrivenDeploymentInst <https://github.com/arfc/d3ploy/blob/master/d3ploy/demand_driven_deployment_inst.py>`_

- `d3ploy:SupplyDrivenDeploymentInst <https://github.com/arfc/d3ploy/blob/master/d3ploy/supply_driven_deployment_inst.py>`_

- `d3ploy:DemandFac <https://github.com/arfc/d3ploy/blob/master/d3ploy/demand_fac.py>`_


**ann_pwr** (https://github.com/jbae11/ann_pwr)
    This Cyclus Reactor module is created to perform varying burnup and enrichment 
    calculations for LWRs using a trained neural network model to predict UNF 
    composition.

- `ann_pwr:ann_pwr <https://github.com/jbae11/ann_pwr/blob/ann_lwr/ann_lwr/ann_lwr.py>`_


Visualization & Analysis
--------------------------

.. toctree::
    :maxdepth: 2

    cymetric/index
    dbdoc
    analysis_usecases
