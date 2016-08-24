================================================
Installing |Cyclus| using the GitHub repository
================================================
Installing Cyclus is a two steps process. First one need to get and compile the
|Cyclus| core and then the Cyclus Additional Modules, Cycamore, which provide the
different facilities such the reactor, the fuel fabrication facility, the
storage...

.. contents::

--------------
Install Cyclus
--------------

Get the source from the Git repo
===============================
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

Get the source from the Git repo
================================

.. code-block:: bash

  git clone https://github.com/cyclus/cycamore .
  git fetch
  git checkout master

.. include:: install_cycamore_from_source.rst


-----------------
Run the unit test
-----------------

.. include:: unit_test.rst
