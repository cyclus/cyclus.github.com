Resources
==========

One of the defining features of |Cyclus| among other fuel cycle simulators is
the treatment of resources/materials as discrete, quantized objects that can
be traded and tracked throughout the simulation.

A primary motivation for discrete and quantized materials is the ability to
study the flow of material and the attribution of those materials through
prior ownership.  One example is that of a nuclear fuel assembly.  A nuclear
fuel assembly for a given reactor has a clear definition of material
properties (including mass) can be treated as a single unit.

The |Cyclus| core provides two types of Resources that can be used/manipulated
by agents:

* Material - a generic material object comprised of a mass and nuclide
  composition.

* Product - a general resource comprised of a quantity of a custom specified
  quality/units.

Conceptually, a resource can be anything that might be an interesting traded
item (e.g., electricity, money, or workers).  By default, all changes to
resource objects (including creation) are tracked and recorded in the
database.  Because of this, agents should handle resources carefully.  For
more details about this, see :ref:`tracked-untracked`.

In C++, all resource objects are created and managed as pointer types. For
convenience, each of the classes related to resources have a special pointer
type defined. In Python, they each have their own class that this available
in the ``cyclus.typesystem`` module.

**C++:**

.. code-block:: c++

    cyclus::Resource::Ptr r;
    cyclus::Product::Ptr p;
    cyclus::Material::Ptr m;

**Python:**

.. code-block:: python

    import cyclus.typesystem as ts
    ts.Resource
    ts.Product
    ts.Material

These pointer types should be always be used instead of plain class instances
or raw pointers.  The following sections describe basic creation and
manipulation of resource objects.  The |Cyclus| kernel deals with resources in
terms of the ``cyclus::Resource`` superclass.  So it will sometimes be
necessary to cast down to the appropriate resource subclass.  |Cyclus| provides
an overloaded ResCast function for casting convenience:

**C++*:*

.. code-block:: c++

    // r is a Material object stored in a cyclus::Resource::Ptr var
    cyclus::Material::Ptr m = cyclus::ResCast<Material>(r);

    // ResCast works on vectors too
    std::vector<cyclus::Resource::Ptr> rs;
    ...
    std::vector<cyclus::Product::Ptr> ps = cyclus::ResCast<Product>(rs);

In Python, the situation is much simpler and you should only need to use ``Product`` and
``Material`` directly. They both inherit from ``Resource``.


Product Resources
-------------------

Products in |Cyclus| have a quantity (no particular units) and a quality.
The quality is a ``std::string`` (C++) or ``str`` (Python) that describes what
the product is. A product's quality might be "apples", "kg apples", etc. Product
resources with different qualities may NOT be combined together.

There are 3 basic operations that can be performed on product resources
(examples follow):

* Create
* Extract
* Absorb

**C++:**

.. code-block:: c++

    // create a "grapes" product holding 100 grapes.
    cyclus::Product::Ptr p1 = cyclus::Product::Create(this, 100, "grapes");

    // extract 7 grapes from p1
    cyclus::Product::Ptr p2 = p1->Extract(7);
    // p1 now has 93 grapes

    // combine p2 back into p1
    p1->Absorb(p2);
    // p2 now has 0 grapes. p1 has 100 grapes.


**Python:**

.. code-block:: python

    # create a "grapes" product holding 100 grapes.
    p1 = ts.Product.create(100, "grapes")

    # extract 7 grapes from p1
    p2 = p1.extract(7)
    # p1 now has 93 grapes

    # combine p2 back into p1
    p1.absorb(p2)
    # p2 now has 0 grapes. p1 has 100 grapes.


Material Resources
-------------------
Materials in |Cyclus| have a mass and an associated nuclide composition.  The
composition is represented by a  ``cyclus::Composition`` object (C++) or dict of
nuclide keys (str or int), float values (Python).  Material
quantity is always represented in units of kg. Agents can either create a
composition manually (see the *Compositions* section below) or acquire one from
their Context which holds all recipes defined as part of the
simulation input.

There are 4 basic operations that can be performed on material resources
(examples follow):

* Create
* Extract [Qty/Comp]
* Absorb
* Transmute
* Decay (EXPERIMENTAL) - which is a special case of the Transmute operation

**C++:**

.. code-block:: c++

    cyclus::Composition::Ptr c1 = context()->GetRecipe("nat_u");
    cyclus::Composition::Ptr c2 = context()->GetRecipe("enriched_u");

    // create a 100 kg material from the nat_u recipe defined in the input file
    cyclus::Material::Ptr m1 = cyclus::Material::Create(this, 100, c1);

    // extract 1 kg of enriched U from m1
    cyclus::Material::Ptr m2 = m1->ExtractComp(1, c2);
    // mass of m1 is now 99 kg and its composition has changed

    // extract 1 kg from m1 of whatever composition it is
    cyclus::Material::Ptr m3 = m1->ExtractQty(1);
    // mass of m1 is now 98 kg and its composition. m1 and m3 have the same composition

    // combine m2 and m3 back into m1
    m1->Absorb(m2);
    m1->Absorb(m3);
    // m2 and m3 now have mass 0 kg. m1 has mass 100 kg with its original nat_u composition

    // decay composition m1 up to the current time step (EXPERIMENTAL)
    m1->Decay(); // EXPERIMENTAL

**Python:**

.. code-block:: python

    c1 = self.context.get_recipe("nat_u")
    c2 = self.context.get_recipe("enriched_u")

    # create a 100 kg material from the nat_u recipe defined in the input file
    m1 = ts.Material.create(self, 100, c1)

    # extract 1 kg of enriched U from m1
    m2 = m1.extract_comp(1, c2)
    # mass of m1 is now 99 kg and its composition has changed

    # extract 1 kg from m1 of whatever composition it is
    m3 = m1.ExtractQty(1)
    # mass of m1 is now 98 kg and its composition. m1 and m3 have the same composition

    # combine m2 and m3 back into m1
    m1.absorb(m2)
    m1.absorb(m3)
    # m2 and m3 now have mass 0 kg. m1 has mass 100 kg with its original nat_u composition

    # decay composition m1 up to the current time step (EXPERIMENTAL)
    m1.decay()  # EXPERIMENTAL


.. warning::

    Decay functionality as currently implemented is experimental and may not
    be correct.

Compositions in C++
++++++++++++++++++++

A ``cyclus::Composition`` is a massless, immutable nuclide composition.
Because it is immutable, a mutable ``cyclus::CompMap`` must be populated in
order to create a composition:

**C++:**

.. code-block:: c++

    cyclus::CompMap m;
    m[922350000] = 5;
    m[922380000] = 95;

    // 5% U235, 95% U238 by mass
    cyclus::Composition::Ptr c1 = cyclus::Composition::CreateFromMass(m);

    // 5% U235, 95% U238 by atom fraction
    cyclus::Composition::Ptr c2 = cyclus::Composition::CreateFromAtom(m);

Note that the ``cyclus::CompMap`` above has no notion of mass.  Only the
relative nuclide ratios matter.  Also notable is that ``c1`` and ``c2`` in the
above example have different compositions.

Because compositions are immutable, it is desirable for performance and
database space reasons to avoid as much as possible creating multiple
compositions from equivalent ``cyclus::CompMap`` objects.  Reusing
``cyclus::Composition`` objects helps avoid duplicate records in the
database and redundant decay calculations.


Compositions in Python
+++++++++++++++++++++++
Compositions in Python are much simplier than in C++. They are represented by a simple
dict of nuclides to values. When a Material is created, you have to declare whether
the composition has a mass or atom basis.  By default it has a mass basis, though
you may pass in the string ``"atom"`` to obtain an atom basis.

**Python:**

.. code-block:: python

    # 5% U235, 95% U238 by mass
    m = {922350000: 5, 922380000: 95}
    mat_mass = ts.Material.create_untracked(10, m)

    # 5% U235, 95% U238 by atom fraction
    a = {"U235": 5, "U238": 95}
    mat_atom = ts.Material.create_untracked(10, a, basis="atom")


.. _resource-ids:

Resource IDs
---------------
Every resource object has 3 different IDs.  One of them, the ``qual_id``, is
generally not of use to agent developers and can be ignored.  The other two
serve two different purposes, and it is important to understand their
difference:

* ``state_id``: A unique identifier associated with the entire state of the
  resource object.  Any time a resource's state changes in any way (mass,
  composition, etc.) this ID will be updated to a new, unique value
  associated with the new state.  When recording resource-related information
  to the database in custom tables, this ID should generally be used.

* ``obj_id``: A unique identifier associated with the resource object
  instance.  This ID does not ever change for the life of a resource instance.
  Only newly created resource objects get new obj_id's.  This ID should be
  used when using resources as std::map keys and in other data structures when
  resource objects need to be associated with some other information.

Here are some examples of how these IDs work:

**C++:**

.. code-block:: c++

    cyclus::Product::Ptr p1 = cyclus::Product::Create(this, 10, "bananas");
    // p1 gets new separate state_id and obj_id

    cyclus::Product::Ptr p2 = p1->ExtractQty(3);
    // p1 gets new state_id and keeps same obj_id
    // p2 gets new separate state_id and obj_id

    p1->Absorb(p2);
    // p1 gets new state_id and keeps same obj_id
    // p2 gets new state_id and keeps same obj_id

    cyclus::Product::Ptr p1_dup = p1;
    // no new resource object is created, p1 and p1_dup point to same resource object
    // p1 keeps same state_id and same obj_id
    // p1 and p1_dup have idential state_id's
    // p1 and p1_dup have idential obj_id's

    // want to associate some label with resource objects? - use the obj_id:
    std::map<int, std::string> rsrc_labels;
    rsrc_labels[p1->obj_id()] = "fruit";
    rsrc_labels[p2->obj_id()] = "fruit";
    ...

**Python:**

.. code-block:: python

    # p1 gets new separate state_id and obj_id
    p1 = ts.Product.create(self, 10, "bananas")

    # p1 gets new state_id and keeps same obj_id
    # p2 gets new separate state_id and obj_id
    p2 = p1.extract_qty(3)

    # p1 gets new state_id and keeps same obj_id
    # p2 gets new state_id and keeps same obj_id
    p1.absorb(p2)

    # no new resource object is created, p1 and p1_dup point to same resource object.
    # In Python this is just an increase in the refcount anyway.
    # p1 keeps same state_id and same obj_id
    # p1 and p1_dup have idential state_id's
    # p1 and p1_dup have idential obj_id's
    p1_dup = p1

    # want to associate some label with resource objects? Use the obj_id.
    rsrc_labels = {}
    rsrc_labels[p1.obj_id] = "fruit"
    rsrc_labels[p2.obj_id] = "fruit"
    ...

.. warning::

    When associating information with resources like the ``rsrc_labels``
    example above, you should **NEVER** use pointers (e.g.
    ``std::map<cyclus::Resource::Ptr, std::string>``).  Pointers are unstable
    and change across simulation snapshot+restart.


.. _tracked-untracked:

Tracked and Untracked Resources
---------------------------------
All changes to normal resource objects (including creation, splitting,
trasmutation, etc.) are tracked and recorded in the database.  By default, all
resources are **tracked resources**.  Because of this, agents should handle
resources carefully, being conscious of mass conservation among other things.
Anything done with resources is recorded in the database as having *actually*
happened in the simulation.  If a new resource is created, it is instantly
recorded in the database as being a part of an agent's real/actual inventory.
Placeholder or "dummy" resources can also be created if necessary.  No
information about these resources is recorded in the simulation database and
they are referred to as **untracked resources**.  An agent's most common (and
likely only) need for untracked resources occurs when communicating details
about a desired/available resources for requests/bids during resource
exchange.  Here untracked resources fulfill a communication roll only.

Just like the functions for creating trakced resources, there are
corresponding function for creating both untracked materials and untracked
products:

**C++:**

.. code-block:: c++

    cyclus::Composition::Ptr c = context()->GetRecipe("enriched_u");

    // create an untracked 100 kg material from c (the enriched_u recipe)
    cyclus::Material::Ptr m1 = cyclus::Material::CreateUntracked(100, c);

    // create an untracked "grapes" product holding 100 grapes.
    cyclus::Product::Ptr p1 = cyclus::Product::CreateUntracked(100, "grapes");

    // nothing about m1 and p1 will ever be recorded in the output data.


**Python:**

.. code-block:: python

    c = self.context.get_recipe("enriched_u")

    # create an untracked 100 kg material from c (the enriched_u recipe)
    m1 = ts.Material.create_untracked(100, c)

    # create an untracked "grapes" product holding 100 grapes.
    p1 = ts.Product.create_untracked(100, "grapes")

    # nothing about m1 and p1 will ever be recorded in the output data.

.. warning::

    When a need for placeholder, dummy, or otherwise untracked
    resource arises, use "untracked" resources.  Do NOT create tracked
    resources to use in resource exchange requests and bids.

