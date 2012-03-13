
.. summary Information on getting Cyclus from the repository and building it on a new system

Getting and Building Cyclus
===========================

Dependencies
------------

The Cyclus code requires the following software and libraries.

====================   ==================
Package                Minimum Version   
====================   ==================
`CMake`                2.8            
`boost`                1.34.1
`libxml2`              2                 
`sqlite3`              3.7.10            
====================   ==================

An overview of some of the dependency installations
can be found on the following pages:

.. toctree::
  :maxdepth: 1

  dependencies_windows

Project Repository
------------------

The Cyclus repository is version controlled using the Git version
control system. It is hosted externally with *Github*.

If you are unfamiliar with Git, here are some resources:

  * http://progit.org/book/ - this is a fantastic guide, from beginner to expert
  * http://book.git-scm.com/
  * http://gitimmersion.com/ - A very hands-on tutorial.
  * http://www-cs-students.stanford.edu/~blynn/gitmagic/

The main repository is located at http://github.com/cyclus/core. Anyone may
check out the code. Although you do not have to register with github to
download and edit the code, if you desire your work to be integrated into the
cyclus mainline of development *you must fork the cyclus core repository into
your own github account and submit 'Pull Requests'*.

If you are unfamiliar with Github, here are some resources:
  
  * `Github Help`_

  * Visit `Set Up Git`_ for basic git installation and setup instructions.

  * Fork the cyclus repository.  Visit `Fork A Repo`_ for a step by step guide
    to forking.

  * To have your changes integrated into the cyclus core project, you must
    submit a github *Pull Request*.  Visit `Send pull requests`_ to learn more.

.. _`Github Help`: http://help.github.com

.. _`Set Up Git`: http://help.github.com/linux-set-up-git/

.. _`Fork A Repo`: http://help.github.com/fork-a-repo/

.. _`Send pull requests`: http://help.github.com/send-pull-requests/


Build System
------------

In order to facilitate future compatibility with multiple platforms, Cyclus is
built using `Cmake <http://www.cmake.org Cmake>`_. This relies on CMake version
2.6 or higher and the CMakeLists.txt file in `src/`. It is
recommended that you use CMake to build the Cyclus executable external to the
source code. To do this, execute the following steps::

    /cyclus/trunk/$ mkdir build
    /cyclus/trunk/$ cd build
    cyclus/trunk/build$ cmake ../src

You should see output like this::

    ...
    ...
    >> -- Configuring done
    >> -- Generating done
    >> -- Build files have been written to: /cyclus/trunk/build
    /cyclus/trunk/build$ make cyclus
    >> Scanning dependencies of target cyclus
    ...
    ...
    >> [100%] Building CXX object CMakeFiles/cyclus.dir/SourceFac.cpp.o
    >> Linking CXX executable cyclus
    >> [100%] Built target cyclus

Now, you can make cyclus, and run it with some input file, for this example, call it input.xml::

    cyclus/trunk/build$ make
    cyclus/trunk/build$ ./cyclus input.xml

Debugging Build
---------------

If you are a developer, you may be interested in building Cyclus in such a was
as to facilitate debugging. It is recommended that you create second build
directory in which you'll build a Cyclus executable for which optimizations are
disabled and debug symbols are added. To do this, execute the following steps::

    /cyclus/trunk$ mkdir debug
    /cyclus/trunk$ cd debug
    /cyclus/trunk/debug$ cmake -DCMAKE_BUILD_TYPE:STRING=Debug ../src

As before, you should call make to actually build the cyclus executable::

    /cyclus/trunk/debug$ make

Now when you call gdb, ddd, or some other debugger within this debug directory
it will recognize the target as a debuggable target. To debug a run for some
input file input.xml, try the following::

    /cyclus/trunk/debug$ ddd ./cyclus input.xml
