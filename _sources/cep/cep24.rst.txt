CEP 24 - Default Preferences
*****************************************************

:CEP: 24
:Title: Default Preferences
:Last-Modified: 2015-07-29
:Author: Matthew Gidden
:Status: Accepted
:Type: Standards Track
:Created: 2015-04-09


Abstract
========

This CEP describes agreed-upon default preference values within the DRE.

Motivation
==========

The current default preference is zero. Preferences of zero are problematic
because they are invariant under multiplication and do not behave well under
monotonic transformations (e.g., the inversion operator).

Rationale
=========

The default preference will change from zero to unity. Default preferences will
then be stable under both additive and multiplicative operations. Currently,
negative preferences denote potential trades to be removed from resource
exchanges before the solution phase. This will change from negative to
non-positive preferences (see `Backwards Compatibility`_).

Specification \& Implementation
===============================

See [1]_ and [2]_ for the implementation of unity default preferences.

Backwards Compatibility
=======================

API backwards compatability is not broken with this CEP. However, trade logic
backwards compatability will be broken if any previous model was dependent on a
default preference value of `0`. Developers will have to update models given the
new default preference value of `1`.

For a simulator, however, this is still backwards incompatability -- simulation
behavior for valid input files can (and will) change if explicit use of 0-valued
preferences is engaged. Accordingly, to make this deprecation loud and explicit,
an error will be thrown for the remainder of this minor release cycle (currently
release 1.3.1 to 1.3.2). At the end of this cycle, arcs with 0-valued
preferences will be "quietly" removed (i.e., as quietly as negative-preference
arcs are currently). An issue will be made to perform this update.

For updating archetype code, look primarily to the `AddRequest` and
`Adjust*Pref` APIs.

Document History
================

This document is released under the CC-BY 3.0 license.

References and Footnotes
========================

.. [1] https://github.com/cyclus/cyclus/pull/1121
.. [2] https://github.com/cyclus/cycamore/pull/381
