
.. summary Information on how to install some of the Cyclus dependencies

Installing Dependencies on Unix
===============================

*Note that `unix` includes linux and darwin (mac) based systems*

This page will provide a short walk-through of some of the non-standard
installation requirements for *Cyclus* dependencies. *Cyclus* strives to be a
modularly designed code that allows dynamic loading of modules at run time;
therefore, dependencies must be built as shared object libraries instead of
static libraries. This is done through the use of the -fPIC (position
independent code) flag when building the required dependencies. For your
edification, `this website <http://tldp.org/HOWTO/Program-Library-HOWTO/shared-libraries.html>`_
has a good review of shared libraries in general.

Some Quick Notes of Great Import
--------------------------------

 #. It is reccommended (specifically for novice users) that you install
    libraries in /usr/local
  
Now What?
---------

You're now ready to build cyclus. Onward to :doc:`get_and_build`

