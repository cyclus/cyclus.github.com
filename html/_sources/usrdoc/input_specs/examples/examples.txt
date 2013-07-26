
Examples
========

The `Cycamore repository`_ houses pre-defined input files used by the Cyclus
development team in its `input directory`_.

If you're just getting started using Cyclus, the development team suggests you
review the input files in the `minimal input directory`_. These files describe
very simplistic, contrite simulations.

Single Source/Single Sink
-------------------------

The `first example`_ shows a simple simulation with 1 Source Facility and 1 Sink
Facility. The source facility creates a resource in each time period which is
sent to the Sink Facility. The facilities are instantiated at the beginning of
the simulation and exist until the end of the simulation.

Single Source/Single Sink with a Lifetime
-----------------------------------------

The `second example`_ shows a simple simulation with 1 Source Facility and 1 Sink
Facility. The source facility creates a resource in each time period which is
sent to the Sink Facility. The facilities are instantiated at the beginning of
the simulation and exist for a finite lifetime.

Multiple Sources/Single Sink
----------------------------

The `third example`_ is a direct analog to the first, except there are 3 Source
Facilities.

Multiple Sources/Single Sink with a Lifetime
--------------------------------------------

The `fourth example`_ is a direct analog to the second, except there are 3
Source Facilities.

.. _Cycamore repository: https://github.com/cyclus/cycamore
.. _input directory: https://github.com/cyclus/cycamore/tree/develop/input
.. _minimal input directory: https://github.com/cyclus/cycamore/tree/develop/input/minimal-input
.. _first example: https://github.com/cyclus/cycamore/blob/develop/input/minimal-input/source_1_sink_1.xml
.. _second example: https://github.com/cyclus/cycamore/blob/develop/input/minimal-input/source_3_sink_1.xml
.. _third example: https://github.com/cyclus/cycamore/blob/develop/input/minimal-input/source_1_lifetime_sink_1.xml
.. _fourth example: https://github.com/cyclus/cycamore/blob/develop/input/minimal-input/source_3_lifetime_sink_1.xml
