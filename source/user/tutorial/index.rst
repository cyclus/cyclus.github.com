|Cyclus| User Tutorial
======================

In this tutorial, we will build, run and analyze a fuel cycle scenario using
Cyclist, the graphical user interface developed specifically for the Cyclus
fuel cycle simulator.  This tutorial assumes that the learner is already
familiar with the purpose of a fuel cycle simulator. This tutorial will
require an internet connection so that |cyclus| can be run remotely.

Overview
---------

During this tutorial, we will create two separate fuel cycle scenarios:

1. A simple once-through scenario: The purpose of this exercise is to
   introduce the basic concepts of |Cyclus| and the layout of the user
   interface.

2. A MOX recycle scenario with growing energy demand: The purpose of this
   exercise is to demonstrate a more complete set of current capabilities.

Exercise #1
------------

.. toctree::
    :maxdepth: 2

    install_launch_cyclist
    cyclist_tour 
    sim_parm 
    add_arche
    add_proto
    add_reg_inst
    launch_cyclus
    data_explorer
    plot_output

Exercise #2
-------------

The description of this exercise will be described with less detail and more
flexibility than the previous exercise.  This should allow you to test your
new-found knowledge, learn to explore your own analysis, and try some things
on your own, all with the support of the Cyclus development team.


.. toctree::
   :maxdepth: 1

   add_arche_commod_recipe
   add_sep
   add_fab
   mod_rxtr
   add_deploy  
