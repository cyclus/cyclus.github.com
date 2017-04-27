Cyclus Server
===================
Cyclus may also be run as an interactive server if it was compiled with Python v3.5.2+ support.

The Cyclus server is a websockets server that uses JSON to send and recieve instructuctions
from the websockets client (typically a webbrowser). The Cyclus server works by having a queue
of actions that are executed at the end of each time step (repeating actions).
Additionally, certain actions
may be registered to occur only when the server first loads (initial actions). Server actions
may include anything from returning database queries, simple echo messages, or shutting down
the server itself.

To start up the Cyclus server, use the following command line utility, spawned via Python.

.. code-block:: bash

    $ python -m cyclus.server

For more information, please refer to the help:

.. code-block:: bash

    $ python -m cyclus.server -h
    usage: cyclus [-h] [-o OUTPUT_PATH] [--debug] [--host HOST] [-p PORT]
                  [-n NTHREADS] [-r REPEATING_ACTIONS [REPEATING_ACTIONS ...]]
                  [-i INITIAL_ACTIONS [INITIAL_ACTIONS ...]]
                  [input_file]

    Cyclus Server CLI

    positional arguments:
      input_file            path to input file

    optional arguments:
      -h, --help            show this help message and exit
      -o OUTPUT_PATH, --output-path OUTPUT_PATH
                            output path
      --debug               runs the server in debug mode.
      --host HOST           hostname to run the server on
      -p PORT, --port PORT  port to run the server on
      -n NTHREADS, --nthreads NTHREADS
                            Maximum number of thread workers to run with.
      -r REPEATING_ACTIONS [REPEATING_ACTIONS ...], --repeating-actions REPEATING_ACTIONS [REPEATING_ACTIONS ...]
                            list of repeating actions
      -i INITIAL_ACTIONS [INITIAL_ACTIONS ...], --initial-actions INITIAL_ACTIONS [INITIAL_ACTIONS ...]
                            list of initial actions to queue


Examples
---------

.. code-block:: bash

    # Run an input file in server mode, returning all of the output
      # table data over the websocket each time step.
    $ python -m cyclus.server input.json

    # print the NullRegion annotations and exit
    $ python -m cyclus.server -i agent_annotations spec=":agents:NullRegion" shutdown



Web Application for Testing
---------------------------
Cyclus also ships with a simple web application that is an example client for Cyclus server.
You may start this web app (after starting Cyclus Server) with the following command in a new
terminal:

.. code-block:: bash

    $ python -m cyclus.webapp

To access this web application, point your browser to `http://localhost:4200`_.
