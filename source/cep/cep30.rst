CEP 30 - Framework for Parameter Exchange in the CYCLUS R-I-F Hierarchy
*********************************************************

:CEP: 30
:Title: Framework for Parameter Exchange in the CYCLUS R-I-F Hierarchy
:Last-Modified: 2024-12-27
:Author: Dean Krueger <dean.krueger@wisc.edu>
:BDFP: Paul Wilson
:Status: Draft
:Type: Standards Track
:Created: 2024-11-26
:Cyclus-Version: 1.6.0


Abstract
========

The DRE of the current version of CYCLUS handles the cost of materials being traded in a 
way which was always intended to be expanded upon as discussed in the Supply-Demand 
Framework section of [CEP 18](https://fuelcycle.org/cep/cep18.html). In particular, that CEP 
suggests that the introduction of economic concepts could allow the supplier to have more
influence over the preferences of particular trading paths. As a part 
of moving the DRE in that direction, it is necessary to add economic parameters to  
the definitions of the Region, Institution, and Facility in such a way as to allow them 
to interact with each other to combine these parameters in meaningful ways. However, because
of the way that these financial parameters are tied intrisically to different parts of the 
Region-Institution-Facility (RIF) hierarchy, it will be necessary to introduce some mechanic
by which those different  layers of the hierarchy communicate their parameters to each other
so that meaninful financial functions can be implemented.

Copyright:
==============================

CEP 30 will be placed in the public domain as required by CEP 1.

Specification:
============================

The new feature being proposed is a parent class for `Agent`, called `EconomicEntity`, which will
add a common set of functions for accessing an `std::unordered_map<std::string, double>` called
`financial_data_`. This map will be private, and only accessible through getter and setter functions.
Additionally, the `EconomicEntity` class will include some common financial operation functions
such as a present value function, a future value function, etc.

Motivation:
==================

The major motivation for this new feature is that currently when a Facility tries to access 
information about its Institution, it can only reliably use the public API of the Institution 
base class. That is, it is dangerous to try to access something that is only in the public 
API of a derived Institution archetype because it may not always be there. 
This eliminates the use of the optional Toolkit to introduce economic/financial parameters 
into agents that are required to interact for those parameters since C++ doesn't provide
a way to interrogate the API of an agent.
Because of the 
interdependence of imagined economic functionality on the RIF relationship (a facility’s 
cost may be impacted by its own capital cost, as well as its  parent institution’s minimum
acceptable rate of return and the regional tax rate, for instance), the ability of a facility 
to access information about its parent Agents is crucial.

Rationale:
===========================

Implementing the overall feature as a supercklass keeps it in line with the class-subclass 
structure of other CYCLUS functionality. The reasons for choosing a hash table over another 
data structure are that they allow quick and easy expansion both by developers and within 
the simulation itself, as well as search, insert, and delete operations being ostensibly O(1). 

During the public vetting stage of CEP 30’s lifecycle two alternative ideas for implementing this 
behavior were proposed. The first was to use the code injection functionality of cycpp files to 
add economic information as an optional Toolkit feature to archetypes themselves at the beginning 
of simulations. This was tested, but it was discovered that there were problems accessing the 
information of parent agents, and it was determined that this approach would be some combination 
of too cumbersome and less certain to work. Eventually, the toolkit approach will likely be used 
in conjunction with the features added by this CEP. The second idea was to implement some sort of 
registry, but this was deemed to be too much of a bloat hazard, as registries can become very 
complicated very quickly.

Backwards Compatibility:
===========================

Since this feature is proposed as a superclass of each of the `Agent` class, it will be 
a fundamental change to Cyclus. However, use of this feature will be completely optional, since
all it does is add addtional information/functionality to Cyclus, and doesn't change any
preexisting code.
