``Recipe`` - Recipe Definition (optional, may appear multiple times)
==========================================================================

The most common resources being exchanged by |Cyclus| agents is a
:term:`material` which has both a :term:`composition` and a mass.  While the
composition of a material object may be manipulated over time by the agents
that transact it, it is often necessary for the user to define a specific
recipe for a material.  Each ``recipe`` section can be used to define a named
composition that can then be referenced elsewhere, such as in the data for an
archetype.

A ``recipe`` block has the following sections in the following order:

  * ``name`` (required once) - the unique name for this commodity

  * ``basis`` (required once) - an indication of whether the composition is
    based on the atom fractions or mass fractions; one of:

        * `atom` - atom fractions are given in the nuclide list
        * `mass` - mass fractions are given in the nuclude list

  * ``nuclide`` (required at least once) - a list of nuclides and their
    relative quantities, where each section includes:

       * ``id`` - identifies a particular nuclide either with its canonical
         integer ID in the form ZZAAAMMMM or one of a few other common forms.
         Here are some acceptable forms: 922350000, U-235, U235, Am242M.
         The canonical integer nuclide format is a general format that encodes
         the atomic number (Z), the mass number (A) and the energy state (M)
         with the formula (Z*1000 + A) * 10000 + M.

       * ``comp`` - a number indicating the quantity of this nuclide to that
         of other nuclides in the material.  The quantities are normalized to
         the sum of all a composition's constituents, so the user need not
         provide quantities normalized to any particular value.

Example
+++++++
This example defines two material compositions.  The first has the name
``commod_recipe``, is defined using mass fractions, and contains a single
nuclide of H-1.  The second recipe is named ``natU_recipe``, is defined using
atom fractions, and contains two nuclides: 0.7% of the atoms are U-235 and
99.3% of the atoms are U-238.


**XML:**

.. code-block:: xml

  <recipe>
    <name>proton_recipe</name>
    <basis>mass</basis>
    <nuclide>
      <id>010010000</id>
      <comp>1</comp>
    </nuclide>
  </recipe>

  <recipe>
    <name>natU_recipe</name>
    <basis>atom</basis>
    <nuclide>
      <id>922350000</id><comp>0.007</comp>
    </nuclide>
    <nuclide>
      <id>922380000</id><comp>0.993</comp>
    </nuclide>
  </recipe>


**JSON:**

.. code-block:: json

     {
      "recipe": [
        {"name": "proton_recipe",
         "basis": "mass",
         "nuclide": {"id": "H1", "comp": 1}
        },
        {"name": "natU_recipe",
         "basis": "atom",
         "nuclide": [
            {"id": "U235", "comp": 0.007},
            {"id": "U238", "comp": 0.993}
            ]
         }
        ]
      }


**Python:**

.. code-block:: python

     {"recipe": [
        {"name": "proton_recipe",
         "basis": "mass",
         "nuclide": {"id": "H1", "comp": 1},
        },
        {"name": "natU_recipe",
         "basis": "atom",
         "nuclide": [
            {"id": "U235", "comp": 0.007},
            {"id": "U238", "comp": 0.993},
            ],
         },
        ],
      }

.. rst-class:: html-toggle

Grammar Definition
+++++++++++++++++++

.. code-block:: xml

    <element name="recipe">
      <element name="name"><text/></element>
      <element name="basis"><text/></element>
      <oneOrMore>
        <element name="nuclide">
          <element name="id"><data type="nonNegativeInteger"/></element>
          <element name="comp"><data type="double"/></element>
        </element>
      </oneOrMore>
    </element>
