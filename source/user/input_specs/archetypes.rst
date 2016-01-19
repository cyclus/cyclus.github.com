``Archetypes`` - List of available agent archetypes (required once)
===================================================================

Every agent that participates in a |cyclus| simulation is based on a
:term:`prototype` that is formed by configuring an :term:`archetype`.  The
``archetypes`` block defines the set of archetypes that are available to a
simulation, and provides specifications that uniquely identify each archetype.

A single ``archetypes`` block is required, and contains one or more ``spec``
blocks.  Each ``spec`` block has these blocks in the following order:

* ``path`` (optional) - a slash-separated path
* ``lib`` (optional) - a library name
* ``name`` (required) - a name
* ``alias`` (optional) - a alternative name for the archetype

In addition to the unambiguous specification (as defined in
:doc:`../find_agents`) formed by the ``path``, ``lib``, and ``name``, the
``alias`` provides an alternative name by which to refer to the archetype
elsewhere in the file.  If an alias is defined, it is the **only way** to
refer to that archetype in other locations.

Example 
++++++++

.. code-block:: xml

  <archetypes>
     <spec>
       <path>my/custom/path</path>
       <lib>myAgentCollection</lib>
       <name>myFirstReactorAgent</name>
       <alias>ReactorAgent</alias>
     </spec>
     <spec>
       <name>simpleSource</name>
     </spec>
     <spec>
       <name>simpleRegion</name>
     </spec>
     <spec>
       <name>simpleInst</name>
     </spec>
  </archetypes>

This example introduces four different archetypes into the simulation to be
used elsewhere when defining agent prototypes.  The first archetype is named
`myFirstReactorAgent`, found in a library file such as
`libmyAgentCollection.so` (on linux), in the filesystem path
`my/custom/path`.  All references to this archetype will use the alias
`ReactorAgent`.  The other archetypes are named `simpleSource`,
`simpleRegion`, and `simpleInst`, all of which are found in standard locations
defined in :doc:`../find_agents`.  For example, `simpleSource` will be found
in a library file with a name such as `libsimpleSource.so`, in the standard
|Cyclus| archetype path.


.. code-block:: json

    {
    "archetypes": {
      "spec": {
        "path": "my/custom/path",
        "lib": "myAgentCollection",
        "alias": "ReactorAgent" },
      "spec": {"name": "simpleSource" },
      "spec": {"name": "simpleRegion" },
      "spec": {"name": "simpleInst" }
    }
    }


This is what the example above would look like if written in JSON.


.. rst-class:: html-toggle

Grammar Definition
++++++++++++++++++

.. code-block:: xml

  <element name="archetypes"> 
    <oneOrMore>
      <element name="spec"> 
        <optional><element name="path"><text/></element></optional>
        <optional><element name="lib"><text/></element></optional>
        <element name="name"><text/></element>
        <optional><element name="alias"><text/></element></optional>
      </element>
    </oneOrMore>
  </element>

