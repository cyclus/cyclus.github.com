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
To accomplish the methodology proposed here will require some changes to the API within 
the dynamic resource exchance and the cyclus core code. 

1. Bids will need to be able to hold a unit cost. The API will need to support developers 
   accessing and setting this cost. 
2. Update Requests to contain a max-unit-cost instead of a preference. 
3. The current greedy solver will need to be updated or replaced to accomodate the 
   change from preference to unit cost. 
4. Updating all of the existing archetypes within the Cyclus core and Cycamore to 
   support this change. 

The first change will be to add the ability for bids to hold a unit cost value. The 
implimentation of this will be simple as it will mirror the implimentation of the 
preference attribute of requests. Therefore all of the techniques used there can be 
once again used here. Going foward the request max cost will still be the default 
cost for a request-bid arc. 

Additionally the change from preference to unit cost on the request is primarily a 
nomenclature change. Therefore this update will be simple. The majority of the 
work required will be updating all calls of this function currently in use 
throughout the many archetypes and cyclus core code. It is important to note that 
preference will still exist on requests and bids but will not be the primary metric 
for the greedy solver (it will function as more a tie breaker). 

Once Bids and Requests have their own unit costs, updating the default solver for cyclus 
will be done to perform a global optimization of the entire trade system each 
timestep. This can be done by collecting all of the possible request-bid pairs. 
These pairs will be constructed by determining if the bid in the arc has a 
unit cost associated with it. If this is the case that unit cost will be used 
for the pair. If there is no bid unit cost however, the max-unit-cost of the 
request will be used to define the pairing. 

Once the pairs have been created, the solver can sort the value of their unit cost 
from smallest to largest, therefore minimizing the total cost of the system. 

An additional change to the greedy solver is being proposed. To allow for more 
flexibility in the way the system is optimized, minimizing unit cost will be only 
one method for global optimization. Additionally, maximizing throughput (i.e. larger 
bids are handled first) and preference will be options for the greedy solver. 
Each of these can also be used in conjuction with each other. For example, if two 
request-bid arcs have the same unit cost, these two arcs can be sorted by mass or 
preference. It will also be possible to choose maximization and minimazation for 
each of the discussed metrics (unit cost, throughput, preference). 

It should be possible for this sorting to be done in any order the user desires. 
This will be setup through the cyclus input file, but the default value will be 
unit cost > mass > preference.    

This change represents a fundamental change to the behavior of the cyclus simulator. As 
mentioned there will be several changed to the cyclus core code due to this change. We 
will aimed to update all of these locations with the new code as well as documentation 
to help developers update their software and to support future developers using Cyclus. 

Backwards Compatibility
=======================
It is our goal to ensure that the cyclus core, and the cycamore archetypes will be 
updated to be inline with this CEP. Unfortunately any third party archetypes will 
need to be updated by those parties. 

It is our aim that this change function as a staged point for a Cyclus 2.0 release. 

Document History
================

This document is released under the CC-BY 3.0 license.

References and Footnotes
========================

.. .. [1] https://github.com/cyclus/cyclus/pull/1293
