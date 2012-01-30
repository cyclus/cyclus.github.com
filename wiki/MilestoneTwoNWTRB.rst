#summary Defining the capabilities to be demonstrated during Milestone-NWTRB
#labels Phase-Requirements

= Introduction =

This is an early milestone for Cyclus development based on a set of Nuclear 
Waste Technical Review Board scenario definitions and desired output measures.

*Target Date: 5/16/2011*

= Details =

This benchmarking and demonstration activity happens in four phases and will be 
presented at the NWTRB systems analysis workshop in June 2011. Details of 
scenario descriptions and assumptions may be found in the file : 
	* !Scenarios_Final_04April2011.PDF

----

= Phase I : Characteristics of Spent Fuel Inventory as of December 2009 =

*Target Date : 4/11/2011*

== Assumptions ==

Details of power plant characteristics and spent fuel inventories as of 
December 2009 are provided internally to workshop participants in:
	 * !ExistingPlantData_06March2011.pdf

== Phase I : Output Measures == 

	 # Total mass of spent fuel in Jan 2010
	 # Total mass of ( 234, 235, 236, and 238 ) U in SNF in Jan 2010 Total mass 
	 # of ( 238, 239, and 240 ) Pu in SNF in Jan 2010
	 # Mass of FPs and MAs(Np, Am, Cm, Bk, Cf, Es, Fm) in SNF in Jan 2010

== Phase I : Cyclus Simulation Description ==

This will be a 1 month simulation, finding the spent fuel streams in January 
2010 resulting from the state of domestic spent fuel streams in December 2009.  
Reactors will be implemented as recipe based models. Storage facilities associated
with each reactor will contain current amounts of spent fuel. The only commodities will 
be fresh and spent BWR and PWR assemblies.  

== Phase I : Feature Requirements == 

This will build on the capabilities of MilestoneNullSimulation and 
MilestoneOneInpro by adding:
	 * a facility catalog of facility models representing the domestic reactor 
	 fleet as of December 2009.
	 * a material catalog of fresh and spent BWR and PWR assemblies
	 * an in/out database system capable of keeping sufficient data about 
	 transactions to give output measures.
	 * a bookkeeping system that records material changes and transactions into 
	 the in/out database
	 * a storage facility capable of being instantiated with an initial quantity 
	 of material
	 * Recipes : PWR I and BWR I 
----

= Phase II : Spent Fuel Discharged Through 2100 =
*Target Date : 4/18/2011*

== Phase II : Assumptions == 

Plants operate beginning on January 1 of the year of commercial operation and
all plants operatre for 60 years.

Deployment is driven by maintenance of current fleet 100.3GWe .


== Phase II : Output Measures == 

	 # BWR assemblies discharged
	 # PWR assemblies discharged
	 # Total mass of ( 234, 235, 236, and 238 ) U in SNF during simulation 
	 # Total mass of ( 238, 239, and 240 ) Pu in SNF during simulation
	 # Mass of FPs and MAs(Np, Am, Cm, Bk, Cf, Es, Fm) in SNF during simulation

== Phase II : Cyclus Simulation Description ==

This will be a 1081 month (90 years + 1 month) simulation. The start time is 
December 2009, the end time is January 1, 2100. Fresh and spent PWR and BWR 
assemblies are the only four commodities. While there is no official 
repository, a sink facility (or one for each reactor) should represent spent 
fuel storage on site.  

== Phase II : Feature Requirements ==


This will build on the capabilities in Phase I by adding :  
	* A facility model with finite lifetime (for 60 year shutdown). 
	* A region or institution capable of maintaining fleet power capacity as 
	   reactors shut down. (!DemandDrivenDeployRegion ?)
	* Institutions must report the power capacity of all reactors they own
	* Reactors must record a timeline of their own power production 
	* Recipes : PWR II  and BWR II

----

= Phase III : Impact of Repository Disposal =

*Target Date: 4/25/2011*

== Phase III : Assumptions ==

*Repository* begins in 2040.  Repository takes >10 year old fuel, and oldest 
fuel first.  Two scenarios:
	 * 1,500 MT/year repository capacity
	 * 3,000 MT/year repository capacity



== Phase III : Output Measures == 

	 # BWR assemblies discharged
	 # PWR assemblies discharged
	 # natural uranium demand (for use in phase IV)

== Phase III : Cyclus Simulation Description ==

This will be a 1081 month (90 years + 1 month) simulation. The start time is 
December 2009, the end time is January 1, 2100. Fresh and spent PWR and BWR 
assemblies are the only four commodities. Recipe-based reactor facilities and 
capacity-limited sink facility to represent the repository. 

== Phase III : Feature Requirements ==

This will build on the capabilities in Phase II by adding :  
	 * Tracking of assembly age.
	 * A market capable of handling competing spent fuel and new uranium as well
	 as material ages

----

= Phase IV : Impact of Reprocessing and Repository Disposal =

*Target Date: 5/16/2011*

== Phase IV : Assumptions == 

This is a steady state scenario. The reprocessing capacity is enough to consume 
all used fuel. 

Reprocessing takes >2 year old fuel, youngest first. Only single pass PWR fuel 
will be reprocessed. The rest is stored immediately. PWR MOX is fabricated.  
Re-enrichment is also undertaken to make PWR UOX.  

There is a steady state scenario:
     * All plants are steady state, no new or replacement plants starting up
	 * Separating/Re-Enriching facility is at full capacity (sufficient?)
	 * MOX fuel fab and reUOX have sufficient capacity to recycle all separated 
	 pu and u, respectively.

There are six complexified scenarios :
     # Separating/Re-Enriching capacity of 1,500MT/yr and all fuel 5 yrs old
     # Separating/Re-Enriching capacity of 1,500MT/yr and all fuel 25 yrs old
     # Separating/Re-Enriching capacity of 1,500MT/yr and all fuel 50 yrs old
     # Separating/Re-Enriching capacity of 1,300MT/yr and all fuel 5 yrs old
     # Separating/Re-Enriching capacity of 1,300MT/yr and all fuel 25 yrs old
     # Separating/Re-Enriching capacity of 1,300MT/yr and all fuel 50 yrs old


== Phase IV : Output Measures == 

	 # Mass of PWR SNF Mass of BWR SNF Mass of FPs and MAs(Np, Am, Cm, Bk, Cf, 
	 Es, Fm) in SNF in Jan 2010
	 # Mass of PWR SNF reprocessed Mass of BWR SNF reprocessed
	 # Number, mass, and composition of assemblies fabricated
		* new uranium PWR assemblies
		* new uranium BWR assemblies
		* recycled uranium PWR assemblies
		* PWR MOX assemblies
	 # Mass of uranium tails generated
		* new
		* recycled


== Phase IV : Cyclus Simulation Description ==

This will be a 1081 month (90 years + 1 month) simulation. The start time is 
December 2009, the end time is January 1, 2100. Fresh and spent PWR and BWR 
assemblies are the only four commodities. Two infinite source facilities, 
recipe-based reactor facilities and capacity limited sink facility must be 
implemented. Markets capable of dealing with reprocessed fuel streams, 
separations, MOX fabrication, re-enrichment, and enrichment facility models 
must also be used. 

== Phase IV : Feature Requirements ==

This will build on the capabilities in Phase III by adding :  


	 * Separations Facility
	 * Reprocessing Facility
	 * Appropriate markets for reprocessed fuel streams
	 * re-enrichment facility. Same as enrichment facility?
	 

----

= Phase V : Impact of Reprocessing and Repository Disposal =

*Target Date: 5/18/2011*

== Phase V : Assumptions == 

*Reprocessing* begins in 2030. Two scenarios : 
	 * 1,500 MT/year repository capacity
	 * 3,000 MT/year repository capacity

Reprocessing takes >5 year old fuel, youngest first. Only single pass PWR fuel 
will be reprocessed and all of it will be reprocessed eventually. The rest is 
stored immediately. PWR MOX is fabricated.  Re-enrichment is also undertaken 
to make PWR UOX.  

*Repository* begins in 2040 at 1,500 MT/year repository capacity. Repository 
accepts only >10 year old fuel, and oldest fuel first.


== Phase V : Output Measures == 

	 # Total mass of PWR spent fuel in repository
	 # Total mass of BWR spent fuel in repository
	 # Mass of FPs and MAs(Np, Am, Cm, Bk, Cf, Es, Fm) in SNF 
	 # Mass of PWR SNF reprocessed Mass of BWR SNF reprocessed
     # Percent reduction in total natural U demand
	 # Number, mass, and composition of assemblies fabricated
		* new uranium PWR assemblies
		* new uranium BWR assemblies
		* recycled uranium PWR assemblies
		* PWR MOX assemblies
	 # Mass of uranium tails generated
		* new
		* recycled


== Phase V : Cyclus Simulation Description ==

This will be a 1081 month (90 years + 1 month) simulation. The start time is 
December 2009, the end time is January 1, 2100. Fresh and spent PWR and BWR 
assemblies are the only four commodities. Two infinite source facilities, 
recipe-based reactor facilities and capacity limited sink facility must be 
implemented. Markets capable of dealing with reprocessed fuel streams, separations, MOX fabrication, 
re-enrichment, and enrichment facility models must also be used. 

== Phase V : Feature Requirements ==

This will build on the capabilities in Phase IV by adding :  

	 * Appropriate markets for competing fresh and reprocessed fuel streams


== Summary of Cyclus Readiness ==

The readiness level of cyclus capabilities with respect to the various phases 
is summarized below. Capabilities are rated from 0 (no one has given significant thought to this feature) to 10 (completely ready).

|| *Phase 1*               || *Phase 1*   || *Phase 1*  ||
|| *Model or Capability*   || *Readiness* || *Details* || 
|| GreedyMarket            || 10          || source material being 'infinite,' greedy market is an appropriate choice. || 
|| NullRegion              || 10          || This simulation is just for a month, so a deployregion isn't necessary, but would be superior.. || 
|| FixedInst               || 10          || the fixed inst is ready, perhaps until we go with the deployregion || 
|| SourceFacility          || 10          || The fuel fabrication facility is a simple source. || 
|| ReceipeReactor          || 8           || The recipe reactor needs a notion of its lifetime and capacity. ||
|| SinkFacility            || 10          || The material is actually stored at the reactors, but reported as a single amount. ||
|| Facility Catalog        || 10          || Roy is in charge. This includes all facilities to be included in the simulation.||
|| Facility lifetimes      || 0           || This should be a default behavior for all facilities. Not yet implemented. || 
|| Recipes                 || 3           || Roy is working on this via scale/origen. || 
|| Database                || 8           || Transactions and Model tables are working. A material history table is left. || 
|| PWR I                   ||             || PWR assemblies have initial uranium mass of 0.43 MTU, initial 235U enrichment of 3.43% and a burn-up of 39 GWd/MT. ||
|| BWR I                   ||             || BWR assemblies have initial uranium mass of 0.18 MTU, initial 235U enrichment of 2.39% and a burn-up of 32 GWd/MT. ||
|| *Phase 2*               || *Phase 2*   || *Phase 2*  ||
|| *Model or Capability*   || *Readiness* || *Details* || 
|| Phase 1 capabilities    ||             ||     ||
|| GreedyMarket            || 10          || When the source materal ceases to be infinite, this may no be the best choice || 
|| DeployRegion            || 9           || Perhaps not on critical path. May need to use capacity info to maintain capacity of 100.3 GWe|| 
|| SourceFacility          || 10          || The fuel fabrication facility is a simple source. || 
|| StorageFacility (s)     || 9           || Deifining this according to its relationship with reactors may be tricky, but is perhaps unnecessary. || 
|| Capacity Factors        || 0           || This may need to be a default behavior for all facilities. Enums may be necessary. || 
|| Recipes                 || 3           || Roy is working on this via scale/origen. || 
|| PWR II                  ||             || PWR assemblies with initial 235U enrichment of 4.4% and a burn-up of 55 GWd/MT. ||
|| BWR II                  ||             || BWR assemblies with initial 235U enrichment of 4.35% and a burn-up of 55 GWd/MT. ||
|| Decay Capability        || 10           || There may be some issues with binning "other" isotopes. ||
|| *Phase 3*               || *Phase 3*   || *Phase 3*  ||
|| *Model or Capability*   || *Readiness* || *Details* || 
|| Phase 2 capabilities    ||             ||           || 
|| StorageFacility (s)     || 9           || The material should actually just be stored at the reactors until 2040. Sink Facilities won't do. || 
|| SinkFacility  (repo)    || 10          || The material starts to be sent to a repo facility from the storage facilities in 2040. ||
|| *Phase 4*               || *Phase 4*   || *Phase 4*  ||
|| *Model or Capability*   || *Readiness* || *Details* || 
|| Phase 3 capabilities    ||             ||           || 
|| SmartMarket             || ?           || A market needs to be able to handle competition between spent fuel and new uranium. || 
|| ReEnrichmentFacility    || 9           || While an EnrichmentFacility exists, it must be modified to do re-enrichment including impurities. || 
|| SepMatrixFacility       || 5           || Roy is in charge. This will need to separate plutonium from PWR II spent assemblies. ||
|| ReprocessingFacility I  || 0           || PWR MOX will mix fresh U tails (235U assay 0.2%) with spent Pu (max Pu content of 14%).||
|| ReprocessingFacility II || 0           || PWR UOX from re-enriched spent U (any enrichment necessary for criticality) ||
|| Recipes                 || 3           || Roy is working on this via scale/origen. || 
|| PWR MOX                 ||             || made from spent PWRII, mixes fresh U tails (235U assay 0.2%) with spent Pu (max Pu content of 14%).||
|| PWR UOX                 ||             || PWR UOX will be re-enriched spent U (any enrichment necessary for criticality) ||
|| STEADY STATE            || 0-10?       || The request is to do a "steady state" calculation. Can we require the absence of transients? || 
|| *Phase 5*               || *Phase 5*   || *Phase 5*  ||
|| *Model or Capability*   || *Readiness* || *Details* || 
|| Phase 4                 ||             || This simulation is a repeat of phase 4, but dynamic, and includes a repository. || 

