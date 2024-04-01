#################################
Installing |Cyclus| with Docker
#################################

|Cyclus| maintains six container images with cyclus pre-installed:

.. list-table:: 
   :header-rows: 1

   * - Base OS
     - Package Manager
     - Image
   * - Ubuntu 20.04
     - ``apt``
     - ``ghcr.io/cyclus/cyclus_20.04_apt/cyclus``
   * - Ubuntu 20.04
     - ``conda``
     - ``ghcr.io/cyclus/cyclus_20.04_conda/cyclus``
   * - Ubuntu 22.04
     - ``apt``
     - ``ghcr.io/cyclus/cyclus_22.04_apt/cyclus``
   * - Ubuntu 22.04
     - ``conda``
     - ``ghcr.io/cyclus/cyclus_22.04_conda/cyclus``
   * - Rocky Linux 8
     - ``dnf``
     - ``ghcr.io/cyclus/cyclus_rocky_8/cyclus``
   * - Rocky Linux 9
     - ``dnf``
     - ``ghcr.io/cyclus/cyclus_rocky_9/cyclus``

These images are updated via GitHub actions and have the following supported tags:
    * ``stable`` - the last stable release
    * ``<version number>`` - version number corresponds to past release
    * ``latest`` - up to date with the ``main`` branch


#. You can download these images using the following command:

   .. code-block:: bash

      $ docker pull ghcr.io/cyclus/cyclus_22.04_apt/cyclus:stable

You can run a container image interactively using:

   .. code-block:: bash

      $ docker run -it ghcr.io/cyclus/cyclus_22.04_apt/cyclus:stable

#. If you wish to run |Cyclus| with |Cycamore| pre-installed the following images are supported:
   * - Base OS
     - Package Manager
     - Image
   * - Ubuntu 20.04
     - ``apt``
     - ``ghcr.io/cyclus/cycamore_20.04_apt/cycamore``
   * - Ubuntu 20.04
     - ``conda``
     - ``ghcr.io/cyclus/cycamore_20.04_conda/cycamore``
   * - Ubuntu 22.04
     - ``apt``
     - ``ghcr.io/cyclus/cycamore_22.04_apt/cycamore``
   * - Ubuntu 22.04
     - ``conda``
     - ``ghcr.io/cyclus/cycamore_22.04_conda/cycamore``

These images are also updated via GitHub actions and have the following supported tags:
    * ``stable`` - the last stable release
    * ``<version number>`` - version number corresponds to past release
    * ``latest`` - up to date with the ``main`` branch

#. You can explore the |Cyclus| container registry `here <https://github.com/orgs/cyclus/packages>`_.

Happy simulating!

.. _Anaconda: https://www.continuum.io/downloads
.. _miniconda: http://conda.pydata.org/miniconda.html
.. _`docker run documentation`: https://docs.docker.com/reference/cli/docker/container/run/