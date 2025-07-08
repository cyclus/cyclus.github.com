Understanding Commodities
-------------------------

Concept: Commodities
++++++++++++++++++++

|Cyclus| exchanges resources between facilities using a market-like mechanism
called the **dynamic resource exchange (DRE)**.  The concept of a **commodity** is
used to simply indicate which facilities may be interested in trading with
each other through the DRE. A commodity is therefore nothing more than a
unique name that is used to define a set of producers and consumers of a
common resource.  A commodity does not necessarily have a specific
composition; this will be determined by the agents during the simulation.
Suppliers then respond to the series of requests with a **bid**. A bid
supplies a notion of the quantity and quality of a resource to match a
request. Suppliers may add an arbitrary number of constraints to
accompany bids. For example, an enriched UOX supplier may be constrained
by its current inventory of natural uranium or its total capacity to
provide enrichment in Separative Work Units (SWUs).

Any potential resource transfer (i.e., a bid or a request) may be
denoted as **exclusive**. An exclusive transfer excludes partial fulfillment;
it must either be met fully or not at all. This mode supports concepts
such as the trading of individual reactor assemblies. In combination
with the notion of mutual requests, complex instances of supply and
demand are enabled. 

Finally, requesting facilities, institutions and
regions may apply **preferences** to each potential request-bid pairing
based on the proposed resource transfer. Facilities can apply arbitrary
complex logic to **rank the bids** that they have received, whether based on
the quantity available in each bid or on the quality of each bid, and
the consequent implications of the physics behavior of that facility. In
addition, an institution can apply a higher preference to a partner to
which it is congenial; similarly, a region may negate any transfers of
material which have a higher uranium enrichment than is allowable.

For example, the flow graph below shows three suppliers (left) and two
consumers (right), and the potential flows of various commodities among
them. The second consumer makes two different requests. Meanwhile, the
second supplier can supply the commodities requested by both consumers
and provides two bids accordingly.

.. image:: trade.png
    :align: center
    :alt: Commodity trade flowchart

Activity: Create fuel commodities (optional)
+++++++++++++++++++++++++++++++++++++++++++++++++++++

Let's build ``u_ore``, ``fresh_uox``, ``spent_uox``, and ``tails``,
the four commodities available for trade in our simulation. Note that
this part is **optional**, and is only needed if the user wants
to specify the solution priority of each commodity.

* ``u_ore`` : natural uranium that is mined
* ``tails`` : waste from the enrichment process
* ``fresh_uox``: fresh 4.0% enriched Uranium Oxide fuel that enters the reactor
* ``spent_uox``: spent uranium oxide fuel that leaves the reactor after depletion

When |Cyclus| needs
to know the isotopic composition of a material, it looks at the recipe for that
material given in the input file. Until now, ``recipe`` has been used to
refer to fuel recipes, but the ``recipe`` section of the input file can
describe any isotopic vector (e.g. natural uranium, spent fuel, fresh fuel, or any
other material whose isotopic composition needs to be tracked.)

The commodities section follows the ``archetype`` section
and takes the form:

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

 We will model four commodities: u_ore, fresh_uox, spent_uox, and tails.


Activity: Building commodities
++++++++++++++++++++++++++++++++++++++++++

Using the table below and the commodities template above, fill out the commodities
template.

+-------------+-------------+---------------------+
| Commodity   | Name        | Solution Priority   |
+=============+=============+=====================+
| com1        | u_ore       | 1.0                 |
+-------------+-------------+---------------------+
| com2        | fresh_uox   | 1.0                 |
+-------------+-------------+---------------------+
| com3        | spent_uox   | 1.0                 |
+-------------+-------------+---------------------+
| com4        | tails       | 1.0                 |
+-------------+-------------+---------------------+

1. Let's start with ``u_ore``. In the ``<name>`` line replace ``com1`` with ``u_ore``
inside a ``commodity`` block.

.. code-block:: XML

      <commodity>
        <name>u_ore</name>
      </commodity>

2. In the ``<solution_priority>`` section replace ``val1`` with ``1.0``.

.. code-block:: XML


      <commodity>
        <name>u_ore</name>
        <solution_priority>1.0</solution_priority>
      </commodity>



3. Repeat this process for the other three commodities. Your final result should look like:

.. code-block:: XML

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

Once complete, append the commodities section under the archetypes section [#f1]_.

Understanding Recipes
---------------------

Concept: Recipes
++++++++++++++++

Most commodities are materials, which have a quantity and an
isotopic composition.
Recipes are the isotopic composition of a certain material. For
example, u_ore has an isotropic composition of 0.711% :math:`^{235}`\ U and
99.284% :math:`^{238}`\ U. The recipe section of a |Cyclus| input file is
typically located at the end of the input and is of the form:

.. code-block:: XML

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

where ``id`` is the Nuc Id of the isotope in form ZZAAA and ``comp`` is the
composition of that isotope in the recipe. Other isotope formats are
also acceptable, such as those used by `pyne <http://pyne.io/theorymanual/nucname.html>`_. 
For example, :math:`^{235}`\ U can be expressed as:

* 922350 (ZZAAAM)
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

1. Let's start with the Natural Uranium recipe. Start by placing a ``<recipe>`` 
block to signify that this is a recipe and tab in and place the fill 
``<name>`` tag such as:

.. code-block:: XML

  <recipe>
    <name>nat_u</name>
  </recipe>

2. To signify that the composition of this recipe is in terms of Mass, fill the 
``<basis>`` tag with ``mass``.

.. code-block:: XML

  <recipe>
    <name>nat_u</name>
    <basis>mass</basis>
  </recipe>

3. To add a nuclide to this recipe, call the ``nuclide`` tag, tab in, add the 
``<id>`` and ``<comp>`` tags:

.. code-block:: XML

  <recipe>
    <name>nat_u</name>
    <basis>mass</basis>
    <nuclide>
      <id>id1</id>
      <comp>comp1</comp>
    </nuclide>
  </recipe>

4. We will fill the ``<id>`` tag with the uranium-235 ``Nuc Id``, ``92235``, and 
fill the composition tag with its mass composition, ``0.00711``.

.. code-block:: XML

  <recipe>
    <name>nat_u</name>
    <basis>mass</basis>
    <nuclide>
      <id>92235</id>
      <comp>0.00711</comp>
    </nuclide>
  </recipe>

5. Following the same procedure, we can add uranium-238 to this recipe such as:

.. code-block:: XML

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

6. We can add other recipes in separate ``recipe`` blocks. 
The recipe section of this tutorial is placed below.

.. code-block:: XML

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

Once complete, append this facility under the commodity section of your input file [#f1]_.


Let's take a look at the ``fresh_uox`` fuel recipe (note that ``-`` is an illegal character for
names in cyclus and ``_`` should be used instead):

.. image:: fuel_com.png
    :align: center
    :alt: Fuel recipe for fresh_uox
The recipe name ``fresh_uox`` is specified, as are the isotope nuclide IDs and the 
corresponding mass fraction of each nuclide. The ``fresh_uox`` is composed of 4% U-235 and 96% U-238.

.. rubric:: Footnotes
.. [#f1] The exact order of the sections in a |Cyclus| input file are of minor consequence. The ``control`` sequence must go first, but the other sequences can go in any order that makes sense to the user. The traditional organization  of an input file is: control, archetypes, commodities, facilities,   regions/institutions, and recipes. 
