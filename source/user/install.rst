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
specific archetypes (called :doc:`Cycamore <index>`).  

1. Install |Cyclus| and Cycamore
---------------------------------

The following methods of installation are listed in order of increasing
sophistication. Choose the option that best fits your needs, if you feel like
none correspond to your needs please feel free to contact us using the `Cyclus
User mailing list <https://groups.google.com/forum/#!forum/cyclus-users>`_, we
will try our best to find the best solution corresponding to your needs.

* :doc:`Cyclist and the Cloud <tutorial/install_launch_cyclist>`: Recommanded
  for users who want a graphical user interface to build or analyze simulations
  or do not want to run simulations directly on their machine. *Require* few
  tehcnical skills* (After installation, skip to Step 4 "Try a Tutorial").

* :doc:`Binary installation on Linux (via Debian or Conda) <install_binary>`:
  Recommanded for users who want to run simulations directly on their machine
  (without internet). *Requires familiarity with Linux.*

* :doc:`Virtualbox <virtualbox>`: Recommanded for Windows users. *Requires
  familiarity with Linux.*

* :doc:`Install Stable From Source (via Tarball) <install_tarball>`:
  Recommanded for users who want to modify existing archetypes (aka developers).
  *Requires programation/compilation skills.*

* :doc:`Install Develop from Source <../kernel/build_from_source>`: (via
  Repository) For developers or users who require the bleeding edge version of
  |Cyclus|. *Requires programation/compilation skills.*

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

4. Try a Tutorial!
------------------
To become familiar with the capabilities of |Cyclus|, read the :doc:`User's Guide<index>` and possibly the :doc:`Archetype Developer's Guide <../arche/index>`, or  work your way through the tutorials.

* :doc:`Cyclus User Tutorial <tutorial/index>`
* :doc:`Archetype Developer Tutorial  <../arche/tutorial/index>`
