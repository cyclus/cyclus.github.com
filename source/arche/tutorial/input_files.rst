
Making Input Files
===============================

In this lesson, we will:

1. Make a basic input file
2. Run the file and analyze output
3. Make a more interesting input file
4. Run the file and analyze output

Overview
----------

Cyclus uses XML as its input file format, and there is an extensive guide to
making input files on the `website
<http://fuelcycle.org/user/writing_input.html>`_. Rather than getting into the
details of how to write input files, this lesson will focus instead on the
minimum information needed to get up and running for the Storage archetype.

Make a Basic Input File
-----------------------

The goal of this basic input file is to create the following facility set up.

.. figure:: simple_cycle.svg
    :width: 80 %
    :align: center

    **Figure:** The target "cycle".

Let's start with very simple dynamics, where the ``Source`` can send one unit of
fuel per time step, the ``Sink`` can take one unit of fuel per time step, and
the ``Storage`` stores fuel for one time step.

First, make the input file

.. code-block:: console

    $ cp input/storage.xml input/basic.xml

and open it with your favorite text editor.

Adding New Archetypes
+++++++++++++++++++++

We need to add a ``Source`` archetype and a ``Sink`` archetype, which we can
find in the ``agents`` library of Cyclus. To do so, add the following lines to
the ``<archetypes/>`` block of your input file.

.. code-block:: xml

    <spec><lib>agents</lib><name>Source</name></spec>
    <spec><lib>agents</lib><name>Sink</name></spec>

The full block should now look like

.. code-block:: xml

   <archetypes>
     <spec><path>tutorial</path><lib>Storage</lib><name>Storage</name></spec>
     <spec><path>tutorial</path><lib>TutorialRegion</lib><name>TutorialRegion</name></spec>
     <spec><path>tutorial</path><lib>TutorialInst</lib><name>TutorialInst</name></spec>
     <spec><lib>agents</lib><name>Source</name></spec>
     <spec><lib>agents</lib><name>Sink</name></spec>
   </archetypes>
