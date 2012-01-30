#summary Defining the capabilities to be demonstrated during Milestone-GenRepo
#labels Phase-Requirements

= Introduction =

This is a milestone for Cyclus development led by
[https://code.google.com/u/katyhuff/ Katy Huff]. It seeks to generate a generic 
geology disposal system model appropriate for fuel cycle analysis.  

*Target Date: 12/2012*

= Details =

This development activity happens in four major phases and will be 
presented as a PhD thesis from the University of Wisconsin - Madison upon
completion.

Test problems will help comprehensively define and confirm each unit of the 
module's functionality. In general, tests will include very basic calculation checks,
information passing tests, and more complex multiple subcomponent integration tests. Every 
unit of functionality within the model will be tested as an integral part of development.

When these unit tests pass, validation efforts will take place which show that the 
complete model behaves in agreement with the more detailed model on which it was based. Some 
simplification of the analytical model will occur based on both component level and system 
level abstraction.  If it does not behave as expected, sensitivity analyses, model 
abstraction, and computational development will be iterated through until the model is 
validated.

Additional information on this work can be found in a 
[http://homepages.cae.wisc.edu/~khuff/papers/prelim.pdf preliminary report].

----

= Phase I : Demonstration of Empty Infrastructure =	

This phase will generate an infrastructure for module loading and information 
passing between subcomponents. It will demonstrate the interchangeability of pieces of 
the repository and the calculation strategy that will later  facilitate radionuclide 
transport and heat transport required for capacity limited loading.

*Target Date : 12/2011*

== Phase Ia : GenericRepository Loading == 

Initial code development on the base case model has begun with creation of the 
FacilityModel subclass, GenericRepository. This phase is intended to guarantee
that the subclass meets the requirements defined by the Cyclus FacilityModel 
interface and can be dynamically loaded by the simulator.

This requires a comprehensive definition of the interface between the 
GenericRepository model and the rest of the Cyclus simulation. Fundamentally, 
this entails fully formed send and receive material functions as well as a 
function for making requests. 

A first phase in the demonstration milestone will be for the repository model 
to successfully load its subcomponent models from user input (i.e. the waste 
form, waste package, buffer, and lithology) with their corresponding defining 
parameters.  This will require a directory structure, empty component model 
classes, a loading schema for components, and an interface between the 
GenericRepository model and the Cyclus simulation.

== Phase Ib : Interfaces For Each Component Model == 

A second phase will involve implementing an information exchange paradigm
between the subcomponents. This will build upon empty component models which can 
be loaded via xml and will incoporate component loading according specific 
instructions dictating the repository design and will implement a consistent
set of interal interfaces between components.

The purpose of this information passing scheme will be to communicate sufficient 
temperature fluxes and contaminant concentrations at the boundaries of the control 
volumes for neighboring subcomponents to solve their internal transport calculations. 

When these aspects are implemented, a structure for the output database will be 
defined and appropriate bookkeeping will be implemented sufficient to communicate 
the heat and solute transport evolution within the repository.

The component model class interfaces will be defined with care.
For example, the mixed cell model will need dimensions, solid mass, 
degradation rate, etc.  Apropriate input parameters for each component will be 
defined as well. For example, the buffer will need to have a number of waste 
packages within it. 


== Phase I : Feature Requirements == 

This will build on the capabilities of MilestoneNullSimulation and 
MilestoneOneInpro by adding :
     * a GenericRepository facility class
     * which can be loaded via xml
     * according to specifications about subcomponents and models
     * and interfaces smoothly with the Cyclus simulator

This will require :
     * a directory structure for component models
     * definition of the GenericRepository interface with Cyclus
     * definition of the base input parameters for loading
     * a loading schema for GenericRepository model
	 * a component interface class  
	 * a stub (empty) component model class
	 * empty component model classes for known future models
     * loading schema for component models
     * an internal interface between components
     * input scheme for design specification
     * definition of the output data structure 
     * generation of requests based on arbitrary capacity, for now
     * a skeletal calculation timeline 

== Phase I : Tests ==

Test problems will help comprehensively define and confirm each unit of the 
demonstration functionality. For this stage, tests will include very basic information 
passing tests as well as more complex multiple subcomponent integration tests. Every 
unit of functionality within the model will be tested as an integral part of development.

=== Null Test ===

A null test of the demonstration case, for example, will release a single contaminant
radionuclide through each subcomponent sequentially. This test will pass if the bookkeeper 
properly writes to the database its (aphysically unhindered) path through each control volume. 

=== Database Writing Test ===

The database writing test will determine whether an appropriate data table for the 
repository facility is placed in the bookkeeper.

=== Subcomponent Loading Test ===

Will determine whether all subcomponents were loaded properly. 

=== Subcomponent Interaction Tests ===

These tests will determine whether the subcomponents interact properly.

----

= Phase II : Component Level Base Case Development=



*Target Date: 6/2012*

== Phase II :  ==

== Phase IIa : MixedCell Component Model == 

Analytical Implementation. 
Abstraction.

== Phase IIb : OneDimPPM Component Model == 

Analytical Implementation. 
Abstraction.

== Phase IIc : TwoDimPPM Component Model == 

Analytical Implementation. 
Abstraction.

== Phase IId : ThreeDimPPM Component Model == 

Analytical Implementation. 
Abstraction.

== Phase IIe : LumpedRadNuc Component Model == 

Analytical Implementation. 
Abstraction.

== Phase IIf : LumpedHeat Component Model == 

Analytical Implementation. 
Abstraction.

== Phase II : Feature Requirements ==

This will build on the capabilities in Phase II by adding :  
	 * Fleshed out models for a series of models of nuclide and heat transport 

== Phase II : Tests ==

Each component will be tested individually for computational accuracy.

----
= Phase III : System Level Base Case Development =

== Phase IIIa : Data Collection and Validation == 



== Phase IIIb : System Level Abstraction == 

Analytical Implementation. 
Abstraction.

== Phase III : Feature Requirements ===

This will build on the capabilities in Phase II by adding :  
      * A comprehensive notion of the effect of each module on the total simulation

== Phase II : Tests ==

All components will be tested in an integrated way for computational accuracy.



----

= Phase IV :  Extensions =

*Target Date: 11/2012*

== Phase IVa : Heat and Time Driven Coalescent Behavior ==

An anticipated extension will adapt the radionuclide transport model to 
incorporate the effects of heat and time driven coalescent behavior in clay and salt. 
This extension will focus on the porosity decrease in those media as time and heat 
drive collapse around the waste packages. Time dependent coalescence will be addressed 
fir, followed by temperature dependent coalescence.

== Phase IVb : Dual Continuum Fracture Model ==

Next, the capability to model fracture features of granite and borehole environments 
will be added to the modeling capability by adding a dual continuum fracture mode

== Phase IVc : Intrusion Scenario or Fast Pathway == 

A final potential extension may be implemented that will address the issue of modeling 
a disruption scenario with a fast advective pathway that intersects the repository. 
A fast pathway model intended to demonstrate a disrupted scenario is modeled as a single 
intersecting fracture in the clay matrix.


----

== Summary of Cyclus Readiness ==

The readiness level of cyclus capabilities with respect to the various phases 
is summarized below. Capabilities are rated from 0 (no one has given significant 
thought to this feature) to 10 (completely ready).

|| *Phase 1*                  ||  *Phase 1*   || *Phase 1*                    ||
|| *Model or Capability*      ||  *Readiness* || *Details*                    || 
|| Empty GenericRepository    ||  10          || issue63                      || 
|| Basic rng schema           ||  10          || issue64, r372                || 
|| Subcomponent rng schema    ||  10          || issue65,                     || 
|| Directory structure        ||  10          || issue66, r372                ||
|| Component Interface class  ||  10          || issue67, r394, r395, 400     ||
|| StubComponent class        ||  10          || issue68, r407                ||
|| Process Logic              ||   5          || issue69, r426                ||
|| Design spec. input schema  ||   1          || issue72, due 10/25           ||
|| Database Table             ||   1          || issue73, due 10/30           ||
|| Calculation Timeline       ||   1          || issue74, due 11/15           ||
|| Empty MixedCell Class      ||   2          || issue75, due 11/20           ||
|| Empty OneDimPPM Class      ||   2          || issue76, due 11/20           ||
|| Empty TwoDimPPM Class      ||   2          || issue77, due 11/20           ||
|| Empty ThreeDimPPM Class    ||   2          || issue78, due 11/20           ||
|| Empty LumpedRadNuc Class   ||   2          || issue79, due 11/20           ||
|| Empty LumpedHeat Class     ||   2          || issue80, due 11/20           ||
|| Empty MixedCell Tests      ||   2          || issue81, due 11/25           ||
|| Empty OneDimPPM Tests      ||   2          || issue82, due 11/25           ||
|| Empty TwoDimPPM Tests      ||   2          || issue83, due 11/25           ||
|| Empty ThreeDimPPM Tests    ||   2          || issue84, due 11/25           ||
|| Empty LumpedRadNuc Tests   ||   2          || issue85, due 11/25           ||
|| Empty LumpedHeat Tests     ||   2          || issue86, due 11/25           ||
|| *Phase 2*                  ||  *Phase 2*   || *Phase 2*                    ||
|| *Model or Capability*      ||  *Readiness* || *Details*                    ||
|| Phase 1 capabilities       ||              ||                              ||
|| MixedCell Driving Tests    ||              ||                              ||
|| MixedCell Abstraction      ||              ||                              ||
|| MixedCell Implementation   ||              ||                              ||
|| OneDimPPM Driving Tests    ||              ||                              ||
|| OneDimPPM Abstraction      ||              ||                              ||
|| OneDimPPM Implementation   ||              ||                              ||
|| TwoDimPPM Driving Tests    ||              ||                              ||
|| TwoDimPPM Abstraction      ||              ||                              ||
|| TwoDimPPM Implementation   ||              ||                              ||
|| ThreeDimPPM Driving Tests  ||              ||                              ||
|| ThreeDimPPM Abstraction    ||              ||                              ||
|| ThreeDimPPM Implementation ||              ||                              ||
|| LumpedRadNuc Driving Tests ||              ||                              ||
|| LumpedRadNuc Abstraction   ||              ||                              ||
|| LumpedRadNuc Implementation||              ||                              ||
|| LumpedHeat Driving Tests   ||              ||                              ||
|| LumpedHeat Abstraction     ||              ||                              ||
|| LumpedHeat Implementation  ||              ||                              ||
||                            ||              ||                              ||
||                            ||              ||                              ||
||                            ||              ||                              ||
|| *Phase 3*                  ||  *Phase 3*   || *Phase 3*                    ||
|| *Model or Capability*      ||  *Readiness* || *Details*                    || 
|| Phase 2 capabilities       ||              ||                              ||
||                            ||              ||                              ||
||                            ||              ||                              ||
||                            ||              ||                              ||
||                            ||              ||                              ||
||                            ||              ||                              ||
||                            ||              ||                              ||
||                            ||              ||                              ||
||                            ||              ||                              ||
|| *Phase 4*                  ||  *Phase 4*   || *Phase 4*                    ||
|| *Model or Capability*      ||  *Readiness* || *Details*                    || 
|| Phase 3 capabilities       ||              ||                              ||
||                            ||              ||                              ||
||                            ||              ||                              ||
||                            ||              ||                              ||
||                            ||              ||                              ||
||                            ||              ||                              ||
||                            ||              ||                              ||
||                            ||              ||                              ||
||                            ||              ||                              ||
 
