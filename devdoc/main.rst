
.. summary Documentation for Cyclus Developers

Cyclus Developer Guide
======================

Documentation to assist with the development of *Cyclus* will be maintained
in a variety of forms.  If you haven't already, check out
:doc:`../basics/main`

The *Cyclus* project repository is located at
http://github.com/cyclus/core.

Although you do not have to register with github to
download and edit the code, if you desire your work to be integrated into the
cyclus mainline of development *you must fork the cyclus core repository into
your own github account and submit 'Pull Requests'*.

Getting Started
---------------

First things first - read :doc:`../basics/get_and_build`.  After
successfully acquiring and building *Cyclus*, you can begin developing:

.. toctree::
   :maxdepth: 1
  
   cyclus_env
   flow_and_structure
   code_tour
   style_guide
   materials_and_isotopes
   make-models/main
   logger
   output_dbase

Doxygen Code Documentation
--------------------------

The definitive documentation of any software is the source code itself.
*Cyclus* will relies on Doxygen for automation of rich documentation from
appropriately formatted comments in the source code. Current Doxygen
documentation can be found at http://cnergdata.engr.wisc.edu/cyclus/develop/docs/ .
This page will be updated weekly during active development.

Documentation is a make target in the cmake build system. Documentation
will automatically be built when you `make all`. You can build only the
documentation by running `make cyclusdoc` instead of `make all` or `make`.

Diversions
----------

Relevant xkcd comics:

  * `Standards <http://xkcd.com/927/>`_
  * `The General Solution <http://xkcd.com/974/>`_

