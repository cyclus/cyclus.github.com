
Understanding the Database
============================

A single database can store multiple simuations' results. In order for this to
work, every table in the database has a SimId column that identifies which
simulation each row belongs to.  In order to robustly analyze the data, all
processing should be simulation-ID-aware.  Because simulation ID's are UUID's,
databases can be safely merged without conflicts.

Cyclus supports multiple database formats.  While each format is allowed to
store information in its own way, the overall table structure in databases is
the same.  Below are a few sections that group together and describe related
tables.

*Note that every one of the tables described below has a "SimId" column that
is not shown.*

Resources Table
----------------

* **ResourceId** (int): 
* **ObjId** (int): 
* **Type** (string): 
* **TimeCreated** (int): 
* **Quantity** (double): 
* **Units** (string): 
* **QualId** (int): 
* **Parent1** (int): 
* **Parent2** (int): 

Compositions Table
--------------------

* **QualId** (id(int)): 
* **NucId** (int): 
* **MassFrac** (double): 

Recipes Table
-------------------

* **Recipe** (string): 
* **QualId** (int): 

Products Table
----------------

* **QualId** (int): 
* **Quality** (string): 

ResCreators Table
-------------------

* **ResourceId** (int): 
* **AgentId** (int): 

AgentEntry Table
-------------------

* **AgentId** (int): 
* **Kind** (string): 
* **Spec** (string): 
* **Prototype** (string): 
* **ParentId** (int): 
* **Lifetime** (int): 
* **EnterTime** (int): 

AgentExit Table
------------------

* **AgentId** (id(int)): 
* **ExitTime** (int): 

Transactions Table
-------------------

* **TransactionId** (int): 
* **SenderId** (int): 
* **ReceiverId** (int): 
* **ResourceId** (int): 
* **Commodity** (string): 
* **Time** (int): 

Info Table
-------------------

* **Handle** (string): 
* **InitialYear** (int): 
* **InitialMonth** (int): 
* **Duration** (int): 
* **ParentSimId** (uuid): 
* **ParentType** (string): 
* **BranchTime** (int): 
* **CyclusVersion** (string): 
* **CyclusVersionDescribe** (string): 
* **SqliteVersion** (string): 
* **Hdf5Version** (string): 
* **BoostVersion** (string): 
* **LibXML2Version** (string): 
* **CoinCBCVersion** (string): 

Finish Table
-------------------

* **EarlyTerm** (bool): 
* **EndTime** (int): 

InputFiles Table
-------------------

* **Data** (blob): 

DecomSchedule Table
--------------------

* **AgentId** (int): 
* **SchedTime** (int): 
* **DecomTime** (int): 

BuildSchedule Table
--------------------

* **ParentId** (piintd): 
* **Prototype** (string): 
* **SchedTime** (int): 
* **BuildTime** (int): 

Snapshots Table
-------------------

* **Time** (int): 

Post Processing
+++++++++++++++++

We are currently working on developing a post-process for the database that
creates a few new tables to assist data analysis and visualization.  These
tables are not set in stone and their schemas are subject to change.  Below is
a summary of them.

Inventories Table
-------------------

TODO: describe post-processed inventories table

Agents Table
-------------------

TODO: describe post-processed agents table

