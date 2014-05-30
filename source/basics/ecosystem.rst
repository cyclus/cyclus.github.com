====================================
 The |Cyclus| Community & Ecosystem
====================================

**The Cyclus project is owned by its community of users & developers and welcomes code & contributions from everyone!**

An important goal of the |cyclus| effort is to attract a community of
developers contributing to a vibrant ecosystem of models.  Due to
sensitivities regarding the distribution of software for simulating nuclear
systems, this ecosystem requires careful considerations in its design and
implementation.

Critical to the success of this community is the widespread availability of
the core infrastructure of the |Cyclus| simulation environment.  Because this
environment is formulated using a variety of generic concepts not specific to
nuclear energy systems, this should mitigate concerns for the open source
distribution of this core infrastructure.  

Moreover, this infrastructure is also designed to allow for the addition of
runtime :term:`modules <module>`, or :term:`plug-ins <plug-in>`, that can be developed and
distributed under any licensing scheme.  Separate from the core
infrastructure, the distribution responsibility will rest with the developer
of each module.  This system will insulate the core infrastructure from
accidental "pollution" by modules of a sensitive nature, and, similarly, limit
issues regarding the authorization for distribution to the author's
organization.  Ideally, most module developers will be authorized for open
distribution of their modules.

Finally, the community will be relied upon to provide review and curation of
available modules, establishing both quality assurance practices and
recommendations for best use cases for each contributed module.

Below, a more detailed exposition of these characteristics is provided.

Open Source Core Infrastructure
================================

The current portfolio of fuel cycle simulators has been characterized by
barriers to adoption by new users and developers including:

* policies of limited/restricted distribution,

* reliance on propriety software development infrastructures, and

* deeply embedded nuclear technology assumptions arising from
  development path.

Because one of the principle purposes of |cyclus| is to create a fuel cycle
simulator system with a low barrier to adoption, a policy of open source
distribution of this core infrastructure is critical to its mission.
(|cyclus| is also committed to free and widely used software development
tools, such as GNU compilers, SQLite, Boost, etc.)  The |cyclus| core is
currently available via its `GitHub repository
<http://github.com/cyclus/cyclus>`_.  Interested users and developers are
invited to make their own copy of this repository, review the list of open
issues, and participate in the developer's mailing list. Like all open source
projects, this distribution mode permits a thorough code review by interested
parties and the possibility of contributions in order to identify/resolve
defects or request/provide feature enhancements.

The |cyclus| core infrastructure provides a generic environment for modeling
flows of materials through a collection of nuclear facilities.  This
infrastructure could be used for modeling many different supply chain systems,
nuclear and non-nuclear alike, this infrastructure prioritizes nuclear systems
analysis.  Addressing the barrier of deeply embedded nuclear technology
assumptions, this approach ensures that the core infrastructure has a very low
risk of containing sensitive information regarding the simulation of nuclear
systems.  These capabilities are added by acquiring and invoking plug-ins
developed and distributed by the |cyclus| community.

The open source approach can also allow the project to leverage the efforts a
larger pool of developers and improve the quality of the software product
[1]_.

Decentralized Module Development & Distribution
===============================================

When a user/developer wishes to contribute a new module to the |cyclus|
ecosystem, they will be responsible for all aspects of that distribution.  The
|cyclus| core development team will provide a catalog of available modules
(details are still under development), but this catalog will point to external
distribution sites that are consistent with each contributors personal and/or
institutional needs.  For example, developers who are permitted to follow an
open source approach with their own contributions can have their own GitHub
account and share their modules through the same mechanism as - but a
different location from - the |cyclus| core.  For some subset of open source
distribution mechanisms, the |cyclus| core will include tools to make it
easier for individual users to download and install contributed modules or
collections of modules.

Decentralizing the development and distribution of runtime modules provides a
number of benefits.  First, as is true for the core infrastructure, a larger
pool of developers can contribute to the |cyclus| ecosystem by providing
modules that represent their organization's specific interests.  If a
particular user/developer would like to understand the impact of their own
technology on the greater fuel cycle, they are free to develop a module that
simulates this technology and contribute it to the broader community.

More importantly, this will contribute to the maintenance of a "pristine" core
infrastructure, from the point of view of sensitive information.  Any software
added to the source code repository leaves behind permanent artifacts - even
if removed at a later date. The inclusion of all newly developed plug-ins in a
centralized software repository could result in the entire repository being
declared sensitive.  Decentralized distribution mitigates this risk.

Finally, a centralized approach would require identifying a single
organization that would accept an ongoing burden of authorizing distribution,
assessing quality and assembling collections.  A decentralized approach
removes the burden of authorizing distribution and reviewing contributions
from a central authority. Rather, the authors and community are responsible
for these tasks, as described in the following sections.

Distribution Authorization by Owner
-----------------------------------

Considering the concerns for copyright, intellectual property, and the risk
that sensitive information could be contained in a module, the burden of
acquiring and confirming distribution rights by a centralized organization
could become prohibitive.  If instead the modules developed for the |cyclus|
ecosystem are documented in a catalog that refers to a variety distribution
sites as appropriate for each developer, the effort for ensuring the rights
for distribution are the responsibility of the developer and their
organization.  The inclusion of a given module in the catalog requires little
oversight and the details of distribution remain between the provider and
consumer of each module.

Peer-review QA and Rating
---------------------------

For most organizations, including a plug-in in a centralized software
distribution would be regarded as a tacit approval of the quality and utility
of the module.  In most such cases, a substantial burden of quality assurance
and testing would be required by the organization preforming this centralized
distribution.  In the decentralized approach of the |cyclus| ecosystem,
mechanisms will be provided for members of the community to provide
peer-review of the modules' quality and applicability to certain problems.

For modules that are distributed with an open source policy, other users and
developers will be able to perform a direct source code review as well as
testing the functionality of the module in fuel cycle analyses.  For other
distribution policies, more limited review will be possible.

In all cases, practices and policies will emerge from the community to support
standardization of this process.  For example, providing adequate
documentation and test suites will result in a better review from members of
the community and ultimately will become pre-requisites to a positive peer
review.

Curation and Collections
-------------------------

When the number of contributions is sufficiently large, there will be benefit
in developing collections of modules that are known to be useful for certain
types of simulations.  A decentralized approach will allow individual members
of the |cyclus| community to create such collections, providing a curation
function to help both new and experienced users identify the modules that are
likely to give them the most benefit.

Footnotes
^^^^^^^^^

.. [1] J.W. Paulson, *et al*, "An Empirical Study of Open-Source and Closed-Source Software Products", *IEEE Transactions on Software Engineering*, **30** (4), April 2004. http://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=01274044
