
.. code-block:: XML

  <simulation>
    <control>
      <duration>720</duration>
      <startmonth>1</startmonth>
      <startyear>2018</startyear>
      <decay>never</decay>
    </control>


    <archetypes>
      <spec>
        <lib>cycamore</lib>
        <name>Enrichment</name>
      </spec>
      <spec>
        <lib>cycamore</lib>
        <name>Reactor</name>
      </spec>
      <spec>
        <lib>cycamore</lib>
        <name>Source</name>
      </spec>
      <spec>
        <lib>cycamore</lib>
        <name>Sink</name>
      </spec>
      <spec>
        <lib>agents</lib>
        <name>NullRegion</name>
      </spec>
      <spec>
        <lib>agents</lib>
        <name>NullInst</name>
      </spec>
    </archetypes>


    <commodity>
        <name>u_ore</name>
        <solution_priority>1.0</solution_priority>
      </commodity>
      <commodity>
        <name>fresh_uox</name>
        <solution_priority>1.0</solution_priority>
      </commodity>
      <commodity>
        <name>tails</name>
        <solution_priority>1.0</solution_priority>
      </commodity>
      <commodity>
        <name>spent_uox</name>
        <solution_priority>1.0</solution_priority>
    </commodity>

    <recipe>
      <name>nat_u</name>
      <basis>mass</basis>
      <nuclide>
        <id>92235</id>
        <comp>0.00711</comp>
      </nuclide>
      <nuclide>
        <id>92238</id>
        <comp>0.99289</comp>
      </nuclide>
    </recipe>

    <recipe>
      <name>fresh_uox</name>
      <basis>mass</basis>
      <nuclide>
        <id>92235</id>
        <comp>0.04</comp>
      </nuclide>
      <nuclide>
        <id>92238</id>
        <comp>0.96</comp>
      </nuclide>
    </recipe>

    <recipe>
      <name>spent_uox</name>
      <basis>mass</basis>
      <nuclide>
        <id>92235</id>
        <comp>0.011</comp>
      </nuclide>
      <nuclide>
        <id>92238</id>
        <comp>0.94</comp>
      </nuclide>
      <nuclide>
        <id>94239</id>
        <comp>0.009</comp>
      </nuclide>
      <nuclide>
        <id>55137</id>
        <comp>0.04</comp>
      </nuclide>
    </recipe>


  <facility>
    <name>UraniumMine</name>
    <config>
      <Source>
        <outcommod>u_ore</outcommod>
      </Source>
    </config>
  </facility>
  
  <facility>
    <name>EnrichmentPlant</name>
    <config>
      <Enrichment>
        <feed_commod>u_ore</feed_commod>
        <feed_recipe>nat_u</feed_recipe>
        <product_commod>fresh_uox</product_commod>
        <tails_commod>tails</tails_commod>
        <max_feed_inventory>1000000</max_feed_inventory>
      </Enrichment>
    </config>
  </facility>
  
  <facility>
    <name>1178MWe BRAIDWOOD_1</name>
    <config>
      <Reactor>
        <fuel_incommods> <val>fresh_uox</val> </fuel_incommods>
        <fuel_inrecipes> <val>fresh_uox</val> </fuel_inrecipes>
        <fuel_outcommods> <val>spent_uox</val> </fuel_outcommods>
        <fuel_outrecipes> <val>spent_uox</val> </fuel_outrecipes>
        <cycle_time>18</cycle_time>
        <refuel_time>1</refuel_time>
        <assem_size>33000</assem_size>
        <n_assem_core>3</n_assem_core>
        <n_assem_batch>1</n_assem_batch>
        <power_cap>1178</power_cap>
      </Reactor>
    </config>
  </facility>

  <facility>
    <name>NuclearRepository</name>
    <config>
      <Sink>
        <in_commods>
          <val>spent_uox</val>
          <val>tails</val>
        </in_commods>
      </Sink>
    </config>
  </facility>


  <region>
    <name>USA</name>
    <config>
      <NullRegion/>
    </config>
    <institution>
      <initialfacilitylist>
        <entry>
          <prototype>1178MWe BRAIDWOOD_1</prototype>
          <number>1</number>
        </entry>
        </initialfacilitylist>
      <name>Exelon</name>
      <config>
        <NullInst/>
      </config>
    </institution>

    <institution>
      <initialfacilitylist>
        <entry>
          <prototype>UraniumMine</prototype>
          <number>1</number>
        </entry>
        <entry>
          <prototype>EnrichmentPlant</prototype>
          <number>1</number>
        </entry>
        <entry>
          <prototype>NuclearRepository</prototype>
          <number>1</number>
        </entry>
      </initialfacilitylist>
      <name>United States Nuclear</name>
      <config>
        <NullInst/>
      </config>
    </institution>
  </region>

  </simulation>
