|Cyclus| Introduction
=====================

|cyclus| is a nuclear fuel cycle simulation platform whose genesis was driven
by a variety of gaps seen in previous fuel cycle simulation efforts, which
attempted to address three major design and development philosophies:

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
constrains first the usability of the tool followed by its extensibility due
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
software development that can deliver the desired attributes of the final
software product:

    * **usability:** accommodating a wide range of user sophistication,

    * **performance:** solving simple problems in interactive time scales, and

    * **fidelity:** accommodating many levels of detail & fidelity,
      commensurate with a range of user sophistication.

While these attributes could be achieved across a set of different tools, by
providing a common physics and resource exchange infrastructure that can meet
a broad range of needs, |Cyclus| facilitates meaningful comparisons among
different use cases that has been challenging when comparing different tools.

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

Sections
----------

.. toctree::
   :maxdepth: 1

   concepts
   sw_dev
   fcs_background
   ecosystem
   projects
   optsens
   acknowledgements
   glossary


