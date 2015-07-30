Adding a Stream Mixing Fuel Fabrication Facility
==================================================

The cycamore FuelFab archetype uses some equivalence factors to mix streams of
fissile material with so-called "filler" material in an attempt to match the
requested recipe.

In this case, the following configuration will be a good start:

* Filler stream commodity: U-ore
* Filler stream recipe: Nat-U
* Filler stream inventory capacity: 1000 tonnes
* Fissile stream commodity: Separated-Fissile
* Fissile stream inventory capacity: 5 tonnes
* Output Commodity: Fresh-MOX-Fuel
* Maximum Throughput: 2 tonnes/timestep
* Specturm type: "thermal"

