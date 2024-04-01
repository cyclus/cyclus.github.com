#################################
Installing |Cyclus| with Binaries
#################################

|Cyclus| supports two binary installation options:

.. include:: CYCAMORE_DEPS.rst
   :start-after: .. website_include_binary_start
   :end-before: .. website_include_binary_end

.. include:: CYCAMORE_DEPS.rst
   :start-after: .. website_include_conda_start
   :end-before: .. website_include_conda_end


#. Once you have conda installed, installing |Cyclus| and Cycamore is
   straightforward. If you are having issues with certificate verification
   you may install using the second set of commands to fix these issues. 

   .. code-block:: bash

      $ conda install -c conda-forge cycamore

   .. code-block:: bash

      $ conda config --set ssl_verify false
      $ conda install -c conda-forge cycamore

#.  .. include:: unit_test.rst

.. include:: CYCAMORE_DEPS.rst
   :start-after: .. website_include_deb_start
   :end-before: .. website_include_deb_end

#. Download the latest Cycamore Debian installation package `here
   <https://github.com/cyclus/cycamore/releases/latest>`_. You can
   download previous/different version `here <https://github.com/cyclus/cycamore/releases>`_.

#. Install the package by running:

   .. code-block:: bash

      $ sudo dpkg -i cycamore-x.x.x-Linux.deb

#. .. include::  unit_test.rst

Happy simulating!

.. _Anaconda: https://www.anaconda.com/download
.. _miniconda: http://conda.pydata.org/miniconda.html
.. _`dependency installation documentation`: DEPENDENCIES.html
