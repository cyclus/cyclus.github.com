Getting Started with |Cyclus| 
==============================
Conda is a cross platform, user space package manager aimed at simplifying the
installation of open source software.  The |cyclus| project uses conda to distribute
pre-built cyclus and cycamore binaries.

Fresh Install
-------------
If you are new to conda or do not have conda already installed on your system,
please follow these steps to install |cyclus|.
Basic installation instructions for Conda can be found
`here <http://docs.continuum.io/anaconda/install.html>`_.
|Cyclus| can be run on Linux or Mac OSX. It cannot be run on Windows except by using Linux in a Virtualbox.

To model fuel cycles, you will need to install two things: first the main
codebase (called :doc:`Cyclus <../basics/index>`), and then a set of fuel-cycle
specific archetypes (called :doc:`Cycamore <cycamoreagents>`).  

1. Install |Cyclus| and Cycamore
---------------------------------

The following methods of installation are listed in order of increasing
sophistication. Choose the option that best fits your needs, if you feel like
none correspond to your needs please feel free to contact us using the `Cyclus
User mailing list <https://groups.google.com/forum/#!forum/cyclus-users>`_, we
will identify the best approach for you.

* :doc:`Cyclist and the Cloud <tutorial/install_launch_cyclist>`: (After
  installation, skip to Step 4 "`Try a Tutorial!`_" ) 

  - *Requires few computational skills* 
  
  - **Recommended** for: 
 
    - users wanting **a graphical interface** to build or analyze simulations
      
    - users not wanting to **run simulations on the cloud**,
      
    - **quick introduction** to the |Cyclus| capabilities.



* :doc:`Binary installation on Linux (via Debian package or Conda) <install_binary>`:

  - *Requires familiarity with Linux*
  
  - **Recommended** for users wanting to **run locally their simulations**  (without internet)



* :doc:`Virtualbox <virtualbox>`:
  
  - *Requires familiarity with Linux*
  
  - **Recommended for Windows users.**



* :doc:`Install Stable From Source (via Tarball) <install_from_tarball>`:
  
  - *Requires programming skills/familiarity with compiling code* 
  
  - **Recommended** for users wanting to **modify existing archetypes** (aka developers)



* :doc:`Install Develop from Source (via Repository) <install_from_git>`:  
  
  - *Requires programming skills/familiarity with compiling code, basic understanding of Git/GitHub*
  
  - **Recommended** for developers or users who **require the bleeding edge version** of |Cyclus|. 




2. Run Unit Tests
-----------------

(Cyclist users skip this step). 

.. include:: unit_test.rst

3. Run Cyclus with a Sample XML File
------------------------------------

(Cyclist users skip this step). Try running |Cyclus| for yourself. The result will be a :doc:`database <dbdoc>` named cyclus.sqlite.  Load the sqlite file into Cyclist to visualize data, or use your favorite sqlite browser to peruse.

.. code-block:: bash

   $ cyclus ~/path/to/cycamore/input/recycle.xml

4. _`Try a Tutorial!`
---------------------
To become familiar with the capabilities of |Cyclus|, read the :doc:`User's Guide<index>` and possibly the :doc:`Archetype Developer's Guide <../arche/index>`, or  work your way through the tutorials.

* :doc:`Cyclus User Tutorial <tutorial/index>`
* :doc:`Archetype Developer Tutorial  <../arche/tutorial/index>`
