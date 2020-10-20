Deploying New Facilities
==========================

Often in fuel cycle analysis, transition scenarios are considered. How does the 
commissioning and decommissioning of reactors afftect electrity production or 
material transactions. Transition analysis will
require an institution that is able to deploy additional facilities at given time 
steps: the ``cycamore DeployInst`` archetype.  This is the simplest institution 
that is able to deploy
new facilities, in which the user simply defines the times at which new agents
should be deployed as copies of available prototypes.

In this case, we will keep the current institutions and add another
institution that will deploy more facilities over time.

Activity: Add a New Institution
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

``DeployInst`` relies on the following parameters:

* prototype (Ordered list of prototypes to build)
* build_times (Time step on which to deploy agents given in prototype list)
* n_build (Number of each prototype given in prototype list to build)

Using the prototype facilities already created, the new institution should
look like the following:

.. code-block:: xml

    <institution>
      <name>ExampleInstitution</name>
      <config>
        <DeployInst>
          <prototypes>
            <val>UraniumMine</val>
            <val>fuelfab</val>
            <val>1178MWe BRAIDWOOD-1</val>
            <val>1000We Lightwater-1</val>
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

The above institution will create 1 ``UraniumMine`` and 1 ``fuelfab`` facility on
time step 1. The next time step will deploy the ``1178MWe BRAIDWOOD-1`` reactor
prototype. And finally, at time step 3, the ``1000We Lightwater-1`` will be deployed.

**ExampleInstitution** is a placeholder for your institution name, and in this scenario
only one of each prototype will be deployed since ``n_build`` has a value of 1 for each.
