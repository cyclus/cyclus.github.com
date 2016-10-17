===================================
Installing |Cyclus| using a Tarball
===================================

Installing Cyclus is a two steps process. First one need to get and compile the
|Cyclus| core and then the Cyclus Additional Modules (*Cycamore*), which provide the nuclear fuel cycle facilities such as the reactor, fuel fabrication facility, storage, etc.


.. contents::
   :local:


--------------
Dependencies
--------------

.. include:: CYCLUS_DEPENDENCIES.rst
   :start-after: .. website_include_start
   :end-before: .. website_include_end

Instruction to install those dependencies on the major platform can be found
:doc:`here <CYCLUS_DEPENDENCIES>`.



--------------
Install Cyclus
--------------

Get the Tarball
===============

Download the most recent stable version of Cyclus source (either .zip or .gz):
  - `cyclus.1.3.1.zip  <https://github.com/cyclus/cyclus/archive/1.3.1.zip>`_
  - `cyclus.1.3.1.tar.gz  <https://github.com/cyclus/cyclus/archive/1.3.1.tar.gz>`_

(`Previous versions <https://github.com/cyclus/cyclus/releases>`_ of |Cyclus|)

Compiling Cyclus
================
.. include:: CYCLUS_INSTALL.rst
   :start-after: .. website_include_start
   :end-before: .. website_include_end



--------------
Install Cycamore
--------------

Get the Tarball
================

Download the most recent stable version of Cycamore source (either .zip or .gz):
  - `cycamore.1.3.1.zip  <https://github.com/cyclus/cycamore/archive/1.3.1.zip>`_
  - `cycamore.1.3.1.tar.gz  <https://github.com/cyclus/cycamore/archive/1.3.1.tar.gz>`_

(`Previous versions <https://github.com/cyclus/cycamore/releases>`_ of Cycamore)


Compiling Cycamore
==================

.. include:: CYCAMORE_INSTALL.rst
   :start-after: .. website_include_start
   :end-before: .. website_include_end



***********************
Run unit test
***********************

.. include:: unit_test.rst
