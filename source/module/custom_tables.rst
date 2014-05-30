
Custom Database Tables
=======================

Agents are allowed to write their own custom output into the database during
simulations.  The interface for recording this data is accessible through the
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

.. note:: If you require a datatype that isn't currently supported, please 
          ask the kernel developers and they will help as soon as possible. 

Table Data Shapes
------------------

All added values can optionally take a `std::vector<int>*` shape argument that
is used as maximum dimensions for the value being added.  The :doc:`dbtypes`
page lists the rank of the shape of different C++ types.  A
``std::vector<std::string>`` has rank two - the first shape element being the
length of the vector, the second element being the length of each string in
the vector.  When the shape argument is ommitted, the default is to treat all
elements in the value as variable-length.  An entry of `-1` in the shape
vector indicates variable length also.  It is an error to pass in a shape
vector with the wrong rank (number of elements) for that type.  An example of
using the shape vector follows:

.. code-block:: c++

    std::vector<std::string> colors;
    colors.push_back("green");
    colors.push_back("blue");
    colors.push_back("chartreuse");

    std::vector<int> shape; // this should usually be a class memebr variable
    shape->push_back(5); // maximum number of elements in the color vector
    shape->push_back(8); // maximum character length of each color

    context()->NewDatum("DecorPreferences")
             ->AddVal("AgentID", id())
             ->AddVal("Time", context()->time())
             ->AddVal("FavoritColors", colors, shape)
             ->Record();

In the example above, the "chartreuse" color is longer than the 8 characters
specified in the shape.  So it will be truncated to "chartreu" in the
database. Shape vectors should generally be stored as class member variables
to avoid excessive memory [de]allocation and should be set correctly from
construction to destruction of your agent.
    
Reserved Table Names
---------------------

The |cyclus| kernel creates several of its own tables.  The names of these
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

