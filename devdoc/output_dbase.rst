
.. summary Design Goals for the Output Database 

Output Database
===============

*Cyclus* simulations are comprised of three major constructs (the interaction
of which we are interested in documenting). In *Cyclus*, **Agents** create
**Resources** and then trade these resources via **Transactions**. The primary 
goal of fuel-cycle simulators, i.e., the tracking of material (fuel) through a
complex system of facilities, falls easily under this paradigm -- one treats 
facilities as a type of *agent*, fuel as a type of *resource*, and the 
exchange of fuel between facilities as a *transaction*. The power of this paradigm
lies in its extensibility. By describing the fuel-cycle in this general language, 
one can easily envision other instances of resource transaction (e.g. electricity
or man-hours) being driven by the same engine and using the same record 
structure. The physical database used by *Cyclus* is SQL-based, specifically 
SQLite is currently used.

At larger scale, a coherent vocabulary is a chief requirement for this paradigm. 
For instance, the terms "inventory", "stocks", and "capacity" should each have a
ubiquitous definition across facility types in order to maintain confidence in
robust database querying. This dictionary of terms is a near-term goal for *Cyclus*
developers as the base pack of core modules is developed and expanded.

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

Cyclus Database Class Constituents
++++++++++++++++++++++++++++++++++

The *Cyclus* database and management thereof is wholly comprised of three classes in
its source code. The **Table** class housees the raw data which is eventually written to 
the physical database and maintains information about the Table's structure (e.g. which
columns uniquely identify rows). The **Database** class provides two key types of functionality:
connectivity (open, close, read, write) to the physical database and management of a
collection of Tables. Finally, the **BookKeeper** manages a unique instance of a Database.
Each Table must be registered with the BookKeeper, and the BookKeeper determines the rate
at which information is written to the physical database.

Tables
------

Tables in *Cyclus* can be thought of as having two primary functions: storing data and 
providing data. In order to perform these two tasks, a Table must be defined -- it must be
provided with some number of columns, the type of data held within each column, and (in
database parlance) a primary key. A table can also have foreign keys and indicies, but neither
is required.

A number of sources exist that describe relational database design in detail. For the purposes 
of this wiki, however, only the concept of primary key will be described and the concept of 
foreign keys will be mentioned. Primary keys are essential to database definition, whereas the use
of foreign keys and indicies is solely to speed up the query process.

The Primary Key
~~~~~~~~~~~~~~~

A primary key is a subset of columns that uniquely identifies a row in a table. In *Cyclus*, each
agent has a unique id; accordingly, the table of agents has the "ID" column as its primary key. 
The tracking of transactions, though, is a bit more complicated. A transaction of a resource occurs 
between two agents at a given time. Accordingly, the primary key of the table of transaction is 
comprised of each of those columns.

For the curious, a foreign key is simply a reference to another table's primary key. In the above
example, the two agent id columns in the transaction table are foreign keys of the agent table. 

Table Definition
~~~~~~~~~~~~~~~~

A Table is defined and registered with the BookKeeper via the following steps:

 * a collection of column names and datatypes is added via addColumn()
 * the primary key is set via setPrimaryKey()
 * the tableDefined() method is called

Databases
---------

The primary database in *Cyclus* is the output database; however, the Database class also provides
methods to query other databases. Currenly, only SQL support is provided via the Database class.

Database Management
~~~~~~~~~~~~~~~~~~~

The Database class manages the connection and writing to a specific database back-end. It is an
eventual goal that only the Database class will have knowlege of the back-end-specific language 
and will be able to be modularly replaced to achieve different functionality (to go from SQL to
HDF5, for instance). A Database in *Cyclus* holds a collection of Tables and has methods to 
create, write rows, and update rows of each Table. However, each method call must be made 
externally, i.e., the Database must be **managed**. No connectivity-related behavior is automated,
each action must be made explicitly.

Querying a Database
~~~~~~~~~~~~~~~~~~~

The database also provides functionality for making queries. A query is command to search the 
Database (e.g. "Select * from A_TABLE"). The query result is a container (vector) of rows, where
each row is comprised of a complete entry -- a collection of individual entries -- that satisfies 
the query. The entries are provided as strings, so it is the responsibility of the developer to 
know the types of data for which a query is being made. 

The BookKeeper
--------------

The BookKeeper manages the *Cyclus* database. Any Table which wishes to be added to the database must
first register with the BookKeeper. Additionally, any writing of data to the physical database is 
explicitly ordered by the BookKeeper. Currently, information is ordered to be written to the database 
once a Table reaches a certain threshold. The Table informs the BookKeeper that it has reached the 
threshold, at which time the BookKeeper can decide if the information should be written. This 
behavior allows for remote connectivity issues to be managed by the BookKeeper so that writing to the 
database is not attempted at a time of lost connectivity.

The Cyclus Database -- Visually
+++++++++++++++++++++++++++++++

The Cyclus database is comprised of the following tables:

_cycl_schema_bare.png

The connections between them are shown below:

_cycl_schema.png
