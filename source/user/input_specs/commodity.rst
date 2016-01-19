``Commodity`` - Commodity Priority  (optional, may appear multiple times)
==========================================================================

In |Cyclus|, a commodity is used to define how agents can interact.
Commodities are simply used to define which resources a facility can request
and/or offer.  The list of commodities in a problem is defined exclusively by
the commodities that are used in the definition of facility prototypes.

The ``commodity`` input block is only used to indicate a non-default priority
for a particular commodity in the dynamic resource exchange solution.

A ``commodity`` block has the following sections in the following order:

  * ``name`` (required once) - the unique name for this commodity
  * ``solution_priority`` (required once) - a number that defines the relative
    priority for resolution in the dynamic resource exchange (Default: -1)


Example
+++++++

**XML:**

.. code-block:: xml

  <commodity>
    <name>enriched_u</name>
    <solution_priority>5.5</solution_priority>
  </commodity>

  <commodity>
    <name>waste</name>
    <solution_priority>4.5</solution_priority>
  </commodity>

**JSON:**

.. code-block:: json

    {"commodity": {
       "name": "enriched_u",
       "solution_priority": 5.5 }
     }

    {"commodity": {
       "name": "waste",
       "solution_priority": 4.5 }
     }


In this example, while there may be many commodities used in the problem, two
of them are given explicit priorities.  The ``enriched_u`` has the highest
priority followed by ``waste``.  Note that these particular names do not imply
any specific composition of the commodity; this will be determined later by
the facilities that trade in these commodities.
 

.. rst-class:: html-toggle

Grammar Definition
+++++++++++++++++++

.. code-block:: xml

    <oneOrMore>
      <element name="commodity">
        <element name="name"> <text/> </element>
        <element name="solution_priority"> <data type="double"/> </element>
      </element>
    </oneOrMore>
