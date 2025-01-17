Dependencies
============

Building the Cyclus website requires:

1. `Sphinx`_ v7.2.6 or higher

2. `sphinxcontrib-bibtex`_ v2.6.2 or higher

3. `cyclus`_

4. `cymetric <https://github.com/cyclus/cymetric>`_

5. `cycamore <https://github.com/cyclus/cycamore>`_

6. `Cloud Sphinx Theme <https://cloud-sptheme.readthedocs.io/en/latest/index.html>`_ v1.10.1 or higher

**NOTE:** The cloud package for Debian and Ubuntu is broken, so do not apt-get
this. Please ``pip install cloud_sptheme``, ``easy_install cloud_sptheme``, or install from source instead.
If installing from pip, install the source (``pip install no-binary=cloud_sptheme cloud_sptheme``), then 
use `this patch <https://foss.heptapod.net/doc-utils/cloud_sptheme/-/issues/47>`
to fix a bug in the package. 

Modifying the Cyclus Website
============================

The site is built and published via GitHub Actions.  The default branch of this repository is `source`
which contains the restructured text documents and Sphinx configuration used to build the site.  
All direct editing of files should be made in the `source` branch.

The rest of this readme assumes that you have two remotes associated with
cyclus.github.com.

1. Your fork, called ``origin``.

2. The upstream Cyclus group remote, called ``upstream``.

Quickstart
----------

If you simply want to build the documentation and are on the source
branch, you may always run::

    make html

Or if you have docker, you can forget about the other dependencies and just
run::

    make docker-html


There are docker targets in the makefile for doing everything related to the
site - building, previewing, and testing.  See the ``Docker`` section below
for more details.

Best practice workflow for contributing to site changes
--------------------------------------------------------

1. Checkout the `source` branch

   ``git checkout source``

2. Synchronize your branch with the repository (either `pull` or `fetch` and `merge`)

   ``git pull upstream source``

3. Create a branch to contain your change

   ``git checkout -b add_some_info``

4. Make your changes in this branch

5. Test your changes by using the `gh-preview` target

   ``make gh-preview``

   This will build a version of the site in the `gh-build` directory of
   your branch, `add_some_info`.  You can load it directly in a local
   browser.  Or if you have docker installed, you can optionally use the
   docker preview target:

   ``make docker-gh-preview``

   to build the website inside a docker container with all the correct
   dependencies and configuration taken care of automagically. Once this
   is done, navigate into the gh-build directory and serve the website.


   ::
      
      cd gh-build
      python3 -m http:server <port number>
   

   the most common port number for things like this is 8000, or 8080,
   and as such choosing one of these is recommended:

   ``python3 -m http:server 8000``

   If you are building the website on a computer which you are 
   connected to remotely, it will then be necessary to create a tunnel
   between your local and remote machines. This can be done with:

   ``ssh -L <port number>:localhost:<port number> username@remote``

   So if using port 8000 as in the example above, and connecting to a
   remote machine which you had listed in your config file as "remote-machine"
   the command would look something like this:

   ``ssh -L 8000:localhost:8000 username@remote-machine``

6. Repeat steps 4-5 until satisfied.

7. Once satisfied with the source RST files, push your branch to your fork of
   the repo.  Be sure to synchronize with any possible changes to the upstream
   repo `source` branch first.

   ::

     git fetch upstream
     git rebase upstream/source
     git push origin add_some_info


8. Issue a pull request by going to your branch on your fork of the repo and
   clicking the "Pull Request" button.

9. Every time you modify your pull request a workflow will be triggered that builds
   the site with your changes and uploads the built site as an artifact.  The specific workflow run 
   can be found by viewing the "Details" of the ``build-and-upload`` check within a PR, 
   and the ``github-pages`` artifact is listed in the "Summary".

10. If the PR is merged into the ``source`` branch the website will be published to https://fuelcycle.org 
    automatically via GitHub Actions.


Docker
-------

The ``make docker-...`` targets require the `ghcr.io/cyclus/cymetric_22.04_apt/cymetric` docker image
which can be retrieved/updated by running::

    docker pull ghcr.io/cyclus/cymetric_22.04_apt/cymetric:latest

.. _Sphinx: http://sphinx-doc.org/
.. _sphinxcontrib-bibtex: http://sphinxcontrib-bibtex.readthedocs.org/en/latest/index.html
.. _sphinxcontrib-blockdiag: http://blockdiag.com/en/blockdiag/sphinxcontrib.html
.. _cyclus: https://fuelcycle.org/

Remote Execution
=================

The website has functionality for allowing visitors to submit and run Cyclus
simulations in the cloud.  Files and instructions for deploying/updating the
remote execution back-end functionality are in the ``misc/fuelcycle.org``
directory of the http://github.com/rwcarlsen/cloudlus repository.

