CEP 26 - Generalize the DRE to Optimize Multiple Metrics
********************************************************

:CEP: 26
:Title: Generalize the DRE to Optimize Multiple Metrics
:Last-Modified: 2016-10-19
:Author: Robert Flanagan \& Anthony Scopatz
:Status: Draft
:Type: Standards Track
:Created: 2016-10-19


Abstract
========
This CEP proposes to enable broader user customization of the DRE by opening
up the Cyclus resource exchange interface to many metrics of interest. The DRE will
no longer solely
attempt to minimize quantity divided by preference, but rather be capable of
minimizng or maximizing many metrics jointly. Different DRE solvers may
choose which metrics to include. Along with this new interface will come a
new implementation of the Greedy solver that makes use of all metrics.

Motivation
==========
There are several fundamental issues with preferences as an optimization variable:

1. Global optimization of Request-Bid arcs is not possible because the meaning and
   scale of preferences are independent between requesters.
2. There is no standard conversion from preference to cost, only the convention that
   cost = quantity / preference.
3. The limits of preference are :math:`(0, \infty)`, which implies that there is
   no possible way to reject a bid once it has been made and there is no way to
   represent negative costs (subsidies).
4. The preference adjustment phase cannot guarantee validity of adjustments because
   there is not a uniform preference scaling between requesters.
5. Preferences do not support a consistent way for other metrics to be resolved into
   request preferences. Thus to-date, other metrics have been avoided and discouraged.

The failure of preferences as an optimization variable can be shown with the following
simple system. Consider an exchange graph with two requesters and one bidder for a single
commodity. The requesters both have infinite capacity, while the bidder may only offer
a constrained quantity. The bidder may trade 2 units of qualitatively unique resources
(of the same commodity, e.g. UOX and MOX). Requester 1 has an equal preference (say 5)
for both resources, even though they are qualitatively different. Requester 2, on the
other hand, has a high preference (say 15) for one resource and a low preference (say 1)
for the other resource. Currently in Cyclus, these preferences would be assigned during
the preference adjustment phase.

The DRE, and the greedy solver in particular, would give both units of the resource to
Requester 2. This is because the greedy solver sorts by requester, giving precedence to the
requester with the highest average preference.  Requester 1's average preference is 5
and Requester 2's average preference is 8.  Since, both requesters have infinite (or
greater than or equal to 2 units) of capacity, all bids go to Requester 2.

This situation remains true even as the low preference of Requester 2 tends towards zero
(i.e. 1e-100). There is no way for Requester 2 to reject a bid and thus Requester 1 will
never receive a resource. This can be seen in Figure 1 below.

.. figure:: cep-0026-1.png
    :align: center
    :scale: 50 %

    Figure 1: Simple transaction with weighted preferences.

The above situation can arise in real world fuel cycle scenarios. One example is the
case of partitioning used fuel storage based on decay heat into wet and dry storage.
A used fuel commodity may have instances that are either high or low heat, and storage
requesters must be able to reject material whose decay heats are above its thermal limit.
An additional use case is a system where a reactor may choose to be agnostic to UOX or MOX
in their core while other reactors in the system reject MOX in favor of a strong preference
for UOX. Cyclus would currently give MOX to the reactor that effectively rejected it anyway,
leaving the agnostic reactor unfueled.

As a concept, the current formulation of preferences seems poorly defined and therefore
difficult to explain or intuit. As shown above, this can lead to incorrect and unanticipated
results. From here, an attempt can either be made to patch the preference system with
further constraints or it can be replaced with a more customizable, and thus more intuitive and
directly relevant, concept.

We propose a system that will allow the computation of many potential metrics, will sort
all of the arcs by minimizing or maximizing each each metric in order of a user given
precedence, and then will finally perform a single greedy solve on the sorted arcs.

The set of standard available metrics will include the quantity, preference, and
unit cost. The benefit of providing the unit costs is that they are directly
and linearly comparable to one another. Moreover they more commonly used to make
quantitative comparisons than preferences.
Additionally, costs provide a mechanism for resolving
request objectives (price limit or maximum cost) and bid objectives (offer price).
If an offer price is less than or equal to the request price limit, the request-bid
can be created.  Otherwise the request-bid arc will be rejected.


Specification \& Implementation
===============================
To accomplish the methodology proposed here will require changes to the API within
the dynamic resource exchange and the cyclus core code. At a minimum,

1. Bids will need to be able to hold a unit cost. The API will need to support
   developers accessing and setting this cost.
2. Update Requests to contain a max-unit-cost, as well as a preference.
3. The current greedy solver will need to be updated or replaced to accomodate the
   change from preference to a multivariate solver.
4. Updating all of the existing archetypes within the Cyclus core and Cycamore to
   support this change.

The first change will be to add the ability for bids to hold a unit cost value. The
implementation of this may be simple as it will mirror the implementation of the
current preference attribute of requests. Going forward the request max cost will still be
the default cost for a request-bid arc. However, this may also be accomplished in a
more generic fashion by allowing arbitrary metrics, of which unit cost is only one.

The addition of the unit cost on the request may also be simple.
The majority of the
work required will be updating all ressource exchange calls currently in use
throughout the many archetypes and Cyclus core code.  Similarly, this could be
extended to a framework for arbitrary metrics, of which unit cost is only one.

Once Bids and Requests have their own unit costs, updating the default solver for
Cyclus will be done to perform a global optimization of the entire trade system each
time step. This can be done by collecting all of the possible Request-Bid arcs.
These arcs will be constructed by determining if the bid in the arc has a
unit cost associated with it. If this is the case that unit cost will be used
for the pair. If there is no bid unit cost however, the max-unit-cost of the
request will be used. Again, if a metric framework approach is taken, resolution will
take place via a generic interface, of which cost is only one metric.

Once the arcs have been created, the DRE solver can sort the value of all unit costs
from smallest to largest, quantities from either lowest-to-highest (current behavior)
or highest-to-lowest, and prefences from highest to lowest.
This will therefore minimizing the total cost of the whole system, maximize or
minimize flow, and maximize preference.

As a motivating feature, these changes also increase the flexibility of the
greedy solver interface. Namely, it will grant users the ability to specify
the way the system is optimized. The above mechanism for primarily
minimizing cost is only one method for global optimization. This proposal
identifies three primary, orthoganal metrics that the greedy solver will jointly
solve:

* unit cost (min)
* quantity (min)
* preference (max)

Each of these can also be used in conjuction with each other or without the
others. For example, if two
request-bid arcs have the same unit cost, these two arcs can be sorted by mass or
preference. It will also be possible to choose maximization and minimization for
each of the discussed metrics (unit cost, quantity, preference).

However, the above precedence need not be static. We propose that the user be allowed
to set the ordering of these metrics in the input file.  Furthermore, they will
also be allowed to modify the flag for whether to maximize or minimize each
metric. Such a change would enable a much broader set of use cases to be simulated
according to the users needs. It will also allow the exploration of a vareity
of DRE effects based on precedence changes.
This will be setup through the cyclus input file, but the default ordering will be
``unit cost (min), quantity (min), preference (max)``.

Furthermore, in a framework setting, additional metrics can be registered with the
dynamic resource exchange and then used in the same way as the standard metrics
above.

This change represents a fundamental modification to the behavior of the cyclus
simulator. As mentioned there will be several alterations to the cyclus core code.
We will aimed to update all of these locations with the new code
as well as documentation to help developers update their software and to support
future developers using Cyclus.

Backwards Compatibility
=======================
It is our goal to ensure that the Cyclus core and the Cycamore archetypes will be
updated to be in line with this CEP. Unfortunately any third party archetypes will
need to be updated by those parties.

It is our aim that this change functions as a staging point for a Cyclus 2.0 release.

The current behaviour of the greedy solver will be recoverable by the user if they set
the sorting metrics to be ``average requester pref (max), quantity over preference (min)``.
These two metrics will be added for backwards compatability.

Document History
================

This document is released under the CC-BY 4.0 license.

References and Footnotes
========================

.. .. [1] https://github.com/cyclus/cyclus/pull/1293
