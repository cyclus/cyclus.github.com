================================================
Installing |Cyclus| Using the GitHub Repository
================================================
Installing Cyclus is a two step process. First get and compile the
|Cyclus| core and then the Cyclus Additional Modules (Cycamore), which provides
nuclear fuel cycle facilities such the reactor, fuel fabrication facility, storage, etc.

.. contents::

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
.. include:: ../extern/CYCLUS_INSTALL.rst
   :start-line: 38
   :end-line: 138





----------------
Install Cycamore
----------------

Get the Source Code from the Git Repo
=====================================

.. code-block:: bash

  git clone https://github.com/cyclus/cycamore .
  git fetch
  git checkout master

.. include:: install_cycamore_from_source.rst


------------------
Run the Unit Tests
------------------

.. include:: unit_test.rst
