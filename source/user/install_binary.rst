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

.. include:: unit_test.rst

.. include:: CYCAMORE_DEPS.rst
   :start-after: .. website_include_deb_start
   :end-before: .. website_include_deb_end

At this point |Cyclus| should be successfully installed on your system and you are ready to install Cycamore.

#. Download the latest Cycamore Debian installation package `here
   <https://github.com/cyclus/cycamore/releases/latest>`_. Previous/different
   versions are `also available <https://github.com/cyclus/cycamore/releases>`_.

#. Install the package by running:

   .. code-block:: bash

      $ sudo dpkg -i cycamore-x.x.x-Linux.deb

#. .. include::  unit_test.rst

Happy simulating!

.. _Anaconda: https://www.anaconda.com/download
.. _miniconda: http://conda.pydata.org/miniconda.html
.. _`dependency installation documentation`: DEPENDENCIES.html
