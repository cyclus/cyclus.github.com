CEP 24 - Preference Conventions
*****************************************************

:CEP: 24
:Title: Preference Conventions
:Last-Modified: 2015-07-07
:Author: Matthew Gidden
:Status: Active
:Type: Standards Track
:Created: 2015-04-09


Abstract
========

This CEP describes conventions related to preference values within the DRE,
e.g., what default values should be.

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

See [1]_ for the implementation of unity default preferences.

Backwards Compatibility
=======================

API backwards compatability is not broken with this CEP. However, trade logic
backwards compatability will be broken if any previous model was dependent on a
default preference value of `0`. Developers will have to update models given the
new default preference value of `1`.

For a simulator, however, this is still backwards incompatability -- simulation
behavior for valid input files can (and will) change if explicit use of 0-valued
preferences is engaged. Accordingly, an issue will be made to update this
restriction upon the next minor version release; 0-valued preferences will
continue to be allowed for the current release.

For updating archetype code, look primarily to the `AddRequest` and
`Adjust*Pref` APIs.

Document History
================

This document is released under the CC-BY 3.0 license.

References and Footnotes
========================

.. [1] https://github.com/cyclus/cyclus/pull/1121
