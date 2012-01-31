#summary Documentation for Cyclus Developers
#labels Phase-Implementation

Documentation to assist with the development of *Cyclus* will be maintained in a variety of forms.

== Fundamental Concepts ==

  * LogicianClass
  * CommodityClass
  * MaterialClass
  * CommunicatorClass
  * MessageClass

  * DynamicModule
     * GuidelinesForImplementingNewMarketModels 
     * GuidelinesForImplementingNewRegionModels 
     * GuidelinesForImplementingNewInstModels 
     * GuidelinesForImplementingNewFacilityModels 
     * GuidelinesForImplementingNewConverterModels 

== Milestone Definitions ==

MilestoneNullSimulation

MilestoneOneInpro

MilestoneTwoNWTRB

== Developers Wiki Notes ==

Some specific topics will also be described in the Google Code project wiki pages.

  * GuidelinesForImplementingNewModels

== Doxygen Code Documentation ==

The definitive documentation of any software is the source code itself.  *Cyclus* will relies on Doxygen for automation of rich documentation from appropriately formatted comments in the source code. Current Doxygen documentation can be found at http://cnerg.engr.wisc.edu/cyclus/docs/ . This page will be updated weekly during active development.

In addition to following Doxygen comment notation in the source code, this relies on a properly configured Doxygen file.
  * cyclus/trunk/src/doc/doxy.conf.in is a cmake template file for doxygen settings.
  * To add or change options, edit this file and cyclus/trunk/src/doc/CMakeLists.txt

Documentation is a make target in the cmake build system. Documentation will automatically be built when you "make all". You can build only the documentation by running "make cyclusdoc" instead of "make all" or "make". To avoid building documentation, use "make cyclus".

== Diversions ==

Relevant xkcd comics:

  * [http://xkcd.com/927/ Standards]
  * [http://xkcd.com/974/ The General Solution]
