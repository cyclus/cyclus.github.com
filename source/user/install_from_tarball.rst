===================================
Installing |Cyclus| using a Tarball
===================================

Installing Cyclus is a two step process. First one needs to get and compile the
|Cyclus| core, then the Cyclus Additional Modules (*Cycamore*), which provide the nuclear fuel cycle facilities such as the reactor, fuel fabrication facility, storage, etc.


.. contents::
   :local:


--------------
Dependencies
--------------

.. include:: DEPENDENCIES.rst
   :start-after: .. website_include_start
   :end-before: .. website_include_end

Instructions to install dependencies on the major platforms can be found
:doc:`here <DEPENDENCIES>`.



--------------
Install Cyclus
--------------

Get the Tarball
===============

Download the most recent stable version of Cyclus source (either .zip or .gz):

- `cyclus-1.5.3.zip  <https://github.com/cyclus/cyclus/archive/1.5.3.zip>`_
- `cyclus-1.5.3.zip  <https://github.com/cyclus/cyclus/archive/1.5.3.zip>`_

(`Previous versions of Cyclus <https://github.com/cyclus/cyclus/releases>`_ )

Compiling Cyclus
================
.. include:: CYCLUS_INSTALL.rst
   :start-after: .. website_include_start
   :end-before: .. website_include_end

If you were successful then Cyclus has been installed and you can skip down to Installing Cycamore!

If you received an error message concerning the Cyclus Core Version, please use:

.. code-block:: bash

   python install.py --core-version=x.y.z

Replace x.y.z with the Cyclus version number you are installing.


Alternative instructions are also available for doing a :doc:`Custom Installation <install_custom>`.


----------------
Install Cycamore
----------------

Get the Tarball
================

Download the most recent stable version of Cycamore source (either .zip or .gz):

- `cycamore-1.5.3.zip  <https://github.com/cyclus/cycamore/archive/1.5.3.zip>`_
- `cycamore-1.5.3.zip  <https://github.com/cyclus/cycamore/archive/1.5.3.tar.gz>`_

(`Previous versions of Cycamore <https://github.com/cyclus/cycamore/releases>`_ )


Compiling Cycamore
==================

.. include:: CYCAMORE_INSTALL.rst
   :start-after: .. website_include_start
   :end-before: .. website_include_end



***********************
Run the Unit Tests
***********************

.. include:: unit_test.rst

.. _`for installing those dependencies for the major supported systems`: DEPENDENCIES.html
