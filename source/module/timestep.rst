Time Step Execution
===================

A *Cyclus* simulation is composed of discrete time steps, and each time step is
subdivided into phases. Phases come in two flavors: kernel phases and agent
phases. Kernel phases include actions that have either been registered to occur
with the *Cyclus* kernel (e.g., building a new facility agent) or are driven by
the *Cyclus* kernel (e.g., the Resource Exchange). Agent phases are points
within a given time step that allow agents to query the current simulation
environment and perform any agent-specific actions, such as scheduling a new
agent to be built or scheduling a current agent to be decommissioned. 

The list of phases in order is:

* Build (kernel)
* Tick (agent)
* Resource Exchange (kernel)
* Tock (agent)
* Decommission (kernel)

Agent phases are invoked using a method call of the same name, e.g., 

.. code-block:: c++

    virtual void MyAgent::Tick(int time) {
      // perform agent-phase Tick's work
    }

Importantly, the order in which agents' agent-phase methods are invoked is *not
guaranteed*. In other words, the execution of any given phase is conceptually
occuring *simultaneously among agents*.

Build Phase
-----------

In the Build phase, agents that have been scheduled to be built are created
(cloned from a :term:`prototype`), entered into the simulation, connected with
the parent agent that originally registered the build, and have their ``Build``
virtual member function called. The parent is informed that a new child has been
built via the ``cyclus::Agent``'s ``BuildNotify`` member function.

Future builds can be scheduled by any :term:`agent` using the
``cyclus::Context``'s ``SchedBuild`` member function. A build cannot be
scheduled for the current time step, but a build can be scheduled for any future
time step.

Further Reading
---------------

For a more in depth (and historical) discussion, see the relevant `CEP <http://fuelcycle.org/cep/cep20.html>`_. 

