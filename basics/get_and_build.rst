
.. summary Information on getting Cyclus from the repository and building it on a new system

Getting and Building Cyclus
===========================

Dependencies
------------

The Cyclus code requires the following software and libraries.

================ ================  ==================
Package          Full Name         Minimum Version   
================ ================  ==================
`CMake`          cmake             2.8            
`boost`          libboost-all-dev  1.34.1
`xml2`           libxml2-dev       2                 
`sqlite3`        libsqlite3-dev    3.7.10            
================ ================  ==================

NOTE: The **dev** version of each of the above libraries must be used. 
The build system will complain (saying it cannot find the library) if only 
the normal (release) libraries are installed.

Most systems will come with git fully installed; however, some developers may 
require the following git libraries if they are not already installed:

 * git-core
 * git-gui
 * git-doc

An overview of some of the dependency installations
can be found on the following pages:

.. toctree::
  :maxdepth: 1

  dependencies_windows

Project Repository
------------------

The Cyclus repository is version controlled using the Git version
control system. It is hosted externally with *Github*.

The main repository is located at http://github.com/cyclus/core. Anyone may
check out the code. Although you do not have to register with github to
download and edit the code, if you desire your work to be integrated into the
cyclus mainline of development *you must fork the cyclus core repository into
your own github account and submit 'Pull Requests'*.

For the Git uninitiated, one must perform the following steps to acquire *Cyclus*:

  #. `Set Up Git`_ shows one how to set up SSH keys and Git user info
  #. Fork the *Cyclus* repository, as shown in `Fork A Repo`_

Note that the *Cyclus* repository has **two** branches:

  * master -- the lastest stable release of *Cyclus*
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

Build System
------------

In order to facilitate future compatibility with multiple platforms, Cyclus is
built using `Cmake <http://www.cmake.org Cmake>`_. This relies on CMake version
2.6 or higher and the CMakeLists.txt file in `src/`. It is
recommended that you use CMake to build the Cyclus executable external to the
source code. To do this, execute the following steps::

    /core$ mkdir build
    /core$ cd build
    /corebuild$ cmake ../src

You should see output like this::

    ...
    ...
    >> -- Configuring done
    >> -- Generating done
    >> -- Build files have been written to: /core/build
    /core/build$ make cyclus
    >> Scanning dependencies of target cyclus
    ...
    ...
    >> [100%] Building CXX object CMakeFiles/cyclus.dir/SourceFac.cpp.o
    >> Linking CXX executable cyclus
    >> [100%] Built target cyclus

Now, you can make cyclus, and run it with some input file, for this example, call it input.xml::

    cyclus/build$ make
    cyclus/build$ ./cyclus ../input/null/test1.xml
    
You can increase the verbosity of the log output::

    cyclus/build$ ./cyclus -v5 ../input/null/test1.xml

Debugging Build
---------------

If you are a developer, you may be interested in building Cyclus in such a was
as to facilitate debugging. It is recommended that you create second build
directory in which you'll build a Cyclus executable for which optimizations are
disabled and debug symbols are added. To do this, execute the following steps::

    /cyclus$ mkdir debug
    /cyclus$ cd debug
    /cyclus/debug$ cmake -DCMAKE_BUILD_TYPE:STRING=Debug ../src

As before, you should call make to actually build the cyclus executable::

    /cyclus/debug$ make

Now when you call gdb, ddd, or some other debugger within this debug directory
it will recognize the target as a debuggable target. To debug a run for some
input file input.xml, try the following::

    /cyclus/debug$ ddd ./cyclus input.xml
