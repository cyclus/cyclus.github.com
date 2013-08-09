CEP 2 - Separation of Concerns in the *Cyclus* Ecosystem
********************************************************

:CEP: 2
:Title: Separation of Concerns in the *Cyclus* Ecosystem, or Where Do I Put My Code?
:Last-Modified: 2013-08-05
:Author: Anthony Scopatz
:Status: Draft
:Type: Process
:Created: 2013-08-05

Abstract
========
The purpose of this CEP is to clearly deliniate the purpose -- technical and 
cultural -- of the various projects which make up the *Cyclus* ecosystem.  
Projects, for purposes here, are unique entities which have independent lifetimes
and central concerns. Many projects may try to tackle the same concern but no 
single project may tackle more than one concern.  Concerns, like projects, may 
be dependent upon one another.

The central concerns in the *Cyclus* ecosystem are **system dynamics**, 
**domain models**, and **analysis & visulaization**.

Concerns
========
A rich fuel cycle simulator solution has three primary organizational pieces that 
must have robust implmentations.  These pieces are a mechanism for solving for 
resource exchange in the fuel cycle (system dynamics), relevant and interesting 
models for the domain of interest (physics, economics, policy, etc.), and a 
programatic method for parsing, slicing, aggregatiting, and displaying 
simulation results (analysis & visulaization). As an effectively designed suite of 
software, these concerns should be completely separated from one another [1]_.  This 
independence allows both users and developers to reason about each concern 
without needing to consider upstream effects.  Coupled with a stable interface 
or API, this independence also allows users and developers to ignore downstrem 
effects in most cases.

The domain model concern is dependent only on the system dynamics' concern.  
However, the analysis & visualization concern is directly dependent on both the 
system dynamics and the domain model concerns.  These relationships may be seen 
in Figure 1.

.. figure:: cep-0002-1.svg
    :align: center

    **Figure 1:** Dependencies Between Concerns

.. blockdiag code below

    http://interactive.blockdiag.com/?compression=deflate&src=eJxNjsEKwjAMQO_9iuDBm18wFIRdPQleVEZmqwbaZLSd2A3_3W7O6S3kPZLXgwLQ5oqtjdXNS9tUF7HiYQ0sbIo_Gu7YmLzPEmuja3kWKuOQgk4MR4u1sevFPoVoHJSJ0dElLM7jCXFO9OyU4pAYdqKNnQxk-6BuNraMNgUKsDzxgUKLljqMJDzYWR9Loc8TgHgyHEea6xrx0SPFEU1tq81UMHx6qV9QBp_HhfqXvzv1Um_g616r

    {
      default_group_color = none;
      default_shape = roundedbox;

      sysdyn [label="System Dynamics"];
      dommod [label="Domain Models"];
      anlviz [label="Analysis &\nVisualization"];

      group {
        orientation = portrait
        sysdyn -> dommod;
      }

      dommod -> anlviz;
      sysdyn -> anlviz;

    }

System Dynamics
---------------
The system dynamics concern is the basis for all other fuel cycle concerns.  
This dictates and manages how resources flow through a system and the time 
paradigm used to model the system.  A number of possible representations of 
system elements exist.  Two main options stand out, 1) *agent-based* models in 
which every actor recieves its own instance and 2) *fleet-based* models where
like actors are grouped together and assued to act identically.  Furtherore, 
the choice of how to represent time evolution may also fall into one of the 
following categories:

* **Equillibrium** - initial transients are ignored or discarded in favor of a steady 
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

The system dynamics concern is a solely mathematical endeavour and should not 
implemenent any domain-specific calculations. However, the system dynamics 
implementation may be *domain-aware* in that it may know about certain sub-type
specializations.  For example, materials and U.S. Dollars are both sub-types of 
resources.  Still, the systemic dynamics concern is not allowed to discriminate 
between any of these specializations nor perform domain-specific computations
(such as transmuting a metrial or pricing a derivative).

The system dynamics concern is also responsible for all optimizations of the 
fuel cycle.  This includes optimizing resource exchange between multiple actors
as well as finding the initial conditions which optimize a value function 
subject to some constraints.  

Domain Models
-------------
There are a number of domain models which are pertinant to fuel cycle calculations:

* Physics
* Chemistry
* Health Physics
* Economics
* Public Policy
* and more!

The implementation of specific domain computations should rely on the system dynamics
for all systematic flow and timing needs.  However, the implementation of the actual 
domain calculation should be completely separated from the system dynamics concern.
This establishes a clean interface between these concerns.

For exmaple, take an enrichment facility which is asked to compute product and tails 
enrichments.  In the initialization of this calculation, the system dynamics concern
hands off the simulation time (t), the time delta (dt), and the initial feed material 
to the underlying physics model.  The physics model then computes the desired outputs
without further interaction with the system dynamics model.  Lastly, the outputs
are returned to the system dynamics model.

Analysis & Visualization
------------------------

The Cyclus Ecosystem
====================

Other Ecosystems
================


Document History
================
This document is released under the CC-BY 3.0 license.

References and Footnotes
========================

.. [1] http://en.wikipedia.org/wiki/Separation_of_concerns
