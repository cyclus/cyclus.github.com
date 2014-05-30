
Understanding the Database
============================

A single database can store multiple simulations' results. In order for this to
work, every table in the database has a SimId column that identifies which
simulation each row belongs to.  In order to robustly analyze the data, all
processing should be simulation-ID-aware.  Because simulation ID's are UUID's,
databases can be safely merged without conflicts.

|Cyclus| supports multiple database formats.  While each format is allowed to
store information in its own way, the overall table structure in databases is
the same.  |Cyclus| ships supporting two database formats:

* SQLite
* HDF5

There are several tools that can be used to interrogate these file formats.
That is left as an exercise for the reader.  Below are a few sections that
group together and describe related tables.

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

* **SimId** (uuid)

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
  entry (or entries) in the ``Products`` or ``Compositions`` table depending 
  on the resource's type.

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

* **SimId** (uuid)

* **QualId** (int): Key to associate this composition with one or more
  entries in the ``Resources`` table.

* **NucId** (int): Nuclide identifier in ``zzzaaammmm`` form.

* **MassFrac** (double): Mass fraction for the nuclide in this composition.

Recipes Table
-------------------

* **SimId** (uuid)

* **Recipe** (string): Recipe name as given in the input file.

* **QualId** (int): Key to identify the Composition for this recipe in the
  ``Compositions`` table.

Products Table
----------------

* **SimId** (uuid)

* **QualId** (int): Key to associate this quality with one or more entries in
  the ``Resources`` table.

* **Quality** (string): Describes a product's quality (e.g. "bananas", "KWh",
  etc.)

ResCreators Table
-------------------

Every time an agent creates a new resource from scratch, that event is
recorded in this table.

* **SimId** (uuid)

* **ResourceId** (int): ID of a resource that was created at some point in the
  simulation.

* **AgentId** (int): ID of the agent that created the resource associated with
  the ResourceId.

AgentEntry Table
-------------------

Each agent that enters and participates in a simulation gets a row in this
table.

* **SimId** (uuid)

* **AgentId** (int): Every agent in a simulation gets its own, unique ID.

* **Kind** (string): One of "Region", "Inst", "Facility", or "Agent".

* **Spec** (string): The single-string of the :doc:`agent specification <find_agents>`.

* **Prototype** (string): The prototype name, as defined in the input file,
  that was used to create this agent.

* **ParentId** (int): The AgentId of this agent's parent - the agent that
  built/created this agent.

* **Lifetime** (int): Number of time steps an agent is designed to operate
  over.  ``-1`` indicates an infinite lifetime.  Note that depending on how
  agents use the lifetime parameter, this may be entirely unrelated to how long
  agents were actually operating in the simulation.

* **EnterTime** (int): The time step when the agent was built and entered the
  simulation.

AgentExit Table
------------------

Due to implementation details in the |cyclus| kernel, this table is separate
from the ``AgentEntry`` table.  If this table doesn't exist, then no agents
were decommissioned in the simulation.

* **SimId** (uuid)

* **AgentId** (int): Key to the AgentId on the ``AgentEntry`` table.

* **ExitTime** (int): The time step when the agent was decommissioned and
  exited the simulation.

Transactions Table
-------------------

Every single resource transfer between two agents is recorded as a row
in this table.

* **SimId** (uuid)

* **TransactionId** (int): A unique identifier for this resource transfer.

* **SenderId** (int): AgentId for the sending agent.

* **ReceiverId** (int): AgentId for the receiving agent.

* **ResourceId** (int): Key to the entry in the Resources table that describes
  the transferred resource.

* **Commodity** (string): The commodity under which this transfer was
  negotiated.

* **Time** (int): The time step at which the resource transfer took place.

Info Table
-------------------

Each simulation gets a single row in this table describing global simulation
parameters and |cyclus| dependency version information.

* **SimId** (uuid)

* **Handle** (string): A custom user-specified value from the input file
  allowing for convenient identification of simulations in a database (because
  the simulation uuid's are not very memorable by mere mortals).

* **InitialYear** (int): The year in which time step zero occurs.

* **InitialMonth** (int): The month that time step zero represents.

* **Duration** (int): The length of the simulation in time steps.  Note that
  it is possible a simulation to terminate early before running its entire
  duration (see the ``Finish`` table section).

* **ParentSimId** (uuid): The SimId for this simulation's parent. Zero if this
  simulation has no parent.
 
* **ParentType** (string): One of:
    
    - "init" for simulations that are not based on any other simulation.

    - "restart" for simulations that were restarted another simulation's
      snapshot.

    - "branch" for simulations that were started from a perturbed state of
      another simulation's snapshot.
 
* **BranchTime** (int): Zero if this was not a restarted or branched
  simulation. Otherwise, the time step of the ParentSim at which the
  restart/branch occurred.
 
* **CyclusVersion** (string): Version of |cyclus| used to run this simulation.
 
* **CyclusVersionDescribe** (string): Detailed |cyclus| version info (with commit hash)
 
* **SqliteVersion** (string)
 
* **Hdf5Version** (string)
 
* **BoostVersion** (string)
 
* **LibXML2Version** (string)
 
* **CoinCBCVersion** (string)

Finish Table
-------------------

Each simulation gets one row/entry in this table.

* **SimId** (uuid)

* **EarlyTerm** (bool): True (or 1) if the simulation terminated early and did
  not complete normally. False (or 0) otherwise.

* **EndTime** (int): The time step at which the simulation ended.

InputFiles Table
-------------------

* **SimId** (uuid)

* **Data** (blob): A dump of the entire input file used for this simulation.

DecomSchedule Table
--------------------

* **SimId** (uuid)
* **AgentId** (int): 
* **SchedTime** (int): 
* **DecomTime** (int): 

BuildSchedule Table
--------------------

* **SimId** (uuid)
* **ParentId** (piintd): 
* **Prototype** (string): 
* **SchedTime** (int): 
* **BuildTime** (int): 

Snapshots Table
-------------------

Every snapshot made during the simulation gets an entry in this table.  All
times in this table are candidates for simulation restart/branching.

* **SimId** (uuid)

* **Time** (int): The time step a snapshot was taken for this simulation.

Post Processing
+++++++++++++++++

We are currently working on developing a post-process step for the database
that creates a few new tables to assist data analysis and visualization.
These tables are not set in stone and their schemas are subject to change.
Below is a summary of them.

.. Inventories Table
.. -------------------

.. TODO: describe post-processed inventories table

.. Agents Table
.. -------------------

.. TODO: describe post-processed agents table

