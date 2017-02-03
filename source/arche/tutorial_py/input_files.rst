
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
minimum information needed to get up and running with the Storage archetype.

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

First, make a new input file

.. code-block:: console

    $ cp input/storage.xml input/basic.xml

and open it with your favorite text editor.

Add a Recipe
+++++++++++++

In this example, material is being transferred between facilities. As in real
life, in Cyclus, material must have some composition. For this example, we can
use an LEU-like composition.

Add the following lines to the bottom of the input file (but before the close
tag </simulation> )

.. code-block:: xml

  <recipe>
    <name>LEU</name>
    <basis>mass</basis>
    <nuclide>
      <id>U235</id>
      <comp>5</comp>
    </nuclide>
    <nuclide>
      <id>U238</id>
      <comp>95</comp>
    </nuclide>
  </recipe>

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

Adding Prototypes
+++++++++++++++++

A configured archetype is called a *prototype* in Cyclus parlance. You can read
how to on the :ref:`cyclus_archetypes` and :ref:`cycamore_archetypes`
pages. 

Source
~~~~~~~~~~

Beginning with the Cyclus `Source
<http://fuelcycle.org/user/cyclusagents.html#agents-source>`_, you must, at
minimum, supply an entry for ``<commod/>`` and ``<capacity/>``. This prototype
will also include a ``<recipe_name/>`` entry. In this example, you want the
source facility to supply one unit of fuel per time step and you want it to be
connected to the ``incommod`` of the Storage prototype. Finally, let's name the
Source "FuelSource".

Accordingly, add the following lines after the Storage prototype

.. code-block:: xml

  <facility>
    <name>FuelSource</name>
    <config>
      <Source>
        <capacity>1</capacity>
	<recipe_name>LEU</recipe_name>
        <commod>fuel</commod>
      </Source>
    </config>
  </facility>

Sink
~~~~~~~~~~

Similarly, the Cyclus `Sink
<http://fuelcycle.org/user/cyclusagents.html#agents-sink>`_, you must, at
minimum, supply an entry in the ``<in_commod/>`` tag and a ``<capacity/>``. We
want a similar structure to the Source prototype, i.e., connection to the
Storage prototype and a demand for one unit of fuel per time step. We can also
name this Sink prototype "FuelSink".

Accordingly, add the following lines after the Storage prototype

.. code-block:: xml

  <facility>
    <name>FuelSink</name>
    <config>
      <Sink>
        <capacity>1</capacity>
	<in_commods>
          <val>stored_fuel</val>
      	</in_commods>
       </Sink>
    </config>
  </facility>

Storage
~~~~~~~~~

The Storage prototype is fine as it is. If you don't like the name
``OneFacility``, however, you are free to replace it with something more fitting
like ``FuelStorage``. 

.. warning::

    Make sure to replace ``OneFacility`` everywhere though!

Region & Institution
~~~~~~~~~~~~~~~~~~~~~~~

Deployment for facility agents must be declared in the input file. In order for
our source and sink to be deployed at the beginning of the simulation, they must
be added to the ``<initialfacilitylist/>``. Accordingly, add the following lines
below the ``OneFacility`` entry. Note that order here does not matter.

.. code-block:: xml

        <entry>
          <prototype>FuelSink</prototype>
          <number>1</number>
        </entry>
        <entry>
          <prototype>FuelSource</prototype>
          <number>1</number>
        </entry>

So now, the full region and institution configuration should look something like

.. code-block:: xml


  <region>
    <name>OneRegion</name>
    <config>
      <TutorialRegion />
    </config>
    <institution>
      <name>OneInst</name>
      <initialfacilitylist>
        <entry>
          <prototype>OneFacility</prototype>
          <number>1</number>
        </entry>
        <entry>
          <prototype>FuelSink</prototype>
          <number>1</number>
        </entry>
        <entry>
          <prototype>FuelSource</prototype>
          <number>1</number>
        </entry>
      </initialfacilitylist>
      <config>
        <TutorialInst />
      </config>
    </institution>
  </region>

Run the Basic File
--------------------

Run the file with a slightly higher verbosity

.. code-block:: console

    $ cyclus -v 4 input/basic.xml
    
.. note::

    You'll get more helpful information for this run by upping the verbosity
    from ``3`` to ``4``.

What output do you see? Are things working as expected? 

You should see something like the following for a single time step

.. code-block:: console

    INFO1(core  ):Current time: 5
    INFO2(core  ):  Beginning Tick for time: 5
    INFO2(Storag):  Quantity to be requested: 7 kg.
    INFO2(Storag):  Quantity to be offered: 1 kg.
    INFO3(Sink  ):    FuelSink will request 1 kg of stored_fuel.
    INFO3(Source):    FuelSource will offer 1 kg of fuel.
    INFO2(core  ):  Beginning DRE for time: 5
    INFO3(buypol):    policy input (agent OneFacility-12): requesting 7 kg via 1 request(s)
    INFO3(buypol):      - one 7 kg request of fuel
    INFO3(selpol):    policy output (agent OneFacility-12): bidding out 1 kg
    INFO3(selpol):      - bid 1 kg on a request for stored_fuel
    INFO3(selpol):    policy output (agent OneFacility-12):  sending 1 kg of stored_fuel
    INFO3(buypol):    policy input (agent OneFacility-12): got 1 kg of fuel
    INFO2(core  ):  Beginning Tock for time: 5
    INFO2(Storag):  The total inventory at time 5 is 1 kg of material.
    INFO3(Sink  ):    FuelSink is holding 5 units of material at the close of month 5.


Make a More Interesting Input File
-------------------------------------

The previous scenario employed very simple dynamics. A unit of material was sent
from the Source to Storage every time step. After the first time step, a unit of
material was also sent from Storage to the Sink every time step, having been
stored for the interim period.

This consistent flow occurred because, given the storage time :math:`t_s`,
capacity :math:`c`, and throughput :math:`\tau`, the following relation is true

.. math::

    t_s < min(c, \tau)

What happens when :math:`t_s > min(c, \tau)`? Let's find out!

First, make a new input file

.. code-block:: console

    $ cp input/basic.xml input/interesting.xml

and open it with your favorite text editor.

Update the Storage config block to look like

.. code-block:: xml

    <config>
      <Storage>
        <throughput>10</throughput>
        <storage_time>5</storage_time>
        <incommod>fuel</incommod>
        <outcommod>stored_fuel</outcommod>
        <capacity>2</capacity>
      </Storage>
    </config>

Note that now we have :math:`t_s = 5` and :math:`c = 2`.

Run the Interesting File
--------------------------

Run the file

.. code-block:: console

    $ cyclus -v 4 input/interesting.xml

Exercise
+++++++++

Answer the following questions

- When do trades occur? Why?
- How much material is in the Sink at the end of the simulation? Why?

Exercise
+++++++++

Play with the all of the simulation parameters and get a feel for the various
dynamics of this scenario.