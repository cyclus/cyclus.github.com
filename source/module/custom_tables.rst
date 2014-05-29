
Custom Database Tables
=======================

Agents are allowed to write their own custom output into the database during
simulations.  The interface for recording this data is acessible through the
agent's :term:`context`.  Data may be logged via the Context::NewDatum function:

.. code-block:: c++

  MyReactor::Tick() {
    ...
    double monthly_water = ...;
    double monthly_op_cost = ...;

    context()->NewDatum("MyReactorData")
             ->AddVal("AgentID", id())
             ->AddVal("Time", context()->time())
             ->AddVal("WaterUsage", monthl_water)
             ->AddVal("OperatingCost", monthly_op_cost)
             ->Record();
    ...
  }

This would create a table in the output database named "MyReactorData". The
table would get a new row entry every time step with three columns named
"AgentID", "WaterUsage" and "OperatingCost".  ``AddVal`` calls can be chained
any number of times for an arbitrary number of columns.  ``Record`` must be
called once for each datum after all values have been added.  Any custom
tables created in this manner will appear in the output database alongside the
|cyclus| core tables.  Because there may be several agent instances of a
single agent class, tables should generally include a column that adds their
ID; and for similar reasons, it is often desirable to include the simulation
time as a column in these tables:

.. code-block:: c++

    context()->NewDatum("MyReactorData")
             ->AddVal("AgentID", id())
             ->AddVal("Time", context()->time())
             ->AddVal(...
             ...

Datums with the same table name must have the same schema (e.g. same field
names and value types). It is the responsibility of the developer to
enforce this in their code.

.. warning::

   Database formats only support a finite number of datum value-types.  Do not
   add values to database tables that are not supported by the backend(s) in
   use. For information on which c++ types the backends support, you can check
   :doc:`here <dbtypes>`.

The cyclus kernel creates several of its own tables.  The names of these
tables are reserved, and you are responsible to avoid using them for custom
table names.  The reserved table names are (all case combos upper and lower):

* all names starting with the prefixes:

    * Cyclus
    * Agent
    * VL\ _
    * Pair
    * String
    * Vector
    * Map
    * List
    * Set
    * Blob

* Resources
* Products
* Transactions
* Info
* Finish
* InputFiles
* Prototypes
* Recipes
* Snapshots
* MaterialInfo
* Compositions
* NextIds
* ResCreators
* CommodPriority

.. warning::

   Table names may only contain alphanumeric characters and underscores and
   must not start with a number.

