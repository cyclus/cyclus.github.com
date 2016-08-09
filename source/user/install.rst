Getting Started with |Cyclus| 
==============================

|Cyclus| can be run on Linux or Mac OSX. It cannot be run on Windows except by using Linux in a Virtualbox.

To model fuel cycles, you will need to install two things: first the main
codebase (called :doc:`Cyclus <../basics/index>`), and then a set of fuel-cycle
specific archetypes (called :doc:`Cycamore <index>`).  


1. Install |Cyclus| and Cycamore
---------------------------------

The following methods of installation are listed in order of increasing
sophistication. Choose the option that best fits your needs, if you feel like
none correspond to your needs please feel free to contact us using the `Cyclus
User mailing list <https://groups.google.com/forum/#!forum/cyclus-users>`_, we
will try our best to find the best solution corresponding to your needs.

* :doc:`Cyclist and the Cloud <tutorial/install_launch_cyclist>`: (After
  installation, skip to Step 4 "`Try a Tutorial!`_" ) 

  - *Require few technical skills*, 
  
  - Recommended for: 
 
    - users wanting a graphical interface to build or analyze simulations, 
      
    - users not wanting to run simulations directly on their machine,
      
    - quick the |Cyclus| capabilities discovery. 



* :doc:`Binary installation on Linux (via Debian package or Conda) <install_binary>`:

  - *Requires familiarity with Linux.*
  
  - Recommended for users wanting to run simulations locally (without internet). 



* :doc:`Virtualbox <virtualbox>`:
  
  - *Requires familiarity with Linux.*
  
  - Recommended for Windows users.



* :doc:`Install Stable From Source (via Tarball) <install_tarball>`:
  
  - *Requires programation/compilation skills.*
  
  - Recommended for users wants to modify existing archetypes (aka developers).



* :doc:`Install Develop from Source <install_from_git>`: (via
  Repository) 
  
  - *Requires programation/compilation skills, basic understanding of Git/GitHub.*
  
  - For developers or users who require the bleeding edge version of |Cyclus|. 




2. Run Unit Tests
-----------------
(Cyclist users skip this step). Unit tests will verify that the installation was successful. They should report that all tests have passed (or been disabled).

.. code-block:: bash

   $ cyclus_unit_tests
   $ cycamore_unit_tests

   
3. Run Cyclus with a Sample XML File
------------------------------------
(Cyclist users skip this step). Try running |Cyclus| for yourself. The result will be a :doc:`database <dbdoc>` named cyclus.sqlite.  Load the sqlite file into Cyclist to visualize data, or use your favorite sqlite browser to peruse.

.. code-block:: bash

   $ cyclus ~/path/to/cycamore/input/recycle.xml

4. _`Try a Tutorial!`
------------------
To become familiar with the capabilities of |Cyclus|, read the :doc:`User's Guide<index>` and possibly the :doc:`Archetype Developer's Guide <../arche/index>`, or  work your way through the tutorials.

* :doc:`Cyclus User Tutorial <tutorial/index>`
* :doc:`Archetype Developer Tutorial  <../arche/tutorial/index>`
