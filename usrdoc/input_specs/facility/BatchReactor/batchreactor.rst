
BatchReactor
============

The BatchReactor module is a `relatively` simple model of a reactor. 
It acts in batch mode, i.e. it replaces a prescribed percentage of its
core at a prescribed frequency. The input and output material recipes
(isotopics) are predefined. The input and output material quantities 
are also predefined.

Input Parameters
----------------

  * fuel_input - information about the fuel consumed by this reactor

    * incommodity - the input commodity name
    * inrecipe - the input recipe (isotopics

  * fuel_output - information about the used fuel output by this 
    reactor

    * outcommodity - the output commodity name
    * outrecipe - the output recipe (isotopics)

  * cyclelength - the number of time steps the reactor is operational
    before refueling
  * refueldelay - the number of time steps the reactor must be offline
    in order to be refuel 
  * incoreloading - the quantity of core material when entering the 
    reactor
  * outcoreloading - the quantity of core material when exiting the
    reactor
  * batchespercore - the number of batches comprising a full core
  * commodity_production - information about the power produced by the
    reactor

    * commodity - the name of the produced commodity, e.g. power
    * capacity - the nameplate capacity for the power produced
    * cost - the cost to produce this capacity (by default, this 
      should be equal to the capacity)

Definiton
+++++++++

.. code-block:: xml

  <define name="BatchReactor">
     <element name="BatchReactor"> 

       <!-- Material In/Out  -->
       <element name="fuel_input">
         <ref name="incommodity"/>
         <ref name="inrecipe"/>
       </element>
       <element name="fuel_output">
         <ref name="outcommodity"/>
         <ref name="outrecipe"/>
       </element>

        <!-- Facility Parameters -->
        <element name="cyclelength">
          <data type="nonNegativeInteger"/>
        </element>
        <optional>
          <element name ="refueldelay">
            <data type="nonNegativeInteger"/>
          </element>
        </optional>
        <element name ="incoreloading">
          <data type="double"/>
        </element>
        <optional>
          <element name ="outcoreloading">
            <data type="double"/>
          </element>
        </optional>
        <element name="batchespercore">
          <data type="nonNegativeInteger"/>
        </element>

       <!-- Power Production  -->
       <element name="commodity_production">
         <element name="commodity">
           <data type="string"/>
         </element>
         <element name="capacity">
           <data type="double"/>
         </element>
         <element name="cost">
           <data type="double"/>
         </element>
       </element>

     </element>
  </define>

Example
+++++++

.. code-block:: xml

  <facility>
    <name>Reactor</name>
    <model>
      <BatchReactor>
        <fuel_input>                                <!-- this reactor takes as input enriched uranium -->
         <incommodity>enriched_u</incommodity>
         <inrecipe>fuel_recipe</inrecipe>
        </fuel_input>
        <fuel_output>
         <outcommodity>used_fuel</outcommodity>     <!-- this reactor outputs used fuel -->
         <outrecipe>used_fuel_recipe</outrecipe>
        </fuel_output>
        <cyclelength>10</cyclelength>               <!-- this reactor operates on a year-long cycle, in operation for 10 months -->
        <coreloading>2</coreloading>                <!-- and refueling for 2 -->
        <batchespercore>4</batchespercore>          <!-- this reactor has a 4-batch core -->
        <commodity_production>
          <commodity>power</commodity>              <!-- this reactor produces power -->
          <capacity>1000</capacity>                 <!-- at 1000 MWe -->
          <cost>1000</cost>                         <!-- by default the cost is 1000 -->
        </commodity_production>
      </BatchReactor>
    </model>
    <incommodity>enriched_u</incommodity>
    <outcommodity>waste</outcommodity>
  </facility>
