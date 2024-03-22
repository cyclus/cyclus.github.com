CEP 29 - Packaging of Materials
*********************************************************

:CEP: 29
:Title: Packaging of Materials
:Last-Modified: 2024-03-14
:Author: Katie Mummah <mummah@wisc.edu>
:Status: Draft
:Type: Standards Track
:Created: Paul Wilson


Abstract
========

For a number of real world applications (e.g. shipping), materials need to be
packaged in specific ways. This CEP introduces the concept of a `Package` that
can be applied to a material object to support such use cases.

Characteristics of a `Package`
==============================

Each package will have the following characteristics defined by the user in the input file: 

* `name` : a human-readable name for the package type 
* `fill_min` : the minimum quantity of material allowed in that package (default: eps()) 
* `fill_max` : the maximum quantity of material allowed in the package (default: 1e299) 
* `strategy` : the strategy for filling multiple packages, e.g. 
    * "first" : fill each package to the maximum before adding another package
    * "equal" : fill all packages with an equal quantity

Each package will also be assigned a unique integer `id` when it is first
created. The default package has `id` = 1 and represents an unpackaged material. Generally,
the user will not need to be aware of the `id`.

User-Definition of Packages
============================

The input file grammar is extended to support the definition of a list of
packages at the top level of the input file, similar to recipes.

Packages are loaded into a map of package names to `Package` pointers in the
`Context`. The `Context` has methods to get a particular package based on its
`name` or its `id`.

Applying Packages
==================

All `Resource`s are extended to have an additional integer `package_id_` that
refers to the unique integer identifier of the package that currently contains
that `Resource` object.  By default, all `Resource`s are unpackaged (id = 1).

When an unpackaged `Resource` is placed in a package, the packaging strategy is
consulted to determine how many packages are required.  In some cases of an
`equal` filling strategy, it may be impossible to load a given quantity of
material into packages.  Otherwise, the original `Resource` object is divided
into multiple objects with the package appropriately defined.

Resource Buffer Behaviors
===========================

A new behavior is defined for `ResBuf`s to optionally impose unpackaging of
`Resource`s as they are pushed into a resource buffer. Similarly, a new behavior
is defined to optionally package materials as they are popped out of a resource
buffer.

