CEP 20 - Time Step Execution Stack
**********************************

:CEP: 20
:Title: CEP Purpose and Guidelines
:Last-Modified: 2014-02-19
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
children, and so on, until all Models receieved a Tick or Tock. It was pointed
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
that executes all events simultaneously that were supposed to have occured in
the time step.

Two key types of events happen in a *Cyclus* simulation:

* the exchange of resources
* agent entry into and exit from the simultion

Simulation entities can have arbitrarily complex state which is dependent on the
results of the exchange and the present status of agents in the
simulation. Accordingly, methods that allow entities to update state must occur
in response to these events and to schedule agent entry and exit. 

Because there is a key event that defines agent interaction in a given time
step, it is necessary to involve all agents in that interaction. Accordingly it
is necessary that there be an ordering between these two key types of events,
deviating slightly from Law's description of fixed-increment time
advance. Specifically, any agent that exists in a given time step should be
included in the resource exchange.

This leads to the following ordering of time step execution:

* agents enter simulation
* agents respond to current simulation state
* resource exchange execution
* agents respond to current simulation state
* agents leave simulation

Technically, whether the agent entry occurs simultaneously with agent exit
because the two (sub)events occur in a direct ordering. It is simpler
cognitavely, however, to think of an agent entering the simulation and acting in
that time step, rather than entering a simulation at a given time and taking its
first action in the subsequent time step.

Specification \& Implementation
===============================

Backwards Compatibility
=======================

Document History
================

This document is released under the CC-BY 3.0 license.

References and Footnotes
========================

.. rubric:: References

.. bibliography:: cep-0020-1.bib
   :cited:
