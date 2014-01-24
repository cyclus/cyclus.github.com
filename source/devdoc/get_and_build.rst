
.. summary Information on getting Cyclus from the repository and building it on a new system

Getting and Building Cyclus
===========================

The Cyclus Library Suite
------------------------
*Cyclus* is composed of two libraries:
  
  * Cyclus Core, comprising core library functionality
  * Cycamore, a module repository

Installation information is provided in the readmes of each repository, and the
core must be installed before cycamore. Accordingly, installation steps are as
follows:

  #. Visit the `Cyclus repo <https://github.com/cyclus/cyclus>`_ and follow the
     installation instructions on the main page (README.rst)
  #. Visit the `Cycamore readme <https://github.com/cyclus/cycamore>`_ and
     follow the installation instructions on the main page (README.rst)

Supported Systems
~~~~~~~~~~~~~~~~~

Currently, two specific systems are supported

  * Linux 64-bit (Ubuntu 12+ recommended)
  * MacOSX 8 64-bit

Unfamiliar with git and Github?
-------------------------------

For the Git uninitiated, one must perform the following steps to acquire *Cyclus*:

  #. `Set Up Git`_ shows one how to set up SSH keys and Git user info
  #. Fork the *Cyclus* repository, as shown in `Fork A Repo`_

Note that each *Cyclus* repository has **two** branches:

  * master -- the lastest stable release of the library
  * develop -- the lastest working copy that passes all tests

The above branches are synchronized with each other, and should be used in tandem
(i.e., use master (Cyclus) with master (Cycamore) or develop with develop only).

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

If you have further comments or questions about the build process, please don't
hesitate to email or join the Cyclus users list, which will allow you to contact
the community of users and developers of Cyclus.

* Email the Users' list: cyclus-users@groups.google.com
* Join the Users' list: https://groups.google.com/forum/?fromgroups#!forum/cyclus-users 
