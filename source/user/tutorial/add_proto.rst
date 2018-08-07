Adding Prototypes to your Simulation
====================================

Concept: Configuring an Archetype to Create a Prototype
---------------------------------------------------------

While the archetype describes the form of the model used to represent a
facility, a variety of parameters are generally available to configure the
specific behavior.   For the example of a reactor, the developer will probably
allow the user to define the power level of the reactor, independent of the
specific model chosen to represent the behavior of the model.  Other common
reactor parameters are fuel loading parameters such as cycle length and batch
size.

In |Cyclus|, when an archetype has been configured with a
specific set of parameters, it is called a *prototype*.


Activity: Configure your first prototype
+++++++++++++++++++++++++++++++++++++++++

The first facility in our fuel cycle will be a mine, using the Cycamore Source
archetype.

1. Drag the cycamore Source archetype from the ribbon to the fuel cycle design pane.
2. Right-click on the Source facility to show its context menu, and choose
   "Facility Documentation".  Close the documentation when finished.
3. Double click on the Source facility that you just dropped to open its configuration window.
4. Choose a name for your Source prototype, e.g. "U Mine".

*Bonus: From the Source facility's context menu (right-click) choose "Change
Niche" and type "mine" as the New Niche.  The only purpose of the niche is to
allow different visualization in the fuel design pane.  Other niches include:
"fuel fabrication", "reactor", "abr", "repository", "reprocessing",
"separations".*

Your fuel cycle design should now look like this:

.. image:: first_proto.png
    :align: center
    :alt: Fuel cycle design pane showing first prototype.


Concept: Commodities
----------------------

|Cyclus| exchanges resources between facilities using a market-like mechanism
called the dynamic resource exchange (DRE).  The concept of a commodity is
uses to simply indicate which facilities may be interested in trading with
each other through the DRE.  A commodity is therefore nothing more than a
unique name that is used to define a set of producers and consumers of a
common resource.  A commodity does not necessarily have a specific
composition; this will be determined by the agents during the simulation.
Suppliers then respond to the series of requests with a bid . A bid
supplies a notion of the quantity and quality of a resource to match a
request. Sup- pliers may add an arbitrary number of constraints to
accompany bids. For example, an enriched UOX supplier may be constrained
by its current inventory of natural uranium or its total capacity to
provide enrichment in Separative Work Units (SWUs). It attaches such
constraints to its bids.

Any potential resource transfer, i.e., a bid or a request, may be
denoted as exclusive. An exclusive transfer excludes partial fulfillment;
it must either be met fully or not at all. This mode supports concepts
such as the trading of individual reactor assemblies. In combination
with the notion of mutual requests, complex instances of supply and
demand are en- abled. Finally, requesting facilities, institutions and
regions may apply preferences to each potential request-bid pairing
based on the proposed resource transfer. Facilities can apply arbitrary
complex logic to rank the bids that they have received, whether based on
the quantity available in each bid or on the quality of each bid, and
the consequent implications of the physics behavior of that facility. In
addition, an institution can apply a higher preference to a partner to
which it is congenial; similarly, a region may negate any transfers of
material which have a higher uranium enrichment than is allowable.

For example, the flow graph below shows three suppliers (left) and two
requesters (right), and the potential flows of various commodities among
them. The second consumer makes two different requests. Meanwhile, the
second supplier can supply the commodities requested by both consumers
and has provided two bids accordingly.

.. image:: trade.png
    :align: center
    :alt: Commodity trade flowchart

Activity: Create fresh and spent fuel commodities
+++++++++++++++++++++++++++++++++++++++++++++++++++++
Let's build fresh-uox and spent-uox, two of the commodities that will be traded in the simulation. fresh-uox is the fresh 4.0% enriched Uranium Oxide fuel that enters the reactor and spent-uox is the spent Uranium Oxide fuel that leaves the reactor after it is used. Whenever CYCLUS needs to know the composition of a material, it looks at the recipe for that material given in the input file. Until now, "recipe" has been used to refer to fuel recipes, but the "recipe" section of the input file can include the recipe for natural uranium, spent fuel, fresh fuel, or any other material where the isotopic composition needs to be tracked.

First, we can declare the isotopic compostions of fresh and spent fuel. We'll be using simple recipes: fresh fuel is 4.0% U-235 by mass, remainder U-238. Spent fuel is 1.1% U-235, 94.0% U-238, 0.9% Pu-239, and 4.0% Cs-137.

.. raw:: latex

   \begin{gather*}
   \textrm{Fresh Fuel Compostition}
   \end{gather*}

+---------------------+--------------------+--------------------+
| Nuclide             | Fresh Ids          |  Mass composition  |
+=====================+====================+====================+
| :math:`^{235}`\ U   | 92235              | 0.04               |
+---------------------+--------------------+--------------------+
| :math:`^{238}`\ U   | 92238              | 0.96               |
+---------------------+--------------------+--------------------+

1. Using the table above, place the correct Fresh Ids in the ``fresh_id`` list and the correct mass compositions in the ``fresh_comp`` list.

.. code:: ipython3

    fresh_id = [92235,92238]
    fresh_comp = [0.04, 0.96]

.. raw:: latex

    \begin{gather*}
    \textrm{Spent Fuel Composition}
    \end{gather*}

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

2. Using the table above, place the correct Spent Ids in the ``spent_id`` list and the correct mass compositions in the ``spent_comp`` list.

.. code:: ipython3

    spent_id = [92235, 92238, 94239, 55137]
    spent_comp = [0.011, 0.94, 0.009, 0.04]

Your completed cell should look like this:

.. code:: ipython3

    fresh_id = [92235,92238]
    fresh_comp = [0.04, 0.96]
    spent_id = [92235, 92238, 94239, 55137]
    spent_comp = [0.011, 0.94, 0.009, 0.04]

3. After this information has been properly placed run the cell and the check cell to check your work!

Activity: Add a Reactor facility
++++++++++++++++++++++++++++++++
Now let's model the reactor this fuel will go through! In this simple exam, let's model a single PWR in the United States. It has a power capacity of 1178 MWe, and there is only one of them in the region.


.. raw:: html

   </div>

+-------------------------+-----------------------------+-------------------------------+
| Variable                | Value                       | Purpose                       |
+=========================+=============================+===============================+
| ``country``             | ``'United States'``         | country of reactor            |
+-------------------------+-----------------------------+-------------------------------+
| ``reactor_name``        | ``'1178MWe BRAIDWOOD-1'``   | name of reactor               |
+-------------------------+-----------------------------+-------------------------------+
| ``type_reactor``        | ``'PWR'``                   | type of reactor               |
+-------------------------+-----------------------------+-------------------------------+
| ``net_elec_capacity``   | ``1178``                    | net electric capacity (MWe)   |
+-------------------------+-----------------------------+-------------------------------+
| ``operator``            | ``'Exelon'``                | operator of reactor           |
+-------------------------+-----------------------------+-------------------------------+

1. Using the table above, let's build our reactor prototype.
2. To begin, in an empty cell in your IPython notebook, make ``country`` a varible equal to ``United States``.

.. code:: ipython3

    country = 'United States' # country of reactor

3. Now we must name our reactor, make a variable ``reactor_name`` that is equal to ``'1178MWe BRAIDWOOD-1'``

.. code:: ipython3

    reactor_name = '1178MWe BRAIDWOOD-1' # name of reactor

4. The reactor type is crucial as cycamore has a specific archetype for each type of reactor. These specific reactor types vary based on the cycle time, assembly size, number of assemblies in the core, and the number of assemblies in a batch. In our reactor, we will make the variable ``type_reactor`` equal to ``'PWR'``.

.. code:: ipython3

    type_reactor = 'PWR' # type of reactor

5. Set the Reactor Power by calling the variable, ``net_elec_capacity`` and making it equal to ``1178`` in your IPython notebook.

.. code:: ipython3

    net_elec_capacity = 1178 # net electric capacity (MWe)

6. Let's set the ``operator`` of the reactor to ``'Exelon'``

.. code:: ipython3

    operator = 'Exelon'  # operator of reactor

7. Your completed cell should look like:

.. code:: ipython3

    '''
    Initialize all variables given from the table.
    '''
    country = 'United States' # country of reactor
    reactor_name = 'BRAIDWOOD-1' # name of reactor
    type_reactor = 'PWR' # type of reactor
    net_elec_capacity = 1178 #net electric capacity (MWe)
    operator = 'Exelon' #operator of reactor

8. When done filling in these values click the `run` button twice.

Saving our a data to a csv file
We will now save our reactor's information to a csv file named "single_reactor_data.csv". We do not need to complete this step for a cyclus simulation but, for the handling of data we will for this tutorial. Use the ``write.write_csv(header,raw_input, filename)`` function we will save our reactor's data.

.. code:: ipython3

    header = ['Country','Reactor Name','Type','Net Electric Capacity','Operator'] # this is the header of our csv file
    raw_input = [country,reactor_name,type_reactor,net_elec_capacity,operator] # this is the data we will be inserting into the csv file
    filename = "single_reactor_data.csv" # this is the filename of the csv file

    write.write_csv(header,raw_input, filename)


Activity: Deployments
++++++++++++++++++++++++++++++++

Now we will set how many mines, enrichment facilities, and repositories are in our region. For now, we'll say that there is one of each facility in our region.

+--------------------+---------+-----------------------------------+
| Variable           | Value   | Purpose                           |
+====================+=========+===================================+
| ``n_mine``         | 1       | number of mines                   |
+--------------------+---------+-----------------------------------+
| ``n_enrichment``   | 1       | number of enrichment facilities   |
+--------------------+---------+-----------------------------------+
| ``n_repository``   | 1       | number of repositories            |
+--------------------+---------+-----------------------------------+

1. Our simple simulation will have one mine. Using the table above, create the variable ``n_mine`` and make it equal to ``1`` in your IPython notebook.

.. code:: ipython3

    n_mine = 1 # number of mines

2. Now, let's make one enrichment facility for our simulation. In your IPython notebook create the variable ``n_enrichment`` and equate it to ``1``.

.. code:: ipython3

    n_mine = 1 # number of mines

3. Now, let's create one repository for our simulation. In your IPython notebook create the variable ``n_repository`` and equate it to ``1``.

    .. code:: ipython3

        n_repository = 1 # number of repositories

4. Your complete cell should look like:

.. code:: ipython3

    n_mine = 1 # number of mines
    n_enrichment = 1 # number of enrichment facilities
    n_repository = 1 #number of repositories

5. When ready, click the ``run`` button twice


5. Let's add these facilities to the United States by creating ``deployment_data`` and finding the location of the reactor through are ``reactor_data``

.. code:: ipython3

    deployment_data = {}
    for element in reactor_data.loc[:,'Country'].drop_duplicates():
        deployment_data[element] = [n_mine,n_enrichment,n_repository]
    print(deployment_data)

6. Click the ``run`` button once. The output should be:

.. parsed-literal::

    {'United States': [1, 1, 1]}

This output shows us that there is one mine, one enrichment facility, and one repository.

Concept: Material Recipes
-------------------------

Materials area a fundamental type of resource in Cyclus. Each material object consists of a quantity (typically in kg) and a quality, ie. an isotopic composition. The isotopic composition is referred to as a recipe. Some archetypes may want to specify recipes for their input and/or output, as a list of isotope with either mass or atom fractions.
For each of the following prototypes, drag it into the fuel cycle design pane
and configure it with the following information.

Activity: Create the fuel recipes
+++++++++++++++++++++++++++++++++
Now, we must write the fuel recipes for both the fresh and spent fuels.

1. We will use the ``write_recipes`` function to render the fuel compositions as fuel recipes. ``write_recipes`` works by writing our ``fresh`` and ``spent`` nuclide and composition data over a specified template. The input template is a fuel recipe template. We will write over a variable named ``input_temp`` and make it equal to ``'template/recipe_template.xml'``.

.. code:: ipython3

    input_temp = 'template/recipe_template.xml'

2. Now we must signify the output filename of our output fuel recipe. Create a variable ``output_recipe`` and equate it to ``'1xn-rendered-recipe.xml'``.

.. code:: ipython3

    output_recipe = '1xn-rendered-recipe.xml'

3. Call the `write.write_recipes` function, with the first two inputs being `fresh` and `spent` and the last two inputs being ``input_temp`` and ``output_recipe``.

.. code:: ipython3

    rendered_recipe = write.write_recipes(fresh,spent,'template/recipe_template.xml','1xn-rendered-recipe.xml')

    with open(rendered_recipe,'r') as recipe:
        print(recipe.read())


Activity: Completing your Prototype Configurations¶
+++++++++++++++++++++++++++++++++++++++++++++++++++
1. Let's write are region configurations. To write the region configurations, use the ``write`` function and call the ``reactor_data`` and ``deployment_data``, the template ``region_template.xml``, and the name of the output rendered region file, ``1xn-rendered-region.xml``.
2. To write the Reactor configurations, use the `write` function and call the `reactor_data`, the template `'reactor_template.xml'`, and the name of the output rendered reactor file, `'1xn-rendered-reactor.xml'`.
