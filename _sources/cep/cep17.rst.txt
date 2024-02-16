CEP 17 - Resource Tracking and Interfaces Re-Re-Redo
***********************************************************

:CEP: 17
:Title: Resource Tracking and Interfaces Re-Re-Redo
:Last-Modified: 2013-09-03
:Author: Robert Carlsen <rwcarlsen@gmail.com>
:Status: Accepted
:Type: Standards Track
:Created: Robert Carlsen

Abstract
===========

This proposal serves to address two related issues:

1. **Resource tracking:**

   Several types of analysis are made difficult to impossible by the
   incomplete resource history currently recorded by |Cyclus| simulations. Such
   analyses include agent time-dependent isotopic inventories and
   proliferation-resistance material handling. It is proposed that all
   resource state and state transitions will be tracked (as opposed to just
   recording state at inter-agent transactions).  In addition to required
   internal additions/changes to resource classes, explicit ``transmute``
   functionality will be added to the Material class to accommodate
   mass-conserving state changes that occur in agents such as Reactors.

2. **Resource interface complexity:**

   Creating, querying, and manipulating resources is too complex and is spread
   across too many classes.  The resource class (and friends) will have their
   interfaces minimized and all extra functionality will be provided by one or
   more wrapper classes.

Motivation and Rationale
==========================

This proposal serves to address two related issues: resource tracking and
resource interface complexity. Because changes to resource tracking will be
intrusive to the current resource interfaces, performing these changes
together is desirable.

**Resouce Tracking:**

Currently |Cyclus| only tracks the state of resources when they are transacted.
This limited tracking is problematic for certain kinds of output
analysis.  Examples:

1. The meaning of "inventory" for agents that transmute materials is
   ill-defined.  To calculate the inventory of a reactor faciltiy, an
   analysis of present data would show fresh fuel coming in, and spent fuel
   coming out.  The aggregation of transactions to a specific point in time
   would not be the reactor's current inventory.  Rather it would be the
   reactor's inventory plus the difference between fresh and spent fuel
   processed until that point in time. The same problem exists with decay.

2. We cannot determine if a resource was ever handled inappropriately (e.g.
   non-proliferation analysis) internally within an agent.

3. We are unable to determine "source" agents that create material and what
   they created.

4. There is no mass-conservation-safe way to transmute a material (i.e.
   change its nuclide composition) outside of destroying and simultaneously
   creating new material objects (which isn't mass-conservations-safe).

5. When resources are split and combined, there is no way to recall this
   heritage.  Tracing paths of certain material objects is not possible.
   Analyzing the contribution of agent X to the flow of isotope Y through
   agent Z is not possible.

The above deficiencies are used as drivers for designing/implementing a more
thorough resource tracking infrastructure.

Additionally, some materials will exist in the simulation that are not
"part" of the simulation and should not be recorded in the ouptut.  Some of
these materials will be objects representing what agents are
offering/requesting.  A new implementation must accomodate this
requirement.

**Resource Interface Complexity:**

The interface(s) for creating, manipulating, and using resources is too
confusing and complex.  There are methods for accessing material state
variables spread across three classes (Material, IsoVector, CompMap).  The
current trio will be reduced to a duo (Material and Composition classes).
All query convenience related methods will be moved to one (or more)
wrapper classes for interrogating and manipulating material compositions.
*Functionality provided by these wrapper classes can grow organically as
needs arise without affecting the core resource classes.*

Part of the problem has been that some questions belong to the Material
class, some belong to the composition class. And some can only be answered
by using information from both.  Another reason to use wrapper classes is
that sometimes a user/dev might want to manipulate compositions, and other
times they will want to manipulate materials - and many of those
queries/operations have significant overlap that we don't want duplicated
on both classes' implementations nor interfaces.  Another reason is to help
the classes be more modular/maintainable for the core developers.  Some
basic material/composition query/manipulation wrapper(s) can be made
setting the stage for the further development of a "toolkit" for dealing
with materials and compositions.  External developers can easily create
toolkits for others to use that don't even need to be a part of the |Cyclus|
core. This makes it easier to ensure that material/composition inner
workings remain pure and correct despite rapid or significant changes to
the kitchen-sink API that will likely evolve.

Specification
===============

A reference implementation exists for both the |cyclus| core and cycamore.
These reside at https://github.com/rwcarlsen/cyclus ("res" branch) and
https://github.com/rwcarlsen/cycamore ("res" branch) respectively.  Further
implementation details can be found there.

Data Tracking
+++++++++++++++++++++++

In addition to tracking the transfer of resources between agents (and
corresponding state), we track:

* Creation of a resource. Parentless resources are implicitly defined as
  "newly created"

* Transmutation of a material resource within an agent (Resource,
  ResourceHeritage, Compositions, GenericResource tables). The transmuted
  resource has the prev resource as its only parent.  This helps address
  problem #1 and #4 from Motivation section.

* Decay of a material resource (Resource, ResourceHeritage, Compositions
  tables): This is a special, common case of transmutation.

* All splitting/combining of materials. Tracked by recording the parent(s)
  of each Resource object. Resources with no parent were newly created.
  Helps address problem #2, #3 and #5.

This also simplifies rules for acceptable resource handling. Namely, it is
never okay for a resource to be destructed or thrown-away unless it is
being stored permanently. The new changes should make it more obvious to
agent developers how enforce correct, measurable mass-conservation.

This proposed tracking provides orthogonality between resource
handling/operations and resource ownership.  Resource operations don't
know/care about who is splitting/combining/transmuting/creating them.  This
orthogonality, I believe, is a good feature because: it simplifies the
resource APIs, decouples transaction and resource manipulation and data
recording code, and it decouples output data elegantly.  Resource tracking
becomes entirely independent of facility operations, transactions, and
simulation time-stepping. If problem #1 as described in the Motivation
section is a fundamentally necessary analysis for basically every
simulation we want to run, then we either need (minimally) the tracking
proposed in this CEP or we need to break the orthogonality that I just
described.  Eliminating even one of the things tracked as described above
will break the ability to unambiguously determine agent inventories.

Output Schema
+++++++++++++++++++++++

All recorded data will stay the same except for the tables listed below:

* [TableName] ([new/modified/removed]): [field1], [field2], ...

- Resource (modified): ID, Time, Type, Quantity, StateID, Parent1, Parent2
- Compositions (new): ID, Isotope, Quantity
- TransactedResources (modified): TransactionID, Position, ResourceID
- GenericResources (modified): ID, Quality, Units
- IsotopicStates (removed)


*Note that unlike GenericResources, there is no units field for
compositions because we can record all material composition amounts in a
canonical unit (i.e. kg).  GenericResources, however, are
expected/anticipated to have different unit types along with their
differing "quality" field values.*

Resources/Material API
+++++++++++++++++++++++

The Material and Composition classes will be designed to provide only the
minimal interface to support basic manipulation and tracking required by the
|cyclus| core.  All more complex operations will be implemented in helper
classes (like MatQuery). A summary of each of these classes' new role and
its public interfaces are described below.

Resource class
~~~~~~~~~~~~~~~

Resource class provides an abstract interface allowing different types of
resources to be transacted in a simulation.

.. code-block:: c++

    namespace cyclus {

    typedef std::string ResourceType;

    class Resource {
     public:
      typedef boost::shared_ptr<Resource> Ptr;

      virtual ~Resource() { };

      /// returns the unique id corresponding to this resource and its current
      /// state.
      const int id() const;

      /// assigns a new, unique id to this resource and its state.
      void BumpId();

      /// returns an id representing the specific resource implementation's
      /// internal state.  Any change to the state_id should be accompanied by a
      /// call to BumpId.
      virtual int state_id() const = 0;

      virtual const ResourceType type() const = 0;

      /// returns an untracked (not part of the simulation) copy of the resource.
      virtual Ptr Clone() const = 0;
      // the clone method implementations should set tracked_ = false.

      /// records the resource's state to the output database.  This method should
      /// generally / NOT record data accessible via the Resource class public
      /// methods (e.g.  / state_id, units, type, quantity)
      virtual void Record() const = 0;

      /// Returns the units this resource is based in.
      virtual std::string units() const = 0;

      /// returns the quantity of this resource with dimensions as specified by
      /// units().
      virtual double quantity() const = 0;

      /// splits the resource and returns the extracted portion as a new resource
      /// object.  Allows for things like ResourceBuff and market matching to
      /// split offers/requests of arbitrary resource implementation type.
      virtual Ptr ExtractRes(double quantity) = 0;

    };

    } // namespace cyclus

Material class
~~~~~~~~~~~~~~~

The material class is primarily responsible for enabling basic material
manipulation while helping enforce mass conservation.  It also provides the
ability to easily decay a material up to the current simulation time; it
does not perform any decay related logic itself.

There are four basic operations that can be performed on materials: create,
transmute (change material composition - e.g. fission by reactor), absorb
(combine materials), extract (split a material). All material
handling/manipulation will be performed using these operations - and all
operations performed will be recorded. Usage examples:

* A mining facility that "creates" new material

.. code-block:: c++

    Composition::Ptr nat_u = ...
    double qty = 10.0;

    Material::Ptr m = Material::Create(qty, nat_u);

* A conversion facility mixing uranium and flourine:

.. code-block:: c++

    Material::Ptr uf6 = uranium_buf.PopOne();
    Material::Ptr f = flourine_buf.PopOne();

    uf6.Absorb(f);

* A reactor transmuting fuel:

.. code-block:: c++

    Composition::Ptr burned_comp = ... // fancy code to calculate burned isotopics
    Material::Ptr assembly = core_fuel.PopOne();

    assembly.Transmute(burned_comp);

* A separations plant extracting stuff from spent fuel:

.. code-block:: c++

    Composition::Ptr comp = ... // fancy code to calculate extraction isotopics
    Material::Ptr bucket = spent_fuel.PopOne();
    double qty = 3.0;

    Material::Ptr mox = bucket.ExtractComp(qty, comp);


Proposed material class interface:

.. code-block:: c++

    class Material: public Resource {
     public:
      typedef boost::shared_ptr<Material> Ptr;
      static const ResourceType kType;

      virtual ~Material();

      static Ptr Create(double quantity, Composition::Ptr c);
      static Ptr CreateUntracked(double quantity, Composition::Ptr c);

      virtual int state_id() const;

      virtual const ResourceType type() const;

      virtual Resource::Ptr Clone() const;

      virtual void Record() const;

      /// returns "kg"
      virtual std::string units() const;

      /// returns the mass of this material in kg.
      virtual double quantity() const;

      virtual Resource::Ptr ExtractRes(double qty);

      Ptr ExtractQty(double qty);

      Ptr ExtractComp(double qty, Composition::Ptr c, double threshold = eps_rsrc());

      void Absorb(Ptr mat);

      void Transmute(Composition::Ptr c);

      void Decay(int curr_time);

      static void DecayAll(int curr_time);

      Composition::Ptr comp() const;
    };

    } // namespace cyclus

GenericResource class
~~~~~~~~~~~~~~~~~~~~~~

Implements the Resource class interface in a simple way usable for things
like: bananas, man-hours, water, buying power, etc.

.. code-block:: c++

    class GenericResource : public Resource {
     public:
      typedef boost::shared_ptr<GenericResource> Ptr;
      static const ResourceType kType;

      static Ptr Create(double quantity, std::string quality, std::string units);
      static Ptr CreateUntracked(double quantity, std::string quality,
                                 std::string units);

      /// not needed/no meaning for generic resources
      virtual int state_id() const {
        return 0;
      };

      /// Returns the concrete type of this resource
      virtual const ResourceType type() const {
        return kType;
      };

      /// Returns a reference to a newly allocated copy of this resource
      virtual Resource::Ptr Clone() const;

      virtual void Record() const { };

      /// Returns the total quantity of this resource in its base unit
      virtual std::string units() const {
        return units_;
      };

      /// Returns the total quantity of this resource in its base unit
      virtual double quantity() const {
        return quantity_;
      };

      virtual const std::string& quality() const {
        return quality_;
      };

      virtual Resource::Ptr ExtractRes(double quantity);

      /// Extracts the specified mass from this resource and returns it as a
      /// new generic resource object with the same quality/type.

      /// @throws CycGenResourceOverExtract
      GenericResource::Ptr Extract(double quantity);

      /// Absorbs the contents of the given 'other' resource into this
      /// resource
      /// @throws CycGenResourceIncompatible 'other' resource is of a
      void Absorb(GenericResource::Ptr other);
    };

    } // namespace cyclus

Composition class
~~~~~~~~~~~~~~~~~~~~~~

An immutable object responsible for tracking decay lineages (to prevent
duplicate calculations and output recording) and able to record its
composition data to output when told.  Each composition will keep a pointer
to references to every other composition that is a result of decaying this
or a previously decayed-from composition.

Note that previously, composition creation/modification involved a notion
of equivalence via threshold comparison to facilitate reduced
memory/storage burdens.  This proposal discards this idea in favor of
defining equivalence trivially as "the same object in memory" or pointer
equality.  Some discussion regarding this can be found in comments here:
https://github.com/cyclus/cyclus/issues/484.  Of particular concern w.r.t.
the previous equivalence notion is this::

  Also - another potential issue I thought of: Repeatedly calling multiple
  consecutive small differences negligible could result in compositions
  staying the same that would have otherwise been appreciably different if
  each small change were allowed to propogate as a new composition.

While there are definitely uses for material/composition equivalence, they
should/will not be used by the core (for now) and best belong in MatQuery
or other places.

.. code-block:: c++


    namespace cyclus {

    typedef int Iso;
    typedef std::map<Iso, double> CompMap;

    // Represents an immutable nuclear material composition
    class Composition {
     public:
      typedef boost::shared_ptr<Composition> Ptr;

      static Ptr CreateAtom(CompMap v);
      static Ptr CreateMass(CompMap v);

      int id();
      const CompMap& atom_vect();
      const CompMap& mass_vect();

      Ptr Decay(int delta);

      /// record in output database (if not done previously).
      void Record();
    };

    } // namespace cyclus

compmath namespace
~~~~~~~~~~~~~~~~~~~~~~

The excellent floating point calculation handling and thresholding
functionality introduced by @katyhuff will be preserved. The current
(pre-proposal) Material::Diff and Material::ApplyThreshold methods will become
public functions that operate on CompMap types.  Other common
composition manipulation functions will live here.  They will operate on
CompMap's because Composition's themselves are immutable.  Resource
and Composition classes will use these methods where appropriate instead of
their own, internal versions. This namespace is intended to grow organically as
needed.

.. code-block:: c++

    namespace cyclus {
    namespace compmath {

    CompMap Add(const CompMap& v1, double qty1,
                          const CompMap& v2, double qty2);

    /// previously Material::Diff
    CompMap Sub(const CompMap& v1, double qty1,
                           const CompMap& v2, double qty2);

    void ApplyThreshold(CompMap* v, double threshold);

    void Normalize(cyclus::CompMap* v, double val);

    bool ValidIsos(const CompMap& v);

    bool AllPositive(const CompMap& v);

    bool AlmostEq(const CompMap& v1,
                  const CompMap& v2,
                  double threshold);

    } // namespace compmath
    } // namespace cyclus


MatQuery class
~~~~~~~~~~~~~~~~~~~~~~

(This interface will probably need extension)

This is intended to allow user-developers to *easily* retrieve any kind of
information about a material they could ever reasonably need. The interface is
designed to grow organically as needed.

.. code-block:: c++

    class MatQuery {
      public:
        MatQuery(Material::Ptr m);

        /// Convenience constructor that auto-casts a Resource::Ptr to a
        /// Material::Ptr.
        MatQuery(Resource::Ptr m);

        double mass(Iso iso);

        double moles(Iso iso);

        double mass_frac(Iso iso);

        double atom_frac(Iso iso);

        double qty();

        bool AlmostEqual(Material::Ptr other, double threshold=cyclus.eps());
    };

Other Changes
++++++++++++++

The RecipeLibrary's role of composition decay management has been shifted into
the Composition class.  *The decay lineage tracking functionality introduced by
Matt Gidden has been effectively preserved.*  RecipeLibrary now is only
responsible for loading recipes from xml input and serving them up simulation
wide.  Agents are also allowed to register their own compositions manually.
RecipeLibrary interface becomes:

.. code-block:: c++

    class RecipeLibrary {
     public:
      /**
         Gives all simulation objects global access to the RecipeLibrary by 
         returning a pointer to it. 
         Like the Highlander, there can be only one. 
          
         @return a pointer to the RecipeLibrary 
       */
      static RecipeLibrary* Instance();
    
      /**
         loads the recipes from the input file 
       */
      void LoadRecipes(QueryEngine* qe);
    
      /**
         loads a specific recipe 
       */
      void LoadRecipe(QueryEngine* qe);
      
      /**
         records a new recipe in the simulation
         - records the recipe in the BookKeeper
    
         @param recipe the recipe to be recorded, a CompMapPtr
       */
      void AddRecipe(std::string name, Composition::Ptr c);
    
      /**
         This returns a CompMapPtr to the named recipe in the recipes_ map 
    
         @param name the name of the parent recipe, a key in the recipes_ map
       */
      Composition::Ptr GetRecipe(std::string name);
    };

Backwards Compatibility
========================

Most backwards incompatible changes are unambiguously described by the
reference implementation at https://github.com/rwcarlsen/cycamore ("res"
branch). Existing modules will need to be updated to use the new API's.  These
changes are fairly straight forward and include:

* Material queries will have to be modified to use MatQuery class.

* CompMap/IsoVector creation will need to change to use new Composition
  factory methods.

* Material creation will need to change to use new Material factory
  methods.

* Agents (esp. reactors) must be modified to transmute rather than
  throw-away/create material.

Other Notes
============

Current implementation bugs
++++++++++++++++++++++++++++

* The current (before this CEP) |Cyclus| core does not correctly record
  decayed compositions in the output database. This makes comparing
  simulation output size and performance with that of this CEP's proposed
  changes not exactly "fair".

Backends and Performance
+++++++++++++++++++++++++

Preliminary investigation on my part indicates that this extra tracking
will cause significant slowdown using an Sqlite backend database *when
material decay is frequent*.  This slowdown prompted the development of a
faster HDF5 alternative (currently merged into develop branch).

Basic performance stats were collected by running a full |cyclus|
inpro_low.xml simulation ``time cyclus [path/to/]inpro_low.xml``.  For
reference:

* ~50,000 material objects total
* 1100 months
* 2200 decay calculations
* ~28,000,000 resource object state changes recorded (with CEP implemented)

|Cyclus| was built with CMake's "RELEASE" mode.  Results reported are
approximate and specific to my office computer.

Without proposed changes (decayed compositions are not recorded - current bug):

===================== ========= ===============
*                     Backend
--------------------- -------------------------
Decay                 Sqlite    Hdf5
===================== ========= ===============
Every 2nd timestep    40 sec.   15 sec.
None                  40 sec.   15 sec.
===================== ========= ===============

With proposed changes:

===================== ========= ===============
*                     Backend
--------------------- -------------------------
Decay                 Sqlite    Hdf5
===================== ========= ===============
Every 2nd timestep    16 min.   55 sec.
None                  54 sec.   15 sec.
===================== ========= ===============

With proposed changes running inpro_low.xml with decay on and hdf5 backend:

* Event and EventManager code takes ~20% of
* Hdf5Back code takes ~20% of runtime.
* ticking, tocking, and daily-tasking take about ~45% of runtime.
* Decay calculations take ~10% of runtime.

Decay Initiation
++++++++++++++++++

There has been some debate regarding the best way(s) to handle decaying
material objects in the simulation. Options include: manually by agents,
automatically and periodic, automatically at transaction time, and others.
While this involves the resource+material classes and can have a large
impact on simulation speed and output size, it has no direct impact on nor
directly impacts this proposal. Further discussion on this can be found
here https://github.com/cyclus/cyclus/issues/466 and to lesser degree
https://github.com/cyclus/cyclus/issues/204.

