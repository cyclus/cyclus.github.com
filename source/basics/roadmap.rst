.. summary The Cyclus Fuel Cycle Simulator Roadmap

:version: Document v1.1 - 8/21/2012

The *Cyclus* Fuel Cycle Simulator Roadmap
=================================================

It is expected that external development contributing to the expansion
of the Fuel Cycle Simulator will grow in creative, unpredictable ways
in answer to the needs of the developers.  Moreover, particular use
cases and specific user interests are likely to drive the need for new
capability.

To help direct and inspire development in support of current and anticipated 
use cases, the current *Cyclus* development team has identified areas of 
essential research areas as well as potential research ideas. 

Research Areas
--------------

A number of research areas related to *Cyclus* have already been
identified, but others are certainly possible:

  #. *Cyclus* core infrastructure development
  #. Market model development
  #. Region model development and deployment scenarios
  #. Reactor model development    
  #. Separations model development
  #. Geologic repository & waste form modeling 
  #. Graphical interfaces for input and visualization
  #. Social science to determine important metrics and measures
  #. Optimization and sensitivity infrastructure  
  #. Transportation
  #. Non-proliferation analysis 
 
Active Projects/Contributors
----------------------------

* U. Wisconsin-Madison:

   * `Cyclus <http://github.com/cyclus/cyclus>`_ core infrastructure
   * `Cycamore <http://github.com/cyclus/cycamore>`_ base module package
   * `Cyder <http://github.com/katyhuff/cyder>`_ geologic repository modeling
   * `Cyclopts <http://github.com/cyclus/cyclopts>`_ optimization interface library
* U. Texas at Austin

   * `Cycic <http://github.com/cyclus/cycic>`_ input control
* U. Utah

   * `Cyclist <http://github.com/cyclus/cyclist>`_ output visualization


Potential Research Ideas 
--------------------------

In support of fuel cycle options analysis, modules representing specific 
technologies and fuel cycles will contribute significantly to the usefulness of 
the cyclus :doc:`ecosystem <ecosystem>`. Some specific concepts that have been identified as 
potentially versatile models for anticipated fuel cycle modeling goals include a
number of creative Market, Region, Institution, and Facility Models. 
 
Market Model Ideas
~~~~~~~~~~~~~~~~~~~

Potential **Markets** that can be expected to be useful in some anticipated 
use cases include contract markets, markets encapsulating fundamental commodity 
market theories, markets employing political affinity to make resolution 
decisions, markets supporting multipass material routing, and markets that
enable shadow fuel cycles for nuclear proliferation modeling. 

Region Model Ideas
~~~~~~~~~~~~~~~~~~~~~

Potential **Regions** include those supporting political affinity models of 
international trade behavior, tax structures, creative growth patterns, political
instabilities capable of causing technology interruption, and international fuel 
takeback agreeemnts.
 
Institution Model Ideas
~~~~~~~~~~~~~~~~~~~~~~~~

Potentially compelling **Institutions** might support capacity dispatch logistics 
similar to public utility commision behavior or define nuclear growth in the 
presence of the growth of nonnuclear energy market share.
   
Facility Model Ideas
~~~~~~~~~~~~~~~~~~~~~~

Myriad potential **Facilities** would support the broad :doc:`ecosystem <ecosystem>` 
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
  
Full Simulation Scale Contributions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Additional simulation-level features envisioned to become useful in the near 
term for optimization, economic, and strategic use cases include :

   - external multi-variable optimization demonstration
   - objective functions for assessing overall simulation performance (e.g. economic)
   - investigation of impact of varying module fidelity
   - implementations of relevant simulation use cases, benchmarking cases, etc.

