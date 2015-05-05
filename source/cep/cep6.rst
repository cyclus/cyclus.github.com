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

All accepted pull requests (PRs) must have a reasonable description of their
purpose. Requiring a consistent format across projects for each PR
description assists in their review and allows for certain summary automation. A
specific use case regards the generation of release notes.

Release notes require a summary of each major feature addition to the code base,
each of which is required to go through a PR. If a consistent style
guide is adopted that requires the notation of major features with a short
summary, the reporting of each major feature can be both automated and remain
true to the author's original description.

Overview
========

The goal of this document is to define a minimum uniform style for pull
requests. Having a uniform style will aide in the timely review of PRs as all
reviewers can expect standard information. Furthermore, given a uniform style,
automated tools can be developed that assist in other managerial tasks. 

Github supports its own version of a flavored markdown `syntax`_. That syntax is
expected to be used in the body of each PR.

Labels
=======

Every PR must be assigned one label from the following set:

- Major Feature
- Minor Feature
- Bug Fix
- Other

A PR must have one and only one of the above labels. It may have any number of
other descriptive labels. A PR is considered blocked if it does not have one of
the above labels.

Layout
=======

The body of every PR is expected to have three top-level sections:

- Summary
- Detail (see below)
- Related Issues

Summary
-------

Every PR must have a succinct summary of its associated changes. The summary may
not be more than one sentence. The summary should be treated as if it were read
as a line in the patch notes.

Detail
------

For any *non-trivial* PR, a section explaining its purpose in more detail is
required. A description should be provided of why the change is
necessary. Discretion is provided to the reviewer of the PR if there is
disagreement regarding the triviality of a PR.

Related Issues
--------------

All related issues should be listed. If the PR fixes an issue, that should be
noted.

Example
-------

The following provides an example of the raw markdown associated with an
existing `PR <https://github.com/cyclus/cyclus/pull/1127>`_::

    Summary
    =======
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


Document History
================

This document is released under the CC-BY 3.0 license.

.. _syntax: https://help.github.com/articles/github-flavored-markdown/