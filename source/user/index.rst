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

Archetypes
----------

The following is a listing of core-supported libraries and documentation for 
the :term:`archetypes <archetype>` that live inside of them.

.. toctree::
    :maxdepth: 2

    cyclusagents
    cycamoreagents
    stubagents

Visualization & Analysis
--------------------------

.. toctree::
    :maxdepth: 2

    cymetric/index
    dbdoc
    analysis_usecases
