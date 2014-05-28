Introduction to the |cyclus| Fuel Cycle Simulator
=================================================

|cyclus| is a next generation agent-based nuclear fuel cycle simulation
platform whose genesis was driven by a variety of gaps seen in previous fuel
cycle simulation efforts.  The current fleet of :term:`fuel cycle simulator`\
s addresses three major design and development philosophies:

    #. A desire for usability, thus developing a tool which begins with a
       simple model in a visual development environment that aims to provide an
       intuitive user interface (e.g. DYMOND, DANESS, VISION)
    #. A desire for rapid prototyping, thus developing a tool which begins
       with simple models in a scripting language that allows for quick answers to
       early problems (e.g.  CAFCA, GENIUS v1)
    #. A desire for detail/fidelity, thus developing a tool with an ad-hoc
       combination of existing complex analysis tools (e.g. COSI)

Each of these philosophies can hinder the simulation of some classes of
interesting problems due to complexity limits. In most cases this complexity
constrains first the usability of the tool followed by its extendability due
to increasingly convoluted dependencies. The final victim is performance, as
the ability to quickly solve simple problems is lost to the desire to solve
more complex ones.  

In addition to these technical challenges there is also an institutional one.
A combination of closed development platforms and processes has made it
difficult for an individual researcher to incorporate their ideas into fuel
cycle systems analysis studies or frameworks. The ability to combine existing
systems simulation tools with data about new facilities or fuel cycle concepts
is so challenging that many researchers either choose to avoid systems
analysis altogether or to write their own simplified tool. These custom fuel
cycle simulation tools involve a duplication of effort.

Each of these approaches lacks a design basis in computational science and
software development that can deliver the stated desired attributes of the
final software product:

    * **usability:** accommodating a wide range of user sophistication,

    * **performance:** solving simple problems in interactive time scales, and

    * **fidelity:** accommodating many levels of detail & fidelity,
      commensurate with a range of user sophistication.

A complete nuclear fuel cycle simulator requires modeling efforts in a wide
variety of physical and social science domains.  This places a premium on a
software development process that will facilitate fluid collaboration among a
large group of geographically dispersed developers.  With this constraint in
mind, a number of software development practices can be identified as highly
valuable for this effort:

    * **openness:** the process should have low institutional & technical
      obstacles to collaboration,

    * **modularity:** a particular approach to modularity should be pursued to 
      allow the core infrastructure to be independent of proprietary or
      sensitive data and models, and 

    * **extensibility:** attention to both robustness and flexibility allows
      for myriad potential developer extensions.

Software Process & Architecture
+++++++++++++++++++++++++++++++

As indicated above, the software architecture and accompanying development
process are critical to a simultaneously robust and flexible analysis
platform.

Open Source Development Process
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The |cyclus| development framework employs a modern, open source philosophy
that ensures transparency, attracts contributions from a varied community of
collaborators, and guarantees institution-independent access to all potential
:term:`user`\ s. In this development path, a public source code repository provides
unhindered access to the `fundamental simulation framework
<http://github.com/cyclus/cyclys>`_ and `additional agent archetypes
<http://github.com/cyclus/cycamore>`_ volunteered by developers.  Granting
unfettered access only to the |cyclus| engine allows for compartmentalization
of the code and its input data. Thus, secure and proprietary :term:`archetype
developer`\ s can be similarly encouraged to utilize the |cyclus| framework.
This modern development model passively distributes specialized content to
interested research groups, and facilitates parallel archetype development
efforts by institutions with complimentary goals.  The transparency inherent
in this type of :term:`open development process` also facilitates code review by
exposing available content to verification and validation by collaborators
with diverse areas of specialization and levels of expertise.

Another aspect of this development process is a preference for open source
third party libraries where additional functionality is necessary and
available from such libraries.  This includes basic infrastructure such as
file input/output, as well as :term:`archetype`-specific capabilities like
integer programming for network flow optimization.

Dynamically loadable Modules
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Dynamically loadable modules are the primary mechanism for extending |cyclus|
with new underlying archetypes.  The primary benefit of this
approach is encapsulation: the :term:`cyclus kernel` is completely independent
of the individual archetypes and all customization and extension is
implemented only in the loadable module.  A secondary benefit of this
encapsulation is the ability for contributors to choose different distribution
and licensing strategies.  Finally, this strategy allows individual developers
to explore different levels of complexity within their archetypes,
including wrapping other simulation tools as loadable modules for |cyclus|.

Use Cases & Visualization
~~~~~~~~~~~~~~~~~~~~~~~~~

Because of the wide array of use cases for |cyclus|, flexibility in the user
interface is important to provide users with their desired functionality.
This is true for input generation as well as output visualization.  A
graphical user interface has been designed and will be implemented in parallel
with the development of the underlying modules.  The graphical interface is
extensible by loadable modules in the same way as the core code to provide
developers the same flexibility in managing their input as they have in
implementing their archetypes.  Output visualization is also
important - the discrete facility/discrete material paradigm generates a
large volume of small data that needs to be aggregated in various ways to
provide context to a variety of users.

Modeling Paradigm
+++++++++++++++++

The modeling paradigm adopted by |cyclus| includes a number of deeply embedded
fundamental concepts.  These basic design choices comprise the bedrock on which
most future design choices are made. The |cyclus| team recognizes the
accompanying inflexibility to the code and therefore does not anticipate that
these attributes will change.

Discrete Facility & Discrete Material Objects
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The modeling infrastructure is designed such that every facility in a global
nuclear fuel cycle is treated individually.  While modeling options will exist
to allow collective action, this will be as a special case of the individual
facility basis.  Each facility will have two fundamental tasks: to transact
nuclear material with other facilities and to transform that nuclear material
from an input form to an output form.  These materials will be modeled as
discrete objects that exist for a finite time and whose composition and
transaction history is logged throughout the simulation.

Region-Institution-Facility Hierarchy
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Every discrete facility in |cyclus| is owned by an institution that operates
within a geographic region.  An institution can be used to represent any
entity that may own and operate a facility such as a private corporation, a
government agency, or a non-governmental agency, among others.  A region can
be used to represent any geographic area, typically a politically relevant
area such a sub-national region (e.g. a U.S. State), a nation-state, or a
super-national region (e.g. the E.U.).  While some performance parameters of
the facility may depend on its institutional ownership or geographical
location, the more important use of this capability is to control the way in
which a facility engages in a market for trade of nuclear material based on by
whom it is owned and/or operated.

Optimization and Sensitivity
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

There is an initial desire to minimize the direct simulation of institutional
decision making to seek optimal solutions.  Because institutional decision
making tends to seek an optimal solution only for the actor making that
decision (local optimization), it may not lead to an outcome that optimizes
for the largest population of stakeholders.  Instead, the fundamental approach
is to drive a single simulation with a large multi-dimensional data set and
then allow modern optimization technology to seek globally optimal solutions
based on global objective functions.
