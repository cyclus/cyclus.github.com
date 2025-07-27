Creating RandomEventInst
=======================

In this tutorial, you will learn how to build a Cyclus Institution Agent that
models real-world policy fluctuations and unpredictable events: the
RandomEventInst. This agent will occasionally deploy or retire facilities at
random intervals, simulating things like sudden policy changes, regional
demands, or unexpected retirements. This guide is designed for beginners—
especially new Cyclus users—who are just starting with Cyclus and C++
agent development. We will walk through every step, clearly indicating what
code goes in the header (.h) file and what goes in the implementation (.cc)
file. We will also introduce the basics of testing your agent.


Introduction
------------

Institutions in Cyclus manage groups of facilities and can control when new
facilities are built or old ones are retired. The RandomEventInst will show how
you can use randomness to model real-world unpredictability, such as:

* Sudden policy changes that force a facility to retire early
* Regional signals that trigger new facility builds
* Random events that affect the fuel cycle

This tutorial will guide you through creating a robust, extensible institution
agent ready for integration into complex fuel cycle simulations.

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

Let's start by building the header file for your new institution. We'll break
it down into sections and explain what each part does.

1. Include Guards and Includes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Include guards prevent the file from being included more than once, which can
cause errors. The includes bring in the necessary Cyclus and toolkit headers.

.. code-block:: c++

    // random_event_inst.h
    #ifndef RANDOM_EVENT_INST_H_
    #define RANDOM_EVENT_INST_H_

    #include "cyclus.h"
    #include <random>
    #include <string>
    #include <vector>

2. Class Declaration
~~~~~~~~~~~~~~~~~~~~
This is where you declare your RandomEventInst class, which inherits from
cyclus::Institution. The class declaration lists all the functions and
variables your agent will have.

.. code-block:: c++

    class RandomEventInst : public cyclus::Institution {
     public:
      RandomEventInst(cyclus::Context* ctx);
      virtual ~RandomEventInst();

      // Cyclus lifecycle methods
      virtual void Tick();
      virtual void Tock();
      virtual void EnterNotify();

      // Helper methods for random events
      void MaybeDeployFacility();
      void MaybeRetireFacility();

     private:
      // Random number generator state
      std::mt19937 rng_;
      std::uniform_real_distribution<double> uniform_dist_;

      // Parameters for event probabilities
      #pragma cyclus var { \
        "doc": "Probability of deploying a facility each timestep (0-1)", \
        "default": 0.1 \
      }
      double deploy_prob_;

      #pragma cyclus var { \
        "doc": "Probability of retiring a facility each timestep (0-1)", \
        "default": 0.05 \
      }
      double retire_prob_;

      #pragma cyclus var { \
        "doc": "Prototype name of facility to deploy", \
        "uitype": "prototype" \
      }
      std::string facility_proto_;

      // Track built facilities for possible retirement
      std::vector<cyclus::Agent*> built_facilities_;
    };

    #endif // RANDOM_EVENT_INST_H_

Implementation File (.cc): Step-by-Step
+++++++++++++++++++++++++++++++++++++++

Now, let's implement the logic in the .cc file. We'll break it down and explain
each part.

1. Includes
~~~~~~~~~~~
You need to include your header file so the compiler knows about your class and
its members.

.. code-block:: c++

    // random_event_inst.cc
    #include "random_event_inst.h"
    #include <algorithm>

2. Constructor and Destructor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The constructor initializes the base class and sets up the random number
generator. The destructor cleans up if needed.

.. code-block:: c++

    RandomEventInst::RandomEventInst(cyclus::Context* ctx)
        : cyclus::Institution(ctx),
          rng_(std::random_device{}()),
          uniform_dist_(0.0, 1.0) {}

    RandomEventInst::~RandomEventInst() {}

3. EnterNotify: Initialization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This method is called when the agent enters the simulation. Here, you can
initialize any state or register for services.

.. code-block:: c++

    void RandomEventInst::EnterNotify() {
      Institution::EnterNotify();
      // Optionally, initialize or log here
    }

4. Tick and Tock: Random Event Logic
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The Tick and Tock methods are called every timestep. We'll use Tick to maybe
deploy a facility, and Tock to maybe retire one.

.. code-block:: c++

    void RandomEventInst::Tick() {
      MaybeDeployFacility();
    }

    void RandomEventInst::Tock() {
      MaybeRetireFacility();
    }

5. MaybeDeployFacility: Random Deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This helper method uses the random number generator to decide whether to deploy
a new facility this timestep.

.. code-block:: c++

    void RandomEventInst::MaybeDeployFacility() {
      if (uniform_dist_(rng_) < deploy_prob_) {
        cyclus::Agent* fac = context()->CreateAgent(facility_proto_);
        context()->SchedBuild(fac, this);
        built_facilities_.push_back(fac);
        // Optionally, log or record the event
      }
    }

6. MaybeRetireFacility: Random Retirement
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This helper method randomly selects one of the built facilities and retires it,
if the random event occurs.

.. code-block:: c++

    void RandomEventInst::MaybeRetireFacility() {
      if (built_facilities_.empty()) return;
      if (uniform_dist_(rng_) < retire_prob_) {
        // Pick a random facility to retire
        size_t idx = static_cast<size_t>(uniform_dist_(rng_) * built_facilities_.size());
        idx = std::min(idx, built_facilities_.size() - 1);
        cyclus::Agent* fac = built_facilities_[idx];
        context()->SchedDecom(fac);
        built_facilities_.erase(built_facilities_.begin() + idx);
        // Optionally, log or record the event
      }
    }

Why Testing Matters
-------------------

Testing is a critical part of developing any Cyclus agent. Good tests help you:

* Catch bugs early
* Ensure your agent behaves as expected
* Make future changes with confidence

Cyclus uses the Google Test framework (gtest) for C++ unit tests. Below is a
simple example of how you might set up tests for your RandomEventInst.

Example Test Files
------------------

Header File: random_event_inst_tests.h
++++++++++++++++++++++++++++++++++++++

This file declares a test fixture class for your agent. The fixture sets up and
tears down a RandomEventInst for each test.

.. code-block:: c++

    // random_event_inst_tests.h
    #ifndef RANDOM_EVENT_INST_TESTS_H_
    #define RANDOM_EVENT_INST_TESTS_H_

    #include "gtest/gtest.h"
    #include "random_event_inst.h"

    class RandomEventInstTest : public ::testing::Test {
     protected:
      virtual void SetUp();
      virtual void TearDown();
      RandomEventInst* inst;
    };

    #endif // RANDOM_EVENT_INST_TESTS_H_

Implementation File: random_event_inst_tests.cc
++++++++++++++++++++++++++++++++++++++++++++++

This file implements the test fixture and some basic tests. You can add more
tests as you develop your agent.

.. code-block:: c++

    // random_event_inst_tests.cc
    #include "random_event_inst_tests.h"

    void RandomEventInstTest::SetUp() {
      cyclus::Context* ctx = nullptr; // In real tests, use a mock or real context
      inst = new RandomEventInst(ctx);
    }

    void RandomEventInstTest::TearDown() {
      delete inst;
    }

    TEST_F(RandomEventInstTest, Construction) {
      ASSERT_NE(inst, nullptr);
    }

    TEST_F(RandomEventInstTest, InitialProbabilities) {
      EXPECT_GE(inst->deploy_prob_, 0.0);
      EXPECT_LE(inst->deploy_prob_, 1.0);
      EXPECT_GE(inst->retire_prob_, 0.0);
      EXPECT_LE(inst->retire_prob_, 1.0);
    }

Conclusion
----------

Congratulations! You have now created and tested a Cyclus institution agent
that models random real-world events. This agent can be extended with
additional features such as more complex event logic, logging, or integration
with regional signals. Try integrating your new institution into a Cyclus
simulation and explore its behavior in the fuel cycle! 