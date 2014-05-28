.. summary Glossary of Cyclus Fuel Cycle Simulator Terms

:version: Document v1.0 - 8/14/2012

Glossary of Cyclus Terms
========================

.. glossary::
  :sorted:

  prototype

    An instance of an :term:`agent` that is fully configured with its initial
    state and conditions, but does not act in the simulation. Agents that do act
    in the simulation are cloned (copied) from prototypes.

  agent

    An entity that acts in a |cyclus| simulation.

  context

    The queryable environment of a |cyclus| simulation.
  
  fuel cycle simulator  
  
    A computational framework for modeling nuclear fuel cycles.

  commodity  

    A name assigned to a class of resources. |cyclus| determines the flow of
    resources during a time step based on the supply of and demand for
    commodities based on :term:`agent`\ 's requests and bids for those
    commodities.

  plug-in  

    See :term:`dynamically loadable module`.

  closed development platform  

    A code repository or server that is kept private during development to 
    secure proprietary or sensitive work.

  closed development process  

    A software development workflow, usually on a closed platform, that is not 
    transparent to the public as authorization is required before development 
    access to the codebase is granted. This is used for secure proprietary or 
    sensitive work.

  cyclus core  

    The repository at github.com/cyclus/cyclus contains only the simulation 
    engine. It links dynamically to modules contributed from other code 
    repositories. The library is called libcycluscore.

  developers  

    Individuals from science, academia, government, or the general public 
    interested in contributing to the ecosystem of models available for use with 
    the simulator.

  dynamically loadable module  

    A shared object or dynamic library representing a model class in |cyclus|, 
    such as a Facility. It's functionality is linked at runtime to the 
    simulator.

  ecosystem  

    A community of developers contributing to a vibrant ecosystem of models 
    for use by cyclus users.

  end users  

    Members of the public who directly interface with the code, but perhaps only
    through its graphical interface and have only a limited need for detail.

  extensibility  

    An extensible code must be robust against changes and provide a flexibile 
    component interface for incorporating contributed modular code additions.

  maintainers   

    These individuals are an advanced group of developers tasked with 
    moderating code contributions to the core of the cyclus code.

  model  

    A conceptual representation used to represent something. In |cyclus|, a 
    computational representation of some component (Market, Facility, etc.) 
    within the nuclear fuel cycle. 

  modularity  

    Best acheived by a framework with clear component interfaces, modularity is
    an interchangeability of components such as data, classes, objects, or
    libraries within a simulation. Modularity facilitates encapsulation and
    independence of components that might be proprietary or sensitive.

  module  

    A shared object or dynamic library representing a model class in |cyclus|, 
    such as a Facility.

  nuclear fuel cycle  

    The progression of nuclear fuel through the collection of facilities and 
    process stages from mining to disposal that are necessary to generate 
    nuclear power as well as to prepare, manage, recycle, and store nuclear fuel. 

  open development platform  

    A code repository or server that is publicly viewable and downloadable, 
    though not necessarily modifiable.

  open development process  

    A software development workflow, usually on an open platform, that is 
    transparent to the public. Hallmarks include public bug reports, source code 
    access, and a  a member of the public to contribute code.

  openness  

    A general notion that code, the development process, collaboration, and the 
    research it supports be unfettered by institutional, national, or other 
    boundaries, where possible.

  viewers   

    Members of the public not directly interfacing with the code but to 
    whom the output may be made available for demonstration purposes.

  parent agent

    An agent that manages (is in charge of) some number of child agents.

  kernel phase

    A phase during a simulation time step that is managed by the simulation
    kernel engine.

  agent phase

    A phase during a simulation time step in which agents are allowed to query
    the simulation environment and perform general actions.