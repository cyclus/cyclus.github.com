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

#. Download the Cycamore Debian installation package corresponding to your Ubuntu version (`14.04
   <http://dory.fuelcycle.org:4848/ubuntu/14.04/cycamore_latest.deb>`_ or
   `16.04
   <http://dory.fuelcycle.org:4848/ubuntu/16.04/cycamore_latest.deb>`_). You can
   download previous/different version `here <http://dory.fuelcycle.org:4848/ubuntu/>`_.

#. Install the package by running:

   .. code-block:: bash 

      $ sudo dpkg -i cycamore_latest.deb
  
#. .. include::  unit_test.rst
  
Happy simulating!

.. _Anaconda: https://www.continuum.io/downloads
.. _miniconda: http://conda.pydata.org/miniconda.html
.. _`dependency installation documentation`: DEPENDENCIES.html
