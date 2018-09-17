Using Cyclus with Jupyter Notebook
=========================================================
For more ease of running Cyclus input files and managing the output 
files, the **Jupyter Notebook** tool can be utilized. 

Why is it useful?
-----------------

A user can input the code required to run the simulation and analyze 
its output in one **Jupyter Notebook** with clear descriptions.

Here is a tutorial on how to get `Jupyter Notebook <https://jupyter.readthedocs.io/en/latest/install.html>`_ set up on your 
computer. 

Brief Introduction to Jupyter Notebook
--------------------------------------

A Jupyter notebook has four main areas:

* A **Run** button that runs the cell you're in
* A **Up and Down** buttons that move you up or down a cell
* A vertical blue line that shows what cell you're currently in
* A **Stop** button that stops running the cell you're in

.. image:: ipython_tour.png
    :align: center
    :width: 100%
    :alt: Annotated view of an Jupyter notebook upon loading

Jupyter Notebook Scenario Execution 
--------------------------------------------
1. Go to the Jupyter notebook
2. Remove any old cyclus output files by: ``!rm tutorial.sqlite``
3. Run CYCLUS by: ``!cyclus input.xml -o tutorial.sqlite``

.. image:: cyclus_in_IP.png
    :align: center
    :alt: Running CYCLUS in an IPython Notebook

Retrieve your Results for Analysis
----------------------------------
When your simulation has finished, a file of the name ``tutorial.sqlite`` will be in your file folder

Backup: Files for Success
++++++++++++++++++++++++++

If your run did not succeed, you can retrieve these files to continue:

* `Successful input file <http://cnergdata.engr.wisc.edu/cyclus/cyclist/tutorial/cycic-tutorial.xml>`_
* `Successful output db file <http://cnergdata.engr.wisc.edu/cyclus/cyclist/tutorial/cycic-tutorial.sqlite>`_