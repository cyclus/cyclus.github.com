.. summary Specific Step-by-Step instructions for creating a ToasterFacility 

Model Devlopment Example : ToasterFacility
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
* **incommodity** : The commodity market in which slices of bread are traded in 
  this simulation [ a string ]
* **outcommodity** : The commodity market in which toasted bread is traded in 
  this simulation [ a string ]

To tell the cyclus framework that this is the necessary information to define a 
ToasterFacility, we include a Relax-NG grammar file. The stub looks like : 

.. code-block:: xml

  <grammar xmlns="http://relaxng.org/ns/structure/1.0"
  datatypeLibrary="http://www.w3.org/2001/XMLSchema-datatypes">

  <define name="ToasterFacility">
    <element name="ToasterFacility"> 
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
      <element name="nSlices">
        <data type="nonNegativeInteger"/>
        </element>
      <element name="toastiness">
        <data type="string"/>
        </element>
      <element name="rate">
        <data type="double"/>
        </element>
      <ref name="incommodity"/>
      <ref name="outcommodity"/>
      </element>
   </define>
  

There are a few things to notice here. 

* The incommodity and outcommodity elements are already defined. Since these are 
  common module parameters, they can be used by reference (note the ref syntax) 
  in any rng file within the simulation.  * The data types of the parameters are 
  defined by the datatypeLibrary referenced in the top line. The documentation 
  for this datatype library can be found at the url. This is provided only for 
  convenience, and allows the XML parser to check the datatype of user input.
* The toastiness parameter is passed as a string. This means that the input 
  error checking, string interpretation, and other parsing that must be done to 
  ensure that the value provided is within the available (light, golden, dark, 
  burnt) options must be done in the initialization function on the c++ side. 
  Though this parameter could have been defined in other ways, thisi is a good
  example of how to arrage to do the input parsing task outside of xml. **Note 
  that such a string parameter could also be used to provide the name of another 
  input file that helps define a module. The interpretation, again, would have 
  to be done on the c++ side**


Customization of the Documentation Comments 
----------------------------------------------

To build documentation of your module into the doxygen documentation you or your 
users build locally, your code must contain informative, Doxygen style comments 
to describe the classes and functions that define your module. More details of 
this are discussed in the style guide, but the Stub files give a good begining. 

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


This should looke more like :

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
    A toaster is a common household implment which adds some carbon to our 
    slices of bread. It usually takes about a minute to heat a slice of bread 
    until it is golden brown. 
  
    @section modelparams Model Parameters
    To fully define a Toaster prototype, the following parameters must be 
    defined : - int nSlices :  How many slices it can toast at once [ integer 
    number of slices ]
    - string toastiness : How toasted they become [ light, golden, dark, burnt ]
    - double rate : How long it takes to toast a set of slices [ minutes ]
    - string incommodity : The commodity market in which slices of bread are 
      traded - string outcommodity : The commodity market in which toasted bread 
      is traded
  
    @section optionalparams Optional Parameters
    This model has no optional parameters.
  
    @section detailed Detailed Behavior
    The ToasterFacility starts operation immediately. 

    @subsection tick On the tick :
    The ToasterFacility immediately offers any toast that exists in the 
    inventory from previous months and begins to request the incommodity. It 
    requests as much sliced bread as it can toast within a timestep. That is, it 
    requests 86400 slices if the timestep is 30 days long, the rate is 2 minutes 
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
-----------------------------------------

init
+++++++

One of the requirements for a model to be properly loaded into the Cyclus 
framework is a  method named 'init' to initialize an instance of the model from 
an XML node pointer (xmlNodePtr)

* this method must call the parent class method of the same name (e.g.
  FacilityModel::init(cur))

* this method should only initialize variables that are NOT members of the
  parent class

In order for your module to have access to these parameters that define a 
configured prototype the init function must load the data from XML. The 
ToasterFacility.cpp file changes from :

.. code-block:: cpp

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  void ToasterFacility::init(xmlNodePtr cur) {
    FacilityModel::init(cur);
    /// move XML pointer to current model
    cur = XMLinput->get_xpath_element(cur,"model/ToasterFacility");
    /// initialize any ToasterFacility-specific datamembers here
  }

To :

.. code-block:: cpp
  
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    
  void ToasterFacility::init(xmlNodePtr cur) {
    FacilityModel::init(cur);
  
    /// move XML pointer to current model
    cur = XMLinput->get_xpath_element(cur,"model/ToasterFacility");
  
    /// initialize any ToasterFacility-specific datamembers here
    n_slices_ = strtol(XMLinput->get_xpath_content(cur, "nSlices"), NULL, 10);
    toastiness_ = XMLinput->get_xpath_content(cur,"toastiness");
    rate_ = strtod(XMLinput->get_xpath_content(cur, "rate"), NULL);
    incommodity_ = XMLinput->get_xpath_content(cur, "incommodity");
    outcommodity_ = XMLinput->get_xpath_content(cur, "outcommodity");
  
    // check that toastiness_ is oneof the allowed levels :
    // this gives an example of performing input checking in the module 
    // in case the xml parser is not detailed enough
    if(allowed_levels_.find(toastiness_)==allowed_levels_.end()){
      string msg = "The value given for the toastiness parameter, ";
      msg += toastiness_;
      msg += ", is not within the allowed set. Allowed values are: ";
      map<string,double>::iterator it;
      for (it=allowed_levels_.begin(); it != allowed_levels_.end(); it++){
        msg += " '";
        msg += (*it).first;
        msg += "'";
      }
      msg+=".";
      LOG(LEV_ERROR,"Toast")<<msg;
    }
  
    // initialize the toastiness dependent chemistry
    initToastChem();
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
  
   private:
    /**
     * The number of slices the toaster can handle at one time
     */
    int n_slices_;
  
    /**
     * The speed (set of slices per minute) with which the toaster toasts
     */
    double rate_;
  
    /**
     * The toastiness of the toast. This can be 'light', 'golden', 'dark' or 
       'burnt'.  
    */
    std::string toastiness_;
  
    /**
     * The name of the commodity market for the incoming commodity.
     */
    std::string incommodity_;
  
    /**
     * The name of the commodity market for the outgoing commodity.
     */
    std::string outcommodity_;
  
  
  /* ------------------- */ 
  
  };


copy
++++++

All models must provide a method named 'copy' to initialize an instance of the 
model from another instance of the same model

* this method must call the parent class method of the same name (e.g.
  FacilityModel::copy(src))

* this method should only initialize variables that are NOT members of the
  parent class   


.. code-block:: cpp

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    
  void ToasterFacility::copy(ToasterFacility* src) {
    FacilityModel::copy(src);
    n_slices_=src->n_slices_;
    toastiness_=src->toastiness_;
    rate_=src->rate_;
    incommodity_=src->incommodity_;
    outcommodity_=src->outcommodity_;
    allowed_levels_=src->allowed_levels_;
    toast_bread_elt_ratio_=src->toast_bread_elt_ratio_;
    inventory_.makeUnlimited(); 
    stocks_.makeUnlimited();
  }


print
++++++++

All models may provide a method named 'print' to print a description of the 
model

* this method should call the parent class method of the same name (e.g.
  FacilityModel::print())

* this method should only print information that is NOT part of the parent
  class(es)

* this method assumes that a dangling output line (no std::endl) is left
  from the parent class output

The ToasterFacility I've implemented has a print function that looks like :

.. code-block:: cpp

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    
  void ToasterFacility::print() {
    FacilityModel::print();
    string msg = "ToasterFacility";
    msg += this->ID();
    msg += " makes delicious ";
    msg += toastiness_;
    msg += " toast.";
    LOG(LEV_DEBUG2,"Toast")<<msg;
  };

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
and the `DeckStore stocks_` in the header file. 

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
storage. A tool in the developer's arsenal for this purpose are the DeckStore and 
MatStore functions. Here we'll utilize the DeckStore class that provides a useful interface
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
file using the GoogleTest testing framework. For more details about testing, see
the http://cnergdata.engr.wisc.edu/cyclus/develop/docs/testing.html, the testing section of 
the cyclus doxygen documentation.

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




