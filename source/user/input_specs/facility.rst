``Facility`` - Facility Prototypes (at least one required)
============================================================

Every agent that participates in a |cyclus| simulation represents either a
facility, an institution or a region.  Each ``facility`` block defines a
single prototype for an agent that acts as a facility in the simulation.

Each ``facility`` block has the follwoing sections in any order:

* ``name`` (required once) - a name for the prototype
* ``lifetime`` (optional once) - a non-negative integer indicating the number
  of time steps that an agent of this prototype will be active in the
  simulation
* ``config`` (required once) - the archetype-specific configuration


Example
+++++++

.. code-block:: xml

  <facility>
    <name>LongTermStorage</name>
    <config>
      <Sink>
         ... archetype-specific input for a `Sink` archetype
      </Sink>
    </config>
  </facility>

  <facility>
    <name>PBMR</name>
    <lifetime>720</lifetime>
    <config>
      <RecipeReactor>
         ... archetype-specific input for a `RecipeReactor` archetype
      </RecpieReactor>
    </config>
  </facility>


This example introduces two facility prototypes.  The first has the name
`LongTermStorage`, and is configured from the :term:`archetype` with the name
(or alias) `Sink`.  The contents of the ``Sink`` section are defined by the
author of the `Sink` archetype.  The second has the name ``PBMR``, has a
lifetime of 720 time steps (60 years) and is based on the archetype with the
name (or alias) `RecipeReactor`.  The contents of the ``RecipeReactor``
section are defined by the author of the `RecipeReactor` archetype.


.. code-block:: json

     {
      "facility": {
        "name": "LongTermStorage",
        "config": {
        "sink": "... archetype-specific input for a `Sink` archetype" }
        }
      }


     {
      "facility": {
        "name": "PBMR",
        "lifetime": 720,
        "config": {
        "RecipeReactor": "... archetype-specific input for a `RecipeReactor` archetype" }
        }
      }


This is what the example above would look like if written in JSON.


.. rst-class:: html-toggle

Grammar Definition
++++++++++++++++++

.. code-block:: xml
   
    <element name="facility">
      <element name="name"> <text/> </element>
      <optional>
        <element name="lifetime"> <data type="nonNegativeInteger"/> </element>
      </optional>

      <element name="config">
        <choice>
        @Facility_REFS@
        </choice>
      </element>
    </element>

