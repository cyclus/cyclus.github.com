.. summary Documentation for |Cyclus| Users

|Cyclus| User Guide
===================

This guide covers the basics of installation, creating simulation input files,
and running them.  If you haven't already, you should take a look at
:ref:`Fundemental Concepts in Cyclus <basics-concepts>`. After that you can install |cyclus|:

Installing |Cyclus|
--------------------

* The easiest way to install |Cyclus| on a new system is to :doc:`install using Conda <install>`.
* If you are on an unsupported system (e.g., Windows), try the :doc:`Cyclus virtual box <virtualbox>`.
* More adventurous users may want to try :doc:`getting and building Cyclus from source </kernel/build_from_source>`.

.. toctree::
    :hidden:

    install
    virtualbox

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
**Bright-lite**
   The University of Texas - Austin is developing a set of archetypes for fuel
   fabrication and reactors that rely on interpolation tables for more
   accurate prediction of fresh fuel compositions and estimates of fuel
   depletion.

**Cyborg**
   The University of Tennessee is working with Oak Ridge National Lab to
   develop archetypes that will use ORIGEN calculations to improve the
   estimate of nuclear fuel properties.

**Mbmore**
  Facility archetypes that utilize a random number generator to create
  non-deterministic behaviors.  General methods controlling the behavior
  (including random number generation and Gaussian distributions) are defined in
  the `behavior functions. <https://github.com/mbmcgarry/mbmore/blob/master/src/behavior_functions.h>`_
  
  * `Mbmore Archetypes <https://github.com/mbmcgarry/mbmore>`_
    
    - `:mbmore:RandomEnrich <https://github.com/mbmcgarry/mbmore/blob/master/src/RandomEnrich.h#242>`_ - Based on cycamore enrichment facility, it can have
      variable tails assay, and bidding behavior can be set to occur at Every X
      timestep or at Random timesteps
    - `:mbmore:RandomSink <https://github.com/mbmcgarry/mbmore/blob/master/src/RandomSink.h#L78>`_ - Based on cycamore sink facility,
      it can accept multiple recipes, has modifiable material preference,
      material request behavior can be set, trading can be suppressed before
      a specified timestep, material requests can occur at Every X timestep
      or at Random timesteps, and quantity requested can be varied using a
      Gaussian distribution function.
 
   
Visualization & Analysis
--------------------------

.. toctree::
    :maxdepth: 2

    cymetric/index
    dbdoc
    analysis_usecases
