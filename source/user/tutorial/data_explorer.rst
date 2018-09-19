An Introduction to Data Exploration
=====================================

The ``analysis`` package provides a way to fluidly explore the
data that arises from a |cyclus| simulation. A variety of metrics, plots, and information can be
manipulated and viewed in a straightforward and interactive way to develop a thorough
understanding of the features that matter the most.

Concept: Cyclus Output file
=========================================
*CYCLUS* creates a .sqlite file as its output. SQLite is a database file
type that consists of a series of tables. A few functions have been
included in ``analysis.py``, a file in downloaded the github repository of this tutorial, to pull information from the sqlite
database and create figures.

An sqlite database can be opened and its
contents viewed, but these database browsers often aren't helpful.
Importing the data into an external function and manipulating it would
provide more useful information. However, it can still be helpful to
open and view the tables.

Analyze the results:
~~~~~~~~~~~~~~~~~~~~

*CYCLUS* creates a .sqlite file as its output. SQLite is a database file
type that consists of a series of tables. A few functions have been
included in cyutils.analysis.py to pull information from the sqlite
database and create figures. An sqlite database can be opened and its
contents viewed, but these database browsers often aren't appropriate for serious data analysis. Importing the data into an external function and manipulating it would provide more useful information. However, it can still be helpful to open and view the tables. This a view of the tables within the database (using DB browser for SQLite). However, to view the data within these
tables, switch to the Browse Data tab: And select the table of interest.
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


First, a cursor that points to the sqlite file is created:

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

.. code:: ipython3

    cur = cur # cursor to CYCLUS output file
    facility = '1178MWe BRAIDWOOD-1' # facility of interest
    flux = 'out' # isotope transaction direction
    nucid = 922350000 # nuclide id
    print('Total amount of U235 that left the '+ str(facility) +' reactor:')
    analysis.total_isotope_traded(cur,facility,flux,nucid)


.. parsed-literal::

    Total amount of U235 that left the 1178MWe BRAIDWOOD-1 reactor:




.. parsed-literal::

    13431.0



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
    analysis.plot_out_flux_cumulative(cur, facility,title)



.. image:: output_10_0.png


Since it is difficult to see the amount of U-235, Cs-137, and Pu-239 in
the above plot, let's plot those three isotopes individually. First we
will gather a cumulative mass series of all the isotopes that went
through the reactor via the ``cumulative_mass_timeseries`` function.
This function intakes cur, facility, flux direction.

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
| ``flux``       | ``'Out'``                   | flux direction                   |
+----------------+-----------------------------+----------------------------------+

.. code:: ipython3

    reactor_output_series = analysis.cumulative_mass_timeseries(cur, facility='1178MWe BRAIDWOOD-1', flux='out')
    nuclides = [item[0] for item in reactor_output_series.items()]
    masses = [item[1][0] for item in reactor_output_series.items()]
    times = [item[1][1] for item in reactor_output_series.items()]


Now, let's sort the list of nuclide mass series from highest to lowest
to plot the lowest cumualtive mass at the top of the stackplot

.. code:: ipython3

    masstime = analysis.cumulative_mass_timeseries(cur, facility='1178MWe BRAIDWOOD-1', flux='out')
    nuclides = [item[0] for item in reactor_output_series.items()]
    masses = [item[1][0] for item in reactor_output_series.items()]
    times = [item[1][1] for item in reactor_output_series.items()]
    mass_sort = sorted(reactor_output_series.items(), key=lambda e: e[
        1][0][-1], reverse=True)
    nuclides = [item[0] for item in mass_sort]
    masses = [item[1][0] for item in mass_sort]
    print('List of nuclides that left the reactor:')
    print(nuclides)
    #print('List of nuclides mass series that left the reactor:')
	#print(masses) #output is quite long


.. parsed-literal::

    List of nuclides that left the reactor:
    ['U238', 'Cs137', 'U235', 'Pu239']


By using the nuclide list, we can select the nuclides we wish to plot

.. code:: ipython3

    cs137 = masses[1]
    u235 = masses[2]
    pu239 = masses[3]
    masses = masses[1:]
    nuclides = nuclides[1:]
    plt.stackplot(times[0], masses, labels=nuclides)
    plt.legend(loc='upper left')
    plt.title(title)
    plt.xlabel('time [months]')
    plt.ylabel('mass [kg]')
    plt.xlim(left=0.0)
    plt.ylim(bottom=0.0)
    plt.show()



.. image:: output_16_0.png


In cyclus, facilities are defined by their ``agent_id``. For example if
the simulation has a fleet of reactors, we can find out what the
``agent_id`` of the reactors in the simulation are

.. raw:: html

   <div class="alert alert-info">

**Interactive Input** In the cell below use type
``archetype = 'Reactor'`` and then run the cell.

.. raw:: html

   </div>

.. code:: ipython3

    archetype = 'Reactor'
    print('The agent_id for' + ' ' + archetype + ' ' +'' + 'is:')
    analysis.agent_ids(cur,archetype='Reactor')



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



Adding a Reactor
----------------

We will now add a second reactor, ``1000We Lightwater-1``, to our
simulation. This reactor will have a lifetime of 360 months (30 years),
cycle time of 15 months, assembly size of 30160, and power capacity 1000
MWe. Using this information, let's construct the facility input section
of this reactor.

**Interactive Input** Using the table below, fill out the reactor
facility template with the following variables. Include appropriate
comments.

.. raw:: html

   </div>

+-----------------------+---------------------------+
| Variable              | Value                     |
+=======================+===========================+
| ``name``              | ``1000We Lightwater-1``   |
+-----------------------+---------------------------+
| ``lifetime``          | ``360``                   |
+-----------------------+---------------------------+
| ``Archetype``         | ``Reactor``               |
+-----------------------+---------------------------+
| ``fuel_incommods``    | ``fresh-uox``             |
+-----------------------+---------------------------+
| ``fuel_inrecipes``    | ``fresh-uox``             |
+-----------------------+---------------------------+
| ``fuel_outcommods``   | ``spent-uox``             |
+-----------------------+---------------------------+
| ``fuel_outrecipes``   | ``spent-uox``             |
+-----------------------+---------------------------+
| ``cycle_time``        | ``15``                    |
+-----------------------+---------------------------+
| ``refuel_time``       | ``1``                     |
+-----------------------+---------------------------+
| ``assem_size``        | ``33000``                 |
+-----------------------+---------------------------+
| ``n_assem_core``      | ``3``                     |
+-----------------------+---------------------------+
| ``n_assem_batch``     | ``1``                     |
+-----------------------+---------------------------+
| ``power_cap``         | ``1000``                  |
+-----------------------+---------------------------+

Second reactor facility template
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: xml

          <facility>
            <name>1000We Lightwater-1</name>
            <lifetime>360</lifetime>
            <config>
              <Reactor>
                <fuel_incommods> <val>fresh-uox</val> </fuel_incommods>
                <fuel_inrecipes> <val>fresh-uox</val> </fuel_inrecipes>
                <fuel_outcommods> <val>spent-uox</val> </fuel_outcommods>
                <fuel_outrecipes> <val>spent-uox</val> </fuel_outrecipes>
                <cycle_time>15</cycle_time>
                <refuel_time>1</refuel_time>
                <assem_size>33000</assem_size>
                <n_assem_core>3</n_assem_core>
                <n_assem_batch>1</n_assem_batch>
                <power_cap>1000</power_cap>
              </Reactor>
            </config>
          </facility>

Second reactor Institution
~~~~~~~~~~~~~~~~~~~~~~~~~~

We must add this second reactor into the region and facility section of
our CYCLUS input file. To do so, go to the ``entry`` header under the
``initialfacilitylist`` section of the region block of the input file
and add

.. code-block:: xml

                <entry>
                  <prototype>1000We Lightwater-1</prototype>
                  <number>1</number>
                </entry>

The Reactor's section of the region block should now look like,

.. code-block:: xml

    <region>
            <name>USA</name>
            <config>
              <NullRegion/>
            </config>
            <institution>
              <initialfacilitylist>
                <entry>
                  <prototype>1178MWe BRAIDWOOD-1</prototype>
                  <number>1</number>
                </entry>
                <entry>
                  <prototype>1000We Lightwater-1</prototype>
                  <number>1</number>
                </entry>
              </initialfacilitylist>
              <name>Exelon Reactors</name>
              <config>
                <NullInst/>
              </config>
            </institution>

Now let's run this scenario!
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: ipython3

    # CYCLUS will not overwrite an old file - delete the old version if you run a simulation again and put
    # the output to the same filename
    !rm cyclus.sqlite
    !cyclus template/cyclus_two_reactor.xml -o cyclus.sqlite
    # this is a command that can be executed in your terminal, without the ! . The -o flag is used to
    # set the name of the output file.  Without it, the default is "cyclus.sqlite"


.. parsed-literal::

                  :
              .CL:CC CC             _Q     _Q  _Q_Q    _Q    _Q              _Q
            CC;CCCCCCCC:C;         /_\)   /_\)/_/\\)  /_\)  /_\)            /_\)
            CCCCCCCCCCCCCl       __O|/O___O|/O_OO|/O__O|/O__O|/O____________O|/O__
         CCCCCCf     iCCCLCC     /////////////////////////////////////////////////
         iCCCt  ;;;;;.  CCCC
        CCCC  ;;;;;;;;;. CClL.                          c
       CCCC ,;;       ;;: CCCC  ;                   : CCCCi
        CCC ;;         ;;  CC   ;;:                CCC`   `C;
      lCCC ;;              CCCC  ;;;:             :CC .;;. C;   ;    :   ;  :;;
      CCCC ;.              CCCC    ;;;,           CC ;    ; Ci  ;    :   ;  :  ;
       iCC :;               CC       ;;;,        ;C ;       CC  ;    :   ; .
      CCCi ;;               CCC        ;;;.      .C ;       tf  ;    :   ;  ;.
      CCC  ;;               CCC          ;;;;;;; fC :       lC  ;    :   ;    ;:
       iCf ;;               CC         :;;:      tC ;       CC  ;    :   ;     ;
      fCCC :;              LCCf      ;;;:         LC :.  ,: C   ;    ;   ; ;   ;
      CCCC  ;;             CCCC    ;;;:           CCi `;;` CC.  ;;;; :;.;.  ; ,;
        CCl ;;             CC    ;;;;              CCC    CCL
       tCCC  ;;        ;; CCCL  ;;;                  tCCCCC.
        CCCC  ;;     :;; CCCCf  ;                     ,L
         lCCC   ;;;;;;  CCCL
         CCCCCC  :;;  fCCCCC
          . CCCC     CCCC .
           .CCCCCCCCCCCCCi
              iCCCCCLCf
               .  C. ,
                  :
    <grammar xmlns="http://relaxng.org/ns/structure/1.0"
    datatypeLibrary="http://www.w3.org/2001/XMLSchema-datatypes">
    <start>

    <element name="simulation">
      <optional><element name="schematype"><text/></element></optional>
    <interleave>

      <optional><element name="ui"><text/></element></optional>

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
              <element name="tolerance_generic"><data type="double"/></element>
          </optional>
          <optional>
              <element name="tolerance_resource"><data type="double"/></element>
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

      <zeroOrMore>
        <element name="commodity">
          <interleave>
            <element name="name"> <text/> </element>
            <element name="solution_priority"> <data type="double"/> </element>
          </interleave>
        </element>
      </zeroOrMore>

      <element name="archetypes">
        <oneOrMore>
          <element name="spec">
            <interleave>
              <optional><element name="path"><text/></element></optional>
              <optional><element name="lib"><text/></element></optional>
              <element name="name"><text/></element>
              <optional><element name="alias"><text/></element></optional>
            </interleave>
          </element>
        </oneOrMore>
      </element>

      <oneOrMore>
        <element name="facility">
          <interleave>
            <element name="name"> <text/> </element>
            <optional>
              <element name="lifetime"> <data type="nonNegativeInteger"/> </element>
            </optional>

            <element name="config">
              <choice>
              <element name="Enrichment">
    <interleave>
        <element name="feed_commod">
            <data type="string"/>
        </element>
        <element name="feed_recipe">
            <data type="string"/>
        </element>
        <element name="product_commod">
            <data type="string"/>
        </element>
        <element name="tails_commod">
            <data type="string"/>
        </element>
        <optional>
            <element name="tails_assay">
                <data type="double"/>
            </element>
        </optional>
        <optional>
            <element name="initial_feed">
                <data type="double"/>
            </element>
        </optional>
        <optional>
            <element name="max_feed_inventory">
                <data type="double"/>
            </element>
        </optional>
        <optional>
            <element name="max_enrich">
                <data type="double">
                    <param name="minInclusive">0</param>
                    <param name="maxInclusive">1</param>
                </data>
            </element>
        </optional>
        <optional>
            <element name="order_prefs">
                <data type="boolean"/>
            </element>
        </optional>
        <optional>
            <element name="swu_capacity">
                <data type="double"/>
            </element>
        </optional>
    </interleave>

    </element>
    <element name="Reactor">
    <interleave>
        <element name="fuel_incommods">
            <oneOrMore>
                <element name="val">
                    <data type="string"/>
                </element>
            </oneOrMore>
        </element>
        <element name="fuel_inrecipes">
            <oneOrMore>
                <element name="val">
                    <data type="string"/>
                </element>
            </oneOrMore>
        </element>
        <optional>
            <element name="fuel_prefs">
                <oneOrMore>
                    <element name="val">
                        <data type="double"/>
                    </element>
                </oneOrMore>
            </element>
        </optional>
        <element name="fuel_outcommods">
            <oneOrMore>
                <element name="val">
                    <data type="string"/>
                </element>
            </oneOrMore>
        </element>
        <element name="fuel_outrecipes">
            <oneOrMore>
                <element name="val">
                    <data type="string"/>
                </element>
            </oneOrMore>
        </element>
        <optional>
            <element name="recipe_change_times">
                <oneOrMore>
                    <element name="val">
                        <data type="int"/>
                    </element>
                </oneOrMore>
            </element>
        </optional>
        <optional>
            <element name="recipe_change_commods">
                <oneOrMore>
                    <element name="val">
                        <data type="string"/>
                    </element>
                </oneOrMore>
            </element>
        </optional>
        <optional>
            <element name="recipe_change_in">
                <oneOrMore>
                    <element name="val">
                        <data type="string"/>
                    </element>
                </oneOrMore>
            </element>
        </optional>
        <optional>
            <element name="recipe_change_out">
                <oneOrMore>
                    <element name="val">
                        <data type="string"/>
                    </element>
                </oneOrMore>
            </element>
        </optional>
        <element name="assem_size">
            <data type="double"/>
        </element>
        <element name="n_assem_batch">
            <data type="int"/>
        </element>
        <optional>
            <element name="n_assem_core">
                <data type="int"/>
            </element>
        </optional>
        <optional>
            <element name="n_assem_fresh">
                <data type="int"/>
            </element>
        </optional>
        <optional>
            <element name="n_assem_spent">
                <data type="int"/>
            </element>
        </optional>
        <optional>
            <element name="cycle_time">
                <data type="int"/>
            </element>
        </optional>
        <optional>
            <element name="refuel_time">
                <data type="int"/>
            </element>
        </optional>
        <optional>
            <element name="cycle_step">
                <data type="int"/>
            </element>
        </optional>
        <optional>
            <element name="power_cap">
                <data type="double"/>
            </element>
        </optional>
        <optional>
            <element name="power_name">
                <data type="string"/>
            </element>
        </optional>
        <optional>
            <element name="pref_change_times">
                <oneOrMore>
                    <element name="val">
                        <data type="int"/>
                    </element>
                </oneOrMore>
            </element>
        </optional>
        <optional>
            <element name="pref_change_commods">
                <oneOrMore>
                    <element name="val">
                        <data type="string"/>
                    </element>
                </oneOrMore>
            </element>
        </optional>
        <optional>
            <element name="pref_change_values">
                <oneOrMore>
                    <element name="val">
                        <data type="double"/>
                    </element>
                </oneOrMore>
            </element>
        </optional>
    </interleave>

    </element>
    <element name="Source">
    <interleave>
        <element name="outcommod">
            <data type="string"/>
        </element>
        <optional>
            <element name="outrecipe">
                <data type="string"/>
            </element>
        </optional>
        <optional>
            <element name="inventory_size">
                <data type="double"/>
            </element>
        </optional>
        <optional>
            <element name="throughput">
                <data type="double"/>
            </element>
        </optional>
    </interleave>

    </element>
    <element name="Sink">
    <interleave>
        <element name="in_commods">
            <oneOrMore>
                <element name="val">
                    <data type="string"/>
                </element>
            </oneOrMore>
        </element>
        <optional>
            <element name="in_commod_prefs">
                <oneOrMore>
                    <element name="val">
                        <data type="double"/>
                    </element>
                </oneOrMore>
            </element>
        </optional>
        <optional>
            <element name="recipe_name">
                <data type="string"/>
            </element>
        </optional>
        <optional>
            <element name="max_inv_size">
                <data type="double"/>
            </element>
        </optional>
        <optional>
            <element name="capacity">
                <data type="double"/>
            </element>
        </optional>
    </interleave>

    </element>

              </choice>
            </element>
          </interleave>
        </element>
      </oneOrMore>

      <oneOrMore>
        <element name="region"> <interleave>
          <element name="name"> <text/> </element>
          <optional>
            <element name="lifetime"> <data type="nonNegativeInteger"/> </element>
          </optional>

          <element name="config">
            <choice>
            <element name="NullRegion">
    <text/>

    </element>

            </choice>
          </element>

          <oneOrMore>
            <element name="institution"> <interleave>
              <element name="name"> <text/> </element>
              <optional>
                <element name="lifetime"> <data type="nonNegativeInteger"/> </element>
              </optional>

              <optional>
                <element name="initialfacilitylist">
                  <oneOrMore>
                    <element name="entry">
                      <interleave>
                        <element name="prototype"> <text/> </element>
                        <element name="number"> <data type="nonNegativeInteger"/> </element>
                      </interleave>
                    </element>
                  </oneOrMore>
                </element>
              </optional>

              <element name="config">
                <choice>
                <element name="NullInst">
    <text/>

    </element>

                </choice>
              </element>
            </interleave> </element>
          </oneOrMore>

        </interleave> </element>
      </oneOrMore>

      <zeroOrMore>
        <element name="recipe">
          <interleave>
            <element name="name"><text/></element>
            <element name="basis"><text/></element>
            <oneOrMore>
              <element name="nuclide">
                <interleave>
                  <element name="id"><data type="string"/></element>
                  <element name="comp"><data type="double"/></element>
                </interleave>
              </element>
            </oneOrMore>
          </interleave>
        </element>
      </zeroOrMore>

    </interleave> </element>

    </start>

    </grammar>


    Status: Cyclus run successful!
    Output location: cyclus.sqlite
    Simulation ID: 21055bb9-0adc-49ad-bbbd-58024a2d263c


.. code:: ipython3

    cur = analysis.cursor('cyclus.sqlite')


::


    ---------------------------------------------------------------------------

    NameError                                 Traceback (most recent call last)

    <ipython-input-5-a8904f6eace8> in <module>()
    ----> 1 cur = analysis.cursor('cyclus.sqlite')


    NameError: name 'analysis' is not defined


.. code:: ipython3

    plt.rcParams['figure.figsize'] = [10, 8]
    plt.rcParams['legend.fontsize'] = 12
    facility = '1000MWe Lightwater-1'
    title = 'Cumulative Isotope Outflux of 1000 MWe Lightwater-1'
    analysis.plot_out_flux_cumulative(cur, facility,title)



.. image:: output_55_0.png


Ask:
----

-  Why does 'Cumulative Isotope Outflux of 'Lightwater-1' plot only go
   for 360 months ?
-  Why is there a spike in isotope outflux at the end of the lifetime of
   the 'Lightwater-1' ?

Share:
------

-  What are some other reactor differences between this plot and the
   'Cumulative Isotope Outflux of '1178MWe BRAIDWOOD-1' reactor.

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
                              filename='sink_two',is_cum=True,is_outflux=False)
    from IPython.display import Image
    Image(filename='sink_two.png')




.. image:: output_58_0.png



As seen in the above plot, the rate at which ``tails`` and ``spent-uox``
is stored at the ``Sink`` decreases considably around the year 2050 as
the ``Lightwater-1`` reactor shuts down in the year 2048.
