
Getting and Building |Cyclus| From Source
=========================================

The |Cyclus| Library Suite
--------------------------
The |cyclus| ecosystem is composed of two projects:
  
  * |Cyclus| Core, comprising core kernel functionality
  * Cycamore, a physics and other domain module repository

Installation information is provided in the README of each repository, and the
core must be installed before Cycamore. Accordingly, installation steps are as
follows:

  #. Visit the `Cyclus repo <https://github.com/cyclus/cyclus>`_ and follow the
     installation instructions on the main page (README.rst)
  #. Visit the `Cycamore readme <https://github.com/cyclus/cycamore>`_ and
     follow the installation instructions on the main page (README.rst)

Supported Systems
~~~~~~~~~~~~~~~~~

Currently, two specific systems are supported:

  * Linux 64-bit (Ubuntu 12+ recommended)
  * MacOSX 8 64-bit

Unfamiliar with git and Github?
-------------------------------

For the git uninitiated, one must perform the following steps to acquire |cyclus|:

  #. `Set Up git`_ shows one how to set up SSH keys and git user info
  #. Fork the |cyclus| repository, as shown in `Fork A Repo`_

Note that each |cyclus| repository has **two** branches:

  * master -- the latest stable release of the library
  * develop -- the latest working copy that passes all tests

The above branches are synchronized with each other, and should be used in tandem
(i.e., use master (|Cyclus|) with master (Cycamore) or develop with develop only).

.. _`Set Up git`: http://help.github.com/linux-set-up-git/

.. _`Fork A Repo`: http://help.github.com/fork-a-repo/

Help with git and GitHub
~~~~~~~~~~~~~~~~~~~~~~~~

If you are unfamiliar with git, here are some resources:

  * http://progit.org/book/ - this is a fantastic guide, from beginner to expert
  * http://book.git-scm.com/
  * http://gitimmersion.com/ - A very hands-on tutorial.
  * http://www-cs-students.stanford.edu/~blynn/gitmagic/

If you are unfamiliar with GitHub, here are some resources:
  
  * `Github Help`_

  * To have your changes integrated into the cyclus/cyclus project, you must
    submit a GitHub *Pull Request*.  Visit `Send pull requests`_ to learn more.

.. _`Github Help`: http://help.github.com

.. _`Send pull requests`: http://help.github.com/send-pull-requests/

Contact Us
----------

If you have further comments or questions about the build process, please don't
hesitate to email or join the |Cyclus| users list, which will allow you to contact
the community of users and developers of |Cyclus|.

* Email the Users' list: cyclus-users@groups.google.com
* Join the Users' list: https://groups.google.com/forum/?fromgroups#!forum/cyclus-users 
