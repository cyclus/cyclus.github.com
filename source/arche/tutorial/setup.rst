Setup a new code repository based on Cycstub
==============================================

In this lesson, we will:

0. Do the tasks the the Cyclus Archetype Hello World!
0. Clean up the file system for the single storage facility
0. Install the storage facility 

Follow the Hello Cyclus! Instructions
---------------------------------------------------

Follow all of the steps of our :ref:`hello_world`.

Clean Up for Tutorial
------------------------------------------

The goal of this section is to clean up the current directory from the Hello
Cyclus! example to only include the required Storage archetype. It will require
a few shell commands.

First make sure you start in the tutorial's ``src`` directory

.. code-block:: bash

    $ cd ~/tutorial
    $ cd src

Next, clean up the facility name

.. code-block:: bash

    $ for file in `ls tutorial_facility*`; do mv "${file}" "${file/tutorial_facility/storage}"; done
    $ for file in `*`; do sed -i "s/tutorial_facility/storage/"; done    
    $ for file in `*`; do sed -i "s/TutorialFacility/Storage/"; done    

Then remove the old stubs

.. code-block:: bash

    $ rm stub_*
    $ for file in `ls *`; do sed -i "/stub_*/d"; done


Install!
----------------------------------

Finally, install:

.. code-block:: bash

    $ cd ~/tutorial
    $ ./install.py --user

