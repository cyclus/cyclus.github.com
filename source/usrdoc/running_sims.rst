
Running Simulations
===================

Cyclus Command Line Usage
-------------------------

To run a simulation you must use the `cyclus` command line utility:

.. code-block:: bash

  $ ./path/to/cyclus [options] [input-file]

For more information, please refer to the help:

.. code-block:: bash

    $ cyclus -h
    Cyclus usage requires an input file.
    Usage:   cyclus [path/to/input/filename]

    Allowed options:
      -h [ --help ]            produce help message
      --include                print the cyclus include directory
      --version                print cyclus core and dependency versions and quit
      --schema                 dump the cyclus master schema including all 
                               installed module schemas
      --module-schema arg      dump the schema for the named module
      --schema-path arg        manually specify the path to the cyclus master 
                               schema
      --flat-schema            use the flat master simulation schema
      --no-model               only print log entries from cyclus core code
      --no-mem                 exclude memory log statement from logger output
      -v [ --verb ] arg        output log verbosity. Can be text:
                               
                                  LEV_ERROR (least verbose, default), LEV_WARN, 
                                  LEV_INFO1 (through 5), and LEV_DEBUG1 (through 
                               5).
                           
                               Or an integer:
                           
                                  0 (LEV_ERROR equiv) through 11 (LEV_DEBUG5 equiv)
                           
      -o [ --output-path ] arg output path
      --input-file arg         input file

Examples
++++++++

.. code-block:: bash

  $ cyclus ./path/to/myinput.xml

  $ cyclus -v LEV_DEBUG5 myinput.xml

  $ cyclus -v LEV_INFO3 myinput.xml

  $ cyclus -v 4 myinput.xml

