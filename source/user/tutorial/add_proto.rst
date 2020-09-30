Concept: Commodities
--------------------

|Cyclus| exchanges resources between facilities using a market-like mechanism
called the **dynamic resource exchange (DRE)**.  The concept of a commodity is
uses to simply indicate which facilities may be interested in trading with
each other through the DRE.  **A commodity is therefore nothing more than a
unique name that is used to define a set of producers and consumers of a
common resource**.  A commodity does not necessarily have a specific
composition; this will be determined by the agents during the simulation.
Suppliers then respond to the series of requests with a bid . A bid
supplies a notion of the quantity and quality of a resource to match a
request. Suppliers may add an arbitrary number of constraints to
accompany bids. For example, an enriched UOX supplier may be constrained
by its current inventory of natural uranium or its total capacity to
provide enrichment in Separative Work Units (SWUs).

Any potential resource transfer (i.e., a bid or a request) may be
denoted as exclusive. **An exclusive transfer excludes partial fulfillment;
it must either be met fully or not at all**. This mode supports concepts
such as the trading of individual reactor assemblies. In combination
with the notion of mutual requests, complex instances of supply and
demand are enabled. Finally, requesting facilities, institutions and
regions may apply **preferences** to each potential request-bid pairing
based on the proposed resource transfer. Facilities can apply arbitrary
complex logic to **rank the bids** that they have received, whether based on
the quantity available in each bid or on the quality of each bid, and
the consequent implications of the physics behavior of that facility. In
addition, an institution can apply a higher preference to a partner to
which it is congenial; similarly, a region may negate any transfers of
material which have a higher uranium enrichment than is allowable.

For example, the flow graph below shows three suppliers (left) and two
requesters (right), and the potential flows of various commodities among
them. The second consumer makes two different requests. Meanwhile, the
second supplier can supply the commodities requested by both consumers
and provides two bids accordingly.

.. image:: trade.png
    :align: center
    :alt: Commodity trade flowchart

Activity: Create fuel commodities (optional)
+++++++++++++++++++++++++++++++++++++++++++++++++++++

Let's build ``u-ore``, ``fresh-uox``, ``spent-uox``, and ``tails``,
four commodities that will be traded in our simulation. Note that
this part is **optional**, and is only needed if the user wants
to specify the solution priority of each commodity.

* ``u-ore`` : natural uranium that is mined
* ``tails`` : waste from the enrichment process
* ``fresh-uox``: fresh 4.0% enriched Uranium Oxide fuel that enters the reactor
* ``spent-uox``: spent Uranium Oxide fuel that leaves the reactor after depletion

When |CYCLUS| needs
to know the isotopic composition of a material, it looks at the recipe for that
material given in the input file. Until now, ``recipe`` has been used to
refer to fuel recipes, but the ``recipe`` section of the input file can
describe any isotopic vector (e.g. natural uranium, spent fuel, fresh fuel, or any
other material whose isotopic composition needs to be tracked.)

The commodities section is located below the ``archetype`` section
and is of the form:

.. code-block:: XML

    <commodity>
        <name>com1</name>
        <solution_priority>1.0</solution_priority>
      </commodity>
      <commodity>
        <name>com2</name>
        <solution_priority>1.0</solution_priority>
      </commodity>
      <commodity>
        <name>com3</name>
        <solution_priority>1.0</solution_priority>
      </commodity>
      <commodity>
        <name>com4</name>
        <solution_priority>1.0</solution_priority>
      </commodity>

where:

* name: name of the commodity
* solution priority: number defining the relative priority for resolution in the dynamic
  resource exchange.

 We will model four commodities: u-ore, fresh-uox, spent-uox, and tails.


Activity: Building commodities
++++++++++++++++++++++++++++++++++++++++++

Using the table below and the commodities template above, fill out the commodities
template.

+-------------+-------------+---------------------+
| Commodity   | Name        | Solution Priority   |
+=============+=============+=====================+
| com1        | u-ore       | 1.0                 |
+-------------+-------------+---------------------+
| com2        | fresh-uox   | 1.0                 |
+-------------+-------------+---------------------+
| com3        | spent-uox   | 1.0                 |
+-------------+-------------+---------------------+
| com4        | tails       | 1.0                 |
+-------------+-------------+---------------------+

1. Let's start with ``u-ore``. In the ``<name>`` line replace ``com1`` with ``u-ore``.

.. code-block:: XML

    <commodity>
        <name>u-ore</name>

2. In the ``<solution_priority>`` section replace ``val1`` with ``1.0``.

.. code-block:: XML


    <commodity>
        <name>u-ore</name>
        <solution_priority>1.0</solution_priority>

3. Now, finalize this commodity by closing it with ``</commodity>``. Your ``u-ore`` commodity section should be:

.. code-block:: XML

    <commodity>
        <name>u-ore</name>
        <solution_priority>1.0</solution_priority>
      </commodity>

4. Repeat this process for the other three commodities. Your final result should look like:

.. code-block:: XML

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

Once complete, append the commodities section under the archetypes section.

Concept: Recipes
----------------

Most commodities are materials, which have a quantity and an
isotopic composition.
Recipes are the isotopic composition of a certain material. For
example, u-ore has an isotropic composition of 0.711% :math:`^{235}`\ U and
99.284% :math:`^{238}`\ U. The recipe section of a CYCLUS input file is
located at the bottom and is of the form:

.. code-block:: XML

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

where ``id`` is the Nuc Id of the isotope in form ZZAAA and ``comp`` is the
composition of that isotope in the recipe. Other isotope formats are
also acceptable. For example, :math:`^{235}`\ U can be expressed as:

* 922350000 (ZZAAAMMMM)
* 92235 (ZZAAA)
* U235 (name)
* U-235 (name)

For more details, reference the `Recipe definition
<../input_specs/recipe.html>`_ page.

First, we can declare the isotopic compositions of the fresh and spent
fuel. We'll be using simple recipes: fresh fuel is 4.0% :math:`^{235}`\ U by mass,
remainder U-238. Spent fuel is 1.1% :math:`^{235}`\ U, 94.0% :math:`^{238}`\ U, 0.9% :math:`^{239}`\ Pu, and
4.0% :math:`^{137}`\ Cs.

Activity: Creating a Recipe
++++++++++++++++++++++++++++


Using the tables below, fill out the recipe
template for natural uranium, fresh fuel, and spent fuel.

+---------------------+--------------------+--------------------+
| Natural Uranium Composition                                   |
+---------------------+--------------------+--------------------+
| Nuclide             | Spent ids          |  Mass composition  |
+=====================+====================+====================+
| :math:`^{235}`\ U   | 92235              | 0.00711            |
+---------------------+--------------------+--------------------+
| :math:`^{238}`\ U   | 92238              | 0.99289            |
+---------------------+--------------------+--------------------+

+---------------------+--------------------+--------------------+
| Fresh Fuel Composition                                        |
+---------------------+--------------------+--------------------+
| Nuclide             | Spent ids          |  Mass composition  |
+=====================+====================+====================+
| :math:`^{235}`\ U   | 92235              | 0.04               |
+---------------------+--------------------+--------------------+
| :math:`^{238}`\ U   | 92238              | 0.96               |
+---------------------+--------------------+--------------------+

+---------------------+--------------------+--------------------+
| Spent Fuel Composition                                        |
+---------------------+--------------------+--------------------+
| Nuclide             | Spent ids          |  Mass composition  |
+=====================+====================+====================+
| :math:`^{235}`\ U   | 92235              | 0.011              |
+---------------------+--------------------+--------------------+
| :math:`^{238}`\ U   | 92238              | 0.94               |
+---------------------+--------------------+--------------------+
| :math:`^{239}`\ Pu  | 94239              | 0.009              |
+---------------------+--------------------+--------------------+
| :math:`^{137}`\ Cs  | 55137              | 0.04               |
+---------------------+--------------------+--------------------+

1. Let's start with the Natural Uranium recipe. Start by placing the ``<recipe>`` tag as the header to signify that this is a recipe and tab in and place the fill ``<name>`` tag such as:

.. code-block:: XML

  <recipe>
    <name>nat-u</name>

2. To signify that the composition of this recipe is in terms of Mass, fill the ``<basis>`` tag with ``mass``.

.. code-block:: XML

  <recipe>
    <name>nat-u</name>
    <basis>mass</basis>

3. To add a nuclide to this recipe, call the ``nuclide`` tag, tab in, add the ``<id>`` and ``<comp>`` tags:

.. code-block:: XML

  <recipe>
    <name>nat-u</name>
    <basis>mass</basis>
    <nuclide>
      <id>id1</id>
      <comp>comp1</comp>
    </nuclide>

4. We will fill the ``<id>`` tag with the Uranium-235 ``Nuc Id``, ``92235``, and fill the composition tag with its mass composition, ``0.00711``.

.. code-block:: XML

  <recipe>
    <name>nat-u</name>
    <basis>mass</basis>
    <nuclide>
      <id>92235</id>
      <comp>0.00711</comp>
    </nuclide>

5. Following the same procedure, we can add Uranium-238 to this recipe such as:

.. code-block:: XML

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

6. After closing this recipe with the ``</recipe>`` tag, we can add other recipes. The recipe section of this tutorial is placed below.

.. code-block:: XML

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

Once complete, append this facility under the commodity section of your input file.


Let's take a look at the ``fresh-uox`` fuel recipe:

.. image:: fuel_com.png
    :align: center
    :alt: Fuel recipe for fresh-uox
The recipe name ``fresh-uox`` is specified, as are the isotope nuclide IDs and the corresponding mass fraction of each nuclide. The ``fresh-uox`` is composed of 4% U-235 and 96% U-238.
|
|
|
|


Concept: Archetype configuration
-------------------------------------------------------

One of the features of |CYCLUS| is its ability to switch between
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
specific set of parameters, it is called a *prototype*.

Concept: Source Prototype
=========================
The Source facility acts as a source of material with a fixed throughput (per time step) capacity and a lifetime capacity defined by a total inventory size. It offers its material as a single commodity. If a composition recipe is specified, it provides that single material composition to requesters. If unspecified, the source provides materials with the exact requested compositions. The inventory size and throughput both default to infinite. Supplies material results in corresponding decrease in inventory, and when the inventory size reaches zero, the source can provide no more material.
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
    Name of the isotopic composition of the material that this source provides regardless of the requested composition. If empty, the Source creates and provides whatever composition is requested.

.. code-block:: XML

        <outrecipe>[outrecipe]</outrecipe>



inventory_size: default = 1e+299, range: [0.0, 1e+299]
    Total amount of material this source has remaining. Every trade decreases this value by the supplied material quantity. When it reaches zero, the source cannot provide any more material.

.. code-block:: xml

        <inventory_size>[double ( kg )]</inventory_size>

throughput: default=1e+299,range: [0.0, 1e+299]
    Amount (kg) of the commodity that the Source can supply at each time step

::

        <throughput>[double ( kg/(time step) )]</throughput>

Activity: Configure the Source prototype
++++++++++++++++++++++++++++++++++++++++
Our source, ``UraniumMine``, will provide the natural uranium ore for our enrichment facility.
This facility takes two inputs, ``name`` and ``outcommd``. Using the Source Archetype and the table below, create the UraniumMine prototype.

+-----------------------+---------------------------+
| Variable              | Value                     |
+=======================+===========================+
| ``name``              | ``UraniumMine``           |
+-----------------------+---------------------------+
| ``Archetype``         | ``Source``                |
+-----------------------+---------------------------+
| ``out_commod``        | ``u-ore``                 |
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

2. Filling in the variables ``name``, ``Archetype``, and ``out_commod`` as ``UraniumMine``, ``Source``, and ``fresh-uox`` leads to:

.. code-block:: XML

  <facility>
    <name>UraniumMine</name>
    <config>
      <Source>
        <outcommod>u-ore</outcommod>
      </Source>
    </config>
  </facility>

Once complete, append this facility under the recipe section of your input file.

Concept: Enrichment Prototype
==============================
The Enrichment facility is a simple agent that enriches natural uranium in a Cyclus simulation. It does not 
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

          <max_feed_inventory>1000000</max_feed_inventory 

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
The enrichment facility, ``EnrichmentPlant`` will intake the natural ``u-ore`` from ``UraniumMine`` and create ``fresh-uox`` and ``tails`` as its products.
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
| ``feed_commod``         | ``u-ore``                 |
+-------------------------+---------------------------+
| ``feed_recipe``         | ``nat-u``                 |
+-------------------------+---------------------------+
| ``product_commod``      | ``fresh-uox``             |
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
        <feed_commod>u-ore</feed_commod>
        <feed_recipe>nat-u</feed_recipe>
        <product_commod>fresh-uox</product_commod>
        <tails_commod>tails</tails_commod>
        <max_feed_inventory>1000000</max_feed_inventory>
      </Enrichment>
    </config>
  </facility>

Once complete, append this facility under the Source prototype of your input file.


Concept: Reactor Prototype
==========================
The Reactor is a simple, general reactor based on static compositional transformations to model fuel burnup. 
The user specifies a set of fresh fuel compositions the Reactor accepts and corresponding spent fuel 
compositions the reactor discharged from the core. No incremental transmutation takes place. Rather, 
at the end of an operational cycle, the batch being discharged from the core is instantaneously transmuted 
from its original fresh fuel composition into its spent fuel form.

Each fuel is identified by a specific input commodity and has an associated input recipe (nuclide composition), 
output recipe, output commodity, and preference. The preference identifies which input fuels are preferred 
when requesting. Changes in these preferences can be specified as a function of time using the pref_change
variables. Changes in the input-output recipe compositions can also be specified as a function of time using 
the recipe_change variables.

The reactor treats fuel as individual assemblies. Fuel is requested in assembly sized quanta. If real-world
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

Now let's model the reactor this fuel will go through! In this simple example, let's model a single PWR in the United States. It has a power capacity of 1178 MWe, and there is only one of them in the region.
The template for the reactor is given below:

.. code-block:: XML

    <facility>
      <name>Reactor</name>
      <config>
        <Archetype>
          <fuel_incommods> <val>[VALUE]/val> </fuel_incommods>
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
| ``name``              | ``1178MWe BRAIDWOOD-1``   |
+-----------------------+---------------------------+
| ``Archetype``         | ``Reactor``               |
+-----------------------+---------------------------+
| ``fuel_incommods``    | ``fresh-uox``             |
+-----------------------+---------------------------+
| ``fuel_inrecipes``    | ``fresh-uox``             |
+-----------------------+---------------------------+
| ``fuel_outcommods``   | ``spent-uox``             |
+-----------------------+---------------------------+
| ``fuel_outrecipes``   | ``spent-uox``             |
+-----------------------+---------------------------+
| ``cycle_time``        | 18                        |
+-----------------------+---------------------------+
| ``refuel_time``       | 1                         |
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

Once complete, append this facility under the Enrichment facility of your input file.


Concept: Sink Prototype
=======================

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

::

      <in_commod_prefs>
          <val>[double]</val>
          <val>[double]</val>
      </in_commod_prefs>

recipe_name: default=””
  Name of recipe to use for material requests, where the default (empty string) is to accept everything

.. code-block:: XML

      <recipe_name>[inrecipe]</recipe_name


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
Our sink, ``NuclearRepository``, will store the ``spent-uox`` and ``tails`` after
their use in the fuel cycle. Using the Sink Archetype template and the table below,
create the UraniumMine prototype.

+-------------------------+---------------------------+
| Variable                | Value                     |
+=========================+===========================+
| ``name``                | ``NuclearRepository``     |
+-------------------------+---------------------------+
| ``Archetype``           | ``Sink``                  |
+-------------------------+---------------------------+
| ``val``                 | ``spent-uox``             |
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

1. After filling in these variables, your sink facility prototype will look like:

.. code-block:: XML

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

Once complete, append this facility under the Reactor prototype of your input file.

Check: Complete Facility block
++++++++++++++++++++++++++++++++++++++++

The facility section of your input file should be of the form:

.. code-block:: XML

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
