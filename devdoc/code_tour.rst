
.. _code-tour-home:

Tour of the Source Code
=======================

Following is a specially tailored log output from Cyclus that is intended to
give a high level understanding of the cyclus internals and code flow of
execution.  Each log statement has a link that, when clicked, shows related
snippets of code from the cyclus core or related modules.  The code snippets
are intended to give developers a feel for the type of code they will need to
write in order to get things done using Cyclus.

Log Output
----------

.. parsed-literal::

    ERROR(:ref:`tutr1a`):Cyclus has started.
    INFO1(:ref:`tutr1b`):Reading the input file.
    INFO2(:ref:`tutr2b`):  A new SourceFacility is being initialized from xml input.
    INFO2(:ref:`tutr2d`):  A new SinkFacility is being initialized from xml input.
    INFO2(:ref:`tutr2c`):  A new SourceFacility is created by copying another.
    INFO2(:ref:`tutr2e`):  A new SinkFacility is being created by copying another.
    INFO1(:ref:`tutr1c`):Starting up the simulation.
    INFO1(:ref:`tutr2a`):Current date: 2000-Jan-01
    INFO2(:ref:`tutr3a`):  Timer is sending tick to oneRegion id=3
    INFO4(:ref:`tutr4a`):      oneInstid=4 is ticking.
    INFO5(:ref:`tutr5a`):        FrontEnd id=5 is ticking.
   DEBUG1(:ref:`tutr6a`):          offers 1000 kg of uo2.
    INFO5(:ref:`tutr5c`):        BackEnd id=6 is ticking.
   DEBUG1(:ref:`tutr6b`):          requests 1000 kg of uo2.
    INFO2(:ref:`tutr3b`):  Timer is sending resolve to uo2market id=0
   DEBUG1(:ref:`tutr6c`):          received matched order to send to id=6
    INFO2(:ref:`tutr3c`):  Timer is sending tock to oneRegion id=3
    INFO4(:ref:`tutr4b`):      oneInstid=4 is tocking.
    INFO5(:ref:`tutr5b`):        FrontEnd id=5 is tocking.
   DEBUG1(:ref:`tutr6d`):          approving order to send to id=6
   DEBUG1(:ref:`tutr6e`):          Beginning a material transfer...
   DEBUG1(:ref:`tutr6g`):          sending material to id=6
   DEBUG1(:ref:`tutr6h`):          receiving material from id=5
   DEBUG1(:ref:`tutr6e`):          ... Finished transfer from id=5 to id=6.
    INFO5(:ref:`tutr5d`):        BackEnd id=6 is tocking.
    INFO1(:ref:`tutr2a`):Current date: 2000-Feb-01
    INFO2(:ref:`tutr3a`):  Timer is sending tick to oneRegion id=3
    INFO4(:ref:`tutr4a`):      oneInstid=4 is ticking.
    INFO5(:ref:`tutr5a`):        FrontEnd id=5 is ticking.
   DEBUG1(:ref:`tutr6a`):          offers 1000 kg of uo2.
    INFO5(:ref:`tutr5c`):        BackEnd id=6 is ticking.
   DEBUG1(:ref:`tutr6b`):          requests 1000 kg of uo2.
    INFO2(:ref:`tutr3b`):  Timer is sending resolve to uo2market id=0
   DEBUG1(:ref:`tutr6c`):          received matched order to send to id=6
    INFO2(:ref:`tutr3c`):  Timer is sending tock to oneRegion id=3
    INFO4(:ref:`tutr4b`):      oneInstid=4 is tocking.
    INFO5(:ref:`tutr5b`):        FrontEnd id=5 is tocking.
   DEBUG1(:ref:`tutr6d`):          approving order to send to id=6
   DEBUG1(:ref:`tutr6e`):          Beginning a material transfer...
   DEBUG1(:ref:`tutr6g`):          sending material to id=6
   DEBUG1(:ref:`tutr6h`):          receiving material from id=5
   DEBUG1(:ref:`tutr6e`):          ... Finished transfer from id=5 to id=6.
    INFO5(:ref:`tutr5d`):        BackEnd id=6 is tocking.
    INFO1(:ref:`tutr2a`):Current date: 2000-Mar-01
    INFO2(:ref:`tutr3a`):  Timer is sending tick to oneRegion id=3
    INFO4(:ref:`tutr4a`):      oneInstid=4 is ticking.
    INFO5(:ref:`tutr5a`):        FrontEnd id=5 is ticking.
   DEBUG1(:ref:`tutr6a`):          offers 1000 kg of uo2.
    INFO5(:ref:`tutr5c`):        BackEnd id=6 is ticking.
   DEBUG1(:ref:`tutr6b`):          requests 1000 kg of uo2.
    INFO2(:ref:`tutr3b`):  Timer is sending resolve to uo2market id=0
   DEBUG1(:ref:`tutr6c`):          received matched order to send to id=6
    INFO2(:ref:`tutr3c`):  Timer is sending tock to oneRegion id=3
    INFO4(:ref:`tutr4b`):      oneInstid=4 is tocking.
    INFO5(:ref:`tutr5b`):        FrontEnd id=5 is tocking.
   DEBUG1(:ref:`tutr6d`):          approving order to send to id=6
   DEBUG1(:ref:`tutr6e`):          Beginning a material transfer...
   DEBUG1(:ref:`tutr6g`):          sending material to id=6
   DEBUG1(:ref:`tutr6h`):          receiving material from id=5
   DEBUG1(:ref:`tutr6e`):          ... Finished transfer from id=5 to id=6.
    INFO5(:ref:`tutr5d`):        BackEnd id=6 is tocking.
    INFO1(:ref:`tutr2a`):Current date: 2000-Apr-01
    INFO2(:ref:`tutr3a`):  Timer is sending tick to oneRegion id=3
    INFO4(:ref:`tutr4a`):      oneInstid=4 is ticking.
    INFO5(:ref:`tutr5a`):        FrontEnd id=5 is ticking.
   DEBUG1(:ref:`tutr6a`):          offers 1000 kg of uo2.
    INFO5(:ref:`tutr5c`):        BackEnd id=6 is ticking.
   DEBUG1(:ref:`tutr6b`):          requests 1000 kg of uo2.
    INFO2(:ref:`tutr3b`):  Timer is sending resolve to uo2market id=0
   DEBUG1(:ref:`tutr6c`):          received matched order to send to id=6
    INFO2(:ref:`tutr3c`):  Timer is sending tock to oneRegion id=3
    INFO4(:ref:`tutr4b`):      oneInstid=4 is tocking.
    INFO5(:ref:`tutr5b`):        FrontEnd id=5 is tocking.
   DEBUG1(:ref:`tutr6d`):          approving order to send to id=6
   DEBUG1(:ref:`tutr6e`):          Beginning a material transfer...
   DEBUG1(:ref:`tutr6g`):          sending material to id=6
   DEBUG1(:ref:`tutr6h`):          receiving material from id=5
   DEBUG1(:ref:`tutr6e`):          ... Finished transfer from id=5 to id=6.
    INFO5(:ref:`tutr5d`):        BackEnd id=6 is tocking.
    INFO1(:ref:`tutr2a`):Current date: 2000-May-01
    INFO2(:ref:`tutr3a`):  Timer is sending tick to oneRegion id=3
    INFO4(:ref:`tutr4a`):      oneInstid=4 is ticking.
    INFO5(:ref:`tutr5a`):        FrontEnd id=5 is ticking.
   DEBUG1(:ref:`tutr6a`):          offers 1000 kg of uo2.
    INFO5(:ref:`tutr5c`):        BackEnd id=6 is ticking.
   DEBUG1(:ref:`tutr6b`):          requests 1000 kg of uo2.
    INFO2(:ref:`tutr3b`):  Timer is sending resolve to uo2market id=0
   DEBUG1(:ref:`tutr6c`):          received matched order to send to id=6
    INFO2(:ref:`tutr3c`):  Timer is sending tock to oneRegion id=3
    INFO4(:ref:`tutr4b`):      oneInstid=4 is tocking.
    INFO5(:ref:`tutr5b`):        FrontEnd id=5 is tocking.
   DEBUG1(:ref:`tutr6d`):          approving order to send to id=6
   DEBUG1(:ref:`tutr6e`):          Beginning a material transfer...
   DEBUG1(:ref:`tutr6g`):          sending material to id=6
   DEBUG1(:ref:`tutr6h`):          receiving material from id=5
   DEBUG1(:ref:`tutr6e`):          ... Finished transfer from id=5 to id=6.
    INFO5(:ref:`tutr5d`):        BackEnd id=6 is tocking.
    INFO1(:ref:`tutr2a`):Current date: 2000-Jun-01
    INFO2(:ref:`tutr3a`):  Timer is sending tick to oneRegion id=3
    INFO4(:ref:`tutr4a`):      oneInstid=4 is ticking.
    INFO5(:ref:`tutr5a`):        FrontEnd id=5 is ticking.
   DEBUG1(:ref:`tutr6a`):          offers 1000 kg of uo2.
    INFO5(:ref:`tutr5c`):        BackEnd id=6 is ticking.
   DEBUG1(:ref:`tutr6b`):          requests 1000 kg of uo2.
    INFO2(:ref:`tutr3b`):  Timer is sending resolve to uo2market id=0
   DEBUG1(:ref:`tutr6c`):          received matched order to send to id=6
    INFO2(:ref:`tutr3c`):  Timer is sending tock to oneRegion id=3
    INFO4(:ref:`tutr4b`):      oneInstid=4 is tocking.
    INFO5(:ref:`tutr5b`):        FrontEnd id=5 is tocking.
   DEBUG1(:ref:`tutr6d`):          approving order to send to id=6
   DEBUG1(:ref:`tutr6e`):          Beginning a material transfer...
   DEBUG1(:ref:`tutr6g`):          sending material to id=6
   DEBUG1(:ref:`tutr6h`):          receiving material from id=5
   DEBUG1(:ref:`tutr6e`):          ... Finished transfer from id=5 to id=6.
    INFO5(:ref:`tutr5d`):        BackEnd id=6 is tocking.
    INFO1(:ref:`tutr2a`):Current date: 2000-Jul-01
    INFO2(:ref:`tutr3a`):  Timer is sending tick to oneRegion id=3
    INFO4(:ref:`tutr4a`):      oneInstid=4 is ticking.
    INFO5(:ref:`tutr5a`):        FrontEnd id=5 is ticking.
   DEBUG1(:ref:`tutr6a`):          offers 1000 kg of uo2.
    INFO5(:ref:`tutr5c`):        BackEnd id=6 is ticking.
   DEBUG1(:ref:`tutr6b`):          requests 1000 kg of uo2.
    INFO2(:ref:`tutr3b`):  Timer is sending resolve to uo2market id=0
   DEBUG1(:ref:`tutr6c`):          received matched order to send to id=6
    INFO2(:ref:`tutr3c`):  Timer is sending tock to oneRegion id=3
    INFO4(:ref:`tutr4b`):      oneInstid=4 is tocking.
    INFO5(:ref:`tutr5b`):        FrontEnd id=5 is tocking.
   DEBUG1(:ref:`tutr6d`):          approving order to send to id=6
   DEBUG1(:ref:`tutr6e`):          Beginning a material transfer...
   DEBUG1(:ref:`tutr6g`):          sending material to id=6
   DEBUG1(:ref:`tutr6h`):          receiving material from id=5
   DEBUG1(:ref:`tutr6e`):          ... Finished transfer from id=5 to id=6.
    INFO5(:ref:`tutr5d`):        BackEnd id=6 is tocking.
    INFO1(:ref:`tutr2a`):Current date: 2000-Aug-01
    INFO2(:ref:`tutr3a`):  Timer is sending tick to oneRegion id=3
    INFO4(:ref:`tutr4a`):      oneInstid=4 is ticking.
    INFO5(:ref:`tutr5a`):        FrontEnd id=5 is ticking.
   DEBUG1(:ref:`tutr6a`):          offers 1000 kg of uo2.
    INFO5(:ref:`tutr5c`):        BackEnd id=6 is ticking.
   DEBUG1(:ref:`tutr6b`):          requests 1000 kg of uo2.
    INFO2(:ref:`tutr3b`):  Timer is sending resolve to uo2market id=0
   DEBUG1(:ref:`tutr6c`):          received matched order to send to id=6
    INFO2(:ref:`tutr3c`):  Timer is sending tock to oneRegion id=3
    INFO4(:ref:`tutr4b`):      oneInstid=4 is tocking.
    INFO5(:ref:`tutr5b`):        FrontEnd id=5 is tocking.
   DEBUG1(:ref:`tutr6d`):          approving order to send to id=6
   DEBUG1(:ref:`tutr6e`):          Beginning a material transfer...
   DEBUG1(:ref:`tutr6g`):          sending material to id=6
   DEBUG1(:ref:`tutr6h`):          receiving material from id=5
   DEBUG1(:ref:`tutr6e`):          ... Finished transfer from id=5 to id=6.
    INFO5(:ref:`tutr5d`):        BackEnd id=6 is tocking.
    INFO1(:ref:`tutr2a`):Current date: 2000-Sep-01
    INFO2(:ref:`tutr3a`):  Timer is sending tick to oneRegion id=3
    INFO4(:ref:`tutr4a`):      oneInstid=4 is ticking.
    INFO5(:ref:`tutr5a`):        FrontEnd id=5 is ticking.
   DEBUG1(:ref:`tutr6a`):          offers 1000 kg of uo2.
    INFO5(:ref:`tutr5c`):        BackEnd id=6 is ticking.
   DEBUG1(:ref:`tutr6b`):          requests 1000 kg of uo2.
    INFO2(:ref:`tutr3b`):  Timer is sending resolve to uo2market id=0
   DEBUG1(:ref:`tutr6c`):          received matched order to send to id=6
    INFO2(:ref:`tutr3c`):  Timer is sending tock to oneRegion id=3
    INFO4(:ref:`tutr4b`):      oneInstid=4 is tocking.
    INFO5(:ref:`tutr5b`):        FrontEnd id=5 is tocking.
   DEBUG1(:ref:`tutr6d`):          approving order to send to id=6
   DEBUG1(:ref:`tutr6e`):          Beginning a material transfer...
   DEBUG1(:ref:`tutr6g`):          sending material to id=6
   DEBUG1(:ref:`tutr6h`):          receiving material from id=5
   DEBUG1(:ref:`tutr6e`):          ... Finished transfer from id=5 to id=6.
    INFO5(:ref:`tutr5d`):        BackEnd id=6 is tocking.
    INFO1(:ref:`tutr2a`):Current date: 2000-Oct-01
    INFO2(:ref:`tutr3a`):  Timer is sending tick to oneRegion id=3
    INFO4(:ref:`tutr4a`):      oneInstid=4 is ticking.
    INFO5(:ref:`tutr5a`):        FrontEnd id=5 is ticking.
   DEBUG1(:ref:`tutr6a`):          offers 1000 kg of uo2.
    INFO5(:ref:`tutr5c`):        BackEnd id=6 is ticking.
   DEBUG1(:ref:`tutr6b`):          requests 1000 kg of uo2.
    INFO2(:ref:`tutr3b`):  Timer is sending resolve to uo2market id=0
   DEBUG1(:ref:`tutr6c`):          received matched order to send to id=6
    INFO2(:ref:`tutr3c`):  Timer is sending tock to oneRegion id=3
    INFO4(:ref:`tutr4b`):      oneInstid=4 is tocking.
    INFO5(:ref:`tutr5b`):        FrontEnd id=5 is tocking.
   DEBUG1(:ref:`tutr6d`):          approving order to send to id=6
   DEBUG1(:ref:`tutr6e`):          Beginning a material transfer...
   DEBUG1(:ref:`tutr6g`):          sending material to id=6
   DEBUG1(:ref:`tutr6h`):          receiving material from id=5
   DEBUG1(:ref:`tutr6e`):          ... Finished transfer from id=5 to id=6.
    INFO5(:ref:`tutr5d`):        BackEnd id=6 is tocking.
    INFO1(:ref:`tutr1d`):Cyclus is exiting.


  
.. toctree::
   :maxdepth: 1
  
   tour_snippets


