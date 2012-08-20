.. summary The Cyclus Fuel Cycle Simulator Roadmap

:version: Document v1.0 - 8/20/2012

The *Cyclus* Fuel Cycle Simulator Roadmap
=================================================

It is expected that external development contributing to the expansion of 
the Fuel Cycle Simulator will grow in creative, unpredictable ways in answer to 
the needs of the developers.

To help direct and inspire development in support of current and anticipated 
use cases, the current *Cyclus* development team has identified areas of 
essential research areas as well as potential research ideas. 

Research Areas
--------------

A number of research areas related to *Cyclus*  have already been identified.
In some cases, there is a lead institution already engaged in such research, or
one or more institutions who have expressed interest:

  #. *Cyclus* core infrastructure development    lead: UW-Madison

  #. Market model development    interest: UW-Madison, UT-Austin

  #. Region model development and deployment scenarios    interest: Idaho

  #. Reactor model development    interest: UT-Austin

  #. Separations model development

  #. Geologic repository & waste form modeling    lead: UW-Madison (see `Cyder <https://github.com/katyhuff/cyder>`_)

  #. Graphical interfaces for input and visualization    interest: Utah

  #. Social science to determine important metrics and measures    interest: UW-Madison

  #. Optimization and sensitivity infrastructure    interest: NC State

  #. Transportation

  #. Non-proliferation analysis    interest: UW
 


Potential Research Ideas 
--------------------------

In support of fuel cycle options analysis, modules representing specific 
technologies and fuel cycles will contribute significantly to the usefulness of 
the cyclus :doc:`ecosystem <ecosystem>`. Some specific concepts that have been identified as 
potentially versatile models for anticipated fuel cycle modeling goals include a
number of creative Market, Region, Institution, and Facility Models. 
 
Market Model Ideas
~~~~~~~~~~~~~~~~~~~

Potential *Markets* that can be expected to be useful in some anticipated 
use cases include contract markets, markets encapsulating fundamental commodity 
market theories, markets employing political affinity to make resolution 
decisions, markets supporting multipass material routing, and markets that
enable shadow fuel cycles for nuclear proliferation modeling. 

Region Model Ideas
~~~~~~~~~~~~~~~~~~~~~

Potential *Regions* include those supporting political affinity models of 
international trade behavior, tax structures, creative growth patterns, political
instabilities capable of causing technology interruption, and international fuel 
takeback agreeemnts.
 
Instituion Model Ideas
~~~~~~~~~~~~~~~~~~~~~~

Potentially compelling *Institutions* might support capacity dispatch logistics 
similar to public utility commision behavior or define nuclear growth in the 
presence of the growth of nonnuclear energy market share.
   

Myriad potential *Facilities* would support the broad :doc:`ecosystem <ecosystem>` 
of models useful for fuel cycle options analysis. Facility models are the 
technical building blocks of Cyclus simulations, and are expected to provide the 
modular representation of essential nuclear, chemical, and industrial processes 
in fuel cycles of all kinds. Potential fuel cycle technologies of import include

  - advanced reactors
  - separations stoichiometry process modules
  - transportation modules 
  - uranium resource models
  - nefarious shadow material diversion processes
  - random facility disruption
  
Potential Simulation Building Blocks
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Additional simulation-level features envisioned to become useful in the near 
term for optimization, economic, and strategic use cases include :

   - external multi-variable optimization demonstration
   - objective functions for assessing overall simulation performance (e.g. economic)
   - demonstration of impact of varying module fidelity
   - implementations of relevant simultion use cases, benchmarking cases, etc.

