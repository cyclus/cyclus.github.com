
Understanding the Database
============================

A single database can store multiple simuations' results. In order for this to
work, every table in the database has a SimId column that identifies which
simulation each row belongs to.  In order to robustly analyze the data, all
processing should be simulation-ID-aware.  Because simulation ID's are UUID's,
databases can be safely merged without conflicts.

Cyclus supports multiple database formats.  While each format is allowed to
store information in its own way, the overall table structure in databases is
the same.  |Cyclus| ships supporting two database formats:

* SQLite
* HDF5

There are several tools that can be used to interrogate these file formats.
That is left as an exercise for the reader.  Below are a few sections that
group together and describe related tables.  *Note that every one of the
tables described below has a "SimId" column that is not shown.*

Table Descriptions
+++++++++++++++++++

Resources Table
----------------

Because resources are tracked as immutable objects, every time a resource is
changed in the simulation (split, combined, transmuted, decayed, etc.), it
gets a new entry in the Resources table.  The heritage of resources is also
tracked.  If two resources are combined into a new one, then the new resource
entry will have the ID's of the other two in its "Parent1" and "Parent2"
columns.  The Resources table effectively encodes a heritage tree for all
resources.  It is interesting to note that the Resources table does not encode
any information about where a resource is.  This information can be inferred
by corroborating Resource ID's with the ``ResCreators`` and ``Transactions``
tables.

* **ResourceId** (int): The unique ID for this resource entry. See
  :ref:`resource-ids` for more details.

* **ObjId** (int): A resources object id (obj_id) as it existed during the
  simulation simulation.  See :ref:`resource-ids` for more details.

* **Type** (string): One of "Material" or "Product".  These two types of
  resources have different internal state stored in different tables.  If the
  type is "Product", then the internal state can be found in the ``Products``
  table. If it is Material, then it is in the ``Compositions`` table. 

* **TimeCreated** (int): The simulation time step at which this resource state
  came into existence.

* **Quantity** (double): Amount of the resource in "kg" for Material
  resources.  Amount in terms of the specific quality for Product resources.

* **Units** (string): "kg" for all Material resources, "NONE" for Product
  resources.

* **QualId** (int): Used to identify the corresponding internal-state
  entrie(s) in the ``Products`` or ``Compositions`` table depending on the
  resource's type.

* **Parent1** (int): If a resource was newly created, this is zero. If this
  resource came from another via is transmutation, combining, or splitting,
  or decay then this is the parent ResourceId

* **Parent2** (int): If a resource was newly created, this is zero. If this
  resource came from another via transmutation, decay, or splitting, Parent2
  is also zero. If the resource came from another via combining this is the
  second parent's ResourceId.

Compositions Table
--------------------

A composition consists of one or more nuclides and their respective mass
fractions.  Each nuclide for a composition gets its own row and have the same
QualId.

* **QualId** (int): Key to associate this composition with one or more
  entries in the ``Resources`` table.

* **NucId** (int): Nuclide identifier in ``zzzaaammmm`` form.

* **MassFrac** (double): Mass fraction for the nuclide in this composition.

Recipes Table
-------------------

* **Recipe** (string): Recipe name as given in the input file.

* **QualId** (int): Key to identify the Composition for this recipe in the
  ``Compositions`` table.

Products Table
----------------

* **QualId** (int): Key to associate this quality with one or more entries in
  the ``Resources`` table.

* **Quality** (string): Describes a product's quality (e.g. "bananas", "KWh",
  etc.)

ResCreators Table
-------------------

* **ResourceId** (int): ID of a resource that was created at some point in the
  simulation.

* **AgentId** (int): ID of the agent that created the resource associated with
  the ResourceId.

AgentEntry Table
-------------------

Each agent that enters and participates in a simulation gets a row in this
table.

* **AgentId** (int): Every agent in a simulation gets its own, unique ID.

* **Kind** (string): One of "Region", "Inst", "Facility", or "Agent".

* **Spec** (string): The single-string of the :doc:`agent specification <find_agents>`.

* **Prototype** (string): The prototype name, as defined in the input file,
  that was used to create this agent.

* **ParentId** (int): The AgentId of this agent's parent - the agent that
  built/created this agent.

* **Lifetime** (int): Number of time steps an agent is designed to operate
  over.  ``-1`` indicates an infinite lifetime.  Note that depending on how
  agents use the lifetime param, this may be entirely unrelated to how long
  agents were actually operating in the simulation.

* **EnterTime** (int): The time step when the agent was built and entered the
  simulation.

AgentExit Table
------------------

Due to implementation details in the |cyclus| kernel, this table is separate
from the ``AgentEntry`` table.  

* **AgentId** (int): Key to the AgentId on the ``AgentEntry`` table.

* **ExitTime** (int): The time step when the agent was decommissioned and
  exited the simulation.

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

