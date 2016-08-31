Archetype Identification and Discovery
=======================================
|Cyclus| :term:`archetypes <archetype>` are uniquely identified by a 3-part
specification that includes:

* a slash separated path,
* a library name, and
* an archetype name.
      
The agents available for running simulations depend on which agent libraries
have been installed on your system.  |Cyclus| ships with a default library
named "agents" containing a few simple archetypes

* Source
* Sink
* NullInst
* KFacility
* ...and others...

All archetypes used in a simulation must be defined in the ``archetypes``
section in the input file:

.. code-block:: xml

    <simulation>
    ...

      <archetypes>
        <spec>
          <path></path>
          <lib>agents</lib>
          <name>KFacility</name>
          <alias>myfac1<alias>
        </spec>

        <spec>
          ...
        </spec>
        ...
      </archetypes>

    ...
    </simulation>


.. code-block:: json

   {"simulation": {
      "archetypes": {
        "spec": {
          "path": "",
          "lib": "agents",
          "name": "KFacility",
          "alias": "myfac1" },
        "spec": {
        }
      }
     }
    }

The ``path`` tag can be omitted if it is empty (as in the case of |Cyclus|'
default agents library).  If the ``lib`` tag is omitted, it defaults to the
value of the ``name`` tag. The ``alias`` tag may also be omitted, in which case
it defaults to the value in the ``name`` tag.  If multiple archetypes have the
same name, then aliases *must* be specified - no two aliases may have the same
value (including defaults).  The values of the aliases are referenced later in
the input file when defining facility prototypes, institutions, and regions.

Archetype specifications also have a single-string form where the three parts
are separated by colons.  This form is used in places such as in the database
and on the command line. For example, to print out the schema for an agent
archetype on the command line (note the starting colon indicating an empty
path):

.. code-block:: bash

    cyclus --agent-schema :agents:KFacility

For more details, you can read :doc:`/cep/cep21`

Cyclus Path
-----------
When running a simulation, |Cyclus| searches your system for the archetypes
specified in the input file.  In addition to searching a few default install
directories, it is possible to manually specify other directories for |Cyclus|
to search by adding them as colon-separated entries to the CYCLUS_PATH
environment variable.  For example:

.. code-block:: bash

    export CYCLUS_PATH=my/agent/lib/dir:/my/other/agent/dir

Directories specified in your ``CYCLUS_PATH`` are searched *before* |Cyclus|'
default search directories. ``CYCLUS_PATH`` directories mark the *starting
points* for archetype specifications.  This meaning that the path portion of an
agent specification is appended to the CYCLUS_PATH directories.  For example
using the above defined ``CYCLUS_PATH``, |Cyclus| would search for::

    my/path:myagentlib:MyAgent

In the following directories in order:

* my/agent/lib/dir/agent/path/
* /my/other/agent/dir/agent/path/
* [default-locations]/agent/path/

For more details, you can read :doc:`/cep/cep21`

