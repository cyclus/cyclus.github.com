
Facility Model Input
====================

Core-level Input
----------------

Input parameters that all facilitys must specify are:

  * name - the facility's name
  * `optional` lifetime - the total time a facility operates (units 
    are in months)

    * Note: if no lifetime is supplied, the facility will persist 
      throughout the entire simulation

  * model - the model to use for this facility
  * `optional` incommodities - any commodities that are inputs for 
    the facility
  * `optional` outcommodities - any commodities that are outputs for 
    the facility

Definiton
+++++++++

.. code-block:: xml

  <!-- begin section for facilities -->
  <define name="facility">
    <element name="facility">

      <element name="name">
        <text/>
      </element>

      <optional>
        <ref name="lifetime"/>
      </optional>

      <element name="model">
        <text/>
      </element>

      <zeroOrMore>
        <ref name="incommodity"/>
      </zeroOrMore>

      <zeroOrMore>
        <ref name="outcommodity"/>
      </zeroOrMore>

    </element>
  </define>

Example
+++++++

.. code-block:: xml

  <facility>
    <name>Source</name>                              <!-- a name -->
    <lifetime>120</lifetime>                         <!-- this facility will operate for 10 years -->
    <model>
      <SourceFacility>                               <!-- read about the SourceFacility below -->
        <output>
          <outcommodity>fuel</outcommodity>
          <output_capacity>1</output_capacity>
          <recipe>commod_recipe</recipe>
        </output>
      </SourceFacility>
    </model>
    <outcommodity>fuel</outcommodity>                <!-- this facility outputs a commodity named fuel -->
  </facility>

Supported Facility Modules
--------------------------

The following is a list of currently-available Cycamore module
input specifications:

.. toctree::
   :glob:

   */*
