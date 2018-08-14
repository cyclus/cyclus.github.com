Understanding and Adding Archetypes to Your Scenario
++++++++++++++++++++++++++++++++++++++++++++++++++++

Concept: Archetypes
=========================================

One of the principal features of |Cyclus| is the ability for users to easily
switch between different models of fuel cycle facilities.  Models may differ
in the way they choose to represent the physics of the facility, or in the way
they choose for the facility to interact with other facilities, or both. In
|Cyclus|, we call each of these different models an :term:`archetype`.

Archetype Example: Reactor Fidelity
------------------------------------

The easiest way for most fuel cycle analysts to understand the difference
between archetypes is through the example of a reactor model.

* The simplest possible reactor archetype uses the concept of fixed input and
  output recipes to define the transmutation of material.  Such a reactor
  might assume that all material that it receives matches its desired input
  recipe, and that all the material that it then ships as used fuel will match
  its prescribed output recipe.  This will probably run the fastest.
* A more sophisticated reactor archetype uses some form of tabulated data to
  determine both performance characteristics and used fuel discharge
  composition.  It could be as simple as interpolating between a set of
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

* **Source:** This generic source of material may fill the role of any
  facility that produces fresh material.  Depending on how much of the fuel
  cycle a user wants to model explicitly, this could fill the role of a uranium
  mine, an enrichment facility, a fuel fabrication facility, etc.
* **Enrichment:** This facility archetype implements the standard equations for
  enrichment of U-235 in U-238, with a constrained total enrichment capacity.
* **Reactor:** This facility archetype uses simple fuel recipes for a reactor
  that reloads batches of assemblies at regular intervals.
* **Separations:** This facility archetype takes a number of input streams and
  separates all the isotopes into a number of output streams.
* **FuelFab:** This facility archetype mixes streams of fissile and
  fissionable material in order to best approximate a given recipe using the
  d-factor approach.
* **Sink:** This generic sink of material may fill the role of any facility
  that permanently holds used nuclear material.  Depending on how much of the
  fuel cycle a user wants to model explicitly, this could fill the role of a
  geologic repository, an interim storage facility, etc.


Activity: Discover the Available Archetypes
===========================================

Since archetypes can change without having to reinstall |Cyclus|, there is
the ability to automatically discover which archetypes are available.

1. Go to the `archetypes
<http://fuelcycle.org/user/cycamoreagents.html?highlight=source#cycamore-source webpage>`_ webpage and take a full look at the archetypes

2. Ask what archetypes can you see yourself using in your research?

3. Take a look at the reactor archetype and review its input arguments. Think about how you would change the ``cycle_time`` and ``refuel_time`` of a reactor.

Concept: Third-Party Archetypes¶
=========================================
`Third-Party <http://fuelcycle.org/user/index.html?highlight=third-party>`_ Archetypes are archetypes that have been made in addition to the initial archetypes that are available in Cycamore. Popular Third-Party Archetypes are:

* Bright-lite
* Cyborg
* Mbmore Archetypes
* rwc Archetypes

You can see the `archetype developer <http://fuelcycle.org/arche/tutorial/input_files.html>`_ tutorial for more information on making your own Archetypes

Activity: Adding archetypes
-----------------------------

After discovering which archetypes are available, we will select which
subset of archetypes will be used in this particular scenario.

The archetypes we will use in our simulation include:

-  Source: ``UraniumMine``, source of u-ore
-  Enrichment: ``EnrichmentPlant``,enriches u-ore into fresh-uox and outputs tails
-  Reactor: ``1178MWe BRAIDWOOD-1``
-  Sink: ``NuclearRepository``, holds the spent-uox and tails

The archetype section is located under the simulation control section and takes the form:

::

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


Archetype solution
------------------
::

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

Once complete, your Archetypes block should be:
::

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

Now we will add the ``Region`` and ``Institution`` archetypes. These two
archetypes come from the ``agents`` library rather than the ``cycamore``
library.

Using the template and table below,
properly fill the template with the variables listed in the table below.

+-------------+------------------+----------------------------+
| Variable    | Value            | Purpose                    |
+=============+==================+============================+
| ``lib6``    | ``agents``       | Library of the archetype   |
+-------------+------------------+----------------------------+
| ``arch6``   | ``NullRegion``   | Name of archetype          |
+-------------+------------------+----------------------------+
| ``lib7``    | ``agents``       | Library of the archetype   |
+-------------+------------------+----------------------------+
| ``arch7``   | ``NullInst``     | Name of archetype          |
+-------------+------------------+----------------------------+

::

        <spec>
          <lib>lib6</lib>
          <name>arch6</name>
        </spec>
        <spec>
          <lib>lib7</lib>
          <name>arch7</name>
        </spec>
      </archetypes>

Once complete, your `agent` Archetypes block should be:
::

        <spec>
          <lib>agents</lib>
          <name>NullRegion</name>
        </spec>
        <spec>
          <lib>agents</lib>
          <name>NullInst</name>
        </spec>
      </archetypes>

Since these are all archetypes, no matter what library their from, we must append the two archetype sections such as:

::

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
          <lib>agents</lib>
          <name>NullRegion</name>
        </spec>
        <spec>
          <lib>agents</lib>
          <name>NullInst</name>
        </spec>
      </archetypes>

Concept: Source Archetype
=========================
The Source facility acts as a source of material with a fixed throughput (per time step) capacity and a lifetime capacity defined by a total inventory size. It offers its material as a single commodity. If a composition recipe is specified, it provides that single material composition to requesters. If unspecified, the source provides materials with the exact requested compositions. The inventory size and throughput both default to infinite. Supplies material results in corresponding decrease in inventory, and when the inventory size reaches zero, the source can provide no more material.
The Source archetype is of the form:
::

  <facility>
    <name>Source</name>
    <config>
      <Source>
        <outcommod>out_commodity</outcommod>
      </Source>
    </config>
  </facility>



Concept: Enrichment Archetype
==============================
The Enrichment facility is a simple agent that enriches natural uranium in a Cyclus simulation. It does not explicitly compute the physical enrichment process, rather it calculates the SWU required to convert an source uranium recipe (i.e. natural uranium) into a requested enriched recipe (i.e. 4% enriched uranium), given the natural uranium inventory constraint and its SWU capacity constraint.
The Enrichment archetype is of the form:
::

      <facility>
        <name>EnrichmentPlant</name>
        <config>
          <Enrichment>
            <feed_commod>feed_commodity</feed_commod>
            <feed_recipe>feed_recipe</feed_recipe>
            <product_commod>product_commodity</product_commod>
            <tails_commod>tails_commodity</tails_commod>
            <max_feed_inventory>1000000</max_feed_inventory>
          </Enrichment>
        </config>
      </facility>

Concept: Reactor Archetype
==========================
Reactor is a simple, general reactor based on static compositional transformations to model fuel burnup. The user specifies a set of input fuels and corresponding burnt compositions that fuel is transformed to when it is discharged from the core. No incremental transmutation takes place. Rather, at the end of an operational cycle, the batch being discharged from the core is instantaneously transmuted from its original fresh fuel composition into its spent fuel form.

Each fuel is identified by a specific input commodity and has an associated input recipe (nuclide composition), output recipe, output commidity, and preference. The preference identifies which input fuels are preferred when requesting. Changes in these preferences can be specified as a function of time using the pref_change variables. Changes in the input-output recipe compositions can also be specified as a function of time using the recipe_change variables.

The reactor treats fuel as individual assemblies that are never split, combined or otherwise treated in any non-discrete way. Fuel is requested in full-or-nothing assembly sized quanta. If real-world assembly modeling is unnecessary, parameters can be adjusted (e.g. n_assem_core, assem_size, n_assem_batch). At the end of every cycle, a full batch is discharged from the core consisting of n_assem_batch assemblies of assem_size kg. The reactor also has a specifiable refueling time period following the end of each cycle at the end of which it will resume operation on the next cycle if it has enough fuel for a full core; otherwise it waits until it has enough fresh fuel assemblies.
When the reactor reaches the end of its lifetime, it will discharge all material from its core and trade away all its spent fuel as quickly as possible. Full decommissioning will be delayed until all spent fuel is gone. If the reactor has a full core when it is decommissioned (i.e. is mid-cycle) when the reactor is decommissioned, half (rounded up to nearest int) of its assemblies are transmuted to their respective burnt compositions.
The Reactor archetype is of the form:
::

  <facility>
    <name>reactor_name</name>
    <config>
      <Reactor>
        <fuel_incommods> <val>input_fuel_commodity</val> </fuel_incommods>
        <fuel_inrecipes> <val>input_fuel_recipe</val> </fuel_inrecipes>
        <fuel_outcommods> <val>output_fuel_commodity</val> </fuel_outcommods>
        <fuel_outrecipes> <val>output_fuel_recipe</val> </fuel_outrecipes>
        <cycle_time>18</cycle_time>
        <refuel_time>1</refuel_time>
        <assem_size>33000</assem_size>
        <n_assem_core>3</n_assem_core>
        <n_assem_batch>1</n_assem_batch>
        <power_cap>power_out</power_cap>
      </Reactor>
    </config>
  </facility>

Concept: Sink Archetype
=======================

A sink facility that accepts materials and products with a fixed throughput (per time step) capacity and a lifetime capacity defined by a total inventory size. The inventory size and throughput capacity both default to infinite. If a recipe is provided, it will request material with that recipe. Requests are made for any number of specified commodities.
The Sink archetype is of the form:
::

  <facility>
    <name>Sink_name</name>
    <config>
      <Sink>
        <in_commods>
          <val>input_commodity</val>
          <val>input_commodity</val>
        </in_commods>
      </Sink>
    </config>
  </facility>
