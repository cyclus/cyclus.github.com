Working with Cyclus in on your machine
======================================

Choosing Where to Run
-----------------------

Cyclus can be used to run simulations on your local
machine, if you have |Cyclus| installed, or in an appropriately configured
cloud resource.  The advantage of using a local machine is that you can
control which archetypes are available.  The advantage of using a remote
machine is that you don't have to install the entire |Cyclus| toolset on your
local machine.

For today's tutorial, CYCLUS has been install natively in the cloud so it can be
run from either the IPython notebook or in the command prompt.

.. image:: cyclus_in_IP.png
    :align: center
    :alt: Running CYCLUS in an IPython Notebook

Activity: Execute your Scenario in an IPython Notebook
++++++++++++++++++++++++++++++++++++++++++++
1. Go to the IPython notebook
2. Remove any old cyclus output files by: ``!rm singlereactortutorial.sqlite``
3. Run CYCLUS by: ``!cyclus 1xn-rendered-main-input.xml -o singlereactorill.sqlite``


.. image:: cyclus_run.png
    :align: center
    :alt: Job status is shown when executing CYCLUS

Activity: Retrieve your Results for Analysis
++++++++++++++++++++++++++++++++++++++++++++++

1. When your simulation has finished, a file of the name ``singlereactortutorial.sqlite`` will be in your file folder

Backup: Files for Success
++++++++++++++++++++++++++

In case your run did not succeed, you can retrieve =these files to continue:

* `Successful input file <http://cnergdata.engr.wisc.edu/cyclus/cyclist/tutorial/cycic-tutorial.xml>`_
* `Successful output db file <http://cnergdata.engr.wisc.edu/cyclus/cyclist/tutorial/cycic-tutorial.sqlite>`_
