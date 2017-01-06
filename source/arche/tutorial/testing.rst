
Adding a Test
================

In this lesson we will

1. Write a unit test for the Storage archetype

Overview
--------

Testing code is a fundamental `best practice
<http://software-carpentry.org/v4/test/>`_ of writing any kind of
software. While there are technically a few different `varieties
<http://en.wikipedia.org/wiki/Software_testing#Testing_levels>`_ of tests, this
lesson focuses on *unit tests*. 

Add a Test
-----------

Cyclus uses the `GoogleTest <https://code.google.com/p/googletest/wiki/Primer>`_
testing framework. Using the stubs, Cyclus automatically provides you with some
basic archetype unit tests, specifically those that are in

.. code-block:: console

    $ Storage_unit_tests
    ...
    [----------] 8 tests from TutorialFac/AgentTests
    ...
    [----------] 8 tests from TutorialFac/AgentTests (114 ms total)

    [----------] 3 tests from TutorialFac/FacilityTests
    ...
    [----------] 3 tests from TutorialFac/FacilityTests (44 ms total)
    ...

The goal of any good unit test is to define an initial state and expected final
state and then call a function and confirm that the observed final state matches
the expected final state. For the Storage facility, one such state transition is
as follows

- **Initial State**: There is material in the ``input`` buffer
- **Function Call**: ``Tock()``
- **Expected Final State**: The ``input`` buffer is empty and the inventory buffer
  has increase by the same amount

Begin by opening the file ``src/storage_tests.cc`` in your favorite text editor
and find the test for the ``Tock()`` function. It should look something like

.. code-block:: c++

    TEST_F(StorageTest, Tock) {
      EXPECT_NO_THROW(facility->Tock());
      // Test Storage specific behaviors of the Tock function here
    }

You can set up the initial state by pushing a ``Material`` object to the
``input`` buffer. An easy way to make a ``Material`` object is to use the
``NewBlankMaterial()`` API. 

Add the following lines before the ``Tock()`` function call in the test

.. code-block:: c++

    double qty = 42;
    facility->input.Push(cyclus::NewBlankMaterial(qty));

You can then test the test's initial condition

.. code-block:: c++

    EXPECT_DOUBLE_EQ(facility->input.quantity(), qty);
    EXPECT_DOUBLE_EQ(facility->inventory.quantity(), 0);

Then execute the Tock:

.. code-block:: c++

      EXPECT_NO_THROW(facility->Tock());

Next, add the test for the final state after the call to ``Tock()``

.. code-block:: c++

    EXPECT_DOUBLE_EQ(facility->input.quantity(), 0);
    EXPECT_DOUBLE_EQ(facility->inventory.quantity(), qty);

Now your test should look like

.. code-block:: c++

    TEST_F(StorageTest, Tock) {
      double qty = 42;
      facility->input.Push(cyclus::NewBlankMaterial(qty));
      EXPECT_DOUBLE_EQ(facility->input.quantity(), qty);
      EXPECT_DOUBLE_EQ(facility->inventory.quantity(), 0);
      EXPECT_NO_THROW(facility->Tock());
      EXPECT_DOUBLE_EQ(facility->input.quantity(), 0);
      EXPECT_DOUBLE_EQ(facility->inventory.quantity(), qty);
    }

Finally, build and test, same as it ever was

.. code-block:: console

    $ ./install.py
    $ Storage_unit_tests

Exercise
---------

Can you come up with another unit test?

.. note::

    The ``Tock()`` test did not depend on any particular state. We always expect
    the input-to-inventory transfer to take place, no matter what. Is that true
    for your test?


Further Reading
----------------

After unit tests, the next step to take is testing your archetype in an actual
simulation. You can find more on the :ref:`testing` page. 

One of the best ways to learn is by example. The Cycamore repository has
`examples of running regression tests <https://github.com/cyclus/cycamore/tree/develop/tests>`_ 
that include the full execution stack -- read an input file,
run a simulation, and test an output file. There are also `examples of integration tests
<https://github.com/cyclus/cycamore/blob/develop/src/enrichment_tests.cc#L54>`_
that utilize the new `MockSim
<http://fuelcycle.org/arche/testing.html?highlight=mocksim#testing-resource-exchange>`_
testing feature in Cyclus.
