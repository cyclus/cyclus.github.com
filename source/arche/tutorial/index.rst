Archetype Development Tutorial
===============================

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
* a fixed storage capacity
* a minimum time that material stays in storage
* a limit on the fraction of each material that is fissile

This archetype will have a custom table that records the average fraction of
each material across its entire inventory at any point in time.

This tutorial has the following steps:

.. toctree::
    :maxdepth: 1

    setup
    hello_world
    state_var
    add_buffer


1. Setup a new code repository based on Cycstub
2. Making your first change by introducing Logging: "Hello World!"
3. Adding state variables
4. Adding a ResourceBuffer from the Toolkit
5. Begin accepting material from the DRE
6. Begin offering material to the DRE
7. Add a delay between accepting and offering material


