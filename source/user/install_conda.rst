Installing Conda for cyclus
====================

We are not supporting conda software, for more detailled information about
conda and  basic installation instructions for Conda please visit `here
<http://docs.continuum.io/anaconda/install.html>`_. 

If do not have conda already installed on your system, please follow these steps
to install conda.

1. Download and Install Miniconda

* Go to the `miniconda downloads page <http://conda.pydata.org/miniconda.html>`_
      and get the version approriate to your system.
    * Install this to the ``~/miniconda`` directory.  For example, you would
      use a command similar the following:

      .. code-block:: bash

          $ bash Miniconda-Latest-Linux-x86_64.sh -b -p ~/miniconda

    * Finally, add the ``~/miniconda/bin`` directory to your ``PATH`` either
      in your current environment or in your ``.bashrc`` or both.


2. Configure conda to look for |cyclus|

    * Download this :download:`condarc` file and save it as ``~/.condarc``.  If
      you'd prefer to do this from the command line, type:

      .. code-block:: bash 

          $ curl -L http://fuelcycle.org/_downloads/condarc >> ~/.condarc
