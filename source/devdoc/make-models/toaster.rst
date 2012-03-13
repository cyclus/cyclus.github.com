
.. summary Specific Step-by-Step instructions for creating a ToasterFacility 

Model Devlopment Example : ToasterFacility
===========================================

Introduction
------------

The instructions here will use a fictional example (a Toaster) to describe the 
specific steps to take in order to easily add a custom module to the Cyclus 
framework. The module pursued here is a Facility type module which converts a 
`bread` Material Resource into a `toast` Material Resource. In order to do this, 

Creating New Models of the Existing Types
-----------------------------------------

For each type of model (i.e. Market, Facility, Institution, or Region), a set of 
stub files are available as skeletons for the new models.  When creating a new 
model, it is important that all the functionality defined in these files remains 
in the final model definition. 

Beginning With a Stub Template
+++++++++++++++++++++++++++++++

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
++++++++++++++++++++++++++++++++++++++

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

Customization of the init function 
+++++++++++++++++++++++++++++++++++++++++++++

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
     * The toastiness of the toast. This can be 
     */
    std::string toastiness_;
  
    /**
     * The name of the commodity market for the incoming commodity.
     */
    std::string incommodity;
  
    /**
     * The name of the commodity market for the outgoing commodity.
     */
    std::string outcommodity;
  
  
  /* ------------------- */ 
  
  };


Customization of the Documentation Comments 
+++++++++++++++++++++++++++++++++++++++++++++

To build documentation of your module into the doxygen documentation you or your 
users build locally, your code must contain informative, Doxygen style comments 
to describe the classes and functions that define your module. More details of 
this are discussed in the style guide, but the Stub files give a good begining. 

For our ToasterFacility, the ToasterFacility.h file, for instance, has a section 
that looks like :
   

To customize it, we change the 


Customization of The Template
++++++++++++++++++++++++++++++

All models must provide a number of functions for which you have copied the 
minium functioning version. This tutorial will address the steps with which to 
customize each of those functions. 
These functions are :

* a method named 'init' to initialize an instance of the model from an XML
  node pointer (xmlNodePtr)

  * this method must call the parent class method of the same name (e.g.
    FacilityModel::init(cur))

  * this method should only initialize variables that are NOT members of the
    parent class

* a method named 'copy' to initialize an instance of the model from another
  instance of the same model

  * this method must call the parent class method of the same name (e.g.
    FacilityModel::copy(src))

  * this method should only initialize variables that are NOT members of the
    parent class   

* a method named 'print' to print a description of the model

  * this method should call the parent class method of the same name (e.g.
    FacilityModel::print())

  * this method should only print information that is NOT part of the parent
    class(es)

  * this method assumes that a dangling output line (no std::endl) is left
    from the parent class output

* a global construct function used to instantiate
  objects of this model type. It is defined, for example, as follows
  
.. code-block:: cpp

      extern "C" Model* constructToasterFacility() {
          return new ToasterFacility();
      }


Creating Specific Model Types
-----------------------------

For further details about creating new models of particular types, consult the
Model-specific reference:

.. toctree::
   :maxdepth: 2

   facility
   institution
   region
   market
  
A Note To Core Developers
+++++++++++++++++++++++++

It is very important to keep the Stub files in the Models directory (or in each
of the model sub-directories) current.  As the Model.h definition is
improved/enhanced/developed, each of the model types will have to be updated to
be consistent.  Treat the StubModel and the StubCommModel in the same way as
others to ensure it remains up-to-date.

Similarly if a single model type is updated, e.g. MarketModel.h, with new
capability, each of the implemented models will need to be updated to be
consistent.  Treat the Stub`*` Models in each sub-directory in the same way as
the others to ensure it remains up-to-date.

Extending Loadable Modules to Other Types (outdated)
----------------------------------------------------

The current code already has support for loadable modules for MarketModel,
FacilityModel, InstModel, and RegionModel. These are all derived from base
class Model defined in `src/Models/Model.h`.  To support extension of this
capability to other types of models, the files `src/Models/StubModel.h` &
`src/Models/StubModel.cpp` is provided.  (Stubs are also provided for new
Models that are also Communicators: `src/Models/StubCommModel.h` &
`src/Models/StubCommModel.cpp`.)

To extend to a new model type, e.g. NewTypeModel:

  * copy StubModel.h & StubModel.cpp to a new location, NewTypeModel.h &
    NewTypeModel.cpp, respectively

  * change the internal references to StubModel to NewTypeModel

  * add NewTypeModel.cpp to the list of sources in the top level CMakeLists.txt file

  * add a sub-directory (e.g. NewType) to the Models directory for your models

     * this directory name will become a keyword and should match the model name

  * create a StubNewType.h and StubNewType.cpp file in that sub-directory that
    are stubs for new models of that type (you may want to copy the files
    Stub/StubStub.h and Stub/StubStub.cpp)

     * follow the directions for creating a new model above to make a Stub for
       your NewType model

All new models types must include:

  * a default constructor that

     * assigns the current value of nextID to the ID member variable and
       increments nextID

     * assigns a string that matches the model name to `model_type`

     * (for Communicators, this should also assign the correct value to
       `commType`)

  * a method named 'init' to initialize an instance of the model from an XML
    node pointer (xmlNodePtr)

     * this method must call the parent class method Model::init(cur)

     * this method should only initialize variables that are NOT members of the
       parent class

  * a method named 'copy' to initialize an instance of the model from another
    instance of the same model

     * this method must call the parent class method Model::copy(src)

     * (for Communicators, this method must call that parent class method
       Communicator::copy(src))

     * this method should only initialize variables that are NOT members of the
       parent class   

  * a method named 'print' to print a description of the model

     * this method should call the parent class method of the same name (e.g.
       MarketModel::print())

     * this method should only print information that is NOT part of the parent
       class(es)

     * this method assumes that a dangling output line (no std::endl) is left
       from the parent class output

Other notes on introducing new Model types:

  * You will probably need to extend the input parsing for this new Model type.
    Since the primary input for *Cyclus* uses XML, you will certainly need to
    add code to recognize and process primitives for this Model type.  While
    you could, in theory, add a completely new input paradigm for Models of
    this type, you might need to extend the *Cyclus* grammar to include support
    for your Models.

  * You will probably need to create a primary storage location for your new
    models in *Cyclus*.  Currently, most models are somehow registered with the
    Logician (exception: InstModel are only registered with their containing
    Region). You will need to extend the code appropriately to give a home to
    your new models.

References
==========

  #. `C++ dlopen mini HOWTO <http://oss.sgi.com/LDP/HOWTO/C++-dlopen/index.html>`_
  #. `Static, Shared Dynamic and Loadable Linux Libraries <http://www.yolinux.com/TUTORIALS/LibraryArchives-StaticAndDynamic.html>`_

