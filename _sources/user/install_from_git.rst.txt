================================================
Installing |Cyclus| Using the GitHub Repository
================================================
Installing Cyclus is a two step process. First get and compile the
|Cyclus| core, then get and compile the Cyclus Additional Modules (Cycamore),
which provides nuclear fuel cycle facilities such the reactor, fuel fabrication
facility, storage, etc.


.. contents::
   :local:


--------------
Dependencies
--------------

.. include:: DEPENDENCIES.rst
   :start-after: .. website_include_start
   :end-before: .. website_include_end

Instructions on how to install those dependencies on the major platforms can be found
:doc:`here <DEPENDENCIES>`.



--------------
Install Cyclus
--------------

Get the Source Code from the Git Repo
=====================================

.. code-block:: bash

  git clone https://github.com/cyclus/cyclus .
  git fetch
  git checkout master

Compiling Cyclus
================

.. include:: CYCLUS_INSTALL.rst
   :start-after: .. website_include_start
   :end-before: .. website_include_end

If you were successful then Cyclus has been installed and you can skip down to Installing Cycamore!

Alternative instructions are also available for doing a :doc:`Custom Installation <install_custom>`.


----------------
Install Cycamore
----------------

Get the Source Code from the Git Repo
=====================================

.. code-block:: bash

  git clone https://github.com/cyclus/cycamore .
  git fetch
  git checkout master


Compiling Cycamore
==================

.. include:: CYCAMORE_INSTALL.rst
   :start-after: .. website_include_start
   :end-before: .. website_include_end



------------------
Run the Unit Tests
------------------

.. include:: unit_test.rst

