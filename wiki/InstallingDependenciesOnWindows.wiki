#summary Information on how to install some of the Cyclus dependencies

== Overview == 

This page will provide a short walk-through of some of the installation requirements for *Cyclus* dependencies on a Windows platform. *Cyclus* strives to be a modularly designed code that allows dynamic loading of modules at run time; therefore, most dependencies must be built as shared object libraries instead of static libraries.

== Cygwin ==

Cygwin is a terminal program that simulates a linux-like environment on Windows platforms. To install [http://cygwin.com Cygwin] you will need to download a setup file and run it according to the instructions at the [http://cygwin.com/install.html Cygwin Install Page].

Specifically, the Cygwin installation manager will walk through the installation process. 

 # Select Install From Internet. 
 # Choose a directory to install cygwin. 
 # Choose a download mirror near you.
 # Choose packages to install
  * If you have two free gigabytes on your computer, the package configuration process can be simplified by choosing to download all packages. This will require clicking INSTALL the icon next to ALL. 
  * If space is restricted, you may be more selective about packages. When selecting packages, choose the default action for ALL packages. Then, search for and select install for specific packages that cyclus and its dependencies rely on : svn, gcc, g++, g77, cmake, make, lapack, libxml2, libidn. 
 # This will take some time to install 
 # When installed, check that these were installed correctly by using the 'which' command. A path will be returned if the package is found. If not, rerun Cygwin's setup.exe and install just the packages that are not found.
  * To check for svn, open a Cygwin terminal and type 'which svn'. 
  * To check for gcc, open a Cygwin terminal and type 'which gcc'
  * etc.

== Boost == 

Cyclus depends on boost. You may install boost at [http://www.boost.org their website]. .
It is recommenced that Windows users use the boost installer executable rather than unpacking the binaries manually or building from source. So, download the installer. 

  # When the installer asks what packages to install, be certain to include 
    * the program_options library
	* the IOStream libraries
	* and the date_time library 
	* in addition to the default header libraries.
  # If you have surplus space on your computer, don't hesitate to install all of the libraries available, but be prepared for the installation to take up to an hour for all packages. 
  # The installer will ask what variants of the boost libraries to install. Be certain to install a dynamic and a static library. Threading is up to you. 

== HDF5 ==

HDF5 is a hierarchical database library that Cyclus uses for record keeping. To install HDF5 on Windows :

  # Go to the hdf5 website. 
  # Download the appropriate precompiled Windows binaries. 
  # Extract the full directory structure somewhere temporary. 
  # Move the contents of the resulting /bin directory to /usr/local/bin , or another preferred bin directory in your $PATH . 
  # Move the contents of the /lib directory to /usr/local/lib (or elsewhere in your $PATH). 
  # So too with the contents of the include directory, move them to /usr/local/include (or elsewhere). 
  # This can optionally be repeated with the  share directory as well.

Make sure the location you placed the binary files is in your $PATH environment variable. Finally, add an environment variable that states $HDF5_ROOT = /usr/local/lib (or your favorite other location).

== Teuchos ==

Download the Trilinos source code to some location such as ~/trilinos_source . 

If CMake fails to find your c, cxx, or fortran compilers, double check that these are in your path. You may also inform CMake of your default compilers with environment variables that CMake pays attention to. To set the C compiler, for example, you would set the $CC environmet variable to /usr/bin/gcc-3 . 


``
cd ~/trilinos_source
cd ../
mkdir trilinos_build
cd trilinos_bild
cmake-gui ../trilinos_source
``

From the gui (or via commandline flags, if you prefer), set the following advanced configuration flags for the Trilinos build :

  * BUILD_SHARED_LIBS=ON
  * CMAKE_INSTALL_PREFIX=/usr/local/ (or elsewhere)
  * Trilinos_ENABLE_TEUCHOS=ON
  * BLAS_LIBRARY_DIRS=/usr/lib
  * LAPACK_LIBRARY_DIRS=/usr/lib
  * BLAS_LIBRARY_NAMES="blas"
  * LAPACK_LIBRARY_NAMES="lapack"

Finally, configure and generate the make file (in the gui, these are buttons). In the terminal type make, then type make install. 



== Cyclus == 

You're now ready to build cyclus. Onward to GettingAndBuildingCyclus.

