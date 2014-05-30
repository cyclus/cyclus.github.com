Fundamental Concepts in Cyclus
================================

Several fundamental concepts are deeply engrained in the |Cyclus| kernel, and
understanding them is important for users and developers of |Cyclus|.  

The following concepts are defined in more detail below:

* |Cyclus| is an agent-based simulation
* agents are either regions, institutions, or facilities
* |Cyclus| tracks the evolution of a system over time
* agents interact through a dynamic resource exchange that is recomputed at each time step
* |Cyclus| catalogs the transactions of discrete quanta of resources
* agents may enter or leave the simulation over its lifetime
* each agent is deployed as a clone of a prototype
* each prototype is defined as a configuration of an archetype
* archetypes are loaded dynamically at runtime and can be contributed by any user/developer

Agent-Based Simulation
----------------------

A |Cyclus| simulation models a system of discrete agents that interact to
exchange resources.  Most of the behavior of a |Cyclus| simulation is the
result of the interaction among a set of individual and nominally independent
agents.

Region, Institution, Facility Hierarchy
---------------------------------------

The primary agent interaction is among Facility agents, each representing a
single discrete nuclear fuel cycle facility.  

Each Facility agent is owned/operated by an Institution agent, representing a
legal operating organization such as a utility, government, non-governmental
organization, etc.  Institution agents are responsible for deploying and
decommissioning Facility agents.  

Each Institution operates in a Region agent, representing a geopolitical
region such as a nation-state, sub-national state, super-national region, etc.
Region agents are responsible for requesting the deployment of additional
Facilities through their Institutions.

Institution and Region agents can alter the way that their Facility agents
interact with other Facility agents.

Tracking the Evolution of a System Over Time
---------------------------------------------

A |Cyclus| simulation marches through time with a fixed time step.  At each
time step, the system itself may change and the dynamic resource exchange is
recomputed.

Dynamic Resource Exchange
-------------------------

Facility agents interact through the dynamic resource exchange by submitting
requests for resources and/or receiving bids to provide those resources.  All
facilities that request resources can then establish their preferences across
the set of bids they receive and the global set of preferences is used to
resolve the exchange by maximizing the global preference.

Discrete Resource Tracking
--------------------------

The outcome of the dynamic resource exchange is a set of transactions of
discrete resources, with specific quantities and identities, between specific
facility agents.  These discrete resources can be tracked through their
life cycle by their identities.

Agent Deployment and Decommissioning
------------------------------------

Facility agents can be deployed or decommissioned at each time step, changing
the system that is being modeled through the dynamic resource exchange.  The
decision of when to deploy new facility agents and which agents to deploy is
made by the institution agents based on user input.  Agents may be
decommissioned either because they reach their lifetime or because a decision
to decommission is made by the institution that operates them.


Agent Prototypes
----------------

Each agent in the simulation is deployed as a copy of a prototype.  A
prototype is formed by adding user-defined configuration details to an
archetype.

Agent Archetypes
----------------

Agent archetypes define the logic that governs the behavior of an agent.  An
archetype may allow a user to define some parameters that influence that
behavior.  Broadly speaking, the behavior of an agent can be divided into the
behavior that represents the physical models of the system and the behavior
that represents the interaction of the agent with other agents.  


Run-time Discovery and Loading of Archetypes
--------------------------------------------

To maximize the flexibility of the |Cyclus| infrastructure, is has been
designed to allow the addition of new archetypes without having to make any
changes to the |Cyclus| kernel.  Therefore, the kernel has no *a priori*
knowledge of archetypes or their behavior other than how they are
deployed/decommissioned and how they interact with the dynamic resource
exchange.  For this reason, every |Cyclus| simulation must find and load the
archetypes requested by the user.
