CEP 26 - Generalize the DRE to Optimize Multiple Metrics
********************************************************

:CEP: 28
:Title: Additional Control Input to Manage RecordTimeSeries
:Last-Modified: 3/1/2019
:Author: Robert Flanagan \& Gwen Chee
:Status: Draft
:Type: Standards Track
:Created: 3/1/2019


Abstract
========
Increased use of the RecordTimeSeries functionality within Cyclus
has caused an increase in the number of tables in a cyclus output
file. While this has yet to impact performance, it is conceivable 
that it could become problematic in the future. To combat this
a new cyclus control input field will be added to allow users to
choose which RecordTimeSeries tables to be added to the output. 


Motivation
==========
The addition of the TimeSeriesListeners added to support the d3ploy 
archetypes caused an increase in the amount of tables being output
by Cyclus. This change is largely user agnostic however, it can 
cause an increased storage space for each run. As this data is unused
by any simulation not using the listeners, it is just wasted hard disk
space. This charge will be used to mitigate this problem. It will also
allow uses to run a simulation that outputs only the specific tables
they wish to see in their outputs. 


Specification \& Implementation
===============================
This charge will add a field to the simulation control that will allow
the user to specify which tables they wish to see. By default this value
will be set to all tables, but if user wishes to specify the tables they
wish to see they will do so by entering the string of each table's name;
Similar to a vector input to a cyclus module. The user will also be 
able to turn off all RecordTimeSeries tables. 


Backwards Compatibility
=======================
By setting the default value of this field to be all tables it should
be fully backwards compatible. 


Document History
================

This document is released under the CC-BY 4.0 license.
