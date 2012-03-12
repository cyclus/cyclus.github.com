
.. summary Some developers notes on implementing new dynamically loadable models

Developing Models For Cyclus
============================

Introduction
------------

The current code in `branches/paul-branch` has support for Markets, Facilities
and Regions and loadable modules.  The instructions here will describe both how
to add specific modules within those types, as well as how to extend this to
other types of loadable modules.

Creating New Models of the Existing Types
-----------------------------------------

For each type of model, a set of stub files are available as skeletons for the
new models.  When creating a new model, it is important that all the
functionality defined in these files remains in the final model definition.

To create a new model, e.g. a new MarketModel of type NewMarket:

  * copy StubMarket.h and StubMarket.cpp to a new location, e.g. NewMarket.h &
    NewMarket.cpp, respectively

  * change the internal references to StubMarket to NewMarket

  * add a new `add_library` line to the CMakeLists.txt file in that directory

  * add the XML input grammar for that model to the appropriate place in the
    `/src/cyclus.rng` XML schema

All models must provide the following:

  * a method named 'init' to initialize an instance of the model from an XML
    node pointer (xmlNodePtr)

     * this method must call the parent class method of the same name (e.g.
       MarketModel::init(cur))

     * this method should only initialize variables that are NOT members of the
       parent class

  * a method named 'copy' to initialize an instance of the model from another
    instance of the same model

     * this method must call the parent class method of the same name (e.g.
       MarketModel::copy(src))

     * this method should only initialize variables that are NOT members of the
       parent class   

  * a method named 'print' to print a description of the model

     * this method should call the parent class method of the same name (e.g.
       MarketModel::print())

     * this method should only print information that is NOT part of the parent
       class(es)

     * this method assumes that a dangling output line (no std::endl) is left
       from the parent class output

  * two global functions `construct` and `destroy` that are used to instantiate
    objects of this model type.  They are defined, for example, as follows::

      extern "C" Model* construct() {
          return new NewMarket();
      }

      extern "C" void destruct(Model* p) {
          delete p;
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
----------

  #. `C++ dlopen mini HOWTO <http://oss.sgi.com/LDP/HOWTO/C++-dlopen/index.html>`_
  #. `Static, Shared Dynamic and Loadable Linux Libraries <http://www.yolinux.com/TUTORIALS/LibraryArchives-StaticAndDynamic.html>`_

