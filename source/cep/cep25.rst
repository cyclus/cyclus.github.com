CEP 25 - Preference Adjustment Process
*****************************************************

:CEP: 25
:Title: Preference Adjustment Process
:Last-Modified: 2015-07-07
:Author: Matthew Gidden
:Status: Draft
:Type: Standards Track
:Created: 2015-07-07


Abstract
========

This CEP describes the process of adjusting preferences in the DRE, e.g., with
regard to implementing international trade instruments.

Motivation
==========

The current preference adjustment phase only includes the requesting facility
and its managers (i.e. institution and region). Only allowing requesting
managers to adjust preferences are problematic because it prohibits the complete
modeling of intra-regional instruments such as tariffs.

Rationale
=========

In order for managers of bidding regions to apply tariffs, or any other
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

See [1]_ for implementation of Agent-based preference adjustment.

Backwards Compatibility
=======================

No backwards incompatabilities are introduced with this CEP.

Document History
================

This document is released under the CC-BY 3.0 license.

References and Footnotes
========================

.. [1] https://github.com/cyclus/cyclus/pull/1122
