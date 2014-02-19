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

By Law's definition :cite:`Law:1999:SMA:554952`, a *Cyclus* simulation is
dynamic, discrete-event simulation that uses a fixed-increment time advance
mechanism.

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
