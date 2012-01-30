#summary Description of ExpGrowthRegion usage and implementation

= Introduction =

The ExpGrowthRegion is a region type in *Cyclus* that is associated with a list of allowed facilities. Any institution in that region must have only those facilities. It is instantiated at the beginning of the simulation and persists until the end of the simulation. 

A ExpGrowthRegion takes a build time, intial demand, and demand growth rate from the user to deploy specific facilities at specific times.

= Model Parameters = 

ExpGrowthRegion behavior is comprehensively defined by the following parameters:
  * {{{vector< Model > allowedfacilities}}} : The facilities which are allowed within this region.
  * For each allowed facility:
    * {{{vector< vector < double > > deploysched}}} : A matrix of size Nx3 where for each , 
      * a,,n,0,, = initial build time
      * a,,n,1,, = initial build demand
      * a,,n,2,, = exponential growth rate for further demand

= Optional Parameters = 

ExpGrowthRegion behavior may also be specified with the following optional parameters which have default values listed here.

  * string name : A non-generic name for this region. 

= Detailed Behavior = 

The ExpGrowthRegion is initiated at the beginning of the simulation and persists until the end of the simulation. The region is created with a Nx3 matrix which dictates when facilities in the region should be built. An example of such a matrix is shown below.

Let us consider a region which would like to produce light water reactors (LWRs). This region would like to begin building 1000 MW,,e,, capacity at 1 year into the simulation and would like to grow this demand at a rate of 1%. The region at year 3 would then like to begin building 5000 MW,,e,, capacity, if it has not already been reached, with a growth rate of 2% per month. Finally, at year 10, the region would like to maintain the current demand level, but no longer build any further reactors. The demand vector would have values:
    {{{
deploysched[0]=[0,1000,0.01];  // 1% -> 0.01
deploysched[1]=[60,5000,0.02]; // 5 years = 60 months
deploysched[2]=[120,-1,0.0];   // 10 years = 120 months; -1 denotes current demand level
    }}}

When it receives a message, the ExpGrowthRegion simply passes that message either up the hierarchy to the market for which it was intended or down to the appropriate institution on the path to the recipient.