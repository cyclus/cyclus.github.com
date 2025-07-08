Deploying New Facilities
==========================

Often in fuel cycle analysis, transition scenarios are considered. These ask 
questins like: "How does the 
commissioning and decommissioning of reactors affect electrity production or 
material transactions?". Transition analysis will
require an institution that can deploy additional facilities at given time 
steps: the ``cycamore DeployInst`` archetype.  This is the simplest institution 
that can deploy
new facilities, in which the user simply defines the times at which new agents
should be deployed as copies of available prototypes.

In this case, we will keep the current institutions and add another
institution that will deploy more facilities over time.

Example: DeployInst
--------------------------------
The ``DeployInst`` archetype must be added to the ``<archetypes>`` block 
of the input file: 

.. code-block:: xml

    <archetypes>
      ...
      ...
      <spec> <lib>cycamore</lib><name>DeployInst</name> </spec>
    </archetypes>


**Recall:** in `Adding a Second Reactor <add_second_reactor.html>`_ we left
a blank spot in between our ``</institution>`` and ``</region>`` handles.
We will now use this to add the institution for ``DeployInst``.

``DeployInst`` takes the form:

.. code-block:: XML
    <institution>
      <name>ExampleInstitution</name>
      <config>
        <DeployInst>
          <prototypes>
            <val>prototype_name1</val>
            <val>prototype_name2</val>
            <val>prototype_name3</val>
            <val>prototype_name4</val>
          </prototypes>

          <build_times>
            <val>time1</val>
            <val>time2</val>
            <val>time3</val>
            <val>time4</val>
          </build_times>

          <n_build>
            <val>n_build1</val>
            <val>n_build2</val>
            <val>n_build3</val>
            <val>n_build4</val>
          </n_build>
        </DeployInst>
      </config>
    </institution>


where:

* prototype: Ordered list of prototypes to build
* build_times: Time step on which to deploy agents given in prototype list
* n_build: Number of each prototype given in prototype list to build

Activity: Add a New Institution 
++++++++++++++++++++++++++++++++++++++++++

Using the table below and the DeployInst template above, fill out the commodities
template.

+-------------+-------------+---------------------+
| Prototype             | build_times | n_build   |
+=============+=============+=====================+
| UraniumMine           | 1           | 1         |
+-------------+-------------+---------------------+
| FuelFab               | 1           | 1         |
+-------------+-------------+---------------------+
| 1178MWe BRAIDWOOD_1   | 2           | 1         |
+-------------+-------------+---------------------+
| 1000MWe LIGHTWATER_1  | 3           | 1         |
+-------------+-------------+---------------------+

Using the prototype facilities already created, the new institution should
look like the following:

.. code-block:: xml

    <institution>
      <name>ExampleInstitution</name>
      <config>
        <DeployInst>
          <prototypes>
            <val>UraniumMine</val>
            <val>FuelFab</val>
            <val>1178MWe BRAIDWOOD_1</val>
            <val>1000We LIGHTWATER_1</val>
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

The above institution will create 1 ``UraniumMine`` and 1 ``FuelFab`` facility on
time step 1. The next time step will deploy the ``1178MWe BRAIDWOOD_1`` reactor
prototype. And finally, at time step 3, the ``1000We LIGHTWATER_1`` will be deployed.
This institution block goes inside the Region block, with the previously created 
insitutions blocks. 

**ExampleInstitution** is a placeholder for your institution name, and in this scenario
only one of each prototype will be deployed since ``n_build`` has a value of 1 for each.

This example is now complete. Save your file as the desired file name (with ``.xml`` 
extension) and run your code through |Cyclus|. If your simulation runs into errors, 
sample files can be found `here <https://doi.org/10.5281/zenodo.4557613>`_ under 
``input_deployinst.xml`` or ``ouput_deployinst.sqlite``.
