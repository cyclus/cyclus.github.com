CEP 24 - Preference Conventions
*****************************************************

:CEP: 24
:Title: Preference Conventions
:Last-Modified: 2015-04-20
:Author: Matthew Gidden
:Status: Proposed
:Type: Process Track
:Created: 2015-04-09


Abstract
========

This CEP concerns default preferences and preference adjustment with regard to
implementing international trade instruments.


Motivation
==========

The current default preference is zero, and the current preference adjustment
phase only includes the requesting facility and its managers (i.e. institution
and region). Preferences of zero are problematic because they are invariant
under multiplication. Only allowing requesting managers to adjust preferences
are problematic because it prohibits the complete modeling of intra-regional
instruments such as tariffs.


Rationale
=========

The default preference will change from zero to unity. Default preferences will
then be stable under both additive and multiplicative operations. Negative
preferences will still denote potential trades to be removed from resource
exchanges before the solution phase.

Further, in order for managers of bidding regions to apply tariffs, or any other
inter-entity instruments, they must be involved in preference
adjustment. Previously, only managers of the requesting entities were allowed to
affect preference values. This CEP will allow managers of bidding entities to
affect preferences as well.

There is not a clear reason or motivation as-of-yet to allow requesting managers
to adjust preferences before bidding managers (and vice-versa). Accordingly,
there is no defined ordering between managers, only between management
levels. That is, in the current context of Cyclus and Cycamore, all institutions
will adjust preferences before Regions adjust preferences. Furthermore, this
type of adjustment will be defined on the `Agent` interface, since all managers
of `Trader`\s are `Agent`\s.

Specification \& Implementation
===============================

See [1]_ for the implementation of unity default preferences and [2]_ for
implementation of Agent-based preference adjustment.

Backwards Compatibility
=======================

API backwards compatability is not broken with this CEP. However, trade logic
backwards compatability will be broken if any previous model was dependent on a
default preference value of `0`. Developers will have to update models given the
new default preference value of `1`. Look primarily to the `AddRequest` and
`Adjust*Pref` APIs.

Document History
================

This document is released under the CC-BY 3.0 license.

References and Footnotes
========================

.. [1] https://github.com/cyclus/cyclus/pull/1121
.. [2] https://github.com/cyclus/cyclus/pull/1122