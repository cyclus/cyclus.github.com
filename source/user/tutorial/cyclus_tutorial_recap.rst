Cyclus Tutorial Recap
=====================

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
          <name>u-ore</name>
          <solution_priority>1.0</solution_priority>
        </commodity>
        <commodity>
          <name>fresh-uox</name>
          <solution_priority>1.0</solution_priority>
        </commodity>
        <commodity>
          <name>tails</name>
          <solution_priority>1.0</solution_priority>
        </commodity>
        <commodity>
          <name>spent-uox</name>
          <solution_priority>1.0</solution_priority>
        </commodity>

        <facility>
          <name>UraniumMine</name>
          <config>
            <Source>
              <outcommod>u-ore</outcommod>
            </Source>
          </config>
        </facility>

        <facility>
          <name>EnrichmentPlant</name>
          <config>
            <Enrichment>
              <feed_commod>u-ore</feed_commod>
              <feed_recipe>nat-u</feed_recipe>
              <product_commod>fresh-uox</product_commod>
              <tails_commod>tails</tails_commod>
              <max_feed_inventory>1000000</max_feed_inventory>
            </Enrichment>
          </config>
        </facility>

        <facility>
          <name>1178MWe BRAIDWOOD-1</name>
          <config>
            <Reactor>
              <fuel_incommods> <val>fresh-uox</val> </fuel_incommods>
              <fuel_inrecipes> <val>fresh-uox</val> </fuel_inrecipes>
              <fuel_outcommods> <val>spent-uox</val> </fuel_outcommods>
              <fuel_outrecipes> <val>spent-uox</val> </fuel_outrecipes>
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
                <val>spent-uox</val>
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
                <prototype>1178MWe BRAIDWOOD-1</prototype>
                <number>1</number>
              </entry>
              </initialfacilitylist>
            <name>Exelon Reactors</name>
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
      <name>nat-u</name>
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
      <name>fresh-uox</name>
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
      <name>spent-uox</name>
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

::

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
          <name>u-ore</name>
          <solution_priority>1.0</solution_priority>
        </commodity>
        <commodity>
          <name>fresh-uox</name>
          <solution_priority>1.0</solution_priority>
        </commodity>
        <commodity>
          <name>tails</name>
          <solution_priority>1.0</solution_priority>
        </commodity>
        <commodity>
          <name>spent-uox</name>
          <solution_priority>1.0</solution_priority>
        </commodity>

        <facility>
          <name>UraniumMine</name>
          <config>
            <Source>
              <outcommod>u-ore</outcommod>
            </Source>
          </config>
        </facility>

        <facility>
          <name>EnrichmentPlant</name>
          <config>
            <Enrichment>
              <feed_commod>u-ore</feed_commod>
              <feed_recipe>nat-u</feed_recipe>
              <product_commod>fresh-uox</product_commod>
              <tails_commod>tails</tails_commod>
              <max_feed_inventory>1000000</max_feed_inventory>
            </Enrichment>
          </config>
        </facility>

        <facility>
          <name>1178MWe BRAIDWOOD-1</name>
          <config>
            <Reactor>
              <fuel_incommods> <val>fresh-uox</val> </fuel_incommods>
              <fuel_inrecipes> <val>fresh-uox</val> </fuel_inrecipes>
              <fuel_outcommods> <val>spent-uox</val> </fuel_outcommods>
              <fuel_outrecipes> <val>spent-uox</val> </fuel_outrecipes>
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
          <name>1000We Lightwater-1</name>
          <lifetime>360</lifetime>
          <config>
            <Reactor>
              <fuel_incommods> <val>fresh-uox</val> </fuel_incommods>
              <fuel_inrecipes> <val>fresh-uox</val> </fuel_inrecipes>
              <fuel_outcommods> <val>spent-uox</val> </fuel_outcommods>
              <fuel_outrecipes> <val>spent-uox</val> </fuel_outrecipes>
              <cycle_time>15</cycle_time>
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
                <val>spent-uox</val>
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
                <prototype>1178MWe BRAIDWOOD-1</prototype>
                <number>1</number>
              </entry>
              <entry>
                <prototype>1000We Lightwater-1</prototype>
                <number>1</number>
              </entry>
            </initialfacilitylist>
            <name>Exelon Reactors</name>
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
      <name>nat-u</name>
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
      <name>fresh-uox</name>
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
      <name>spent-uox</name>
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

Separations Input
-----------------

::

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
          <name>u-ore</name>
          <solution_priority>1.0</solution_priority>
      </commodity>
      <commodity>
          <name>fresh-uox</name>
          <solution_priority>1.0</solution_priority>
      </commodity>
      <commodity>
          <name>tails</name>
          <solution_priority>1.0</solution_priority>
      </commodity>
      <commodity>
          <name>spent-uox</name>
          <solution_priority>1.0</solution_priority>
      </commodity>
      <commodity>
          <name>used-mox-fuel</name>
          <solution_priority>1.0</solution_priority>
      </commodity>
      <commodity>
            <name>fresh-mox</name>
            <solution_priority>1.0</solution_priority>
      </commodity>


        <facility>
          <name>UraniumMine</name>
          <config>
            <Source>
              <outcommod>u-ore</outcommod>
            </Source>
          </config>
        </facility>

        <facility>
          <name>EnrichmentPlant</name>
          <config>
            <Enrichment>
              <feed_commod>u-ore</feed_commod>
              <feed_recipe>nat-u</feed_recipe>
              <product_commod>fresh-uox</product_commod>
              <tails_commod>tails</tails_commod>
              <max_feed_inventory>1000000</max_feed_inventory>
            </Enrichment>
          </config>
        </facility>

        <facility>
          <name>1178MWe BRAIDWOOD-1</name>
          <config>
            <Reactor>
              <fuel_incommods> <val>fresh-uox</val> </fuel_incommods>
              <fuel_inrecipes> <val>fresh-uox</val> </fuel_inrecipes>
              <fuel_outcommods> <val>spent-uox</val> </fuel_outcommods>
              <fuel_outrecipes> <val>spent-uox</val> </fuel_outrecipes>
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
          <name>1000MWe Lightwater-1</name>
          <lifetime>360</lifetime>
          <config>
            <Reactor>
              <fuel_incommods> <val>fresh-uox</val> </fuel_incommods>
              <fuel_inrecipes> <val>fresh-uox</val> </fuel_inrecipes>
              <fuel_outcommods> <val>spent-uox</val> </fuel_outcommods>
              <fuel_outrecipes> <val>spent-uox</val> </fuel_outrecipes>
              <cycle_time>15</cycle_time>
              <refuel_time>1</refuel_time>
              <assem_size>33000</assem_size>
              <n_assem_core>3</n_assem_core>
              <n_assem_batch>1</n_assem_batch>
              <power_cap>1000</power_cap>
            </Reactor>
          </config>
        </facility>

        <facility>
          <name>uox-mox-reprocessing</name>
          <config>
            <Separations>
               <feed_commods>
                 <!--val>used-mox-fuel</val-->
                 <val>spent-uox</val>
               </feed_commods>
               <feed_commod_prefs>
                 <!--val>1.0</val-->
                 <val>1.0</val>
               </feed_commod_prefs>
               <feedbuf_size>1E100</feedbuf_size>
               <throughput>1E100</throughput>
               <leftover_commod>separated-waste</leftover_commod>
               <streams>
                <item>
                  <commod>separated-fissile</commod>
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
                <val>u-ore</val>
              </fill_commods>
              <fill_recipe>nat-u</fill_recipe>
              <fill_size>1e+60</fill_size>
              <fiss_commod_prefs>
                <val>1</val>
              </fiss_commod_prefs>
              <fiss_commods>
                <val>separated-fissile</val>
              </fiss_commods>
              <fiss_size>5e+4</fiss_size>
              <outcommod>fresh-mox</outcommod>
              <spectrum>thermal</spectrum>
              <throughput>1e+60</throughput>
            </FuelFab>
          </config>
          <name>uox-mox-fuel-fab</name>
        </facility>

        <facility>
          <name>1000MWe ALWR-1</name>
          <lifetime>360</lifetime>
          <config>
            <Reactor>
              <fuel_incommods>
                <val>fresh-uox</val>
                <val>fresh-mox</val>
              </fuel_incommods>
              <fuel_inrecipes>
                <val>fresh-uox</val>
                <val>fresh-uox</val>
              </fuel_inrecipes>
              <fuel_prefs>
                <val>1.0</val>
                <val>2.0</val>
              </fuel_prefs>
              <fuel_outcommods>
                <val>spent-uox</val>
                <val>used-mox-fuel</val>
              </fuel_outcommods>
              <fuel_outrecipes>
                <val>spent-uox</val>
                <val>used-mox</val>
              </fuel_outrecipes>
              <cycle_time>18</cycle_time>
              <refuel_time>1</refuel_time>
              <assem_size>33000</assem_size>
              <n_assem_core>3</n_assem_core>
              <n_assem_batch>1</n_assem_batch>
              <power_cap>1100</power_cap>
            </Reactor>
          </config>
        </facility>


        <facility>
          <name>NuclearRepository</name>
          <config>
            <Sink>
              <in_commods>
                <val>spent-uox</val>
                <val>tails</val>
                <val>separated-waste</val>
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
                <prototype>1178MWe BRAIDWOOD-1</prototype>
                <number>1</number>
              </entry>
              <entry>
                <prototype>1000MWe Lightwater-1</prototype>
                <number>1</number>
              </entry>
              <entry>
                <prototype>1000MWe ALWR-1</prototype>
                <number>1</number>
              </entry>
            </initialfacilitylist>
            <name>Exelon Reactors</name>
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
                <prototype>uox-mox-reprocessing</prototype>
                <number>1</number>
              </entry>
              <entry>
                <prototype>uox-mox-fuel-fab</prototype>
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
      <name>nat-u</name>
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
      <name>fresh-uox</name>
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
      <name>used-mox</name>
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
      <name>spent-uox</name>
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
