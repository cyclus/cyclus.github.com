Adding a second reactor
=======================

Simple simulations can easily be expanded into more complex problems. To demonstrate this, 
we will now add a second reactor, ``1000We Lightwater_1``, to our
simulation. This reactor will have a lifetime of 360 months (30 years),
cycle time of 12 months, assembly size of 30160 kg, and power capacity 1000
MWe. Using this information, let's construct the facility input section
of this reactor.

Activity: Second Reactor
++++++++++++++++++++++++

Using the reactor facility archetype and the table below, create the reactor
prototype.

+-----------------------+---------------------------+
| Variable              | Value                     |
+=======================+===========================+
| ``name``              | ``1000We Lightwater_1``   |
+-----------------------+---------------------------+
| ``lifetime``          | ``360``                   |
+-----------------------+---------------------------+
| ``Archetype``         | ``Reactor``               |
+-----------------------+---------------------------+
| ``fuel_incommods``    | ``fresh_uox``             |
+-----------------------+---------------------------+
| ``fuel_inrecipes``    | ``fresh_uox``             |
+-----------------------+---------------------------+
| ``fuel_outcommods``   | ``spent_uox``             |
+-----------------------+---------------------------+
| ``fuel_outrecipes``   | ``spent_uox``             |
+-----------------------+---------------------------+
| ``cycle_time``        | ``12``                    |
+-----------------------+---------------------------+
| ``refuel_time``       | ``1``                     |
+-----------------------+---------------------------+
| ``assem_size``        | ``30160``                 |
+-----------------------+---------------------------+
| ``n_assem_core``      | ``3``                     |
+-----------------------+---------------------------+
| ``n_assem_batch``     | ``1``                     |
+-----------------------+---------------------------+
| ``power_cap``         | ``1000``                  |
+-----------------------+---------------------------+

Once complete, your reactor prototype should look like:

.. code-block:: xml

  <facility>
    <name>1000We Lightwater_1</name>
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

Append this prototype right after the ``1178MWe BRAIDWOOD_1`` prototype.

Activity: Second reactor Institution
++++++++++++++++++++++++++++++++++++

We must add this second reactor into the region and facility section of
our |Cyclus| input file. To do so, go to the ``entry`` header under the
``initialfacilitylist`` section of the region block of the input file
and add

.. code-block:: xml

  <entry>
    <prototype>1000We Lightwater_1</prototype>
    <number>1</number>
  </entry>

below the ``1178MWe BRAIDWOOD_1`` entry block. The Reactor section
of the region block should now look like,

.. code-block:: xml

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
              <prototype>1000We Lightwater_1</prototype>
              <number>1</number>
            </entry>
          </initialfacilitylist>
          <name>Exelon Reactors</name>
          <config>
            <NullInst/>
          </config>
        </institution>


    </region>

Note: the blank space between ``</institution>`` and ``</region>`` is
for additional institutions in the future.

Save your input file as input_file2.xml and run the |Cyclus| simulation.
If your simulation runs into errors, sample files can be found `here 
<https://doi.org/10.5281/zenodo.4557613>`_ under ``input_secondreactor.xml`` 
or ``ouput_secondreactor.sqlite``.
