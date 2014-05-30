
.. summary Contributing to |Cyclus| 

Guide for Contributing to |Cyclus|
==================================

|cyclus| has a number of projects under its umbrella.  The core |cyclus|
project repository is located at http://github.com/cyclus/cyclus. Additional
projects found at http://github.com/cyclus include :

- Cycamore, the |cyclus| additional module repository
- Cycic, the |cyclus| input controller
- and more to come. 

Although you do not have to register with GitHub to download and edit the
code, if you desire your work to be integrated into the |cyclus| mainline of
development *you must fork the cyclus core repository into your own GitHub
account and submit 'Pull Requests'*. :doc:`Here is a tutorial on getting and
building cyclus.<build_from_source>`

Working on a Topic
---------------------

*Note that "upstream" repository refers to the primary `cyclus/cyclus`
repository.*

You may find or create an issue report in a |cyclus| repository that you would
like to solve. 

You'll first need to fork your repository and create a branch for the topic
you'd like you solve. As you do your development, push only to your own fork.
Make a pull request to the upstream repository (usually the "develop" branch)
only after:

* You have pulled the latest changes from the upstream repository.
* You have completed a logical set of changes.
* |Cyclus| compiles with no errors.
* All tests pass.
* |Cyclus| input files run as expected.
* Your code has been reviewed by another developer.

Code from the "develop" branch generally must pass even more rigorous checks
before being integrated into the "master" branch. Hotfixes would be a
possible exception to this.

Keeping Your Fork Up To Date 
-----------------------------

  * Use a branching workflow similar to the one described at
    http://progit.org/book/ch3-4.html.

  * The "develop" branch is how |cyclus| developers will share (generally
    compilable) progress when we are not yet ready for the code to become
    'production'.

  * Keep your own "master" and "develop" branches in sync with the upstream
    repository's "master" and "develop" branches. The master branch should
    always be the 'stable' or 'production' release of |cyclus|.
    
     - Pull the most recent history from the upstream repository "master"
       and/or "develop" branches before you merge changes into your
       corresponding local branch. Consider doing a rebase pull instead of
       a regular pull or 'fetch and merge'.  For example::

         git checkout develop
         git pull --rebase upstream develop

  * As you do development on topic branches in your own fork, consider
    rebasing the topic branch onto the "master" and/or "develop"  branches
    after *pulls* from the upstream repository rather than merging the pulled
    changes into your branch.  This will help maintain a more linear (and clean)
    history.  *Please see caution about rebasing below*.  For example::

      git checkout [your topic branch]
      git rebase develop

Passing Tests
-------------

To check that your branch passes the tests, you must build and install your topic 
branch and then run the tests built during that process.

For the |cyclus| core, the tests are run using the CyclusUnitTestDriver (at
the moment, ```make test``` is insufficient). For example ::

  mkdir build
  mkdir install
  cd build
  cmake ../src -DCMAKE_INSTALL_PREFIX=../install
  make
  make install
  ../install/cyclus/bin/CyclusUnitTestDriver

In Cycamore, the additional module repository, the tests are run in an exactly  
analogous way, but using the CycamoreUnitTestDriver. For example ::

  mkdir build
  mkdir install
  cd build
  cmake ../src -DCMAKE_INSTALL_PREFIX=../install
  make
  make install
  ../install/cycamore/bin/CycamoreUnitTestDriver

In addition to the CycamoreUnitTestDriver, a suite of input files can be run and 
tested using the run_inputs.py script that is configured, built, and installed 
with Cycamore. It relies on the input files that are part of your Cycamore 
repository, and only succeeds for input files that are correct (some may have 
known issues. See the issue list in Cycamore for details.) To run the example 
input files, ::
  
  python ../install/cycamore/bin/run_inputs.py

Making a Pull Request
----------------------
    
When you are ready to move changes from one of your topic branches into the 
"develop" branch, it must be reviewed and accepted by another developer. 

  - You may want to review this `tutorial
    <https://help.github.com/articles/using-pull-requests/>`_ before you make
    a pull request to the develop branch.

Sometimes, your pull request will be closed by the reviewer until further
changes are made to appease the reviewer's concerns. This may be frustrating,
but please act rationally, discuss the issues on the GitHub space made for
your pull request, consult the `style guide <style_guide>`, email the
developer listhost for further advice, and make changes to your topic branch
accordingly. The pull request will be updated with those changes when you push
them to your fork.  When you think your request is ready for another review,
you can reopen the review yourself with the button made available to you. 

        
Reviewing a Pull Request
----------------------------

  - Build, install, and test it. If you have added the remote repository as 
    a remote you can check it out and merge it with the current develop 
    branch thusly, ::
       
      git checkout -b remote_name/branch_name
      git merge develop

  - Look over the code. 

    - Check that it meets :doc:`our style guidelines <style_guide>`.

    - Make inline review comments concerning improvements. 
      
  - Accept the Pull Request    

    - In general, **every commit** (notice this is not 'every push') to the
      "develop" and "master" branches should compile and pass tests. This
      is guaranteed by using a NON-fast-forward merge during the pull request 
      acceptance process. 
    
    - The green "Merge Pull Request" button does a non-fast-forward merge by 
      default. However, if that button is unavailable, you've made minor 
      local changes to the pulled branch, or you just want to do it from the 
      command line, make sure your merge is a non-fast-forward merge. For example::
          
        git checkout develop
        git merge --no-ff remote_name/branch_name -m "A message""



See also
--------
A good description of a git workflow with good graphics is available at
http://nvie.com/posts/a-successful-git-branching-model/
