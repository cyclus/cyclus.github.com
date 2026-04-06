``Package`` and ``TransportUnit`` - Package and Transport Unit Definition (optional, may appear multiple times)
================================================================================================================

Package types are a fundamental parameter of resources in Cyclus, with a 
default of ``unpackaged``, with no restrictions. The user can define their own
package types as well. Currently, packaging is available in the Material Sell
Policy (see Cyclus Toolkit), and is implemented in the Cycamore:Storage 
facility archetype; Storage re-packages outgoing commodidies as they are being
traded to another agent.

Packaging is currently available in the Material Sell Policy (see Cyclus Toolkit),
and is implemented in cycamore:Storage. Storage makes bids on its outcommodity
based on its packaging restrictions and re-packages outgoing commodidies
as they are being traded to another agent.

A ``package`` block has the following sections:

  * ``name`` (required once) - the unique name for this type of packaging

  * ``fill_min`` - the minimum amount of material that can be in the package
    (default: 0)

  * ``fill_max`` - the maximum amount of material that can be in the package
    (default: infinity)

  * ``strategy`` - The algorithm used to determine the quantity of material 
    placed in a package when more than ``fill_max`` is available to package.
    Current options are:

        * ``first`` - Packages are filled up to the ``fill_max`` one by one, 
          until less than ``fill_min`` is left to package. 
        * ``equal`` - Given the amount of material available to package, 
          all packages are filled to the same level.

Example (item)
++++++++++++++
This example defines a PWR fuel assembly package. Item packages (where the 
``fill_min`` and ``fill_max`` are the same) do not need to specify the 
``strategy`` value.

.. code-block:: xml

  <package>
    <name>pwr_assembly</name>
    <fill_min>615.2</fill_min>
    <fill_max>615.2</fill_max>
  </package>

Example (bulk)
++++++++++++++
This example defines a UF6 cylinder package.

.. code-block:: xml

  <package>
    <name>UF6_cylinder</name>
    <fill_min>1</fill_min>
    <fill_max>0.8</fill_max>
    <fill_strategy>first</fill_strategy>
  </package>

TransportUnit
+++++++++++++

Transport units are a way to furhter restrict the movement of resources in a
simulation. Unlike packages (above), ``TransportUnit``s are not a parameter of
resources, but rather a restriction available in the Material Sell Policy
(see Cyclus Toolkit) to restrict trades to an integer number of packages.

A ``TransportUnit`` block has the following sections:

  * ``name`` (required once) - the unique name for this type of transport unit

  * ``fill_min`` - the minimum number of packages that can be in the transport
    unit, integer (default: 0)

  * ``fill_max`` - the maximum number of packages that can be in the transport 
    unit, integer (default: infinity)

  * ``strategy`` - the algorith used to determine the number of packages placed
    in a transport unit when more than ``fill_max`` are available to package.
    Current options are:

        * ``first`` - Transport units are filled up to the ``fill_max`` one by
          one, until less than ``fill_min`` is left to package.
        * ``equal`` - Given the number of packages available to package, all
          transport units are filled to the same level.
        * ``hybrid`` - Fill transport units iteratively, re-calculating the
          number of packages to place in each transport unit based on the
          remaining packages. More efficient than ``equal`` or ``first`` at
          sending the maximum number of packages.

Transport Unit Example
+++++++++++++++++
This example requires that three or four UF6 cylinders be shipped in the same
flatrack.

**XML:**

.. code-block:: xml

    <transportunit>
        <name>UF6_flatrack</name>
        <fill_min>3</fill_min>
        <fill_max>4</fill_max>
        <strategy>hybrid</strategy>
    </transportunit>

.. rst-class:: html-toggle

Grammar Definition
++++++++++++++++++

**Packaging XML:**

.. code-block:: xml

    <element name="package">
      <interleave>
        <element name="name"><text/></element>
        <element name="fill_min"><data type="double"/></element>
        <element name="fill_max"><data type="double"/></element>
        <element name="strategy"><text/></element>
      </interleave>
    </element>


**Transport Unit XML:**

.. code-block:: xml

    <element name="transportunit">
      <interleave>
        <element name="name"><text/></element>
        <element name="fill_min"><data type="nonNegativeInteger"/></element>
        <element name="fill_max"><data type="nonNegativeInteger"/></element>
        <element name="strategy"><text/></element>
      </interleave>
    </element>