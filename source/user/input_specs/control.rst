``Control`` - Simulation Control (required once)
================================================

Simulation control is the input portion relating to time, uses the ``control``
tag, and has the following sections in any order:

  * duration (required once) - the time duration of the simulation (in months)

  * startmonth (required once) - the starting month (1 -> January, 12->December)

  * startyear (required once) - the starting year

  * simhandle (optional, once) - a user-defined identifier for this simulation

  * dt (optional, once) - the duration of a single time step in seconds.  If
    omitted, a default value of 1/12 of a year is used (i.e. 2,629,846
    seconds).

  * decay (optional, once) - choose one of:

    - ``never``: turns decay completely off.
    - ``manual``: decay is only computed if archetypes/agents explicilty decay
      their own material objects.
    - ``lazy``: decay is only computed whenever archetypes/agents "look" at a
      composition.

Example
+++++++

.. code-block:: xml

  <control>
    <startyear>2007</startyear>   <!-- start in 2007 -->
    <startmonth>11</startmonth>   <!-- start in november -->
    <duration>1200</duration>     <!-- run for 100 years -->
    <dt>86400</dt>                <!-- 1-day time steps -->
    <decay>lazy</decay>           
  </control>

This example starts in November 2007, and runs for 100 years (1200 months).

.. rst-class:: html-toggle

Grammar Definition
++++++++++++++++++

.. code-block:: xml
   
  <element name ="control">
    <interleave>
      <optional>
        <element name="simhandle"> <data type="string"/> </element>
      </optional>
      <element name="duration"> <data type="nonNegativeInteger"/> </element>
      <element name="startmonth"> <data type="nonNegativeInteger"/> </element>
      <element name="startyear"> <data type="nonNegativeInteger"/> </element>
      <optional>
        <element name="decay"> <text/> </element>
      </optional>
      <optional> 
        <element name="dt"><data type="nonNegativeInteger"/></element> 
      </optional>
      <optional>
        <element name="solver"> 
          <interleave>
            <optional>
              <element name="name"> <text/> </element>
            </optional>
            <optional>
              <choice>
                <element name="greedy">
                  <interleave>
                    <optional>
                      <element name="preconditioner"> <text/> </element>
                    </optional>
                  </interleave>
                </element>
              </choice>
            </optional>
            <optional>
              <element name="exclusive_orders_only">
                <data type="boolean" />
              </element>
            </optional>
          </interleave>
        </element>
      </optional>
    </interleave>

