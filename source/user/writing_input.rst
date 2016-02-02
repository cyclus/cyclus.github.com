Writing a |Cyclus| Input File
=============================
This section will provide an introduction to creating a valid input file for
|Cyclus| by hand.  Because |Cyclus| uses both XML and JSON, input files have clearly defined
sections, or blocks, that can be automatically validated for correctness.

Work is underway to provide a drag-and-drop graphical user interface to
facilitate building |Cyclus| input files in the future.


A Brief Introduction to XML
------------------------------------
`XML`_ stands for EXtensible Markup Language, and was designed to provide
structure to data in a generic way by grouping the data between starting and
ending "tags".  The tags used to provide that structure are not defined
universally, but each project can invent their own language for those tags.
The data that lies between a pair starting and ending tags may be additional
sections defined by other tags.

Here is an example of a XML code block.

.. code-block:: xml

  <note>
     <to>Matt</to>          <!-- message recipient -->
     <from>Anthony</from>   <!-- message sender -->
     <heading>Cyclus released today</heading>
     <body>We have released Cyclus v1.0 for everyone to use.</body>
  </note>



A Brief Introduction to JSON
------------------------------------
`JSON`_ stands for JavaScript Object Notation, and is similar in many ways to XML. JSON was created to replace XML with a more user friendly language. It was designed to be a simpler and easier to use markup language. It does this by cutting out unnecessary parts of the XML language, such as closing tags. One area where JSON excels is that it is a data-oriented language, compared to XML, which is document-oriented.

Here is the same code block using JSON.

.. code-block:: json

    {
      "note": {
        "to": "Matt",
        "from": "Anthony",
        "heading": "Cyclus released today",
        "body": "We have released Cyclus v1.0 for everyone to use."
      }
    }


In this example, a section named ``note`` includes four other sections named
``to``, ``from``, ``heading``, and ``body``, respectively.  

The set of tags for any given project, and their relationship to each other in
the hierarchy, is referred to as a grammar.  In addition to defining which
tags exist, the grammar defines how many times each tag must or may exist
in a given section.  A tag may be completely optional, required one or more
times, or allowed to appear as many times as the user desires.

Although XML grammars are designed to be self-documenting, comments can be
inserted into XML files anywhere using the ``<!-- comment here -->`` syntax,
as shown above.


The |Cyclus| Input File
------------------------
Every |Cyclus| input file must have exactly one ``simulation`` section that
contains all data for a simulation.

**XML:**

.. code-block:: xml

   <simulation>
     ... simulation data will go here ...
   </simulation>
 
**JSON:** 
 
.. code-block:: json

    {
      "simulation": {
          "… simulation data will go here …"
    }

Although not all sections are required, the following sections may appear in
any order in the input file:

.. toctree::
   :maxdepth: 1

   input_specs/control
   input_specs/commodity
   input_specs/archetypes
   input_specs/facility
   input_specs/region
   input_specs/inst
   input_specs/recipe

Including XML Files
--------------------
One feature of XML is that you are able to include external XML files inside of
your current document. This lets you reuse common parts of your input file that 
do not change across multiple simulations. To enable XML include semantics
the attribute ``xmlns:xi="http://www.w3.org/2001/XInclude"`` *must* be added to the 
``<simulation>`` tag. Then to include an external 
file use the ``<xi:include href="path/to/file" />`` tag where you want the included
file to go.

A common inclusion pattern is to have a recipe book of materials in one file 
and then include this in your simulation.

**input.xml:**

.. code-block:: xml

    <simulation xmlns:xi="http://www.w3.org/2001/XInclude">
      ...
      <xi:include href="recipebook.xml" /> 
      ... 
    </simulation>

**recipebook.xml:**

.. code-block:: xml

  <recipe>
    <name>proton_recipe</name>
    <basis>mass</basis>
    <nuclide>
      <id>010010000</id>
      <comp>1</comp>
    </nuclide>
  </recipe>

  <recipe>
    <name>natU_recipe</name>
    <basis>atom</basis>
    <nuclide>
      <id>922350000</id><comp>0.007</comp>
    </nuclide>
    <nuclide>
      <id>922380000</id><comp>0.993</comp>
    </nuclide>
  </recipe>

.. _XML : http://www.w3schools.com/xml/default.asp
.. _JSON : http://www.json.org/
