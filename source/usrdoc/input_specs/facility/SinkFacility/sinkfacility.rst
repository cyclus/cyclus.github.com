
SinkFacility
============

The SinkFacility module accepts material in a given set of 
commodities. 

Input Parameters
----------------

  * commodities - a set of commodities which can be accepted by this
    facility
  * `optional` input_capacity - a maximum amount of material that can
    be accepted for any given time step
  * `optional` inventorysize - the maximum amount of material that can
    be stored at this facility

Definiton
+++++++++

.. code-block:: xml

  <define name="SinkFacility">
     <element name="SinkFacility"> 
       <element name ="input">
         <element name = "commodities">
           <ref name="incommodity"/>
         </element>         
          <optional>
           <ref name="input_capacity"/>
         </optional>
         <optional>
           <ref name="inventorysize"/>
         </optional>
       </element>
     </element>
  </define>

Example
+++++++

.. code-block:: xml
  
  <facility>
    <name>Sink</name>
    <model>
      <SinkFacility>
	<input>
	  <commodities>
	    <incommodity>used_fuel</incommodity>  <!-- this SinkFacility stores used fuel -->
	  </commodities>
	  <input_capacity>1</input_capacity>      <!-- it can take at most 1 kg per time step -->
	  <inventorysize>100</inventorysize>      <!-- it can store up to 100 kg -->
	</input>
      </SinkFacility>
    </model>
    <incommodity>used_fuel</incommodity>
  </facility>
