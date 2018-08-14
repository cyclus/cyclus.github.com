Adding Regions and Institutions
===============================

Concept: Regions & Institutions
-------------------------------
**!!!**

|Cyclus| establishes a hierarchy of agents: Facility agents are operated by
Institution agents that exist within a Region agent.  This sense of ownership
and coarse "geolocation" allow for modifications of the interaction behavior
among agents.  For example, two facilities who trade in the same commodity,
but that exist in different regions may be disallowed from participating in a
trade.

Every |Cyclus| simulation needs at least one Region and one Institution, and
in this case, we'll use the simplest options:

* a Null Institution (*NullInst*) that holds a set of facilities that are
  deployed at the start of a simulation.
* a Null Region (*NullRegion*) that holds a set of Institutions.

We have already created the facilities that will act in our simulation, but now we need to create the Institutions and Region that will hold all these facilities together.
Regions are the location of the facilities within a cyclus simulation and tie together a fuel cycle as they designate what facilities are in the region's fuel cycle. Regions may apply preferences to each potential request-bid pairing based on the proposed resource transfer.
The basic structure of a region is:
::

  <region>
        <name>region_name</name>
        <config>
          <NullRegion/>
        </config>
        <institution>
          <initialfacilitylist>
            <entry>
              <prototype>protoype_1</prototype>
              <number>1</number>
            </entry>
            </initialfacilitylist>
        </institution>
  </region>

Each region block has the following sections in any order:

  - ``name`` is the name of the region
  - ``config`` is the archetype-specific configuration
  - ``institution`` - an institution agent operating in this region

Activity: Add a Region
++++++++++++++++++++++
Let's create region, ``USA``, that contains two institutions, ``Exelon`` and ``United States Nuclear``.
``Exelon`` is the institution that holds the ``1178MWe BRAIDWOOD-1`` reactor and ``United States Nuclear`` holds the ``UraniumMine``, ``EnrichmentPlant``, and ``NuclearRepository``.

.. image:: RIF_tutorial.png

Using the template above and the table below, let's build the region.

1. Since their are two institutions, 'Exelon' and ``United States Nuclear`` we will split the region into two parts.
Let's first build the ``Exelon`` institution. This institution has one ``1178MWe BRAIDWOOD-1`` prototype reactor. Using this information we can write this institution as:
::

  <region>
    <name>USA</name>
    <config>
      <NullRegion/>
    </config>
    <institution>
      <initialfacilitylist>
        <entry>
          <prototype>1178MWe BRAIDWOOD-1</prototype>
          <number>1</number>
        </entry>
        </initialfacilitylist>
      <name>Exelon </name>
      <config>
        <NullInst/>
      </config>
    </institution>

2. Now let's build the second institution, ``United States Nuclear``. This institution has one ``UraniumMine`` prototype, ``EnrichmentPlant`` prototype, and one ``NuclearRepository`` prototype. Using this information we can write this institution as:
::

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

3. We will close the region section by appending the two sections together and appending a ``</region>`` tag to the end of the section. Once complete, your region prototype should look like:
::

  <region>
    <name>USA</name>
    <config>
      <NullRegion/>
    </config>
    <institution>
      <initialfacilitylist>
        <entry>
          <prototype>1178MWe BRAIDWOOD-1</prototype>
          <number>1</number>
        </entry>
        </initialfacilitylist>
      <name>Exelon</name>
      <config>
        <NullInst/>
      </config>
    </institution>

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

Activity: Generate (and Save) your Input File
+++++++++++++++++++++++++++++++++++++++++++++++

You are now ready to generate a full |Cyclus| input file.

1. Save your input file as 'input_file.xml'
