Building Modules with CMake
===========================

Overview
--------

If you haven't follow the initial example in :ref:`hello_world`, you should get
the `Cycstub repo <https://github.com/cyclus/cycstub>`_. We'll assume you want
your |Cyclus| :term:`module` library to be named 'world', but you can change
that as you see fit (see `Cycamore <https://github.com/cyclus/cycamore>`_ as an
example):

.. code-block:: bash

    $ git clone https://github.com/cyclus/cycstub.git world
    $ cd world

The Cycstub repo provides a number of critical tools for building your own
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

* ``INSTALL_CYCLUS_MODULE``: install a collection of :term:`archetypes` that all
  belong to the same :term:`module`

* ``INSTALL_CYCLUS_STANDALONE``: install an :term:`archetype` as a standalone
  module
