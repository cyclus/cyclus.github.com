
.. summary Developers notes for the implementation of a new FacilityModel

Developing Facility Models
==========================

Details
-------

In addition to inheriting from the main dynamic loading base class `Model`, all
FacilityModel models also inherit from `Communicator`.

A FacilityModel is one of the primary actors in the *Cyclus* system.  All
offers and requests originate at an instance of a FacilityModel and all
shipments are executed by an instance of a FacilityModel.

While running, *Cyclus* will use a FacilityModel in two ways.  First, it will
read user input to define a template instance of a FacilityModel.  A choice of
a FacilityModel model combined with some distinct set of parameters for that
model results in a facility that is available for deployment by an InstModel
institution if allowed by that institution's RegionModel region.  Second,
*Cyclus* will create copies of the FacilityModel facilities as they are
deployed by the institutions.  For this reason, the FacilityModel class defines
a data member `fac_name` that is the name of the individual deployed facility.

All FacilityModel models should know which set of Commodity objects they trade
and/or which MarketModel markets they participate in.  Each FacilityModel model
should implement a method named `sendMessages` to generate offer and request
messages to send to their markets and methods named `sendMaterial` and
`receiveMaterial` to process shipment messages that originate with their
markets.
