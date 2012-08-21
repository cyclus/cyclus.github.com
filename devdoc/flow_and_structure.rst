
.. summary Description of the Initialization of a Simulation

We consider a simulation to be comprised of entitites (agents) that
interact with elements in the simulation. This document is meant to 
describe in more detail what entities and elements are and how they are
created within the simulation. Note that the words entity and agent
can be used interchangably.

Simulation Elements
===================
Simulation elements are objects in the simulation that entities query 
or manipulate. Some elements are:
* resources
* recipes, which describe material resources
* commodities, which define a subset of resources
* markets, which facilitate the transaction of resources amongst agents

Simulation Entities
===================

Simulation Start Up
===================

Here we describe the major events that occur between entering the
main() function and making the function call to run the simulation. 
This process involves dynamically loading a number of different
constructors for classes from dynamic libraries, called modules.

In general, we call this process "loading the input file." The 
process is listed below:

#. Read and initialize temporal data
  * the simulation starting time
  * the simulation duration
  * information about how/what frenquency to decay material

#. Read and initialize simulation elements
  * recipes used in the simulation
  * markets and commodities
    * initialize markets via xml

  * prototypes (various facilities used in the simulation)
    * initialize prototypes via xml

#. Read, initialize, and load simulation entities
  * institutions
    * initialize institutions via xml

  * regions
    * initialize regions via xml
    * load regions into simulation
    * load institutions into simulation

Entering the Simulation
=======================





