Starting a New Scenario
============================

Problem Definition
--------------------

We will start with a new scenario representing a simplified once-through fuel
cycle.  For the purpose of this tutorial, the scenario will include:

* mine of natural uranium
* enrichment facility producing 4% enriched uranium oxide fuel
* LWR reactor consuming fresh fuel and producing used fuel
* repository to house all spent fuel

More details about each of these facilities will discussed when we are
required to provide that input.


Activity: Importing the necessary packages
------------------------------------------

1. We will need to import a couple of packages to properly run the tutorial. In your IPython notebook, import the necessary packages by copying and pasting the import statements below into the first cell.

.. code:: ipython3

    from pyne import nucname
    import cyutils
    from cyutils import analysis
    from cyutils import write
    from cyutils import economics
    import matplotlib.pyplot as plt
    import numpy as np
    from numpy import isclose


Concept: Simulation Time Steps
--------------------------------

|Cyclus| uses a time-step approach to march through time and determine what
actions are taken by each agent at each point in time.  Each time step
includes the following phases:

* new agents may enter the system (deployment)
* each agent prepares for exchange of material
* agents engage in material trades
* each agent acts after the exchange of material
* agents may leave the system (decommissioning)

Users do not have to manage these phases, but must provide the following
information for all simulations:

1. Duration: the number of months to be simulated
2. Start Month: the first month of the simulation
3. Start Year: the first year of the simulation
4. Decay treatment: Turn off all decay ("never") or allow individual archetypes to implement it
5. Simulation Handle: An optional unique identifier for this particular simulation.
6. Description: A brief discription for your benefit.

We'll return later to the topics of generating, loading and executing an input file.


Activity: Set Simulation Parameters
------------------------------------
The top level simulation parameters are shown in the **Simulation Details** table (see below).

+-------------------+---------------+---------------------------------+
| Variable          | Value         | Purpose                         |
+===================+===============+=================================+
| ``duration``      | ``720``       | length of simulation (months)   |
+-------------------+---------------+---------------------------------+
| ``start_month``   | ``1``         | start month of simulation       |
+-------------------+---------------+---------------------------------+
| ``start_year``    | ``2018``      | start year of simulation        |
+-------------------+---------------+---------------------------------+
| ``decay``         | ``'never'``   | radioactive decay               |
+-------------------+---------------+---------------------------------+

Using this table, let's set the simulation parameters.

1. We want to set the duration of the simulation to be ``720`` months. In an empty cell in you IPython notebook enter:

.. code:: ipython3

    duration = 720 # length of simulation (months)

2. Now let's set the start month of the simulation to be 1 (January). Under ``duration`` enter:

.. code:: ipython3

    start_month = 1 # start month of simulation

3. Set the start year of the simulation to be 2018. Under ``start_month`` enter:

.. code:: ipython3

    start_year = 2018 # start year of simulation

4. Last but not least, let's set the decay settings to be ``never``. Under ``start_year`` enter:

.. code:: ipython3

    decay = 'never' # radioactive decay

5. Let's put this information into a list. To do so, under ``decay`` enter:

.. code:: ipython3

     simulation_parameters = [duration,start_month,start_year,decay]

Your cell should look like this when complete

.. code:: ipython3

      '''
      Initialize all variables given from the table.
      '''
      duration = 720 # length of simulation (months)
      start_month = 1 # start month of simulation
      start_year = 2018 # start year of simulation
      decay = 'never' # radioactive decay
      simulation_parameters = [duration,start_month,start_year,decay]

6. When ready, click the ``run`` button on the top of the IPython notebook
