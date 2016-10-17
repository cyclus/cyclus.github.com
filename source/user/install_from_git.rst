================================================
Installing |Cyclus| Using the GitHub Repository
================================================
Installing Cyclus is a two step process. First get and compile the
|Cyclus| core and then the Cyclus Additional Modules (Cycamore), which provides
nuclear fuel cycle facilities such the reactor, fuel fabrication facility, storage, etc.


.. contents::
   :local:


--------------
Dependencies
--------------

.. include:: DEPENDENCIES.rst
   :start-after: .. website_include_start
   :end-before: .. website_include_end

Instruction to install those dependencies on the major platform can be found
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
