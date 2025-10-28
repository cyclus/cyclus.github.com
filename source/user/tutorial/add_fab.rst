Adding a Stream Mixing Fuel Fabrication Facility
==================================================

The cycamore FuelFab archetype uses the *equivalence method* to mix streams of
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
            <val>[string]</val> 
        </fill_commods>
        <fill_recipe>[string]</fill_recipe>
        <fill_size>[double]</fill_size>
        <fiss_commods>
            <val>[string]</val>
        </fiss_commods>
        <fiss_size>[double]</fiss_size>
        <spectrum>[string (`fission_spectrum_ave` or `thermal`)]</spectrum>
        <outcommod>[string]</outcommod>
        <throughput>[double]</throughput>
      </FuelFab>
    </config>
  </facility>


The following configuration will be for a
MOX fuel fabrication plant that mixes separated 
plutonium and natural uranium into MOX fuel:

* Filler stream commodity: ``u_ore``
* Filler stream recipe: ``nat_u``
* Filler stream inventory capacity: 1000 tonnes
* Fissile stream commodity: ``Separated_Fissile``
* Fissile stream inventory capacity: 5 tonnes
* Output Commodity: ``fresh_mox``
* Maximum Throughput: 2 tonnes/timestep
* Spectrum type: ``thermal``

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
        <outcommod>fresh_mox</outcommod>
        <throughput>2000</throughput>
      </FuelFab>
    </config>
  </facility>
