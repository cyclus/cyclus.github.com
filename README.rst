
Modifying the Cyclus Website
============================

The site has been created as a Sphinx_ project.  The makefile has been modified
to use the repository's root directory as the site build's root directory.
Please visit the Sphinx_ website if you are unfamiliar with Sphinx projects or
restructuredText_ (the markup language used to construct site content).

Best practice workflow for contributing to site changes
--------------------------------------------------------

#. Clone the `cyclus/cyclus.github.com` repository.

#. Checkout the `source` branch

#. Create a branch in which to make changes

   ```git checkout -b my_web_changes source```

#. Modify the source `rst` files (using the restructuredText_ markup
   language) in branch `my_web_changes` as desired.

#. Type `make gh-preview` in the root directory of the repository.
   This will put the built pages in directory `gh-build` for your
   review.  You can open them directly in your favorite web browser.

#. Inspect the html files that correspond with your changes.

#. When satisfied commit your changes to the `rst` files to the `my_web_changes` branch

#. Push the `my_web_changes` branch to `cyclus/cyclus.github.com`.  Be
   sure to synchronize with any possible changes to the `source`
   branch first.

     ```
     git fetch upstream
     git rebase upstream/source
     git push upstream add_some_info
     ```

#. Issue a pull request against the `source` branch.

Best practice for managing a pull request
------------------------------------------

#. Synchronize your clone of `cyclus/cyclus.github.com` with the remote repo

     ```git fetch upstream```

#. Checkout the `pull_request_branch`

     ```git checkout -b pull_request_branch upstream/pull_request_branch```

#. Test the changes by using the `gh-preview` target

    ```make gh-preview```

   This will build a version of the site in the `gh-build` directory in
   your branch, `pull_request_branch`.  You can load it directly in a
   local browser.

#. If satisfied, merge the `pull_request_branch` into the `source`
   branch.  Be sure to synchronize with the remote repo first.

     ```
     git checkout source
     git fetch upstream
     git rebase upstream/source
     git merge pull_request_branch
     ```

#. If there are no conflicts, push this to the repo

     ```git push upstream source```

#. Republish the pages with the `gh-publish` target.

     ```make gh-publish```

#. Visit http://cyclus.github.com to inspect your work online.

.. _Sphinx: http://sphinx.pocoo.org/

.. _restructuredText: http://sphinx.pocoo.org/

Thou Shalt Not
--------------

* Thou shalt not modify any files outside the `source` branch.  The
  only exception to this rule is `README.rst` (this file) or the
  `Makefile` for advanced users. 

* Thou shalt not push any site build changes to the `cyclus/cyclus.github.com`
  repository without first having inspected the newly built html pages that
  correspond with your changes.
