
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

 #. The following procedures will NOT work correctly if you have already
    acquired Lapack, BLAS, or Trilinos via Ubuntu's Synaptic Package Manager.

    * It is highly reccommended that you remove these libraries via Synaptic
      before reinstalling them in the following manner.

 #. It is highly reccommended (specifically for novice users) that you install
    these libraries in /usr/local
  
 #. Be very careful when using Teuchos. They have made the design decision to
    include definitions in their header files (due to heavy use of templates).
    Such header files can only be included in one location in the *Cyclus* source
    code.

Lapack
------

Lapack can be installed on your Unix machine using the following steps:

 #.  Download Lapack from its `website <http://www.netlib.org/lapack/>`_ and
     untar it in a preferred location

 #.  Make a build directory (e.g. one can place the source code in
     ../lapack/lapack-xx.yy.zz-Source and make the directory .../lapack/build)

 #.  Copy the configure_lapack script located in the *Cyclus* repository
     located in /trunk/dependencies/lapack and place it in your build folder

 #.  Change the configure script so that the last line points to your lapack
     source (e.g. ../lapack/lapack-xx.yy.zz-Source)

   * Note, by default the script will install the library at /usr/local. 

 #.  Run the script (by typing ./configure_lapack.sh). Note that you may need
     to alter the script's permissions. To do so you can type "chmod 775
     configure_lapack.sh".

 #.  From the build directory, type "make" (or "make -jN" where N is the number
     of threads you want to use [this speeds up the process])

 #.  From the build directory, type "make install"

Note that the making process can take some time. It is suggested that you make
with the `-j` flag.

Teuchos
-------

*Cyclus* uses the Teuchos_ package of Trilinos_. Teuchos can be installed on your Unix machine using the following steps: 

 #. Download Trilinos from its website__ and untar it in a preferred location

 #. Make a build directory (e.g. one can place the source code in
    .../trilinos/trilinos-xx.yy.zz-Source and make the directory
    .../trilinos/build)

 #. Copy the configure_trilinos script located in the *Cyclus* repository
    located in dependencies/trilinos and place it in your build folder

 #. Change the configure script so that the last line points to your trilinos
    source (e.g. .../trilinos/trilinos-xx.yy.zz-Source)

   * Note, by default the script will install the library at /usr/local. 

 #. Run the script (by typing ./configure_trilinos.sh). Note that you may need
    to alter the script's permissions. To do so you can type "chmod 775
    configure_trilinos.sh".

 #. From the build directory, type "make" (or "make -jN" where N is the number
    of threads you want to use [this speeds up the process])

 #. From the build directory, type "make install"

.. _Teuchos: http://trilinos.sandia.gov/packages/teuchos/

.. _Trilinos: http://trilinos.sandia.gov/

__ Trilinos_


