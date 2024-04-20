Getting Started with |Cyclus|
==============================

To model fuel cycles, you will need to install two things: first the main
codebase (called :doc:`Cyclus <../basics/index>`), and then a set of fuel-cycle
specific archetypes (called :doc:`Cycamore <cycamoreagents>`).

.. warning::

    In the cyclus ecosystem, only versions whose micro or patch number
    (the third and last number) are zero  are considered **stable**.
    Other releases where the version number is greater than zero are
    bugfix and maintainence releases and are considered **unstable**.
    For example, a release number of ``1.42.0`` is stable, while
    ``1.42.3`` is unstable.


1. Install |Cyclus| and Cycamore
---------------------------------

The following methods of installation are listed in order of increasing
sophistication, choose the option that best fits your needs. If you feel like
none correspond to your needs please feel free to contact us using the `Cyclus
User mailing list <https://groups.google.com/forum/#!forum/cyclus-users>`_, we
will identify the best approach for you.

* :doc:`Binary installation on Linux (via Debian package or Conda) <install_binary>`:

  - *Requires familiarity with Linux*
  - **Recommended** for users wanting to **run simulations locally**  (without internet)

* :doc:`Install Stable From Source (via Tarball) <install_from_tarball>`:

  - *Requires programming skills/familiarity with compiling code*
  - **Recommended** for users wanting to **modify existing archetypes** or **write new archetypes** (aka developers)

* :doc:`Install Main from Source (via Repository) <install_from_git>`:

  - *Requires programming skills/familiarity with compiling code, basic understanding of Git/GitHub*
  - **Recommended** for developers or users who **require the bleeding edge version** of |Cyclus|
  - **Required** for developers who wish to **contribute to kernel development** of |Cyclus|

* :doc:`Install from Docker <install_docker>`:

  - *Requires Docker install on machine and familiarity with Docker*


2. Run Cyclus with a Sample XML File
-------------------------------------

Try running |Cyclus| for yourself. The result will be a :doc:`database <dbdoc>` named cyclus.sqlite.  
Use your favorite sqlite browser to peruse, or explore the data using 
`Cymetric <https://github.com/cyclus/cymetric>`_.

.. code-block:: bash

   $ cyclus ~/path/to/cycamore/input/recycle.xml

