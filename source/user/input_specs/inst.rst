``Institution`` - Institution agents (at least one required in each ``Region``)
===============================================================================

Every agent that participates in a |cyclus| simulation represents either a
facility, an institution or a region.  Each ``institution`` block defines an
agent that acts as an institution in the simulation.  In contrast to the
``facility`` block that defines a :term:`prototype`, this block defines an
:term:`agent`.

An ``institution`` block can only appear within a ``region`` block.

Each ``institution`` block has the following sections in any order:

* ``name`` (required once) - a name for the prototype
* ``lifetime`` (optional once) - a non-negative integer indicating the number
  of time steps that this institution agent will be active in the simulation
* ``config`` (required once) - the archetype-specific configuration
* ``initialfacilitylist`` (optional, may appear multiple times) - a list of
  facility agents operating at the beginning of the simulation

Each ``initialfacilitylist`` block contains one or more ``entry`` blocks that
each contain the following sections, in the following order:

* ``prototype`` - the name of a facility prototype defined elsewhere in the input file
* ``number`` - the number of such facilities that are operating at the beginning of the simulation

Example
+++++++

.. code-block:: xml

    <institution>
      <name>SingleInstitution</name>
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
      <config> <NullInst/> </config>
    </institution>

    <institution>
      <name>AnotherInstitution</name>
      <config> <NullInst/> </config>
    </institution>


This example introduces two institution agents (the region section that
encloses them is not shown).  The first institution has the name
`SingleInstitution`, and is configured from the :term:`archetype` with the
name (or alias) `NullInst`.  The author of the ``NullInst`` archetype has
defined no archetype-specific data. This agent begins the simulation with two
facility agents, one based on the ``FacilityA`` prototype and another based on
the ``FacilityB`` prototype.  The second institution has the name
`AnotherInstitution`, is also configured from the archetype with the name (or
alias) ``NullInst``.  This institution has no initial facilities.

.. code-block:: json

     {
      "institution": {
        "name": "SingleInstitution",
        "initialfacilitylist": [{
          "entry": {
            "prototype": "FacilityA",
            "number": 1}},
          {"entry": {"prototype": "FacilityB"}}],
        "config": {}
        }
      }

     {
      "institution": {
        "name": "AnotherInstitution",
        "config": {}
        }
      }


This is what the example above would look like if written in JSON.

.. rst-class:: html-toggle

Grammar Definition
++++++++++++++++++

.. code-block:: xml
   
        <element name="institution"> <interleave>
          <element name="name"> <text/> </element>
          <optional>
            <element name="lifetime"> <data type="nonNegativeInteger"/> </element>
          </optional>

          <optional>
            <element name="initialfacilitylist">
              <oneOrMore>
                <element name="entry">
                  <element name="prototype"> <text/> </element>
                  <element name="number"> <data type="nonNegativeInteger"/> </element>
                </element>
              </oneOrMore>
            </element>
          </optional>

          <element name="config">
            <choice>
            @Inst_REFS@
            </choice>
          </element>
        </interleave> </element>

