Archetype Development Tutorial [Python]
=======================================
In this tutorial, we will work through a number of steps for creating a
Facility archetype for Cyclus.  This tutorial assumes that the learner is
already reasonably familiar with programming in Python and with the primary
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
