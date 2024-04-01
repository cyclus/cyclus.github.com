#################################
Installing |Cyclus| with Docker
#################################

|Cyclus| maintains six container images with |Cyclus| (and its dependencies) pre-installed:

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

You can download and run a container image interactively using:

   .. code-block:: bash

      $ docker run -it ghcr.io/cyclus/cyclus_22.04_apt/cyclus:stable

This will provide you with an environment that has |Cyclus| ready for you to use.  To 
access files on your machine from within the container try using a volume (``-v <your local directory>:<container destination directory>``).

If you are unfamiliar with Docker below are some good resources for getting started:
  - `Docker 101 Tutorial <https://www.docker.com/101-tutorial/>`_
  - `Docker CLI reference <https://docs.docker.com/reference/cli/docker/>`_

If you wish to run |Cyclus| with Cycamore pre-installed the following images are supported:

.. list-table:: 
   :header-rows: 1

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

You can explore all supported images in the |Cyclus| `container registry <https://github.com/orgs/cyclus/packages>`_.

Happy simulating!

.. _`docker run documentation`: https://docs.docker.com/reference/cli/docker/container/run/