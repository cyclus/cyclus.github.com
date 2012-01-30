#summary Description of DeploymentRegion usage and implementation

= Introduction =

The DeploymentRegion is a region type in *Cyclus* that is associated with a list of allowed facilities. Any institution in that region must have only those facilities. It is instantiated at the beginning of the simulation and persists until the end of the simulation. 

A DeploymentRegion takes a set of explicit instructions from the user to deploy specific facilities at specific times.

= Model Parameters = 

DeploymentRegion behavior is comprehensively defined by the following parameters:
  * {{{vector< Model > allowedfacilities}}} : The facilities which are allowed within this region.
  * For each allowed facility:
    * {{{vector< vector < double > > deploysched}}} : An Nx2 matrix where for each n, 
      * a,,n,0,, = time
      * a,,n,1,, = total build demand for the facility

= Optional Parameters = 

DeploymentRegion behavior may also be specified with the following optional parameters which have default values listed here.

  * string name : A non-generic name for this region. 

= Detailed Behavior = 

The DeploymentRegion is initiated at the beginning of the simulation and persists until the end of the simulation. The region is created with an Nx2 matrix which dictates when facilities in the region should be built. An example of such a matrix is shown below.

Let us consider a region which would like to produce light water reactors (LWRs). This region would like to begin building 1000 MW,,e,, capacity at the initial month of the simulation and 2000 MW,,e,, at 3 years into the simulation. The demand vector would have values:
    {{{
deploysched[0]=[0,1000]
deploysched[1]=[36,2000] // 3 years = 36 months
    }}}

When it receives a message, the DeploymentRegion simply passes that message either up the hierarchy to the market for which it was intended or down to the appropriate institution on the path to the recipient.