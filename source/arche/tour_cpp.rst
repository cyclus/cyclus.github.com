A Tour of Cycstub
=================

This section will walk through the source files of the stub :term:`archetypes
<archetype>` in `Cycstub <https://github.com/cyclus/cycstub>`_. Cycstub provides
three stub archetypes:

* ``StubFacility``
* ``StubInstitution``
* ``StubRegion``

We will walk through ``StubFacility``\ 's source specifically because its the
most complicated of the three. Before we begin, though, let's get a fresh copy
of Cycstub (or follow along on the `website
<https://github.com/cyclus/cycstub>`_).

**Getting cycstub via git:**

.. code-block:: bash

    $ git clone https://github.com/cyclus/cycstub.git
    $ cd cycstub

**Getting cycstub via zip:**

.. code-block:: bash

    $ curl -L https://api.github.com/repos/cyclus/cycstub/zipball > cycstub.zip
    $ unzip cycstub.zip
    $ mv cyclus-cycstub-* cycstub
    $ cd cycstub

Feel free to ``rm`` the cycstub directory when we're done (you can always get it
back!).

StubFacility
------------

The ``StubFacility`` provides the minimal interface that an :term:`archetype`
that derives from ``cyclus::Facility`` must provide. We'll go through both the
header (``h``) and implementation (``cc``) files in conjunction, starting at the
top.

``stub_facility.h`` has a single |cyclus|-based include

.. code-block:: cpp

  #include "cyclus.h"

which includes most :term:`cyclus kernel` headers as a convenience for new
:term:`archetype developers <archetype developer>`. You're more than welcome to
include the specific kernel headers you need if you require a smaller
executable.

Moving on in the header file we come to the class declaration

.. code-block:: cpp

  class StubFacility : public cyclus::Facility  {

which simply states that the ``StubFacility`` inherits from ``cyclus::Facility``.

We then come to the constructor declaration

.. code-block:: cpp

  explicit StubFacility(cyclus::Context* ctx);

and implementation

.. code-block:: cpp

  StubFacility::StubFacility(cyclus::Context* ctx)
      : cyclus::Facility(ctx) {};

The constructor takes a single ``cyclus::Context`` argument. The :term:`context`
is the mechanism by which :term:`agents <agent>` can query and otherwise
communicate with the simulation environment. Because the base ``cyclus::Agent``
class requires a ``cyclus::Context`` argument in its constructor, all derived
classes must pass the argument down its constructor chain, as ``StubFacility``
does with its ``cyclus::Facility`` constructor above.

Continuing with the header file, we next come to **the prime directive**

.. code-block:: c++

    #pragma cyclus

In short, the prime directive allows an archetype developer to use the |cyclus|
preprocessor to autogenerate many member functions that are required for
|cyclus| features related to initialization and restart capabilities. For a
further explanation, see :ref:`cycpp`.

The next line in ``stub_facility.h`` is also related to the preprocessor's
ability to help automate some documentation:

.. code-block:: c++

  #pragma cyclus note {"doc": "A stub facility is provided as a skeleton " \
                              "for the design of new facility agents."}

Again, ``#pragma cyclus note`` is explained further in :ref:`cycpp`.

Continuing along, we reach the final three member functions, each of which are
defined on the base ``cyclus::Agent`` class and are overrode by the
``StubFacility``.

str
+++

The declaration

.. code-block:: c++

  virtual std::string str();
  
and implementation

.. code-block:: c++

  std::string StubFacility::str() {
    return Facility::str();
  }

of the ``str`` method allows the ``StubFacility`` to customize its string
representation, which is printed at a variety of ``cyclus::Logger`` logging
levels, which is explained further in :doc:`/arche/logger`.

Tick
++++

The declaration

.. code-block:: c++

  virtual void Tick();

and implementation

.. code-block:: c++

  void StubFacility::Tick() {}

of the ``Tick`` member function allows the ``StubFacility`` to act during the
:term:`tick` :term:`agent phase`.

Tock
++++

The declaration

.. code-block:: c++

  virtual void Tock();

and implementation

.. code-block:: c++

  void StubFacility::Tock() {}

of the ``Tock`` member function allows the ``StubFacility`` to act during the
:term:`tock` :term:`agent phase`.
