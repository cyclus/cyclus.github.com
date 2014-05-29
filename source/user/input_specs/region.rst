``Region`` - Region agents (at least one required)
============================================================

Every agent that participates in a |cyclus| simulation represents either a
facility, an institution or a region.  Each ``region`` block defines an agent
that acts as a region in the simulation.  In contrast to the ``facility``
block that defines a :term:`prototype`, this block defines an :term:`agent`.

Each ``region`` block has the following sections in any order:

* ``name`` (required once) - a name for the prototype
* ``lifetime`` (optional once) - a non-negative integer indicating the number
  of time steps that this region agent will be active in the simulation
* ``config`` (required once) - the archetype-specific configuration
* ``institution`` (required at least once ) - an institution agent operating in this region

Example
+++++++

.. code-block:: xml

  <region>
    <name>MyHomeRegion</name>
    <config> <NullRegion/> </config>
    <institution>
        ... data for this institution goes here
    </institution>
  </region>


  <region>
    <name>MyNeighborRegion</name>
    <config> 
      <GrowthRegion> 
         ... archetype-specific input for a `GrowthRegion` archetype
      </GrowthRegion>
    </config>
    <institution>
         ... data for this institution goes here
    </institution>
  </region>


This example introduces two region agents.  The first has the name
`MyHomeRegion`, and is configured from the :term:`archetype` with the name (or
alias) `NullRegion`.  The author of the ``NullRegion`` archetype has defined
no archetype-specific data.  The second has the name ``MyNeighborRegion`` and
is based on the archetype with the name (or alias) `GrowthRegion`.  The
contents of the ``GrowthRegion`` section are defined by the author of the
`GrowthRegion` archetype.

.. rst-class:: html-toggle

Grammar Definition
++++++++++++++++++

.. code-block:: xml
   
    <element name="region"> <interleave>
      <element name="name"> <text/> </element>
      <optional>
        <element name="lifetime"> <data type="nonNegativeInteger"/> </element>
      </optional>

      <element name="config">
        <choice>
        @Region_REFS@
        </choice>
      </element>

      <oneOrMore>
        <ref name="institution" />
      </oneOrMore>

    </interleave> </element>

