Starting a New Scenario
============================

Problem Definition
--------------------

We will start with a new scenario representing a simplified once-through fuel
cycle.  For the purpose of this tutorial, the scenario will include:

* mine producing natural uranium
* enrichment facility producing 4% enriched uranium oxide fuel
* LWR reactor consuming fresh fuel and producing used fuel
* repository to house all spent fuel and waste

More details about each of these facilities will discussed when we are
required to provide that input.

Concept: Simulation Time Steps
------------------------------

A |Cyclus| input file can be written in `multiple formats <https://fuelcycle.org/user/writing_input.rst>`_, 
including XML, JSON, and Python. That page also walks through the 
basic structure for each type of input file. This tutorial will walk through 
how to build an XML input. 

The XML |Cyclus| input file begins with the ``<simulation>`` tag and ends with the 
``</simulation>`` tag. Within this space, the ``<control>`` block is the first
section of the CYCLUS input file and is of the form:

.. code-block:: XML

    <simulation>
      <control>
        <duration>duration_val</duration>
        <startmonth>start_month_val</startmonth>
        <startyear>start_year_val</startyear>
        <decay>decay_val</decay>
      </control>


    </simulation>

Each of the elements shown are user-defined and required for each 
|Cyclus| simulation:

1. Simulation: the simulation handle contains all the parameters in the simulation.

2. Duration: the number of timesteps to be simulated

3. Start month: the first month of the simulation (e.g.: 1 for January)

4. Start year: the first year of the simulation

5. Decay mode:The |Cyclus| kernel has built-in experimental support for 
`Decay <http://fuelcycle.org/devdoc/decay.html>`_ calculations. Materials 
store the time since their last decay and agents are free to invoke the 
decay function on them as desired to decay them to the current simulation 
time. |Cyclus| can operate in 3 decay modes, with 1 additional mode 
likely to be added in a future release:

- 'never', all decay is turned off
- 'manual', meaning it is only on if the individual archetype decays their own inventory
- 'lazy', which will compute decay only when archetypes fetch a particular composition.
- 'periodic' (future), automatically decays all materials in a simulation with some fixed frequency. 

There are other `optional parameters <http://fuelcycle.org/user/input_specs/control.html>`_ 
that could be given but are not in the scope of this tutorial. For simplicity, 
we will not model decay in this tutorial.

The lifetime of a |Cyclus| simulation is determined by its `duration`, the 
number of timesteps |Cyclus| will model the fuel cycle. |Cyclus| uses a 
time-step approach to march through time and determine what actions are 
taken by each agent at each point in time.  Each time step includes the following phases:

* new agents may enter the system (deployment)
* each agent prepares for exchange of material
* agents engage in material trades
* each agent acts after the exchange of material
* agents may leave the system (decommissioning)

This tutorial assumes a time step of 1 month


Activity: Set Simulation Parameters
-----------------------------------
Using the simulation control template above and the table below, properly fill the template 
with the variables listed in the table below in your favorite text editor.

+-------------------+---------------+---------------------------------+
| Variable          | Value         | Purpose                         |
+===================+===============+=================================+
| ``duration``      | ``720``       | length of simulation (months)   |
+-------------------+---------------+---------------------------------+
| ``start_month``   | ``1``         | start month of simulation       |
+-------------------+---------------+---------------------------------+
| ``start_year``    | ``2018``      | start year of simulation        |
+-------------------+---------------+---------------------------------+
| ``decay``         | ``never``     | radioactive decay               |
+-------------------+---------------+---------------------------------+

Using this table, let's set the simulation parameters.

1. To tell |Cyclus| that this is the simulation section of the input file, 
first add a ``simulation`` block:

.. code-block:: XML

    <simulation>
    </simulation>

2. Place the ``control`` header in as such

.. code-block:: XML

  <simulation>
    <control>
    </control>
  </simulation>

Adding spaces to indent the ``control`` header improves ease of reading. 

3. After filling in the parameters listed in the table above, close the control and simulation sections as:

.. code-block:: XML

    <simulation>
      <control>
        <duration>720</duration>
        <startmonth>1</startmonth>
        <startyear>2018</startyear>
        <decay>never</decay>
      </control>


    </simulation>

**Note**: There are two blank lines between the end of the control section and 
end of the simulation section. This section of the simulation block will hold 
the rest of the simulation parameter blocks (commodities, facilities, regions, 
institutions, and recipe blocks).
