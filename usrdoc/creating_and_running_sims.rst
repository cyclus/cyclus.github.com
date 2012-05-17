
Creating and Running Simulations
================================

Cyclus Command Line Usage
-------------------------

To run a simulation you must use the `cyclus` command line utility::

  ./path/to/cyclus [options] [input-file]

**options**:

  * `-v[level]` where level is one of:
    
    * `LEV_ERROR` (least verbose and the default if no verbosity is specified)

    * `LEV_WARN`

    * `LEV_INFO[1, 2, 3, 4, 5]`

    * `LEV_DEBUG[1, 2, 3, 4]`

    * `LEV_DEBUG5` (most verbose)

  Note  that level can be specified as a number. Zero corresponds to
  `LEV_ERROR`, and 11 corresponds to `LEV_DEBUG5`.

**input file**:

  The absolute or relative path (including the input file name itself) to the
  input file to be run.

Examples
++++++++

::

  ./cyclus ./path/to/myinput.xml

  ./cyclus -v LEV_DEBUG5 myinput.xml

  ./cyclus -v LEV_INFO3 myinput.xml

  ./cyclus -v 4 myinput.xml

