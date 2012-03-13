
.. summary Developers notes for the implementation of a new InstModel

Developing Institution Models
=============================

Details
-------

In addition to inheriting from the main dynamic loading base class `Model`, all
InstModel models also inherit from `Communicator`.

A InstModel's primary function is to

  * refer to the set of facilities operating in this institution

All InstModel models may also implement a reciveMessage function if messages
need to be amended by the institution before being sent up to the region or
down to the facility. This is a virtual (but not pure virtual) function, so
implementation is optional. Default behavior is to ignore the message.

InstModel models are sent a tick and tock signal at the beginning and end of
each month, respectively. Monthly tasks, such as facility deployment or
bookkeeping should be undertaken within the handleTick and handleTock
functions. These are virtual (but not pure virtual), so implementation of these
functions is optional. 

  *The InstModel model type is not yet stable and additional interface and
  data members are expected to be added.*


