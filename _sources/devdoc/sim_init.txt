
.. summary Description of the Initialization of a Simulation

Simulation Overview and Initialization
======================================

We consider a simulation to be comprised of entities (agents) that
interact with elements in the simulation. This document is meant to 
describe in more detail what entities and elements are and how they are
created within the simulation. 

Note that the words entity and agent can be used interchangeably.

Simulation Elements
-------------------
Simulation elements are objects in the simulation that entities query 
or manipulate. Some elements are:

* resources
* recipes, which describe material resources
* commodities, which define a subset of resources
* markets, which facilitate the transaction of resources amongst agents
* prototypes, which can be copied and initialized as simulation entities

Prototypes
++++++++++
Prototypes are a unique type of simulation element. Prototypes can be
considered yet-to-be initialized simulation entities, and they are the
main mechanism by which to describe Facility modules.

More specifically, prototypes are entities designed to be copied
many times over the course of a simulation due to common aspects.

Simulation Entities
-------------------
Simulation entities are agents that take actions and respond to actions
taken by other agents in the simulation. Some agents are:

* regions
* institutions
* facilities, which are initialized from prototypes


Simulation Start Up
-------------------

Here we describe the major events that occur between entering the
main() function and making the function call to run the simulation. 
This process involves dynamically loading a number of different
constructors for classes from dynamic libraries, called modules.

In general, we call this process "loading the input file." The 
process is listed below:

  1. Read and initialize temporal data

    * the simulation starting time
    * the simulation duration
    * information about how/what frequency to decay material

  2. Read and initialize simulation elements

    * recipes used in the simulation
    * markets and commodities
    * initialize markets via XML
    * prototypes (various facilities used in the simulation)
      * initialize prototypes via XML

  3. Read, initialize, and load simulation entities

    * institutions
      * initialize institutions via XML
    * regions
      * initialize regions via XML
      * load regions into simulation
      * load institutions into simulation

  4. Run the simulation

Entering the Simulation
-----------------------
When simulation entities are loaded into the simulation, they are
placed in a hierarchy, i.e. a parent-child tree. The tree structure
has the general form:

* Region

  * Institution 1

    * Facility A
    * Facility B
    * ...

  * ...

* ...

Both region and institution entities enter the simulation during the
simulation initialization, i.e. they always exist. Facilities enter
the simulation when prompted to (i.e., when built) by their parent
Institution. All Institutions may choose to build Facilities during 
their loading step, thus a fully-formed simulation must begin with
all Regions and Institutions placed in the simulation tree, but may 
begin without any Facilities placed in the tree.
