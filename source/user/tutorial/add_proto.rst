Understanding Prototypes
------------------------

One key feature of |Cyclus| is its ability to switch between
different models of the facilities within the fuel cycle. These models,
called **archetypes**, may change how the facility interacts with other
facilities or how the physics of the facility are represented. For
example, reactor archetypes determine the reactor's fresh and spent fuel
compositions and how the reactor experiences fuel burn-up. A reactor
model can have three varying fidelity levels:

* A very simple model that uses recipe to deplete fuel
* A more complex model may tabulate reactor performance and
  physics parameters, and interpolate its input and output recipes.
* The most complex model could perform a full depletion calculation each time
  new fuel enters the reactor.

A simple set of archetypes have been created in `Cycamore <http://fuelcycle.org/user/cycamoreagents.html>`__. 
While the archetype describes the form of the model used to represent a
facility, a variety of parameters are generally available to configure the
specific behavior.   For the example of a reactor, the developer will probably
allow the user to define the power level of the reactor, independent of the
specific model chosen to represent the behavior of the model.  Other common
reactor parameters are fuel loading parameters such as cycle length and batch
size.

In |Cyclus|, when an archetype has been configured with a
specific set of parameters, it is called a **prototype**.

Example: Source Prototype
+++++++++++++++++++++++++
The Source facility acts as a source of material with a fixed throughput (per 
time step) capacity and a lifetime capacity defined by a total inventory size. 
It offers its material as a single commodity. If a composition recipe is 
specified, it provides that single material composition to requesters. If 
unspecified, the source provides materials with the exact requested compositions. 
The inventory size and throughput both default to infinite. Supplies material 
results in corresponding decrease in inventory, and when the inventory size 
reaches zero, the source can provide no more material.

The Source archetype is of the form:

.. code-block:: XML

  <facility>
    <name>Source</name>
    <config>
      <Source>
        <outcommod>out_commodity</outcommod>
      </Source>
    </config>
  </facility>

Optional parameters:

outrecipe: 
    Name of the isotopic composition of the material that this source provides 
    regardless of the requested composition. If empty, the Source creates and 
    provides whatever composition is requested.

.. code-block:: XML

        <outrecipe>[outrecipe]</outrecipe>



inventory_size: default = 1e+299, range: [0.0, 1e+299]
    Total amount of material this source has remaining. Every trade decreases 
    this value by the supplied material quantity. When it reaches zero, the 
    source cannot provide any more material.

.. code-block:: xml

        <inventory_size>[double ( kg )]</inventory_size>

throughput: default=1e+299,range: [0.0, 1e+299]
    Amount (kg) of the commodity that the Source can supply at each time step

.. code-block:: xml

        <throughput>[double ( kg/(time step) )]</throughput>

Activity: Configure the Source prototype
++++++++++++++++++++++++++++++++++++++++
Our source, ``UraniumMine``, will provide the natural uranium ore for our enrichment facility.
This facility takes two inputs, ``name`` and ``outcommd``. Using the Source 
Archetype and the table below, create the UraniumMine prototype.

+-----------------------+---------------------------+
| Variable              | Value                     |
+=======================+===========================+
| ``name``              | ``UraniumMine``           |
+-----------------------+---------------------------+
| ``Archetype``         | ``Source``                |
+-----------------------+---------------------------+
| ``out_commod``        | ``u_ore``                 |
+-----------------------+---------------------------+

1. The template for the Source archetype is of the form:

.. code-block:: XML

  <facility>
    <name>name</name>
    <config>
      <Archetype>
        <outcommod>outcommod</outcommod>
      </Source>
    </config>
  </facility>

2. Filling in the variables ``name``, ``Archetype``, and ``out_commod`` as 
``UraniumMine``, ``Source``, and ``fresh_uox`` leads to:

.. code-block:: XML

  <facility>
    <name>UraniumMine</name>
    <config>
      <Source>
        <outcommod>u_ore</outcommod>
      </Source>
    </config>
  </facility>

Once complete, append this facility under the commodity section and before the recipe section of your input file [#f1]_.

Example: Enrichment Prototype
+++++++++++++++++++++++++++++
The Enrichment facility is a simple agent that enriches natural uranium in a |Cyclus| simulation. It does not 
explicitly compute the physical enrichment process, rather it calculates the SWU required to convert an 
incoming isotopic vector (i.e. natural uranium) into a requested enriched recipe (i.e. 4% enriched uranium), 
given the natural uranium inventory constraint and its SWU capacity constraint.
The Enrichment archetype is of the form:

.. code-block:: XML

      <facility>
        <name>EnrichmentPlant</name>
        <config>
          <Enrichment>
            <feed_commod>feed_commodity</feed_commod>
            <feed_recipe>feed_recipe</feed_recipe>
            <product_commod>product_commodity</product_commod>
            <tails_commod>tails_commodity</tails_commod>
          </Enrichment>
        </config>
      </facility>

Optional parameters:

max_feed_inventory: default = 1e+299, range: [0.0, 1e+299]
  Maximum total inventory of natural uranium in the enrichment facility (kg)

.. code-block:: XML

          <max_feed_inventory>1000000</max_feed_inventory> 

tails_assay: default=0.003, range: [0.0, 0.003]
  Tails assay from the enrichment process

.. code-block:: XML

          <tails_assay>[double]</tails_assay> 

initial_feed: default = 0
  Amount of natural uranium stored at the enrichment facility at the beginning of the simulation (kg)

.. code-block:: XML

          <initial_feed>[double]</initial_feed> 

max_enrich: default = 1.0, range: [0.0,1.0]
  maximum allowed weight fraction of U235 in product

.. code-block:: XML
     
          <max_enrich>[double]</max_enrich> 

order_prefs: default = 1, userlevel: 10
  Turn on preference ordering for input material so that EF chooses higher U235 content first

.. code-block:: XML

          <order_prefs>[boolean]</order_prefs> 

swu_capacity: default = 1e+299, range: [0.0, 1e+299]
  Separative work unit (SWU) capacity of enrichment facility (kgSWU/timestep)

.. code-block:: XML

          <swu_capacity>[double]</swu_capacity> 

Activity: Creating the Enrichment Prototype
+++++++++++++++++++++++++++++++++++++++++++
The enrichment facility, ``EnrichmentPlant`` will intake the natural ``u_ore`` 
from ``UraniumMine`` and create ``fresh_uox`` and ``tails`` as its products.
The template for the Enrichment archetype is of the form:

.. code-block:: XML

  <facility>
    <name>enrichment_plant_name</name>
    <config>
      <Archetype>
        <feed_commod>feed_commodity</feed_commod>
        <feed_recipe>feed_recipe</feed_recipe>
        <product_commod>product_commodity</product_commod>
        <tails_commod>tails_commodity</tails_commod>
        <max_feed_inventory>1000000</max_feed_inventory>
      </Archetype>
    </config>
  </facility>

Using the template above and the table below, generate the input enrichment facility prototype.

+-------------------------+---------------------------+
| Variable                | Value                     |
+=========================+===========================+
| ``name``                | ``EnrichmentPlant``       |
+-------------------------+---------------------------+
| ``Archetype``           | ``Enrichment``            |
+-------------------------+---------------------------+
| ``feed_commod``         | ``u_ore``                 |
+-------------------------+---------------------------+
| ``feed_recipe``         | ``nat_u``                 |
+-------------------------+---------------------------+
| ``product_commod``      | ``fresh_uox``             |
+-------------------------+---------------------------+
| ``tails_commod``        | ``tails``                 |
+-------------------------+---------------------------+
| ``max_feed_inventory``  | 1000000                   |
+-------------------------+---------------------------+


After filling in these variables, your enrichment facility prototype will look like:

.. code-block:: XML

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

Once complete, append this facility under the Source prototype of your input file [#f1]_.


Example: Reactor Prototype
++++++++++++++++++++++++++
The Reactor is a simple, general reactor based on static compositional transformations to model fuel burnup. 
The user specifies a set of fresh fuel compositions the Reactor accepts and corresponding spent fuel 
compositions the reactor discharges from the core. No incremental transmutation takes place. Rather, 
at the end of an operational cycle, the batch being discharged from the core is instantaneously transmuted 
from its original fresh fuel composition into its spent fuel form.

Each fuel is identified by a specific input commodity and has an associated input recipe (nuclide composition), 
output recipe, output commodity, and preference. The preference identifies which input fuels are preferred 
when requesting. Changes in these preferences can be specified as a function of time using the pref_change
variables. Changes in the input-output recipe compositions can also be specified as a function of time using 
the recipe_change variables.

The reactor treats fuel as individual assemblies. Fuel is requested in assembly-sized quanta. If real-world
assembly modeling is unnecessary, parameters can be adjusted (e.g. ``n_assem_core``, ``assem_size``, 
``n_assem_batch``). At the end of every cycle, a full batch is discharged from the core consisting of
``n_assem_batch`` assemblies of ``assem_size`` kg. The reactor also has a specifiable refueling time 
period following the end of each cycle at the end of which it will resume operation on the next cycle if it 
has enough fuel for a full core; otherwise it waits until it has enough fresh fuel assemblies.
When the reactor reaches the end of its lifetime, it will discharge all material from its core and trade away all its 
spent fuel as quickly as possible. Full decommissioning will be delayed until all spent fuel is gone. If the reactor 
has a full core when it is decommissioned (i.e. is mid-cycle) when the reactor is decommissioned, half (rounded 
up to nearest int) of its assemblies are transmuted to their respective burnt compositions.
The Reactor archetype is of the form:

.. code-block:: XML

  <facility>
    <name>reactor_name</name>
    <config>
      <Reactor>
        <fuel_incommods> 
            <val>input_fuel_commodity</val> 
        </fuel_incommods>
        <fuel_inrecipes> 
            <val>input_fuel_recipe</val> 
        </fuel_inrecipes>
        <fuel_outcommods> 
            <val>output_fuel_commodity</val> 
        </fuel_outcommods>
        <fuel_outrecipes> 
            <val>output_fuel_recipe</val> 
        </fuel_outrecipes>
        <cycle_time>18</cycle_time>
        <refuel_time>1</refuel_time>
        <assem_size>33000</assem_size>
        <n_assem_core>3</n_assem_core>
        <n_assem_batch>1</n_assem_batch>
        <power_cap>power_out</power_cap>
      </Reactor>
    </config>
  </facility>


Activity: Creating the Reactor Prototype
++++++++++++++++++++++++++++++++++++++++

Now let's model the reactor this fuel will go through! In this simple example, 
let's model a single PWR in the United States. It has a power capacity of 1178 
MWe, and there is only one of them in the region.
The template for the reactor is given below:

.. code-block:: XML

    <facility>
      <name>Reactor</name>
      <config>
        <Archetype>
          <fuel_incommods> <val>[VALUE]</val> </fuel_incommods>
          <fuel_inrecipes> <val>[VALUE]</val> </fuel_inrecipes>
          <fuel_outcommods> <val>[VALUE]</val> </fuel_outcommods>
          <fuel_outrecipes> <val>[VALUE]</val> </fuel_outrecipes>
          <cycle_time>[VALUE]</cycle_time>
          <refuel_time>[VALUE]</refuel_time>
          <assem_size>[VALUE]</assem_size>
          <n_assem_core>[VALUE]</n_assem_core>
          <n_assem_batch>[VALUE]</n_assem_batch>
          <power_cap>[VALUE]</power_cap>
        </Reactor>
      </config>
    </facility>

Where:

* ``fuel_incommods``: input fuel commodity
* ``fuel_inrecipes``" input fuel recipe
* ``fuel_outcommods``: output fuel commodity
* ``fuel_outrecipes``: output fuel recipe.
* ``cycle_time``: amount of time the reactor operates between refueling outages
* ``refuel_time``: duration of refueling outage
* ``assem_size``" size of a single assembly
* ``n_assem_core`` : number of assemblies in the core
* ``n_assem_batch``: number of batches replaced per refueling.
* ``power_cap``: amount of electricity the reactor generates.

Using the template above and the table below, create the Reactor prototype.

+-----------------------+---------------------------+
| Variable              | Value                     |
+=======================+===========================+
| ``name``              | ``1178MWe BRAIDWOOD_1``   |
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
| ``cycle_time``        | ``18``                    |
+-----------------------+---------------------------+
| ``refuel_time``       | ``1``                     |
+-----------------------+---------------------------+
| ``assem_size``        | ``33000``                 |
+-----------------------+---------------------------+
| ``n_assem_core``      | ``3``                     |
+-----------------------+---------------------------+
| ``n_assem_batch``     | ``1``                     |
+-----------------------+---------------------------+
| ``power_cap``         | ``1178``                  |
+-----------------------+---------------------------+

Once completed, your prototype should look like:

.. code-block:: XML

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

Once complete, append this facility under the Enrichment facility of your input file [#f1]_.


Example: Sink Prototype
+++++++++++++++++++++++

A sink facility that accepts materials and products with a fixed throughput (per time step) capacity and a lifetime 
capacity defined by a total inventory size. The inventory size and throughput capacity both default to infinite. If a 
recipe is provided, it will request material with that recipe. Requests are made for any number of specified 
commodities.
The Sink archetype section is of the form:

.. code-block:: xml

  <facility>
    <name>Sink_name</name>
    <config>
      <Sink>
        <in_commods>
          <val>input_commodity</val>
          <val>input_commodity</val>
        </in_commods>
      </Sink>
    </config>
  </facility>

Optional parameters:

in_commod_prefs: default=[], range: [None, [1e-299, 1e+299]]
  Commodities that the sink facility accepts

.. code-block:: XML

      <in_commod_prefs>
          <val>[double]</val>
          <val>[double]</val>
      </in_commod_prefs>

recipe_name: default=””
  Name of recipe to use for material requests, where the default (empty string) is to accept everything

.. code-block:: XML

      <recipe_name>[inrecipe]</recipe_name>


max_inv_size: default=1e+299, range: [0.0, 1e+299]
  Total maximum inventory size of sink facility

.. code-block:: XML

      <max_inv_size>[double]</max_inv_size>

capacity: default = 1e+299, range: [0.0, 1e+299]
  capacity the sink facility can accept at each time step
  
.. code-block:: XML

      <capacity>[double]</capacity>

Activity: Creating the Sink Prototype
+++++++++++++++++++++++++++++++++++++
Our sink, ``NuclearRepository``, will store the ``spent_uox`` and ``tails`` after
their use in the fuel cycle. Using the Sink Archetype template and the table below,
create the UraniumMine prototype.

+-------------------------+---------------------------+
| Variable                | Value                     |
+=========================+===========================+
| ``name``                | ``NuclearRepository``     |
+-------------------------+---------------------------+
| ``Archetype``           | ``Sink``                  |
+-------------------------+---------------------------+
| ``val``                 | ``spent_uox``             |
+-------------------------+---------------------------+
| ``val``                 | ``tails``                 |
+-------------------------+---------------------------+

The sink facility archetype is:

.. code-block:: XML

  <facility>
    <name>Sink_name</name>
    <config>
      <Archetype>
        <in_commods>
          <val>input_commodity</val>
          <val>input_commodity</val>
        </in_commods>
      </Sink>
    </config>
  </facility>

After filling in these variables, your sink facility prototype will look like:

.. code-block:: XML

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

Once complete, append this facility under the Reactor prototype of your input file [#f1]_.

Check: Complete Facility block
++++++++++++++++++++++++++++++++++++++++

The facility section of your input file should be of the form:

.. code-block:: XML

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

.. rubric:: Footnotes
.. [#f1] The exact order of the sections in a |Cyclus| input file are of minor consequence. The ``control`` sequence must go first, but the other sequences can go in any order that makes sense to the user. The traditional organization  of an input file is: control, archetypes, commodities, facilities,   regions/institutions, and recipes. 
