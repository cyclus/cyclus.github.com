
.. summary Information on getting Cyclus from the repository and building it on a new system

Getting and Building Cyclus
===========================

The Cyclus Library Suite
------------------------
*Cyclus* is composed of a number of libraries:
  
  * `core <https://github.com/cyclus/core>`_ (basic functionality)
  * `cycamore <https://github.com/cyclus/cycamore>`_ (a module repository)
  * `cyclopts <https://github.com/cyclus/cyclopts>`_ (optimization)

This guide will describe how to install each library.

Dependencies
------------
Each of the above libraries has external dependencies, and some have
dependencies on others. The external libraries described below must
be installed in order to continue with the building and installing
process.

Cyclopts
~~~~~~~~
Cyclopts is the optimization library of *Cyclus*. It has the following
dependencies:

     ================ ================  ==================
     Package          Full Name         Minimum Version   
     ================ ================  ==================
     `CMake`          cmake             2.8
     `boost`          libboost-all-dev  1.34.1
     `coin-Cbc`       coin-Cbc          2.7
     ================ ================  ==================

The `coin <https://projects.coin-or.org/Cbc>`_ dependecy is the most 
complicated of those above; full install instructions for coin-Cbc
are provided in the `cyclopts readme 
<https://github.com/cyclus/cyclopts>`_.

Core
~~~~
The *Cyclus* Core provides the basic agent-based modeling 
functionality of the *Cyclus* simulation engine. It has the
following dependencies:

     ================ ================  ==================
     Package          Full Name         Minimum Version   
     ================ ================  ==================
     `CMake`          cmake             2.8            
     `boost`          libboost-all-dev  1.34.1
     `xml2`           libxml2-dev       2                 
     `sqlite3`        libsqlite3-dev    3.7.10            
     `coin-Cbc`       coin-Cbc          2.7
     `cyclopts`       cyclopts          present
     ================ ================  ==================

Cycamore
~~~~~~~~
Cycamore is a repository of all available modules which can be used
with the *Cyclus* Core. It has the following dependencies:

     ================ ================  ==================
     Package          Full Name         Minimum Version   
     ================ ================  ==================
     `CMake`          cmake             2.8            
     `boost`          libboost-all-dev  1.34.1
     `xml2`           libxml2-dev       2                 
     `sqlite3`        libsqlite3-dev    3.7.10
     `core`           cyclus-core       present
     ================ ================  ==================

Additional Information
~~~~~~~~~~~~~~~~~~~~~~
Please note that the **dev** version of each of the above 
libraries must be used. The build system will complain (saying it 
cannot find the library) if only the normal (release) libraries are 
installed.

An overview of some of the dependency installations
can be found on the following pages:

.. toctree::
  :maxdepth: 1

  dependencies_windows

Building Each Library
---------------------
The build process for each library is the same. The first step is to
download the source code for each library.

Most systems will come with git fully installed; however, some developers may 
require the following git libraries if they are not already installed:

 * git-core
 * git-gui
 * git-doc

Acquiring Source Code
~~~~~~~~~~~~~~~~~~~~~
The source code of each library can be found at the `*Cyclus* 
repository <https://github.com/cyclus>`_, hosted on *Github*. Anyone may
check out the code. Although you do not have to register with *Github* to
download and edit the code, if you desire your work to be integrated into the
cyclus mainline of development *you must fork the cyclus core repository into
your own github account and submit 'Pull Requests'*.

For the Git uninitiated, one must perform the following steps to acquire *Cyclus*:

  #. `Set Up Git`_ shows one how to set up SSH keys and Git user info
  #. Fork the *Cyclus* repository, as shown in `Fork A Repo`_

Note that each *Cyclus* repository has **two** branches:

  * master -- the lastest stable release of the library
  * develop -- the lastest working copy that passes all tests

.. _`Set Up Git`: http://help.github.com/linux-set-up-git/

.. _`Fork A Repo`: http://help.github.com/fork-a-repo/

Help with Git and GitHub
~~~~~~~~~~~~~~~~~~~~~~~~

If you are unfamiliar with Git, here are some resources:

  * http://progit.org/book/ - this is a fantastic guide, from beginner to expert
  * http://book.git-scm.com/
  * http://gitimmersion.com/ - A very hands-on tutorial.
  * http://www-cs-students.stanford.edu/~blynn/gitmagic/

If you are unfamiliar with Github, here are some resources:
  
  * `Github Help`_

  * To have your changes integrated into the cyclus core project, you must
    submit a github *Pull Request*.  Visit `Send pull requests`_ to learn more.

.. _`Github Help`: http://help.github.com

.. _`Send pull requests`: http://help.github.com/send-pull-requests/

Building and Installing the Libraries
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The *Cyclus* build system uses `Cmake <http://www.cmake.org Cmake>`_ 
to ensure future compatibility with multiple platforms.

In the following example, it is assumed that you have downloaded the 
source code into the following directory structure:

  * ~/.../cyclus/core/src
  * ~/.../cyclus/cycamore/src
  * ~/.../cyclus/cyclopts/src

As a first step, make an install directory in the cyclus directory::

    ~/.../cyclus/> mkdir install

Due to dependencies upon one another, the libraries must be installed
in the following order:

  #. cyclopts
  #. core
  #. cycamore

Because the actual building process is the same for each library, a
generic approach is given. Where one sees the word *library* in the
following explanation, please substitute *core*, *cyclopts*, or
*cycamore* when appropriate.

  #. make a build directory and enter it::

      ~/.../cyclus/library/> mkdir build && cd build

  #. run cmake with the appropriate command line arguments::

      ~/.../cyclus/library/> cmake ../src -DCMAKE_INSTALL_PREFIX=../install 

  #. run make, make test, and make install::

      ~/.../cyclus/library/> make
      ~/.../cyclus/library/> make test
      ~/.../cyclus/library/> make install

**Note**:
  * If you would prefer to install in a default location, simply leave off the install prefix argument
  * Note that your system may have trouble finding coin, cyclopts,and the cyclus core. If this is the case, you have two options:

    #. add the nonstandard install location to your PATH environment variable

    #. run cmake with an extra command line argument, providing the location of the respective install directores, e.g.:

       * -DCMAKE_CYCLUS_ROOT_DIR=$cyclus_core_install_dir
       * -DCMAKE_CYCLOPTS_ROOT_DIR=$cyclopts_install_dir
       * -DCMAKE_COIN_ROOT_DIR=$coin_install_dir

Debugging Build
~~~~~~~~~~~~~~~

If you are a developer, you may be interested in building the Cyclus 
libraries in such a was as to facilitate debugging. It is recommended 
that you create second build directory in which optimizations are 
disabled and debug symbols are added. To do this, execute the 
following steps::

    ~/.../cyclus/library/> mkdir debug
    ~/.../cyclus/library/> cd debug
    ~/.../cyclus/library/debug/> cmake -DCMAKE_BUILD_TYPE:STRING=Debug ../src

As before, you should call make to actually build the library::

    ~/.../cyclus/library/debug/> make

