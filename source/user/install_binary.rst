###########
Installing |Cyclus| with binaries
###########

Conda is a cross platform, user space package manager aimed at simplifying the 
installation of open source software.  The |cyclus| project uses conda to distribute 
pre-built cyclus and cycamore binaries.

Cyclus support two binary installations:

#. `Conda`_
#. `Debian package`_

*********************
Conda
*********************

1. a. if you don't have conda you can find :doc:`here <install_conda>` basic
   instruction to install it and prepare it for cyclus, if you choise to do so
   please directly jump to step 2.

   b. You have conda already installed on your system, make sure that the
   |Cyclus| binstar organization is part of your channels.  Please edit the
   ``channels`` section of your :file:`~/.condarc` to include the URL
   ``https://conda.binstar.org/cyclus``.  For example, 

    .. code-block:: yaml

      channels:
        - https://conda.binstar.org/cyclus 
        - defaults

2. Install |Cyclus| and Cycamore: now that conda is installed and ready,
   installing |Cyclus| is as simple as:
  
      .. code-block:: bash 
    
          $ conda install cycamore --yes

      Note that installing cycamore will also install cyclus since cyclus is one 
      of cycamore's dependencies.

3. To ensure to proper installation of Cyclus and Cycamore, you can run the
   cyclus and cycamore unit test:

      .. code-block:: bash 
    
          $ cyclus_unit_test

  The answer in your terminal should look like (if not you might have an issue):


      .. code-block:: bash 
    
          $ cycamore_unit_test

  The answer in your terminal should look like (if not you might have an issue):

4. Furthermore, you may also optionally install Cyclist, the graphical user
   interface tool for cyclus databases. This can be done with the following:
      
      .. code-block:: bash 
    
          $ conda install cyclist --yes
5. You can now jump to the `tutorial section` to learn how to run a cyclus
   simulation


*********************
Debian package
*********************

Those installation proccedure assume that you are using Ubuntu (LTS) 14.04 or
16.04. This method as only been tested on those ubuntu version.

1. Install cyclus dependencies:
  .. code-block:: bash 

        $ sudo apt-get install libtcmalloc-minimal4 libboost-filesystem-dev libboost-program-options-dev libboost-serialization-dev libhdf5-dev libxml++2.6-dev coinor-libcbc-dev
  
  WARNING: This dependency list is ONLY correct for the deb binary installation,
  MORE depednecies are require for a installation from the source. If you
  need/want more information about dependencies installation please read you
  `dependencies installation documentations <put_a_link_there>`_.

2. Dowmload the |Cyclus| debian installation  package corresponding to your
   ubuntu version `14.04
   <http://dory.fuelcycle.org:4848/cyclus_1.4.0_14dbaed_ubuntu.14.04.deb>`_ or
   `16.04
   <http://dory.fuelcycle.org:4848/cyclus_1.4.0_14dbaed_ubuntu.16.04.deb>`_.

3. Install the package running:

  .. code-block:: bash 

        $ sudo dpkg -i CYCLUS_DEB_PACKAGE_MANE.deb

  Please replace the 'CYCLUS_DEB_PACKAGE_MANE.deb' by its proper name.

4. Check the |Cyclus| installation by running the |Cyclus| unit test:
  .. code-block:: bash 
  
        $ cyclus_unit_test

  The answer in your terminal should look like (if not you might have an issue):


5. Dowmload the Cycamore debian installation  package corresponding to your
   ubuntu version `14.04 <>` or `16.04 <>`.

6. Install the package running:

  .. code-block:: bash 

        $ sudo dpkg -i CYCAMORE_DEB_PACKAGE_MANE.deb
  
  Please replace the 'CYCAMORE_DEB_PACKAGE_MANE.deb' by its proper name.

7. Check the Cycamore installation by running the Cycamore unit test:
  .. code-block:: bash 
  
        $ cycamore_unit_test

  The answer in your terminal should look like (if not you might have an issue):

  
8. You can now jump to the `tutorial section` to learn how to run a cyclus
   simulation
  
  
  
  
  
  
Happy simulating!
