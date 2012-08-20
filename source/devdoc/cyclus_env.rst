
.. summary Cyclus Environment description

The Cyclus Environment
======================

Agents and Markets
------------------

In the most abstract sense, *Cyclus* provides a platform for agent-based simulation, in which:
 * agents interact by offering and requesting resources,
 * clearinghouses collect and resolve those offers/requests for like resources, and
 * clearinghouses instruct agents to transfer those resources.

There are three fundamental types of agents:
 * Regions - representing geopolitical regions
 * Institutions - representing legal entities that own/operate facilities
 * Facilities - representing specific facilities in a nuclear fuel cycle.

The clearinghouses are represented in *Cyclus* as Markets.

There are 5 fundamental properties that may be inherited by agents and Markets:
 * dynamically loadable modules - Model (to be DynamicModule?)
 * communication of offers, requests and transactions - Communicator
 * management of time steps - TimeAgent (to be TimeHandler?)
 * participation in a tree of agents - SimulationTree
 * agent prototypes available for concrete instantiation - Prototype

+-----------------+---------+--------------+------------+---------+
|                 | Regions | Institutions | Facilities | Markets |
+-----------------+---------+--------------+------------+---------+
| DynamicModule   |   X     |      X       |     X      |    X    |
+-----------------+---------+--------------+------------+---------+
| Communicator    |   X     |      X       |     X      |    X    |
+-----------------+---------+--------------+------------+---------+
| TimeHandler     |   X     |      X       |     X      |         |
+-----------------+---------+--------------+------------+---------+
| SiumulationTree |   X     |      X       |     X      |    X    |
+-----------------+---------+--------------+------------+---------+
| Prototype       |         |              |     X      |         |
+-----------------+---------+--------------+------------+---------+


Simulation and Agent Initialization 
++++++++++++++++++++++++++++++++++++

A simulation is initialized in the following order:
 * define & initialize Markets
 * define & register Resources recipes to be used by Facilities
 * define & register prototypes of Facilities
 * populate a tree of simulation agents with
     * Regions, and their
         * Institutions, and their
             * Facilities that exist in the initials state.

Dynamic Loading
+++++++++++++++

Dynamic loading of modules occurs only when a particular module is
requested by a user.  When such a request is made, the shared object
for that module loaded by the simulation and its constructor is
registered for use when new modules are instantiated, using a
Factory-like design pattern.

On Facility Prototypes and their Use
++++++++++++++++++++++++++++++++++++

As *Cyclus* steps forward in time and deploys new facilities, each
facility is generally a new instance of a similar facility, possibly
with some distinguishing characteristics.  To enable this, facility
prototypes are defined by the user and those prototypes are cloned to
make concrete instance of the actual facilities that will act as
agents.  

The institutions that will ultimately deploy facilities are given
lists of prototypes that they are allowed to deploy and then manage the
steps necessary to invoke the following steps:
 * clone the prototype to create a concrete facility instance,
 * add the concrete instance to the simulation tree, and
 * specialize the concrete instance by changing any appropriate parameters.

Resources and Materials
-----------------------

Utility Classes
---------------

 * XMLQueryEngine
 * DecayHandler
 * BookKeeper
 * CycException
 * Logger

