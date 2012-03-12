
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

Other notes on introducing new Model types:

  * You will probably need to extend the input parsing for this new Model type.
    Since the primary input for *Cyclus* uses XML, you will certainly need to
    add code to recognize and process primitives for this Model type.  While
    you could, in theory, add a completely new input paradigm for Models of
    this type, you might need to extend the *Cyclus* grammar to include support
    for your Models.

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
   tutorial
  
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

