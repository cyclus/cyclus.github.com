
GrowthRegion
============

The GrowthRegion module tracks the supply and demand for commodities.
When demand is greater than supply, it then orders new facilities to
be built based on their cost and capacity to produce a supply.

Input Parameters
----------------

  * commodities - the commodities that the region tracks for supply 
    and demand

    * name - the name of a commodity
    * demand - the demand function(s) for a commodity
    
      * type - the type of function (e.g. linear, exponential, 
        piecewise)
      * parameters - the parameters to define the function
      * `optional` start_time - the time the this demand function will
        be applied

Definiton
+++++++++

.. code-block:: xml

  <!-- GrowthRegion -->  
  <define name="GrowthRegion">
    <element name="GrowthRegion">
      
      <!-- Commodity Requirements -->
      <oneOrMore>
        <element name = "commodity">
          
          <element name = "name">
            <text/>
          </element>

          <oneOrMore>
            <element name = "demand">
              <element name="type">
                <text/>
              </element>
              <element name="parameters">
                <text/>
              </element>
              <optional>
                <element name="start_time">
                  <data type="nonNegativeInteger"/>
                </element>
              </optional>
            </element>
          </oneOrMore>

        </element>
      </oneOrMore>
      <!-- end Commodity Requirements -->

    </element>
  </define>
  <!-- end GrowthRegion -->  

Example
+++++++

.. code-block:: xml

  <region>
    <name>SingleRegion</name>
    <allowedfacility>Source</allowedfacility>
    <allowedfacility>Sink</allowedfacility>
    <model>
      <GrowthRegion>
        <commodity>
          <name>fuel</name>                     <!-- there is a demand for fuel in this region -->
          <demand>                              <!-- see the doxygen documentation for SymbolicFunctions -->
            <type>linear</type>                 <!-- the demand is linear -->
            <parameters>0 1</parameters>        <!-- the slope is 0 and intercept is 1 -->
            <start_time>1</start_time>          <!-- the demand starts at time t = 1 -->
          </demand> 
        </commodity>
      </GrowthRegion>
    </model>
    <institution>
    ...
    </institution>
  </region>
