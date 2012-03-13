
.. summary Some developers notes on implementing new dynamically loadable models

Developing Models For Cyclus
============================

Introduction
------------

<<<<<<< HEAD
The Cyclus core has support for Markets, Facilities, Institutions, and Regions.  
The instructions here will describe both how to add specific modules of those types, 
as well as how to extend Cyclus to other types of loadable modules.
=======
*Cyclus* employs a Region-Institution-Facility hierarchy in simulations. Additionally,
Resources are traded amonst the simulation agents via Markets. The instructions here will 
describe both how to add specific modules within those types, as well as how to extend this to
other types of loadable modules.
>>>>>>> 158f38a38f5b90bcecb60d24e119ac64cfcff7e8

Creating New Models of the Existing Types
-----------------------------------------

For each type of model (i.e. Market, Facility, Institution, or Region), a set of stub 
files are available as skeletons for the new models.  When creating a new model, it is important that all the
functionality defined in these files remains in the final model definition. A 
step by step example of producing a new model from the existing stubs can be 
found in the :doc:`toaster`. 

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

