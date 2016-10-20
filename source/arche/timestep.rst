Time Step Execution
===================

A |cyclus| simulation is composed of discrete time steps, and each time step is
subdivided into phases. Phases come in two flavors: kernel phases and agent
phases. Kernel phases include actions that have either been registered to occur
with the |cyclus| kernel (e.g., building a new facility agent) or are driven by
the |cyclus| kernel (e.g., the Resource Exchange). Agent phases are points
within a given time step that allow agents to query the current simulation
environment and perform any agent-specific actions, such as scheduling a new
agent to be built or scheduling a current agent to be decommissioned.

The list of phases in order is:

* :ref:`build` (kernel)
* :ref:`tick` (agent)
* :ref:`exchng` (kernel)
* :ref:`tock` (agent)
* :ref:`decom` (kernel)

Agent phases are invoked using a method call of the same name, e.g., 

.. code-block:: c++

    virtual void MyAgent::Tick() {
      // perform agent-phase Tick's work
    }

Importantly, the order in which agents' agent-phase methods are invoked is *not
guaranteed*. In other words, the execution of any given phase is conceptually
occurring *simultaneously among agents*.

The duration of a time step can be set to custom values by users when running
simulations.  Archetypes must be coded with this in mind.  One easy method for
supporting arbitrary time step duration is to make all time-related quantities
and configuration in the archetype operate on a per-time-step basis (e.g.
reactor cycle length measured in time steps instead of days or months).  If
archetypes do have constraints on the time step duration (e.g. they only
support approximately 1-month time steps), then they should throw an
exception as early as possible (i.e. in their constructor).  The time step
duration can be queried from an the simulation context:

.. code-block:: c++

    virtual void MyAgent::Tick() {
        ...
        double discharge_qty = discharge_rate * context()->dt();
        ...
    }

.. _build:

Build Phase
-----------

In the Build phase, agents that have been scheduled to be built are entered into
the simulation. The entry process includes creating the agent (cloning from a
:term:`prototype`), connecting it with the :term:`parent agent` that originally
registered the build, and calling its ``Build`` virtual member function. The
parent is informed that a new child has been built via the ``cyclus::Agent``'s
``BuildNotify`` member function.

Future builds can be scheduled by any :term:`agent` using the
``cyclus::Context``'s ``SchedBuild`` member function. A build cannot be
scheduled for the current time step, but a build can be scheduled for any
future time step.

.. _tick:

Tick Phase
----------

The Tick phase allows agents to analyze the current status of the simulation
(e.g., the current number of built facilities) and perform any actions they so
choose *before* the execution of the Resource Exchange. For example, an agent
could schedule to build a new child agent or perform some process on its
available inventory of resources.

.. _exchng:

Dynamic Resource Exchange Phase
-------------------------------

The Dynamic Resource Exchange phase is a :term:`kernel phase` in which the
supply and demand of resources is queried, solved, and the trading thereof is
executed. The supply and demand of each concrete resource type
(e.g. ``cyclus::Material`` and ``cyclus::Product``) are solved for
independently. A full discussion of this phase is provided in :ref:`dre`.

.. _tock:

Tock Phase
----------

The Tock phase allows agents to analyze the current status of the simulation
(e.g., the current number of built facilities) and perform any actions they so
choose *after* the execution of the Resource Exchange. For example, an agent
could schedule to decommission a child agent or perform some process on its
available inventory of resources.

.. _decom:

Decommission Phase
------------------

In the Decommission phase, agents that have been scheduled to be decommissioned
are removed from the simulation. The removal process includes informing the
:term:`parent agent` that one of its children is being decommissioned and
calling the child agent's ``Decommission`` function. The parent is informed that
a child is being decommissioned via the ``cyclus::Agent``'s ``DecomNotify``
member function.

Future decommissions can be scheduled by any :term:`agent` using the
``cyclus::Context``'s ``SchedDecom`` member function. A decommission can be
scheduled for the current time step or any future time step.

Further Reading
---------------

For a more in depth (and historical) discussion, see `CEP 20
<http://fuelcycle.org/cep/cep20.html>`_.

