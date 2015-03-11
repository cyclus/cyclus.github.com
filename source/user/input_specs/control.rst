``Control`` - Simulation Control (required once)
================================================

Simulation control is the input portion relating to time, uses the ``control``
tag, and has the following sections in any order:

  * duration (required once) - the time duration of the simulation (in months)
  * startmonth (required once) - the starting month (1 -> January, 12->December)
  * startyear (required once) - the starting year
  * simhandle (optional, once) - a user-defined identifier for this simulation
  * decay (optional, once) - choose "manual" or "never" to define decay behavior


Example
+++++++

.. code-block:: xml

  <control>
    <startyear>2007</startyear>   <!-- start in 2007 -->
    <startmonth>11</startmonth>   <!-- start in november -->
    <duration>1200</duration>     <!-- run for 100 years  -->
  </control>

This example starts in November 2007, and runs for 100 years (1200 months).

.. rst-class:: html-toggle

Grammar Definition
++++++++++++++++++

.. code-block:: xml
   
  <element name ="control">
    <interleave>

      <element name="duration">   <data type="nonNegativeInteger"/> </element>
      <element name="startmonth"> <data type="nonNegativeInteger"/> </element>
      <element name="startyear">  <data type="nonNegativeInteger"/> </element>

      <optional>
        <element name="simhandle"> <data type="string"/> </element>
      </optional>

      <optional>
        <element name="decay"> <text/> </element>
      </optional>

    </interleave>
  </element>

