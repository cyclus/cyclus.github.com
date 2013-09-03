CEP 18 - Dynamic Resource Exchange Interface
********************************************

:CEP: 18
:Title: Dynamic Resource Exchange Interface
:Last-Modified: 2013-09-02
:Author: Matthew Gidden
:Status: Draft
:Type: Standards Track
:Created: 2013-09-02

Abstract
========

a short (~200 word) description of the technical issue being addressed.

Specification
=============

The technical specification should describe the syntax and semantics of any new
feature.

Motivation
==========

The current implementation of Markets in Cyclus includes a base MarketModel
class which is intended to be derived from by concrete, dynamically loaded,
user-defined classes. Markets are assigned specific commodities, i.e., there is
no communication across demand for multiple commodities. Markets act in the
simulation during the **resolve** step, which occurs after the **tick** and
before the **tock**. 

Markets are communicated with through Messages. Communication to Markets utilize
the Transaction class to define whether the communication is an **offer** or
**request** for the Market's commodity. Communication is initialized by
Facilities, but there is no Cyclus core support for this operation. Individual
derived Facilities (e.g., the SinkFacility and SourceFacility in Cycamore)
define this functionality during their **HandleTick** functions. In general
looksups for specific markets and dynamic casts to communicate with those
markets are required. This interaction is invoked by the facility during the
tick phase in the current facility invocations purely by practice. There is no
requirement for such behavior; for example, one could send an offer or request
during the tock phase, which would be ignored until the proceeding resolve
step.

The MarketModel class defines a pure virtual function, **Resolve**, which is
used by derived classes to determine the specific algorithm by which the market
is to be resolved. Markets receieve proposed Transactions through their
Communicator class interface, which requires the **ReceieveMessage** function to
be defined by the market. The Resolve function then invokes derived-class based
algorithm to determine matches for the given set of offers and requests.

This class structure and interaction has worked well for a proof-of-prototype
use of Cyclus to model simple, once-through fuel cycles. However, an extension
or refactor is necessary to model more complicated fuel cycles for a number of
reasons. First, there is no support for facilities that can offer or request
resources across multiple commodities if a capacity is included. The current
implementation of the market system can only provide this notion by ordering the
markets in some arbitrary manner. Second, and perhaps lowest of these reasons,
is that the Transaction class is ambiguous with respect to proposed offers,
requests, and matched offers and requests. This ambiguity can be addressed
during a refactor to provide clairty to future developers. Third, there is no
defined structure to the market-facility interaction. This interaction is the
core purpose of Cyclus' Dynamic Resource Exchange concern, but users and
developers are required to define their own interactions (e.g., sending offers
during the tick phase). The original conception of the tick-tock paradigm was to
define a notion of time before the resource exchange (i.e., a pre-step) and
after the resource exchange (i.e., a post-step). The current implementation
includes the resource exchange conern during both of these phases, complicating
the process and mixing concerns. Finally, there is no response mechanism for
facilities to delineate between resources of a given commodity. The current
implementation places this concern upon the market's resolution algorithm,
rather than on the facility via some communication mechanism, again muddying the
concerns associated with the resource exchange.

Rationale
=========

The proposed refactor addresses each of the issues provided in the previous
section. The notion of market models is redefined, separating the collection of
supply-demand information from the algorithm used to match suppliers with
consumers. The information gathering framework is structured and core-based. It
is top-down in the sense that it queries facilities for their supply and demand
rather than requiring facility-based notifications. Accordingly, concerns are
appropriately separated: the information is gather by the core at the beginning
of the resolve step, allowing facilities to inform a given market algorithm,
market algorithms determine the set of offers and requests to be matched, and
the core sends out resolved transactions. Message passing to and from marekts is
addressed by the framework, providing facilities, institutions, and regions
providing each with specific, defined agency.

Supply-Demand Framework
-----------------------

Supply-demand determination at any given time step occurs in nominally three
steps, or **phases**, and the terminology of this "phase space" is taken from
previous supply chain agent-based modeling work
:cite:`julka_agent-based_2002`. Importantly, this information-gathering step is
agnostic as to the actual matching algorithm used, it is concerned only with
querying the current status of supply and demand in the simulation.

The first phase allows consumers of commodities to denote both the quantity of a
commodity they need to consume as well as the target isotopics, or quality, by
**posting** their demand to the market exchange. This posting informs producers
of commodities what is needed by consumers, and is termed the **Request for
Bids** (RFB) phase. Consumers are allowed to over-post, i.e., request more
quantity than they can actually consume, as long as a corresponding capacity
constraint accompanies this posting. Further, consumers are allowed to post
demand for multiple commodities that may serve to meet the same combine
capacity. For example, consider an LWR that can be filled with MOX or UOX. It
can post a demand for both, but must define a preference over the set of
possible commodities it can consume. Another example is that of an advanced fuel
fabrication facility, i.e., one that fabricates fuel partially from separated
material that has already passed through a reactor. Such a facility can choose
to fill the remaining space in a certain assembly with various types of fertile
material, including depleted uranium from enrichment or reprocessed uranium from
separations. Accordingly, it could demand both commodities as long as it
provides a corresponding constraint with respect to total consumption. At the
completion of the RFB phase, the market exchange will have a set of consumption
portfolios, :math:`P`, where each portfolio consists of a set requests,
:math:`R`, a cardinal preference over the requests, :math:`\alpha_R`, and
possibly a set of constraints over the requests, :math:`c_R`. Each request
consists of a quantity, :math:`q_r`, and a target isotopic vector,
:math:`I_r`. Consumers are allowed to offer the null set of isotopics as their
profile, effectively providing no information.

The second phase allows suppliers to **respond** to the set of consumption
portfolios, and is termed the **Bidding** (B) phase (analgous to Julka's Reply
to Request for Quote phase). Each consumption portfolio is comprised of requests
for some set of commodities. Accordingly, for each request, suppliers of that
commodity denote production capacities, :math:`c_c` and an isotopic profile of
the commodity they can provide, :math:`I_c`. Suppliers, like consumers, are
allowed to offer the null set of isotopics. A supplier may have its production
constrained by more than one parameter. For example, a processing facility may
have both a throughput constraint (i.e., it can only process material at a
certain rate) and an inventory constraint (i.e., it can only hold some total
material). Further, the facility could have a constraint on the quality of
material to be processed, e.g., it may be able to handle a maximum radiotoxicity
for any given time step which is a function of both the quantity of material in
processes and the isotopic content of that material. At the completion of the
Bidding phase the possible connections between supplier and producer
facilities, i.e., the arcs in the graph of the transportation problem, have been
established with specific capacity constraints defined both by the quantity of
commodities that will traverse the arcs but also by the quality.

Backwards Compatability
=======================

All CEPs that introduce major backwards incompatibilities must include a section
describing these incompatibilities and their severity. The CEP must explain how
the author proposes to deal with these incompatibilities. CEP submissions
without a sufficient backwards compatibility treatise may be rejected outright.

Reference Implementation
========================

The reference implementation must be completed before any CEP is given status
“Final”, but it need not be completed before the CEP is accepted.

Document History
================

This document is released under the CC-BY 3.0 license.

References and Footnotes
========================

.. rubric:: References

.. bibliography:: cep-0018-1.bib
   :cited:

.. _link: http://an-example-link

