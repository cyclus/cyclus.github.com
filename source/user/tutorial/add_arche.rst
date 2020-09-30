Understanding Archetypes 
++++++++++++++++++++++++

Concept: Archetypes
===================

One of the principal features of |Cyclus| is the ability for users to easily
switch between different models of fuel cycle facilities.  Models may differ
in the way they choose to represent the physics of the facility, or in the way
they choose for the facility to interact with other facilities, or both. In
|Cyclus|, we call each of these different models an :term:`archetype`.

Archetype Example
-----------------

The easiest way for most fuel cycle analysts to understand the difference
between archetypes is through the example of a reactor model.

* The simplest possible reactor archetype uses the concept of fixed input and
  output recipes to define the transmutation of material.  Such a reactor
  might assume that all material that it receives matches its desired input
  recipe, and that all the material that it then ships as used fuel will match
  its prescribed output recipe.  This will probably run the fastest.
* A more sophisticated reactor archetype uses some form of tabulated data to
  determine both **performance characteristics** and **used fuel discharge
  composition**.  It could be as simple as interpolating between a set of
  possible input recipes and then using that interpolation on a set of
  corresponding output recipes.  A more complex version of such an archetype
  could even have tabulated reactor physics parameters for more fidelity.
* The most sophisticated reactor archetype may actually be a wrapper for fuel
  depletion software, and perform a full depletion calculation each time new
  fuel arrives at the reactor.  This will probably take the most computer time
  to complete.

Assuming that such archetypes are available, the user is welcome to choose
which archetype to use, based on the modeling fidelity they are interested in
and/or the performance requirements they have for their simulations.

Cycamore: The |Cyclus| Additional Module Repository
----------------------------------------------------

The |Cyclus| team has developed a simple standard set of archetypes to support
basic fuel cycle modeling situations.  In most cases they implement very
simple models and are useful for tutorials such as this, and as a standard way
to model facilities that may be at the peripheral of a problem.  The Cycamore
facility archetypes are:

* **Source:** `Source <http://fuelcycle.org/user/cycamoreagents.html#cycamore-source>`_ is a generic source of material may fill the role of any
  facility that produces fresh material.  Depending on how much of the fuel
  cycle a user wants to model explicitly, this could fill the role of a uranium
  mine, an enrichment facility, a fuel fabrication facility, etc. The Source facility produces resources at a user-specified rate and may be limited to a user-specified total inventory.
* **Enrichment:** `Enrichment <http://fuelcycle.org/user/cycamoreagents.html#cycamore-enrichment>`_ is a facility archetype that implements the standard equations for
  enrichment of U-235 in U-238, with a constrained total enrichment capacity.
* **Reactor:** `Reactor <http://fuelcycle.org/user/cycamoreagents.html#cycamore-reactor>`_ is a facility archetype which uses fresh and spent fuel recipes to model fuel transmutation.
  that reloads batches of assemblies at regular intervals.
* **Separations:** `Separations <http://fuelcycle.org/user/cycamoreagents.html#cycamore-separations>`_ is a facility archetype that receives one or more material streams and
  separates all the isotopes into a number of output streams.
* **FuelFab:** `FuelFab <http://fuelcycle.org/user/cycamoreagents.html#cycamore-fuelfab>`_ is a facility archetype that mixes streams of fissile and
  fissionable material in order to best approximate a given recipe using the
  d-factor approach.
* **Sink:** `Sink <http://fuelcycle.org/user/cycamoreagents.html#cycamore-sink>`_ is a generic sink of material that may fill the role of any facility
  that permanently holds used nuclear material.  Depending on how much of the
  fuel cycle a user wants to model explicitly, this could fill the role of a
  geologic repository, an interim storage facility, etc.


Activity: Discover the Available Archetypes
===========================================

Since archetypes can change without having to reinstall |Cyclus|, there is
the ability to automatically discover which archetypes are available.

1. Go to the `archetypes
<http://fuelcycle.org/user/cycamoreagents.html?highlight=source#cycamore-source webpage>`_ webpage and read about the available archetypes

2. What archetypes can you see yourself using in your research?

3. Review the input parameters of the `Reactor <http://fuelcycle.org/user/cycamoreagents.html#cycamore-reactor>`_  archetype. How would you customize the ``cycle_time`` and ``refuel_time`` of a reactor to represent a real-world nuclear power plant?

Concept: Third-Party Archetypes
=========================================
`Third-Party <http://fuelcycle.org/user/index.html?highlight=third-party>`_ Archetypes complement the initial archetypes available in Cycamore and are not necessarily maintained by the Cyclus core development team.  Popular Third-Party Archetypes are:

* Bright-lite
* Cyborg
* Mbmore Archetypes
* rwc Archetypes

Review the `archetype developer tutorial <http://fuelcycle.org/arche/tutorial/input_files.html>`_ for more information on making your own Archetypes.

Activity: Adding archetypes
-----------------------------

After discovering which archetypes are available, we will select which
subset of archetypes will be used in this particular scenario.

The archetypes we will use in our simulation include:

-  ``cycamore Source``: to act as the mine
-  ``cycamore Enrichment``:to act as the enrichment facility
-  ``cycamore Reactor``: to act as the LWR
-  ``cycamore Sink``: to act as the geological repository. 

A user identifies the simulation archetypes in the archetype block of the Cyclus input file. 
The archetype block is located after the simulation control block and takes the form:

.. code-block:: XML

    <archetypes>
        <spec>
          <lib>cycamore</lib>
          <name>arch_1</name>
        </spec>
        <spec>
          <lib>cycamore</lib>
          <name>arch_2</name>
        </spec>
    </archetypes>

where ``lib`` is the library in which the archetype came from and name is
the archetype name. Let's build our archetypes!
Using the template below and the table below,
properly fill the template with the variables listed in the table below.

+-------------+------------------+----------------------------+
| Variable    | Value            | Purpose                    |
+=============+==================+============================+
| ``lib1``    | ``cycamore``     | Library of the archetype   |
+-------------+------------------+----------------------------+
| ``arch1``   | ``Enrichment``   | Name of archetype          |
+-------------+------------------+----------------------------+
| ``lib2``    | ``cycamore``     | Library of the archetype   |
+-------------+------------------+----------------------------+
| ``arch2``   | ``Reactor``      | Name of archetype          |
+-------------+------------------+----------------------------+
| ``lib3``    | ``cycamore``     | Library of the archetype   |
+-------------+------------------+----------------------------+
| ``arch3``   | ``Source``       | Name of archetype          |
+-------------+------------------+----------------------------+
| ``lib4``    | ``cycamore``     | Library of the archetype   |
+-------------+------------------+----------------------------+
| ``arch4``   | ``Sink``         | Name of archetype          |
+-------------+------------------+----------------------------+


Archetype Block Template
------------------------
.. code-block:: XML

      <archetypes>
        <spec>
          <lib>lib1</lib>
          <name>arch1</name>
        </spec>
        <spec>
          <lib>lib2</lib>
          <name>arch2</name>
        </spec>
        <spec>
          <lib>lib3</lib>
          <name>arch3</name>
        </spec>
        <spec>
          <lib>lib4</lib>
          <name>arch4</name>
        </spec>

Once complete, your Archetypes block should look like:
.. code-block:: XML

  <archetypes>
      <spec>
        <lib>cycamore</lib>
        <name>Enrichment</name>
      </spec>
      <spec>
        <lib>cycamore</lib>
        <name>Reactor</name>
      </spec>
      <spec>
        <lib>cycamore</lib>
        <name>Source</name>
      </spec>
      <spec>
        <lib>cycamore</lib>
        <name>Sink</name>
      </spec>
      <spec>
Once complete, append the archetypes section under the control section of input file. 