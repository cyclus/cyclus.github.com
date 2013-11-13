CEP 3 - Cyclus Release Procedure
********************************************************

:CEP: 3
:Title: Cyclus Release Procedure
:Last-Modified: 2013-10-25
:Author: Anthony Scopatz
:Status: Draft
:Type: Process
:Created: 2013-10-25

Abstract
========
The purpose of this document is to act as a guideline and checklist for how 
to release the cyclus core code base and the supported projects in the ecosystem.

The Cyclus Ecosystem
====================
The very first thing to do when preparing for an upcoming release is to elect 
a release manager.  This person has the special responsibility of making sure 
all of the following tasks are implemented.  Therefore, their judgment for the 
placement of issues and code stability must be adhered to.  

The cyclus ecosystem has a few projects which are all released together. 
(This may change in the future a development diverges and the core becomes more 
stable.)  The projects that are under the release manager's purview are:

* `Cyclus`_ 
* `Cycamore`_ 
* `Cycstub`_ - copy the files from cyclus core's ``stub/`` dir into the 
  cycstub's ``src/`` dir.

The projects which are not yet under the release managers purview are:

* `Cyclist`_ 
* `CIclus`_

Release Candidates & Branches
=============================
All projects should have a release candidate ('-rc1') that comes out 2 - 5 days
prior to the scheduled release.  During this time, no changes should occur to 
a special release branch ('vX.X.X-release').  

The release branches are there so that development can continue on the 
develop branch while the release candidates (rc) are out and under review.  
This is because otherwise any new developments would have to wait until 
post-release to be merged into develop to prevent them from accidentally 
getting released early.    

As such, these 'vX.X.X-release' branches should only exist while there are 
release candidates out.  They are akin to a temporary second level of staging 
to be used to keep master clean and safe.  As such, everything that is in this 
branch should also be part of develop.  Graphically, 

.. figure:: cep-0003-1.svg
    :align: center

    **Figure 1:** Branch hierarchy under release.

Every time a new release candidate comes out is when vX.X.X-release gets merged 
into master.  When the actual release happens, the release branch is deleted.

If you have a new fix that needs to be in the next release candidate, you make a 
topical branch and then pull request it into the release branch.  After this has 
been accepted, the topical branch should be merged with develop as well.

The release branch must be quiet and untouched for 2 - 5 days prior to the full 
release.

Project Checklist
=================
When releasing a cyclus project, make sure to do the following items in order:

1. Review **ALL** issues in the issue tracker, reassigning or closing them as needed.
2. Ensure that all issues in this release's milestone have been closed.  Moving issues
   to the next release's milestone is a perfectly valid strategy for completing this
   milestone.  
3. Write and commit the release notes.
4. Bump the version (in code, documentation, etc.) and commit the change.
5. Merge or rebase the branch: 

   * If this is the first release candidate, create a release branch called
     'vX.X.X-release' off of develop.  Merge the release branch into master.
   * If this is the second or later release candidate, merge or rebase the 
     release branch into master.
   * If this is a full release, merge or rebase the release branch into
     the master branch.  Then delete the release candidate branch.

6. Create a tag in the version control system whose name matches that of the release.
7. Push the tags upstream
8. Update release information on the website.

Document History
================
This document is released under the CC-BY 3.0 license.

.. _Cyclus: https://github.com/cyclus/cyclus
.. _Cycamore: https://github.com/cyclus/cycamore
.. _Cycstub: https://github.com/cyclus/cycstub
.. _Cyclist: https://github.com/cyclus/cyclist2
.. _CIclus: https://github.com/cyclus/ciclus
