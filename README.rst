Dependencies
============

Building the Cyclus website requires:

1. `Sphinx`_ v1.1.2 or higher

2. `sphinxcontrib-bibtex`_ v0.3.0 or higher

3. `cyclus`_

4. `cymetric <https://github.com/cyclus/cymetric>`_

5. `cycamore <https://github.com/cyclus/cycamore>`_

6. `Cloud Sphinx Theme <https://pythonhosted.org/cloud_sptheme/index.html>`_

**NOTE:** The cloud package for Debian and Ubuntu is broken, so do not apt-get
this. Please ``pip install cloud_sptheme``, ``easy_install cloud_sptheme``, or install from source instead.
If installing from pip, install the source (``pip install no-binary=cloud_sptheme cloud_sptheme``), then 
use `this patch <https://foss.heptapod.net/doc-utils/cloud_sptheme/-/issues/47>`
to fix a bug in the package. 

Modifying the Cyclus Website
============================

A 2 branch system has been implemented to maintain a clean process of
rebuilding this site.

1. The `source` branch contains the restructured text documents and
Sphinx configuration used to build the site.  All direct editing of
files should be made in the `source` branch.

2. The `main` branch contains the processed and published web
content that is derived by Sphinx from the `source` branch.  These
files should not be editted directly.

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
site - building, previewing, and publishing.  See the ``Docker`` section below
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

   ``make gh-preview-docker``

   to build the website inside a docker container with all the correct
   dependencies and configuration taken care of automagically.

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

Best practice for managing a pull request
------------------------------------------

1. Synchronize your repository with the upstream repo::

   git fetch upstream
   git checkout main
   git merge upstream/main
   git checkout source
   git merge upstream/source

2. Checkout the `pull_request_branch` in the pull request submitter's repo::

     git fetch https://github.com/[username]/cyclus.github.com pull_request_branch
     git checkout -b pull_request_branch

3. Test the changes by using the `gh-preview` target

   ``make gh-preview``

   This will build a version of the site in the `gh-build` directory in
   your branch, `pull_request_branch`.  You can load it directly in a
   local browser.

4. If satisfied, merge the `pull_request_branch` into the `source`
   branch::

     git checkout source
     git merge pull_request_branch

6. If there are no conflicts, push this to the repo

   ``git push upstream source``

7. Republish the pages with the `gh-publish` target.  (**NOTE: for this step,
   the upstream Cyclus repository *must* be called `upstream`**)

   ``make gh-publish``

Docker
-------

The ``make docker-...`` targets require the cyclus/fuelcycle.org-deps docker image
which can be retrieved/updated by running::

    docker pull cyclus/fuelcycle.org-deps

Occasionally (i.e. for a Cyclus release) the image will need to be updated.
This can be done by::

    cd docker/fuelcycle.org-deps

    # update the image the fuelcycle.org image depends on
    docker pull cyclus/cymetric

    # rebuild the image
    docker build -t cyclus/fuelcycle.org-deps .

    # push the new image to docker-hub
    docker push cyclus/fuelcycle.org-deps

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

