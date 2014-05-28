Hello, |Cyclus|!
================
This pages walks you through a very simple hello world example using 
|cyclus| agents.  First make sure that you have the dependencies installed, 
namely |Cyclus|, CMake, and a recent verison of Python (2.7 or 3.3+).

Fist, you need to get the ``cycstub`` code.  Cycstub is a skeleton code base 
that you can use to quick-start new cyclus module development projects.
You can grab cycstub either by using git to 
`clone the repository <https://github.com/cyclus/cycstub.git>`_ or by 
`downloading the zip file <https://github.com/cyclus/cycstub/archive/develop.zip>`_.
Let's put this code in a ``world`` directory.

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