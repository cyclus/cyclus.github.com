Installing |Cyclus| with Conda
==============================
Conda is a cross platform, user space package manager aimed at simplifying the 
installation of open source software.  The |cyclus| project uses conda to distribute 
pre-built cyclus and cycamore binaries.

Cyclus support two kind of binary installation:
.. contents::

Conda Install
-------------

1a. if you don't have conda you can find `here <install_conda.rst>`_ basic
instruction to install it and prepare it for cyclus, if you choise to do so
please directly jump to step 2.

1b. You have conda already installed on your system, make sure that the
|Cyclus| binstar organization is part of your channels.  Please edit the
``channels`` section of your :file:`~/.condarc` to include the URL
``https://conda.binstar.org/cyclus``.  For example, 

.. code-block:: yaml

	channels:
	  - https://conda.binstar.org/cyclus 
	  - defaults

2. Install |Cyclus| and Cycamore

    * Now that conda is installed and ready, installing |Cyclus| is as simple as:

      .. code-block:: bash 
    
          $ conda install cycamore --yes

      Note that installing cycamore will also install cyclus since cyclus is one 
      of cycamore's dependencies.

3. To ensure to good installation of Cyclus and Cycamore, you can run the cyclus
   and cycamore unit test:

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

And that is it! 


Happy simulating!
