An Introduction to Data Exploration
=====================================

Cymetric provides a way to fluidly explore the
data that arises from a |cyclus| simulation. A variety of metrics, plots, and information can be
manipulated and viewed in a straightforward and interactive way to develop a thorough
understanding of the features that matter the most.

Concept: Cyclus Output file
---------------------------
|Cyclus| creates an SQLite (``.sqlite``) database file as its output. SQLite is a database file
type that consists of a series of tables. A few functions have been
included in ``analysis.py``, a file in downloaded the github repository of this tutorial, to pull information from the sqlite
database and create figures.

An sqlite database can be opened by viewers like ``sqlitebrowser`` or ``sqliteman``,
but these database browsers aren't intended for powerful analysis.
Importing the data into an external function and analyzing it
is a more powerful approach. However, it can still be helpful to
open and view the tables.

Analyze the results:
~~~~~~~~~~~~~~~~~~~~


This is a view of the tables within the database
(using DB browser for SQLite). To view the data within these
tables, switch to the **Browse Data** tab and select the table of interest.
Some tables have data that may need to be manipulated or used alongside
other data in other tables, which is why using a python script is often
ideal.

.. code:: ipython3

    from pyne import nucname
    import write as write
    import analysis as analysis
    import matplotlib.pyplot as plt
    import numpy as np
    from numpy import isclose
    import matplotlib.pyplot as plt


.. parsed-literal::

    Usage: python write_input.py [csv][init_date] [duration] [output_file_name]


First, a *cursor* that points to the sqlite file is created to the output file. A *cursor* points to the cyclus output file you wish to use and its commonly used when running analysis functions as it 'bookmarks' the file you wish to analyze.

1. To make a cursor, use the ``analysis.cursor(output_filename)`` function where output_filename is name of the cyclus output file.

.. code:: ipython3

    cur = analysis.cursor('cyclus.sqlite')

Simulation Time Info
--------------------

.. code:: ipython3

    init_year, init_month, duration, timestep = analysis.simulation_timesteps(cur)
    print('Start year:' + str(init_year))
    print('Start month:' + str(init_month))
    print('Duration of simulation months:' + str(duration))
    print('List of timesteps:' + str(timestep[0:3]) +' . . . '  +str(timestep[-4:-1]))



.. parsed-literal::

    Start year:2018
    Start month:1
    Duration of simulation months:720
    List of timesteps:[ 0.  1.  2.] . . . [ 716.  717.  718.]


.. code:: ipython3

    # prints maximum required sfr fuel throughput per timestep
    fuel = cur.execute('SELECT time, sum(quantity) FROM transactions '
                           'INNER JOIN resources ON resources.resourceid = '
                           'transactions.resourceid WHERE commodity = "fresh-uox"'
                           ' GROUP BY time').fetchall()

    fresh_uox = np.array(fuel)
    fuel_transaction = [fuel[1] for fuel in fresh_uox]
    fuel_timestep = [fuel[0] for fuel in fresh_uox]

    maximum_fuel_moved = np.amax(np.array(fuel))
    print('Maximum amount of fresh-uox moved: ' + str(maximum_fuel_moved))

    first_fuel_transaction = np.array(fuel)[0][1]
    print('Amount of fresh-uox moved at first timestep: ' +  str(first_fuel_transaction))
    #print(max(analysis.simulation_timesteps(fuel, duration, True)))

    plt.plot(fuel_timestep,fuel_transaction)
    plt.xlabel('Time (months)')
    plt.ylabel('Mass of Fresh-uox moved (kg)')
    plt.title('Fresh-uox transaction timeseries')


.. parsed-literal::

    Maximum amount of fresh-uox moved: 99000.0
    Amount of fresh-uox moved at first timestep: 99000.0




.. parsed-literal::

    Text(0.5,1,'Fresh-uox transaction timeseries')




.. image:: output_6_2.png


Activity: Track Uranium
+++++++++++++++++++++++

Total mass traded
^^^^^^^^^^^^^^^^^

How much :math:`^{235}`\ U left the 1178MWe BRAIDWOOD-1? To find out,
lets use the ``total_isotope_traded`` function! The
``total_isotope_traded`` takes three input arguments: - cur (cursor to
*CYCLUS* output file) - facility (facility of interest) - flux
(direction of isotope transaction) - nucid (nuclide id)

.. raw:: html

   <div class="alert alert-info">

**Interactive Input** Using the table below, create the following
variables. Include appropriate comments.

.. raw:: html

   </div>

+----------------+-----------------------------+----------------------------------+
| Variable       | Value                       | Purpose                          |
+================+=============================+==================================+
| ``cur``        | ``cur``                     | cursor to *CYCLUS* output file   |
+----------------+-----------------------------+----------------------------------+
| ``facility``   | ``'1178MWe BRAIDWOOD-1'``   | facility of interest             |
+----------------+-----------------------------+----------------------------------+
| ``flux``       | ``'out'``                   | isotope transaction direction    |
+----------------+-----------------------------+----------------------------------+
| ``nucid``      | ``922350000``               | nuclide id                       |
+----------------+-----------------------------+----------------------------------+


Using the table above, let's find out how much :math:`^{235}`\ U left the 1178MWe BRAIDWOOD-1?
1. In your IPython notebook create the variables:

* ``facility`` that is equal to ``'1178MWe BRAIDWOOD-1'``
* ``flux`` that is equal to ``'out'``
* ``nucid``  that is equal to ``922350000``

.. code:: ipython3

    cur = cur # cursor to CYCLUS output file
    facility = '1178MWe BRAIDWOOD-1' # facility of interest
    flux = 'out' # isotope transaction direction
    nucid = 922350000 # nuclide id
    print('Total amount of U235 that left the '+ str(facility) +' reactor:')
    analysis.total_isotope_traded(cur,facility,flux,nucid)


2. When ready, click the ``run`` button.

3. As you see the answer is:

.. parsed-literal::

    Total amount of U235 that left the 1178MWe BRAIDWOOD-1 reactor:




.. parsed-literal::

    13431.0




Activity: Plot SNF Mass
+++++++++++++++++++++++
Now let's plot the cumulative mass of the spent nuclear fuel that is
taken out of the 1178MWe BRAIDWOOD-1. Again, let's use the handy
``analysis.plot_out_flux_cumulative``\ function which takes input
arguments: - cur (cursor to *CYCLUS* output file) - facility (facility
of interest) - title (title of plot)

.. raw:: html

   <div class="alert alert-info">

**Interactive Input** Using the table below, create the following
variables. Include appropriate comments.

.. raw:: html

   </div>

+----------------+-----------------------------------------------------------+----------------------------------+
| Variable       | Value                                                     | Purpose                          |
+================+===========================================================+==================================+
| ``cur``        | ``cur``                                                   | cursor to *CYCLUS* output file   |
+----------------+-----------------------------------------------------------+----------------------------------+
| ``facility``   | ``'1178MWe BRAIDWOOD-1'``                                 | facility of interest             |
+----------------+-----------------------------------------------------------+----------------------------------+
| ``title``      | ``'Cumulative Isotope Outflux of 1178MWe BRAIDWOOD-1'``   | title of plot                    |
+----------------+-----------------------------------------------------------+----------------------------------+

.. code:: ipython3

    plt.rcParams['figure.figsize'] = [10, 8]
    plt.rcParams['legend.fontsize'] = 12
    facility = '1178MWe BRAIDWOOD-1'
    title = 'Cumulative Isotope Outflux of 1178MWe BRAIDWOOD-1'
    analysis.plot_out_flux_cumulative(cur, facility, title)



Activity: Plot Fresh Fuel Mass
++++++++++++++++++++++++++++++
   Now let's plot the cumulative mass of the fresh nuclear fuel that is
   put into the 1178MWe BRAIDWOOD-1. Again, let's use
   ``analysis.plot_in_flux`` which takes the arguments:

   * cur
   * facility = ``'1178MWe BRAIDWOOD-1'``
   * title = ``'Cumulative Isotope Influx of 1178MWe BRAIDWOOD-1'``

.. code:: ipython3

       facility = '1178MWe BRAIDWOOD-1'
       title = 'Cumulative Isotope Influx of 1178MWe BRAIDWOOD-1'
       analysis.plot_in_flux(cur, facility, title)



.. parsed-literal::

    The agent_id for Reactor is:




.. parsed-literal::

    ['21']



In cyclus, facilities are defined by their ``prototype_id``. For example
if the simualtion had 20 different reactors, we could still find a
certain one via its ``prototype_id``.

.. raw:: html

   <div class="alert alert-info">

**Interactive Input** In the cell below use type, find the prototype\_id
of the ``'1178MWe BRAIDWOOD-1'`` reactor by making variable called:
``facility`` and making it equal to ``'1178MWe BRAIDWOOD-1'`` and then
run the cell.

.. raw:: html

   </div>

.. code:: ipython3

    facility = '1178MWe BRAIDWOOD-1'
    print('The prototype_ids for' + ' ' + facility + ' ' +'' + 'are:')
    analysis.prototype_id(cur, facility)


.. parsed-literal::

    The prototype_ids for 1178MWe BRAIDWOOD-1 are:




.. parsed-literal::

    ['21']



Let's find out what the ``prototype_id`` for the ``'UraniumMine'`` in
our simulation is.

.. code:: ipython3

    facility = 'UraniumMine'
    print('The prototype_ids for' + ' ' + facility + ' ' +'' + 'are:')
    analysis.prototype_id(cur, facility)


.. parsed-literal::

    The prototype_ids for UraniumMine are:




.. parsed-literal::

    ['23']



We can use these agent\_ids and prototype\_ids to find out more
information on these facilities. For example, let's say we wanted to
find out how much ``'fresh-uox'`` goes through the
``'1178MWe BRAIDWOOD-1'`` reactor? We can use the
``facility_commodity_flux`` function to find out.

.. raw:: html

   <div class="alert alert-info">

**Interactive Input** Using the table below, create the following
variables. Include appropriate comments.

.. raw:: html

   </div>

+----------------------------+---------------------+------------------------------------+
| Variable                   | Value               | Purpose                            |
+============================+=====================+====================================+
| ``cur``                    | ``cur``             | cursor to *CYCLUS* output file     |
+----------------------------+---------------------+------------------------------------+
| ``agentids``               | ``[21]``            | ``agent_id`` of reactor            |
+----------------------------+---------------------+------------------------------------+
| ``facility_commodities``   | ``['fresh-uox']``   | commodity of interest              |
+----------------------------+---------------------+------------------------------------+
| ``is_cum``                 | True                | cumulative of commodity amount     |
+----------------------------+---------------------+------------------------------------+
| ``is_outflux``             | False               | Influx of commodity into reactor   |
+----------------------------+---------------------+------------------------------------+

.. code:: ipython3

    analysis.facility_commodity_flux(cur,agentids=[21],facility_commodities=['fresh-uox'],is_cum=True,is_outflux=False)






As seen above, the ``facility_commodity_flux`` function returns a
dictionary of the cumulative amount of ``fresh-uox`` fuel that enters
the reactor over time. We can make this dictionary non-cumulative by
setting ``is_cum = False`` as seen below.

.. code:: ipython3

    analysis.facility_commodity_flux(cur,agentids=[21],facility_commodities=['fresh-uox'],is_cum=False,is_outflux=False)





.. code:: ipython3

    analysis.facility_commodity_flux(cur,agentids=[21],facility_commodities=['fresh-uox'],is_cum=True,is_outflux=False)

As expected, the only time that ``fresh-uox`` enters the reactor is at
times where the reactor is being refueled.

Now, let's plot the storage of the sink over time to see what
commodities are stored in the sink.

Let's take a look at the total mass of spent nuclear fuel stored at the
Nuclear Waste Repository. To plot, use the
``analysis.plot_in_flux_cumulative(cur, facility, title)`` function.

.. raw:: html

   <div class="alert alert-info">

**Interactive Input** Using the table below, create the following
variables. Include appropriate comments.

.. raw:: html

   </div>

+----------------+----------------------------------------------------+------------------------+
| Variable       | Value                                              | Purpose                |
+================+====================================================+========================+
| ``facility``   | ``'NuclearRepository'``                            | facility of interest   |
+----------------+----------------------------------------------------+------------------------+
| ``title``      | ``'Cumulative Isotope Inventory of Repository'``   | title of plot          |
+----------------+----------------------------------------------------+------------------------+

.. code:: ipython3

    facility = 'NuclearRepository' # facility of interest
    title  = 'Cumulative Isotope Inventory of Repository'  # title of plot

    analysis.plot_commodities(cur,archetype='sink',facility_commodity=['tails','spent-uox'],title = 'Sink storage',
                              filename='sink',is_cum=True,is_outflux=False)
    from IPython.display import Image
    Image(filename='sink.png')




.. image:: output_31_0.png



Now let's plot the cumulative mass of the spent nuclear fuel that is
mined from the Uranium mine. To plot the outflux of a facility, use the
analysis.plot\_out\_flux\_cumulative(cur,sender,plot title) function.

.. code:: ipython3

    analysis.plot_out_flux_cumulative(cur, 'UraniumMine','Cumulative Isotope Outflux of Uranium Mine')




.. image:: output_33_0.png


.. code:: ipython3

    analysis.plot_out_flux_cumulative(cur, '1178MWe BRAIDWOOD-1','Cumulative Isotope Outflux of 1178MWe BRAIDWOOD-1')



.. image:: output_34_0.png


Now let's plot the mass series and cumulative mass of the fresh nuclear
fuel that is received by the 1178MWe BRAIDWOOD-1.

.. code:: ipython3

    analysis.plot_in_flux(cur, '1178MWe BRAIDWOOD-1','Isotope Influx of 1178MWe BRAIDWOOD-1')
    analysis.plot_in_flux_cumulative(cur, '1178MWe BRAIDWOOD-1','Cumulative Isotope Influx of 1178MWe BRAIDWOOD-1')



.. image:: output_36_0.png



.. image:: output_36_1.png


We can also find the total amount [kg] of an isotope that was used/sent
from a facility using the ``total_isotope_used`` function. For example,
if we wanted to find out how much :math:`^{235}`\ U and
:math:`^{238}`\ U was mined from the Uranium Mine, we can call:

.. code:: ipython3

    uranium_mined = analysis.total_isotope_used(cur, 'UraniumMine')
    print("Total amount of U-235 mined:" + ' '  + str(uranium_mined['U235']) + ' ' + 'kg')
    print("Total amount of U-238 mined:" + ' '  + str(uranium_mined['U238']) + ' ' + 'kg')



.. parsed-literal::

    Total amount of U-235 mined: 91599.6350365 kg
    Total amount of U-238 mined: 12791612.0438 kg


Let's say we wanted to see the composition of the spent nuclear fuel
from the reactor. We could call ``total_isotope_used`` with ``facility``
= ``'1178MWe BRAIDWOOD-1'`` to find out!

.. raw:: html

   <div class="alert alert-info">

**Interactive Input** Using the table below, create the following
variable. Include appropriate comments.

.. raw:: html

   </div>

+----------------+-----------------------------+------------------------+
| Variable       | Value                       | Purpose                |
+================+=============================+========================+
| ``facility``   | ``'1178MWe BRAIDWOOD-1'``   | facility of interest   |
+----------------+-----------------------------+------------------------+

.. code:: ipython3

    facility = '1178MWe BRAIDWOOD-1' # facility of interest
    snf_comp = analysis.total_isotope_used(cur, facility)
    snf_comp
    isotopes = [item[0] for item in snf_comp.items()]
    masses = [item[1] for item in snf_comp.items()]
    plt.bar(isotopes,masses)
    plt.xlabel('Isotopes')
    plt.ylabel('Total Mass [kg]')
    plt.title('SNF mass composition')




.. parsed-literal::

    Text(0.5,1,'SNF mass composition')




.. image:: output_40_1.png


.. code:: ipython3

    analysis.plot_uranium_utilization(cur)



.. image:: output_41_0.png


.. code:: ipython3

    fuel_dict = analysis.fuel_usage_timeseries(cur, ['fresh-uox'])
    fuel_dict
    analysis.stacked_bar_chart(fuel_dict, timestep,
                      'Years', 'Mass[MTHM]',
                      'Total Fresh-Uox Fuel Mass vs Time',
                      'total_fuel',
                      init_year)
    from IPython.display import Image
    Image(filename='total_fuel.png')




.. image:: output_42_0.png



.. code:: ipython3

    # natural uranium demand
    import collections
    nat_u = collections.OrderedDict()
    nat_u['nat_u'] = analysis.nat_u_timeseries(cur)
    analysis.stacked_bar_chart(nat_u, timestep,
                         'Years', 'Natural Uranium Mass',
                         'Natural Uranium Demand vs Time',
                         'nat_u', init_year)
    from IPython.display import Image
    Image(filename='nat_u.png')




.. image:: output_43_0.png



Ask: Why is the orange line steeper in slope than the green line?
-----------------------------------------------------------------

.. code:: ipython3

    tails = cur.execute('SELECT time, sum(quantity) FROM transactions '
                           'INNER JOIN resources ON resources.resourceid = '
                           'transactions.resourceid WHERE commodity = "tails"'
                           ' GROUP BY time').fetchall()

    tails_array = np.array(fuel)
    tails_transaction = [tail[1] for tail in tails_array]
    tails_timeseries = [fuel[0] for fuel in tails_array]

    maximum_fuel_moved = np.amax(tails_array)
    print('Maximum amount of tails moved during one time step: ' + str(maximum_fuel_moved))

    analysis.plot_commodities(cur,archetype='sink',facility_commodity=['tails'],title='Tails in Sink',filename='tails',is_cum=True,is_outflux=False)
    from IPython.display import Image
    Image(filename='tails.png')


.. parsed-literal::

    Maximum amount of tails moved during one time step: 99000.0




.. image:: output_45_1.png



Decay heat
----------

Using our ``spent`` fuel composition from above, lets see which isotope
causes the most decay heat!

.. code:: ipython3

    analysis.plot_reactor_events(cur,reactors = [])




.. image:: output_47_0.png


.. code:: ipython3

    analysis.plot_commodity(cur,archetype='Sink',facility_commodity=['spent-uox'],is_outflux=False,is_cum=True)
    from IPython.display import Image
    Image(filename='cum_mass_spent-uoxdischarge.png')




.. image:: output_48_0.png
