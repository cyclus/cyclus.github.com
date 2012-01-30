#summary Defining the capabilities to be demonstrated at Milestone NullSimulation
#labels Phase-Design,Phase-Requirements

= Introduction =

This is the first milestone for Cyclus development

*Target Date: 2010.08.01*

= Definition =

The simplest possible simulation definition in Cyclus has a single SourceFacility trading in a NullMarket with a single SinkFacility.  Each of the facilities will be owned by a FixedInst institution in a NullRegion region.

Other simulations that must be supported by this milestone:
  * SourceFacility -> NullMarket -> 2 x SinkFacility
  * 2 x SourceFacility -> NullMarket -> SinkFacility
  * 2 x SourceFacility -> NullMarket -> 2 x SinkFacility
  * SourceFacility -> NullMarket A -> NullFacility -> NullMarket B -> SinkFacility
  * SourceFacility -> NullMarket A -> 2 x NullFacility -> NullMarket B -> SinkFacility

All of these models should be defined to give interesting and different results for the different cases described here. (issue 6)

= Implementation = 
A first round of test`*`.xml simulations supported by this milestone is in the null folder. 


|| *File*    || *Simulation*                                   ||
|| test1.xml || SourceFacility -> GreedyMarket -> SinkFacility ||
|| test2.xml || SourceFacility -> GreedyMarket -> 2 x SinkFacility ||
|| test3.xml || 2 x SourceFacility -> GreedyMarket -> SinkFacility ||
|| test4.xml || 2 x SourceFacility -> GreedyMarket -> 2 x SinkFacility ||
|| test5.xml || SourceFacility -> GreedyMarket A -> NullFacility -> GreedyMarket B -> SinkFacility ||
|| test6.xml || SourceFacility -> GreedyMarket A -> 2 x NullFacility -> GreedyMarket B -> SinkFacility ||
|| test1null.xml || SourceFacility -> NullMarket -> SinkFacility ||
|| test2null.xml || SourceFacility -> NullMarket -> 2 x SinkFacility ||
|| test3null.xml || 2 x SourceFacility -> NullMarket -> SinkFacility ||
|| test4null.xml || 2 x SourceFacility -> NullMarket -> 2 x SinkFacility ||
|| test5null.xml || SourceFacility -> NullMarket A -> NullFacility -> NullMarket B -> SinkFacility ||
|| test6null.xml || SourceFacility -> NullMarket A -> 2 x NullFacility -> NullMarket B -> SinkFacility ||


= Output Format = 
Some output format must be defined for this milestone too, in order to parametrically tests input variation of these simulations. 
