``Control`` - Simulation Control (required once)
================================================

Simulation control is the input portion relating to time, uses the ``control``
tag, and has the following sections in any order:

  * duration (required once) - the time duration of the simulation (in months)

  * startmonth (required once) - the starting month (1 -> January, 12->December)

  * startyear (required once) - the starting year

  * simhandle (optional, once) - a user-defined identifier for this simulation

  * explicit_inventory (optional, once) - boolean specifying whether or not to
    create the :ref:`ExplicitInventory <explicit-inv-table>` table in the
    database.  Because this significantly impacts simulation performance, it
    is deactivated by default.

  * explicit_inventory_compact (optional, once) - boolean specifying whether
    or not to create the :ref:`ExplicitInventoryCompact
    <explicit-inv-compact-table>` table in the database.  Because this
    significantly impacts simulation performance, it is deactivated by default.

  * dt (optional, once) - the duration of a single time step in seconds.  If
    omitted, a default value of 1/12 of a year is used (i.e. 2,629,846
    seconds).

  * decay (optional, once) - choose one of:

    - ``never``: turns decay completely off.
    - ``manual``: decay is only computed if archetypes/agents explicilty decay
      their own material objects.
    - ``lazy``: decay is only computed whenever archetypes/agents "look" at a
      composition.

  * solver (optional, once) - configure the DRE solver.

    - choose one of:

      - ``greedy``: use a greedy heuristic (not guaranteed optimal, but fast)
        that orders trades based on the average preference of exchange groups

        - preconditioner (optional) - precondition greedy-solved graphs

          - choose one of:
		  
		    - ``greedy``: use an average-preference greedy preconditioner

      - ``coin-or``: use the COIN-OR CLP/CBC solver suite

        - timeout (optional): kill solutions after this time (in seconds)
		- verbose (optional): print information about problems being solved
		- mps (optional): write MPS files for each exchange

    - ``allow_exclusive_orders`` (optional) - exclusive orders should be
      allowed, `True` by default. **NOTE** many Cycamore archetypes depend on
      this option being `True` and will not work as expected if it is
      `False`. This option can be turned to `False` to guarantee LP solves of
      the DRE.

Example
+++++++


**XML:**

.. code-block:: xml

  <control>
    <startyear>2007</startyear>   <!-- start in 2007 -->
    <startmonth>11</startmonth>   <!-- start in november -->
    <duration>1200</duration>     <!-- run for 100 years -->
    <dt>86400</dt>                <!-- 1-day time steps -->
    <decay>lazy</decay>           
  </control>


**JSON:**

.. code-block:: json

     {
      "control": {
        "startyear": 2007,
        "startmonth": 11,
        "duration": 1200,
        "dt": 86400,
        "decay": "lazy" }
      }


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
        <element name="explicit_inventory"> <data type="boolean"/> </element>
      </optional>
      <optional>
        <element name="explicit_inventory_compact"> <data type="boolean"/> </element>
      </optional>
      <optional>
        <element name="solver"> 
          <interleave>
            <optional><element name="config">
            <choice>
              <element name="greedy">
                <interleave>
                  <optional>
                    <element name="preconditioner"> <text/> </element>
                  </optional>
                </interleave>
              </element>
              <element name="coin-or">
                <interleave>
                  <optional>
                    <element name="timeout">  <data type="positiveInteger"/>  </element>
                  </optional>
                  <optional><element name="verbose"><data type="boolean"/></element></optional>
                  <optional><element name="mps"><data type="boolean"/></element></optional>
                </interleave>
              </element>
            </choice>
            </element></optional>
            <optional>
              <element name="allow_exclusive_orders">
                <data type="boolean" />
              </element>
            </optional>
            <optional><!--deprecated. @TODO remove in release 1.5 -->
              <element name="exclusive_orders_only">
                <data type="boolean" />
              </element>
            </optional>
          </interleave>
        </element>
      </optional>
    </interleave>
  </element>

