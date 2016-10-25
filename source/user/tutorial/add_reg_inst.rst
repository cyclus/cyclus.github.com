Adding Regions and Institutions
===============================

Concept: Regions & Institutions
---------------------------------

|Cyclus| establishes a hierarchy of agents: Facility agents are operated by
Institution agents that exist within a Region agent.  This sense of ownership
and coarse "geolocation" allow for modifications of the interaction behavior
among agents.  For example, two facilities who trade in the same commodity,
but that exist in different regions may be disallowed from participating in a
trade.

Every |Cyclus| simulation needs at least one Region and one Institution, and
in this case, we'll use the simplest options:

* a Null Institution (*NullInst*) that holds a set of facilities that are
  deployed at the start of a simulation.
* a Null Region (*NullRegion*) that holds a set of Institutions.

Activity: Add an Institution
++++++++++++++++++++++++++++++

1. Drag the **Institution Corral** into the *workspace* and drop it on an empty location.
2. This window has an *Archetype Ribbon*, similar to the *Main View*, above
   the Institution Corral.  Working with Institutions in the Insitution Corral
   is much like working with Facilities in the Main View.  You can
   drag-and-drop the archetypes into the corral and then double click to
   configure them.

.. image:: inst-corral-annotated.png
    :align: center
    :alt: Annotated view of the Institution Corral

3. Drag and drop a *NullInst* into the corral, and open its configuration window.
4. Name this institution: MyNucCo

Concept: Intial Facilities
---------------------------

All institutions can have a list of initial facilities that are operating when
the simulation begins.  Each of those facilities is based on a Facility
prototype that has been defined in the *Main View*.  Each facility is added to
the list by specifying its Prototype and how many to add.

Activity: Add Initial Facilities
+++++++++++++++++++++++++++++++++

1. Add one uranium mine to the initial facility list of this institution by selecting:

  * Prototype: U mine
  * Number: 1

  and press the "Add" button.

.. image:: inst-add-mine.png
    :align: center
    :alt: A single U mine has been added to this institution.

2. Use the same process to add:

   * EnrichPlant

.. image:: inst-all-added.png
    :align: center
    :alt: This institution has a full complement of initial facilities.

Activity: Add a Region
+++++++++++++++++++++++++

1. Drag the **Region Corral** into the *workspace* and drop it on an empty location.
2. This window has an *Archetype Ribbon*, similar to the *Main View*, above
   the Region Corral.  Working with Regions in the Region Corral is much like
   working with Facilities in the Main View, and with Institutions in the
   Institution Corral.  You can drag-and-drop the archetypes into the corral
   and then double click to configure them.

.. image:: region-corral-annotated.png
    :align: center
    :alt: Annotated view of the Region Corral

3. Drag and drop a *NullRegion* into the corral, and open its configuration window.
4. Name this institution: Nuclandia
5. Add our only institution to this region by selecting "MyNucCo" from the
   drop down box and clicking the "Add Institution" button.

.. image:: region-complete.png
    :align: center
    :alt: This simple region has a complete configuration.

Activity: Generate (and Save) your Input File
+++++++++++++++++++++++++++++++++++++++++++++++

You are now ready to generate a full |Cyclus| input file.

1. Click on the "Generate" button in the "Simulation Details" pane.
2. Choose a file name and save.

