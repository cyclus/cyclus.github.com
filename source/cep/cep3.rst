CEP 3 - |Cyclus| Release Procedure
********************************************************

:CEP: 3
:Title: |Cyclus| Release Procedure
:Last-Modified: 2017-09-01
:Author: Anthony Scopatz and Matthew Gidden and Baptiste Mouginot
:Status: Accepted
:Type: Process
:Created: 2013-10-25

Abstract
========
The purpose of this document is to act as a guideline and checklist for how
to release the |cyclus| core code base and the supported projects in the ecosystem.

The |Cyclus| Ecosystem
======================
The very first thing to do when preparing for an upcoming release is to elect
a release manager.  This person has the special responsibility of making sure
all of the following tasks are implemented.  Therefore, their judgment for the
placement of issues and code stability must be adhered to.

The |cyclus| ecosystem has a few projects which are all released together.
(This may change in the future a development diverges and the core becomes more
stable.)  The projects that are under the release manager's purview are:

* `Cyclus`_
* `Cycamore`_
* `Cymetric`_

The projects which are not yet under the release managers purview are:

* `Rickshaw`_
* `CyclusJS`_

Release Candidates (Tags & Branches)
====================================
At the beginning of a release, a special branch for *each* project should be
made off of ``master`` named ``vX.X.X-release``. Note the *v* at the beginning. Each
project should have the initial version of of it's release branch *tagged* as
``X.X.X-rc1``, the first release candidate.

.. note::

    To distingush them, branch names have a ``v`` prefix (``vX.X.X-release``)
    while tag names lack this prefix (``X.X.X-rcX``).

Release candidates serve as an official proving ground for the release. Upon
creation, an announcement should be made to the developer's list, and users of
the project should be encouraged to test them out in order to bugs/other issues.

Any required changes must be pull requested from a topical branch into the
*release* branch.  After this has been accepted, the topical branch must be
merged with ``master`` as well. The release branch is there so that development
can continue on the ``master`` branch while the release candidates (rc) are out
and under review.  This is because otherwise any new developments would have to
wait until post-release to be merged into ``master`` to prevent them from
accidentally getting released early.

Everything that is in the release branch must also be part of ``master``.
Graphically,

.. figure:: cep-0003-1.svg
    :align: center

    **Figure 1:** Branch hierarchy under release.

.. note::

    Any commits merged into the release branch must *also* be merged into
    ``master``. It is common practice for the release manager to request the
    reviewer pull requests to merge the topical branch into ``master``
    as well. However, it is the ultimate release manager's responsibility to
    make sure ``master`` is kept up to date with the ``release`` branch.

If changes are made to the release branch, a new candidate must be issued after
*2 - 5 days*. Every time a new release candidate comes out the ``vX.X.X-release``
must be tagged with the name ``X.X.X-rcX``. A developer's list annoucement must
accompany any new candidate.

The release branch must be quiet and untouched for *2 - 5 days prior* to the
full release. When the full and final release happens, the ``vX.X.X-release``
branch is deleted. All commits in the ``vX.X.X-release`` branch must have also
been merged into the ``master`` branch as they were accepted.

Project Checklist
=================

.. note::

    Utility scripts for this process can be found in the `release`_ repository

Releasing a |cyclus| project is comprised of the following operations. Each
operation should be enacted in order.

Release Candidate Process
-------------------------

#. Review **ALL** issues and pull requests, reassigning or closing them as needed.

#. Ensure that all issues/PRs in this release's milestone have been closed.
   Moving them to the next release's milestone is a perfectly valid strategy for
   completing this milestone.

#. Initiate the release candidate process (see above)

#. Review the current state of documentation and make approriate updates.

#. Finish the release candidate process

    - make sure all commits in the ``release`` branch also are in ``master``

Release Process
---------------

#. Make sure every local |cyclus| project repository is up to date with its
   ``master``, and ``vX.X.X-release`` branches on ``upstream``.

#. Bump the version in ``cyclus/src/version.h.in``,
   ``cycamore/src/cycamore_version.h.in``, and
   ``cymetric/setup.py``; commit the changes

#. Perform maintenance tasks for all projects. The maintenance depends on `PyNE
   <https://github.com/pyne/pyne.git>`_ and Doxygen.

    - they are described in detail below, *but* the ``maintenence.sh`` utility
      in ``release/utils`` will do this automatically for you

    - make sure to have your ``rs.cred`` file (see ``maintenence.sh``'s help)

    .. code-block:: bash

      $ cd /path/to/release/utils
      $ export CYCLUS_DIR=/path/to/cyclus
      $ export CYCAMORE_DIR=/path/to/cycamore
      $ ./maintenence.sh -r -v X.X.X # X.X.X is *this* version

    .. note::

          If maintenance script fails because of an ABI failure that is caused by
          a compiler update (or other similar change caused by reasons other
          than code changes), you might want to accept them and procceed with the
          release with those. To do so you need to generate the new symbols and
          commit them:

          #. First make sure those changes can be ignored by emailing for
             discussion/approval the dev-list

          #. if the dev-list agrees to those changes, update the symbols and
             commit the new one:

          .. code-block:: bash

                $ cd $CYCLUS_DIR/release
                $ ./smbchk.py --update -t X.X.X # X.X.X is *this* version
                $ git add symbols.json
                $ git commit -m "Describe here all the change on the ABI"


#. Commit all changes for all projects.

    .. code-block:: bash

      $ cd /path/to/project
      $ git checkout vX.X.X-release
      $ git commit -am "final release commit after maintenence"

#. Update all master branches.

    .. code-block:: bash

      $ cd /path/to/project
      $ git checkout master
      $ git merge --no-ff vX.X.X-release
      $ git push upstream master

#. *Locally* tag the repository for *each* of the projects.

    .. code-block:: bash

      $ cd /path/to/project
      $ git checkout master
      $ git merge --no-ff vX.X.X-release
      $ git tag -a -m "Cyclus project release X.X.X, see http://fuelcycle.org/previous/vX.X.X.html for release notes" X.X.X

#. Draft release notes.

    - the ``make_release_notes.sh`` utility in ``release/utils`` will help
      provide a template

    .. code-block:: bash

      $ cd /path/to/release/utils
      $ export CYCLUS_DIR=/path/to/cyclus
      $ export CYCAMORE_DIR=/path/to/cycamore
      $ export CYMETRIC_DIR=/path/to/cymetric
      $ ./make_release_notes.sh W.W.W X.X.X # W.W.W is the previous version, X.X.X is *this* version

    - add the release notes as ``cyclus.github.com/source/previous/vX.X.X.rst``
      with appropriate updates to ``index.rst`` in that directory

#. Update the API docs.

    - the ``api_docs.sh`` utility in ``release/utils`` will do this
      automatically for you

    .. code-block:: bash

      $ cd /path/to/release/utils
      $ export CYCLUS_DIR=/path/to/cyclus
      $ export CYCAMORE_DIR=/path/to/cycamore
      $ ./api_docs.sh X.X.X # X.X.X is *this* version

#. Update the ``master`` branch of all projects and clean up.

    .. code-block:: bash

      $ cd /path/to/project
      $ git push upstream X.X.X master
      $ git push upstream --delete vX.X.X-release

#. Manually visit the github.com page for each project and mark the tags as releases.

    - This can be updated one day to use the Github `release API
      <https://developer.github.com/v3/repos/releases/#create-a-release>`_


#. Update Conda-forge

    - For each project, find the corresponding feedstock repository in the
      conda-forge organization on github. For example, cyclus' feedstock is at
      https://github.com/conda-forge/cyclus-feedstock

    - In each project's feedstok, open up a PR which updates the
      `recipe/meta.yaml` file with the new version number and the new SHA-256
      value of the new version's tarball. See conda-forge documentation for more
      or ask the feedstock maintainers for help.

    - Note that each feedstock must be accepted and the package uploaded to
      anaconda.org (automatic) prior to accepting updates for the next feedstock
      dependency. For example, cyclus must be fully updated before cycamore.


#. Create a DOI. See :doc:`CEP4 <./cep4>` for details.

    - This can be updated one day to use the Figshare `API
      <http://api.figshare.com/docs/intro.html>`_

#. Update website release information.

    - on the front page (``source/index.rst``)
    - DOIs (``source/cite/index.rst``)
    - release notes (``source/previous/index.rst``), remember both the release
      notes and the zip/tar URLs!
    - layout template (``source/atemplates/layout.html``) of the website
    - install from tarball instruction
      (``source/user/install_from_tarball.rst``)


#. Commit all changes to ``cyclus.github.com`` and ``make gh-publish``

#. Send out an email to ``cyclus-dev`` and ``cyclus-users`` to announce the release!


.. This part has been commented, as it is required for the website, but the
   person in charge of the release might not have the proper access to update the
   Dory worker.  This should be automated when a merge is done on the master branch
   a CI-hook should update the dory cloudlus server and relaunch the worker.
   Moreover the cloudlus server is not directly related to Cyclus and depend on
   the UW-Madison community but the website relies on it to host the
   online cyclus calculation... (see
   https://github.com/cyclus/cyclus.github.com/pull/227#pullrequestreview-21589660
   discussion for more details.)

.. #. Update ``Dory``'s ``Cyclus``/``Cycamore`` version and relaunch ``Dory`` worker.
   To do this you need a acces to the ``Dory`` server (if you don't please
   contact an administrator), the ``go`` toolchain as well as ``cde`` installed
   on your computer. Also, the release version of ``Cyclus`` and ``Cycamore``
   have to be compiled on you system and both executable and lib have to be on
   the default paths. Please refer to the :doc:`source installation
   <../user/install_from_git>` if you need.
.. .. code-block:: bash
      $ git clone https://github.com/rwcarlsen/cloudlus.git
      $ cd cloudlus
      $ go install ./cmd/cloudlus
      $ cd misc/fuelcycle.org
      $ make
      $ ssh dory.fuelcycle.org 'mv cyc-cde.tar.gz cyc-cde.tar.gz_bkp'
      $ scp cyc-cde.tar.gz dory:fuelcycle.org:./
      $ ssh dory.fuelcycle.org
      $ ps -fe | grep cloudlus | grep work | grep ':80' | cut -d" " -f6 | xargs kill -9
      $ rm -rf worker-*
      $ ./launch.sh 2



Maintainence Tasks
==================

.. note::

    There is now the ``maintenence.sh`` utility in ``release/utils`` that
    will automate this for you. The section remains here for posterity.

Each project may have associate maintenance tasks which may need to be performed
at least as often as every micro release.

|Cyclus|
--------

**Update PyNE:**  PyNE source code is included and shipped as part of |cyclus|. As pyne
evolves, we'll want to have our version evolve as well. Here are the steps to do so.
These assume that in your HOME dir there are both the pyne and |cyclus| repos.  Remember
to check in the changes afterwards.

.. code-block:: bash

    $ cd ~/pyne
    $ ./amalgamate.py -s pyne.cc -i pyne.h
    $ cp pyne.* ~/cyclus/src

**Update Nuclear Data:** PyNE also provides a nuclear data library generator which we use for
our source data.  Occassionally, this needs to be updated as updates to pyne itself come out.
The command for generating |cyclus| specific nuclear data is as follows:

.. code-block:: bash

   $ cd ~/pyne
   $ nuc_data_make -o cyclus_nuc_data.h5 \
    -m atomic_mass,scattering_lengths,decay,simple_xs,materials,eaf,wimsd_fpy,nds_fpy

Once the file is generated it must be put onto rackspace.

**Update Gtest:** We include a copy of the fused Gtest source code within our
source tree located in the ``tests/GoogleTest`` directory.  To keep up with
Gtest's natural evolution cycle, please download the latest release of Google Tests
and follow `the fused source directions here`_.  If we go too long without doing this,
it could be very painful to update.

**Verify & Update API Stability:** Since |Cyclus| v1.0 we promise API
stability.  Luckily, we have a tool for keeping track of this mostly
automatically.  In order to check this correctly, you must have a **RELEASE**
build of Cyclus compiled/installed.  Every release please run the following
command to verify that the release branch is stable:

.. code-block:: bash

    $ cd cyclus/release
    $ ./smbchk.py --update -t HEAD --no-save --check

If |cyclus| only has API additions, it is considered stable and the command will
tell you so. If |cyclus| also has API deletions, then |cyclus| is considered
unstable and a diff of the symbols will be printed.
**You cannot release |cyclus| if it is unstable!** Please post the diff to
either the mailing list or the issue tracker and work to resolve the removed
symbols until it this command declares that |cyclus| is stable. It is
probably best to do this prior to any release candidates if possible.

Once stable and there are no more code changes to be made, add the symbols
in this release to the database with the following command (again - make sure
you are working on a RELEASE build of Cyclus):

.. code-block:: bash

    $ cd cyclus/release
    $ ./smbchk.py --update -t X.X.X

where ``X.X.X`` is the version tag. This should alter the ``symbols.json``
file.  Commit this and add it to the repo.

Cycamore
--------

No maintenence required.

Cymetric
--------

No maintenance required.

Document History
================

This document is released under the CC-BY 3.0 license.

.. _Cyclus: https://github.com/cyclus/cyclus
.. _Cycamore: https://github.com/cyclus/cycamore
.. _Cymetric: https://github.com/cyclus/cymetric
.. _Rickshaw: https://github.com/ergs/rickshaw
.. _CyclusJS: https://github.com/cyclus/cyclist2
.. _release: https://github.com/cyclus/release
.. _the fused source directions here: https://code.google.com/p/googletest/wiki/V1_6_AdvancedGuide#Fusing_Google_Test_Source_Files
