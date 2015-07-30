Adding a Separations Facility
================================

The separations facility will request all the commodities in its Feed
Commodity List, and separate them into any number of streams, plus a waste
stream.

* Our feed commodity list should include both:
   * Used-UOX-Fuel
   * Used-MOX-Fuel
* The maximum feed inventory is the most feed material that we'll have on
  hand: 1000 tonnes.
* The maxium separations throughout is the size of our plant: 80 tonnes/timestep
* This simple scenario will have a single output stream: Separated-Fissile
    * we will hold no more than 5 tonnes of separated material on hand at any time
    * 99% of all Pu (94000) will go into that stream
* all other material will go to waste

In user level 1, we will change the "Leftover Commodity" to be Separated-Waste.

