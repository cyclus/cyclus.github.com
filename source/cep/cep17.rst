CEP 17 - Resource Tracking and Interfaces Re-Re-Redo
***********************************************************

:CEP: 17
:Title: Resource Tracking and Interfaces Re-Re-Redo
:Last-Modified: 2013-07-05
:Author: Robert Carlsen <rwcarlsen@gmail.com>
:Status: Draft 
:Type: Standards Track
:Created: Robert Carlsen

Abstract
===========

This proposal serves to address two related issues:

1. **Resource tracking:**

   Several types of analysis are made difficult to impossible by the
   incomplete resource history currently recorded by Cyclus simulations. Such
   analyses include agent time-dependent isotopic inventories and
   proliferation-resistance material handling. It is proposed that all
   resource state and state transitions will be tracked (as opposed to just
   recording state at inter-agent transactions).  In addition to required
   internal additions/changes to resource classes, explicit `transmute`
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

Currently Cyclus only tracks the state of resources when they are transacted.
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
   creating new material objects.

5. When resources are split and combined, there is no way to recall this
   heritage.  Tracing paths of certain material objects is not possible.
   Analyzing the contribution of agent X to the flow of element Y through
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

Specification
===============

A reference implementation exists for both the cyclus core and cycamore.
These reside at https://github.com/rwcarlsen/cyclus ("res" branch) and
https://github.com/rwcarlsen/cycamore ("res" branch) respectively.  Further
implementation details can be found there.

Data Tracking
+++++++++++++++++++++++

In addition to tracking the transfer of resources between agents (and
corresponding state), we track:

* Transmutation of a material resource within an agent (Resource,
  ResourceHeritage, Compositions tables). This helps address problem
  #1 and #4 from Motivation section.

* Decay of a material resource (Resource, ResourceHeritage, Compositions
  tables): This is a special, common case of transmutation.

* All splitting/combining of materials. Tracked by recording the parent(s)
  of each Resource object. Resources with no parent were newly created.
  Helps address problem #2, #3 and #5.

This also simplifies rules for acceptable resource handling, namely, it is
never okay for a resource to be destructed or thrown-away unless it is
being stored permanently. The new changes should make it more obvious to
agent developers how enforce correct, measurable mass-conservation.

Output Schema
+++++++++++++++++++++++

All recorded data will stay the same except for the tables listed below:

* [TableName] ([new/modified/removed]): [field1], [field2], ...

- Resource (modified): ID, type, quantity, StateID, Parent1, Parent2
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
cyclus core.  All more complex operations will be implemented in helper
classes (like MatQuery). A summary of each of these classes' new role and
its public+protected+private interfaces are listed below.

Resource class
~~~~~~~~~~~~~~~

Resource class provides an abstract interface allowing different types of
resources to be transacted in a simulation. It handles some basic state
tracking and output recording assisted by method invocations from its
subclasses.

.. code-block:: c++

    typedef std::string ResourceType;

    class Resource {
      public:
        typedef boost::shared_ptr<Resource> Ptr;

        virtual ~Resource();

        /// Unique for each material object.  Changes whenever *any* state changing
        /// operation is made.
        const int ID();

        /// Returns the units this resource is based in.
        virtual std::string units() = 0;
          
        /// returns the quantity of this resource with dimensions as specified by units().
        virtual double quantity() = 0;

        /// splits the resource and returns the extracted portion as a new resource
        /// object.  Allows for things like ResourceBuff and market matching to
        /// split offers/requests of arbitrary resource implementation type.
        virtual Ptr extractRes(double quantity) = 0;

        virtual ResourceType type() = 0;

        /// returns an untracked (not part of the simulation) copy of the resource.
        virtual Ptr clone() = 0;
        // the clone method implementations should set tracked_ = false.

        /// friends allow setting of tracked_ param when cloning in subclasses /
        /// without making it public. And also allow calling of changeState in create
        /// factory functions (wouldn't work even if protected because not changing
        /// on context "this".
        friend class GenericResource;
        friend class Material;

      protected:
        Resource();

        /// records the resource's state that is not accessible via the Resource /
        /// class interface (e.g. don't record units, quantity, etc) in its own
        /// table.
        virtual void recordState() = 0;

        /// returns an id representing the specific resource implementation's internal state.
        virtual int stateId() = 0;


      private:
        /// called by subclasses whenever any state changing operation has been
        /// performed. Updates the ID and recordes the resources state in the output
        /// database.
        void changeState(int parent1, int parent2 = 0);

        void recordRes();

        static int nextId_;
        int id_;
        bool tracked_;

        int parent1_;
        int parent2_;
    };

Material class
~~~~~~~~~~~~~~~

The material class is primarily responsible for enabling basic material
manipulation while helping enforce mass conservation.  It also provides the
ability to easily decay a material up to the current simulation time; it
does not perform any decay related logic itself.

.. code-block:: c++

    class Material: public Resource {
      public:
        typedef boost::shared_ptr<Material> Ptr;
        static ResourceType Type;

        static Ptr create(double quantity, Composition::Ptr c);
        static Ptr createUntracked(double quantity, Composition::Ptr c);

        virtual ~Material();

        /// returns "kg"
        virtual std::string units();
          
        /// returns the mass of this material in kg.
        virtual double quantity();

        virtual ResourceType type();

        virtual int stateId();

        virtual Resource::Ptr clone();

        virtual Resource::Ptr extractRes(double qty);

        Ptr extractQty(double qty);

        Ptr extractComp(double qty, Composition::Ptr c);

        void absorb(Ptr mat);

        void transmute(Composition::Ptr c);

        Composition::Ptr comp();

        void decay(int curr_time);

        static void decayAll(int curr_time);

      protected:
        virtual void recordState();

        Material(double quantity, Composition::Ptr c);

      private:
        Composition::Ptr mix(double other_qty, Composition::Ptr other);

        double qty_;
        Composition::Ptr comp_;
        int prev_decay_time_;
        static std::map<Material*, bool> all_mats_;
    };

GenericResource class
~~~~~~~~~~~~~~~~~~~~~~

Implements the Resource class interface in a simple way usable for things
like: bananas, man-hours, water, buying power, etc.

.. code-block:: c++

    class GenericResource : public Resource { public:
        typedef boost::shared_ptr<GenericResource> Ptr;
        static ResourceType Type;

        static Ptr create(double quantity, std::string units, std::string quality);
        static Ptr createUntracked(double quantity, std::string units, std::string quality);
        
        /// Returns a reference to a newly allocated copy of this resource 
        virtual Resource::Ptr clone();

        /// Returns the total quantity of this resource in its base unit 
        virtual double quantity() {return quantity_;};
          
        /// Returns base unit for this resource's quantity
        virtual std::string units() {return units_;};
          
        /// Returns the quality of this resoruce's contents (e.g. man-hours)
        virtual std::string quality() {return quality_;};
          
        /// Returns the concrete type of this resource 
        virtual ResourceType type() {return Type;};

        /// each quality gets its own state id
        virtual int stateId();
        
        /**
           Absorbs the contents of the given 'other' resource into this 
           resource  
           @throws CycGenResourceIncompatible 'other' resource is of a
           different quality.
         */
        virtual void absorb(GenericResource::Ptr other);

        /**
           Extracts the specified mass from this resource and returns it as a 
           new generic resource object with the same quality/type. 
            
           @throws CycGenResourceOverExtract 
         */
        GenericResource::Ptr extract(double quantity);

        virtual Resource::Ptr extractRes(double quantity);

      protected:

        virtual void recordState();

      private:  

        /**
           @param quantity is a double indicating the quantity 
           @param units is a string indicating the resource unit 
         */
        GenericResource(double quantity, std::string units, std::string quality);

        static int nextStateID_;
        static std::map<std::string, int> existingStateIds_;

        std::string units_;

        double quantity_;

        double quality_;
    };

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
or other wrapper classes.  The normalize method will utilize the floating
point math introduced by @katyhuff.

.. code-block:: c++

    class Composition {
      public:
        typedef boost::shared_ptr<Composition> Ptr;
        typedef std::map<Iso, double> Vect;

        static Ptr createFromAtom(Vect v);
        static Ptr createFromMass(Vect v);

        int ID();

        Ptr decay(int delta);

        const Vect& atomVect();
        const Vect& massVect();

        /// record in output database (if not done previously).
        void record();

      protected:
        Composition();

        typedef std::map<int, Composition::Ptr> Chain;
        typedef boost::shared_ptr<Chain> ChainPtr;
        ChainPtr decay_line_;

      private:
        // This constructor allows the creation of decayed versions of
        // compositions while avoiding extra memory allocations.
        Composition(int prev_decay, ChainPtr decay_line);

        Ptr newDecay(int delta);

        // normalizes the sum of all quantities in the composition's vector to one.
        void normalize(Vect& v);

        static int nextId_;

        int id_;
        bool recorded_;
        Vect atomv_;
        Vect massv_;
        int prev_decay_;
    };

CompMath namespace
~~~~~~~~~~~~~~~~~~~~~~

The excellent floating point calculation handling and thresholding
functionality introduced by @katyhuff will be preserved. The current
(pre-proposal) Material::diff and Material::applyThreshold methods will
become public functions that operate on Composition::Vect types.

.. code-block:: c++

    namespace CompMath {

      /// Reports the component-wise difference between two
      /// Composition::Vects.
      ///  
      /// @return a new Composition::Vect of a * qtyA - b * qtyB
      Composition::Vect diff(const Composition::Vect& a, double qtyA, const Composition::Vect& b, double qtyB);

      /// Modifies the vec, by zeroing out all elements whose absolute value is less than the threshold.
      /// 
      /// @param vec the vector of isos and amounts to which to apply the threshold
      /// @param threshold the smallest value considered nonzero
      void applyThreshold(Composition::Vect& v, double threshold);
    }


MatQuery class
~~~~~~~~~~~~~~~~~~~~~~

(This interface will probably need extension)

Will be designed to allow user-developers to *easily* retrieve any kind of
information about a material they could ever reasonably need.

.. code-block:: c++

    class MatQuery {
      public:
        MatQuery(Material::Ptr m);

        /// Convenience constructor that auto-casts a Resource::Ptr to a
        /// Material::Ptr.
        MatQuery(Resource::Ptr m);

        double mass(Iso iso) {
          return massFrac(iso) * qty();
        }

        double moles(Iso iso) {
          return mass(iso) / (MT->gramsPerMol(iso) * units::g);
        }

        double massFrac(Iso iso) {
          Composition::Vect v = m_->comp()->massVect();
          return v[iso];
        };

        double atomFrac(Iso iso) {
          Composition::Vect v = m_->comp()->atomVect();
          return v[iso];
        };

        double qty() {
          return m_->quantity();
        };

        bool almostEqual(Material::Ptr other, double threshold=cyclus.eps());

      private:

        Material::Ptr m_;
    };

Other Changes
++++++++++++++

The RecipeLibrary's role of composition decay management has been shifted
into the Composition class.  It now is only responsible for loading recipes
from xml input and serving them up simulation wide.  Agents are also
allowed to register their own compositions manually. *The decay lineage
tracking functionality introduced by Matt Gidden has been effectively
preserved.* RecipeLibrary interface becomes:

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
      void load_recipes(QueryEngine* qe);
    
      /**
         loads a specific recipe 
       */
      void load_recipe(QueryEngine* qe);
      
      /**
         records a new recipe in the simulation
         - records the recipe in the BookKeeper
    
         @param recipe the recipe to be recorded, a CompMapPtr
       */
      void addRecipe(std::string name, Composition::Ptr c);
    
      /**
         This returns a CompMapPtr to the named recipe in the recipes_ map 
    
         @param name the name of the parent recipe, a key in the recipes_ map
       */
      Composition::Ptr getRecipe(std::string name);
    
     private:
      RecipeLibrary();
    
      /// A pointer to this RecipeLibrary once it has been initialized. 
      static RecipeLibrary* instance_;
    
      RecipeMap recipes_;
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

* The current (before this CEP) Cyclus core does not correctly record
  decayed compositions in the output database. This makes comparing
  simulation output size and performance with that of this CEP's proposed
  changes not exactly "fair".

Backends and Performance
+++++++++++++++++++++++++

Preliminary investigation on my part indicates that this extra tracking
will cause significant slowdown using an Sqlite backend database *when
material decay is frequent*.  This slowdown prompted the development of a
faster HDF5 alternative.  This alternate backend currently lives at
https://github.com/rwcarlsen/cyclus ("hdf5" branch).

Basic performance stats were collected by running a full cyclus
inpro_low.xml simulation `time cyclus [path/to/]inpro_low.xml`.  For
reference:

* ~50,000 material objects total
* 1100 months
* 2200 decay calculations
* ~28,000,000 resource object state changes recorded (with CEP implemented)

Cyclus was built with CMake's "RELEASE" mode.  Results reported are
approximate and specific to my office computer.

Without proposed changes (decayed compositions are not recorded - current bug):

===================== ========= ===============
*                     Backend
--------------------- -------------------------
Decay                 Sqlite    Hdf5
===================== ========= ===============
Every 2nd timestep    41 sec.   17 sec.
None                  41 sec.   17 sec.
===================== ========= ===============

With proposed changes:

===================== ========= ===============
*                     Backend
--------------------- -------------------------
Decay                 Sqlite    Hdf5
===================== ========= ===============
Every 2nd timestep    16 min.   2 min. 50 sec.
None                  55 sec.   21 sec.
===================== ========= ===============

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

