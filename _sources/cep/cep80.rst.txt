CEP 80 - Cycamore Archetype API/Warning Requirements 
**************************************************************

:CEP: 80
:Title: Cycamore Archetype API/Warning Requirements 
:Last-Modified: 2015-05-21
:Author: Matthew Gidden
:Status: Draft
:Type: Process
:Created: 2015-05-21

Abstract
==========

History has shown that initial designs for archetypes can be quickly found to be
insufficient after usage by others. With timely user response, these designs can
be updated to be more robust in a short period of time, thereby satisfying a
broader range of use cases. This CEP proposes a standard workflow requiring
warnings in any new archetype for at least one release cycle.

Proposal
===========

Reasoning
-----------

An archetype developer can design a general archetype that satisfies her set of
use cases. After sufficient review, valid and useful archetypes should be merged
into Cycamore. A number of use cases have shown that small additions, however,
can be made to otherwise useful archetypes that greatly expand their set of use
cases. This process is healthy, should be expected, and the ecosystem sanctioned
workflow should take account of it.

Requirements
---------------------------

Any *new* archetype proposed to be merged into Cycamore *must* have an
``ExperimentalWarning`` in its constructor and its user-facing API (i.e., input
file format) is considered unstable. This warning and expected instability must
remain until at least the next microrelease.

Backwards Compatibility
=======================

Any archetypes in Cycamore at the present time that did not exist at the last
microrelease must be updated to conform to this CEP.

Document History
================

This document is released under the CC-BY 3.0 license.
