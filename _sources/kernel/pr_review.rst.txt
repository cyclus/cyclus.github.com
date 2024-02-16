
.. summary reviewing pull requests 

Guide for Reviewing Pull Requests
==================================

|cyclus| depends on a community of contributors.  Bug fixes and new features
(and archetypes!) are added by submitting a pull request on github.  The new
code is then reviewed by other |cyclus| developers to confirm that the code
meets all requirements for style and stability before being added to the code
base.  You do not need to be an expert  |cyclus| developer to contribute by
reviewing pull requests! In fact, reviewing other people's code is a great way
to learn the code base! Below we offer a rough guide to how to review a pull
request.

Maintaining a Collegial Atmosphere
-----------------------------------

A collegial (as opposed to an adversarial) atmosphere is critical to the success
of an open-source software project.  Imagine how it will feel for a new
person to appear out of the blue wanting to contribute to Cyclus. Let’s not
drive them away!

* Contributing is ideally all rainbows and butterflies (only positive
  interactions)
* Thank people for contributing
* Timely feedback engenders enthusiasm and future contributions
* There is no need for adversarial comments, even (especially) when there is
  disagreement
* We never know who may be lurking and thinking about contributing in the future
* To understand what makes good and bad communities, follow or contribute to
  other open-source projects

  
Should I Review This Pull Request (PR)?
---------------------------------------
Am I ready to do a review on my own?

* It’s ok for multiple people to review PRs, so don’t feel like you can’t
  review if someone else already is
*  Take responsibility for your reviewing - do not expect that someone else
   will re-review YOUR review
* If you are not 100% comfortable, then complete your review and say “I have
  completed my review and will merge this in 2 days if there are no further
  comments.” This gives more experienced reviewers the opportunity to look at
  it if they choose to
*   A good exercise for learning your way around the code base is to start from
    cyclus.cc and follow the trail of code execution as a simulation is
    initialized and executed - to get a rough sort of callgraph in your head

How do I feel about the purpose of this PR?

* I like it/am interested: Do the review
* Don’t care: Still do the review
* I dislike it/disagree with it:  Initiate a broader discussion about whether
  the PR is appropriate
 
	
Start Reviews by Looking for Hard Stops
---------------------------------------

Start a review with the obvious stuff, so that if there are major problems then
the coder can fix them before you do the detailed review:

* Does it pass
  `continuous integration <http://cyclus-ci.fuelcycle.org/dashboard>`_ tests (CI)?
* Does it build and pass tests on my machine? (ie. nosetests, cyclus_unit_tests)
* Have new unit tests been added to confirm the functionality of the proposed
  change? 
* Does it adhere to the style guide?
* Is there documentation explaining the new features? (Sometimes documentation
  will need to be added to both the code itself and the cyclus website,
  especially in the case of new tools for developers to use. Then you should
  expect to see two pull requests)
* Can I understand what is being changed right away by looking at the
  documentation and the API, or from just the new tests?


Do I understand why this PR is being added?

* Do not merge code you do not understand; instead, use the API to figure out
  what the code is doing
* Never assume the person who opened the PR knew what they were doing
* If you still can’t figure it out - put inline comment to ask why it is done
  this way
* Fixing bugs should always take precedence over adding features
* Feature PRs should have a much higher standard to be merged


	
Getting Into The Details
------------------------
Does the general use case for this PR match its API and implementation?

* Imagine there are two approaches to solving the problem: if option A was
  chosen, what was option B and why is A the preferred option.  The chosen
  option should balance performance with the use-case most likely to come up
* For example, bitwise operations are very confusing (but are very fast).  If
  you don’t need it for performance, readability and clarity are more important
* The majority of the Cyclus code base should be easier to read/maintain rather
  than faster in the absence of concrete need for speed
  
Is there sufficient test coverage (more than just "are there tests")?

* Start with tests - if there are insufficient tests then you should not do the
  code review until the tests are added
* If there are enough tests then they can show the reviewer what the goal of
  the PR is
* In most cases, every line of code should be tested (except for test code,
  which would be infinitely recursive), but not necessarily every code pathway
  (not every combination must be tested)
* If there is a conditional code, there should be tests for both outcomes of
  the conditional
* If there are very obscure corner-case tests that are missing, do not close
  the pull request      
  
Is there a reasonable use case that would fail given this implementation?

* Make sure you can’t think of a way to make the code fail. If you can, there
  needs to be a test for this, and there likely needs to be a code modification
* This is most likely to occur in a PR with very few tests (writing the tests
  naturally help the coder to identify many of these cases)
  
Is the code implemented cleanly?

* Are there "easy" optimizations (e.g. variable allocation outside of a well-
  used loop)?
* Are the data structures you’re using the right ones? (ie. sets have unique
  elements while vectors have ordered elements)
* For loops vs while loops
* Premature optimization is not always good (you don’t know *a priori* where
  the sticking points will be, and optimization often reduces maintainability)



More Best Practices
-------------------
Cover the full gamut of `Software Carpentry <https://software-carpentry.org>`_
best practices. And remember:

* Is there sufficient documentation?
* Style Guide adherence is not a personal critique.  It is designed to keep
  code maintainable.  Don’t be offended.  Everyone hates something in the style
  guide, but a common standard is necessary
* Google C++ style guide says Never Abbreviate. Cyclus has historical reasons
  for some abbreviations, but new abbreviations are strongly discouraged absent
  justification
* Communally agreed upon departures from the existing style guide should be
  documented


Remember, if there is *anything* in the pull request that you don't understand,
don't merge it!  Educate yourself using the API docs, ask questions, or request
an explanation from the coder.


