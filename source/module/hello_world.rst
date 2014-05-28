.. _hello_world:

Hello, Cyclus!
==============
This pages walks you through a very simple hello world example using 
|cyclus| agents.  First make sure that you have the dependencies installed, 
namely |Cyclus|, CMake, and a recent verison of Python (2.7 or 3.3+).

Fist, you need to get the ``cycstub`` code.  Cycstub is a skeleton code base 
that you can use to quick-start new cyclus module development projects.
You can grab cycstub either by using git to 
`clone the repository <https://github.com/cyclus/cycstub.git>`_ or by 
`downloading the zip file <https://github.com/cyclus/cycstub/archive/develop.zip>`_.
Let's put this code in a ``world`` directory and go into it.

**Getting cycstub via git:**

.. code-block:: bash

    $ git clone https://github.com/cyclus/cycstub.git world
    $ cd world

**Getting cycstub via zip:**

.. code-block:: bash

    $ curl -L https://api.github.com/repos/cyclus/cycstub/zipball > world.zip
    $ unzip world.zip
    $ mv cyclus-cycstub-* world
    $ cd world

------------

Since cycstub is a template project everything is named ``stub``. We need to change 
this to refelect the name we want our new project to be called - ``world`` here.
Cystub comes with a renaming tool to do just this! From the command line, run
Python in the following way:

.. code-block:: bash

    world $ python rename.py world

------------

Let's now change the behaviour of the WorldFacility's ``Tick()`` & ``Tock()``
member functions to print "Hello" and "World" repspectively.  To do this, please
open up the :file:`src/world_facility.cc` file in your favorite text editor 
(vim, emacs, gedit, `xo <http://exofrills.org>`_).  Change the orignal functions 
to look like:

**Original Tick() and Tock() in src/world_facility.cc:**

.. code-block:: c++

    void WorldFacility::Tick() {}

    void WorldFacility::Tock() {}

**New Tick() and Tock() in src/world_facility.cc:**

.. code-block:: c++

    void WorldFacility::Tick() {std::cout << "Hello, ";}

    void WorldFacility::Tock() {std::cout << "World!\n";}

------------

Now that we have altered the behavior of the WorldFacility, let's compile and 
install the ``world`` project.  This done with the install.py script.
The install script puts the project into your cyclus userspace, 
``${HOME}/.local/lib/cyclus``.

.. code-block:: bash

    world $ python install.py

------------

Let's run |cyclus| with the WorldFacility! In the input directory there is an 
an :file:`example.xml`. Running |cyclus| on this file should produce the 
following output.

.. code-block:: bash

    world $ cyclus input/example.xml
