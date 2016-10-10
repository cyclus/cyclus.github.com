#################################
Installing |Cyclus| with Binaries
#################################

|Cyclus| supports two binary installations:

#. `Conda`_ (Linux and Mac OSX)
#. `Debian package manager`_ (Linux only)


**Conda** is a cross-platform, user-space package manager aimed at simplifying the
installation of open source software. The |Cyclus| project uses Conda to
distribute pre-built |Cyclus| and Cycamore binaries.

The **Debian package manager** simplifies the installation of open
source software. It contains all of the files required to use a specific
software, as well as variety of information about it: maintainer, description,
version, dependencies (other software or libraries required to use it).  The
|Cyclus| team provides pre-built |Cyclus| and Cycamore Debian packages to
simplify installation for the user. These packages are available for LTS Ubuntu
version 14.04 and 16.04 (though they may also work on other Linux systems).


*********************
Conda
*********************

1. If you don't have Conda, start by installing the Python 3.x version of
   Anaconda_ (or miniconda_ for a more lightweight choice) to prepare it for
   |Cyclus|.

2. Once you have conda installed, installing |Cyclus| and Cycamore is
   straightforward.

   .. code-block:: bash

      $ conda install -c conda-forge cycamore

#.  .. include:: unit_test.rst



**********************
Debian Package Manager
**********************

This installation procedure assumes that you are using Ubuntu (LTS) 14.04 or
16.04. This method has only been tested on those Ubuntu versions. This
installation procedure also assumes that you have root access to you computer.

#. Install |Cyclus| dependencies:

   .. code-block:: bash 

     $ sudo apt-get install libtcmalloc-minimal4 libboost-filesystem-dev libboost-program-options-dev libboost-serialization-dev libhdf5-dev libxml++2.6-dev coinor-libcbc-dev
  
   WARNING: This dependency list is ONLY correct for the debian binary
   installation, additional dependencies are required for to install from source.
   If you need/want more information about dependency installation please read
   `dependency installation documentation <put_a_link_there>`_.

#. Download the |Cyclus| Debian installation package corresponding to your
   Ubuntu version (`14.04
   <http://dory.fuelcycle.org:4848/ubuntu.14.04/cyclus_1.4.0.deb>`_ or
   `16.04
   <http://dory.fuelcycle.org:4848/ubuntu.16.04/cyclus_1.4.0.deb>`_).

#. Install the package by running:

   .. code-block:: bash 

     $ sudo dpkg -i cyclus_1.4.0.deb

#. Download the Cycamore Debian installation package corresponding to your
   Ubuntu version (`14.04
   <http://dory.fuelcycle.org:4848/ubunutu.14.04/cycamore_1.4.0.deb>`_ or
   `16.04
   <http://dory.fuelcycle.org:4848/ubuntu.16.04/cycamore_1.4.0.deb>`_).

#. Install the package by running:

   .. code-block:: bash 

      $ sudo dpkg -i cycamore_1.4.0.deb
  
#. .. include::  unit_test.rst
  


Happy simulating!

.. _Anaconda: https://www.continuum.io/downloads
.. _miniconda: http://conda.pydata.org/miniconda.html
