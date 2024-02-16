Running Simulations
===================

To run a simulation you must use the |cyclus| command line utility:

.. code-block:: bash

  $ ./path/to/cyclus [options] [input-file]

Or you may run directly through Python:

.. code-block:: bash

  $ python -m cyclus [options] [input-file]

For more information, please refer to the help:

.. code-block:: bash

    $ cyclus -h
    Usage:   cyclus [opts] [input-file]

      -h [ --help ]            produce help message
      -V [ --version ]         print cyclus core and dependency versions and quit
      --restart arg            restart from the specified simulation snapshot
                               [db-file]:[sim-id]:[timestep]
      --schema                 dump the cyclus master schema including all
                               installed module schemas
      --agent-schema arg       dump the schema for the named agent
      --schema-path arg        manually specify the path to the cyclus master
                               schema
      --flat-schema            use the flat master simulation schema
      --agent-annotations arg  dump the annotations for the named agent
      --no-agent               only print log entries from cyclus core code
      --no-mem                 exclude memory log statement from logger output
      -v [ --verb ] arg        output log verbosity. Can be text:

                                  LEV_ERROR (least verbose, default), LEV_WARN,
                                  LEV_INFO1 (through 5), and LEV_DEBUG1 (through
                               5).

                               Or an integer:

                                  0 (LEV_ERROR equiv) through 11 (LEV_DEBUG5 equiv)

      -o [ --output-path ] arg output path
      --input-file arg         input file
      --warn-limit arg         number of warnings to issue per kind, defaults to 1
      --warn-as-error          throw errors when warnings are issued
      -p [ --path ]            print the CYCLUS_PATH
      --include                print the cyclus include directory
      --install-path           print the cyclus install directory
      --build-path             print the cyclus build directory
      --rng-schema             print the path to cyclus.rng.in
      --nuc-data               print the path to cyclus_nuc_data.h5

Examples
++++++++

.. code-block:: bash

  $ cyclus ./path/to/myinput.xml

  $ cyclus -v LEV_DEBUG5 myinput.py

  $ python -m cyclus -v LEV_INFO3 myinput.json

  $ cyclus -v 4 myinput.xml

