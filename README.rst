
Modifying the Cyclus Website
============================

The site has been created as a Sphinx_ project.  The makefile has been modified
to use the repository's root directory as the site build's root directory.
Please visit the Sphinx_ website if you are unfamiliar with Sphinx projects or
restructuredText (the markup language used to construct site content).

A brief summary of how to modify the website:

#. Clone the `cyclus/cyclus.github.com` repository.

#. Modify the source `rst` files (using the restructuredText markup language)
   in the repository's `source` directory as desired.

#. Commit your changes to the `rst` files.

#. Type `make html` in the root directory of the repository.

#. Inspect the html files that correspond with your changes.

#. Type `git add .` in the root directory of the repository and commit the site
   build changes.

#. Push changes to the `cyclus/cyclus.github.com` repository.

#. Visit http://cyclus.github.com to inspect your work online.

.. _Sphinx: http://sphinx.pocoo.org/

.. _restructuredText: http://sphinx.pocoo.org/

Thou Shalt Not
--------------

* Thou shalt not modify any files outside the `source` directory.  Note that `source`
  is different than `sources`.  The only exception to this rule is `README.rst`
  (this file).

* Thou shalt not modify files in the `sources` directory.

* Thou shalt not commit site build changes (i.e. after running `make html`)
  together with changes to the site's source `rst` files in any single commit.

* Thou shalt not push any site build changes to the `cyclus/cyclus.github.com`
  repository without first having inspected the newly built html pages that
  correspond with your changes.
