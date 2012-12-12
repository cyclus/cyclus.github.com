
Simulation-level Input
======================

Simulation Control
------------------

Simulation control is the input portion relating to time and decay.
The input parameters are:

  * duration - the time duration of the simulation (in months)
  * startmonth - the starting month (0 -> January, 11->December)
  * startyear - the starting year
  * simstart - the actual time-step to begin the simulation (to be 
    deprecated)
  * decay - an integer value denoting the frequency with which 
    materials should be decayed (note, an entry of 0 or less will cause 
    decay not to be turned on for the simulation

Definition
++++++++++

.. code-block:: xml
   
  <!-- begin section for simulation parameters -->
  <define name="control"/>
    <interleave>
      <element name="duration">
        <data type="nonNegativeInteger"/>
      </element>
      <element name="startmonth">
        <data type="nonNegativeInteger"/>
      </element>
      <element name="startyear">
        <data type="nonNegativeInteger"/>
      </element>
      <element name="simstart">
        <data type="nonNegativeInteger"/>
      </element>
      <element name="decay">
        <data type="integer"/>
      </element>
    </interleave>
  </define>

Example
+++++++

.. code-block:: xml

  <control>
    <duration>1105</duration>   <!-- run for 100 years + 1 month -->
    <startmonth>11</startmonth> <!-- start in december -->
    <startyear>2007</startyear> <!-- start in 2007 -->
    <simstart>0</simstart>      <!-- the initial time value is 0 -->
    <decay>0</decay>            <!-- don't decay material -->
  </control>

Commodities
-----------

Definition
++++++++++

All materials that are passed around the simulation a denoted by their
commodity type. For each commodity type, one must add its definition
to the input file. The input parameters are:

  * name - the commodity's name

.. code-block:: xml

    <oneOrMore>
      <element name="commodity">
        <element name="name">
          <text/>
        </element>
      </element>
    </oneOrMore>

Example
+++++++

.. code-block:: xml

  <commodity>
    <name>natl_u</name>
  </commodity>

  <commodity>
    <name>enriched_u</name>
  </commodity>

  <commodity>
    <name>waste</name>
  </commodity>

Markets
-------

For each commodity, a corresponding market must be defined. This step
is necessary 

The input parameters are:
 
  * name - the name of the market
  * mktcommodity - the commodity associated with the market
  * model - the model to be used for this market. Note that the only
    market model currently available is the NullMarket.

Definition
++++++++++

.. code-block:: xml
  
    <oneOrMore>
    <element name="market">
      <element name="name">
        <text/>
      </element>
      <element name="mktcommodity">
        <text/>
      </element>
      <element name="model">
        <text/>
      </element>
    </element>
    </oneOrMore>

Example
+++++++

.. code-block:: xml

  <market>
    <name>natl_u_market</name>
    <mktcommodity>natl_u</mktcommodity>
    <model>
      <NullMarket/>
    </model>
  </market>

  <market>
    <name>enr_u_market</name>
    <mktcommodity>enriched_u</mktcommodity>
    <model>
      <NullMarket/>
    </model>
  </market>

  <market>
    <name>waste_market</name>
    <mktcommodity>waste</mktcommodity>
    <model>
      <NullMarket/>
    </model>
  </market>

Recipes
-------

The input parameters are:
 
  * name - the name of the recipe
  * basis - whether the recipe is defined on a MASS or ATOM basis
  * isotopes - the list of isotopes comprising the recipe

    * id - the ZAID number for an isotope
    * comp - the percent composition for that isotope (Note: The sum 
      of these need not add to 1. Recipes are normalized.)

Predefined material recipes can be supplied as input to the 
simulation. Materials can easily be instantiated with the given list
of isotopics, e.g., natural uranium.

Definition
++++++++++

.. code-block:: xml

  <!-- begin section for recipes -->
  <define name="recipe">
    <element name="recipe">

      <element name="name">
        <text/>
      </element>

      <element name="basis">
        <text/>
      </element>

      <oneOrMore>
      <element name="isotope">
        <element name="id">
          <text/>
        </element>
        <element name="comp">
          <text/>
        </element>
      </element>
      </oneOrMore>

    </element>
  </define>


Example
+++++++

.. code-block:: xml

  <recipe>
    <name>natl_u</name>
    <basis>mass</basis>
    <isotope>
      <id>92235</id>
      <comp>0.711</comp>
    </isotope>
    <isotope>
      <id>92238</id>
      <comp>99.289</comp>
    </isotope>
  </recipe>
