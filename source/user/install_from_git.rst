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

.. include:: CYCLUS_DEPENDENCIES.rst
   :start-line: 19
   :end-line: 34

Instruction to install those dependencies on the major platform can be found
:doc:`here <CYCLUS_DEPENDENCIES>`.



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

.. include:: test_INSTALL.rst
   :start-after: .. include_start
   :end-before: .. include_end



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
   :start-line: 36
   :end-line: 166



------------------
Run the Unit Tests
------------------

.. include:: unit_test.rst
