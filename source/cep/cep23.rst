CEP 23 - Defining Time Step Length, High Noon for Blue Moon
**************************************************************

:CEP: 23
:Title: Defining Time Step Length, High Noon for Blue Moon
:Last-Modified: 2014-12-01
:Author: Anthony Scopatz
:BDFP: Paul P. H. Wilson
:Status: Draft
:Type: Standards Track
:Created: 2014-12-01

Motivation
==========
Cyclus is a discrete time simulator whose assumed default time step is 
months. Months are the worst unit ever. This proposal adds precision and 
flexibility to what we mean by :math:`\delta t`. Namely, this CEP moves from 
months to seconds and allows the user to set the time step length, preserving 
a default length of a Julian month.

Discussion
==========
Cyclus lacks a canonical time system. This CEP seeks to unambiguously define
the seconds as the default time unit.  This allows agents to unambiguously 
communicate with each other and to determine their own time scales internally.
This CEP also adds the capability for users to specify a time step length 
(:math:`\delta t`) of their choosing. The default time step, if unspecified, 
will be a well-defined month, improving on the historically nebulous month.

This CEP is motivated by our past woes with months.
Months are an awful time step because there is no single definition for what a 
month *is* and all definitions lack a physical basis. Days and years map nicely 
(enough) onto a solar cycle. A lunar cycle is 29.53059 days with 7.4 days per phase.
This does not map on well to any solar equivalent.  In fact, a 12 month lunar year 
is only 354.36708 days, which is a far cry from a solar year.  This is why many 
lunar calendars are, in fact, lunisolar. Various strategies 
for dealing with this time defect are either to add an extra months occasionally
or to have non-month days between years.

As physically impossible as it is to perfectly sync the sun and the moon, 
it is an even worse idea to implement a full Gregorian calendar. Like with 
time zones, the opportunities for failure are nearly endless. Furthermore, 
going with a real calendar breaks with the current notion that all time steps
have an equal :math:`\delta t`.

Specification
==============================
This CEP defines the default time step as the average length of a Julian
month as measured in seconds, the proper unit for time:

.. math::

    \delta t = \frac{365.25 [d]}{12} = \frac{31557600 [s]}{12} = 2629800 [s/m]

Furthermore, this actual time step should be able to be set by the user in the 
input file. The following changes to the master schema(s) are thus needed:

.. code-block:: xml


    <element name ="control">
      <interleave>
        . . .
        <optional>
          <element name="dt"><data type="unsignedLong"/</element>
        </optional>
        <optional>
          <element name="dt_units"><data type="token"/</element>
        </optional>
      </interleave>
    </element>

This information would be added to the context with the following members:

.. code-block:: c++

    class Context {
     public:
      // Returns the time step in seconds
      inline uint64_t dt() { return dt_; }; 

      // Returns the time step in [units], given as string
      uint64_t dt(std::string units); 

      // Returns the time step in [units], given as TimeUnits enum
      uint64_t dt(TimeUnits units);

     private:
      uint64_t dt_;  // the length of the time step, in seconds.
    }

All archetypes and toolkit code should then ask the context what the time step 
size is whenever they actually need the current. As per `CEP20 <cep20.html>`_, 
the time step length is fixed for the entire simulation and may not change.

Furthermore, ``TimeUnits`` will be a fixed set of time increments that will 
not be able to be set by the users.  An initial set of time units are:
s, min, hr, d, month (as defined above), y, ky, My, Gy.

Best Practices
--------------
Along with this CEP comes the best practice that 
archetypes which model time-dependent behavior should not 
assume a nominal time step. Archetypes should always get the time step length 
from the context.  Since the time step is fixed, this need only be done once
per prototype.

From here, we also define two broad archetype classifications: those which care 
about actual real physical time and those which simply function per 
simulation time step.

When an archetype uses real time, due to physics calculations or other needs, 
the archetype should now check that :math:`\delta t` is within a valid range 
that they define. This is because users will now be able to set the time step.
This validation check maybe performed in any of the archetype's member functions.  
If a static range is known ahead of time, then this check is most appropriate in 
the constructor. If the time step length is outside of the valid range of the agent, 
then an exception should be raised.  We recommend something along the lines of:

.. code-block:: c++

    if (context().dt() > max_dt)
      throw cyclus::ValidationError("time step exceeds valid range!");

On the other hand, if the archtype only models per time step behavior, then
state variables should be expressible by default in terms of number of time steps, 
not in terms of seconds.  If other time values are desirable, the user 
should explicitly give the time units. For any time-based variable, the default
associated units should be provided by the metadata.

Implementation
==============
The implementation of this code should be fairly straight forward. Unlike time 
itself, there is no funny business here.

Document History
================
This document is released under the CC-BY 4.0 license.

