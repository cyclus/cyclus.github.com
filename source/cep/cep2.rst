CEP 2 - Separation of Concerns in the |cyclus| Ecosystem
********************************************************

:CEP: 2
:Title: Separation of Concerns in the |cyclus| Ecosystem, or Where Do I Put My Code?
:Last-Modified: 2017-09-01
:Author: Anthony Scopatz, Matthew Gidden
:Status: Accepted
:Type: Process
:Created: 2013-08-05

Abstract
========
The purpose of this CEP is to clearly delineate the purpose -- technical and
cultural -- of the various projects which make up the |cyclus| ecosystem.
Projects, for purposes here, are unique entities which have independent lifetimes
and central concerns. Many projects may try to tackle the same concern but no
single project may tackle more than one concern.  Concerns, like projects, may
be dependent upon one another.

The central concerns in the |cyclus| ecosystem are
**dynamic resource exchange simulation** (DRES),  **domain models** (DM),
**analysis & visualization** (A&V), and **simulation orchestration** (ORC).

Concerns
========
A rich fuel cycle simulator solution has four primary organizational pieces that
must have robust implementations.  These pieces are a mechanism for solving for
resource exchange in the fuel cycle, relevant and interesting  models for the
domains of interest (physics, economics, policy, etc.), a
programmatic method for parsing, slicing, aggregating, and displaying
simulation results, and a mechanism for executing and collecting many simulations.
As an effectively designed suite of software, these concerns
should be completely separated from one another
and interact only through well-defined interfaces [1]_.  This
independence allows both users and developers to reason about each concern
without needing to consider upstream effects.  Coupled with a stable interface
or API, this independence also allows users and developers to ignore downstream
effects in most cases.

The domain model concern is dependent only on the resource exchange concern.
However, the analysis & visualization concern is directly dependent on both the
resource exchange and the domain model concerns.  These relationships may be seen
in Figure 1.

.. figure:: cep-0002-1.svg
    :align: center

    **Figure 1:** Dependencies Between Concerns

.. blockdiag code below

    http://interactive.blockdiag.com/?compression=deflate&src=eJxlkM9qwzAMxu95CtHDbnuC0MFgO47BBr0so7i21ghsKfjPSFv27jOJkyyZb5J-nz_pAwC4QQXDM_ilko3Hs5fUHbVY8bAHFsZ6Q4RWdZhnGWSD5iR9XRXEY8Bew4dVJ7T73dOFlSMNbxgkeY0NP_e6VXxGeCeXrIokvPucDcQ5MYtanCKGFzFow0Iptt90nalHVvYSKMBdwwcKSVm6bv4N5MQvWy3WDb963WKIviiqteL-oVy08c79kajXd-f-SMyBDGnCrVQA4gk5Dm45wU58tqZYz_NJPtVjJFP9889uPS8B_lljVP0CxFWTeA

    {
      default_group_color = none;
      default_shape = roundedbox;

      resexc [label="Dynamic Resource\nExchange Simulation"];
      dommod [label="Domain Models"];
      anlviz [label="Analysis &\nVisualization"];
      simorc [label="Simulation\nOrchestration"]

      simorc -> resexc;
      anlviz -> simorc;
      resexc -> anlviz;

      group {
        orientation = portrait;
        anlviz;
        dommod;
      }
      resexc -> dommod;
      dommod -> anlviz;
    }


Dynamic Resource Exchange Simulation
------------------------------------
The dynamic resource exchange simulation concern is the basis for all other fuel
cycle concerns.  This dictates and manages how resources flow through a system and
the time paradigm used to model the system.  A number of possible representations of
system elements exist.  Two main options stand out: 1) *individual-based* models in
which every actor receives its own instance, and 2) *fleet-based* models where
like actors are grouped together and act identically.  Resource exchange may be
implemented using a strict *agent-based* modeling [2]_ approach or strict
*system dynamics* methods [3]_.  However, these two paradigms are not restrictive
and implementations may pull from a variety of algorithms as needed.

Furthermore, the choice of how to represent time evolution may fall into one
of the following categories:

* **Equilibrium** - initial transients are ignored or discarded in favor of a steady
  state solution.
* **Quasi-static** - initial transients are computed but natural time (sec, min, etc)
  are replaced with an easier to compute number of passes through a given
  actor.
* **Discrete time** - natural time is implemented but discretized to some minimum
  and constant dt.
* **Adaptive time** - natural time is implemented and discretized, but the value of
  dt may change from time step to time step, allowing for finer resolution only
  when needed.
* **Continuous time** - natural time is implemented as a continuous variable.

It is important to note that this concern is a solely mathematical endeavor and
should not implement any domain-specific calculations. However, the
implementation may be *domain-aware* in that it may know about certain sub-type
specializations.  For example, materials and U.S. Dollars are both sub-types of
resources. Still, the dynamic resource exchange simulation concern is not
allowed to discriminate between any of these specializations nor perform
domain-specific computations (such as transmuting a material or pricing a
derivative).

This concern is responsible for housing general archetypes that allow for
general, dynamic simulation of supply chain networks in a resource-neutral
manner. Supply chain network models require, at minimum, three types of entities
(i.e., nodes) :cite:`bazaraa2011linear`:

* Sources (supply nodes)
* Storage (transshipment nodes)
* Sinks (demand nodes)

In addition to enabling such basic simulations, the dynamic resource exchange
simulation concern is also responsible for all optimizations of the fuel cycle.
This includes optimizing resource exchange between multiple actors as well as
finding the initial conditions which optimize a value function subject to some
constraints.

Domain Models
-------------
The purpose of the domain models concern is to provide interesting, accurate, and
relevant models of various aspects of the fuel cycle.  These aspects are often the
technical meat of the fuel cycle analysis.  However, they may be mathematically
separated from resource exchange.  This concern ensures that those mathematical
separations remain distinct in the software.  There are a number of domain models
which are pertinent to fuel cycle calculations:

* Physics
* Chemistry
* Health Physics
* Economics
* Public Policy
* and more!

The implementation of specific domain computations should rely on the system dynamics
for all systematic flow and timing needs.  The implementation of the domain
calculations should be completely separated from the system dynamics concern.
This establishes a clean interface between these two concerns.

For example, take an enrichment facility which is asked to compute product and tails
enrichments.  In the initialization of this calculation, the dynamic resource
exchange simulation concern hands off the simulation time (t), the time delta (dt),
and the initial feed material to the underlying physics model.  The physics model
then computes the desired outputs without further interaction with the resource
exchange model.  Lastly, the outputs are returned to the DRES model.

Analysis & Visualization
------------------------
The purpose of the analysis & visualization concern is to supply aggregation and
introspection into the simulation outputs.  The analysis may take place at both
high and low levels, common aggregations should be easy to perform, and static
and interactive visualization should be provided as a mechanism for easy human
consumption.  All post-processing of simulation data falls under this concern.

The analysis & visualization concern is dependent directly on both the dynamic
resource exchange simulation concern and the domain models concern.  This is because
meaningful inspection of simulation data requires parameters from both concerns.
Note that these dependencies are independent.  The analysis & visualization tools
must handle the case where only DRES models are used.  However, if domain models
are used and the analysis & visualization is aware of these domain models,
all DRES parameters are guaranteed to also be present.

Simulation Orchestration
------------------------
Simulation campaigns often involve executing multiple instances of the DRE and
associated analysis and visualization. This may be with the purpose of,

* performing a sensitivity study,
* running a parameter sweep,
* sampling from a large option space, or
* creating a training set for machine learning models.

This execution and analysis is either managed manually or automatically, but it
is always managed.  Running, analyzing, visualizing, and generating many |cyclus|
input files is termed here "orchestration." This includes provisioning compute
resources where these tasks are executed. Data management also falls under the
purview of simulation orchestration.

Simulation orchestration provides a feedback loop for the |cyclus| ecosystem.
It both drives the DRE simulator and incorporates the results of previous
simulations.


The |Cyclus| Ecosystem
======================
While many fuel cycle simulators may choose to implement all of the above concerns
in a single project, each concern in the |cyclus| ecosystem is implemented in
its own project.  Many projects may satisfy the needs of a concern.  However, no
project may try to address multiple concerns. This provides a clear guideline
for which projects should accept which kinds of code.

If for some reason ambiguities exist, first attempt to refactor the code at hand
with these concerns in mind.  If this fails because of a fundamental ambiguity
or mixing of multiple concerns, place the code with the most dependent concern.
For example, if it is not clear if a class belongs with domain models or with the
resource exchange put it with the domain models to be safe.

The |cyclus| development team currently supports projects for these concerns:

* `Cyclus`_ - Dynamic Resource Exchange Simulation (individual actors, discrete
  time, canonical supply chain entities)
* `Cycamore`_ - Domain Models
* `Cymetric`_ -  Analysis & Visualization
* `Cyclist`_ -  Analysis & Visualization (historical)
* `Rickshaw`_ - Simulation orchestration

The dependency graph for these projects is similar to the graph of the concerns.
Figure 2 displays this graph along with other projects which implement these concerns.

.. figure:: cep-0002-2.svg
    :align: center

    **Figure 2:** Dependencies Between Projects is |Cyclus| Ecosystem.

.. blockdiag code below

    http://interactive.blockdiag.com/?compression=deflate&src=eJyFUstqwzAQvOcrFgV6M_QYY1JI1fZQKIUUeiklyNLGFpW1QZLbJCX_XsV52HESqtNKM7MzWhYA4HcAzVE4F7UJs8JRvZhJMuRgDJYsZj2GL8UCIxaJVqHKaZkN9pRGDA49LuWxMwA5jTaIoMlG3YJccEKH7IgbkaMZsyl6qp1EeFzKUtgCWUvhK2lq3943p5aKqopUx3Lf8oEqoS28kELjO-0O_2PDp1s-GaUd6L-wMYmoyCEkSawVum3B7p0uypAYHZA1D3yVkyvY1cTCmm-9Pk88scKsvPZwA-_a18LodZOlH37MhpyPUs7PhvT8tosmtbzqTk6eW786WaKP373k1wwrzeMOqA401fIr7sPPBaNdGEjujhPLLiG7wC20ndoJ9DEnE9fss6PWcsvoex_urbqn3fwBgOfNqA

    {
      default_group_color = none;
      default_shape = roundedbox;

      group resexc {
        orientation = portrait;
        label="Resource Exchange";
        Cyclus;
        }

      group dommod {
        label="Domain Models";
        color = "#F0CA89";
        orientation = portrait;
        Cycamore -- Cyder -- "Bright-lite" -- "Cyborg";
        }

      group anlviz {
        label="Analysis & Visualization";
        color="#CC89CC";
        CyclusJS -- Cycic;
        }

      group orc {
        label="Orchestration";
        color = "#9befad";
        Rickshaw;
        }

      Cyclus -> Cycamore;
      Cyclus -> CyclusJS ;
      Cyborg -> CyclusJS [folded];
      Cycic -> Rickshaw;
      Rickshaw -> Cyclus [folded];
    }

Toolkits
--------
In any real system, there is glue code which holds the projects together in a
cohesive manner.  A collection of such utilities is called a *toolkit*.  While
toolkits are critically important to well functioning software their components
are united only in that "should be useful."  There need not be underlying concept
tying them together.  For this reason, toolkits are not a top-level concern on
par with resource exchange, domain models, and analysis & visualization.

Instead, each project may have its own toolkit which contains utilities that
corresponds most closely with its concern.  The toolkit provides a layer on top of
the concern implementation.  Thus the toolkit will be aware of other parts of the
project but the concern implementation should not call into elements from the toolkit.

For example, resources are part of the primary concern of |cyclus|.  Thus
a ResourceBuffer class would be part of the |cyclus| toolkit.  This is because
resource exchange can be implemented without a ResourceBuffer but such a class
is useful to provide to domain model developers.  Furthermore, the buffer
applies to all resources is not specific to any domain. Thus this class should be
included next to the resource exchange implementation.

Summary
=======
Many other ecosystems and projects model the fuel cycle and make their own choices
about how to separate -- or not -- the concerns of resource exchange, domain models,
and analysis and visualization.  The |cyclus| ecosystem places all concerns in
separate projects.  This allows a high degree of modularity between software and
developers.  Such an ecosystem enables experts to contribute their specific
knowledge base in a way that is independent from other parts of the ecosystem
while simultaneously integrating well with the rest of the ecosystem.  Finally,
this document provides instructions on where to implement tasks based on the task's
primary concern.

Document History
================
This document is released under the CC-BY 3.0 license.

References and Footnotes
========================

.. [1] http://en.wikipedia.org/wiki/Separation_of_concerns
.. [2] http://en.wikipedia.org/wiki/Agent-based_model
.. [3] http://en.wikipedia.org/wiki/System_dynamics

.. _Cyclus: https://github.com/cyclus/cyclus
.. _Cycamore: https://github.com/cyclus/cycamore
.. _Cymetric: https://github.com/cyclus/cymetric
.. _Cyclist: https://github.com/cyclus/cyclist2
.. _Rickshaw: https://github.com/ergs/rickshaw

.. bibliography:: cep-0002-1.bib
   :cited:
