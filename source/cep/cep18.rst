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
is to be resolved. Markets receive proposed Transactions through their
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
during a refactor to provide clarity to future developers. Third, there is no
defined structure to the market-facility interaction. This interaction is the
core purpose of Cyclus' Dynamic Resource Exchange concern, but users and
developers are required to define their own interactions (e.g., sending offers
during the tick phase). The original conception of the tick-tock paradigm was to
define a notion of time before the resource exchange (i.e., a pare-step) and
after the resource exchange (i.e., a post-step). The current implementation
includes the resource exchange concern during both of these phases, complicating
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
the core sends out resolved transactions. Message passing to and from markets is
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
portfolios, and is termed the **Bidding** (B) phase (analogous to Julka's Reply
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
Bidding phase the possible connections between supplier and producer facilities,
i.e., the arcs in a graph of a matching problem, have been established with
specific capacity constraints defined both by the quantity and quality of
commodities that will traverse the arcs.

The final phase of the information gathering procedure allows consumer
facilities to adjust their set of preferences and for managers of consumer
facilities to affect the consumer's set of preferences, as described in the
remaining sections. Accordingly, the last phase is termed the **Preference
Adjustment** (PA) phase. Preference adjustments can occur in response to the set
of responses provided by producer facilities. Consider the example of a reactor
facility that requests two fuel types, MOX and UOX. It may get two responses to
its request for MOX, each with different isotopic profiles of the MOX that can
be provided. It can then assign preference values over this set of potential MOX
providers. Another prime example is in the case of repositories. A repository
may have a defined preference of material to accept based upon its heat load or
radiotoxicity, both of which are functions of the quality, or isotopics, of a
material. In certain simulators, limits on fuel entering a repository are
imposed based upon the amount of time that has elapsed since the fuel has exited
a reactor, which can be assessed during this phase. The time constraint is, in
actuality, a constraint on heat load or radiotoxicity (one must let enough of
the fission products decay). A repository could analyze possible input fuel
isotopics and set the arc preference of any that violate a given rule to 0,
effectively eliminating that arc.

Institutions and Regions in Cyclus are provided in order to add granularity to
the levels of reltional modeling available to a user or developer. Both types of
agents or models in Cyclus can possibly be allowed to affect preferences during
the PA phase. A slightly longer discussion is included below.

Facility Agency
+++++++++++++++

Facilities in Cyclus are abstracted to either consumers or suppliers of
commodities, and some may be both. Supplier agents are provided agency by being
able to communicate to the market-resolution mechanism a variety of production
capacity constraints in second phase of the information gathering
methodology. Consumer agents are provided agency by being able to assign
preferences among possible suppliers based on the supplier's quality of
product. Because this agency is encapsulated for each agent, it is possible to
define strategies that can be attached or detached to the agents at
run-time. Such strategies are an example of the Strategy design pattern
:cite:`vlissides_design_1995`.

Institutional Agency
++++++++++++++++++++

Institutions in Cyclus manage a set of facilities. Facility management is
nominally split into two main categories: the commissioning and decommissioning
of facilities and supply-demand association. The goal of including a notion of
institutions is to allow an increased level of detail when investigating
regional-specific scenarios. For example, there exist multi-national
enterprises, such as AREVA, that operate fuel cycle facilities in a variety of
countries, or regions. Furthermore, there are international governmental
organizations, such as the IAEA, have proposed managing large fuel cycle
facilities that service many countries in a given global region. A fuel bank is
an example of such a facility. 

Accordingly, institutions in this proposal are able to augment the preferences
of supplier-consumer pairs that have been established in order to simulate a
mutual preference to trade material within an institution. Of course, situations
arise in real life where an institution has the capability to service its own
facilities, but choose to use an outside provider because of either cost or time
constraints. Such a situation is allowed in this framework as well. It is not
clear how such a relationship should be instantiated and to what degree
institutions should be allowed to affect their managed facilities'
preferences. This issue lies squarely in the realm of simulation design
decisions, part of the **art** of simulation. Accordingly, the strategy of
affecting preferences is encapsulated within the full preference allocation
phase in order to allow for further modularity of relational options between
agents.

Regional Agency
+++++++++++++++

Regions are provided agency by their ability to affect preferences between
supplier-consumer facility pairs in the PA phase, much like institutions. The
ability to perturb arc preferences between a given supplier and a given consumer
allows fuel cycle simulation developers to model relatively complex interactions
at a regional level, such as tariffs and sanctions. Constraints to cross-border
trading can also be applied. For example, a region could place constraints on
the total amount of a given commodity type that is able to flow into it or out
of it into a different region. Such constraints could applied not only to bulk
quantities of a commodity, but also to the quality of each commodity. Such a
mechanism could be used to model interdiction of highly-enriched uranium
transport, for example.


.. figure:: cep-0018-2.svg
    :align: center

    **Figure 1:** Information Gathering Phase Order.

.. blockdiag code below

    http://interactive.blockdiag.com/?compression=deflate&src=eJzFkcsKwjAQRdf2K0JcC0VBKqJgBcGd1g-Q1I41GDIxD1DEfzctbX2C7jqLhFwmZ25uglTg7phxlpNrQIrKYM-csNtco1PbHQrUZEIkShiTFurVlDkwBd6O9yYzyFI8t2iq3ujagb6QBE4OjAVtKOlNa3XjlBK8EZsmstKwNzSoGGXa9Rf4EiwF4R9Kk0VMG7X8jQnthmEUR17vfI6uem8_wV-wcRQNwyfsw_vf1NXsEzsaDfrzucei5iAtsxyl71WorWbcBh0_8D2XMqylNPb5nEBeXK2Sqy0Vyx2by59z

    blockdiag {
    default_group_color = none;                                                                                                                    
    default_shape = roundedbox;                                                                                                                    
    
    "Query Requesters" -> "Query Suppliers" -> "Requester Prefs"

    group {
    label = "RFB"
    color="#008B8B"
    "Query Requesters"
    }

    group {
    label = "B"
    color="#B8860B"
    "Query Suppliers"
    }

    group {
    label = "PA"
    color="#9932CC"
    orientation = portrait
    
    "Requester Prefs" -> "Inst Prefs" -> "Region Prefs"
    }
    }

Modularity
----------

Note that the algorithms used for each phase can be modular. Inputs and outputs
are defined, but the methodology by which they are obtained can be updated as
needed. The first two phases of the information gathering step are relatively
simple. However, note that the PA phase is a major modeling decision and will
likely be another source of dynamic modularity (in addition to the market
resolution algorithm). There may be many proposed preference adjustment phase
algorithms, and accordingly an API will be proposed with a default behavior that
can be modularized by additional algorithms as needed.

Market Resolution
-----------------

Upon completion of the information gathering step, the market resolution
function will be called. The current "null market" behavior is defined as a
"greedy matching" algorithm. Such an algorithm as currently implemented naively
matches consumers with suppliers with particular regard for preference of
commodity or resource. Accordingly, a similar algorithm will be implemented that
greedily matches supplier and requester based on the requester's highest
preference, accounting for multiple commodity markets and associated production
capacities.

Specification
=============

The technical specification should describe the syntax and semantics of any new
feature.

Backwards Compatibility
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

