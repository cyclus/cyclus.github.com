
.. summary Design Goals for the SQLite Output Database 

Output Database
===============

*Cyclus* simulations are comprised of three major constructs (the interaction
of which we are interested in documenting): 

 * **Agents** (which create...)
 * **Resources** (which are traded in...)
 * **Transactions**  

The primary goal of fuel-cycle simulations is to track material (fuel) through
a complex system of facilities. Such interaction falls easily under this paradigm 
-- one treats facilities as a type of *agent*, fuel as a type of *resource*, and the 
exchange of fuel between facilities as a *transaction*. The power of this paradigm
lies in its extensibility. By describing the fuel cycle in this general language, 
one can easily envision other instances of resource transaction (e.g. electricity
or man-hours) being driven by the same engine and using the same record 
structure. 

The standard output database used by *Cyclus* is SQLite.  At larger scale,
a coherent vocabulary is a chief requirement for this paradigm.  For
instance, the terms "inventory", "stocks", and "capacity" should each have
a ubiquitous definition across facility types in order to maintain
confidence in robust database querying. This dictionary of terms is a
near-term goal for *Cyclus* developers as the base pack of core modules is
developed and expanded.

Provenance
++++++++++

Good provenance will be provided by an output database with sufficient data to
allow reproducibility of the results. This robust reproducibility is essential
to the scientific effort. In the case of *Cyclus*, the inclusion of a complete
notion of the input specifications in the output database will be sufficient to
allow for result reproduction as well as facilitate knowledge sharing,
post-simulation analysis and error-checking. Such input specifications include
a complete description of the simulation parameters and model configurations
defined in the input.

Output Recording Infrastructure
++++++++++++++++++++++++++++++++++

The *Cyclus* output database management and recording consists of three
basic classes:

 * **EventManager**: Collects events containing structured data to be
   recorded. Buffers and sends the events to event backends.

 * **Event**: Allows the convenient specification of named groups of
   field-value pairs holding arbitrary typed data.

 * **EventBackend**: An abstract interface implemented by modular, concrete
   backend implementations (e.g. sqlite, hdf5, etc.).  A standard sqlite
   backend is provided and currently used for *Cyclus* simulations.

For Agent/module developers, the
`EventManager API <http://cnergdata.engr.wisc.edu/cyclus/core/docs/classEventManager.html>`_
and
`Event API <http://cnergdata.engr.wisc.edu/cyclus/core/docs/classEvent.html>`_
will be useful references.

Usage
+++++++++++++

Agents are allowed to write their own custom output into the output
database.  A global event manager is created for each *Cyclus* simulation
and is accessible via the ``EM`` macro.  The ``EventManager::newEvent``
method creates a new event bound to the event manager.  A reactor facility
might, for instance want to record some special information every timestep:

.. code-block:: c++

  MyReactor::handleTock(int time) {
    ...

    EM->newEvent("MyReactorResourceUsage")
      ->addVal("AgentID", ID())
      ->addVal("WaterUsage", monthlyWater())
      ->addVal("OperatingCost", monthlyCost())
      ->record();

    ...
  }

This would create a table in the output database named
"MyReactorResourceUsage" with three columns named "AgentID", "WaterUsage"
and "OperatingCost".  A row would be added to the table for every timestep
of the simulation.  ``addVal`` can be chained any number of times.
``record`` must be called once for each event after all values have been
added.  Any custom tables created in this manner will appear in the output
database alongside the cyclus core tables.

.. warning::

   Events with the same title must have the same schema (e.g. same field
   names and value types). It is the responsibility of the developer to
   enforce this in their code.

.. warning::

   Event backends only support a finite number of event value-types. Do not
   add values to events that are not supported by the backend(s) in use. The
   default Sqlite backend supports int, double, float, and std::string
   types.

The Cyclus Database Schema
+++++++++++++++++++++++++++++++

In sqlite, events are represented by tables.  While there are relationships
between table fields, these are implicit and not enforced by
primary-foreign key SQL constraints. The Cyclus output database is comprised of
the following core tables:

=========== ===============
Agents
---------------------------
Field-name  Field-type
=========== ===============
ID          int
ModelType   string
Prototype   string
ParentID    int
EnterDate   int
DeathDate   int
=========== ===============

=========== ===============
IsotopicStates
---------------------------
Field-name  Field-type
=========== ===============
ID          int
IsoID       int
Value       double
=========== ===============

================ ===============
Resources
--------------------------------
Field-name       Field-type
================ ===============
ID               int
Type             int
OriginalQuantity double
================ ===============

=========== ===============
ResourceTypes
---------------------------
Field-name  Field-type
=========== ===============
Type        int
Name        string
Units       string
=========== ===============

=============== ===============
SimulationTimeInfo
-------------------------------
Field-name      Field-type
=============== ===============
InitialYear     int
InitialMonth    int
SimulationStart int
Duration        int
=============== ===============

=============== ===============
TransactedResources
-------------------------------
Field-name      Field-type
=============== ===============
TransactionID   int
Position        int
ResourceID      int
StateID         int
Quantity        double
=============== ===============

=============== ===============
Transactions
-------------------------------
Field-name      Field-type
=============== ===============
ID              int
SenderID        int
ReceiverID      int
MarketID        int
Commodity       string
Price           double
Time            int
=============== ===============

The Sqlite backend has the special ability to store multiple cyclus
simulation output results in a single sqlite file. It creates an extra
table containing a unique long and short ID for each simulation.  All
output tables have an extra field inserted indicating which simulation
id/run that output row corresponds to.

=========== ===============
SimulationIds
---------------------------
Field-name  Field-type
=========== ===============
SimId       int
LongId      string
=========== ===============

