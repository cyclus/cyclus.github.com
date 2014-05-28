.. summary Documentation for |Cyclus| Users

|Cyclus| User Guide
===================

This guide covers the basics of installation, creating simulation input files,
and running them.  If you haven't already, you should take a look at
:doc:`/basics/concepts`. After that you can install |cyclus|:

.. toctree::
     :maxdepth: 2
     
     install

After installation, the sections below will explain how to define your own
simulations and run them.

Writing Input Files
---------------------

TODO: Add page on actually writing input files

.. toctree::
    :glob:
    :maxdepth: 2

    writing_input
    find_agents

..
       input_specs/overview/*
       input_specs/region/*
       input_specs/inst/*
       input_specs/facility/*
       input_specs/examples/*

Running Simulations
--------------------

.. toctree::
   :maxdepth: 2

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

   analysis_usecases
