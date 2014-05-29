Writing a |Cyclus| Input File
=============================

This section will provide an introduction to creating a valid input file for
|Cyclus| by hand.  Because |Cyclus| uses XML, input files have clearly defined
sections that can appear in any order and can be automatically validated for
correctness.

Work is underway to provide a drag-and-drop graphical user interface to
faciliate building |Cyclus| input files in the future.


A Brief Introduction to XML
---------------------------

`XML`_ stands for EXtensible Markup Lanuage, and was designed to provide
structure to data in a generic way by grouping the data between starting and
ending "tags".  The tags used to provide that structure are not defined
universally, but each project can invent their own language for those tags.
The data that lies between a pair starting and ending tags may be additional
sections defined by other tags.

Here is a simple example of an XML section for the common concept of a
message between people:

.. code-block:: xml

  <note>
     <to>Matt</to>          <!-- message recipient -->
     <from>Anthony</from>   <!-- message sender -->
     <heading>Cyclus released today</heading>
     <body>We have released Cyclus v1.0 for everyone to use.</body>
  </note>

In this example, a section named ``note`` includes four other sections named
``to``, ``from``, ``heading``, and ``body``, respectively.  

The set of tags for any given project, and their relationship to each other in
the hierarchy, is referred to as a grammar.  In addition to defining which
tags exist, the grammar can define how many times each tag must or may exist
in a given section.  A tag may be completely optional, required one or more
times, or allowed to appear as many times as the user desires.

Although XML grammars are designed to be self-documenting, comments can be
inserted into XML files anywhere using the ``<!-- comment here -->`` syntax,
as shown above.


The |Cyclus| Input File
------------------------

Every |Cyclus| input file must have exactly one ``simulation`` section that
contains all other data for a simulation.

.. code-block:: xml

   <simulation>
     ... simulation data will go here ...
   </simulation>

The following sections are required to appear *only once* in the
``simulation`` section of each |Cyclus| input file:

.. toctree::
   :maxdepth: 1

   input_specs/control
   input_specs/archetypes

The following sections are required to appear *at least once* in the
``simulation`` section of ecah |Cyclus| input file:

.. toctree::
   :maxdepth: 1

   input_specs/facility
   input_spects/region

The following sections are optional and may appear multiple times in the
``simulation`` section of each |Cyclus| input file:

.. toctree::
   :maxdepth: 1

   input_specs/commodity
   input_specs/recipe

.. _XML : http://www.w3schools.com/xml/default.asp

