Installing Cycamore from the source
------------------------------------

This installation guide assumes that you have all the Cycamore dependencies
already installaed (including |Cyclus|). If not please verfy, that you have
properly install all `Cycamore dependencies <Dependencies>`_.


Default installation
..........................

Run the install script:

.. code-block:: bash
  
  python install.py


If you successfully followed the instruction above cyclus binary have been
generated and be placed in the  ``.local/`` in your home directory. 
You need to had ``~/.local/bin`` to the bottom of your ``$PATH``:

.. code-block:: bash
  $> echo 'export PATH="$HOME/.local/bin:$PATH' >> .bashrc

Custom Cyclus installation
..........................

The installation using the install script can be customized using the following
flag:

+--------------------------------------------+--------------------------------------------------------------------------------------------------+
|  ``-h, --help``                            | show the help message and exit                                                                   |
+--------------------------------------------+--------------------------------------------------------------------------------------------------+
|  ``--build_dir BUILD_DIR``                 | where to place the build directory                                                               |
+--------------------------------------------+--------------------------------------------------------------------------------------------------+
|  ``--uninstall``                           | uninstall                                                                                        |
+--------------------------------------------+--------------------------------------------------------------------------------------------------+
|  ``--clean-build``                         | attempt to remove the build directory before building                                            |
+--------------------------------------------+--------------------------------------------------------------------------------------------------+
|  ``-j THREADS, --threads``                 | THREADS the number of threads to use in the make step                                            |
+--------------------------------------------+--------------------------------------------------------------------------------------------------+
|  ``--test``                                | run tests after  building                                                                        |
+--------------------------------------------+--------------------------------------------------------------------------------------------------+
|  ``--prefix PREFIX``                       | the relative path to the installation directory                                                  |
+--------------------------------------------+--------------------------------------------------------------------------------------------------+
|  ``--config-only``                         | only configure the package, do not build or install                                              |
+--------------------------------------------+--------------------------------------------------------------------------------------------------+
|  ``--build-only``                          | only build the package, do not install                                                           |
+--------------------------------------------+--------------------------------------------------------------------------------------------------+
|  ``--cyclus_root``                         | the relative path to the Cyclus directory                                                        |
+--------------------------------------------+--------------------------------------------------------------------------------------------------+
|  ``--coin_root COIN_ROOT``                 | the relative path to the Coin-OR libraries directory                                             |
+--------------------------------------------+--------------------------------------------------------------------------------------------------+
|  ``--boost_root BOOST_ROOT``               | the relative path to the Boost libraries directory                                               |
+--------------------------------------------+--------------------------------------------------------------------------------------------------+
|  ``--hdf5_root HDF5_ROOT``                 | the path to the HDF5 libraries directory                                                         |
+--------------------------------------------+--------------------------------------------------------------------------------------------------+
|  ``--cmake_prefix_path CMAKE_PREFIX_PATH`` | the cmake prefix path for use with FIND_PACKAGE, FIND_PATH, FIND_PROGRAM, or FIND_LIBRARY macros |
+--------------------------------------------+--------------------------------------------------------------------------------------------------+
|  ``--build_type BUILD_TYPE``               | change the CMAKE_BUILD_TYPE                                                                      |
+--------------------------------------------+--------------------------------------------------------------------------------------------------+
|  ``-D VAR``                                |  Set environment variable(s).                                                                    |
+--------------------------------------------+--------------------------------------------------------------------------------------------------+


For example, if you have installed coin-Cbc from source or otherwise have it
installed in a non-standard location, you should make use of the coinRoot
installation flag. The otherwise identical process would look like:

.. code-block:: bash

    .../cycamore$  python install.py --coin_root=path/to/coin
