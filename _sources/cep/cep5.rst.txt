CEP 5 - Archetype Development Best Practices 
**************************************************************

:CEP: 5
:Title: Archetype Development Best Practices 
:Last-Modified: 2014-06-29
:Author: Matthew Gidden
:Status: Deferred
:Type: Process
:Created: 2014-06-29

.. note::

    This CEP is looking for a champion.

Overview
========

As the archetype ecosystem begins to develop, an initial set of archetype
development best practices need to be identified that both achieve the aims of
fuel cycle simulation and analysis and encourage the continued proliferation of
the ecosystem. This set of best practices should have general consensus among
both kernel and archetype developers, it should be documented, and the best
practices should be used in code examples. This CEP could be a living document
for some amount of time that is updated as additional best practices are
identified.

A primary example of such a concern is archetype interaction implementation. One
of the aims of Cyclus as a fuel cycle simulator is to provide a plug-and-play,
modular platform. Accordingly, there is a desire for archetypes to actually *be*
plug-and-playable. However, in an initial use case, archetype developers found
the easiest archetype implementation to include explicit type identification. 

Three interaction models have been identified:

* *Black Box* - do not dynamically type check, requiring all interfaces be known
  at compile time (note that not even Cyclus currently is completely "black box"
  in this manner -- the institution class type checks its children to access the
  facility's ``Decommission`` API).
* *Grey Box* - dynamic type check can be performed only for |cyclus| and |cyclus|
  toolkit interfaces. To date this has been implemented using toolkit mixins
  with Cycamore agents.
* *White Box* - dynamic type checking can be performed for any interface,
  specifically allowing special interactions between two archetype
  implementations.

A non-deferred version of this CEP will identify these interaction models and
provide guidance for which models the use of which are considered a best
practice.

Document History
================
This document is released under the CC-BY 3.0 license.

