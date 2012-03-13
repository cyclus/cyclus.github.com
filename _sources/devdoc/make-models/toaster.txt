s
.. summary Specific Step-by-Step instructions for creating a ToasterFacility 

Model Devlopment Example : ToasterFacility
===========================================

Introduction
------------

The instructions here will use a fictional example (a Toaster) to describe the 
specific steps to take in order to easily add a custom module to the Cyclus 
framework. The module pursued here is a Facility type module which converts a 
`bread` Material Resource into a `toast` Material Resource. In order to do this, 

For each type of model (i.e. Market, Facility, Institution, or Region), a set of 
stub files are available as skeletons for the new models.  When creating a new 
model, it is important that all the functionality defined in these files remains 
in the final model definition. 

Beginning With a Stub Template
-----------------------------------------

To create a new model, e.g. a new FacilityModel of type ToasterFacility:

1. Copy the StubFacility directory and all of the files it contains to a new 
   directory called ToasterFacility.

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

4. Add a new add_subdirectory line to the CMakeLists.txt file in the Facility 
   directory. That should look something like :

.. code-block:: cmake

   # Build the cyclus executable from the CYCLUS_SRC source files
   ADD_SUBDIRECTORY( ConditioningFacility )
   ADD_SUBDIRECTORY( EnrichmentFacility )
   ...
   ADD_SUBDIRECTORY( ToasterFacility )

   SET(ModelTestSource ${ModelTestSource} ${FacilityTestSource} PARENT_SCOPE)


Customization of the Relax-NG Grammar
-----------------------------------------

The parameters that define a Toaster are :

* **nSlices** :  How many slices it can toast at once [ integer number of slices ]
* **toastiness** : How toasted they become [ light, golden, dark, burnt ]
* **rate** : How long it takes to toast a set of slices [ minutes ]
* **incommodity** : The commodity market in which slices of bread are traded in 
  this simulation [ a string ]
* **outcommodity** : The commodity market in which toasted bread is traded in this 
  simulation [ a string ]

To tell the cyclus framework that this is the necessary information to define a 
ToasterFacility, we include a Relax-NG grammar file. The stub looks like : 

.. code-block:: xml

  <grammar xmlns="http://relaxng.org/ns/structure/1.0"
  datatypeLibrary="http://www.w3.org/2001/XMLSchema-datatypes">

  <define name="ToasterFacility">
    <element name="ToasterFacility"> <ref name="incommodity"/>
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
  in any rng file within the simulation. 
* The data types of the parameters are defined by the datatypeLibrary referenced 
  in the top line. The documentation for this datatype library can be found at 
  the url. This is provided only for convenience, and allows the XML parser to 
  check the datatype of user input.
* The toastiness parameter is passed as a string. This means that the 
  input error checking, string interpretation, and other parsing that must be 
  done to ensure that the value provided is within the available (light, golden, 
  dark, burnt) options must be done in the initialization function on the c++ 
  side. Though this parameter could have been defined in other ways, thisi is a good
  example of how to arrage to do the input parsing task outside of xml. **Note that 
  such a string parameter could also be used to provide the name of another input 
  file that helps define a module. The interpretation, again, would have to be 
  done on the c++ side**


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
  
  /**
    @class ToasterFacility
    
    @brief This FacilityModel is intended 
    as a skeleton to guide the implementation of new FacilityModel models. 
    
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
    Place a description of the detailed behavior of the model. Consider describing 
    the behavior at the tick and tock as well as the behavior upon sending and
    receiving materials and messages. 
  */

This should looke more like :

.. code-block:: cpp

  // ToasterFacility.h
  #if !defined(_TOASTERFACILITY_H)
  #define _TOASTERFACILITY_H
  
  #include "Logger.h"
  #include "FacilityModel.h"
  
  /**
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
    defined : 
    - int nSlices :  How many slices it can toast at once [ integer number of slices ]
    - string toastiness : How toasted they become [ light, golden, dark, burnt ]
    - double rate : How long it takes to toast a set of slices [ minutes ]
    - string incommodity : The commodity market in which slices of bread are traded 
    - string outcommodity : The commodity market in which toasted bread is traded
  
    @section optionalparams Optional Parameters
    This model has no optional parameters.
  
    @section detailed Detailed Behavior
    The ToasterFacility starts operation immediately. 

    @subsection tick On the tick :
    The ToasterFacility immediately offers any toast that exists in the inventory from 
    previous months and begins to request the incommodity. It requests as much sliced 
    bread as it can toast within a timestep. That is, it requests 86400 slices if 
    the timestep is 30 days long, the rate is 2 minutes per set of slices, and  
    n_slices = 4. 
     
    @subsection receive Receiving a Message :
    If the request is matched with an offer from another facility, 
    the ToasterFacility executes that order by adding that quantity to its stocks. 
   
    @subsection tock On the tock :
    On the tock, the ToasterFacility alters the isotopic vectors of each slice of 
    bread in the stocks (up to the monthly capacity) to include more carbon and less
    oxygen (the magnitude of the change is defined by the toastiness parameter). Each 
    (now toasted) slice is then placed in the inventory. 
    
  */



Customization of Module Behavior
-----------------------------------------

init
+++++++

One of the requirements for a model to be properly loaded into the Cyclus 
framework is a  method named 'init' to initialize an instance of the model from an XML node pointer (xmlNodePtr)

* this method must call the parent class method of the same name (e.g.
  FacilityModel::init(cur))

* this method should only initialize variables that are NOT members of the
  parent class

In order for your module to have access to these parameters that define a 
configured prototype the init function must load the data from XML. The 
ToasterFacility.cpp file changes from :

.. code-block:: cpp

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    
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
    n_slices_ = strtol(XMLinput->get_xpath_content(cur, "rate"), NULL, 10);
    toastiness_ = XMLinput->get_xpath_content(cur,"toastiness");
    rate_ = strtod(XMLinput->get_xpath_content(cur, "rate"), NULL);
    incommodity_ = XMLinput->get_xpath_content(cur, "incommodity");
    outcommodity_ = XMLinput->get_xpath_content(cur, "outcommodity");
  
    // check that toastiness_ is oneof the allowed levels :
    // this gives an example of performing input checking in the module 
    // in case the xml parser is not detailed enough
    string levels_array = {"light", "golden", "dark", "burnt"};
    set<string> allowed_levels(levels_array, levels_array+4);
    if !allowed_levels.find(toastiness_){
      string msg = "The value given for the darkenss parameter, ";
      msg += toastiness_;
      msg += ", is not within the allowed set. Allowed values are: ";
      set<string>::iterator it;
      for (it=allowed_levels.begin(); it != allowed_levels.end(); it++){
        msg += " ";
        msg += (*it);
      }
      msg+=".";
      throw CycException(msg);
    }
  }

These member variables must be declared in the ToasterFacility.h header file. The header file originally has a section that looks like :

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
     * The toastiness of the toast. This can be 'light', 'golden', 'dark' or 'burnt'. 
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

All models must provide a method named 'copy' to initialize an instance of the model from another
  instance of the same model

* this method must call the parent class method of the same name (e.g.
  FacilityModel::copy(src))

* this method should only initialize variables that are NOT members of the
  parent class   



print
++++++++

All models may provide a method named 'print' to print a description of the model

* this method should call the parent class method of the same name (e.g.
  FacilityModel::print())

* this method should only print information that is NOT part of the parent
  class(es)

* this method assumes that a dangling output line (no std::endl) is left
  from the parent class output


handleTick and handleTock
++++++++++++++++++++++++++

The handleTick and handleTock functions are called once per timestep, and it is
in these functions that much of the behavior of the module is defined.

receiveMessage
++++++++++++++++++++++++++

A communicator may implement actions for receiving a message.


