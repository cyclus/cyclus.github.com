CEP 27 - Agent Toolkit Capabilities
***********************************

:CEP: 27
:Title: Agent Toolkit Capabilities
:Last-Modified: 2019-10-28
:Author: Baptiste Mouginot <mouginot.baptiste@gmail.com>
:Status: Pending
:Type: Standards Track
:Created: Baptiste Mouginot 

Abstract
========

|Cyclus| toolkit is designed to easily implement specific capabilities in newly
developed archetypes, such as trading policy, commodity producers... To add
characteristics to archetypes such as Position or Metadata, the actual
implementation method is very verbosy where in each archetypes we need to add
the added specification in the header, assign it and use it in the cpp file,
without guaranty on the consistency in the variables naming and implementation
between multiple archetypes.
This CEP explains how to use snippets to simplify and maintain consistency
between the different implementation and usage across the implementation of toolkit
feature inside multiple archetypes.

.. _agent-spec-docs:

Agent Spec
===========

Agents will be uniquely identified by 3 components together referred to as an
"agent spec":

1. path: e.g. ``my/module/path``

   A slash-delimited, valid filesystem path relative to CYCLUS_PATH (see
   Module Discovery below).

2. library: e.g. ``MyModule``

   Name of the compiled shared object library file without the "lib" prefix
   and without the file extension. If empty, is expanded to the agent class.
   The example above would correspond to a library file named "libMyModule.so"
   (linux), "libMyModule.dylib" (darwin), etc.

3. agent class: e.g. ``MyAgent``

   The name of the agent's c++ class as compiled into the shared library file.

An agent spec also has a single-string form composed of the three components
separated by colons::

    [path]:[library]:[agent-class]
    
    e.g. "my/module/path:MyModule:MyAgent"

Example linux agent specs with corresponding filepath expansions::

    my/path:MyModule:MyAgent -> my/path/libMyModule.so
    my/path::MyAgent         -> my/path/libMyAgent.so
    :MyModule:MyAgent        -> libMyModule.so
    ::MyAgent                -> libMyAgent.so

Module Discovery
================

When running a simulation, |Cyclus| will search the following candidate
directories (in order) for each given agent spec:

1. Each colon-separated directory in the CYCLUS_PATH environment variable.

2. The default |cyclus| module install directory: ``[install-dir]/lib/cyclus``.

|Cyclus| will check for the library by building consecutive paths with the
following composition::

    [candidate-dir]/[path]/lib[library][extension]

|Cyclus| uses the first matching shared library file found and assumes the
specified agent class exists inside it.

Conventions
============

The path should consist of only alpha-numeric characters, slashes,
underscores, and dashes. **No** spaces.  If there are resource files that must
be installed with the shared library file, the library and resources should be
placed in their own directory.

The shared library name should consist of only alpha-numeric characters,
slashes, underscores.  **No** spaces. If the shared library only has a
single agent in it, the library should be the same as the agent class.  For
example, if my agent was named ``MyAgent``, then the library file should be
named ``libMyAgent.so`` on a linux system.  This allows the defaults to
prevent stuttering in the agent's module spec.

