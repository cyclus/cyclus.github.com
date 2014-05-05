CEP 21 - Module Identification and Discovery
***********************************************************

:CEP: 21
:Title: Module Identification and Distribution
:Last-Modified: 2014-05-05
:Author: Robert Carlsen <rwcarlsen@gmail.com>
:Status: Accepted
:Type: Standards Track
:Created: Robert Carlsen

Abstract
========

Cyclus is designed to have plugin modules that can be easily distributed and
installed.  A "module" is a shared library containing one or more compiled
Cyclus agents.  These modules must be uniquely identifiable and discoverable
by both users managing their Cyclus installation and by the Cyclus kernel
itself.  A user wishing to use certain modules must install them in a desired
location and then identify them to Cyclus. This CEP explains where modules
can/should be installed and how Cyclus finds and identifies them.

Module Spec
===========

Modules will be uniquely identified by 3 components together referred to as a
"module spec":

1. path (optional): e.g. ``my/module/path``

   A slash-delimited, valid filesystem path. If ommitted, defaults to the
   library.  If the library is also ommitted, defaults to the agent class.

2. library (optional): e.g. ``MyModule``

   Name of the compiled shared object library file without the "lib" prefix
   and without the file extension. If ommitted, defaults to the agent class.
   The example above would correspond to a library file named "libMyModule.so"
   (linux), "libMyModule.dylib" (darwin), etc.

3. agent class (required): e.g. ``MyAgent``

   The name of the agent's c++ class as compiled into the shared library file.

A module spec also has a single-string form composed of the three components
separated by colons::

    [path]:[library]:[agent-class]
    
    e.g. "my/module/path:MyModule:MyAgent"

Module Discovery
================

When running a simulation, Cyclus will search the following candidate
directories (in order) for each specified module:

1. Each colon-separated directory in the CYCLUS_PATH environment variable.

2. The default cyclus module install directory: ``[install-dir]/lib/cyclus``.

Cyclus will check for the library by building consecutive paths with the
following composition::

    [candidate-dir]/[path]/lib[library][extension]

Cyclus uses the first matching shared library file found and assumes the
specified agent class exists inside it.

Conventions
============

The path should consist of only alpha-numeric characters, slashes,
underscores, and dashes. **No** spaces.  The empty path ("") should generally
be avoided.

The shared library name should consist of only alpha-numeric characters,
slashes, underscores.  **No** spaces. If the shared library file only has a
single agent in it, the library should be the same as the agent class.  For
example, if my agent was named ``MyAgent``, then the library file should be
named ``libMyAgent.so`` on a linux system.  This allows the defaults to
prevent stuttering in the agent's module spec.

