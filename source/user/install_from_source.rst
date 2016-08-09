*********************
Installing |Cyclus| from the source
*********************



1. a. If you don't have conda you can find :doc:`here <install_conda>` basic
   instruction to install it and prepare it for cyclus, if you choice to do so
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

3. To ensure to proper installation of |Cyclus| and Cycamore, you can run the
   |Cyclus| and cycamore unit test:

    .. code-block:: bash 
  
        $ cyclus_unit_test

    The answer in your terminal should look like (if not you might have an issue):


    .. code-block:: bash 
  
        $ cycamore_unit_test

    The answer in your terminal should look like (if not you might have an issue):

4. Furthermore, you may also optionally install Cyclist, the graphical user
   interface tool for |Cyclus| databases. This can be done with the following:
      
    .. code-block:: bash 
  
        $ conda install cyclist --yes

5. You can now jump to the `tutorial section` to learn how to run a |Cyclus|
   simulation.

Happy simulating!
