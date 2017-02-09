Archetype Development Tutorial [C++]
====================================
In this tutorial, we will work through a number of steps for creating a
Facility archetype for Cyclus.  This tutorial assumes that the learner is
already reasonably familiar with programming in C++ and with the primary
vocabulary of Cyclus.  We also assume that the learner has a Github account.

Overview
---------

Through this tutorial, we will transform a copy of the Cycstub repository into
an open source Cyclus archetype module that includes an archetype to simulate
a very simple interim storage facility, named "Storage".  Ultimately, this
facility will have the following characteristics, all definable by the user:

* a fixed rate at which it can transfer material
* a minimum time that material stays in storage
* a fixed storage capacity

This tutorial has the following steps:

.. toctree::
    :maxdepth: 1

    setup
    state_var
    toolkit
    testing
    input_files

Given enough time, the following extra topics may be covered:

.. toctree::
    :maxdepth: 1

    cyclist
    dre

.. note::

    If you ever see an error like ``ERROR(core ):SQL error [INSERT INTO
    AgentState...`` simply remove the output database with ``$ rm
    cyclus.sqlite`` and rerun the simulation
