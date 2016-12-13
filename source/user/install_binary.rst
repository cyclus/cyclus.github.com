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
   straightforward.

   .. code-block:: bash

      $ conda install -c conda-forge cycamore

#.  .. include:: unit_test.rst

.. include:: CYCAMORE_DEPS.rst
   :start-after: .. website_include_deb_start
   :end-before: .. website_include_deb_end

#. `Download <http://dory.fuelcycle.org:4848/ubuntu/16.04/cycamore_1.4.0.deb>`_
   the Cycamore Debian installation package (only ubuntu is actually supported).

#. Install the package by running:

   .. code-block:: bash 

      $ sudo dpkg -i cycamore_1.4.0.deb
  
#. .. include::  unit_test.rst
  
Happy simulating!

.. _Anaconda: https://www.continuum.io/downloads
.. _miniconda: http://conda.pydata.org/miniconda.html
.. _`dependency installation documentation`: DEPENDENCIES.html
