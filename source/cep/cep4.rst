CEP 4 - Attribution of Code Products in the |cyclus| Ecosystem 
**************************************************************

:CEP: 4
:Title: Attribution of Code Products in the |cyclus| Ecosystem 
:Last-Modified: 2014-06-19
:Author: Kathryn Huff
:Status: Draft
:Type: Process
:Created: 2014-06-01

Abstract
========

The purpose of this CEP is to define the method for attribution of code 
products within the |cyclus| ecosystem. In particular, along with any software 
release a unique, publicly citable object should be created which 
appropriately attributes its authors. This CEP therefore introduces a method 
for creating a `Digital Object Identifier`_ for each code release, with alphabetically ordered 
authorship, and encapsulating all of and only the authors responsible for that 
effort.

Concerns
========

The concerns driving this CEP are threefold :

* **Unambiguous Citation** 
* **Author Identification** 
* **Contribution Equality** 

First, public and unambiguous citation of scientific and code products like 
those in the |cyclus| ecosystem is of paramount importance to scientific 
reproducibility. Due to the algorithmic and authorship differences between 
versions of the codebase, a unique identifier is required for accurate citation 
of that version.  Therefore, to enable reproducibility in the use of the 
|cyclus| ecosystem, each version must be unambiguously citable with a distinct 
DOI.

Second, to provide an appropriately transparent public link between the 
identities and efforts of the authors, the true names of the authors should be 
listed. As with other forms of scientific publication, public attribution of 
authorship is of importance for appropriately enabling direct praise and blame 
related to that scientific work :cite:`shamoo_responsible_2003`.  This features 
of scientific publication holds the scientist accountable for their work and 
enables them to establish a record of their scientific pursuits. It is for this 
reason that clear attribution of true names is superior to other options, such 
as using a pseudonym for the group (Cyclus developers). 

Finally, since ordering of authorship has conventional meaning and value in the 
scientific community, the ordering of authorship for code products in the 
|cyclus| ecosystem should similarly reflect the community consensus concerning 
relative contribution importance. Specifically, due to the inherently 
apples-and-oranges nature of code contributions, no metric for code importance 
was deemed suitable for comparing contribution importance within the |cyclus| 
ecosystem. That is, a lack of hierarchy was preferred. Thus, alphabetical 
ordering, which is perceived by convention as non-hierarchical, shall be used.

What releases should have a DOI?
------------------------------------

Cyclus versions are indicated by numbers of the form : vMAJ.MIN.MICRO-patch. At the 
very least, major, minor, micro versions should have associated DOIs.

How should a DOI be created?
------------------------------------

Creation of a DOI should be conducted or delegated by the code release 
manager. Accordingly, :doc:`CEP3<./cep3>` has been updated to reflect this responsibility. 
That person is responsible for identifying the code contributors since the last 
release at that level.  

Among online services that have the capability of creating a DOI for a code 
product, `figshare`_ is preferred. It was initially chosen due to both its 
nascent adoption by the scientific computing community and its native 
ability to capture github-hosted codebases. 

Once the DOI is created, it should be recorded on the cyclus website and should 
be shared with the development team. 


Who is an author?
------------------------------------

An author has contributed code contributing to the release. 
For a **major release**, all authors that contributed code between version 
n.0.0 and version m.0 should be listed in the m.0.0 code release DOI. 

In the same way, for a **minor release**, all authors that contributed code between 1.n.0 and 
1.m.0 should be listed in the 1.m.0 code release DOI. Note that additional authors 
should not be included if they have not contributed to this minor release. For 
example, if someone has contributed to version 1.0.0, but not since then, that 
person should not be listed as an author on the DOI for version 1.1.0.

How are authors listed?
------------------------------------

All authors should be listed in (english) alphabetical order. This serves both 
to (1) convey a lack of hierarchy in code contribution importance and to (2) reflect the 
true identities of the authors.

Summary
=======

In the absence of a rigid convention in the scientific computing community concerning 
contribuion metrics, author attribution, and code citation, this CEP proposes 
that uniquely and publicly citable DOIs as well as comprehensive but  flat 
authorship reflect the needs and desires of the |cyclus| development community. 
Finally, this document provides resources for implementing the requirements 
it introduces. 

Document History
================
This document is released under the CC-BY 3.0 license.

References and Footnotes
========================

.. _figshare: http://figshare.com/
.. _Digital Object Identifier: http://en.wikipedia.org/wiki/Digital_object_identifier

.. rubric:: References

.. bibliography:: cep-0004-1.bib
   :cited:

