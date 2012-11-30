
EnrichmentFacility
==================

The EnrichmentFacility module serves as a filter for the enrichment
process. It calculates and outputs the amount of Separative Work
Units (SWUs) and natural uranium feed required to perform a 
requested enrichment. If it has the feedstock available, it will
perform the enrichment. 

Input Parameters
----------------

  * input - the definition of what the given feedstock is

    * incommodity - the input commodity
    * inrecipe - the feedstock recipe
    * `optional` inventorysize - the amount of feedstock the facility
      can store

  * output - the parameters associated with the output material 
    provided by this facility

    * outcommodity - the output commodity
    * tails_assay - the uranium assay of the tails produced by this
      facility

Definiton
+++++++++

.. code-block:: xml

  <define name="EnrichmentFacility">
     <element name="EnrichmentFacility"> 
       <element name ="input">
         <ref name="incommodity"/>
         <ref name="inrecipe"/>
         <optional>
           <ref name="inventorysize"/>
         </optional>
       </element>
       <element name ="output">
         <ref name="outcommodity"/>
          <element name ="tails_assay">
            <data type="double"/>
          </element>
       </element>
     </element>
  </define>

Example
+++++++

.. code-block:: xml

  <facility>
    <name>Enrichment</name>
    <model>
      <EnrichmentFacility>
        <input>
          <incommodity>natl_u</incommodity>          <!-- this facility takes in natural uranium -->
          <inrecipe>natl_u</inrecipe>                <!-- with a given material recipe -->
        </input>
        <output>
          <outcommodity>enriched_u</outcommodity>    <!-- this facilities outputs enriched uranium -->
          <tails_assay>0.003</tails_assay>           <!-- the tails assay is 0.3% -->
        </output>
      </EnrichmentFacility>
    </model>
    <incommodity>natl_u</incommodity>
    <outcommodity>enriched_u</outcommodity>
  </facility>
