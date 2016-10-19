CEP 26 - Replace Preference with Unit Cost
*****************************************************

:CEP: 26
:Title: Replace Preference with Unit Cost
:Last-Modified: 2016-10-19
:Author: Robert Flanagan \& Anthony Scopatz
:Status: Draft
:Type: Standards Track
:Created: 2016-10-19


Abstract
========

This CEP proposes to remove the concept of prefernces in the DRE. Unit cost
will replace preference in the Cyclus resource exchange interface. The DRE
will minimize these unit costs directly, rather than the current minimization
of quantity divided by preference.

Motivation
==========
There are several fundemantal issues with preferences as an optimization variable:

1. Global optimiztion of Request-Bid arcs is not possible because the meaning and
   scale of preferences are independent between requesters.
2. There is no standard conversion from preference to cost, only the convention that
   cost = quantity / preference.
3. The limits of preference are :math:`(0, \infty)`, which implies that there is
   no possible way to reject a bid once it has been made and there is no way to
   represent negative costs (subsities).
4. The prefernce adjustment phase cannot gaurantee validty of adjustments because
   there is not a uniform preference scaling between requesters.
5. Preference do not support a consistent way for request preferences and bid costs
   to be resolved. Thus to-date, bid costs have been avoided and discouraged.

The failure of preferences as an optimization variable can be shown with the following
simple system. Consider an change graph with two requesters and one bidder for a single
commodity. The requesters both have infinite capcity, while the bidder may only offer
a constrainted quantity. The bidder may trade 2 units of qualitatively unique resources
(of the same commodity, e.g. UOX and MOX). Requester 1 has an equal preference (say 5)
for both resources, even though they are qualitatively different. Requester 2, on the
other hand, has a high prefernce (say 15) for one resource and a low preference (say 1)
for the other resource. Currently in Cyclus, these preferences would be assigned during
the preference adjustment phase.

The DRE, and the greedy solver in particular, would give both units of the resource to
Requester 2. This is because the greedy solver sorts by requester, giving precendce to the
requester with the highest average preference.  Requester 1's average preference is 5
and Requester 2's average preference is 8.  Since, both requesters have infinite (or
greater than or equal to 2 units) of capacity, all bids go to Requester 2.

This situation remains true even as the low preference of Requester 2 tends towards zero
(i.e. 1e-100). There is no way for Requester 2 to reject a bid and thus Requester 1 will
never receive a resource.

.. image:: cep-0026-1.png
    :align: center
    :scale: 50 %

The above situation can arise in real world fuel cycle scenarios. One example, is the
vase of partitioning spent fuel storage based on decay heat into wet and dry storage.
A spent fuel commodity may have instance that are either high or low heat, and storage
requesters must be able to reject material whose decay heats are above it thermal limit.
An additional use case is system where some reactor may choose to be agnostic to UOX or MOX
in their core while other reactors in the system reject MOX in favor of a strong preference
for UOX. Cyclus would currently give MOX to the reactor that effectively rejected it anyway,
leaving the agnostic reactor unfueled.

As a concept, the current formulation of preferences seems poorly defined and therefore
diffcult to explain or intuit. As above, they can lead to incorrect and unanticipated
results. From here, an attempt can either be made to patch the preference system with
further constraints or it can be replaced with a more intuitive and directly relevent
concept.

We propose that minimizing unit cost over all arcs for a commodity is a more natural
system. This is because the costs are directly and lienarly comparable to one another
and are part of the everyday, quantitative experiance of most humans. Additionally,
it provides a mechansim for resolving request objectives (price limit or maximum cost)
and bid objectives (offer price). If an offer price is less than or equal to the request
price limit, the request-bid can be created.  Otherwise the request-bid arc will be
rejected.


Specification \& Implementation
===============================


Backwards Compatibility
=======================

No backwards incompatibilities are introduced with this CEP.

Document History
================

This document is released under the CC-BY 3.0 license.

References and Footnotes
========================

.. .. [1] https://github.com/cyclus/cyclus/pull/1122
