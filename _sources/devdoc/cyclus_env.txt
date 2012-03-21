
.. summary Cyclus Environment description

The Cyclus Environment
======================

All developers will interact with the *Cyclus* simulation environment 
in three primary modes:
 
 * Input/Output

   * InputXML
   * BookKeeper

 * Simulation Progression

   * Timer

 * Static Data

   * MassTable

A prolific stumbling block to dynamic system codes is a restrictive 
environment. Accordingly, the *Cyclus* team has strived to make the 
environment as bare and simple as possible.

The environment in *Cyclus* is actually comprised of singleton classes 
(a singleton class has a static member of its own type that is instantiated 
only once during the code's execution). Modules within *Cyclus* then 
interact with the singleton instance. For instance, the current simulation 
time is called via: ::

     TI->time()

Each singleton class has a predefined handle, such as "TI" above which 
stands for "Timer Instance".

====================     ==================
Singleton Class          Handle
====================     ==================
`InputXML`               XMLInput
`BookKeeper`             BI
`Timer`                  TI
`MassTable`              MT
====================     ==================

InputXML (XMLInput)
-------------------

This class provides an interface to read input values from their respective 
xml files. The main interaction a developer will have with this class is through 
the grabbing of a specified element or group of elements. 

A collection of elements is generally a list of some type, e.g. all of the 
attributes which are required to define some facility. A real-life example in 
*Cyclus* is shown via the RegionModel class. Every region has a list of allowed 
facilities. The xml file might look something like: ::

    <region>
      <name>oneRegion</name>
      <allowedfacility>FrontEnd</allowedfacility>
      <allowedfacility>BackEnd</allowedfacility>
      <model>
        <NullRegion/>
      </model>
    </region>

whereas the C++ code to get these allowed facilities would look like: ::
	
     xmlNodeSetPtr nodes = XMLinput->get_xpath_elements(cur,"allowedfacility");

A single element, such as the region's name, would be accessed with 
the following: ::

     string region_name = XMLinput->get_xpath_content(cur,"name");

BookKeeper (BI)
---------------
 
The BookKeeper manages the *Cyclus* output database. Specifically, it manages the
registering of database tables and the frequency at which data is written to the 
database. A more in-depth overview of the topic is covered in :doc:`output_dbase`.

Timer (TI)
----------

The Timer's main directive is to increment the simulation time and alert models that the 
time has been incremented. The general developer will only interact with the Timer through 
the time() method.

The Timer also holds a list of models that it will directly send Ticks/Tocks to and a list
of models that it will send Resolves to. In general, the former is Region Models and the latter
is Market Models. It is unlikely that a developer will need to utilize this functionality 
as it taken care of at the abstract Region/Market Model level.

MassTable (MT)
--------------

The MassTable simply provides the mass of a given isotope via its alpha-numeric handle. For 
example, MT->getMassInGrams(pu240) returns the mass of Plutonium-240 in grams.


