Creating Conversion
===================

In this tutorial, you will learn how to build your very first full Cyclus Agent:
a Conversion Facility. This guide is designed for beginners—especially new
Cyclus users—who are just starting with Cyclus and C++ agent
development. We will walk through every step, clearly indicating what code
goes in the header (.h) file and what goes in the implementation (.cc) file.
We will also introduce the basics of testing your agent.


Introduction
------------

A conversion facility is a key part of the nuclear fuel cycle. It receives
uranium ore (U3O8) as input and produces uranium hexafluoride (UF6) as output.
In Cyclus, this means:

* Requesting U3O8 as a feed commodity
* Offering UF6 as a product commodity
* Managing inventories and conversion rates
* Recording operational metrics and geospatial data

This tutorial will guide you through creating a robust, extensible agent ready
for integration into complex fuel cycle simulations.

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

Let's start by building the header file for your new agent. We'll break it down
into sections and explain what each part does.

1. Include Guards and Includes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Include guards prevent the file from being included more than once, which can
cause errors. The includes bring in the necessary Cyclus and toolkit headers.
Note that, depending on your desired functionality, you may need to include
additional headers.

.. code-block:: c++

    // conversion_facility.h
    #ifndef CONVERSION_FACILITY_H_
    #define CONVERSION_FACILITY_H_

    #include "cyclus.h"
    #include "toolkit/mat_query.h"
    #include "toolkit/timeseries.h"
    #include "toolkit/position.h"

2. Class Declaration
~~~~~~~~~~~~~~~~~~~~
This is where you declare your ConversionFacility class, which inherits from
cyclus::Facility. The class declaration lists all the functions and variables
your agent will have.

.. code-block:: c++

    class ConversionFacility : public cyclus::Facility {
     public:
      ConversionFacility(cyclus::Context* ctx);
      virtual ~ConversionFacility();

      // Cyclus lifecycle methods
      virtual void EnterNotify();
      virtual void Tick();
      virtual void Tock();

      // DRE (Dynamic Resource Exchange) methods
      virtual std::set<RequestPortfolio<Material>::Ptr> GetMatlRequests();
      virtual std::set<BidPortfolio<Material>::Ptr> GetMatlBids(
          CommodMap<Material>::type& commod_requests);
      virtual void AdjustMatlPrefs(PrefMap<Material>::type& prefs);
      virtual void AcceptMatlTrades(
          const std::vector<std::pair<Trade<Material>, Material::Ptr>>& responses);
      virtual void GetMatlTrades(
          const std::vector<Trade<Material>>& trades,
          std::vector<std::pair<Trade<Material>, Material::Ptr>>& responses);

     private:
      // Position tracking (adds latitude/longitude support)
      #include "toolkit/position.cycpp.h"

      // State variables (with Cyclus annotations)
      #pragma cyclus var { \
        "doc": "Input commodity (e.g., U3O8)", \
        "uitype": "incommodity" \
      }
      std::string feed_commod;

      #pragma cyclus var { \
        "doc": "Output commodity (e.g., UF6)", \
        "uitype": "outcommodity" \
      }
      std::string product_commod;

      #pragma cyclus var { \
        "doc": "Conversion capacity per timestep (kg)", \
        "units": "kg" \
      }
      double capacity;

      // Inventories for input and output materials
      cyclus::toolkit::ResBuf<Material> feed_inventory;
      cyclus::toolkit::ResBuf<Material> product_inventory;

      // Example operational metric
      double operating_power;
    };

3. End of Include Guard
~~~~~~~~~~~~~~~~~~~~~~~
Always close your include guard at the end of the file.

.. code-block:: c++

    #endif // CONVERSION_FACILITY_H_

Implementation File (.cc): Step-by-Step
+++++++++++++++++++++++++++++++++++++++

Now, let's implement the logic in the .cc file. We'll break it down and explain
each part.

1. Includes
~~~~~~~~~~~
You need to include your header file so the compiler knows about your class and
its members.

.. code-block:: c++

    // conversion_facility.cc
    #include "conversion_facility.h"

2. Constructor and Destructor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The constructor initializes the base class. The destructor cleans up if needed.

.. code-block:: c++

    // Constructor
    ConversionFacility::ConversionFacility(cyclus::Context* ctx)
        : cyclus::Facility(ctx) {}

    // Destructor
    ConversionFacility::~ConversionFacility() {}

3. EnterNotify: Position Initialization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This method is called when the agent enters the simulation. Here, we initialize
position tracking.

.. code-block:: c++

    void ConversionFacility::EnterNotify() {
      InitializePosition();
    }

4. Material Request Logic (GetMatlRequests)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This function tells Cyclus what feed material (U3O8) your facility wants to
request. It checks how much is needed, creates a request, and adds a capacity
constraint.

.. code-block:: c++

    std::set<RequestPortfolio<Material>::Ptr>
    ConversionFacility::GetMatlRequests() {

      // Create a set of request portfolios
      std::set<RequestPortfolio<Material>::Ptr> ports;

      // Check if we need more feed material
      double needed = std::max(0.0, capacity - feed_inventory.quantity());

      // If we don't need more, return empty set
      if (needed <= 0) return ports;

      // Create a request portfolio
      RequestPortfolio<Material>::Ptr port(new RequestPortfolio<Material>());

      // Create a dummy material request
      Material::Ptr dummy = Material::CreateUntracked(
          needed, context()->GetRecipe(feed_commod));

      // Add the request to the portfolio   
      port->AddRequest(dummy, this, feed_commod, 1.0);

      // Add a capacity constraint
      CapacityConstraint<Material> cc(needed);
      port->AddConstraint(cc);

      // Add the portfolio to the set
      ports.insert(port);

      // Return the set of request portfolios
      return ports;
    }

5. Material Bid Logic (GetMatlBids)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This function tells Cyclus what product material (UF6) your facility can offer.
It checks available inventory, creates bids for requests, and adds a capacity
constraint.

.. code-block:: c++

    std::set<BidPortfolio<Material>::Ptr>
    ConversionFacility::GetMatlBids(
        CommodMap<Material>::type& commod_requests) {

      // Create a set of bid portfolios
      std::set<BidPortfolio<Material>::Ptr> ports;

      // If we don't have any product inventory, return empty set
      if (product_inventory.quantity() <= 0) return ports;

      // Create a bid portfolio
      BidPortfolio<Material>::Ptr port(new BidPortfolio<Material>());
      std::vector<Request<Material>*>& requests =
          commod_requests[product_commod];

      // Iterate over the requests
      for (std::vector<Request<Material>*>::iterator it = requests.begin();
           it != requests.end(); ++it) {

        // Check if we have enough product inventory
        double available = product_inventory.quantity();
        double requested = (*it)->quantity();
        double offer_qty = std::min(available, requested);

        // If we have enough product inventory, create a bid
        if (offer_qty > 0) {
          Material::Ptr offer = product_inventory.Pop(offer_qty);
          port->AddBid(**it, offer, this);
        }
      }

      // Add a capacity constraint
      CapacityConstraint<Material> cc(product_inventory.quantity());
      port->AddConstraint(cc);

      // Add the portfolio to the set
      ports.insert(port);
      return ports;
    }

6. Preference Adjustment (AdjustMatlPrefs)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This function allows you to adjust trade preferences based on material
characteristics. Here, we prefer material with more uranium and penalize
material from reactors.

.. code-block:: c++

    void ConversionFacility::AdjustMatlPrefs(
        PrefMap<Material>::type& prefs) {

      // Iterate over the preferences
      for (auto& p : prefs) {

        // Iterate over the materials
        for (auto& m : p.second) {

          // Get the bid
          Bid<Material>* bid = m.first;

          // Get the offer
          Material::Ptr offer = bid->offer();

          // Get the material query
          cyclus::toolkit::MatQuery mq(offer);
          double u_content = mq.mass(922350000) + mq.mass(922380000);

          // Prefer more uranium, note that the second element of m is the pref
          m.second += u_content * 10; 

          // Penalize reactor-origin material
          if (dynamic_cast<Reactor*>(bid->bidder()) != nullptr) {
            m.second -= 50;
          }
        }
      }
    }

7. Trade Execution (AcceptMatlTrades, GetMatlTrades)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
These functions update your facility's inventories when trades are accepted or
fulfilled.

.. code-block:: c++

    void ConversionFacility::AcceptMatlTrades(
        const std::vector<std::pair<Trade<Material>, Material::Ptr>>& responses) {

      // Iterate over the responses
      for (const auto& r : responses) {

        // If the request is for feed material, push the offer to the feed inventory
        if (r.first.request->commodity() == feed_commod) {
          feed_inventory.Push(r.second);

        // If the request is for product material, push the offer to the product inventory
        } else if (r.first.request->commodity() == product_commod) {
          product_inventory.Push(r.second);
        }
      }
    }

    void ConversionFacility::GetMatlTrades(
        const std::vector<Trade<Material>>& trades,
        std::vector<std::pair<Trade<Material>, Material::Ptr>>& responses) {

        // Iterate over the trades
      for (const auto& t : trades) {

        // Pop the offer from the product inventory, the response is the offer
        // given to the requesting agent.
        double qty = t.amt;
        Material::Ptr response = product_inventory.Pop(qty);
        responses.push_back(std::make_pair(t, response));
      }
    }

8. Data Recording and Inventory Management (Tick, Tock)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
These methods record operational metrics and time series data for analysis and
visualization.

.. code-block:: c++

    void ConversionFacility::Tick() {

      // Convert feed material into product material
      double conversion_fraction = 0.96;
      double to_convert_qty = std::min(capacity, feed_inventory.quantity());
      Material::Ptr to_convert = feed_inventory.Pop(to_convert_qty);

      double converted_material_qty = to_convert_qty * conversion_fraction;
      Material::Ptr converted_material = Material::Create(this, 
                                                        converted_material_qty,
                                                        to_convert->comp());
      product_inventory.Push(converted_material);

      // Record the conversion metrics
      context()->NewDatum("ConversionMetrics")
               ->AddVal("AgentId", id())
               ->AddVal("Time", context()->time())
               ->AddVal("FeedInventory", feed_inventory.quantity())
               ->AddVal("ProductInventory", product_inventory.quantity())
               ->AddVal("OperatingPower", operating_power)
               ->Record();
    }

    void ConversionFacility::Tock() {
      cyclus::toolkit::RecordTimeSeries<cyclus::toolkit::POWER>(
          this, operating_power);
      cyclus::toolkit::RecordTimeSeries<double>(
          "feed_inventory", this, feed_inventory.quantity());
      cyclus::toolkit::RecordTimeSeries<double>(
          "product_inventory", this, product_inventory.quantity());
    }

Why Testing Matters
-------------------

Testing is a critical part of developing any Cyclus agent. Good tests help you:

* Catch bugs early
* Ensure your agent behaves as expected
* Make future changes with confidence

Cyclus uses the Google Test framework (gtest) for C++ unit tests. Below is a
simple example of how you might set up tests for your Conversion Facility.

Example Test Files
------------------

Header File: conversion_tests.h
+++++++++++++++++++++++++++++++

This file declares a test fixture class for your agent. The fixture sets up and
tears down a ConversionFacility for each test.

.. code-block:: c++

    // conversion_tests.h
    #ifndef CONVERSION_TESTS_H_
    #define CONVERSION_TESTS_H_

    #include "gtest/gtest.h"
    #include "conversion_facility.h"

    class ConversionFacilityTest : public ::testing::Test {
     protected:
      virtual void SetUp();
      virtual void TearDown();
      ConversionFacility* facility;
    };

    #endif // CONVERSION_TESTS_H_

Implementation File: conversion_tests.cc
+++++++++++++++++++++++++++++++++++++++

This file implements the test fixture and some basic tests. You can add more
tests as you develop your agent.

.. code-block:: c++

    // conversion_tests.cc
    #include "conversion_tests.h"

    void ConversionFacilityTest::SetUp() {
      cyclus::Context* ctx = nullptr; // In real tests, use a mock or real context
      facility = new ConversionFacility(ctx);
    }

    void ConversionFacilityTest::TearDown() {
      delete facility;
    }

    TEST_F(ConversionFacilityTest, Construction) {
      ASSERT_NE(facility, nullptr);
    }

    TEST_F(ConversionFacilityTest, InitialInventory) {
      EXPECT_DOUBLE_EQ(facility->feed_inventory.quantity(), 0.0);
      EXPECT_DOUBLE_EQ(facility->product_inventory.quantity(), 0.0);
    }

Conclusion
----------

Congratulations! You have now created and tested your first Cyclus agent—a
Conversion Facility. This agent can be extended with additional features such
as dynamic conversion rates, maintenance schedules, or more detailed material
tracking. Try integrating your new facility into a Cyclus simulation and
explore its behavior in the fuel cycle! 