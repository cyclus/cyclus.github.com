Cyclus Developer Guide
======================

.. note:: The devloper's guide remains a work in progress.

The *Cyclus* project repository is located at
http://github.com/cyclus/cyclus.

Although you do not have to register with github to
download and edit the code, if you desire your work to be integrated into the
cyclus mainline of development *you must fork the cyclus core repository into
your own github account and submit 'Pull Requests'*.

If you haven't already, check out :doc:`../basics/main`

Getting Started
---------------

.. toctree::
   :maxdepth: 1
  
   get_and_build
   dynamic_loading
..   cyclus_env

Core Concepts and Expectations
------------------------------

.. toctree::
   :maxdepth: 1

   sim_init
   resources
   discrete_materials
   decay
..   materials_and_isotopes

Utilities and Components
------------------------

.. toctree::
   :maxdepth: 1

   logger
   output_dbase
   output_usecases

Software Development Aids
--------------------------
.. toctree::
   :maxdepth: 1

   ../basics/roadmap
   contributing_to_cyclus
   testing
   style_guide
..   make-models/main

Doxygen Code Documentation
--------------------------

The definitive documentation of any software is the source code itself.
*Cyclus* will relies on Doxygen for automation of rich documentation from
appropriately formatted comments in the source code. Current Doxygen 
documentation can be found online for both `cyclus 
<http://fuelcycle.org/cyclus/api/>`_ and `cycamore 
<http://fuelcycle.org/cycamore/api/>`_.  These pages will be updated nightly.

Documentation is a make target in the cmake build system. Documentation
will automatically be built when you `make all`. You can build only the
documentation by running `make cyclusdoc` instead of `make all` or `make`.

Diversions
----------

A video history of our development (video created using gource):

  * `March 3, 2010 to July 25, 2012 <http://www.youtube.com/watch?v=-2uQia2e_cg>`_

Relevant xkcd comics:

  * `Standards <http://xkcd.com/927/>`_
  * `The General Solution <http://xkcd.com/974/>`_

