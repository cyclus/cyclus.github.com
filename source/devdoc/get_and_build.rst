
.. summary Information on getting Cyclus from the repository and building it on a new system

Getting and Building Cyclus
===========================

Getting Cyclus as a First-Time User
-----------------------------------

The dev team recognizes that first-time users, especially those not
familiar with building C++ libraries, will find the following process
to be difficult. For those looking to try out Cyclus without the 
building headaches, please download our VirtualBox 
`image <http://cnergdata.engr.wisc.edu/cyclus/virtual-box/current/cyclus_user_environment.ova>`_.

A log of changes to the VM can be found 
`here <http://cnergdata.engr.wisc.edu/cyclus/virtual-box/change_log.rst>`_. 

This is a `.ova <http://en.wikipedia.org/wiki/Open_Virtualization_Format>`_ 
file, so it can be used with any virtual image software that supports
such formats. Take caution, the user provided on the image has root 
access.

User information:

* username: cyclus-user
* password: cyclus (note the previous password was **cyclus-user**, see change log for details)

The Cyclus Library Suite
------------------------
*Cyclus* is composed of a number of libraries:
  
  * `cyclopts <https://github.com/cyclus/cyclopts>`_ (optimization)
  * `cyclus core <https://github.com/cyclus/cyclus>`_ (basic functionality)
  * `cycamore <https://github.com/cyclus/cycamore>`_ (a module repository)

The readme at each repository describes how to install each library.
They must be installed in the above order due to dependencies on one
another.

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

Acquiring Source Code
---------------------

Using Git
~~~~~~~~~
The build process for each library is the same. The first step is to
download the source code for each library.

Most systems will come with git fully installed; however, some developers may 
require the following git libraries if they are not already installed:

 * git-core
 * git-gui
 * git-doc

Getting the Code
~~~~~~~~~~~~~~~~
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

  * To have your changes integrated into the cyclus/cyclus project, you must
    submit a github *Pull Request*.  Visit `Send pull requests`_ to learn more.

.. _`Github Help`: http://help.github.com

.. _`Send pull requests`: http://help.github.com/send-pull-requests/

Contact Us
----------

If you have further comments or questions about the build process, please don't hesitate to email or join the Cyclus users list, which will allow you to contact the community of users and developers of Cyclus.

* Email the Users' list: cyclus-users@groups.google.com
* Join the Users' list: https://groups.google.com/forum/?fromgroups#!forum/cyclus-users 
