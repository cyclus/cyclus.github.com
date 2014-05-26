Using the Cyclus Preprocessor
==================================

.. |cycpp| replace:: ``cycpp``

.. raw:: html

    <table style="width:100%">
    <tr><td>

A key part of the Cyclus agent and module development infrastructure is
a Cyclus-aware C++ preprocessor called |cycpp|.  This preprocessor 
inspects the agents that you write and then - based on the directives you 
have given it - generates code that conforms to the *Cyclus* agent API.
This allows you to focus on coding up the desired agent behaviour rather 
than worrying about the tedious and error-prone process of making your
agents conform to the Cyclus kernel.

Before we continue there are a couple of noteworthy points about |cycpp|:

* Even when using the preprocessor agents are still completely valid C++
  and may be compiled even without running |cycpp| (though they probably
  won't do the correct thing in a simulation).
* If your module is compiled with the CMake macros found in UseCyclus, 
  |cycpp| is run automatically for you on all relevant files.

Without further ado, let's dive in!

.. raw:: html

    </td><td style="width:300px;">

.. image:: ../astatic/pennyfarthing-jack.jpg
    :align: center
    :width: 300px

.. raw:: html

    </td></tr>
    </table>

Pragma Cyclus
-----------------
The preprocessor functions by defining a suite of cyclus-directives that 
|cycpp| picks up (but that plain old ``cpp`` ignores).  These all start 
with the prefix ``#pragma cyclus`` and fall into one of two broad categories:

1. **Annotation directives** and
2. **Code generation directives**.

The annotation directives allow you specify information and metadata (documentaion,
default values, maximum shape sizes, etc) about your agents. The code generation
directives replace themselves with C++ code inside of the agents based on the 
annotations provided. *The use of these directives is entirely optional.*  However, 
in their absence you must implement the cooresponding agent API yourself.

Annotation Directives
-----------------------
Cyclus agents are based on the notion of **state variables**.  These are memeber 
variables of your agents whose values (should) fully determine the state of the your 
agent at any time step. State variables are important because they are what is 
written to and read from the database, they may be specified in the input file and 
have an associated schema, and define the public interface for the agent.

Thus, the most important annotation directive is the **state variable directive**.
This must be written within the agent's class declaration and applies to the 
next member variable declartion that it sees. This directive not only defines 
the annotations for a variable but also declares it as being a state variable.
It has the following signature:

**State variable annotation signature:**

.. code-block:: c++

    #pragma cyclus var <dict>

Here, the ``<dict>`` argument must evaluate to a Python dictionary (or other mapping). 
For example, 

**State variable annotation example:**

.. code-block:: c++

    #pragma cyclus var {"default": 42.0, "units": "n/cm2/s"}
    double flux;

These two lines declare that the member variable ``flux`` is in fact a state variable
of type double with the given metadata.  The keys of this dictionary may be anything
you desire, though because they are eventaully persisted to JSON the keys must 
be have a string types. Certain keys have special semantic meaning and there are 
two - ``type`` and ``index`` - that are set by |cycpp| and should not be specified
explicitly.

.. rst-class:: centered

.. table:: **Table I.** Special State Variable Annotations
    :widths: 1 9
    :column-alignment: left left
    :column-wrapping: true true 
    :column-dividers: none single none

    ============ ==============================================================
    key          meaning
    ============ ==============================================================
    type         The C++ type, **DO NOT SET**.
    index        Which number state variable is this, 0-indexed, 
                 **DO NOT SET**.
    default      The default value for this variable that is used if otherwise 
                 unspecified. The value must match the type of the variable.
    shape        The shape of a variable length datatypes. If present this must
                 be a list of integers whose length (rank) makes sense for this
                 type. Specifying positive values will (depending on the 
                 backend) turn a variable length type into a fixed length one 
                 with the length of the given value. Putting a ``-1`` in the 
                 shape will retain the variable length nature along that axis. 
                 Fixed length variables are normally more performant so it is 
                 often a good idea to specify the shape where possible. For 
                 example, a length-5 string would have a shape of ``[5]`` and 
                 a length-10 vector of variable length strings would have a 
                 shape of ``[10, -1]``.
    doc          Documentation string.
    tooltip      Brief documentation string for user interfaces.
    units        The physical units, if any.
    userlevel    Integer from 0 - 10 for representing ease (0) or difficulty (10) 
                 in using this variable, default 0.
    initfromcopy Code snippet to use in the ``InitFrom(Agent* m)`` function for 
                 this state variable instead of using code generation.
    initfromdb   Code snippet to use in the ``InitFrom(QueryableBackend* b)`` 
                 function for this state variable instead of using code generation.
    infiletodb   Code snippet to use in the ``InfileToDb()`` function for 
                 this state variable instead of using code generation.
    schema       Code snippet to use in the ``schema()`` function for 
                 this state variable instead of using code generation.
    snapshot     Code snippet to use in the ``Snapshot()`` function for 
                 this state variable instead of using code generation.
    snapshotinv  Code snippet to use in the ``SnapshotInv()`` function for 
                 this state variable instead of using code generation.
    initinv      Code snippet to use in the ``InitInv()`` function for 
                 this state variable instead of using code generation.
    ============ ==============================================================

**The prime directive:**

.. code-block:: c++

    #pragma cyclus

Only the first token (``cyclus``) is matched by normal ``cpp`` to determine if
it is a known pragma.  This is great, because you can then add arguments to
it.  


Now you can go through your the code as many times you need, accumulating state & 
annotations, and inserting whatever C++ code needs to be generated elsewhere.
This let's users write fully compatible and compilable C++ code that can hook into
your simulation - or not!

Python & cycpp
---------------
We have chosen to write the cyclus preprocessor (``cycpp``) in Python - though 
truly it could have been written in any language.  Writing it in Python gave us
access to some awesome parts of the Python interpreter. 

You may have noticed that the variable annotations above look a lot like a 
Python dictionary.  That is because they are! (Or more generally, they are 
any expression which evaluates to a mapping.  Most JSON is valid here too.)
This is awesome.  This means that not even our annotations exist in their own
DSL.  Every part of simulator is valid in a language that we are not the sole
proprietors of.  If a 3rd party developer has already gone through the process
of learning C++ to add a model to our simulator, learning Python dictionaries
is not a barrier to entry.

Furthermore, since these are Python expressions, we have wired it up so that 
the scope of these dicts matches that of the class they are declared within.
This let's users do neat things like the following:

.. code-block:: c++

    namespace mi6 {

    class Spy {
      #pragma cyclus var {"default": 7}
      int id;

      #pragma cyclus var {"default": "James Bond, {0:0>3}".format(id['default'])}
      std::string name;
    };

    class Friend {
      #pragma cyclus var {\
        "docstring": "Normally helps {0}".format(Spy.name['default'])}
      std::string help_first;
    };
    }; // namespace cyclus

    class Enemy {
        #pragma cyclus var {'default': mi6.Spy.name['default']}
        std::string nemesis;
    };

If this isn't expressive enough, we also added an ``exec`` pragma which 
allows users to execute arbitrary Python code, that is added to the global
namespace the state variables are evaluated in.

.. code-block:: c++

    #pragma cyclus exec import uuid
    #pragma cyclus exec x = 10

    class TimeBomb {
      #pragma cyclus var {"default": int(uuid.uuid1(clock_seq=x))}
      int deactivation_code;
    };
    
Users can decide to keep all of their state variable annotations in a 
separate sidecar ``*.py`` file and then import and use them rather than
cluttering up the C++ source code.

Mirror, Mirror
---------------
*So where is the reflection?*

The reflection comes out of the fact that our state accumulation stage
is prior to any code that we generate.  ``cycpp`` is a 3-pass
preprocessor. The three passes are:

1. run cpp normally to canonize all other preprocessor directives,
2. accumulate annotations for agents and state variables, and
3. generate code based on annotations.

Two passes are the minimum required, but having the first stage where we 
run the code through plain old ``cpp`` is ideal because this resolves
a lot of wacky things that people *can* do with the preprocessor:

.. code-block:: c++

    #define OPEN_CURLY_BRACE {
    #define CLOSED_CURLY_BRACE }

    class Spy OPEN_CURLY_BRACE
      int id;
    CLOSED_CURLY_BRACE;

The above (shamefully) is fully valid C++. So if you don't use ``cpp`` 
as a first stage then to be robust you need to implement ``cpp``. 
(Which is too much work for a simulator.)

In the end, we have a whole suite of ``#pragma cyclus`` directives that 
let users specify what they want generated and where. These are based on:

1. the method they want generated, 
2. whether they want the declaration, definition, or implementation
   of this method, or
3. a wrap up of the above.

These pragmas are, of course, scope aware.  The code generation pragmas 
are not particularly interesting to someone not doing cyclus development 
so I will skip them here. To give you a taste though, in the simplest 
case for one state variable on a single class we transform the code the 
user or developer has to write from:

.. code-block:: c++

    class Friend: public Spy {
       public:
        #pragma cyclus 

        #pragma cyclus var {\
          "default": "friend of " + Spy.name['default'], \
          }
        std::string friend;
    };

into this automatically:

.. code-block:: c++

    class Friend: public Spy {
     public:
      virtual void InitFrom(mi6::Friend* m) {
        mi6::Spy::InitFrom(m);
        friend = m->friend;
      };

      virtual void InitFrom(cyclus::QueryableBackend* b) {
        mi6::Spy::InitFrom(b);
        cyclus::QueryResult qr = b->Query("Info", NULL);
        friend = qr.GetVal<std::string>("friend");
      };

      virtual void InfileToDb(cyclus::InfileTree* tree, cyclus::DbInit di) {
        mi6::Spy::InfileToDb(tree, di);
        tree = tree->SubTree("agent/" + agent_impl());
        di.NewDatum("Info")
        ->AddVal("friend", cyclus::OptionalQuery<std::string>(tree, "friend", "friend of James Bond, 007"))
        ->Record();
      };

      virtual cyclus::Agent* Clone() {
        mi6::Friend* m = new mi6::Friend(context());
        m->InitFrom(this);
        return m;
      };

      virtual std::string schema() {
        return ""
          "<optional>\n"
          "    <element name=\"friend\">\n"
          "        <data type=\"string\" />\n"
          "    </element>\n"
          "</optional>\n"
          ;
      };

      virtual void InitInv(cyclus::Inventories& inv) {
      };

      virtual cyclus::Inventories SnapshotInv() {
        cyclus::Inventories invs;
        return invs;
      };

      virtual void Snapshot(cyclus::DbInit di) {
        di.NewDatum("Info")
        ->AddVal("friend", friend)
        ->Record();
      };

    #pragma cyclus var { "default": "friend of " + Spy.name['default'], }
    std::string friend;
    };

