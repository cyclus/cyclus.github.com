CEP 25 - Preference Adjustment Process
*****************************************************

:CEP: 25
:Title: Preference Adjustment Process
:Last-Modified: 2015-08-25
:Author: Matthew Gidden
:Status: Accepted
:Type: Standards Track
:Created: 2015-07-07


Abstract
========

This CEP describes the process of adjusting preferences in the DRE, e.g., with
regard to implementing international trade instruments. It generalizes
methodology of the preference adjustment phase.

Motivation
==========

The current preference adjustment phase only includes the requesting facility
and its managers (i.e. institution and region). Only allowing requesting
managers to adjust preferences is problematic because it prohibits, for
example, the complete modeling of intra-regional instruments such as tariffs.

Specification \& Implementation
===============================

In order for managers of bidding regions to apply tariffs, or any other
inter-entity instruments, they must be involved in preference
adjustment. Previously, only managers of the requesting entities were allowed to
affect preference values. This CEP will allow bidders and managers of bidding
entities to affect preferences as well.

There is not a clear reason or motivation as-of-yet to allow requesting managers
to adjust preferences before bidding managers (and vice-versa). Accordingly, a
general approach is taken for the preference *adjustment ordering*
methodology. The entities involved in any trade preference adjustment are the
two traders, and each of their associated managers. In a common Cyclus use case,
this involves two ``Trader`` entities whose immediate "manager" is the
``Facility`` entity of whom they are a member. Further, each ``Facility`` is
managed by an ``Institution`` which is managed by a ``Region``.

For the purpose of this CEP, a default ordering is defined: the requester and
its managers are queried in order followed by the managers of the bidder. The
bidder is not involved, because it is assumed that suppliers are motivated to
reduce inventory. Bidder's managers are involved in order to generally model
international instruments, such as tariffs. As different orderings are desired
in the future, they may be implemented. The only requirement of a given ordering
implementation is that it must maintain a preference adjustment history. That
is, a data structure comprising and ordered list of entity-preference pairs that
records the history of the adjusted preference for each trade.

An important caveat includes the adjustment of preferences to a "no trade"
value. Archetype developers are allowed to denote a trade as "impossible" by
setting the preference value to a non-positive number. If at any point during
the adjustment phase such a state is found, the phase is considered over for
that trade and the trade is removed from the exchange. Consider the following
situation: a trade is initially set to the default preference of unity; the
first manager queried has a rule that negates the trade (sending its value to
negative unity) while the next manager queried has a rule that increases all
trades by a magnitude of two units. Rather than setting the final trade
preference at unity based on input from both managers, the trade is removed from
the exchange after its preference is adjusted by the first manager.

The determination of the final preference value given the adjustment history,
i.e., *the preference aggregation rule*, is also tuneable. One could imagine
many different negotiation models, or negotiation rules, by which to determine a
final value given a collection of entities' input. Again, this CEP provides a
default rule, which is to take the final preference value, unperturbed, through
the adjustment process. However, any rule that takes as an argument the
adjustment history data structure and provides a final preference value is valid
in this methodology. Of course, different rules may be implemented as they are
required.

This CEP does not explicitly provide an user-facing interface for adjusting
either the adjustment ordering or aggregation. The provided methodology is a
novel first step in fuel cycle simulation, and it is not at all clear that full
user control over the adjustment process is necessary for the current set of
modeled scenarios. If that capability is identified as critical path in the
future, a user-facing interface can be implemented that allows adjustment of
both the preference adjustment ordering and preference aggregation
determination.

See [1]_ for implementation of Agent-based preference adjustment.

Backwards Compatibility
=======================

No backwards incompatibilities are introduced with this CEP.

Document History
================

This document is released under the CC-BY 3.0 license.

References and Footnotes
========================

.. [1] https://github.com/cyclus/cyclus/pull/1122
