Installing |Cyclus| with Conda
----------------------------------
Conda is a package manager aimed at simplifying the installation of open source
software. Basic installation instructions for Conda can be found 
`here <http://docs.continuum.io/anaconda/install.html>`_. 
Once Conda has been successfully installed, it can be used to install other
packages. Conda packages can be easily installed by using the 
``conda install <PKG>`` command from command line.

To install |Cyclus| (which is not currently in a default conda package 
location), an extra step is needed. A .condarc file should be created in your 
home directory which contains::

	channels:
	  - https://conda.binstar.org/cyclus 
	  - defaults

This change connects your local conda installation to the |Cyclus| 
`Binstar Account <http://binstar.org/cyclus>`_. 
If you have no .condarc, you can download a version of the 
`above file <https://raw.githubusercontent.com/cyclus/ciclus/conda/condarc>`_.  
Once this change has been made 
cyclus can be easily installed with the ``conda install cycamore`` command.
Since |Cyclus| is a dependency of Cycamore, |Cyclus| will also be installed.


