
Region Model Input
==================

Core-level Input
----------------

Input parameters that all regions must specify are:

  * name - the region's name
  * allowed facilities - a list of facilities that can be built in 
    the region
  * model - the region model defining this region
  * institutions - a list of institions in this region

Definiton
+++++++++

.. code-block:: xml

  <!-- begin section for regions -->
  <define name="region">
    <element name="region">

      <element name="name">
         <text/>
      </element>

      <oneOrMore>
      <element name="allowedfacility">
          <text/>
      </element>
      </oneOrMore>

      <element name="model">
          <text\>
      </element>

      <oneOrMore>
      <ref name="institution" />
      </oneOrMore>

    </element>
  </define>

Example
+++++++

.. code-block:: xml

  <region>
    <name>SingleRegion</name>                   <!-- a name -->
    <allowedfacility>Source</allowedfacility>   <!-- this region allows facilities of type "Source" -->
    <allowedfacility>Sink</allowedfacility>     <!-- this region allows facilities of type "Sink" --> 
    <model>
      <NullRegion/>                             <!-- use the simplest type of Region Module -->
    </model>
    <institution>
      ...                                       <!-- check out the institution documentation -->
    </institution>
  </region>

Supported Region Modules
------------------------

The following is a list of currently-available Cycamore module
input specifications:

.. toctree::
   :glob:
   :maxdepth: 1

   */*
