CEP 31 - Agent Registered Discrete Event Timing 
***********************************************************

:CEP: 31
:Title: Agent Registered Discrete Event Timing 
:Last-Modified: 2026-02-20
:Author: Meghan Krieg <kriegm@oregonstate.edu>
:BDFP: Madicken Munk/Paul Wilson
:Status: Draft
:Type: Standards Track
:Created: 2026-02-19
:Cyclus-Version: 1.6.0

Background
===========

|Cyclus| currently runs using a fixed increment time advancement mechanism, ``dt``. 
Within each ``dt`` of the simulation, cyclus's cardinal function progresses through a distinct ordering
of 6 phases which include the 

- Building Phase
- Tick Phase 
- Exchange Phase 
- Tock Phase
- Decision Phase
- Decomissioning Phase

before advancing to the next time step. One of the core paradigms of this implementation is 
that all agents within the simulation must participate in the Dynamic Resource Exchange and 
the surrounding time execution steps (Tick/Tock phases). The ordering of these phases allows
the maxiumum transition of resources with building phase completed first and decomissioning last. 
In addition to this feature, the phase ordering toggles between two categories: agent phase nad kernel phase. 
While the kernel phase represents events that alter the simulation state, agent phases include
actions that update an agent's internal state. For more information, refer to `CEP 20<https://fuelcycle.org/cep/cep20.html>`_. 

Where `CEP 20<https://fuelcycle.org/cep/cep20.html>`_ defined cyclus as a broadly discrete event simulation, CEP 31 will push the implementation
further. 

Motivation and Rationale
==========================

Simulations with event based or discrete event timing run on an internal clock rather than a fixed simulation
clock (as featured in cyclus). For this internal clock, events that alter the simulation state are registered at distinct timestamps
within the simulation duration. The simulation progresses from scheduled event to scheduled event skipping timestamps
where no actions are registered. For example, an agent may schedule a build-event at timestamp 5, a trade event at timestamp 7, and a decomission event at timestamp 10.
Then, the timeline for a 10 month simulation will proceed as follows 

.. class:: center

   **START 3 (build) -- 5 (trade) -- 7 (decom) END**

as opposed to the current implementation 

.. class:: center
  **START 0 -- 1 -- 2 -- 3 (build) -- 4 -- 5 (trade) -- 6 -- 7 (decom) -- 8 -- 9 -- 10 END**

In cyclus, discrete even timing can be implemented by allowing agents to internally check their inventory
and status to register themselves for DRE participation, Build, or Decomission events. In instances
when no agents reigster actions, there will be no events, and the simulation will skip that timestmap. Agents will
dicate the dynamics of the simulation instead of a fixed timestep forcing interactions. 

With many timesteps skipped between agent's cycle/event registrations, computational time will be lower. 

Conceptualization 
===============================

Based on the current structure set up by the kernal and agent steps in the phase suit, the following
discrete event implementation is suggested...

Events in the simulation's internal clock can be requested by agents using their own ``EventRequest()`` function. 
Events may only be registered when agents wish to complete the follwing actions: 

- Build
- Request Materials
- Decomission 

These actions map to the current *kernel* phases of cyclus's cardinal function. Thus, by extent, 

- Tick
- Tock
- Decision

may not be considered events because they do *not* change the simulation state. They change 
the agent's internal state (agent phase). As these actions are not events, they may never be independently registered by agents. 
(There are scenarios in which build/requets/decomission may trigger them, however.)

For the DRE, agents will *only* be able to register for material requests; thus, material demands instead of material
supply will drive the DRE scheduling. When agents go to register an event by requesting a material, they are unaware of the state of other agent's 
supplies. So, for the subset of agents that are triggering DRE events through material requests, *all available
agents in the simulation must be accessible to the DRE to request bids and responses*. This ensures that material request events aren't prohibited from being satisfied 
even when requested material exists. 

Because of the required attendance for all agents in the material bids stage of the DRE, the agent phases Tick/Tock/Decision must be triggered 
for all available agents as well. These internal Tick/Tock/Decision updates are crucial for deriving accurate *bid* information for request portfolios. There are further
filtering options that consider deregistering an agent's Tocks/Decisions when they make no material bids. 

Implementation
===============================

Material requests, Build, and Decomissioin event registration will be handled by individual agents. Cyclus already creates a preconditioned timeline 
for discrete-build and decomission events. An additional ``EventRequest()`` member funcition for all cycamore archetypes will check a facility's inventory.  

1. If inventory not at capacity, agent will register for the (+1) next immediate time step to attempt another request.
2. If inventory at capacity, agent will register its next request event for a fixed ``+ cycle_length`` time from the current event. 

These material request events will be registered within Context in a dynamic dictionary that contains the event's timestamp and a list of ``Trader`` objects. To ensure that all
facility agents' ``EventRequest()`` functions are checked regularly, A look-ahead function will be added to cyclus's cardinal phase suite after the decomissioning phase. 

.. code-block:: c++
    DoBuild();
    DoTick();
    DoResEx(&matl_manager, &genrsrc_manager);
    DoTock();
    DoDecision();
    DoDecom();
    DoLookAhead();

The cardinal phase suite will maintain its current ordering for the reasons described in CEP 20. Each of the 6 phases will be checked during each event (as opposed to each time step) but the phase will 
only be triggered and completed if it has participants registered. Only the newly introduced ``DoLookAhead()`` that checks each agents ``EventRequest()`` will be executed for all agents each event. 

The simulation will be terminated fully when ``DoLookAhead()`` registers no new events and the simulation has completed the last event registered.

Backwards Compatibility
========================

These changes will not be backwards compatible with cyclus v1.6.0 and may require a new release. An optional simulation parameter could be introduced to switch this treatment on and off 
such that the original time implemenation can be used.




