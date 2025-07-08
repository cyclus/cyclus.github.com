Cyclus Tutorial Recap
=====================
Below are complete input files for each of the exercises performed in this
tutorial. 


Basic Tutorial Input
--------------------

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

  </simulation>



Add a Second Reactor Input
--------------------------

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
          <name>1000We LIGHTWATER_1</name>
          <lifetime>360</lifetime>
          <config>
            <Reactor>
              <fuel_incommods> <val>fresh_uox</val> </fuel_incommods>
              <fuel_inrecipes> <val>fresh_uox</val> </fuel_inrecipes>
              <fuel_outcommods> <val>spent_uox</val> </fuel_outcommods>
              <fuel_outrecipes> <val>spent_uox</val> </fuel_outrecipes>
              <cycle_time>12</cycle_time>
              <refuel_time>1</refuel_time>
              <assem_size>30160</assem_size>
              <n_assem_core>3</n_assem_core>
              <n_assem_batch>1</n_assem_batch>
              <power_cap>1000</power_cap>
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
              <entry>
                <prototype>1000We LIGHTWATER_1</prototype>
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

  </simulation>

Recycle Input
-----------------

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
          <lib>cycamore</lib>
          <name>FuelFab</name>
        </spec>
        <spec>
          <lib>cycamore</lib>
          <name>Separations</name>
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
      <commodity>
          <name>used_mox_fuel</name>
          <solution_priority>1.0</solution_priority>
      </commodity>
      <commodity>
          <name>fresh_mox</name>
          <solution_priority>1.0</solution_priority>
      </commodity>
      <commodity>
          <name>separated_fissile</name>
          <solution_priority>1.0</solution_priority>
      </commodity>
      <commodity>
          <name>separated_waste</name>
          <solution_priority>1.0</solution_priority>
      </commodity>

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
          <name>1000MWe LIGHTWATER_1</name>
          <lifetime>360</lifetime>
          <config>
            <Reactor>
              <fuel_incommods> <val>fresh_uox</val> </fuel_incommods>
              <fuel_inrecipes> <val>fresh_uox</val> </fuel_inrecipes>
              <fuel_outcommods> <val>spent_uox</val> </fuel_outcommods>
              <fuel_outrecipes> <val>spent_uox</val> </fuel_outrecipes>
              <cycle_time>12</cycle_time>
              <refuel_time>1</refuel_time>
              <assem_size>33000</assem_size>
              <n_assem_core>3</n_assem_core>
              <n_assem_batch>1</n_assem_batch>
              <power_cap>1000</power_cap>
            </Reactor>
          </config>
        </facility>

        <facility>
          <name>uox_mox_reprocessing</name>
          <config>
            <Separations>
               <feed_commods>
                 <val>used_mox_fuel</val>
                 <val>spent_uox</val>
               </feed_commods>
               <feed_commod_prefs>
                 <val>1.0</val>
                 <val>1.0</val>
               </feed_commod_prefs>
               <feedbuf_size>1000e+3</feedbuf_size>
               <throughput>80e+3</throughput>
               <leftover_commod>separated_waste</leftover_commod>
               <streams>
                <item>
                  <commod>separated_fissile</commod>
                  <info>
                    <buf_size>5e+4</buf_size>
                    <efficiencies>
                      <item>
                        <comp>Pu</comp> <eff>.99</eff>
                      </item>
                    </efficiencies>
                  </info>
                </item>
              </streams>
            </Separations>
          </config>
        </facility>

        <facility>
          <config>
            <FuelFab>
              <fill_commods>
                <val>u_ore</val>
              </fill_commods>
              <fill_recipe>nat_u</fill_recipe>
              <fill_size>1000e+3</fill_size>
              <fiss_commod_prefs>
                <val>1</val>
              </fiss_commod_prefs>
              <fiss_commods>
                <val>separated_fissile</val>
              </fiss_commods>
              <fiss_size>5e+4</fiss_size>
              <outcommod>fresh_mox</outcommod>
              <spectrum>thermal</spectrum>
              <throughput>2e+3</throughput>
            </FuelFab>
          </config>
          <name>uox_mox_fuel_fab</name>
        </facility>

        <facility>
          <name>1000MWe ALWR_1</name>
          <lifetime>360</lifetime>
          <config>
            <Reactor>
              <fuel_incommods>
                <val>fresh_uox</val>
                <val>fresh_mox</val>
              </fuel_incommods>
              <fuel_inrecipes>
                <val>fresh_uox</val>
                <val>fresh_uox</val>
              </fuel_inrecipes>
              <fuel_prefs>
                <val>1.0</val>
                <val>2.0</val>
              </fuel_prefs>
              <fuel_outcommods>
                <val>spent_uox</val>
                <val>used_mox_fuel</val>
              </fuel_outcommods>
              <fuel_outrecipes>
                <val>spent_uox</val>
                <val>used_mox</val>
              </fuel_outrecipes>
              <cycle_time>18</cycle_time>
              <refuel_time>1</refuel_time>
              <assem_size>33000</assem_size>
              <n_assem_core>3</n_assem_core>
              <n_assem_batch>1</n_assem_batch>
              <power_cap>1000</power_cap>
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
                <val>separated_waste</val>
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
              <entry>
                <prototype>1000MWe LIGHTWATER_1</prototype>
                <number>1</number>
              </entry>
              <entry>
                <prototype>1000MWe ALWR_1</prototype>
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
              <entry>
                <prototype>uox_mox_reprocessing</prototype>
                <number>1</number>
              </entry>
              <entry>
                <prototype>uox_mox_fuel_fab</prototype>
                <number>1</number>
              </entry>
            </initialfacilitylist>
            <name>United States Nuclear</name>
            <config>
              <NullInst/>
            </config>
          </institution>
        </region>


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
      <name>used_mox</name>
      <basis>mass</basis>
      <nuclide>
        <id>92235</id>
        <comp>0.002</comp>
      </nuclide>
      <nuclide>
        <id>92238</id>
        <comp>0.94</comp>
      </nuclide>
      <nuclide>
        <id>94239</id>
        <comp>0.01</comp>
      </nuclide>
      <nuclide>
        <id>94240</id>
        <comp>0.002</comp>
      </nuclide>
      <nuclide>
        <id>55137</id>
        <comp>0.046</comp>
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


  </simulation>


DeployInst Input
-----------------

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
          <lib>cycamore</lib>
          <name>FuelFab</name>
        </spec>
        <spec>
          <lib>cycamore</lib>
          <name>Separations</name>
        </spec>
        <spec> 
          <lib>cycamore</lib>
          <name>DeployInst</name> 
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
      <commodity>
          <name>used_mox_fuel</name>
          <solution_priority>1.0</solution_priority>
      </commodity>
      <commodity>
          <name>fresh_mox</name>
          <solution_priority>1.0</solution_priority>
      </commodity>
      <commodity>
          <name>separated_fissile</name>
          <solution_priority>1.0</solution_priority>
      </commodity>
      <commodity>
          <name>separated_waste</name>
          <solution_priority>1.0</solution_priority>
      </commodity>

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
          <name>1000MWe LIGHTWATER_1</name>
          <lifetime>360</lifetime>
          <config>
            <Reactor>
              <fuel_incommods> <val>fresh_uox</val> </fuel_incommods>
              <fuel_inrecipes> <val>fresh_uox</val> </fuel_inrecipes>
              <fuel_outcommods> <val>spent_uox</val> </fuel_outcommods>
              <fuel_outrecipes> <val>spent_uox</val> </fuel_outrecipes>
              <cycle_time>12</cycle_time>
              <refuel_time>1</refuel_time>
              <assem_size>33000</assem_size>
              <n_assem_core>3</n_assem_core>
              <n_assem_batch>1</n_assem_batch>
              <power_cap>1000</power_cap>
            </Reactor>
          </config>
        </facility>

        <facility>
          <name>uox_mox_reprocessing</name>
          <config>
            <Separations>
               <feed_commods>
                 <val>used_mox_fuel</val>
                 <val>spent_uox</val>
               </feed_commods>
               <feed_commod_prefs>
                 <val>1.0</val>
                 <val>1.0</val>
               </feed_commod_prefs>
               <feedbuf_size>1000e+3</feedbuf_size>
               <throughput>80e+3</throughput>
               <leftover_commod>separated_waste</leftover_commod>
               <streams>
                <item>
                  <commod>separated_fissile</commod>
                  <info>
                    <buf_size>5e+4</buf_size>
                    <efficiencies>
                      <item>
                        <comp>Pu</comp> <eff>.99</eff>
                      </item>
                    </efficiencies>
                  </info>
                </item>
              </streams>
            </Separations>
          </config>
        </facility>

        <facility>
          <config>
            <FuelFab>
              <fill_commods>
                <val>u_ore</val>
              </fill_commods>
              <fill_recipe>nat_u</fill_recipe>
              <fill_size>1000e+3</fill_size>
              <fiss_commod_prefs>
                <val>1</val>
              </fiss_commod_prefs>
              <fiss_commods>
                <val>separated_fissile</val>
              </fiss_commods>
              <fiss_size>5e+4</fiss_size>
              <outcommod>fresh_mox</outcommod>
              <spectrum>thermal</spectrum>
              <throughput>2e+3</throughput>
            </FuelFab>
          </config>
          <name>uox_mox_fuel_fab</name>
        </facility>

        <facility>
          <name>1000MWe ALWR_1</name>
          <lifetime>360</lifetime>
          <config>
            <Reactor>
              <fuel_incommods>
                <val>fresh_uox</val>
                <val>fresh_mox</val>
              </fuel_incommods>
              <fuel_inrecipes>
                <val>fresh_uox</val>
                <val>fresh_uox</val>
              </fuel_inrecipes>
              <fuel_prefs>
                <val>1.0</val>
                <val>2.0</val>
              </fuel_prefs>
              <fuel_outcommods>
                <val>spent_uox</val>
                <val>used_mox_fuel</val>
              </fuel_outcommods>
              <fuel_outrecipes>
                <val>spent_uox</val>
                <val>used_mox</val>
              </fuel_outrecipes>
              <cycle_time>18</cycle_time>
              <refuel_time>1</refuel_time>
              <assem_size>33000</assem_size>
              <n_assem_core>3</n_assem_core>
              <n_assem_batch>1</n_assem_batch>
              <power_cap>1000</power_cap>
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
                <val>separated_waste</val>
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
              <entry>
                <prototype>1000MWe LIGHTWATER_1</prototype>
                <number>1</number>
              </entry>
              <entry>
                <prototype>1000MWe ALWR_1</prototype>
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
              <entry>
                <prototype>uox_mox_reprocessing</prototype>
                <number>1</number>
              </entry>
              <entry>
                <prototype>uox_mox_fuel_fab</prototype>
                <number>1</number>
              </entry>
            </initialfacilitylist>
            <name>United States Nuclear</name>
            <config>
              <NullInst/>
            </config>
          </institution>
          <institution>
            <name>ExampleInsitution</name>
            <config>
	            <DeployInst>
	              <prototypes>
	                <val>UraniumMine</val>
            	    <val>FuelFab</val>
	                <val>1178MWe BRAIDWOOD_1</val>
	                <val>1000MWe LIGHTWATER_1</val>
	              </prototypes>
	              <build_times>
	                <val>1</val>
	                <val>1</val>
	                <val>2</val>
	                <val>3</val>
    	          </build_times>
	              <n_build>
	                <val>1</val>
  	              <val>1</val>
	                <val>1</val>
	                <val>1</val>
	              </n_build>
	            </DeployInst>
            </config>
          </institution>
        </region>


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
      <name>used_mox</name>
      <basis>mass</basis>
      <nuclide>
        <id>92235</id>
        <comp>0.002</comp>
      </nuclide>
      <nuclide>
        <id>92238</id>
        <comp>0.94</comp>
      </nuclide>
      <nuclide>
        <id>94239</id>
        <comp>0.01</comp>
      </nuclide>
      <nuclide>
        <id>94240</id>
        <comp>0.002</comp>
      </nuclide>
      <nuclide>
        <id>55137</id>
        <comp>0.046</comp>
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


  </simulation>
