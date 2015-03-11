Dependencies
============

Building the Cyclus website requires:

1. `Sphinx`_ v1.1.2 or higher

2. `sphinxcontrib-bibtex`_ v0.3.0 or higher

3. `cyclus`_

4. `Cloud Sphinx Theme <https://pythonhosted.org/cloud_sptheme/index.html>`_

**NOTE:** The cloud package for Debian and Ubuntu is broken, so do not apt-get
this. Please ``pip install cloud_sptheme``, ``easy_install cloud_sptheme``, or install from source instead.

Modifying the Cyclus Website
============================

A 2 branch system has been implemented to maintain a clean process of
rebuilding this site.

1. The `source` branch contains the restructured text documents and
Sphinx configuration used to build the site.  All direct editing of
files should be made in the `source` branch.

2. The `master` branch contains the processed and published web
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
   browser.

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
   git checkout master
   git merge upstream/master
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

7. Republish the pages with the `gh-publish` target.

   ``make gh-publish``

.. _Sphinx: http://sphinx-doc.org/
.. _sphinxcontrib-bibtex: http://sphinxcontrib-bibtex.readthedocs.org/en/latest/index.html
.. _sphinxcontrib-blockdiag: http://blockdiag.com/en/blockdiag/sphinxcontrib.html
.. _cyclus: https://fuelcycle.org/
