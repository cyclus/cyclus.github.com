.. _cli:

Archetype Command Line Interface
=======================================

Many of the archetype-specific |Cyclus| CLI commands are automatically generated
if the Cyclus preprocessor is used. For example, member variables added with
``#pragma cyclus var`` are added to the generated input XML schema, e.g., 

  .. code-block:: bash

      $ cyclus --agent-schema :agents:Source
      <interleave>
	  <element name="commod">
	      <data type="token"/>
	  </element>
	  <optional>
	      <element name="recipe_name">
		  <data type="token"/>
	      </element>
	  </optional>
	  <element name="capacity">
	      <data type="double"/>
	  </element>
      </interleave>

However, other CLI interactions exist if they are implemented on the archetype.

Archetype Versioning
--------------------

The ``cyclus::Agent`` class exposes a ``version()`` member function which is
queried by the |Cyclus| CLI. For example, 

  .. code-block:: bash

      $ cyclus --agent-version :agents:Source
      1.3.1-7-g9a2c9c9

This is generated from some ``git`` version control information. You can make
your own version tag information for some archetype like


  .. code-block:: c++

      virtual std::string version() { return "My Version"; }

and then access the version with

  .. code-block:: bash

      $ cyclus --agent-version my_package:my_library:MyArchetype
      My Version
