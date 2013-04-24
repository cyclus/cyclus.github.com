
Modifying the Cyclus Website
============================

The site has been created as a Sphinx_ project.  The makefile has been modified
to use the repository's root directory as the site build's root directory.
Please visit the Sphinx_ website if you are unfamiliar with Sphinx projects or
restructuredText (the markup language used to construct site content).

A brief summary of how to modify the website:

#. Clone the `cyclus/cyclus.github.com` repository.

#. Checkout the `source` branch 

#. Modify the source `rst` files (using the restructuredText markup language)
   in the repository's `source` directory as desired.

#. Commit your changes to the `source` branch

#. Type `make gh-preview` in the root directory of the repository.  This will leave you in the `master` branch with the newly built HTML pages

#. Inspect the html files that correspond with your changes.

#. Type `make gh-push` in the root directory of the `master` branch to commit the site build changes.

#. Checkout the `source` branch and push changes to the `cyclus/cyclus.github.com` repository.

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
