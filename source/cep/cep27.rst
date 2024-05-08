CEP 27 - Toolkit Capabilities Injection into an Archetype
*********************************************************

:CEP: 27
:Title: Agent Toolkit Capabilities
:Last-Modified: 2019-10-28
:Author: Baptiste Mouginot <mouginot.baptiste@gmail.com>
:Status: Active
:Type: Standards Track
:Created: Baptiste Mouginot


Abstract
========

The |Cyclus| toolkit is designed to easily implement specific capabilities in
newly developed archetypes, such as a trading policy, commodity producers, etc.
To add characteristics to archetypes such as `Position` or `Metadata`, the
actual implementation method is very verbose. It relies on adding the new
specification in the archetype header, assigning it and use it in the cpp
file. The developers have to manually ensure the consistency in variable naming and
implementation across multiple archetypes/files.
This CEP explains introduces the concept of snippets to simplify and maintain consistency
in the implementation and the usage, across multiple archetypes.


Toolkit Implementation
======================

Each |Cyclus| toolkit component will contain 3 different files:

- 2 for the definition of the feature C++ class (``cpp`` and header) that allows
  the use of the capabilities, and optionally to register its values in the
  output database,
- a snippet definition file used to simplify the implementation and ensure
  consistency accross its integration in the different archetypes.

The snippet definition file will be included in the ``private`` section of the
archetype header as: ``#include toolkit/my_feature_snippet.cycpp.h``. (The use of the
``cycpp.h`` has been chosen to allow syntax highlighting and inform developers
that this is not a standard C++ header.)

The snippet file, will contain the declaration of all the variables required
to use the capabilities class:

- the definition of the capability class as a member variable.

- initialization of the added variables.

- (optional) if the capability requires/allows variable input from users,
  standard |Cyclus| member variable declaration with variable ``#pragma`` is
  required. In addition, to the standard variable declaration and the
  ``#pragma`` the method also require a ``std::vector<int>
  cycpp_shape_myvariable`` to be declared for each of the decorated variable
  that are in the `toolkit/my_feature_snippet.cycpp.h` file. (``cycpp preprocessor`` is
  not able at the time to add them automatically for included files.)


The main purpose of this include method would be to ensure consistency across
archetypes using the same toolkit capability requiring user input, avoiding 1
set of input syntax per archetypes for the same capability.

If the toolkit features needs the capabilities to write in the output database a
``RecordSnippet(Agent* agent)`` method will be implemented in the toolkit class to avoid
multiplication of implementation in the each archetype using the feature.


Archetypes Integration
======================

When the capability is integrated in an Archetype the following implementations
have to be done:

1. Include toolkit class header in in the class header:
   ``#include 'toolkit/my_feature.h'``.

2. Include the snippet in the class header core: 
   ``#include toolkit/my_feature_snippet.cycpp,h``.

3. (optional) In the ``Archetype::EnterNotify()``, initialise the toolkit class member
   variables with variables.

4. (optional) If required, call the ``RecordSnippet()`` method when necessary during the
   Archetype operation.


Class member vs Inheritance
===========================

With inheritance of the capability class, one will need to also modify the
archetype class declaration in addition to simply including the snippet at the
right place.
This may also lead to confusion, as one can believe that the user input value
for variable are passed in the constructor of the class and might lead the
develop to skip the assignation of the value in the inherited class in the
``EnterNotify``...

Otherwise behavior would be very similar.

Example:
========


Without Inheritance:
--------------------
``toolkit/my_feature_snippet.cycpp.h``:

.. code-block:: c

    cyclus::toolkit::Position coordinates(0,0);

    #pragma cyclus var { \
        "default": 0.0, \
        "uilabel": "Geographical latitude in degrees as a double", \
        "doc": "Latitude of the agent's geographical position. The value should " \
           "be expressed in degrees as a double." }
    double latitude = 0;
    // required for compilation but not added by the cycpp preprocessor...
    std::vector<int> cycpp_shape_latitude;

    #pragma cyclus var { \
           "default": 0.0, \
           "uilabel": "Geographical longitude in degrees as a double", \
           "doc": "Longitude of the agent's geographical position. The value should" \
           "be expressed in degrees as a double." }
    double longitude = 0;
    // required for compilation but not added by the cycpp preprocessor...
    std::vector<int> cycpp_shape_longitude;

``my_archetype_example.h``:

.. code-block:: c

    #include 'toolkit/Position.h'
    
     class fun_archetype : public cyclus::facility{
        public:
        [...]
        private:
        [...]
        #include "toolkit/my_feature_snippet.cycpp.h"
    }

``my_archetype_example.cpp``:

.. code-block:: c

    void fun_archetype::EnterNotify() {
        coordinates.set_position(latitude, longitude);
        coordinates.RecordPosition(this);
        [...]
        }

With Inheritance:
-----------------
``toolkit/my_feature_snippet.cycpp.h``:

.. code-block:: c

    #pragma cyclus var { \
        "default": 0.0, \
        "uilabel": "Geographical latitude in degrees as a double", \
        "doc": "Latitude of the agent's geographical position. The value should " \
           "be expressed in degrees as a double." }
    double latitude = 0;
    // required for compilation but not added by the cycpp preprocessor...
    std::vector<int> cycpp_shape_latitude;

    #pragma cyclus var { \
           "default": 0.0, \
           "uilabel": "Geographical longitude in degrees as a double", \
           "doc": "Longitude of the agent's geographical position. The value should" \
           "be expressed in degrees as a double." }
    double longitude = 0;
    // required for compilation but not added by the cycpp preprocessor...
    std::vector<int> cycpp_shape_longitude;

``my_archetype_example.h``:

.. code-block:: c

    #include 'toolkit/Position.h'
    
    class fun_archetype : public cyclus::facility, public Position {
        public:
        [...]
        private:
        [...]
        #include "toolkit/my_feature_snippet.cycpp.h"
    }

``my_archetype_example.cpp``:

.. code-block:: c

    void fun_archetype::EnterNotify() {
        this.set_position(latitude, longitude);
        this.RecordPosition(this);
        [...]
        }
