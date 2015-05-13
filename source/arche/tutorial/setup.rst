Setup a New Code Repository Based on Cycstub
==============================================

In this lesson, we will:

1. Do the tasks the the Cyclus Archetype Hello World!
2. Clean up the file system for the single storage facility
3. Install the storage facility 
4. Run an input file that uses the new storage facility

Follow the Hello Cyclus! Instructions
---------------------------------------------------

Follow all of the steps of :ref:`hello_world`.

Make a Storage Facility
------------------------------------------

Next, make a new facility by copying the facility archetype from the Hello World! tutorial. 

Start by making sure you are in the correct directory

.. code-block:: console

    $ cd ~/tutorial

Then make the new archetype, updating all the files as needed

.. code-block:: console

    $ for file in `ls src/tutorial_facility*`; do cp "${file}" "${file/tutorial_facility/storage}"; done
    $ sed -i'' "s/tutorial_facility/storage/g" src/storage*
    $ sed -i'' "s/TutorialFacility/Storage/g" src/storage*
    $ sed -i'' "s/TUTORIAL_FACILITY/STORAGE/g" src/storage*

Finally, update the ``src/CMakeLists.txt`` file with the following line

.. code-block:: console

    $ echo $'\ninstall_cyclus_standalone("Storage" "storage" "tutorial")' >> src/CMakeLists.txt


Install and Test
----------------------------------

Install the tutorial project

.. code-block:: console

    $ ./install.py

Run the unit tests

.. code-block:: console

    $ Storage_unit_tests

Make a new input file that is a copy of the test input file 

.. code-block:: console

    $ cp input/example.xml input/storage.xml

Then change ever instance of ``TutorialFacility`` with ``Storage``. This can be
done by hand or on the command line with

.. code-block:: console

    $ sed -i'' "s/TutorialFacility/Storage/g" input/storage.xml

Test the input file by running Cyclus

.. code-block:: console

    $ cyclus input/storage.xml