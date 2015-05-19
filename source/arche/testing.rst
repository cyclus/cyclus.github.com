
.. _testing:

Testing Agents and Modules
==========================

Overview
--------

Writing `unit tests <http://en.wikipedia.org/wiki/Unit_testing>`_ for your
module is a prerequisite for its addition to any |cyclus| library, but it's
really a `good idea anyway
<http://software-carpentry.org/v4/test/unit.html>`_. 

|cyclus| makes use of the `Google Test
<http://code.google.com/p/googletest/>`_ framework. The `primer
<https://code.google.com/p/googletest/wiki/Primer>`_ is recommended as an
introduction to the fundamental concepts of unit testing with Google Test.
Seriously, if you're unfamiliar with unit testing or Google Test, check out
the primer.

Unit Tests Out of the Box
-------------------------

The |cyclus| dev team provides a number of unit tests for free (as in
beer). Really! You can unit test your :term:`archetype` immediately to confirm
some basic functionality with the :term:`cyclus kernel`. We provide basic unit
tests for any class that inherits from one of:

* ``cyclus::Agent``
* ``cyclus::Facility``
* ``cyclus::Institution``
* ``cyclus::Region``

Note that ``cyclus::Agent`` is the base class for any object that acts as an
:term:`agent` in the simulation, so every archetype can invoke those unit tests.

In order to get the provided unit tests in your archetype's tests, a few extra
lines must be added to your ``*_tests.cc`` file. For instance, the
``TutorialFacility`` in the :ref:`hello_world` example with the file structure
outline in :ref:`cmake_build` adds the following lines to
``tutorial_facility_tests.cc`` to get all of the free ``cyclus::Agent`` and
``cyclus::Facility`` unit tests: ::

  #include "tutorial_facility.h"
  #include "facility_tests.h"
  #include "agent_tests.h"

  #ifndef CYCLUS_AGENT_TESTS_CONNECTED
  int ConnectAgentTests();
  static int cyclus_agent_tests_connected = ConnectAgentTests();
  #define CYCLUS_AGENT_TESTS_CONNECTED cyclus_agent_tests_connected
  #endif // CYCLUS_AGENT_TESTS_CONNECTED

  cyclus::Agent* TutorialFacilityConstructor(cyclus::Context* ctx) {
    return new TutorialFacility(ctx);
  }

  INSTANTIATE_TEST_CASE_P(TutorialFac, FacilityTests,
                          ::testing::Values(&TutorialFacilityConstructor));

  INSTANTIATE_TEST_CASE_P(TutorialFac, AgentTests,
                          ::testing::Values(&TutorialFacilityConstructor));

The above lines can be specialized to your case by replacing ``TutorialFac`` with
an appropriate moniker (anything that uniquely identifies your unit test
name). Also, if you're subclassing from ``cyclus::Institution`` or
``cyclus::Region``, replace all instances of facility in the above example with
the institution or region, respectively.

Unit Test Example
-----------------

Now we will provide an example of a very simple :term:`archetype` that keeps
track of how many :term:`ticks <tick>` it has experienced. We'll call it
``TickTracker``.

This tutorial assumes that you have a directory setup like that described in
:ref:`hello_world`, namely that there is a `src` directory in which
:term:`archetype` source files are housed and a `install.py` file that will
install them on your system.

Make a file called ``tick_tracker.h`` in the ``src`` directory that has the
following lines:

.. code-block:: cpp

  #include "cyclus.h"

  class TickTracker : public cyclus::Facility {
   public:
    TickTracker(cyclus::Context* ctx);

    #pragma cyclus

    /// increments n_ticks  
    virtual void Tick();

    /// no-op
    virtual void Tock() {};

    /// query now many ticks the agent has experienced
    inline int n_ticks() const {return n_ticks_;}

   private:
    int n_ticks_;
  };

Next, make a file called ``tick_tracker.cc`` in the ``src`` directory that has the
following lines:

.. code-block:: cpp

  #include "tick_tracker.h"
  
  // we have to call the base cyclus::Facility class' constructor 
  // with a context argument
  TickTracker::TickTracker(cyclus::Context* ctx) : n_ticks_(0), cyclus::Facility(ctx) {};

  // tick experienced!
  void TickTracker::Tick() {n_ticks_++;}    

Now, make a file called ``tick_tracker_tests.cc`` in the ``src`` directory that
has the following lines:

.. code-block:: cpp

  // gtest deps
  #include <gtest/gtest.h>
  
  // cyclus deps
  #include "facility_tests.h"
  #include "agent_tests.h"
  #include "test_context.h"
  
  // our deps
  #include "tick_tracker.h"
  
  // write a unit test of our own
  TEST(TickTracker, track_ticks) {
    cyclus::TestContext ctx;
    TickTracker fac(ctx.get());
    EXPECT_EQ(0, fac.n_ticks());
    fac.Tick();
    EXPECT_EQ(1, fac.n_ticks());
    fac.Tick();
    EXPECT_EQ(2, fac.n_ticks());
  }

  // get all the basic unit tests
  #ifndef CYCLUS_AGENT_TESTS_CONNECTED
  int ConnectAgentTests();
  static int cyclus_agent_tests_connected = ConnectAgentTests();
  #define CYCLUS_AGENT_TESTS_CONNECTED cyclus_agent_tests_connected
  #endif // CYCLUS_AGENT_TESTS_CONNECTED

  cyclus::Agent* TickTrackerConstructor(cyclus::Context* ctx) {
    return new TickTracker(ctx);
  }

  INSTANTIATE_TEST_CASE_P(TicTrac, FacilityTests,
                          ::testing::Values(&TickTrackerConstructor));

  INSTANTIATE_TEST_CASE_P(TicTrac, AgentTests,
                          ::testing::Values(&TickTrackerConstructor));

Add the following lines to the ``src/CMakeLists.txt`` file: ::

  INSTALL_CYCLUS_STANDALONE("TickTracker" "tick_tracker" "tutorial")

Now we're ready to install the ``TickTracker`` module and run its tests. If you
haven't already, now is a good time to add the ``$CYCLUS_INSTALL_PATH`` to your
``PATH`` environment variable (|cyclus|' ``install.py`` defaults to
``~/.local``). Next, from your top level directory (where your ``install.py``
file is), run: 

.. code-block:: bash

  $ ./install.py
  $ TickTracker_unit_tests

Which results in: ::

  [==========] Running 8 tests from 3 test cases.
  [----------] Global test environment set-up.
  [----------] 1 test from TickTracker
  [ RUN      ] TickTracker.track_ticks
  [       OK ] TickTracker.track_ticks (19 ms)
  [----------] 1 test from TickTracker (20 ms total)

  [----------] 5 tests from TicTrac/AgentTests
  [ RUN      ] TicTrac/AgentTests.Clone/0
  [       OK ] TicTrac/AgentTests.Clone/0 (8 ms)
  [ RUN      ] TicTrac/AgentTests.Print/0
  [       OK ] TicTrac/AgentTests.Print/0 (9 ms)
  [ RUN      ] TicTrac/AgentTests.Schema/0
  [       OK ] TicTrac/AgentTests.Schema/0 (9 ms)
  [ RUN      ] TicTrac/AgentTests.Annotations/0
  [       OK ] TicTrac/AgentTests.Annotations/0 (15 ms)
  [ RUN      ] TicTrac/AgentTests.GetAgentType/0
  [       OK ] TicTrac/AgentTests.GetAgentType/0 (8 ms)
  [----------] 5 tests from TicTrac/AgentTests (49 ms total)

  [----------] 2 tests from TicTrac/FacilityTests
  [ RUN      ] TicTrac/FacilityTests.Tick/0
  [       OK ] TicTrac/FacilityTests.Tick/0 (9 ms)
  [ RUN      ] TicTrac/FacilityTests.Tock/0
  [       OK ] TicTrac/FacilityTests.Tock/0 (8 ms)
  [----------] 2 tests from TicTrac/FacilityTests (17 ms total)

  [----------] Global test environment tear-down
  [==========] 8 tests from 3 test cases ran. (86 ms total)
  [  PASSED  ] 8 tests.

Testing Resource Exchange
--------------------------

One of the most important things to test is your archetype's resource exchange
behavior.  Does it request/receive the right kinds of material?  Does it offer/sell
resources at the right time?  One of the best ways to test this is to actually
run a simulation with your archetype.  Cyclus comes with a mock simulation
environment that makes it easy to write these kinds of tests in a way that
works well with gtest.

``MockSim`` is a helper for running full simulations entirely in-code without
having to deal with input files, output database files, and other pieces of
the full Cyclus stack.  All you have to do is initialize a MockSim indicating
the archetype you want to test and the simulation duration.  Then add any
number of sources and/or sinks to transact with your agent.  They can have
specific recipes (or not) and their deployment and lifetime (before
decommissioning) can be specified too.  Here is an example using the
agents:Source archetype in Cyclus as the tested agent:

.. code-block:: c++

    // Define a composition to use as a simulation recipe.
    cyclus::CompMap m;
    m[922350000] = .05;
    m[922380000] = .95;
    cyclus::Composition::Ptr fresh = cyclus::Composition::CreateFromMass(m);

    // Define our archetype xml configuration.
    // This is the info that goes
    // "<config><[archetype-name]>here</[archetype-name]></config>"
    // in the input file.
    std::string config =
        "<commod>enriched_u</commod>"
        "<recipe_name>fresh_fuel</recipe_name>"
        "<capacity>10</capacity>";

    // Create and run a 10 time step mock simulation
    int dur = 10;
    cyclus::MockSim sim(cyclus::AgentSpec(":agents:Source"), config, dur);
    sim.AddRecipe("fresh_fuel", fresh); // with one composition recipe
    sim.AddSink("enriched_u") // and one sink facility
        .recipe("fresh_fuel") // requesting a particular recipe
        .capacity(5) // with a 5 kg per time step receiving limit
        .Finalize(); // (don't forget to call this for each source/sink you add)

    sim.AddSink("enriched_u") // And another sink facility
            // requesting no particular recipe
            // and with infinite capacity
        .start(3) // that isn't built until the 3rd timestep.
        .Finalize();
    int agent_id = sim.Run(); // capture the ID of the agent being tested

The parameters that can be set (or not) for each source/sink are:

* ``recipe(std::string r)``: The recipe to request/provide. Default is none -
  sources provide requested material, sinks take anything.

* ``capacity(double cap)``: The per time step throughput/capacity limit for
  the source/sink. Default is infinite.

* ``start(int t)``: Time the source/sink is initially built. Default is time
  step zero.

* ``lifetime(int)``: The number of time steps the source/sink is deployed
  until automatic decommissioning. Default is infinite (never decommissioned).

For more details, you can read the `MockSim API docs <http://fuelcycle.org/cyclus/api/classcyclus_1_1MockSim.html>`_.
Querying simulation results can be accomplished by getting a reference to the
in-memory database generated.  Not all data that is present in normal
full-stack simulations is available.  However, most of the key core tables are
fully available.  Namely the Transactions, Composition, Resources,
ResCreators, AgentEntry, and AgentExit tables are available.  Any
custom-tables created by the tested archetype will also be available.  Here is
a sample query and test you might write using the gtest framework:

.. code-block:: c++

    // return all transactions where our source facility is the sender
    std::vector<cyclus::Cond> conds;
    conds.push_back("SenderId", "==", agent_id);
    cyclus::QueryResult qr = sim.db().Query("Transactions", &conds);
    int n_trans = qr.rows.size();
    EXPECT_EQ(10, n_trans) << "expected 10 transactions, got " << n_trans;
    
    // reconstruct the material object for the first transaction
    int res_id = qr.GetVal<int>("ResourceId", 0);
    cyclus::Material::Ptr m = sim.GetMaterial(res_id);
    EXPECT_DOUBLE_EQ(10, m->quantity());
    
    // confirm composition is as expected
    cyclus::toolkit::MatQuery mq(m);
    EXPECT_DOUBLE_EQ(0.5, mq.mass(922350000));
    EXPECT_DOUBLE_EQ(9.5, mq.mass(922380000));

You can read API documentation for the `queryable database
<http://fuelcycle.org/cyclus/api/classcyclus_1_1QueryableBackend.html>`_ and
`query results
<http://fuelcycle.org/cyclus/api/classcyclus_1_1QueryResult.html>`_ for more
details.

Debugging
----------

Cyclus has the ability to dump extra information about a simulation run's
resource exchange into the database.  This information can be
particularly helpful for debugging and verifying your archetype's behavior
with respect to resource exchange.  To turn on this debugging, simply run
cyclus with the environment variable ``CYCLUS_DEBUG_DRE`` set to any non-empty
value:

.. code-block:: bash

    $ CYCLUS_DEBUG_DRE=1 cyclus my-sim.xml

The database will then contain two extra tables with several columns each:

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

Note that some information about bids can be inferred from corresponding
requests.  A bid's time, commodity, resource type, and units are all identical
to those of the corresponding request.
