.. _cmake_build:

Building Modules with CMake
===========================

If you haven't followed the initial example in :ref:`hello_world_cpp`, you should use
``cycstub`` to generate a directory with the "stubs" to build a new archetype.
(see :ref:`hello_world_cpp` for further instructions).

The ``cycstub`` utility provides a number of critical tools for building your own
module:

* ``install.py``: a basic installation script

* ``cmake``: a directory of `CMake <http://www.cmake.org/>`_ modules
  (e.g. finding |Cyclus| and its dependencies on your system)

* ``cmake/UseCyclus.cmake``: a CMake module that defines important |Cyclus|
  module build/install macros

* ``CMakeLists.txt``: a generic CMake driver that will work for most build
  configurations out of the box

* ``src/CMakeLists.txt``: a starter file that determines how the module build is
  executed (utilizing the macros in ``UseCyclus.cmake``)

The remaining portion of this page covers the various features provided in
``UseCyclus.cmake`` and their use in the ``src`` directory's ``CMakeLists.txt``
file.

Using UseCyclus
---------------

``UseCyclus.cmake`` defines the following macros for building and installing
|Cyclus| modules:

* ``USE_CYCLUS``: informs the build system of the source files related to an
  :term:`archetype` implementation and its tests, if tests exist

* ``INSTALL_CYCLUS_MODULE``: install a collection of :term:`archetypes
  <archetype>` that all belong to the same :term:`module`

* ``INSTALL_CYCLUS_STANDALONE``: install an :term:`archetype` as a standalone
  module

UseCyclus Vocabulary
++++++++++++++++++++

The ``UseCyclus.cmake`` macro suite uses the following terms:

* ``lib_root``: The root name for the to-be-installed library (e.g., ``MyAgent``
  for a standalone install or ``my_module`` for a module install).

* ``src_root``: The common prefix for all source files required to implement and
  test an :term:`archetypes <archetype>`. For example if your ``src_root`` is
  ``my_agent``, the macro suite will be aware of the following files:

  * ``my_agent.cc``
  * ``my_agent.h``
  * ``my_agent_tests.cc``
  * ``my_agent_tests.h``

* ``lib_dir``: The install directory relative the |Cyclus| library installation
  directory. For example, if ``lib_dir`` is blank (i.e. ""), the module will be
  installed in ``$CYCLUS_INSTALL_PREFIX/lib/cyclus/``; if ``lib_dir`` is
  something else, e.g. ``my_module_dir``, the module will be installed in
  ``$CYCLUS_INSTALL_PREFIX/lib/cyclus/my_module_dir/``. The value of
  ``$CYCLUS_INSTALL_PREFIX`` can be queried by

  .. code-block:: console

      $ cyclus --install-path

* ``test_driver``: (optional) A custom `GTest
  <https://code.google.com/p/googletest/>`_ test driver. This is an advanced
  feature which will not be needed by most archetype developers.

UseCyclus Macro Arguments
+++++++++++++++++++++++++

Each ``UseCyclus.cmake`` macro has arguments included in the above vocabulary
listing:

* ``USE_CYCLUS``::

    USE_CYCLUS(lib_root src_root)

* ``INSTALL_CYCLUS_STANDALONE``::

    INSTALL_CYCLUS_STANDALONE(lib_root src_root lib_dir [test_driver])

* ``INSTALL_CYCLUS_MODULE``::

    INSTALL_CYCLUS_MODULE(lib_root lib_dir [test_driver])

Examples
--------

Module Installation
+++++++++++++++++++

The "Hello World" example only allows you to add multiple archetypes to the same
module/library, using the `USE_CYCLUS` and `INSTALL_CYCLUS_MODULE` macros.  If
you call `cycstub` multiple times in the same folder, it requires you to specify
the same path and library name for each new archetype.  This approach reduces
the number of libraries and executables that are added to a system, perhaps
unnecessarily.

The resulting `src/CMakeLists.txt` file will includes lines like this:

.. literalinclude:: module-cmake

This will generate:

* a single shared object library in ``$CYCLUS_INSTALL_PREFIX/lib/cyclus/tutorial``
  named ``libTutorialLibrary.so`` (\*nix) or ``libTutorialLibrary.dylib`` (mac)

* a single unit test executable in ``$CYCLUS_INSTALL_PREFIX/bin`` named
  ``TutorialLibrary_unit_tests``

where both incorporate the ``TutorialFacility``, ``TutorialInstitution``, and
``TutorialRegion`` :term:`archetypes <archetype>`.


Standalone Installation
+++++++++++++++++++++++

There may be cases where one prefers to have separate libraries and executables
for each archetype.  This is not currently supported by `cycstub` in a direct
way. However, you can modify the above module approach by editing
``src/CMakeLists.txt`` and replacing:

.. literalinclude:: module-cmake

with 

.. literalinclude:: standalone-cmake

This setup will install three shared object libraries in
``$CYCLUS_INSTALL_PREFIX/lib/cyclus/tutorial``:

* ``libTutorialFacility.so`` (\*nix) or ``libTutorialFacility.dylib`` (mac)

* ``libTutorialInstitution.so`` (\*nix) ``libTutorialInstitution.dylib`` (mac)

* ``libTutorialRegion.so`` (\*nix) ``libTutorialRegion.dylib`` (mac)

and three unit test executables in ``$CYCLUS_INSTALL_PREFIX/bin``:

* ``TutorialFacility_unit_tests``

* ``TutorialInstitution_unit_tests``

* ``TutorialRegion_unit_tests``

    

