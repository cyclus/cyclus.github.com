Dynamic Loading Overview
========================

Dynamic loading is a term used to describe the action of loading
libraries at run time. This implies that knowledge of the structure
of the classes in these libraries is not known at compile time to
the executing program. In Linux, these libraries are denoted by the
suffix '.so', in Windows, '.dll', and in OSX, '.dylib'.

In *Cyclus*, every *module* is dynamically loaded. Modules include:

* Regions
* Institutions
* Facilities

The internal process used by the *Cyclus* core is very close to that
described in this 
`article <http://www.linuxjournal.com/article/3687>`_.
