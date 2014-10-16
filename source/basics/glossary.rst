.. summary Glossary of Cyclus Fuel Cycle Simulator Terms

:version: Document v1.0 - 8/14/2012

Glossary of Cyclus Terms
========================

.. glossary::
  :sorted:

  context

    The queryable environment of a |cyclus| simulation.
  
  fuel cycle simulator  
  
    A computational framework for modeling nuclear fuel cycles.

  commodity  

    A name assigned to a class of resources. |cyclus| determines the flow of
    resources during a time step based on the supply of and demand for 
    commodities based on :term:`agent's <agent>` requests and bids for those 
    commodities.

  dynamic resource exchange

    the methodology that governs time step behavior in |cyclus| -- see
    :doc:`Dynamic Resource Exchange <../arche/dre>`

  plug-in  

    See :term:`module`.

  open development platform  

    A code repository or server that is publicly viewable and downloadable, 
    though not necessarily modifiable.

  open development process

    A software development workflow, usually on an :term:`open development
    platform`, that is transparent to the public. Hallmarks include public bug
    reports, source code access, and code contribution.

  closed development platform  

    A code repository or server that is kept private during development to 
    secure proprietary or sensitive work.

  closed development process  

    A software development workflow, usually on a :term:`closed development
    platform`, that is not transparent to the public as authorization is
    required before development access to the codebase is granted. This is used
    for secure proprietary or sensitive work.

  cyclus core  

    The repository at github.com/cyclus/cyclus and primary focus of the core
    developers of the cyclus project.  

  cyclus kernel

    The simulation engine housed in :term:`cyclus core`. :term:`Archetypes
    <archetype>` defined in :term:`modules <module>` are linked dynamically to the
    kernel at the beginning of every simulation.

  archetype

    A collection of logic and behavior which can be configured into a
    :term:`prototype` which can then be instantiated in simulation as a
    :term:`agent`. Archetypes are represented as C++ classes that inherit from
    the base ``cyclus::Agent`` class.

  prototype

    A configured :term:`archetype` with initial state and conditions.
    :term:`Agents <agent>` that do act in the simulation are cloned (copied) from
    prototypes.

  agent

    An entity that acts in a |cyclus| simulation. Agents enter the simulation
    after having been cloned from a :term:`prototype`. An agent's internal logic
    and behavior is determined by its :term:`archetype`.

  module

    A shared-object library that houses implementations of :term:`archetypes
    <archetype>` and related tools that is dynamically linked to the :term:`cyclus
    kernel` at runtime if one of its :term:`archetype` is used in a simulation.

  core developer   

    An advanced developer tasked with developing and maintaining the
    :term:`cyclus kernel` and related code.

  archetype developer

    An individual from science, academia, government, or the general public
    interested in contributing to the ecosystem of :term:`archetypes <archetype>`
    available for use with the simulator.

  user

    A member of the public, government, or academia who use |cyclus| to run
    simulations.

  nuclear fuel cycle  

    The progression of nuclear fuel through the collection of facilities and
    process stages from mining to disposal that are necessary to generate
    nuclear power as well as to prepare, manage, recycle, and store nuclear
    fuel.

  parent agent

    An :term:`agent` that manages (is in charge of) some number of child agents.

  kernel phase

    A phase during a simulation time step that is managed by the :term:`cyclus
    kernel`.

  agent phase
  
    A phase during a simulation time step in which :term:`agents <agent>` are
    allowed to query the simulation environment and perform general actions.

  tick
  
    An :term:`agent phase` that occurs before the :term:`dynamic resource
    exchange` every time step

  tock
  
    An :term:`agent phase` that occurs after the :term:`dynamic resource
    exchange` every time step

  composition

    A list of nuclides and their relative quantity.

  material

    A particular kind of resource that combines a :term:`composition` and a
    mass to be exchanged

  entity

    The kind of the archetype. Usually this is either region, institution, 
    or facility. For agents that are not specificaly one of these kinds
    still inherit from the ``Agent`` class the term archtype is used.
    Otherwise the entity is unknown.
