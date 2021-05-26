Deploying New Facilities
==========================

It's time to make this scenario more interesting with a transition.  This will
require an institution that is able to deploy additional facilities, the
cycamore DeployInst.  This is the simplest institution that is able to deploy
new facilities, in which the user simply defines the times at which new agents
should be deployed as copies of available prototypes.

In this case, we will keep the original institution and add another
institution that will deploy more facilities over time.

Activity: Add a New Institution
--------------------------------

1. Open the Insitution Corral
2. Drag a DeployInst into the Corral and name it BetterNucCo
3. Request the following deployments
   * every 60 time steps deploy a new reactor, starting at time step 61
   * every 120 time steps deploy 2 new separations facilities starting at time step 
4. Add this new institution to the Nuclandia region
