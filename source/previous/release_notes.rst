.. _1.5.5:

==================================
Cyclus 1.5.5 Release
==================================
:Author: Cyclus Developers
:Website: http://fuelcycle.org/
:Contact: https://groups.google.com/forum/#!forum/cyclus-dev

The Cyclus core team is excited to announce the latest stable version of the
cyclus ecosystem!

Major features
==============

No major features added.

`Cyclus <https://github.com/cyclus/cyclus>`_
---------------------------------------------

**Added:**

* Added a test example of Cyclus sensitivity analysis studies conducted using Dakota.
* Script and CI implementation ensuring at least 1 news file have been recreated.
* Added capability to register unit when reporting values in a time series.
* Added `map<string,map<string,double>>` typesystem. This can be used with C++ archetypes. But not python archetypes.


**Changed:**

* git and open-ssh added to the dockerfile (removed from CI).
* MACOS only: link against PYTHON lib in the binary building process. It should not be required when building the Python package as python knows about itself. For some reason, this is only true (and working) on MACOS, and was an issue when using Conda to install Python and other Cyclus deps.
* Updated the Cyclus quick installation instructions to reflect our use of conda to install dependencies.


**Removed:**

* git and open-ssh from CI (added to the dockerfile).
* Reference to `develop` branch tests in the readme file.


**Fixed:**

* News now checks diff against cyclus/master not origin/master.
* News check now triggers on PRs only.
* Allows build against Python => 3.7.
* Change cyclus-deps Docekrfile accordingly. (changing cython version to 0.28.5).

`Cycamore <https://github.com/cyclus/cycamore>`_
--------------------------------------------------

**Changed:**

* A reactor will now decommission itself if it is retired and the decommission requirement is met.

`Cymetric <https://github.com/cyclus/cymetric>`_
--------------------------------------------------

**Added:**

* Monthly electricity generated metric. One for returning electricity by one agent and another for all agents.
* Added units parameter.

Summary
=======

Since v1.5.4,

* Cyclus: 159 commits resulting in  67 files changed, 1444 insertions(+), 977 deletions(-)

* Cycamore: 19 commits resulting in  29 files changed, 270 insertions(+), 235 deletions(-)

* Cymetric: 13 commits resulting in  7 files changed, 104 insertions(+), 4 deletions(-)

Contributors
============
The following people contributed to this release of Cyclus.  A "*" by their
name indicates a first time contributor.  Names follow alphabetically, 

* Anna Caldwell-Overdier *
* Baptiste Mouginot
* gwenchee
* Gwendolyn Chee
* Jordan Stomps *
* Paul Wilson
