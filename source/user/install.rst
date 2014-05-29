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
	  - cyclus
	  - defaults

This change connects your local conda installation to the |Cyclus| 
`Binstar Account <http://binstar.org/cyclus>`_. Once this change has been made 
cyclus can be easily installed with the ``conda install cycamore`` command.

If run-time errors occur when running |Cyclus|, alter your ``LD_LIBRARY_PATH`` 
(on Linux) or ``DYLD_LIBRARY_PATH`` (on OSX) to point to 
``/path to anaconda dir/lib``
