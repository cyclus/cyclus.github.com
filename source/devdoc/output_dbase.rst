
.. summary Design Goals for the Output Database 

Output Database
===============

*Cyclus* simulations are comprised of three major constructs (the interaction
of which we are interested in documenting). In *Cyclus*, **Agents** create
**Resources** and then trade these resources via **Transactions**. Accordingly,
the output database is nominally divided into three catagories: Agents,
Resources, and Transactions. The *Cyclus* database has been designed with three
key concepts in mind: we wish for *Cyclus* to be extensible, i.e. we do not
want to hinder the development of a new module, we wish for the output data
structures to be as straight-forward as possible to reduce hindrince of
post-processing, and we wish for the database to be efficient. With these three
goals in mind, we have developed a the database structure that sacrifices some
amount of size (i.e., there are multiple entries per table which could be
consolidated) in order to allow for greater flexibility and readability (i.e.
natural intuition of where to look for a given data object). In this database
paradigm, for example, an external developer has the ability to create a new
agent type, and retrieve any information he/she wishes with regard to output.
The database structure does not stunt a developer's ability or creativity.

Provenance
----------

Good provenance will be provided by an output database with sufficient data to
allow reproducibility of the results. This robust reproducibility is essential
to the scientific effort. In the case of *Cyclus*, the inclusion of a complete
notion of the input specifications in the output database will be sufficient to
allow for result reproduction as well as facilitate knowledge sharing,
post-simulation analysis and error-checking. Such input specifications include
a complete description of the simulation parameters and model configurations
defined in the input.

Database Structure
------------------

As previously mentioned, *Cyclus* deals in three basic constructs: agents,
resources, and transactions. A transaction in *Cyclus* is relatively static,
i.e. every transaction has the same basic information (for example: who is the
sender, who is the receiever, what was transacted, etc.). Conversely, agents
and resources are highly variable. We therefore allow for each /implementation/
of an agent (e.g. a Facility Agent) and each /type/ of resource (e.g. a
Material) to have both **Static** and **Dynamic** tables associated with them.
As will be outlined in detail below, the output database structure of a
*Cyclus* simulation will have, in general, the following heirarchichal
structure:

  * /output/agents
  * /output/agents/implementation/staticParams
  * /output/agents/implementation/variableParams
  * /output/resources
  * /output/resources/type/staticParams
  * /output/resources/type/variableParams
  * /output/transactions

Accordingly, there are currently seven primary tables in the *Cyclus* output
database: 

  * `Agent Description Table`_
  * `Agent Static State Parameter Table`_
  * `Agent Variable State Parameter Table`_
  * `Resource Description Table`_
  * `Resource Static State Parameter Table`_
  * `Resource Variable State Parameter Table`_
  * `Transaction Description Table`_

Agent Description Table
-----------------------

This table contains the generic information of each agent and information
regarding its time of creation and deletion. The table parameters are the
following:

 * the agent's unique ID
 * the agent's parent's unique ID
 * the agent's type (e.g., Region, Institution, Market, etc.)
 * the agent's implementation (e.g., SourceFacility, NullRegion, GreedyMarket, etc.)
 * a timestamp of the agent's birth
 * a timestamp of the agent's death

Note that there is one entry for each unique agent.

As an example, let us assume that a agent X of type is owned by an agent Y and is created at time t1. Agent X has type T and implementation I and ends its service at time t2. The table entry is as follows:

========  =========  ====  ==============  =====  =====
Agent ID  Parent ID  Type  Implementation  Birth  Death 
========  =========  ====  ==============  =====  =====
X         Y          T     I               t1     t2    
========  =========  ====  ==============  =====  =====

Agent Static State Parameter Table
----------------------------------

This table contains information about specific instances of agents that **do
not change** with time. This table is unique to each different
**implementation** of agent. For instance, a Reactor may have the following
class hierarchy: Agent -> Facility -> Reactor. Accordingly, there will be a
data entry for the Reactor in each table, with the reactor-specific information
placed in the Reactor table. There are some tables which are associated with
the *Cyclus* core, and thus will have an immutable form at each release (e.g.
Regions, Institutions, Facilities, Markets). It is the responsibility of each
developer to guarantee that their module output corresponds to this
hierarchical structure if it is to be included in a *Cyclus* release.

Let us take the SourceFacility as it currently exists in *Cyclus*. It has,
nominally, three static members: its monthly production capacity, its total
inventory size, and its output commodity. For this example, let us assume that
SourceFacility X has a maximum production capacity of Y kg/month of commodity C
and has a maximum inventory size of Z kg. Its static state parameter table,
located at /output/agents/SourceFacility/staticParams would therefore look like
the following:

========  =========  ========  ==============  =========  ===============
Agent ID  Commodity  Capacity  Capacity Units  Inventory  Inventory Units 
========  =========  ========  ==============  =========  ===============
X         C          Y         kg/month        Z          kg              
========  =========  ========  ==============  =========  ===============


Agent Variable State Parameter Table
------------------------------------

This table is similar to the static parameter table described above, containing
information about specific instances of agents that **do change** with time.
This table is unique to each different **implementation** of agent. For
instance, a Reactor may have the following class hierarchy: Agent -> Facility
-> Reactor. Accordingly, there will be a data entry for the Reactor in each
table, with the reactor-specific information placed in the Reactor table. There
are some tables which are associated with the *Cyclus* core, and thus will have
an immutable form at each release (e.g. Regions, Institutions, Facilities,
Markets). It is the responsibility of each developer to guarantee that their
module output corresponds to this hierarchical structure if it is to be
included in a *Cyclus* release.

Let us continue with the above example. An optional parameter for the
SourceFacility is the capacity factor, i.e. the percentage of maximum capacity
Y is the facility able to operate at some time t. For this example, let us
assume that at time t1, SourceFacility X begins operation with capacity factor
0.95 and must go down for maintenence at time t2, reducing its capacity factor
to 0.00.  Its variable state parameter table, located at
/output/agents/SourceFacility/variableParams would therefore look like the
following:

========  ===============  =========  ====
Agent ID  Capacity Factor  CF Units   Time 
========  ===============  =========  ====
X          0.95            decimal %  t1   
X          0.00            decimal %  t2   
========  ===============  =========  ====

Note that there may be multiple entries per agent in this table.

Additionally note that the timestamping works in the following manner: if the
timestamp is equal to the agent's birth time stamp, then this is the first
occurance of the variable parameter; if it is not, then one may assume that the
parameter did not change during the period between two timestamps.


Resource Description Table
--------------------------

This table contains the generic information of each resource and information
regarding its time of creation and deletion. The table parameters are the
following:

  * the resource's unique ID
  * the resource's creating agent's unique ID
  * the resource's type (material, man-hours, etc.)
  * the resource's base unit (kg, hours, etc.)
  * a timestamp of the resource's birth 
  * a timestamp of the resoruce's death (i.e., when it is consumed, etc.)

For example, let us assume that facility with unique ID X, creates a resource
of type T at time t1 whose unique ID is Y, in addition, let us assume that the
base unit type is kilograms. Finally, let us assume that the resource is
eventually consumed by a chemical process (e.g., used-fuel being reprocessed)
at time t2. The table entry for this resource is as follows:

===========  ==============  ====  ====  =====  =====
Resource ID  Creating Agent  Type  Unit  Birth  Death 
===========  ==============  ====  ====  =====  =====
R            X               T     kg    t1     t2    
===========  ==============  ====  ====  =====  =====


Resource Static State Parameter Table
-------------------------------------

This table contains information about specific instances of resources that **do
not change** with time. This table is unique to each different
**implementation** of a resource. For instance, UO,,2,, may have the following
class hierarchy: Resource -> Material -> UO2. Accordingly, there will be a data
entry for the UO,,2,, in each table, with the UO,,2,,-specific information
placed in the UO2 table. There are some tables which are associated with the
*Cyclus* core, and thus will have an immutable form at each release (e.g.
Material). It is the responsibility of each developer to guarantee that their
module output corresponds to this hierarchical structure if it is to be
included in a *Cyclus* release.

Let us use the Material class as an example. The static table for the material
resource is relatively straight-forward (most of the work is done by the
dynamic table). As a convention in *Cyclus*, we do not allow Materials to
change form (in order for a Material to change form, the original resource must
be destroyed and a new resource created). Let us assume that some material
resource with ID R (and type Material) has the form uo2.

===========  ========
Resource ID  Form    
===========  ========
R            UO,,2,,
===========  ========


Resource Variable State Parameter Table
---------------------------------------

This table contains information about specific instances of resources that **do
change** with time. This table is unique to each different **implementation**
of a resource. For instance, UO,,2,, may have the following class hierarchy:
Resource -> Material -> UO2. Accordingly, there will be a data entry for the
UO,,2,, in each table, with the UO,,2,,-specific information placed in the UO2
table. There are some tables which are associated with the *Cyclus* core, and
thus will have an immutable form at each release (e.g. Material). It is the
responsibility of each developer to guarantee that their module output
corresponds to this hierarchical structure if it is to be included in a
*Cyclus* release.

We choose to provide the following example. Suppose some facility receives N
kilograms of Used UO,,2,, at time t1 /and/ that Used UO,,2,, has the ability to
decay, i.e. it is radioactive. Consider the following two scenarios: 

 #. sufficient time has passed to take into account the decay of the Used UO,,2,,
 #. an amount, n, of the Used UO,,2,, is traded to another agent 

For simplicity, we assume that used UO,,2,, is comprised of only ^16^O and
^235^U. The decay isotopics are meaningless and only meant to be a qualitative
example. 

===========  =====  ===========   ===========  =================  =========
Resource ID  Mass   Isotopics     Composition  Composition Units  Timestamp
===========  =====  ===========   ===========  =================  =========
R            N      8016, 92235   0.33, 0.67   atomic             t1       
R            N      8016, 92235   0.34, 0.66   atomic             t2       
R            N - n  8016, 92235   0.34, 0.66   atomic             t3       
===========  =====  ===========   ===========  =================  =========

Note that there may be multiple entries per agent in this table.


Transaction Description Table
-----------------------------

This table contains the generic information of each transaction. The table
parameters are the following:

 * the transaction's unique ID
 * the sending agent's unique ID
 * the receiving agent's unique ID
 * the resource being transacted
 * the price for the transaction (assumed going from receiver to sender)
 * the timestamp of the transaction

For example, let us assume agent X sends resource R to agent Y at time t for
price P, and the transactions unique ID is U. The table entry, at
/output/transactions/, would be as follows:

==============  ======  ========  ========  =====  =========
Transaction ID  Sender  Receiver  Resource  Price  Timestamp
==============  ======  ========  ========  =====  =========
U               X       Y         R         P      t        
==============  ======  ========  ========  =====  =========

Note that it is assumed that the amount is in the resource's base unit.

