.. Cyclus documentation master file, created by
   sphinx-quickstart on Fri Jan 27 22:22:30 2012.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Cyclus
======

*Cyclus* is a next-generation nuclear fuel cycle simulator
environment, providing flexibility to users and developers through an
agent-based approach.  A principal goal of *Cyclus* is to present a
low barrier to adoption by new users and developers in order to
encourage them to join a vibrant community in an expanding ecosystem.

Important features:

* Modeling
   * discrete facilities with discrete material transactions
   * flexible design of new fuel cycles
* Software
   * low barrier/rapid payback to adoption
   * minimal inherent technology assumptions
   * commonly used/available free software unfrastructure
* User
   * common physics infrastructure
   * different user interface layer for different user audiences, with varying levels of both input control and output exploration
       * varying levels of input control
       * varying levels of output exploration

The Cyclus modeling paradigm will let users reconﬁgure the basic building
blocks of a simulation without changing the software. The foundation of a
simulation will be a commodity broker that collects offers and requests and
matches them according to some algorithm. The user will be able to select
which type of algorithm is used for each broker by selecting a MarketModel
and conﬁguring it with a particular set of parameters defined by that
MarketModel. Changing the parameters of a market will change its
performance and selecting a different MarketModel will completely change
its behavior.

Similarly, the user will have the flexibility to select FacilityModels to 

Most cyclus core code development at this time will be led by Paul Wilson,
Katy Huff, Matthew Gidden, and Robert Carlsen, the CNERG fuel cycle group.

Interested developers are welcome and encouraged to contribute but will
experience significant code instability in the early experimental stages of
the project.


Learn More
----------

The *Cyclus* project repository is located at
http://github.com/cyclus/core.

Although you do not have to register with github to
download and edit the code, if you desire your work to be integrated into the
cyclus mainline of development *you must fork the cyclus core repository into
your own github account and submit 'Pull Requests'*.

.. toctree::
   :maxdepth: 1

   basics/main
   usrdoc/main
   devdoc/main

Contact Us
----------

* Project PI Paul Wilson: wilsonp@engr.wisc.edu
* Developers' list: cyclus-dev@groups.google.com
* Users' list: cyclus-users@groups.google.com

