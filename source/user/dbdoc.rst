
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

* `SQLite <http://sqlite.org/index.html>`_ (".sqlite" extension) - |cyclus|'
  default database format. Some useful viewers:

    - `Sqliteman <http://sqliteman.com/>`_ (windows and linux)
    - `SQLite Browser <http://sqlitebrowser.org/>`_ (windows, mac, and linux)
    - `SQLite Manager <https://addons.mozilla.org/en-US/firefox/addon/sqlite-manager/>`_
      Firefox Add-on (windows, mac, and linux)

* `HDF5 <http://www.hdfgroup.org/HDF5/>`_ (".h5" extension). Some useful
  viewers:

    - `HDFView <http://www.hdfgroup.org/products/java/hdf-java-html/hdfview/>`_
      (windows, mac, and linux)
    - `ViTables <http://vitables.org/>`_ (linux only)

Below are a few sections that describe the data tables found in the database.

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

.. _explicit-inv-table:

ExplicitInventory Table
------------------------

This is an optional table that can be activated by setting
``<explicit_inventory>true</explicit_inventory>`` in the ``<control>`` section
of the input file.  By default, it is disabled and will not be created in the
database.  Note there is a significant runtime performance penalty for
activating this table.  This table provides the material inventory of each
agent at each time step subdivided by internal buffers (e.g.
``cyclus::toolkit::ResBuf``).  There is one row for each agent on each time
step for each sub-buffer for each nuclide.

* **SimId** (uuid)

* **AgentId** (int): ID of the agent holding the inventory 

* **Time** (int): Time Step this inventory was in the given agent.

* **InventoryName** (string): Name of the internal sub inventory/buffer of
  this material.  This (usually) corresponds to the archetype state variable
  names for each ResBuf.

* **NucId** (int): Nuclide identifier in ``zzzaaammmm`` form.

* **Quantity** (double): Amount in kg of the given nuclide in the specified
  sub-inventory for the given agent on the given time step.

.. _explicit-inv-compact-table:

ExplicitInventoryCompact Table
-------------------------------

This is an optional table that can be activated by setting
``<explicit_inventory_compact>true</explicit_inventory_compact>`` in the
``<control>`` section of the input file.  By default, it is disabled and will
not be created in the database.  Note there is a significant runtime
performance penalty for activating this table.  This table provides the
material inventory of each agent at each time step subdivided by internal
buffers (e.g.  ``cyclus::toolkit::ResBuf``).  There is one row for each agent
on each time step for each sub-buffer.  The fractional composition for each
nuclide are stored as a single value in the native format of the Cyclus
backend used to create the database.  The sqlite backend, for example, stores
this data as an xml string from a boost-serialized ``std::map<int, double>``
(i.e. NucId-frac pairs).

* **SimId** (uuid)

* **AgentId** (int): ID of the agent holding the inventory 

* **Time** (int): time step this inventory was in the given agent.

* **InventoryName** (string): Name of the internal sub inventory/buffer of
  this material.  This (usually) corresponds to the archetype state variable
  names for each ResBuf.

* **Quantity** (double): Amount in kg of the given material composition in
  this sub-inventory for the given agent on the given time step.

* **Composition** (int): Cyclus backend-specific format for a ``std::map<int,
  double>`` object.

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

.. _agent-version-table:

AgentVersion Table
------------------

This lists the version of each agent/archetype used in the simulation. Due to
backwards compatibility, this is in its own, new table instead of the
AgentEntry table.  There is one entry in this table for each archetype used in
each simulation.

* **SimId** (uuid)

* **Spec** (string): Archetype spec - same as the Spec field in the AgentEntry
  table.

* **Version** (string): The version string provided by the archetype.

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

InfoExplicitInv Table
-------------------

Each simulation gets one row in this table.

* **SimId** (uuid)

* **RecordInventory** (bool): True (or 1) if the ExplicitInventory table was
  or should be activated for the simulation.

* **RecordInventoryCompact** (bool): True (or 1) if the
  ExplicitInventoryCompact table was or should be activated for the
  simulation.

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

When agents are scheduled to be decommissioned in the simulation, the details
are recorded in this table.  Note that this table contains an entry for each
scheduling regardless of whether or not it actually occurred; if a simulation
ended before time reached the scheduled time, the agent would not have been
decommissioned.

* **SimId** (uuid)

* **AgentId** (int): ID of the agent that is/was to be decommissioned.

* **SchedTime** (int): The time step on which this decommissioning event was
  created.

* **DecomTime** (int): The time step on which the agent was (or would have
  been) decommissioned.

BuildSchedule Table
--------------------

When agents are scheduled to be built in the simulation, the details are
recorded in this table.  Note that this table contains an entry for each
scheduling regardless of whether or not it actually occurred; if a simulation
ended before time reached the scheduled time, the agent would not have been
built.

* **SimId** (uuid)

* **ParentId** (piintd): The Id of the agent that will become this new agent's
  parent.

* **Prototype** (string): The name of the agent prototype that will be used to
  generate the new agent.  This corresponds to the prototypes defined in an
  input files.

* **SchedTime** (int): The time step on which this build event was created.

* **BuildTime** (int): The time step on which the agent was (or would have
  been) built and deployed into the simulation.

Snapshots Table
-------------------

Every snapshot made during the simulation gets an entry in this table.  All
times in this table are candidates for simulation restart/branching.

* **SimId** (uuid)

* **Time** (int): The time step a snapshot was taken for this simulation.

Debugging
----------

If |Cyclus| was run in debugging mode then the database will then contain 
the following two extra tables:

* **DebugRequests**: record of every resource request made in the simulation.

  - ``SimId``:  simulation UUID
  - ``Time``:  time step of the request
  - ``ReqId``, simulation-unique identifier for this request
  - ``RequesterID``: ID of the requesting agent
  - ``Commodity``: the commodity of the request
  - ``Preference``: agent's preference for this particular request
  - ``Exclusive``: true (non-zero) if this request is all-or-nothing (integral)
  - ``ResType``: resource type (e.g. "Material", "Product")
  - ``Quantity``: amount of the request
  - ``ResUnits``: units of the request (e.g. kg)

* **DebugBids**: record of every resource bid made in the simulation.

  - ``SimId``: simulation UUID
  - ``ReqId``: simulation-unique identifier for the bid's request
  - ``BidderId``: ID of the the bidding agent
  - ``BidQuantity``: amount of thd bid
  - ``Exclusive``: true(non-zero) if this request is all-or-nothing (integral)


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

