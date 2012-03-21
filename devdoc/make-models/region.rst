
.. summary Developers notes for the implementation of a new RegionModel

Developing Region Models
========================

Details
-------

In addition to inheriting from the main dynamic loading base class `Model`, all
RegionModel models also inherit from `Communicator`.

A RegionModel's primary functions are to

  * contain a set of institutions that operate in this region
  * define a set of allowed facilities for those institutions   
  * Schedule the deployment of facilities by either

         #. Determining when new facilities need to be built, or
         #. deferring to an InstModel to make this determination. 

  * Manage the deployment of facilities by interacting with the Institutions to select a specific facility type and facility parameters
  * Passing material offers/requests between a prescribed market and related facilities. 

All RegionModel models have an STL `set` of pointers to the `Model` instances
that represent the allowed FacilityModel facilities. and an STL `vector` of
pointers to the `Model` instances that represent the contained InstModel
institutions.

All RegionModel models may also implement a reciveMessage function if messages
need to be amended by the region before being sent up to the market or down to
the institution. This is a virtual (but not pure virtual) function, so
implementation is optional. Default behavior is to ignore the message.

RegionModel models are sent a tick and tock signal at the beginning and end of
each month, respectively. Monthly tasks, such as facility deployment or
bookkeeping should be undertaken within the handleTick and handleTock
functions. These are virtual (but not pure virtual), so implementation of these
functions is optional. 

To Do
-----

RegionModel models should be the mechanism for implementing demand growth.
Different implementations of RegionModel models might implement different ways
to model that growth. (Or is this all pre-processing?)

