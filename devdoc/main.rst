
.. summary Documentation for Cyclus Developers

Cyclus Developer Guide
======================

Documentation to assist with the development of *Cyclus* will be maintained
in a variety of forms.  If you haven't already, check out
:doc:`../basics/main`

Getting Started
---------------

.. toctree::
   :maxdepth: 2
  
   GettingAndBuildingCyclus
   CyclusStyleGuidelines
   make-models/main
   ProgramFlowAndDataStructureOverview
   OutputDatabase

Doxygen Code Documentation
--------------------------

The definitive documentation of any software is the source code itself.
*Cyclus* will relies on Doxygen for automation of rich documentation from
appropriately formatted comments in the source code. Current Doxygen
documentation can be found at http://cnerg.engr.wisc.edu/cyclus/docs/ .
This page will be updated weekly during active development.

In addition to following Doxygen comment notation in the source code, this
relies on a properly configured Doxygen file.

  * cyclus/trunk/src/doc/doxy.conf.in is a cmake template file for doxygen settings.

  * To add or change options, edit this file and cyclus/trunk/src/doc/CMakeLists.txt

Documentation is a make target in the cmake build system. Documentation
will automatically be built when you "make all". You can build only the
documentation by running "make cyclusdoc" instead of "make all" or "make".
To avoid building documentation, use "make cyclus".

Milestone Definitions
---------------------

*  [MilestoneZero Basic Functionality]

*  [MilestoneNullSimulation 0: Null Simulation]

*  [MilestoneOneInpro 1: Inpro Simulation]

*  [MilestoneTwoNWTRB 2: NWTRB Simulations]

*  [MilestoneGenRepo 3: Generic Repository]

Diversions
----------

Relevant xkcd comics:

  * `Standards <http://xkcd.com/927/>`_
  * `The General Solution <http://xkcd.com/974/>`_

