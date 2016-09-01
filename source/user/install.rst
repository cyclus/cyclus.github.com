Installing |Cyclus| with Conda
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

1. Download and Install Miniconda

    * Go to the `miniconda downloads page <http://conda.pydata.org/miniconda.html>`_
      and get the version approriate to your system.
    * Install this to the ``~/miniconda`` directory.  For example, you would
      use a command similar the following:

      .. code-block:: bash

          $ bash Miniconda-Latest-Linux-x86_64.sh -b -p ~/miniconda

    * Finally, add the ``~/miniconda/bin`` directory to your ``PATH`` either
      in your current environment or in your ``.bashrc`` or both.

      .. code-block:: bash

          $ export PATH="${HOME}/miniconda/bin:${PATH}"

2. Configure conda to look for |cyclus|

    * Download this :download:`condarc` file and save it as ``~/.condarc``.  If
      you'd prefer to do this from the command line, type:

      .. code-block:: bash

          $ curl -L http://fuelcycle.org/_downloads/condarc >> ~/.condarc

3. Install |Cyclus| and Cycamore

    * Now that conda is installed and ready, installing |Cyclus| is as simple as:

      .. code-block:: bash

          $ conda install --yes cyclus cycamore

And that is it!

Already Have Conda?
-------------------
If you already have conda installed, installing |Cyclus| is even easier.
You simply need to make sure that conda-forge is part of
your channels.  Please edit the ``channels`` section of your :file:`~/.condarc`
to include the ``conda-forge`` channel.  For example,

.. code-block:: yaml

	channels:
      - conda-forge
	  - defaults

Once this is done, install |Cyclus| with the following comand.

.. code-block:: bash

    $ conda install --yes cyclus cycamore

Happy simulating!