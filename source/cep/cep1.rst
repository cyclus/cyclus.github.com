CEP 1 - CEP Purpose and Guidelines
**********************************

:CEP: 1
:Title: CEP Purpose and Guidelines
:Last-Modified: 2013-07-03
:Author: Anthony Scopatz
:Status: Active
:Type: Process
:Created: 2013-07-03
:Post-History: 2013-07-03

What is a CEP?
==============

CEP stands for Python Enhancement Proposal.  A CEP is a design
document providing information to the Python community, or describing
a new feature for Python or its processes or environment.  The CEP
should provide a concise technical specification of the feature and a
rationale for the feature.

We intend CEPs to be the primary mechanisms for proposing major new
features, for collecting community input on an issue, and for
documenting the design decisions that have gone into Python.  The CEP
author is responsible for building consensus within the community and
documenting dissenting opinions.

Because the CEPs are maintained as text files in a versioned
repository, their revision history is the historical record of the
feature proposal [1]_.


CEP Types
=========

There are three kinds of CEP:

1. A **Standards Track** CEP describes a new feature or implementation
   for Python. It may also describe an interoperability standard that will
   be supported outside the standard library for current Python versions
   before a subsequent CEP adds standard library support in a future
   version.

2. An **Informational** CEP describes a Python design issue, or
   provides general guidelines or information to the Python community,
   but does not propose a new feature.  Informational CEPs do not
   necessarily represent a Python community consensus or
   recommendation, so users and implementers are free to ignore
   Informational CEPs or follow their advice.

3. A **Process** CEP describes a process surrounding Python, or
   proposes a change to (or an event in) a process.  Process CEPs are
   like Standards Track CEPs but apply to areas other than the Python
   language itself.  They may propose an implementation, but not to
   Python's codebase; they often require community consensus; unlike
   Informational CEPs, they are more than recommendations, and users
   are typically not free to ignore them.  Examples include
   procedures, guidelines, changes to the decision-making process, and
   changes to the tools or environment used in Python development.
   Any meta-CEP is also considered a Process CEP.


CEP Workflow
============


Python's BDFL
-------------

There are several reference in this CEP to the "BDFL". This acronym stands
for "Benevolent Dictator for Life" and refers to Guido van Rossum, the
original creator of, and the final design authority for, the Python
programming language.


CEP Editors
-----------

The CEP editors are individuals responsible for managing the administrative
and editorial aspects of the CEP workflow (e.g. assigning CEP numbers and
changing their status).  See `CEP Editor Responsibilities & Workflow`_ for
details.  The current editors are:

* Anthony Baxter
* Georg Brandl
* Brett Cannon
* David Goodger
* Jesse Noller
* Guido van Rossum
* Barry Warsaw

CEP editorship is by invitation of the current editors.  The address
<peps@python.org> is a mailing list for contacting the CEP editors.  All
email related to CEP administration (such as requesting a CEP number
or providing an updated version of a CEP for posting) should be sent to
this address (no cross-posting please).


Submitting a CEP
----------------

The CEP process begins with a new idea for Python.  It is highly
recommended that a single CEP contain a single key proposal or new
idea. Small enhancements or patches often don't need
a CEP and can be injected into the Python development workflow with a
patch submission to the Python `issue tracker`_. The more focused the
CEP, the more successful it tends to be.  The CEP editors reserve the
right to reject CEP proposals if they appear too unfocused or too
broad.  If in doubt, split your CEP into several well-focused ones.

Each CEP must have a champion -- someone who writes the CEP using the
style and format described below, shepherds the discussions in the
appropriate forums, and attempts to build community consensus around
the idea.  The CEP champion (a.k.a. Author) should first attempt to
ascertain whether the idea is CEP-able.  Posting to the
comp.lang.python newsgroup (a.k.a. python-list@python.org mailing
list) or the python-ideas mailing list is the best way to go about this.

Vetting an idea publicly before going as far as writing a CEP is meant
to save the potential author time. Many ideas have been brought
forward for changing Python that have been rejected for various
reasons. Asking the Python community first if an idea is original
helps prevent too much time being spent on something that is
guaranteed to be rejected based on prior discussions (searching
the internet does not always do the trick). It also helps to make sure
the idea is applicable to the entire community and not just the author.
Just because an idea sounds good to the author does not
mean it will work for most people in most areas where Python is used.

Once the champion has asked the Python community as to whether an
idea has any chance of acceptance, a draft CEP should be presented to
python-ideas.  This gives the author a chance to flesh out the draft
CEP to make properly formatted, of high quality, and to address
initial concerns about the proposal.

Following a discussion on python-ideas, the proposal should be sent as a
draft CEP to the CEP editors <peps@python.org>.  The draft must be written
in CEP style as described below, else it will be sent back without further
regard until proper formatting rules are followed (although minor errors
will be corrected by the editors).

If the CEP editors approve, they will assign the CEP a number, label it
as Standards Track, Informational, or Process, give it status "Draft",
and create and check-in the initial draft of the CEP.  The CEP editors
will not unreasonably deny a CEP.  Reasons for denying CEP status
include duplication of effort, being technically unsound, not
providing proper motivation or addressing backwards compatibility, or
not in keeping with the Python philosophy.  The BDFL can be consulted
during the approval phase, and is the final arbiter of the draft's
CEP-ability.

Developers with hg push privileges for the `CEP repository`_ may claim
CEP numbers directly by creating and committing a new CEP. When doing so,
the developer must handle the tasks that would normally be taken care of by
the CEP editors (see `CEP Editor Responsibilities & Workflow`_). This
includes ensuring the initial version meets the expected standards for
submitting a CEP. Alternately, even developers may choose to submit CEPs
through the CEP editors. When doing so, let the CEP editors know you have
hg push privileges and they can guide you through the process of updating
the CEP repository directly.

As updates are necessary, the CEP author can check in new versions if they
(or a collaborating developer) have hg push privileges, or else they can
email new CEP versions to the CEP editors for publication.

After a CEP number has been assigned, a draft CEP may be discussed further on
python-ideas (getting a CEP number assigned early can be useful for ease of
reference, especially when multiple draft CEPs are being considered at the
same time). Eventually, all Standards Track CEPs must  be sent to the
`python-dev list <mailto:python-dev@python.org>`__ for review as described
in the next section.

Standards Track CEPs consist of two parts, a design document and a
reference implementation.  It is generally recommended that at least a
prototype implementation be co-developed with the CEP, as ideas that sound
good in principle sometimes turn out to be impractical when subjected to the
test of implementation.

CEP authors are responsible for collecting community feedback on a CEP
before submitting it for review. However, wherever possible, long
open-ended discussions on public mailing lists should be avoided.
Strategies to keep the discussions efficient include: setting up a
separate SIG mailing list for the topic, having the CEP author accept
private comments in the early design phases, setting up a wiki page, etc.
CEP authors should use their discretion here.


CEP Review & Resolution
-----------------------

Once the authors have completed a CEP, they may request a review for
style and consistency from the CEP editors.  However, the content and
final acceptance of the CEP must be requested of the BDFL, usually via
an email to the python-dev mailing list.  CEPs are reviewed by the
BDFL and his chosen consultants, who may accept or reject a CEP or
send it back to the author(s) for revision.  For a CEP that is
predetermined to be acceptable (e.g., it is an obvious win as-is
and/or its implementation has already been checked in) the BDFL may
also initiate a CEP review, first notifying the CEP author(s) and
giving them a chance to make revisions.

The final authority for CEP approval is the BDFL. However, whenever a new
CEP is put forward, any core developer that believes they are suitably
experienced to make the final decision on that CEP may offer to serve as
the BDFL's delegate (or "CEP czar") for that CEP. If their self-nomination
is accepted by the other core developers and the BDFL, then they will have
the authority to approve (or reject) that CEP. This process happens most
frequently with CEPs where the BDFL has granted in principle approval for
*something* to be done, but there are details that need to be worked out
before the CEP can be accepted.

If the final decision on a CEP is to be made by a delegate rather than
directly by the BDFL, this will be recorded by including the
"BDFL-Delegate" header in the CEP.

CEP review and resolution may also occur on a list other than python-dev
(for example, distutils-sig for packaging related CEPs that don't
immediately affect the standard library). In this case, the "Discussions-To"
heading in the CEP will identify the appropriate alternative list where
discussion, review and pronouncement on the CEP will occur.

For a CEP to be accepted it must meet certain minimum criteria.  It
must be a clear and complete description of the proposed enhancement.
The enhancement must represent a net improvement.  The proposed
implementation, if applicable, must be solid and must not complicate
the interpreter unduly.  Finally, a proposed enhancement must be
"pythonic" in order to be accepted by the BDFL.  (However, "pythonic"
is an imprecise term; it may be defined as whatever is acceptable to
the BDFL.  This logic is intentionally circular.)  See CEP 2 [2]_ for
standard library module acceptance criteria.

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
in the python-dev mailing list archives.

CEPs can also be superseded by a different CEP, rendering the original
obsolete.  This is intended for Informational CEPs, where version 2 of
an API can replace version 1.

The possible paths of the status of CEPs are as follows:

.. image:: pep-0001-1.png

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

1. Preamble -- RFC 822 style headers containing meta-data about the
   CEP, including the CEP number, a short descriptive title (limited
   to a maximum of 44 characters), the names, and optionally the
   contact info for each author, etc.

2. Abstract -- a short (~200 word) description of the technical issue
   being addressed.

3. Copyright/public domain -- Each CEP must either be explicitly
   labeled as placed in the public domain (see this CEP as an
   example) or licensed under the `Open Publication License`_.

4. Specification -- The technical specification should describe the
   syntax and semantics of any new language feature.  The
   specification should be detailed enough to allow competing,
   interoperable implementations for at least the current major Python
   platforms (CPython, Jython, IronPython, PyPy).

5. Motivation -- The motivation is critical for CEPs that want to
   change the Python language.  It should clearly explain why the
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

7. Backwards Compatibility -- All CEPs that introduce backwards
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
   appropriate for either the Python language reference or the
   standard library reference.


CEP Formats and Templates
=========================

There are two CEP formats available to authors: plaintext and
reStructuredText_.  Both are UTF-8-encoded text files.

Plaintext CEPs are written with minimal structural markup that adheres
to a rigid style.  CEP 9 contains a instructions and a template [3]_
you can use to get started writing your plaintext CEP.

ReStructuredText_ CEPs allow for rich markup that is still quite easy
to read, but results in much better-looking and more functional HTML.
CEP 12 contains instructions and a template [4]_ for reStructuredText
CEPs.

There is a Python script that converts both styles of CEPs to HTML for
viewing on the web [5]_.  Parsing and conversion of plaintext CEPs is
self-contained within the script.  reStructuredText CEPs are parsed
and converted by Docutils_ code called from the script.


CEP Header Preamble
===================

Each CEP must begin with an RFC 822 style header preamble.  The headers
must appear in the following order.  Headers marked with "*" are
optional and are described below.  All other headers are required. ::

    CEP: <pep number>
    Title: <pep title>
    Version: <version string>
    Last-Modified: <date string>
    Author: <list of authors' real names and optionally, email addrs>
  * BDFL-Delegate: <CEP czar's real name>
  * Discussions-To: <email address>
    Status: <Draft | Active | Accepted | Deferred | Rejected |
             Withdrawn | Final | Superseded>
    Type: <Standards Track | Informational | Process>
  * Content-Type: <text/plain | text/x-rst>
  * Requires: <pep numbers>
    Created: <date created on, in dd-mmm-yyyy format>
  * Python-Version: <version number>
    Post-History: <dates of postings to python-list and python-dev>
  * Replaces: <pep number>
  * Superseded-By: <pep number>
  * Resolution: <url>

The Author header lists the names, and optionally the email addresses
of all the authors/owners of the CEP.  The format of the Author header
value must be

    Random J. User <address@dom.ain>

if the email address is included, and just

    Random J. User

if the address is not given.  For historical reasons the format
"address@dom.ain (Random J. User)" may appear in a CEP, however new
CEPs must use the mandated format above, and it is acceptable to
change to this format when CEPs are updated.

If there are multiple authors, each should be on a separate line
following RFC 2822 continuation line conventions.  Note that personal
email addresses in CEPs will be obscured as a defense against spam
harvesters.

The BDFL-Delegate field is used to record cases where the final decision to
approve or reject a CEP rests with someone other than the BDFL. (The
delegate's email address is currently omitted due to a limitation in the
email address masking for reStructuredText CEPs)

*Note: The Resolution header is required for Standards Track CEPs
only.  It contains a URL that should point to an email message or
other web resource where the pronouncement about the CEP is made.*

For a CEP where final pronouncement will be made on a list other than
python-dev, a Discussions-To header will indicate the mailing list
or URL where the pronouncement will occur. A temporary Discussions-To header
may also be used when a draft CEP is being discussed prior to submission for
pronouncement. No Discussions-To header is necessary if the CEP is being
discussed privately with the author, or on the python-list, python-ideas
or python-dev mailing lists.  Note that email addresses in the
Discussions-To header will not be obscured.

The Type header specifies the type of CEP: Standards Track,
Informational, or Process.

The format of a CEP is specified with a Content-Type header.  The
acceptable values are "text/plain" for plaintext CEPs (see CEP 9 [3]_)
and "text/x-rst" for reStructuredText CEPs (see CEP 12 [4]_).
Plaintext ("text/plain") is the default if no Content-Type header is
present.

The Created header records the date that the CEP was assigned a
number, while Post-History is used to record the dates of when new
versions of the CEP are posted to python-list and/or python-dev.  Both
headers should be in dd-mmm-yyyy format, e.g. 14-Aug-2001.

Standards Track CEPs will typically have a Python-Version header which
indicates the version of Python that the feature will be released with.
Standards Track CEPs without a Python-Version header indicate
interoperability standards that will initially be supported through
external libraries and tools, and then supplemented by a later CEP to
add support to the standard library. Informational and Process CEPs do
not need a Python-Version header.

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
named ``pep-XXXX-Y.ext``, where "XXXX" is the CEP number, "Y" is a
serial number (starting at 1), and "ext" is replaced by the actual
file extension (e.g. "png").


Reporting CEP Bugs, or Submitting CEP Updates
=============================================

How you report a bug, or submit a CEP update depends on several
factors, such as the maturity of the CEP, the preferences of the CEP
author, and the nature of your comments.  For the early draft stages
of the CEP, it's probably best to send your comments and changes
directly to the CEP author.  For more mature, or finished CEPs you may
want to submit corrections to the Python `issue tracker`_ so that your
changes don't get lost.  If the CEP author is a Python developer, assign the
bug/patch to them, otherwise assign it to a CEP editor.

When in doubt about where to send your changes, please check first
with the CEP author and/or a CEP editor.

CEP authors with hg push privileges for the CEP repository can update the
CEPs themselves by using "hg push" to submit their changes.


Transferring CEP Ownership
==========================

It occasionally becomes necessary to transfer ownership of CEPs to a
new champion.  In general, it is preferable to retain the original author as
a co-author of the transferred CEP, but that's really up to the
original author.  A good reason to transfer ownership is because the
original author no longer has the time or interest in updating it or
following through with the CEP process, or has fallen off the face of
the 'net (i.e. is unreachable or not responding to email).  A bad
reason to transfer ownership is because the author doesn't agree with the
direction of the CEP.  One aim of the CEP process is to try to build
consensus around a CEP, but if that's not possible, an author can always
submit a competing CEP.

If you are interested in assuming ownership of a CEP, send a message
asking to take over, addressed to both the original author and the CEP
editors <peps@python.org>.  If the original author doesn't respond to
email in a timely manner, the CEP editors will make a unilateral
decision (it's not like such decisions can't be reversed :).


CEP Editor Responsibilities & Workflow
======================================

A CEP editor must subscribe to the <peps@python.org> list.  All
correspondence related to CEP administration should be sent (or forwarded) to
<peps@python.org> (but please do not cross-post!).

For each new CEP that comes in an editor does the following:

* Read the CEP to check if it is ready: sound and complete.  The ideas
  must make technical sense, even if they don't seem likely to be
  accepted.

* The title should accurately describe the content.

* Edit the CEP for language (spelling, grammar, sentence structure,
  etc.), markup (for reST CEPs), code style (examples should match CEP
  8 & 7).

If the CEP isn't ready, an editor will send it back to the author for
revision, with specific instructions.

Once the CEP is ready for the repository, a CEP editor will:

* Assign a CEP number (almost always just the next available number,
  but sometimes it's a special/joke number, like 666 or 3141).
  (Clarification: For Python 3, numbers in the 3000s were used for
  Py3k-specific proposals.  But now that all new features go into
  Python 3 only, the process is back to using numbers in the 100s again.
  Remember that numbers below 100 are meta-CEPs.)

* Add the CEP to a local clone of the CEP repository.  For mercurial workflow
  instructions, follow `The Python Developers Guide <http://docs.python.org/devguide>`_

  The mercurial repo for the peps is::

    http://hg.python.org/peps/

* Run ``./genpepindex.py`` and ``./pep2html.py <CEP Number>`` to ensure they
  are generated without errors. If either triggers errors, then the web site
  will not be updated to reflect the CEP changes.

* Commit and push the new (or updated) CEP

* Monitor python.org to make sure the CEP gets added to the site
  properly. If it fails to appear, running ``make`` will build all of the
  current CEPs. If any of these are triggering errors, they must be
  corrected before any CEP will update on the site.

* Send email back to the CEP author with next steps (post to
  python-list & -dev).

Updates to existing CEPs also come in to peps@python.org.  Many CEP
authors are not Python committers yet, so CEP editors do the commits for them.

Many CEPs are written and maintained by developers with write access
to the Python codebase.  The CEP editors monitor the python-checkins
list for CEP changes, and correct any structure, grammar, spelling, or
markup mistakes they see.

CEP editors don't pass judgment on CEPs.  They merely do the
administrative & editorial part (which is generally a low volume task).

Resources:

* `Index of Python Enhancement Proposals <http://www.python.org/dev/peps/>`_

* `Following Python's Development
  <http://docs.python.org/devguide/communication.html>`_

* `Python Developer's Guide <http://docs.python.org/devguide/>`_

* `Frequently Asked Questions for Developers
  <http://docs.python.org/devguide/faq.html>`_

Document History
================
This document was forked and modified from the `Python Enhancement Propoosals
<http://www.python.org/dev/peps/pep-0001/>`_

References and Footnotes
========================

.. [1] This historical record is available by the normal git commands
   for retrieving older revisions, and can also be browsed via HTTP here:
   https://github.com/cyclus/cyclus.github.com/tree/source/source/cep

.. [2] CEP 2, Procedure for Adding New Modules, Faassen
   (http://www.python.org/dev/peps/pep-0002)

.. [3] CEP 9, Sample Plaintext CEP Template, Warsaw
   (http://www.python.org/dev/peps/pep-0009)

.. [4] CEP 12, Sample reStructuredText CEP Template, Goodger, Warsaw
   (http://www.python.org/dev/peps/pep-0012)

.. [5] The script referred to here is pep2pyramid.py, the successor to
   pep2html.py, both of which live in the same directory in the hg
   repo as the CEPs themselves.  Try ``pep2html.py --help`` for
   details.  The URL for viewing CEPs on the web is
   http://www.python.org/dev/peps/.

.. _issue tracker:
    https://github.com/cyclus/cyclus

.. _Open Publication License: http://www.opencontent.org/openpub/

.. _reStructuredText: http://docutils.sourceforge.net/rst.html

.. _Docutils: http://docutils.sourceforge.net/

.. _CEP repository: https://github.com/cyclus/cyclus.github.com/tree/source/source/cep


