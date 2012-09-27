
.. summary Some guidelines on writing module tests

Writing Tests for Modules
=========================

Introduction
------------
Writing tests for your module is a prerequisite for its addition to 
any *Cyclus* library. Specifically, any public API functionality must
provide the `basic guarantee 
<http://en.wikipedia.org/wiki/Exception_guarantees>`_; however, you
may (and I do) find it useful to test private methods and the effect 
of public methods on private members. This guide will provide an 
example of how to achieve such functionality.

Directory Structure
-------------------
A fully developed module will have the following directory structure:

  * Module.h
  * Module.cpp
  * Module.rng
  * ModuleTests.h
  * ModuleTests.cpp  
  * CMakeLists.txt

Testing Framework
-----------------
*Cyclus* makes use of the `Google Test 
<http://code.google.com/p/googletest/>`_ framework. 
It is a tool which will assist Cyclus developers in incorporating tests for their 
modules. The framework is integrated with `CMake` with the use of gtest.cc 
gtest_main.cc and gtest.h. The Google Test primer is recommended as an 
introduction to the fundamental concepts of unit testing with Google Test.

Unit Tests
~~~~~~~~~~
Unit tests are written for each new unit of functionality to assure correct 
behavior.  A Cyclus unit test should: 

  - Sufficiently verify the expected behavior of a unit of functionality
  - Sufficiently verify expected behavior for boundary cases 
  - Be written simply

A good tutorial on how to write good unit tests can be found at 
software-carpentry.org.

Cyclus test coverage should mimic the hierarchical structure of the source code.
Each class should have a corresponding Test Case that challenges the robustness 
of its interface.

An interface consists of the functions, constructors, and data retrievers with 
which the rest of the code interacts with that class. Each of these functions, 
constructors, and data retrievers should be challenged by a Test within the 
Test Case for that class.

Many of these tests will require the use of Fixtures, which will represent canonical 
Cyclus objects such as Materials, Commodities, Markets, Facilities and Messages. 
These Fixtures will be shared by many Tests and sometimes many Test Cases.


Acceptance Tests
~~~~~~~~~~~~~~~~

If you are a developer, you may write a module that is intended to be a concrete 
implementation of a FacilityModel or other interface type.

To ensure that your code satisfies the basic requirements of the interface which 
it is intended to be satisfy, the Cyclus core developers have created 
parameterized abstract interface tests that must be instantiated with your 
concrete model in order for it to be accepted into the cyclus module library.

The interface for our ToasterFacility can be tested by including 
FacilityModelTests.h in the beginning of the file, ensuring that 
FacilityModelTests.cpp is linked to the CyclusUnitTestDriver executable, and 
declaring the implementation of the parameterized test by providing a reference 
to a constructor to a concrete ToasterFaclity.

.. code-block:: cpp

  // ToasterFacilityTests.cpp
  #include <gtest/gtest.h>
  #include "FacilityModelTests.h"

  FacilityModel* ToasterFacilityConstructor(){
    return new ToasterFaclity();
  }

  INSTANTIATE_TEST_CASE_P(ToasterFac, 
                          FacilityModelTests, 
                          Values(&ToasterFacilityConstructor));


.. code-block:: cpp

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  TEST_F(ToasterFacilityTest, AddingHeat) {
    double original_temp = src_facility->getBreadTemp();
    EXPECT_NO_THROW( src_facility->addHeat(2.0) );
    double warm_temp = src_facility->getBreadTemp(); 
    EXPECT_GT(warm_temp, original_temp;)
    EXPECT_NO_THROW( src_facility->addHeat(-2.0) );
    double cool_temp = src_facility->getBreadTemp(); 
    EXPECT_LT(cool_temp, warm_temp;)
  }

Test Cases
~~~~~~~~~~~

Test Cases are logical groupings of Tests. For Cyclus, each class, such as the 
ToasterFacility should have its own Test Case defined within a file called 
ToasterFacilityTests.cpp or something similar.

The ToasterFacilityTests.cpp file should be placed in the appropriate directory 
within the code as well. Specifically, it should be placed in the 
trunk/src/Facility/ToasterFacility/ folder with the other ToasterFacility files.

The Test Case is a class declared in this file. The Cyclus convention is to give 
the class the same name as the file. For the ToasterFacility, this class will 
look like:

.. code-block:: cpp

  // ToasterFacilityTests.cpp
  #include <gtest/gtest.h>
  #include "ToasterFacility.h"

  using namespace std;

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  class ToasterFacilityTest : public ::testing::Test {
  protected:
    virtual void SetUp(){
    };

    virtual void TearDown() {
    }
  };

When executed, the testing framework will run each test fixture 
independently. For each fixture, Google Test does the following:

  #. Run SetUp()
  #. Run ModuleTest Fixture
  #. Run TearDown()

It is the responsibility of the developer to properly initialize any
required members in SetUp() and free the appropriate memory in 
TearDown().

Tests With Fixtures
~~~~~~~~~~~~~~~~~~~~
section tests Tests with Fixtures

Tests are performed on single units of functionality within Cyclus. For Cyclus, 
  imagine that the ToasterFacility class has a function called addHeat(double 
  to_set) which increases the ``current_bread_temp_`` data member value. Knowing 
  very little about the function, we should check that if to_set is positive, 
  the ``current_bread_temp_`` increases, and if to_set is negative, the 
  ``current_bread_temp_`` decreases. 
  
  A test within the ToasterFacilityTest Test Case will need to utilize a 
  concrete instance of a ToasterFacility to check this. 
  
  To test the internals of the ToasterFacility class, such as private data 
  members like ``current_bread_temp_`` a fixture needs to be created in the setup 
  step. A very simple class is created in order to supply a public getter 
  function for the ``current_bread_temp_`` variable.


.. code-block:: cpp
  // ToasterFacilityTests.cpp
  #include <gtest/gtest.h>
  #include "ToasterFacility.h"
  #include "TestInst.h"
  #include "CycException.h"

  using namespace std;

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  class FakeToasterFacility : public ToasterFacility {
    public:
      FakeToasterFacility() : ToasterFacility() {
      }

      virtual ~FakeToasterFacility() {
      }

      double getBreadTemp(){return current_bread_temp_;
  };
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  class ToasterFacilityTest : public ::testing::Test {
  protected:
    FakeToasterFacility* src_facility;

    virtual void SetUp(){
      src_facility = new FakeToasterFacility();
      src_facility->setParent(new TestInst());
    };

    virtual void TearDown() {
      delete src_facility;
    }
  };
   

For a tutorial on the 
use of Googletest for creating and using Fixtures, please see the Googletest 
primer section on 
<a href="http://code.google.com/p/googletest/wiki/Primer#Test_Fixtures:_Using_the_Same_Data_Configuration_for_Multiple_Te">fixtures</a>.

Now that the fixture setup and teardown are in place, it is possible to add a
test (with access to the fixture to ToasterFacilityTests.cpp.

.. code-block:: cpp

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  TEST_F(ToasterFacilityTest, AddingHeat) {
    double original_temp = src_facility->getBreadTemp();
    EXPECT_NO_THROW( src_facility->addHeat(2.0) );
    double warm_temp = src_facility->getBreadTemp(); 
    EXPECT_GT(warm_temp, original_temp;)
    EXPECT_NO_THROW( src_facility->addHeat(-2.0) );
    double cool_temp = src_facility->getBreadTemp(); 
    EXPECT_LT(cool_temp, warm_temp;)
  }

Assertions
~~~~~~~~~~

As in the example above, Each test will be one or more assertions. Assertions 
test various truth expectations for the boundary cases that might be 
encountered by the function. 

With the Google Test framework, it is easy to make some assertions fatal and 
some nonfatal. That is, for nonfatal assertions, the test continues but for 
fatal assertions the test ceases to continue. In googletest, fatal assertions
are called with the macros that begin with the word EXPECT (EXPECT_EQ(),
EXPECT_LE(), EXPECT_GE()...). For things that absolutely must be the case for
us to trust the results of following tests,

.. code-block:: cpp

  TEST_F(ToasterFacilityTests, addZeroHeat){
    double original_temp = src_facility->getBreadTemp();
    EXPECT_NO_THROW( src_facility->addHeat(0.0) );
    double new_temp = src_facility->getBreadTemp(); 
    EXPECT_EQ(new_temp, original_temp);
  }
Nonfatal assertions are macros that begin with ASSERT (ASSERT_EQ(), ASSERT_LE(), ...).

.. code-block:: cpp

  TEST_F(FooTest, heatTransfer){
    double original_temp = src_facility->getBreadTemp();
    src_facility->addHeat(2.0);
    double new_temp = src_facility->getBreadTemp(); 
    ASSERT_EQ((original_temp+2.0),new_temp);
  }
For more information on the googletest assertion syntax please see the Googletest 
primer section on 
<a href=http://code.google.com/p/googletest/wiki/PrimerAssertions">assertions.



An Example
----------
Now we will provide an example of a very simple module. The module 
increases a privately stored counter.

Module.h
~~~~~~~~

.. code-block:: cpp

  class Module;
  #include "ModuleTests.h"

  class Module {
   public:
    Module();                 // constructor
    void increaseCounter();   // increase counter_ by one
      
   private:
    int counter_;

    friend class ModuleTest;  // friend class gives access to private members 
  };

Here we use the friend keyword. This allows functions defined in the
ModuleTest class to access both private and protected members and 
methods of the Module class.

Module.cpp
~~~~~~~~~~

.. code-block:: cpp

  #include "Module.h"

  // -----------------------------------------------------------------
  Module::Module() {
    counter_ = 0;
  }

  // -----------------------------------------------------------------
  void Module::increaseCounter() {
    counter_++;
  }


ModuleTests.h
~~~~~~~~~~~~~

.. code-block:: cpp

  #include <gtest/gtest.h>
  #include "Module.h"

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  class ModuleTest : public ::testing::Test {
  protected:
    Module* module_;
      
    virtual void SetUp();     // gtest construction
    virtual void TearDown();  // gtest destruction

    int counter();            // access the counter_ variable
  };


ModuleTests.cpp
~~~~~~~~~~~~~~~

.. code-block:: cpp

  #include "ModuleTests.h"

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  void ModuleTest::SetUp() {
    module_ = new Module();
  }
  
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  void ModuleTest::TearDown() {
    delete module_;
  }  

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  int ModuleTest::counter() {
    return module_->counter_; // counter_ accessed via friend class
  }  
  
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  TEST_F(ModuleTest,TestConstructor) {
    EXPECT_EQ(counter(),0);
  }

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  TEST_F(ModuleTest,TestIncreaseCounter) {
    module_->increaseCounter();
    EXPECT_EQ(counter(),1);
  }

Note here that we first test that the counter has been properly 
initialized in the Module's constructor. Second, we test that 
increaseCounter() performs as expected. We need not test that the
counter's value is 0 in TestIncreaseCounter because this has been
determined in TestConstructor.

Testing XML Initialization
--------------------------

*Cyclus* relies on reading xml files to initialize modules. It is 
often very convenient to test that a module has been initalized
correctly. The following example will show how to achieve such
functionality.

Let us return to the Module example; however, this time let us assume
that the initial value of the counter is determined at run time by 
reading an XML file. For example, let us say the XML is as follows:

.. code-block:: xml

  <counter_init>5</counter_init>

Here the counter is initialized to the value 5. Let us revisit each
file to review what has changed to test this new functionality.

Module.h
~~~~~~~~

.. code-block:: cpp

  class Module;
  #include "ModuleTests.h"
  #include <libxml/xpath.h>

  class Module {
   public:
    init(xmlNodePtr cur, xmlXPathContextPtr context);   // initialize counter_
    void increaseCounter();                             // increase counter_ by one
      
   private:
    int counter_;

    friend class ModuleTest;  // friend class gives access to private members 
  };

Module.cpp
~~~~~~~~~~

.. code-block:: cpp

  #include "Module.h"
  #include "InputXML.h"

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  void Module::init(xmlNodePtr cur, xmlXPathContextPtr context) {
    counter_ = 	       
      atoi((const char*)
           XMLinput->get_xpath_content(context,node,"counter_init"));
  }

  // -----------------------------------------------------------------
  void Module::increaseCounter() {
    counter_++;
  }

The counter\_ variable is now initialized via XML. Specifically, an
XML node and context must be provided. Normally in *Cyclus*, the
XML context is provided via the XMLinput singleton.

ModuleTests.h
~~~~~~~~~~~~~

.. code-block:: cpp

  #include "Module.h"

  #include <gtest/gtest.h>
  #include <libxml/parser.h>

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  class ModuleTest : public ::testing::Test {
  protected:
    Module* module_;
    int test_counter_;        // a variable to set the initialized counter to
  
    virtual void SetUp();     // gtest construction
    virtual void TearDown();  // gtest destruction
  
    xmlDocPtr getXMLDoc();    // get an xml doc from an xml snippet
    void initModule();        // initialize the module
    int counter();            // access the counter_ variable  
  };

We can now test the counter\_ variable at run time via the test_counter\_
variable. We additionally encapsulate the module initalization process
in the initModule() function which will use the getXMLDoc() function
to provide the required XML node and context.

ModuleTests.cpp
~~~~~~~~~~~~~~~

.. code-block:: cpp

  #include "ModuleTests.h"

  #include <libxml/parser.h>
  #include <libxml/xpath.h>

  #include <string>
  #include <sstream>

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  void ModuleTest::SetUp() {
    module_ = new Module();
    test_counter_ = 5;      // initialize test_counter_ to some value
    initModule();
  }
  
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  void ModuleTest::TearDown() {
    delete module_;
  }  

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  xmlDocPtr ModuleTest::getXMLDoc() {
    stringstream ss("");

    // get an xml snippet to test using the test_counter_ variable
    ss <<
      "<?xml version=\"1.0\"?>\n" <<
      "<document>\n" <<
      "  <counter_init>" << test_counter_ << "</counter_init>\n" <<
      "</document>";
  
    // return an xmlDocPtr to that snippet
    string snippet = ss.str();
    return xmlParseMemory(snippet.c_str(),snippet.size());
  }  
  
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  void ModuleTest::initModule() {
    xmlDocPtr doc = getXMLDoc();
    xmlXPathContextPtr context = xmlXPathNewContext(doc);
    xmlNodePtr node = doc->children;

    module_->init(node,context); // initialize module_ using the xml snippet
  }  

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  int ModuleTest::counter() {
    return module_->counter_; // counter_ accessed via friend class
  }  
  
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  TEST_F(ModuleTest,TestInit) {
    EXPECT_EQ(counter(),test_counter_);
  }

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  TEST_F(ModuleTest,TestIncreaseCounter) {
    module_->increaseCounter();
    EXPECT_EQ(counter(),test_counter_+1);
  }

With this update, the module\_ will be initialized to test_counter\_ 
each time SetUp() is called. We can therefore make tests that are
very similar to the previous example. The main difference is that we
compare agaisnt a variable initialized by our own test suite, i.e.
test_counter\_, rather than hard-coding in a value, i.e. 0, as was 
true in the previous example.
