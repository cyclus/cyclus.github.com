
Initialization and Restart
============================

|Cyclus| has built-in functionality for simulation snapshotting and restart.
All simulations are initialized from the database.  In order to support
running from xml input files, the |Cyclus| kernel translates the input file
contents into the database and then initializes the simulation from the
database.  In order for this to work correctly, agents must be able to record
the entirety of their internal state to the database and able to restore that
state exactly.  The ``cyclus::Agent`` class provides a group of functions in
support of this functionality that must all be implemented carefully and
consistently. If possible, the :doc:`Cyclus preprocessor <cycpp>` should be
used to automate the generation of code for the following functions:

.. code-block:: c++

    void InfileToDb(InfileTree* tree, DbInit di);
    void InitFrom(cyclus::QueryableBackend*);
    void InitInv(cyclus::Inventories& invs);
    cyclus::Inventories SnapshotInv();
    void Snapshot(Agent*);
    std::string schema();
    cyclus::Agent* Clone();
    void InitFrom(Agent*);

When the preprocessor isn't sufficient, read the api docs for these functions
VERY CAREFULLY: http://fuelcycle.org/cyclus/api/classcyclus_1_1Agent.html.
There are a few other functions related to initialization that are important
to understand well:

.. code-block:: c++

    void Build(cyclus::Agent* parent);
    void EnterNotify();
    void BuildNotify(cyclus::Agent* child);
    void Decommission(cyclus::Agent* child);

*Note that the functions mentioned on this page should NEVER be invoked
directly by agents.*

