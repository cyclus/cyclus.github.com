
.. summary Some developers notes on implementing new dynamically loadable models

Developing Models For Cyclus
============================

Introduction
------------

*Cyclus* employs a Region-Institution-Facility hierarchy in simulations. Additionally,
Resources are traded amonst the simulation agents via Markets. The instructions here will 
describe both how to add specific modules within those types, as well as how to extend this to
other types of loadable modules.

Creating New Models of the Existing Types
-----------------------------------------

For each type of model (i.e. Market, Facility, Institution, or Region), a set of stub 
files are available as skeletons for the new models.  When creating a new model, it is important that all the
functionality defined in these files remains in the final model definition. A 
step by step example of producing a new model from the existing stubs can be 
found in the :doc:`toaster`. 

Model Initialization and Creation
---------------------------------

The Cyclus simulation environment has a number of fundamental aspects regarding 
model creation:

  * Models in Cyclus follow a parent-child paradigm, i.e. a model has one parent and
    may have many children. The parent-child relationship can be thought of as 
    ownership. 

  * Models in Cyclus are either Prototypes (templates) or Models (participants)

    * A Model becomes a Prototype (template) after initialization

    * A Model becomes a Model (paticipant) after its *parent is set* via the 
      setParent() method defined in Model.h.

    * All Models start as Prototypes and become Models

A Model can have many possible initilization-related methods; however, every Model
has *at least* a method named init(). In init(), any and all publicly accesible
members must be initialized. Should such a member attempt to be accessed when not
initialized, a segmentation fault will occur. An example from the BuildRegion class
is shown:

.. code-block:: cpp
          
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  void BuildRegion::init() {
    prototypeOrders_ = new PrototypeOrders();
    builders_ = new map<Model*, std::list<Model*>*>();
  }

Note that prototypeOrders and builders are defined in the header file and accessed
via public methods.

In order to maintain clarity and flexibility, initialization methods are as
modularized as possible. The more involved a Model's initialization process, 
the more benefit is gained from modularity. As a concrete example, let us examine
the RegionModel base class's xml initialization process. 

.. code-block:: cpp

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  void RegionModel::init(xmlNodePtr cur) { 
    RegionModel::init(); // init any RegionModel members
    Model::init(cur); // name and model_impl
    RegionModel::initAllowedFacilities(cur); // allowedFacilities
    RegionModel::initSimInteraction(this); // parent and tick listener, model 'born'
    RegionModel::initChildren(cur); // children->setParent
  }

Here, each major step is given its own function. This allows developers who base
their models on RegionModel to customize their own xml init method, as shown 
in the BuildRegion class: 

.. code-block:: cpp

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  void BuildRegion::init(xmlNodePtr cur) {  
    // non xml inits
    BuildRegion::init();
    RegionModel::init(); // we never explicitly call RegionModel::init(cur)
    // xml inits
    Model::init(cur); // name_ and model_impl_
    RegionModel::initAllowedFacilities(cur); // allowedFacilities_
  
    // get path to this model
    xmlNodePtr model_cur = 
      XMLinput->get_xpath_element(cur,"model/BuildRegion");

    // populate orders for each prototype
    xmlNodeSetPtr prototype_nodes = 
      XMLinput->get_xpath_elements(model_cur,"prototyperequirement");
    for (int i=0;i<prototype_nodes->nodeNr;i++){
      populateOrders(prototype_nodes->nodeTab[i]);
    }
    sortOrders();
  
    // parent_ and tick listener, model 'born'
    RegionModel::initSimInteraction(this); 
    // children->setParent, requires init()
    RegionModel::initChildren(cur); 
  
    // populate the list of builders
    populateBuilders();
  };


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

.. toctree::
   :hidden:

   toaster
  
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

References
----------

  #. `C++ dlopen mini HOWTO <http://oss.sgi.com/LDP/HOWTO/C++-dlopen/index.html>`_
  #. `Static, Shared Dynamic and Loadable Linux Libraries <http://www.yolinux.com/TUTORIALS/LibraryArchives-StaticAndDynamic.html>`_

