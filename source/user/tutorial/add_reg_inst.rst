Adding Regions and Institutions
===============================

Concept: Regions & Institutions
-------------------------------

|Cyclus| establishes a hierarchy of agents: Facility agents are managed by
Institution agents that exist within a Region agent.  This series of ownership
allow for control of the interaction behavior
between agents.  For example, two facilities 
may not be allowed to trade if they are in two different regions. For commodities, 
an institution may apply a higher preference for transactions within the 
same institution; similarly, a region may negate any transfers of
material which have a higher uranium enrichment than is allowable.

Every |Cyclus| simulation needs at least one Region and one Institution, and
in this case, we'll use the simplest options:

* a Null Institution (``NullInst``) that holds a set of facilities that are
  deployed at the start of a simulation.
* a Null Region (``NullRegion``) that holds a set of Institutions.

Defining these is done in the archetypes section of the code. This is done 
in a similar manner as the other archetypes previously defined, except regions
and institutions used in this tutorial come from the ``agents`` library, rather 
than the ``cycamore`` library. The ``agents`` library comes with Cyclus, and 
you can run ``cyclus --a`` to check that the archetypes are installed. 

Since these are all archetypes, no matter what library they're from, we must include 
them into the the Archetypes block that we already have.
Using the template on the `Understanding Archetypes <https://fuelcycle.org/user/tutorial/add_arche.html>`_ codepage,
append two ``spec`` blocks into the Archetypes block for the variables listed in the table below.

+-------------+-------------+------------------+
| Archetype # | Variable    | Value            |
+=============+=============+==================+
| 5           | ``lib``     | ``agents``       |
+             +-------------+------------------+
|             | ``name``    | ``NullRegion``   |
+-------------+-------------+------------------+
| 6           | ``lib``     | ``agents``       |
+             +-------------+------------------+
|             | ``name``    | ``NullInst``     |
+-------------+-------------+------------------+

This results in the full Archetypes block:

.. code-block:: XML

      <archetypes>
        <spec>
          <lib>cycamore</lib>
          <name>Enrichment</name>
        </spec>
        <spec>
          <lib>cycamore</lib>
          <name>Reactor</name>
        </spec>
        <spec>
          <lib>cycamore</lib>
          <name>Source</name>
        </spec>
        <spec>
          <lib>cycamore</lib>
          <name>Sink</name>
        </spec>
        <spec>
          <lib>agents</lib>
          <name>NullRegion</name>
        </spec>
        <spec>
          <lib>agents</lib>
          <name>NullInst</name>
        </spec>
      </archetypes>

      
Concept: Regions 
----------------

Regions tie together a fuel cycle as they designate what institutions and facilities are
in the region's fuel cycle. Regions may apply preferences to each
potential request-bid pairing based on the proposed resource transfer.
The basic structure of a region block is:

.. code-block:: XML

    <region>
      <name>Region_name</name>
      <config>
        <RegionArchetype>
        ...
        <RegionArchetype>
      </config>
      <institution>
      ...
      ...
      </institution>

    </region>

Where:

* ``name``: name of the region
* ``config``: Region archetype to use
* ``RegionArchetype``: name of the Region archetype you wish to use in your simulation, and the dotted line in this section represents any inputs that the archetype might have. ``RegionArchetype`` is not a valid region archetype name, so that will need to change to the name of whatever region archetype you want to use. 


In between the two dotted lines
is where the institution and facility information goes.

In this example, we will use the ``NullRegion`` archetype, which does not have any inputs. Filling this into our region block template, we get: 

.. code-block:: XML

    <region>
      <name>Region_name</name>
      <config>
        <NullRegion/>
      </config>
      <institution>
      ...
      ...
      </institution>

    </region>

Concept: Institutions
-----------------------------------------------------------------------
In |Cyclus| input files, each institution controls the deployment of 
the prototypes in the simulation, among other things. An institution block can only
appear within a region block. Each institution block has the following
sections in any order:

-  ``name`` (required, once) - a name for the prototype
-  ``lifetime`` (optional, once) - a non-negative integer indicating the
   number of time steps that this region agent will be active in the
   simulation
-  ``config`` (required, once) - the archetype-specific configuration
-  ``initialfacilitylist`` (optional, may appear multiple times) - a
   list of facility agents operating at the beginning of the simulation

Each ``initialfacilitylist`` block contains one or more ``entry`` blocks
that each contain the following sections, in the following order:

-  ``prototype`` - the name of a facility prototype defined elsewhere in
   the input file
-  ``number`` - the number of such facilities that are operating at the
   beginning of the simulation

Put together, the institution block is the form:

.. code-block:: XML

      <institution>
        <initialfacilitylist>
          <entry>
            <prototype>Prototype_name</prototype>
            <number>number_of_prototype_names</number>
          </entry>
          ...
        </initialfacilitylist>
        <name>Inst_name</name>
        <config>
          <NullInst/>
        </config>
      </institution>

There can be multiple ``entry`` blocks within the same institution, hence the 
``...`` in the block. Multiple entry blocks means that multiple prototypes 
are deployed at the start of the simulation. 


It is possible to have two institutions in the same region, as shown in the 
example input block below. The first institution has the name ``SingleInstitution``,
and is configured from the archetype with the name ``NullInst``. 
The ``NullInst`` has no defined archetype-specific data.
This institution begins the simulation with two
facility agents, one based on the ``FacilityA`` prototype and another
based on the ``FacilityB`` prototype. The second institution has the
name ``AnotherInstitution``, is also configured from the archetype with
the name (or alias) ``NullInst``. This institution has no initial
facilities.

.. code-block:: XML

      <institution>
        <initialfacilitylist>
          <entry>
            <prototype>FacilityA</prototype>
            <number>1</number>
          </entry>
          <entry>
            <prototype>FacilityB</prototype>
            <number>1</number>
          </entry>
        </initialfacilitylist>
        <name>SingleInstitution</name>
        <config>
          <NullInst/>
        </config>
      </institution>

      <institution>
        <name>AnotherInstitution</name>
        <config>
          <NullInst/>
        </config>
      </institution>

Putting a region and institution blocks together, a complete region template is of the form:

.. code-block:: XML

    <region>
      <name>Region_name</name>
      <config>
        <NullRegion/>
      </config>
      <institution>
        <initialfacilitylist>
          <entry>
            <prototype>Prototype_name</prototype>
              <number>number_of_prototype_names</number>
          </entry>
        </initialfacilitylist>
        <name>Inst_name</name>
        <config>
          <NullInst/>
        </config>
      </institution>
    </region>

Activity: Write the Region template
-----------------------------------

The next part of the region template is the other facilities in the
region's fuel cycle. In our example, these facilities are
``UraniumMine``, ``EnrichmentPlant``, and ``NuclearRepository``. Using
the template above and the table below, fill out the rest of the region
template.

+-----------------------+-----------------------------+----------+
| Variable              | Name                        | Amount   |
+=======================+=============================+==========+
| ``prototype``         | ``UraniumMine``             | ``1``    |
+-----------------------+-----------------------------+----------+
| ``prototype``         | ``EnrichmentPlant``         | ``1``    |
+-----------------------+-----------------------------+----------+
| ``prototype``         | ``NuclearRepository``       | ``1``    |
+-----------------------+-----------------------------+----------+
| ``institution_name``  | ``United States Nuclear``   | N/A      |
+-----------------------+-----------------------------+----------+
| ``region_name``       | ``USA``                     | N/A      |
+-----------------------+-----------------------------+----------+

Once complete, append this facility under the Sink prototype of your input file.

Check: Complete Region block
+++++++++++++++++++++++++++++++++++

The region section of your input file should now look like:

.. code-block:: XML

  <region>
    <name>USA</name>
    <config>
      <NullRegion/>
    </config>
    <institution>
      <initialfacilitylist>
        <entry>
          <prototype>UraniumMine</prototype>
          <number>1</number>
        </entry>
        <entry>
          <prototype>EnrichmentPlant</prototype>
          <number>1</number>
        </entry>
        <entry>
          <prototype>NuclearRepository</prototype>
          <number>1</number>
        </entry>
      </initialfacilitylist>
      <name>United States Nuclear</name>
      <config>
        <NullInst/>
      </config>
    </institution>
  </region>


Activity: Save your input file
------------------------------

Save your input file as ``tutorial_oncethrough.xml``


Activity: Add an extra institution into the Region
-------------------------------------------------
Having multiple institutions can help organize facilities and their affiliation.
In our ``USA`` region, we have the ``United States Nuclear`` institution that 
holds the ``UraniumMine``, ``EnrichmentPlant``, and ``NuclearRepository``
prototypes. Now let's add another institution. 

Our second institution will be called ``ReactorUtility``. This institution has one ``1178MWe ReactorPlant Unit 1`` prototype. 
Using this information we can add a second institution block into our ``USA`` 
region block after the ``United States Nuclear`` institution. 

Once complete, your region prototype should look like:

.. code-block:: XML

  <region>
    <name>USA</name>
    <config>
      <NullRegion/>
    </config>
    <institution>
      <initialfacilitylist>
        <entry>
          <prototype>UraniumMine</prototype>
          <number>1</number>
        </entry>
        <entry>
          <prototype>EnrichmentPlant</prototype>
          <number>1</number>
        </entry>
        <entry>
          <prototype>NuclearRepository</prototype>
          <number>1</number>
        </entry>
      </initialfacilitylist>
      <name>United States Nuclear</name>
      <config>
        <NullInst/>
      </config>
    </institution>

    <institution>
      <initialfacilitylist>
        <entry>
          <prototype>1178MWe ReactorPlant Unit 1</prototype>
          <number>1</number>
        </entry>
      </initialfacilitylist>
      <name>ReactorUtility</name>
      <config>
        <NullInst/>
      </config>
    </institution>
  </region>


We now have a complete region block. It is possible to have prototypes 
defined in your input file that are not listed in an institution. When 
that occurs, the prototypes are not deployed in the simulation. 

Activity: Save your Input File
------------------------------

You are now ready to generate a full |Cyclus| input file.

1. Save your input file as ``tutorial_oncethrough.xml``


Check: Full Input File
+++++++++++++++++++++++++++++++++++++++++++++++
`Full input file
<full_input_1.html>`_
