
Agent Identification and Discovery
===================================

Agent Specification
---------------------

|Cyclus| agents are uniquely identified by a 3-part specification that includes:

* a slash separated path
* a library name
* an agent name
      
The agents available for running simulations depends on which agent libraries
have been installed on your system.  |Cyclus| ships with a default library
named "agents" containing a few simple agents:

* Source
* Sink
* NullInst
* KFacility
* ...and others...

Specifying an agent for a prototype in an input file is done like this:

.. code-block:: xml

  <facility>
    <name>MyPrototype</name>
    <module>
      <path></path>
      <lib>agents</lib>
      <agent>KFacility</agent>
    </module>
    ...

The ``path`` tag can be ommitted if it is empty (as in the case of |Cyclus|'
default agents library).  Agent specifications also have a single-string form
where the three parts are separated by colons.  This form is used in places
such as on the command line (note the starting colon indicating an empty path):

.. code-block:: bash

    cyclus --agent-spec :agents:KFacility

For more details, you can read :doc:`/cep/cep21`

|Cyclus| Path
-------------

When running a |Cyclus| simulation, |cyclus| searches your system for the agents
specified in the input file.  In addition to searching a few default install
directories for agents, it is possible to manually specify other directories
to search by adding them as colon-separated entries to the CYCLUS_PATH
environment variable.  For example:

.. code-block:: bash

    export CYCLUS_PATH=my/agent/lib/dir:/my/other/agent/dir

Directories specified in your ``CYCLUS_PATH`` are searched *before* |Cyclus|'
default search directories. ``CYCLUS_PATH`` directories mark the *starting
points* for agent specifications.  This meaning that the path portion of an
agent specification is appended to the CYCLUS_PATH directories.  For example
using the above defined ``CYCLUS_PATH``, |Cyclus| would search for::

    my/path:myagentlib:MyAgent

In the following directories in order:

* my/agent/lib/dir/agent/path/
* /my/other/agent/dir/agent/path/
* [default-locations]/agent/path/

For more details, you can read :doc:`/cep/cep21`

