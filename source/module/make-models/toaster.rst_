.. summary Specific Step-by-Step instructions for creating a ToasterFacility 

Model Development Example : ToasterFacility
===========================================

Introduction
------------

The instructions here will use a fictional example (a Toaster) to describe the 
specific steps to take in order to easily create a custom module suitable for 
integration with the Cyclus framework. The module pursued here is a Facility 
type module which converts a `bread` Material Resource into a `toast` Material 
Resource. In order to do this, 

For each type of model (i.e. Market, Facility, Institution, or Region), a set of 
stub files are available as skeletons for the new models.  When creating a new 
model, it is important that all the functionality defined in these files remains 
in the final model definition. 

Forking the cycstub Repository
-----------------------------------------

Full instructions for Forking the cycstub repository can be found on `its main 
page. <https://github.com/cyclus/cycstub>`_

Once you have forked, cloned, and configured the cycstub repository, you'll be 
able to use the stub templates you've downloaded to create your toaster 
facility (for example). 


Beginning With a Stub Template
-----------------------------------------

To create a new model, e.g. a new FacilityModel of type ToasterFacility:

1. In the cycstub clone, rename the StubFacility directory and all of the files 
   it contains to a new directory called ToasterFacility.

2. Rename the Stub* files within that directory to corresponding Toaster* files.  
   (That is, rename StubFacility.cpp to ToasterFacility.cpp, etc.)

3. Search instances of `Stub` and `STUB` within those files and replace them 
   with `Toaster` and `TOASTER`. That is, code such as:

.. code-block:: cpp

   // StubFacility.h
   #if !defined(_STUBFACILITY_H)
   #define _STUBFACILITY_H
   
   #include "Logger.h"
   #include "FacilityModel.h"

   class StubFacility : public FacilityModel  // ...

would become :

.. code-block:: cpp

   // ToasterFacility.h
   #if !defined(_TOASTERFACILITY_H)
   #define _TOASTERFACILITY_H
   
   #include "Logger.h"
   #include "FacilityModel.h"
   
   class ToasterFacility : public FacilityModel  // ...


Customization of the Relax-NG Grammar
-----------------------------------------

The parameters that define a Toaster are :

* **nSlices** :  How many slices it can toast at once [ integer number of slices 
  ]
* **toastiness** : How toasted they become [ light, golden, dark, burnt ]
* **rate** : How long it takes to toast a set of slices [ minutes ]

To tell the cyclus framework that this is the necessary information to define a 
ToasterFacility, we include a Relax-NG grammar file. The stub looks like : 

.. code-block:: xml

  <grammar xmlns="http://relaxng.org/ns/structure/1.0"
  datatypeLibrary="http://www.w3.org/2001/XMLSchema-datatypes">

  <define name="StubFacility">
    <element name="StubFacility"> 
      <ref name="incommodity"/>
       <oneOrMore>
         <ref name="outcommodity"/>
       </oneOrMore>
    </element>
   </define>

To customize it to include the parameters above, change it to look like :

.. code-block:: xml

  <grammar xmlns="http://relaxng.org/ns/structure/1.0"
  datatypeLibrary="http://www.w3.org/2001/XMLSchema-datatypes">

  <define name="ToasterFacility">
    <element name="ToasterFacility"> 

      <!-- the number of slices -->
      <element name="nSlices">
        <data type="nonNegativeInteger"/>
      </element>

      <!-- the toastiness -->
      <element name="toastiness">
        <data type="string"/>
      </element>

      <!-- how fast it gets toasty -->
      <element name="rate">
        <data type="double"/>
      </element>

    </element>
   </define>
  

There are a few things to notice here. 

* The data types of the parameters are defined by the `datatypeLibrary` 
  referenced in the top line. The documentation for this datatype 
  library can be found at the url. This is provided only for 
  convenience, and allows the XML parser to check the datatype of user input.

* The toastiness parameter is passed as a string. This means that the input 
  error checking, string interpretation, and other parsing that must be done to 
  ensure that the value provided is within the available (light, golden, dark, 
  burnt) options must be done in the initialization function on the c++ side. 
  Though this parameter could have been defined in other ways, this is a good
  example of how to arrange to do the input parsing task outside of xml. **Note 
  that such a string parameter could also be used to provide the name of another 
  input file that helps define a module. The interpretation, again, would have 
  to be done on the c++ side.**


Customization of the Documentation Comments 
----------------------------------------------

To build documentation of your module into the doxygen documentation you or your 
users build locally, your code must contain informative, Doxygen style comments 
to describe the classes and functions that define your module. More details of 
this are discussed in the style guide, but the Stub files give a good beginning. 

For our ToasterFacility, the ToasterFacility.h file, for instance, has a section 
that looks like :
   
.. code-block:: cpp

  // ToasterFacility.h
  #if !defined(_TOASTERFACILITY_H)
  #define _TOASTERFACILITY_H
  
  #include "Logger.h"
  #include "FacilityModel.h"
  
  /*!
    @class ToasterFacility
    
    @brief This FacilityModel is intended as a skeleton to guide the 
    implementation of new FacilityModel models. 
    
    The ToasterFacility class inherits from the FacilityModel class and is 
    dynamically loaded by the Model class when requested.
  
    @section intro Introduction
    Place an introduction to the model here. 
  
    @section modelparams Model Parameters
    Place a description of the required input parameters which define the model 
    implementation.
  
    @section optionalparams Optional Parameters
    Place a description of the optional input parameters to define the model 
    implementation.
  
    @section detailed Detailed Behavior
    Place a description of the detailed behavior of the model. Consider 
    describing the behavior at the tick and tock as well as the behavior upon 
    sending and
    receiving materials and messages.  
    !*/ 


This should look more like :

.. code-block:: cpp

  // ToasterFacility.h
  #if !defined(_TOASTERFACILITY_H)
  #define _TOASTERFACILITY_H
  
  #include "Logger.h"
  #include "FacilityModel.h"
  
  /*!
    @class ToasterFacility
    
    @brief This FacilityModel is intended to toast material objects
    
    The ToasterFacility class inherits from the FacilityModel class and is 
    dynamically loaded by the Model class when requested.
  
    @section intro Introduction
    A toaster is a common household implement which adds some carbon to our 
    slices of bread. It usually takes about a minute to heat a slice of bread 
    until it is golden brown. 
  
    @section modelparams Model Parameters
    To fully define a Toaster prototype, the following parameters must be 
    defined : - int nSlices :  How many slices it can toast at once [ integer 
    number of slices ]
    - string toastiness : How toasted they become [ light, golden, dark, burnt ]
    - double rate : How long it takes to toast a set of slices [ minutes ]
  
    @section optionalparams Optional Parameters
    This model has no optional parameters.
  
    @section detailed Detailed Behavior
    The ToasterFacility starts operation immediately. 

    @subsection tick On the tick :
    The ToasterFacility immediately offers any toast that exists in the 
    inventory from previous months and requests sliced bread. It 
    requests as much sliced bread as it can toast within a time-step. That is, it 
    requests 86400 slices if the time-step is 30 days long, the rate is 2 minutes 
    per set of slices, and  n_slices = 4. 
     
    @subsection receive Receiving a Message :
    If the request is matched with an offer from another facility, the 
    ToasterFacility executes that order by adding that quantity to its stocks. 
   
    @subsection tock On the tock :
    On the tock, the ToasterFacility alters the isotopic vectors of each slice 
    of bread in the stocks (up to the monthly capacity) to include more carbon 
    and less
    oxygen (the magnitude of the change is defined by the toastiness parameter). 
    Each (now toasted) slice is then placed in the inventory. 
    
  !*/



Customization of Module Behavior
--------------------------------

Facilities behave uniquely in *Cyclus* because they are implemented 
using a `Prototype <http://en.wikipedia.org/wiki/Prototype_pattern#C.2B.2B>`_ 
design pattern. At the beginning of the simulation, an archetype of
your facility is instantiated from XML. When your facilities are 
built in the simulation, a clone is created from this archetype. The
details are described below.

initialization
++++++++++++++

The archetype of your facility will be created via reading your XML
input schema. We use an in-house tool called a QueryEngine to traverse
the XML input. We will call your user-defined initialization function
after all core-related members (e.g. the name of your facility, 
lifetime, etc.) have been initialized. You should read the doxygen
documentation for the QueryEngine to gain a better perspective of how
the tool operates. For now it is suffice to say that any element it
pulls from your input file will be returned as a string, so you must
cast it into the appropriate POD type. We use the tried and true 
Boost library's `lexical_cast <http://www.boost.org/doc/libs/1_52_0/doc/html/boost_lexical_cast.html>`_.

The original StubFacility implementation should change from:

.. code-block:: cpp

   //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    
   void StubFacility::initModuleMembers(QueryEngine* qe) {
     QueryEngine* input = qe->queryElement("input");
     //retrieve input data members here. For example :  
     //string query = "incommodity";
     //incommodity_ = lexical_cast<double>(input->getElementContent(query));
   }

To :

.. code-block:: cpp
  
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    
  void ToasterFacility::initModuleMembers(QueryEngine* qe) {
    string data;

    data = qe->getElementContent("nSlices");
    set_n_slices(lexical_cast<double>(data));

    set_toastiness(qe->getElementContent("toastiness"));

    data = qe->getElementContent("rate");
    set_rate(lexical_cast<double>(data));
  }
  
Note that by using functions to get and set your member variables, you
can encapsulate error checking. For example, the implementation of 
`set_toastiness` may look something like:

.. code-block:: cpp

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    
  void ToasterFacility::set_toastiness(std::string input) {    
    // check that toastiness is one of the allowed levels :
    // this gives an example of performing input checking in the module
    // in case the xml parser is not detailed enough
    if(allowed_levels_.find(input)==allowed_levels_.end()){
      stringstream msg;
      msg << "The value given for the toastiness parameter, "
          << input
          << ", is not within the allowed set. Allowed values are: "
          << printAllowedValues();
      throw CycException(msg.str());
    }

    toastiness_ = input;
  }

These member variables must be declared in the ToasterFacility.h header file. 
The header file originally has a section that looks like :
  
.. code-block:: cpp
  
  /* --------------------
   * _THIS_ FACILITYMODEL class has these members
   * --------------------
   */
  
  /* ------------------- */ 

  };
        
We change it to include :
 
.. code-block:: cpp
  
  /* --------------------
   * _THIS_ FACILITYMODEL class has these members
   * --------------------
   */
  
   public:
    /// get the number of slices
    int n_slices();

    /// get the toast rate
    double rate();

    /// get the toastiness
    std::string toastiness();

   private:
    /**
      set the number of slices
      @param n the number of slices
    */
    void set_n_slices(int n);
    
    /**
      set the rate of toasting
      @param r the rate to set
    */
    void set_rate(double r);

    /**
      set the toastiness
      @param input the input given for the toastiness
      @warning an error will be thrown if the input is not in the allowable set!
    */
    void set_toastiness(std::string input);
    
    /**
       The number of slices the toaster can handle at one time
     */
    int n_slices_;
  
    /**
       The speed (set of slices per minute) with which the toaster toasts
     */
    double rate_;
  
    /**
       The toastiness of the toast. This can be 'light', 'golden', 'dark' or 
       'burnt'.  
    */
    std::string toastiness_;
    
  /* ------------------- */ 
  
  };

cloning
+++++++

Whenever a Facility is instantiated in the *Cyclus* world, it is
actually cloned from its original archetype (that we initialized via 
XML earlier). Accordingly, developers must provide a method to copy 
the appropriate data from the archetype into the 
about-to-be-instantiated clone. 

Please note that the *Cyclus* core does not know anything about your
module, so the function call will pass you a base class FacilityModel
pointer. You will have to cast it into the correct derived class 
pointer in order to access the derived class' members and methods.

The implementation for the Toaster's cloning function would look like:

.. code-block:: cpp

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    
  void ToasterFacility::cloneModuleMembersFrom(FacilityModel* sourceModel) {
    ToasterFacility* source = dynamic_cast<ToasterFacility*>(sourceModel);
    set_n_slices(source->n_slices());
    set_toastiness(source->toastiness());
    set_rate(source->rate());
  }

module information
++++++++++++++++++

For debugging and verification purposes, we have found it useful to
define a function to allow modules to print information about 
themselves. It is provided via a virtual function in the FacilityModel
API called str(). The ToasterFacility might implement such a function
as:

.. code-block:: cpp

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  std::string ToasterFacility::str() {
    std::stringstream ss;
    ss << name()
       << " can toast " << n_slices() << " at a time. It toasts them at "
       << rate() << " slices per minute, and it will toast them up to "
       << " a level of " << toastiness() << " toastiness.";
    return ss.str();
  }

handleTick and handleTock
++++++++++++++++++++++++++

The handleTick and handleTock functions are called once per timestep, and it is
in these functions that much of the behavior of the module is defined.

If Resources must be created, manipulated, etc. these are the functions in which 
to trigger those behaviors.

Cyclus convention decrees that in the handleTick step, facilities make 
requests and offers.  On handleTock, they do clean-up tasks, such as 
responding to transaction matches and processing Resources.

The ToasterFacility handleTick and handleTock functions may look something 
like : 

.. code-block:: cpp
  
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  void ToasterFacility::handleTick(int time) {
    makeRequests();
    makeOffers();
    inventory_.pushAll(toast(stocks_));
  }
  
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  void ToasterFacility::handleTock(int time) {
    sendToast(orders_waiting_);
    cleanUp();
  }
  
The details of implementation are entirely up to the developer. In this example, 
the details are hidden in the private functions that are defined elsewhere in the 
ToasterFacility class.

For this to work out, of course, you'll need to declare the `vector<msg_ptr> orders_waiting_`
and the `MatBuff stocks_` in the header file. 

receiveMessage
++++++++++++++++++++++++++

The Toaster likes to keep the message and deal with it later. The 
developer is welcome to deal with in whatever way they like. In this example, 
a vector of the received message pointers is kept as the private member variable 
`orders_waiting_`.


.. code-block:: cpp

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    
  void SourceFacility::receiveMessage(msg_ptr msg){
    orders_waiting_.push_front(msg);
  }


removeResource and addResource
+++++++++++++++++++++++++++++++

Though here again the developer is welcome to implement this in any way they 
like, we recommend a particular paradigm in which the facility has raw materials ('stocks') 
in pre-precess storage and processed materials ('inventory') in pre-transaction 
storage. A tool in the developer's arsenal for this purpose are the MatBuff and 
MatStore functions. Here we'll utilize the MatBuff class that provides a useful interface
for a list of resource objects.  

.. code-block:: cpp

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  vector<rsrc_ptr> ToasterFacility::removeResource(msg_ptr order) {
    Transaction trans = order->trans();
    if (trans.commod != outcommodity_) {
      string err_msg = "ToasterFacility can only send '" + outcommodity_ ;
      err_msg += + "' materials.";
      throw CycException(err_msg);
    }
  
    Manifest materials;
    materials = inventory_.popNum(1);
  
    return materials;
  
  }
      
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  void ToasterFacility::addResource(msg_ptr msg, vector<rsrc_ptr> manifest) {
    stocks_.pushAll(manifest);
  }
  

Customization of Module Tests
-----------------------------------------


Tests for the ToasterFacility can be implemented in the ToasterFacilityTests.cpp 
file using the GoogleTest testing framework. 

For our purposes, we'll simply show one example of a unit test that the Toaster 
Facility must pass and point out that by copying the ToasterFacilityTests.cpp 
file from the Stub, we have successfully added the ToasterFacility to the 
Models and FacilityModels whose Model and FacilityModel interfaces 
(respectively) are tested.


In the ToasterFacilityTests.cpp file, you'll notice that there is space for you 
to fill in tests concerning the behavior of the ToasterFacility that we defined 
in previous steps.

Our test will just query whether the toaster does one of the things that we 
expect. When we feed it bread, a timestep passes, and we pull the bread back 
out, we want the bread to have less calcium than it did before (did you know 
that, about the toasting process?).

Here's a rough example of how we write that test: 


.. code-block:: cpp

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  TEST_F(ToasterFacilityTest, Toast) {
  
    msg_ptr bread_msg_ = msg_ptr(new Message(new_facility, src_facility));
    bread_msg_->setResource(bread_);
    bread_msg_->setCommod("bread");
  
    vector<rsrc_ptr> manifest, returned; 
    manifest.push_back(rsrc_ptr(bread_));
    src_facility->addResource(bread_msg_, manifest);
  
    double original_mass = (bread_->isoVector()).eltMass(20);
    src_facility->handleTick(1);
    bread_msg_->setCommod("toast");
    returned = src_facility->removeResource(bread_msg_);
    mat_rsrc_ptr toasted_bread = boost::dynamic_pointer_cast<Material>(returned.front());
  
    ASSERT_LT((toasted_bread->isoVector()).eltMass(20),original_mass);
  }




