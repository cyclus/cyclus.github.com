Creating TariffRegion
====================

In this tutorial, you will learn how to build a Cyclus Region Agent that
models economic tariffs: the TariffRegion. This agent will use preference
adjustment to apply "tariffs" (penalties) to trades coming from facilities in
other regions, simulating real-world trade barriers. This guide is designed for
beginners—especially new Cyclus users—who are just starting with Cyclus
and C++ agent development. We will walk through every step, clearly indicating
what code goes in the header (.h) file and what goes in the implementation
(.cc) file. We will also introduce the basics of testing your agent.


Introduction
------------

Regions in Cyclus represent geographic or political groupings of institutions
and facilities. They can influence trade by adjusting preferences, which affect
how the Dynamic Resource Exchange (DRE) matches requests and offers. The
TariffRegion will show how you can use preference adjustment to penalize trades
from outside your region, simulating tariffs or trade barriers.

This tutorial will guide you through creating a robust, extensible region agent
ready for integration into complex fuel cycle simulations.

File Structure: .h vs .cc
-------------------------

In C++ projects, code is split into header files (.h) and implementation files
(.cc):

* The **header file (.h)** declares the class, its member variables, and its
  functions (methods). Think of it as the "blueprint" for your agent.
* The **implementation file (.cc)** contains the actual code for the functions
you declared in the header. This is where the logic lives.

We will clearly indicate which code belongs in which file as we go.

Header File (.h): Step-by-Step
++++++++++++++++++++++++++++++

Let's start by building the header file for your new region. We'll break it
down into sections and explain what each part does.

1. Include Guards and Includes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Include guards prevent the file from being included more than once, which can
cause errors. The includes bring in the necessary Cyclus and toolkit headers.

.. code-block:: c++

    // tariff_region.h
    #ifndef TARIFF_REGION_H_
    #define TARIFF_REGION_H_

    #include "cyclus.h"
    #include <string>

2. Class Declaration
~~~~~~~~~~~~~~~~~~~~
This is where you declare your TariffRegion class, which inherits from
cyclus::Region. The class declaration lists all the functions and variables
your agent will have.

.. code-block:: c++

    class TariffRegion : public cyclus::Region {
     public:
      TariffRegion(cyclus::Context* ctx);
      virtual ~TariffRegion();

      // Cyclus lifecycle methods
      virtual void EnterNotify();
      virtual void Tick();
      virtual void Tock();

      // Preference adjustment for tariffs
      virtual void AdjustMatlPrefs(cyclus::PrefMap<cyclus::Material>::type& prefs);
      virtual void AdjustProductPrefs(cyclus::PrefMap<cyclus::Product>::type& prefs);

     private:
      // Tariff penalty to apply to trades from other regions
      #pragma cyclus var { \
        "doc": "Tariff penalty to apply to trades from other regions", \
        "default": 50.0 \
      }
      double tariff_penalty_;
    };

    #endif // TARIFF_REGION_H_

Implementation File (.cc): Step-by-Step
+++++++++++++++++++++++++++++++++++++++

Now, let's implement the logic in the .cc file. We'll break it down and explain
each part.

1. Includes
~~~~~~~~~~~
You need to include your header file so the compiler knows about your class and
its members.

.. code-block:: c++

    // tariff_region.cc
    #include "tariff_region.h"

2. Constructor and Destructor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The constructor initializes the base class. The destructor cleans up if needed.

.. code-block:: c++

    // Constructor
    TariffRegion::TariffRegion(cyclus::Context* ctx)
        : cyclus::Region(ctx) {}

    // Destructor
    TariffRegion::~TariffRegion() {}

3. EnterNotify: Initialization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This method is called when the agent enters the simulation. In `EnterNotify()`,
you can perform any setup that needs to happen after the region is fully
constructed and added to the simulation. This might include:

- **Initializing state:** Setting up variables or data structures that depend on
the simulation context, or that require information about other agents (such as
institutions or facilities) that are now available.
- **Registering for services:** If your region needs to listen for simulation
events (like time steps, builds, or decommissions), you can register as a
listener here. For example, you might call `context()->RegisterTimeListener(this);`
if you want your region to receive `Tick()` and `Tock()` calls. Note that 
typically this is not done.
- **Logging or diagnostics:** You can print messages or record information for
debugging or analysis.
- **Interacting with other agents:** If your region needs to communicate with its
institutions or facilities, or set up relationships, this is a good place to do
it, since all agents are now present in the simulation.

Example:

.. code-block:: c++

    void TariffRegion::EnterNotify() {
      Region::EnterNotify();
      // Register for time step notifications if needed
      // context()->RegisterTimeListener(this);

      // Initialize or reset any state variables here

      // Optionally, log that the region has entered the simulation
      // LOG(cyclus::LEV_INFO3, "TariffRegion") << "TariffRegion has entered the simulation.";
    }

4. Tick and Tock: (Optional)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The Tick and Tock methods are called every timestep. For this simple region,
you will not need to do anything, but you can use these methods for logging or
future extensions. If you are following this tutorial, you will not need to
implement these methods. However, more advanced users may want to use these
for logging or future extensions.

.. code-block:: c++

    void TariffRegion::Tick() {
      // No-op for now
    }

    void TariffRegion::Tock() {
      // No-op for now
    }

5. Preference Adjustment: Applying Tariffs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This is the key feature! These methods adjust trade preferences to penalize
trades from facilities in other regions. We'll show the material version, but
the product version is analogous.

To determine the region of a supplier, you need to traverse the agent hierarchy
using `parent()` and `dynamic_cast`. For a facility, `parent()` returns its
institution, and `parent()->parent()` returns its region. For an institution,
`parent()` returns its region. There is no `region()` method on Agent.

.. code-block:: c++

    void TariffRegion::AdjustMatlPrefs(cyclus::PrefMap<cyclus::Material>::type& prefs) {
      for (auto& req_pair : prefs) {

        // Iterate over the bids in the request portfolio
        for (auto& bid_pair : req_pair.second) {

          // Get the bid
          cyclus::Bid<cyclus::Material>* bid = bid_pair.first;

          // Get the supplier
          cyclus::Agent* supplier = bid->bidder();

          // Traverse up the hierarchy to get the supplier's region
          cyclus::Region* supplier_region = nullptr;
          if (supplier != nullptr && supplier->parent() != nullptr) {
            cyclus::Agent* inst = supplier->parent();
            if (inst->parent() != nullptr) {
              supplier_region = dynamic_cast<cyclus::Region*>(inst->parent());
            }
          }
          
          // If the supplier is from a different region, apply the tariff penalty
          if (supplier_region != this) {
            bid_pair.second -= tariff_penalty_;
          }
        }
      }
    }

    void TariffRegion::AdjustProductPrefs(cyclus::PrefMap<cyclus::Product>::type& prefs) {

      // Iterate over the preferences
      for (auto& req_pair : prefs) {
        // Iterate over the bids in the request portfolio
        for (auto& bid_pair : req_pair.second) {

          // Get the bid
          cyclus::Bid<cyclus::Product>* bid = bid_pair.first;

          // Get the supplier
          cyclus::Agent* supplier = bid->bidder();

          // Traverse up the hierarchy to get the supplier's region
          cyclus::Region* supplier_region = nullptr;
          if (supplier != nullptr && supplier->parent() != nullptr) {
            cyclus::Agent* inst = supplier->parent();
            if (inst->parent() != nullptr) {
              supplier_region = dynamic_cast<cyclus::Region*>(inst->parent());
            }
          }

          // If the supplier is from a different region, apply the tariff penalty
          if (supplier_region != this) {
            bid_pair.second -= tariff_penalty_;
          }
        }
      }
    }

Why Testing Matters
-------------------

Testing is a critical part of developing any Cyclus agent. Good tests help you:

* Catch bugs early
* Ensure your agent behaves as expected
* Make future changes with confidence

Cyclus uses the Google Test framework (gtest) for C++ unit tests. Below is a
simple example of how you might set up tests for your TariffRegion.

Example Test Files
------------------

Header File: tariff_region_tests.h
++++++++++++++++++++++++++++++++++

This file declares a test fixture class for your agent. The fixture sets up and
tears down a TariffRegion for each test.

.. code-block:: c++

    // tariff_region_tests.h
    #ifndef TARIFF_REGION_TESTS_H_
    #define TARIFF_REGION_TESTS_H_

    #include "gtest/gtest.h"
    #include "tariff_region.h"

    class TariffRegionTest : public ::testing::Test {
     protected:
      virtual void SetUp();
      virtual void TearDown();
      TariffRegion* region;
    };

    #endif // TARIFF_REGION_TESTS_H_

Implementation File: tariff_region_tests.cc
++++++++++++++++++++++++++++++++++++++++++

This file implements the test fixture and some basic tests. You can add more
tests as you develop your agent.

.. code-block:: c++

    // tariff_region_tests.cc
    #include "tariff_region_tests.h"

    void TariffRegionTest::SetUp() {
      cyclus::Context* ctx = nullptr; // In real tests, use a mock or real context
      region = new TariffRegion(ctx);
    }

    void TariffRegionTest::TearDown() {
      delete region;
    }

    TEST_F(TariffRegionTest, Construction) {
      ASSERT_NE(region, nullptr);
    }

    TEST_F(TariffRegionTest, TariffPenaltyDefault) {
      EXPECT_DOUBLE_EQ(region->tariff_penalty_, 50.0);
    }

Conclusion
----------

Congratulations! You have now created and tested a Cyclus region agent that
models tariffs and trade barriers. This agent can be extended with additional
features such as dynamic tariffs, logging, or integration with policy signals.
Try integrating your new region into a Cyclus simulation and explore its
behavior in the fuel cycle! 