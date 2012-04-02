.. Cyclus documentation master file, created by
   sphinx-quickstart on Fri Jan 27 22:22:30 2012.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

*Cyclus*
=========

*Cyclus* is a next-generation nuclear fuel cycle simulator
environment, providing flexibility to users and developers through an
agent-based approach.  A principal goal of *Cyclus* is to present a
low barrier to adoption by new users and developers in order to
encourage them to join a vibrant community in an :doc:`expanding ecosystem <basics/ecosystem>`.

Important features:

* Modeling Paradigm
   * discrete facilities with discrete material transactions
   * flexible design of new fuel cycles
* Software Development Principles
   * low barrier/rapid payback to adoption
   * minimal inherent technology assumptions
   * commonly used/available free software unfrastructure
* User Interaction
   * common physics infrastructure
   * different user interface layer for different user audiences, with varying levels of both input control and output exploration
       * varying levels of input control
       * varying levels of output exploration

The *Cyclus* modeling paradigm will let users reconﬁgure the basic
building blocks of a simulation without changing the software. The
foundation of a simulation will be a commodity broker that collects
offers and requests from a set of facilities and matches them
according to some algorithm. The user will be able to select which
type of algorithm is used for each broker and for each facility by
selecting an appropriate plug-in module for each and configuring it
with a particular set of parameters defined by that module. Changing
the parameters of a module will change the performance with a fixed
algorithm defining the behavior, while selecting a different module
will completely change its behavior.

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

