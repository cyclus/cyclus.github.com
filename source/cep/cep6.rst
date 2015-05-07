CEP 6 - Cyclus Pull Request Style Guide 
**************************************************************

:CEP: 6
:Title: |Cyclus| Pull Request Style Guide 
:Last-Modified: 2015-05-04
:Author: Matthew Gidden
:Status: Draft
:Type: Process
:Created: 2015-05-04

Abstract
========

There is a strong motivation for summarizing and enumerating feature additions,
bug fixes, and other changes to the code base. Through use of an agreed-upon
format and style, tools for aggregating and categorizing changes can be
developed. While this strategy may be applied to issues, this CEP is related to
pull requests (PRs) only.

A canoncial class of top-level labels is proposed. The purpose of these labels
is to broadly categorize additions to the code base. Then, a minimum style guide
is proposed to provide a known, queryable structure to the body of each pull
request.

Labels
=======

Every PR must be assigned at least one label from the following set:

- Major Feature
- Minor Feature
- Bug Fix
- Other

A major feature is likely to be highlighted in subsequent release notes, whereas
a minor feature may either not be listed or listed separately.

It may have any number of other descriptive labels. A PR is considered blocked
if it does not have one of the above labels.

Layout
=======

Any PR must have, at minimum, a succinct summary of its associated changes. This
summary must be present at the top of the PR body and must be followed by a new
line. A PR is considered blocked if it does comply with this structure.

Any additional structure, while clarifying, is optional.

Example
-------

The following provides an example of the raw markdown associated with an
existing `PR <https://github.com/cyclus/cyclus/pull/1127>`_::

    Added simple buy and sell inventory policies

    Detail
    ======
    Inventory policies were added that automate simplistic interactions with the
    DRE. Each policy is assigned to a `ResBuf` instance and implements the `Trader`
    interface. They can be initialized with information regarding the commodities to
    be bought or sold as well as a maximum per-timestep throughput. Purchasing
    inventory policies also support `(S, s)` behavior, noted in supply chain literature. [1]

    [1] Zheng, Yu-Sheng. "A simple proof for optimality of (s, S) policies in
    infinite-horizon inventory systems." Journal of Applied Probability
    (1991): 802-810.

    Related Issues
    ==============
    * closes #1047
    * related to cyclus/cycamore#318

Automation
==========

Using the Github `API <https://developer.github.com/v3/>`_ either directly or
through a module like `github3.py
<https://github3py.readthedocs.org/en/master/>`_ in conjunction with a standard
style can allow for the automation of otherwise repetitive and time consuming
tasks. A chief use case is the generation of release notes. Specifically, if
every PR that enables a major and minor feature can be identified and
a summary statement extracted, then the task of writing release notes becomes
much simpler. This proposal enables such tools to be constructed and utilized.

Backwards Compatability
=======================

Closed PRs are archival documents whereas a codebase is a living
"document". Accordingly, while one would expect a code style guide to be
applicable upon acceptance to the entire code base, this style guide to only be
applicable to open PRs. Closed PR text is not allowed to be updated
again. Additional comments on closed PRs encouraged as they are needed.

Document History
================

This document is released under the CC-BY 3.0 license.

.. _syntax: https://help.github.com/articles/github-flavored-markdown/