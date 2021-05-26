Working with Cyclus in the Cloud
=================================

Choosing Where to Run
-----------------------

The Cyclist user interface can be used to run simulations on your local
machine, if you have |Cyclus| installed, or in an appropriately configured
cloud resource.  The advantage of using a local machine is that you can
control which archetypes are availabe.  The advantage of using a remote
machine is that you don't have to install the entire |Cyclus| toolset on your
local machine.

For today's tutorial, a cloud resource has been made availale at
cycrun.fuelcycle.org.  This is the same resources that is used to run |Cyclus|
from the |Cyclus| home page.

Activity: Execute your Scneario in the Cloud
++++++++++++++++++++++++++++++++++++++++++++

1. Select the Server: http://cycrun.fuelcycle.org
2. Click the "Execute" button
3. This will launch a job and show you the status in the "Jobs" panel.

.. image:: running-job-annotated.png
    :align: center
    :alt: Job status is shown when executing in the cloud

Activity: Retrieve your Results for Analysis
++++++++++++++++++++++++++++++++++++++++++++++

1. When your simulation in the cloud has finished, it will indicate in the
   Jobs pane.

.. image:: running-job-annotated.png
    :align: center
    :alt: Job status is shown when executing in the cloud

2. Right-click on the job number and select "Load Simulation"
3. Switch to the "Data Exploration" tab in the *Workspace*.

Backup: Files for Success
++++++++++++++++++++++++++

In case your run did not succeed, you can retrieve these files to continue:

* `Successful input file <http://cnergdata.engr.wisc.edu/cyclus/cyclist/tutorial/cycic-tutorial.xml>`_
* `Successful output db file <http://cnergdata.engr.wisc.edu/cyclus/cyclist/tutorial/cycic-tutorial.sqlite>`_
