
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
<http://code.google.com/p/googletest/>`_ framework. For each module
in *Cyclus*, a series of test fixtures are run. A test fixture is
defined by a macro, e.g.:

.. code-block:: cpp

   //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   TEST_F(ModuleTest,TestSomeFunctionality) {
     // for example, let us assume a variable begins in a false state,
     // a function is called, and we expect that variable to end in 
     // a true state
     EXPECT_FALSE(some_var_);
     callSomeFunction();
     EXPECT_TRUE(some_var_);
   }

In addition to test fixtures, one must define:

  * a SetUp() function
  * a TearDown() function

When executed, the testing framework will run each test fixture 
independently. For each fixture, Google Test does the following:

  #. Run SetUp()
  #. Run ModuleTest Fixture
  #. Run TearDown()

It is the responsibility of the developer to properly initialize any
required members in SetUp() and free the appropriate memory in 
TearDown().

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
