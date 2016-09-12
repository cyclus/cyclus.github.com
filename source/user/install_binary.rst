#################################
Installing |Cyclus| with Binaries
#################################

|Cyclus| supports two binary installations:

#. `Conda`_
#. `Debian package`_


Conda is a cross-platform, user-space package manager aimed at simplifying the
installation of open source software. The |Cyclus| project uses Conda to
distribute pre-built |Cyclus| and Cycamore binaries.

The Debian package simplifies the installation of open
source software. It contains all of the files required to use a specific
software, as well as variety of information about it: maintainer, description,
version, dependencies (other software or libraries required to use it).  The
|Cyclus| team provides pre-built |Cyclus| and Cycamore Debian packages to
simplify installation for the user. These packages are available for LTS Ubuntu
version 14.04 and 16.04 (though they may also work on other Linux systems).


*********************
Conda
*********************

1.  a.  If you don't have Conda, follow the :doc:`basic Conda installation
        instructions <install_conda>` to prepare it for cyclus, then skip to step 2.

    b.  If you already have conda installed, installing |Cyclus| is even easier.
        You simply need to make sure that conda-forge is part of your channels.
        Please edit the ``channels`` section of your :file:`~/.condarc` to include
        the ``conda-forge`` channel.  For example,

        .. code-block:: yaml

            channels:
              - conda-forge
              - defaults
      
2.  Once this is done, install |Cyclus| with the following comand.

    .. code-block:: bash

       $ conda install --yes cyclus cycamore

       
#.  .. include:: unit_test.rst



*********************
Debian Package
*********************

This installation procedure assumes that you are using Ubuntu (LTS) 14.04 or
16.04. This method has only been tested on those Ubuntu versions. This
installation procedure also assumes that you have root access to you computer.

#. Install |Cyclus| dependencies:
  .. code-block:: bash 

        $ sudo apt-get install libtcmalloc-minimal4 libboost-filesystem-dev libboost-program-options-dev libboost-serialization-dev libhdf5-dev libxml++2.6-dev coinor-libcbc-dev
  
  WARNING: This dependency list is ONLY correct for the debian binary
  installation,
  additional dependencies are required for to install from source. If you
  need/want more information about dependency installation please read
  `dependency installation documentation <put_a_link_there>`_.

#.  Download the |Cyclus| Debian installation package corresponding to your
    Ubuntu version (`14.04
    <http://dory.fuelcycle.org:4848/cyclus_1.4.0_14dbaed_ubuntu.14.04.deb>`_ or
    `16.04
    <http://dory.fuelcycle.org:4848/cyclus_1.4.0_14dbaed_ubuntu.16.04.deb>`_).

#.  Install the package by running:

     .. code-block:: bash 

        $ sudo dpkg -i CYCLUS_DEB_PACKAGE_MANE.deb

    where the actual filename is inserted in place of 'CYCLUS_DEB_PACKAGE_MANE.deb'.

#.  Download the Cycamore Debian installation  package corresponding to your
    Ubuntu version (`14.04 <>` or `16.04 <>`).

#.  Install the package by running:

    .. code-block:: bash 

       $ sudo dpkg -i CYCAMORE_DEB_PACKAGE_MANE.deb
  
    where the actual filename is inserted in place of 'CYCAMORE_DEB_PACKAGE_MANE.deb'.

#.  .. include::  unit_test.rst
  
  
  
  
  
Happy simulating!
