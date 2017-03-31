Getting Started with |Cyclus|
==============================

To model fuel cycles, you will need to install two things: first the main
codebase (called :doc:`Cyclus <../basics/index>`), and then a set of fuel-cycle
specific archetypes (called :doc:`Cycamore <cycamoreagents>`).

1. Install |Cyclus| and Cycamore
---------------------------------

The following methods of installation are listed in order of increasing
sophistication, choose the option that best fits your needs. If you feel like
none correspond to your needs please feel free to contact us using the `Cyclus
User mailing list <https://groups.google.com/forum/#!forum/cyclus-users>`_, we
will identify the best approach for you.

* :doc:`Cyclist and the Cloud <tutorial/install_launch_cyclist>`:

  - *Requires few computational skills*
  - **Recommended** for:

    - users wanting **a graphical interface** to build or analyze simulations
    - users wanting to **run simulations in the cloud**
    - **quick introduction** to the |Cyclus| capabilities

* :doc:`Binary installation on Linux (via Debian package or Conda) <install_binary>`:

  - *Requires familiarity with Linux*
  - **Recommended** for users wanting to **run simulations locally**  (without internet)

* :doc:`Virtualbox <virtualbox>`:

  - *Requires familiarity with Linux*
  - **Required for Windows users**


* :doc:`Install Stable From Source (via Tarball) <install_from_tarball>`:

  - *Requires programming skills/familiarity with compiling code*
  - **Recommended** for users wanting to **modify existing archetypes** or **write new archetypes** (aka developers)

* :doc:`Install Develop from Source (via Repository) <install_from_git>`:

  - *Requires programming skills/familiarity with compiling code, basic understanding of Git/GitHub*
  - **Recommended** for developers or users who **require the bleeding edge version** of |Cyclus|
  - **Required** for developers who wish to **contribute to kernel development** of |Cyclus|


.. toctree::
    :maxdepth: 1

    install_binary
    install_custom
    install_from_git
    install_from_tarball
    virtualbox


2. Run Cyclus with a Sample XML File
-------------------------------------

(Cyclist users skip this step)

Try running |Cyclus| for yourself. The result will be a :doc:`database <dbdoc>` named cyclus.sqlite.  Use the drop down menu to load the sqlite file into Cyclist for data visualization, or use your favorite sqlite browser to peruse.

.. code-block:: bash

   $ cyclus ~/path/to/cycamore/input/recycle.xml

