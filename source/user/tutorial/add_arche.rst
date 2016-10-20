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
  could even have tabulated reactor physics paramters for more fidelity.
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
  cycle a user wants to model explicity, this could fill the role of a uranium
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
---------------------------------------------

Since archetypes can change without having to resinstall |Cyclus|, there is
the ability to automatically discover which archetypes are available.

1. Press the "Discover Archetypes" button to update the archetypes available to you.

.. image:: disc_arche.png
    :align: center
    :alt: View of archetype discovery pane.

2. Select the "Add Archetype to Simulation" drop-down box to see which
   archetypes are available.

Activity: Select Archetypes to Use in this Scneario
------------------------------------------------------

After discovering which archetypes are available on your system, you are able to select which
subset of archetypes will be used in this particular scenario.

1. For this scenario, select each of these archetypes from the drop down box.

* *cycamore Source*: to act as the mine
* *cycamore Enrichment*: to act as the enrichment facility
* *cycamore Reactor*: to act as the LWR 
* *cycamore Sink*: to act as the geoligic respository

Notice how these now appear in the window on the right.

.. image:: arche_ribbon.png
    :align: center
    :width: 100%
    :alt: View of archetype ribbon after adding archetypes
