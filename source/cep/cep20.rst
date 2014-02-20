CEP 20 - Time Step Execution Stack
**********************************

:CEP: 20
:Title: CEP Purpose and Guidelines
:Last-Modified: 2014-02-20
:Author: Time Step Execution Stack
:Status: Draft
:Type: Standards Track
:Created: 2014-02-19

Abstract
========

Motivation
==========

The current time step in *Cyclus* consists of the following stack:

* Tick
* Resource Exchange
* Tock

Until very recently, only Regions received ticks/tocks from the Timer
class. They were then expected to pass the Tick/Tock "message" to their
children, and so on, until all Models received a Tick or Tock. It was pointed
out recently that this behavior, when mixed with entity entry and exit into/from
the simulation could produce unexpected behavior, e.g., an entity could
enter/exit in the middle of a time step. Furthermore, modules were developed
specifically taking advantage of this behavior (i.e., the ordering of
ticks/tocks) in order to guarantee that entities that were constructed during
the Tick phase also received a Tick in that phase.

Accordingly, there is a need to standardize what can/should be expected to occur
in each phase of a given time step. Guarantees should be given to module
developers that if an entity enters a simulation, that it will experience the
entire time step on the time step it enters, and if an entity leaves a
simulation, that it will experience an entire time step on the time it leaves. 

Rationale
=========

By Law's definition :cite:`Law:1999:SMA:554952`, a *Cyclus* simulation is,
broadly, a dynamic, discrete-event simulation that uses a fixed-increment time
advance mechanism. In general, fixed-increment time advance scenarios assume a
time step (dt), and assume that all events that would happen during a time occur
simultaneously at the end of the time step. This situation can be thought of as
an event-based time advance mechanism, i.e., one that steps from event to event,
that executes all events simultaneously that were supposed to have occurred in
the time step.

Two key types of events happen in a *Cyclus* simulation:

* the exchange of resources
* agent entry into and exit from the simulation

Simulation entities can have arbitrarily complex state which is dependent on the
results of the exchange and the present status of agents in the
simulation. Accordingly, methods that allow entities to update state must occur
in response to these events and to schedule agent entry and exit. 

Because there is a key event that defines agent interaction in a given time
step, it is necessary to involve all agents in that interaction. Accordingly it
is necessary that there be an ordering between these two key types of events,
deviating slightly from Law's description of fixed-increment time
advance. Specifically, we want to preserve the following invariant: *any agent
that exists in a given time step should be included in the resource exchange,
or, equivalently, experience the entire time step execution stack*.

This leads to the following ordering, or *phases*, of time step execution:

* agents enter simulation (Deployment Phase)
* agents respond to current simulation state (PreExchange Phase)
* resource exchange execution (Exchange Phase)
* agents respond to current simulation state (PostExchange Phase)
* agents leave simulation (Decommissioning Phase)

Technically, whether agent entry occurs simultaneously with agent exit or not
does not matter from a simulation-mechanics point of view, because the two
phases have a direct ordering. It will, however, from the point of view of
module development. It is simpler cognitively to think of an agent entering the
simulation and acting in that time step, rather than entering a simulation at a
given time and taking its first action in the subsequent time step.

In the spirit of Law's definition of a fixed-increment time advance mechanism,
there is a final important invariant: *there is no guaranteed agent ordering of
within-phase execution*. This invariant allows for:

* a more cognitively simple process
* paralellization

Specification \& Implementation
===============================

Two primary concerns exist for changing the current state of *Cyclus* to
incorporate this CEP:

* how to implement agent entry/exit as described
* what name to give to the response phases

Currently, the response phases are called Tick and Tock. These names have been
criticized for not being specific/informative about the expected actions agents
will/should take during the phases. I propose we instead use *PreExchange* and
*PostExchange*. Wordsmithing and/or other suggestions are welcome.

The agent entry/exit question is a bit more involved because of the parent-child
(or manager-managed) relationship agents have in *Cyclus*. Specifically, the
entry and exit of agents should be managed by the agent's manager. The following
provides one possible specification.

.. code-block:: python

  /// @brief execute time step stack
  def Step(context):
      time = context.time()

      for each builder, prototype in build_list[time]:
            builder.build(prototype)

      for each agent in agent_list:
            agent.PreExchange()

      for each manager in resource_exchange_managers:
            manager.Execute()

      for each agent in agent_list:
            agent.PostExchange()

      for each agent in decomm_list[time]:
            agent.parent->decommission(agent)

The primary change here is the notion of a build_list and decomm_list. Managers
of agents, nominally their parent, can add agents to each list as required
during the Pre- and PostExchange phases. At some future time, the building and
decommissioning lists can be made queryable in order to determine future overall
or sub-simulation state (e.g., the power level at a future point in
time). Accordingly, prototypes (which know their initial state) are used in the
build_list and to-be decommissioned agents in the decomm_list.

As described above, the notion of build and decommission lists can change in a
time step. When combined with the invariant that the order of agent execution
within a phase is unordered, future simulation predictions would be unreliable
*if* both lists could be changed in within a phase. Therefore, these lists must
be immutable *during* phases. This issue can be remedied by using staging data
structures and merging the staging data structures into the lists after the
completion of a phase.

Backwards Compatibility
=======================

The overall *Cyclus* implementation/framework will remain largely unchanged,
with the exception of the core's handling of agent entry/exit
registration. *Cycamore* modules that deal with agent entry/exit will have to be
redesigned to incorporate the new execution stack.

Document History
================

This document is released under the CC-BY 3.0 license.

References and Footnotes
========================

.. rubric:: References

.. bibliography:: cep-0020-1.bib
   :cited:
