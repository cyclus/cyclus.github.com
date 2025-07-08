Adding a Stream Mixing Fuel Fabrication Facility
==================================================

The cycamore FuelFab archetype uses the _equivalence method_ to mix streams of
fissile material with so-called "filler" material in an attempt to match 
neutronics of the
requested material. More details about the archetype and the state
variables are in the 
`cycamore archetype documentation
<../cycamoreagents.html>`_ page.

The following is the input template for the ``Cycamore::FuelFab``
archetype:

.. code-block:: XML

  <facility>
    <name>FuelFab</name>
    <config>
      <FuelFab>
        <fill_commods> 
            <val>_______</val> 
        </fill_commods>
        <fill_recipe>_______</fill_recipe>
        <fill_size>_______</fill_size>
        <fiss_commods>
            <val>_______</val>
        </fiss_commods>
        <fiss_size>_______</fiss_size>
        <spectrum>_______</spectrum>
        <outcommod>_______</outcommod>
        <throughput>_______</throughput>
      </FuelFab>
    </config>
  </facility>


The following configuration will be for a
MOX fuel fabrication plant that mixes separated 
plutonium and natural uranium into MOX fuel:

* Filler stream commodity: ``u_ore``
* Filler stream recipe: ``nat_u``
* Filler stream inventory capacity: 1000 tonnes
* Fissile stream commodity: Separated_Fissile
* Fissile stream inventory capacity: 5 tonnes
* Output Commodity: Fresh_MOX_Fuel
* Maximum Throughput: 2 tonnes/timestep
* Specturm type: "thermal"

Filling in the template, the input block looks like:

.. code-block:: XML

  <facility>
    <name>FuelFab</name>
    <config>
      <FuelFab>
        <fill_commods> <val>u_ore</val> </fill_commods>
        <fill_recipe>nat_u</fill_recipe>
        <fill_size>1000000</fill_size>
        <fiss_commods><val>Separated_Fissile</val></fiss_commods>
        <fiss_size>5000</fiss_size>
        <spectrum>thermal</spectrum>
        <outcommod>Fresh_MOX_Fuel</outcommod>
        <throughput>2000</throughput>
      </FuelFab>
    </config>
  </facility>
