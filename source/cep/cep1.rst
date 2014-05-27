CEP 1 - CEP Purpose and Guidelines
**********************************

:CEP: 1
:Title: CEP Purpose and Guidelines
:Last-Modified: 2013-07-03
:Author: Anthony Scopatz
:Status: Active
:Type: Process
:Created: 2013-07-03

What is a CEP?
==============

CEP stands for |Cyclus| Enhancement Proposal.  A CEP is a design
document providing information to the |cyclus| community, or describing
a new feature or process for |Cyclus| and related prjects in its ecosystem.  
The CEP should provide a concise technical specification of the feature and a
rationale for the feature.

We intend CEPs to be the primary mechanisms for proposing major new
features, for collecting community input on an issue, and for
documenting the design decisions that have gone into the |Cyclus| ecosystem.  
The CEP author is responsible for building consensus within the community and
documenting dissenting opinions.

Because the CEPs are maintained as text files in a versioned
repository, their revision history is the historical record of the
feature proposal [1]_.


CEP Types
=========

There are three kinds of CEP:

1. A **Standards Track** CEP describes a new feature or implementation
   for |cyclus|. It may also describe an interoperability standard that will
   be supported outside of |cyclus| core.

2. An **Informational** CEP describes a |cyclus| design issue, or
   provides general guidelines or information to the |cyclus| community,
   but does not propose a new feature.  Informational CEPs do not
   necessarily represent a |cyclus| community consensus or
   recommendation, so users and implementers are free to ignore
   Informational CEPs or follow their advice.

3. A **Process** CEP describes a process surrounding |cyclus|, or
   proposes a change to (or an event in) a process.  Process CEPs are
   like Standards Track CEPs but apply to areas other than the |cyclus|
   code development.  They may propose an implementation, but not to
   |cyclus|'s codebase; they often require community consensus; unlike
   Informational CEPs, they are more than recommendations, and users
   are typically not free to ignore them.  Examples include
   procedures, guidelines, changes to the decision-making process, and
   changes to the tools or environment used in |cyclus| development.
   Any meta-CEP is also considered a Process CEP.


CEP Workflow
============


|cyclus|'s BDFP
---------------

There are several reference in this CEP to the "BDFP". This acronym stands
for "Benevolent Dictator for the Proposal." In most cases, it is fairly clear 
who this person is (Paul Wilson or Anthony Scopatz).  It is this persons
responsibility to consider the entire |cyclus| ecosystem when deciding whether
or not to accept a proposal.  Weighted with this burden, their decision 
must be adhered to (dictator status), though they will try to do the right 
thing (benevolent).


CEP Editors
-----------

The CEP editors are individuals responsible for managing the administrative
and editorial aspects of the CEP workflow (e.g. assigning CEP numbers and
changing their status).  See `CEP Editor Responsibilities & Workflow`_ for
details.  The current editors are:

* Paul Wilson
* Anthony Scopatz
* Katy Huff

CEP editorship is by invitation of the current editors.


Submitting a CEP
----------------

The CEP process begins with a new idea for |cyclus|.  It is highly
recommended that a single CEP contain a single key proposal or new
idea. Small enhancements or patches often don't need
a CEP and can be injected into the |cyclus| development workflow with a
patch submission to the |cyclus| `issue tracker`_. The more focused the
CEP, the more successful it tends to be.  The CEP editors reserve the
right to reject CEP proposals if they appear too unfocused or too
broad.  If in doubt, split your CEP into several well-focused ones.

Each CEP must have a champion -- someone who writes the CEP using the
style and format described below, shepherds the discussions in the
appropriate forums, and attempts to build community consensus around
the idea.  The CEP champion (a.k.a. Author) should first attempt to
ascertain whether the idea is CEP-able.  Posting to the `cyclus-dev`_ 
mailing list is the best way to go about this.

Vetting an idea publicly before going as far as writing a CEP is meant
to save the potential author time. Many ideas have been brought
forward for changing |cyclus| that have been rejected for various
reasons. Asking the |cyclus| community first if an idea is original
helps prevent too much time being spent on something that is
guaranteed to be rejected based on prior discussions (searching
the internet does not always do the trick). It also helps to make sure
the idea is applicable to the entire community and not just the author.
Just because an idea sounds good to the author does not
mean it will work for most people in most areas where |cyclus| is used.

Once the champion has asked the |cyclus| community as to whether an
idea has any chance of acceptance, a draft CEP should be presented to
mailing list.  This gives the author a chance to flesh out the draft
CEP to make properly formatted, of high quality, and to address
initial concerns about the proposal.

Following a discussion on the mailing list, the proposal should be sent as a
draft CEP to the one of the CEP editors.  The draft must be written
in CEP style as described below, else it will be sent back without further
regard until proper formatting rules are followed (although minor errors
will be corrected by the editors).

If the CEP editors approve, they will assign the CEP a number, label it
as Standards Track, Informational, or Process, give it status "Draft",
and create and check-in the initial draft of the CEP.  The CEP editors
will not unreasonably deny a CEP.  Reasons for denying CEP status
include duplication of effort, being technically unsound, not
providing proper motivation or addressing backwards compatibility, or
not in keeping with the |cyclus| philosophy.  The BDFP can be consulted
during the approval phase, and is the final arbiter of the draft's
CEP-ability.

Developers with git push privileges for the `CEP repository`_ may claim
CEP numbers directly by creating and committing a new CEP. When doing so,
the developer must handle the tasks that would normally be taken care of by
the CEP editors (see `CEP Editor Responsibilities & Workflow`_). This
includes ensuring the initial version meets the expected standards for
submitting a CEP. Alternately, even developers may choose to submit CEPs
through the CEP editors. When doing so, let the CEP editors know you have
git push privileges and they can guide you through the process of updating
the CEP repository directly.

As updates are necessary, the CEP author can check in new versions if they
(or a collaborating developer) have git push privileges, or else they can
email new CEP versions to the CEP editors for publication.

After a CEP number has been assigned, a draft CEP may be discussed further on
mailing list (getting a CEP number assigned early can be useful for ease of
reference, especially when multiple draft CEPs are being considered at the
same time). 

Standards Track CEPs consist of two parts, a design document and a
reference implementation.  It is generally recommended that at least a
prototype implementation be co-developed with the CEP, as ideas that sound
good in principle sometimes turn out to be impractical when subjected to the
test of implementation.

CEP authors are responsible for collecting community feedback on a CEP
before submitting it for review. CEP authors should use their discretion here.


CEP Review & Resolution
-----------------------

Once the authors have completed a CEP, they may request a review for
style and consistency from the CEP editors.  However, the content and
final acceptance of the CEP must be requested of the BDFP, usually via
an email to the development mailing list.  CEPs are reviewed by the
BDFP and their chosen consultants, who may accept or reject a CEP or
send it back to the author(s) for revision.  For a CEP that is
predetermined to be acceptable (e.g., it is an obvious win as-is
and/or its implementation has already been checked in) the BDFP may
also initiate a CEP review, first notifying the CEP author(s) and
giving them a chance to make revisions.

The final authority for CEP approval is the BDFP. However, whenever a new
CEP is put forward, any core developer that believes they are suitably
experienced to make the final decision on that CEP may offer to serve as
the BDFP's delegate (or "CEP czar") for that CEP. If their self-nomination
is accepted by the other core developers and the BDFP, then they will have
the authority to approve (or reject) that CEP. This process happens most
frequently with CEPs where the BDFP has granted in principle approval for
*something* to be done, but there are details that need to be worked out
before the CEP can be accepted.

If the final decision on a CEP is to be made by a delegate rather than
directly by the normal BDFP, this will be recorded by including the
"BDFP" header in the CEP.

For a CEP to be accepted it must meet certain minimum criteria.  It
must be a clear and complete description of the proposed enhancement.
The enhancement must represent a net improvement.  The proposed
implementation, if applicable, must be solid and must not complicate
the infrastructure unduly.  Finally, a proposed enhancement must be
follow |cyclus| best practices in order to be accepted by the BDFP.  

Once a CEP has been accepted, the reference implementation must be
completed.  When the reference implementation is complete and incorporated
into the main source code repository, the status will be changed to "Final".

A CEP can also be assigned status "Deferred".  The CEP author or an
editor can assign the CEP this status when no progress is being made
on the CEP.  Once a CEP is deferred, a CEP editor can re-assign it
to draft status.

A CEP can also be "Rejected".  Perhaps after all is said and done it
was not a good idea.  It is still important to have a record of this
fact. The "Withdrawn" status is similar - it means that the CEP author
themselves has decided that the CEP is actually a bad idea, or has
accepted that a competing proposal is a better alternative.

When a CEP is Accepted, Rejected or Withdrawn, the CEP should be updated
accordingly. In addition to updating the status field, at the very least
the Resolution header should be added with a link to the relevant post
in the `cyclus-dev`_ mailing list archives.

CEPs can also be superseded by a different CEP, rendering the original
obsolete.  This is intended for Informational CEPs, where version 2 of
an API can replace version 1.

The possible paths of the status of CEPs are as follows:

.. image:: cep-0001-1.png

Some Informational and Process CEPs may also have a status of "Active"
if they are never meant to be completed.  E.g. CEP 1 (this CEP).


CEP Maintenance
---------------

In general, Standards track CEPs are no longer modified after they have
reached the Final state. Once a CEP has been completed, the Language and
Standard Library References become the formal documentation of the expected
behavior.

Informational and Process CEPs may be updated over time to reflect changes
to development practices and other details. The precise process followed in
these cases will depend on the nature and purpose of the CEP being updated.



What belongs in a successful CEP?
=================================

Each CEP should have the following parts:

1. Preamble -- headers containing meta-data about the
   CEP, including the CEP number, a short descriptive title, the names, 
   and optionally the contact info for each author, etc.

2. Abstract -- a short (~200 word) description of the technical issue
   being addressed.

3. Copyright/public domain -- Each CEP must either be explicitly
   labeled as placed in the public domain (see this CEP as an
   example) or licensed under the `Open Publication License`_.

4. Specification -- The technical specification should describe the
   syntax and semantics of any new feature.  

5. Motivation -- The motivation is critical for CEPs that want to
   change the |cyclus| ecosystem.  It should clearly explain why the
   existing language specification is inadequate to address the
   problem that the CEP solves.  CEP submissions without sufficient
   motivation may be rejected outright.

6. Rationale -- The rationale fleshes out the specification by
   describing what motivated the design and why particular design
   decisions were made.  It should describe alternate designs that
   were considered and related work, e.g. how the feature is supported
   in other languages.

   The rationale should provide evidence of consensus within the
   community and discuss important objections or concerns raised
   during discussion.

7. Backwards Compatibility -- All CEPs that introduce major backwards
   incompatibilities must include a section describing these
   incompatibilities and their severity.  The CEP must explain how the
   author proposes to deal with these incompatibilities.  CEP
   submissions without a sufficient backwards compatibility treatise
   may be rejected outright.

8. Reference Implementation -- The reference implementation must be
   completed before any CEP is given status "Final", but it need not
   be completed before the CEP is accepted.  While there is merit
   to the approach of reaching consensus on the specification and
   rationale before writing code, the principle of "rough consensus
   and running code" is still useful when it comes to resolving many
   discussions of API details.

   The final implementation must include test code and documentation
   appropriate for |cyclus|.


CEP Header Preamble
===================

Each CEP must begin with a header preamble.  The headers
must appear in the following order.  Headers marked with "*" are
optional and are described below.  All other headers are required. ::

    CEP: <cep number>
    Title: <cep title>
    Version: <version string>
    Last-Modified: <date string>
    Author: <list of authors' real names and optionally, email addrs>
  * BDFP: <CEP czar's real name>
    Status: <Draft | Active | Accepted | Deferred | Rejected |
             Withdrawn | Final | Superseded>
    Type: <Standards Track | Informational | Process>
  * Requires: <cep numbers>
    Created: <date created on, in yyyy-mm-dd format>
  * Cyclus-Version: <version number>
  * Replaces: <cep number>
  * Superseded-By: <cep number>
  * Resolution: <url>

The Author header lists the names, and optionally the email addresses
of all the authors/owners of the CEP.  The format of the Author header
value must be

    Random J. User <address@dom.ain>

if the email address is included, and just

    Random J. User

The BDFP field is used to record cases where the final decision to
approve or reject a CEP rests with someone other than the normal BDFP. 

The Type header specifies the type of CEP: Standards Track,
Informational, or Process.

The Created header records the date that the CEP was assigned a
number, while Post-History is used to record the dates of when new
versions of the CEP are posted to |cyclus| mailing list.  Both
headers should be in yyyy-mm-dd format, e.g. 2001-08-14.

Standards Track CEPs will typically have a |cyclus|-Version header which
indicates the version of |cyclus| that the feature will be released with.
Standards Track CEPs without a |cyclus|-Version header indicate
interoperability standards that will initially be supported through
external libraries and tools, and then supplemented by a later CEP to
add support to the standard library. Informational and Process CEPs do
not need a |cyclus|-Version header.

CEPs may have a Requires header, indicating the CEP numbers that this
CEP depends on.

CEPs may also have a Superseded-By header indicating that a CEP has
been rendered obsolete by a later document; the value is the number of
the CEP that replaces the current document.  The newer CEP must have a
Replaces header containing the number of the CEP that it rendered
obsolete.


Auxiliary Files
===============

CEPs may include auxiliary files such as diagrams.  Such files must be
named ``cep-XXXX-Y.ext``, where "XXXX" is the CEP number, "Y" is a
serial number (starting at 1), and "ext" is replaced by the actual
file extension (e.g. "png").


Reporting CEP Bugs, or Submitting CEP Updates
=============================================

How you report a bug, or submit a CEP update depends on several
factors, such as the maturity of the CEP, the preferences of the CEP
author, and the nature of your comments.  For the early draft stages
of the CEP, it's probably best to send your comments and changes
directly to the CEP author.  For more mature, or finished CEPs you may
want to submit corrections to the |cyclus| `issue tracker`_ so that your
changes don't get lost.  If the CEP author is a |cyclus| developer, assign the
bug/patch to them, otherwise assign it to a CEP editor.

When in doubt about where to send your changes, please check first
with the CEP author and/or a CEP editor.

CEP authors with git push privileges for the CEP repository can update the
CEPs themselves by using "git push" to submit their changes.


Transferring CEP Ownership
==========================

It occasionally becomes necessary to transfer ownership of CEPs to a
new champion.  In general, it is preferable to retain the original author as
a co-author of the transferred CEP, but that's really up to the
original author.  A good reason to transfer ownership is because the
original author no longer has the time or interest in updating it or
following through with the CEP process, or has fallen off the face of
the earth (i.e. is unreachable or not responding to email).  A bad
reason to transfer ownership is because the author doesn't agree with the
direction of the CEP.  One aim of the CEP process is to try to build
consensus around a CEP, but if that's not possible, an author can always
submit a competing CEP.

If you are interested in assuming ownership of a CEP, send a message
asking to take over, addressed to both the original author and the |cyclus|
mailing list.  If the original author doesn't respond to
email in a timely manner, the CEP editors will make a unilateral
decision (it's not like such decisions can't be reversed :).


CEP Editor Responsibilities & Workflow
======================================

A CEP editor must subscribe to the |cyclus| development mailing list.  
For each new CEP that comes in an editor does the following:

* Read the CEP to check if it is ready: sound and complete.  The ideas
  must make technical sense, even if they don't seem likely to be
  accepted.

* The title should accurately describe the content.

* Edit the CEP for language (spelling, grammar, sentence structure, etc.).

If the CEP isn't ready, an editor will send it back to the author for
revision, with specific instructions.

Once the CEP is ready for the repository, a CEP editor will:

* Assign a CEP number (almost always just the next available number,
  but sometimes it's a special/joke number, like 666 or 3141).

* Add the CEP to the CEP repository.  

* Commit and push the new (or updated) CEP

* Monitor cyclus.github.com to make sure the CEP gets added to the site
  properly. 

* Send email back to the CEP author with next steps (post to the
  |cyclus| development mailing list).

Many CEPs are written and maintained by developers with write access
to the |cyclus| codebase.  The CEP editors monitor the various repositories
for CEP changes, and correct any structure, grammar, spelling, or
markup mistakes they see.

CEP editors don't pass judgment on CEPs.  They merely do the
administrative & editorial part (which is generally a low volume task).

Document History
================
This document was forked and modified from the `Python Enhancement Proposals
<http://www.python.org/dev/ceps/cep-0001/>`_

This document is released under the CC-BY 3.0 license.

References and Footnotes
========================

.. [1] This historical record is available by the normal git commands
   for retrieving older revisions, and can also be browsed via HTTP here:
   https://github.com/cyclus/cyclus.github.com/tree/source/source/cep

.. _issue tracker:
    https://github.com/cyclus/cyclus

.. _Open Publication License: http://www.opencontent.org/openpub/

.. _reStructuredText: http://docutils.sourceforge.net/rst.html

.. _CEP repository: https://github.com/cyclus/cyclus.github.com/tree/source/source/cep

.. _cyclus-dev: https://groups.google.com/forum/#!forum/cyclus-dev
