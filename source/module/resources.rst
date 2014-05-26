
Resources In Cyclus
=================================

One of the defining features of Cyclus among other fuel cycle
simulators is the treatment of resources/materials as discrete, quantized objects
that can be traded and tracked throughout the simulation.

A primary motivation for discrete and quantized materials is the ability to
study the flow of material and the attribution of those materials through
prior ownership.  Such a notion is clear when refering to real world objects
that are clearly defined in a discrete and quantized way.  Perhaps the most
obvious example in a fuel cycle scenario is that of a nuclear fuel assembly.
A nuclear fuel assembly for a given reactor has a clear definition of material
properties (including mass) can be treated as a single unit.

Introduction
------------

The following section will discuss the Resource class, the base class for
items that are passed between agents in a Cyclus simulation.  Materials are
the primary Resource that is transacted in a *Cyclus* simulation.
Conceptually, though, a resource can be anything that might be an interesting
traded item (e.g., electricity, money, or workers).

The Cyclus core provides two types of Resources that can be used/manipulated
by agents:

* Material - a generic material object comprised of a mass and nuclide
  composition.

* Product - a general resource comprised of a quantity of a custom specified
  quality/units.

