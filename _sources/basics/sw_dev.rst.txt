Software Process & Architecture
================================

The software architecture and accompanying development process are critical to
a simultaneously robust and flexible analysis platform.

Open Source Development Process
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The |cyclus| development framework employs a modern, open source philosophy
that ensures transparency, attracts contributions from a varied community of
collaborators, and guarantees institution-independent access to all potential
:term:`users <user>`. (`BSD 3-Clause License <https://github.com/cyclus/cyclus/blob/develop/LICENSE.rst>`_) 
In this development path, a public source code repository provides
unhindered access to the `fundamental simulation framework
<http://github.com/cyclus/cyclys>`_ and `additional agent archetypes
<http://github.com/cyclus/cycamore>`_ volunteered by developers.  Granting
unfettered access only to the |cyclus| engine allows for compartmentalization
of the code and its input data. Thus, secure and proprietary :term:`archetype
developers <archetype developer>` can be similarly encouraged to utilize the |cyclus| framework.
This modern development model passively distributes specialized content to
interested research groups, and facilitates parallel archetype development
efforts by institutions with complimentary goals.  The transparency inherent
in this type of :term:`open development process` also facilitates code review by
exposing available content to verification and validation by collaborators
with diverse areas of specialization and levels of expertise.

Another aspect of this development process is a preference for open source
third party libraries where additional functionality is necessary and
available from such libraries.  This includes basic infrastructure such as
file input/output, as well as archetype-specific capabilities like
integer programming for network flow optimization.

Dynamically Loadable Modules
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Dynamically loadable modules are the primary mechanism for extending |cyclus|
with new underlying :term:`archetypes <archetype>`.  The primary benefit of this
approach is encapsulation: the :term:`cyclus kernel` is completely independent
of the individual archetypes and all customization and extension is
implemented only in the loadable module.  A secondary benefit of this
encapsulation is the ability for contributors to choose different distribution
and licensing strategies.  Finally, this strategy allows individual developers
to explore different levels of complexity within their archetypes,
including wrapping other simulation tools as loadable modules for |cyclus|.

Use Cases & Visualization
~~~~~~~~~~~~~~~~~~~~~~~~~

Because of the wide array of use cases for |cyclus|, flexibility in the user
interface is important to provide users with their desired functionality.
This is true for input generation as well as output visualization.  A
graphical user interface has been designed and will be implemented in parallel
with the development of the underlying modules.  The graphical interface is
extensible by loadable modules in the same way as the core code to provide
developers the same flexibility in managing their input as they have in
implementing their archetypes.  Output visualization is also
important - the discrete facility/discrete material paradigm generates a
large volume of small data that needs to be aggregated in various ways to
provide context to a variety of users.

