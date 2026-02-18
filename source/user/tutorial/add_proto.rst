Understanding Prototypes
------------------------

While the archetype describes the form of the model used to represent a
facility, a variety of parameters are generally available to configure the
specific behavior. For the example of a reactor, the developer will probably
allow the user to define the power level of the reactor, independent of the
specific model chosen to represent the behavior of the model.  Other common
reactor parameters are fuel loading parameters such as cycle length and batch
size.

In |Cyclus|, when an archetype has been configured with a
specific set of parameters, it is called a `prototype <https://fuelcycle.org/basics/glossary.html#term-prototype>`_. You can have multiple prototypes that use the same 
archetype, and you can have multiple deployments of the same prototype in 
a simulation. 

Each archetype will have different input parameters that need to be defined 
for a given prototype, with some of the parameters being optional (i.e., they 
have a default value). Some common input parameters for defining prototypes 
include:

* input/output commodity name: Name of the `commodity <https://fuelcycle.org/basics/glossary.html#term-commodity>`_ that the prototype will request (input) or trade away (output).
* input/output recipe name: Name of the **recipe** or isotopic composition for the input or output commodity. Recipe names used in defining a prototype must be defined in a `recipe block <https://fuelcycle.org/user/tutorial/add_commod_recipe.html#understanding-recipes>`_ of the input file. 
* throughput: The rate at which the process of a facility occurs. Common units are kg/time step, although you should check the archetypes documentation
* buffer size: The size (typically in kg) of an inventory within a prototype. A prototype may have multiple buffers, such as a reactor having an inventory for fresh fuel and one for fuel in the core. 

Example: Source Prototype
+++++++++++++++++++++++++
The Source facility acts as a source of material with a fixed throughput (per 
time step) capacity and a lifetime capacity defined by a total inventory size. 
It offers its material as a single commodity. If a composition recipe is 
specified, it provides that single material composition to requesters. If 
unspecified, the source provides materials with the exact requested compositions. 
The inventory size and throughput both default to infinite. Supplying material 
from an instance of a Source prototype that is deployed in a simulation
results in a corresponding decrease in inventory, and when the inventory size 
reaches zero, the source can provide no more material.

The Source archetype is of the form:

.. code-block:: XML

  <facility>
    <name>Source</name>
    <config>
      <Source>
        <outcommod>[string]</outcommod>
      </Source>
    </config>
  </facility>

Optional parameters:

``outrecipe``: 
    Name of the isotopic composition of the material that this source provides 
    regardless of the requested composition. If provided, 
    the name must match the name of a defined recipe in the 
    simulation. If empty, the Source creates and 
    provides whatever composition is requested.

.. code-block:: XML

        <outrecipe>[string]</outrecipe>



``inventory_size``: default = 1e+299, range: [0.0, 1e+299]
    Total amount of material this source has remaining. Every trade decreases 
    this value by the supplied material quantity. When it reaches zero, the 
    source cannot provide any more material.

.. code-block:: xml

        <inventory_size>[double ( kg )]</inventory_size>

``throughput``: default=1e+299,range: [0.0, 1e+299]
    Amount (kg) of the commodity that the Source can supply at each time step

.. code-block:: xml

        <throughput>[double ( kg/(time step) )]</throughput>

Activity: Configure the Source prototype
++++++++++++++++++++++++++++++++++++++++
Our source, ``UraniumMine``, will provide the natural uranium ore for our enrichment facility.
This facility takes two inputs, ``name`` and ``outcommod``. Using the Source archetype template above and the table below, create the UraniumMine prototype.

+-----------------------+---------------------------+
| Variable              | Value                     |
+=======================+===========================+
| ``name``              | ``UraniumMine``           |
+-----------------------+---------------------------+
| ``out_commodity``       | ``u_ore``                 |
+-----------------------+---------------------------+

Once complete, append this facility under the archetypes section and before the recipe section of your input file [#f1]_.

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
            <feed_commod>[string]</feed_commod>
            <feed_recipe>[string]</feed_recipe>
            <product_commod>[string]</product_commod>
            <tails_commod>[string]</tails_commod>
          </Enrichment>
        </config>
      </facility>

Optional parameters:

``max_feed_inventory``: default = 1e+299, range: [0.0, 1e+299]
  Maximum total inventory of natural uranium in the enrichment facility (kg)

.. code-block:: XML

          <max_feed_inventory>[double (kg)]</max_feed_inventory> 

``tails_assay``: default=0.003, range: [0.0, 0.003]
  Tails assay from the enrichment process

.. code-block:: XML

          <tails_assay>[double]</tails_assay> 

``initial_feed``: default = 0
  Amount of natural uranium stored at the enrichment facility at the beginning of the simulation (kg)

.. code-block:: XML

          <initial_feed>[double]</initial_feed> 

``max_enrich``: default = 1.0, range: [0.0,1.0]
  maximum allowed weight fraction of U235 in product

.. code-block:: XML
     
          <max_enrich>[double]</max_enrich> 

``order_prefs``: default = 1, userlevel: 10
  Turn on preference ordering for input material so that enrichment facility chooses higher U235 content first

.. code-block:: XML

          <order_prefs>[boolean]</order_prefs> 

``swu_capacity``: default = 1e+299, range: [0.0, 1e+299]
  Separative work unit (SWU) capacity of enrichment facility (kgSWU/timestep)

.. code-block:: XML

          <swu_capacity>[double]</swu_capacity> 

Activity: Creating the Enrichment Prototype
+++++++++++++++++++++++++++++++++++++++++++
The enrichment facility, ``EnrichmentPlant`` will intake the natural ``u_ore`` 
from ``UraniumMine`` and create ``fresh_uox`` and ``tails`` as its products. 
Using the Enrichment archetype template above and the table below, generate the input enrichment facility prototype.

+-------------------------+---------------------------+
| Variable                | Value                     |
+=========================+===========================+
| ``name``                | ``EnrichmentPlant``       |
+-------------------------+---------------------------+
| ``feed_commodity``      | ``u_ore``                 |
+-------------------------+---------------------------+
| ``feed_recipe``         | ``nat_u``                 |
+-------------------------+---------------------------+
| ``product_commodity``   | ``fresh_uox``             |
+-------------------------+---------------------------+
| ``tails_commodity``     | ``tails``                 |
+-------------------------+---------------------------+
| ``max_feed_inventory``  | 1000000                   |
+-------------------------+---------------------------+

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
when requesting. Changes in these preferences can be specified as a function of time using the ``pref_change``
variables. Changes in the input-output recipe compositions can also be specified as a function of time using 
the ``recipe_change`` variables.

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
            <val>[string]</val> 
        </fuel_incommods>
        <fuel_inrecipes> 
            <val>[string]</val> 
        </fuel_inrecipes>
        <fuel_outcommods> 
            <val>[string]</val> 
        </fuel_outcommods>
        <fuel_outrecipes> 
            <val>[string]</val> 
        </fuel_outrecipes>
        <cycle_time>[int]</cycle_time>
        <refuel_time>[int]</refuel_time>
        <assem_size>[double]</assem_size>
        <n_assem_core>[int]</n_assem_core>
        <n_assem_batch>[int]</n_assem_batch>
        <power_cap>[double]</power_cap>
      </Reactor>
    </config>
  </facility>

Where:

* ``fuel_incommods``: input fuel commodity -- you can list more than one by adding more ``val`` blocks
* ``fuel_inrecipes``" input fuel recipe -- you can list more than one
* ``fuel_outcommods``: output fuel commodity -- you can list more than one
* ``fuel_outrecipes``: output fuel recipe -- you can list more than one
* ``cycle_time``: amount of time the reactor operates between refueling outages
* ``refuel_time``: duration of refueling outage
* ``assem_size``" size of a single assembly
* ``n_assem_core`` : number of assemblies in the core
* ``n_assem_batch``: number of batches replaced per refueling.
* ``power_cap``: amount of electricity the reactor generates.

There are many optional input parameters to the Cycamore Reactor archetype. 
We advise exploring the `Reactor archetype documentation <https://fuelcycle.org/user/cycamoreagents.html#cycamore-reactor>`_ to find them all. 

Activity: Creating the Reactor Prototype
++++++++++++++++++++++++++++++++++++++++

Now let's model the reactor this fuel will go through! In this simple example, 
let's model a single PWR in the United States. It has a power capacity of 1178 
MWe. Using the Reactor archetype template above and the table below, create the Reactor prototype.

+-----------------------+-----------------------------------+
| Variable              | Value                             |
+=======================+===================================+
| ``name``              | ``1178MWe ReactorPlant Unit 1``   |
+-----------------------+-----------------------------------+
| ``in_commod1``        | ``fresh_uox``                     |
+-----------------------+-----------------------------------+
| ``in_recipe1``        | ``fresh_uox``                     | 
+-----------------------+-----------------------------------+
| ``out_commod1``       | ``spent_uox``                     |
+-----------------------+-----------------------------------+
| ``out_recipe1``       | ``spent_uox``                     |
+-----------------------+-----------------------------------+
| ``cycle_length``      | ``18``                            |
+-----------------------+-----------------------------------+
| ``refuel_length``     | ``1``                             |
+-----------------------+-----------------------------------+
| ``assem_mass``        | ``33000``                         |
+-----------------------+-----------------------------------+
| ``n_core``            | ``3``                             |
+-----------------------+-----------------------------------+
| ``n_batch``           | ``1``                             |
+-----------------------+-----------------------------------+
| ``power``             | ``1178``                          |
+-----------------------+-----------------------------------+

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
          <val>[string]</val>
          <val>[string]</val>
          ...
        </in_commods>
      </Sink>
    </config>
  </facility>

Optional parameters:

``in_commod_prefs``: default=[], range: [None, [1e-299, 1e+299]]
  Commodities that the sink facility accepts

.. code-block:: XML

      <in_commod_prefs>
          <val>[double]</val>
          <val>[double]</val>
          ...
      </in_commod_prefs>

``recipe_name``: default=””
  Name of recipe to use for material requests, where the default (empty string) is to accept everything

.. code-block:: XML

      <recipe_name>[string]</recipe_name>


``max_inv_size``: default=1e+299, range: [0.0, 1e+299]
  Total maximum inventory size of sink facility

.. code-block:: XML

      <max_inv_size>[double]</max_inv_size>

``capacity``: default = 1e+299, range: [0.0, 1e+299]
  capacity the sink facility can accept at each time step
  
.. code-block:: XML

      <capacity>[double]</capacity>

Activity: Creating the Sink Prototype
+++++++++++++++++++++++++++++++++++++
Our sink, ``NuclearRepository``, will store the ``spent_uox`` and ``tails`` after
their use in the fuel cycle. Using the Sink archetype template above and the table below,
create the NuclearRepository prototype.

+-------------------------+---------------------------+
| Variable                | Value                     |
+=========================+===========================+
| ``name``                | ``NuclearRepository``     |
+-------------------------+---------------------------+
| ``input_commodity1``    | ``spent_uox``             |
+-------------------------+---------------------------+
| ``input_commodity2``    | ``tails``                 |
+-------------------------+---------------------------+

Once complete, append this facility under the Reactor prototype of your input file [#f1]_.

Check: Complete Facility block
++++++++++++++++++++++++++++++++++++++++

The facility section of your input file should now look like:

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
    <name>1178MWe ReactorPlant Unit 1</name>
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
