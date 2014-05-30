Building |Cyclus| With Conda
----------------------------------------------------------------

The process of building Conda packages involves a system called 
`Conda Recipes <http://conda.pydata.org/docs/build.html>`_ . A Conda Recipe 
is a directory containing at least two files, meta.yaml and build.sh.
Version information, build and run dependencies, the location of the source 
code, and other information about the package are stored in meta.yaml, while 
build.sh contains a script to build from source. Packages are built from 
recipes using the ``conda build <recipe dir>`` command. Necessary dependency 
packages will be automatically downloaded and installed before the build.sh 
script is run and installed.  The final output is a tar.bz2 file which is a 
Conda package containing the necessary binaries, libraries, etc.  This package 
can then be installed or can be uploaded to `Binstar <http://binstar.org>`_, 
which is a service provided to store and distribute Conda packages. Notice 
that Conda requires all dependencies explicitly listed in meta.yaml must have 
an available Conda package to install. 


All associated Conda recipes can be found in the 
`Ciclus Repo <http://github.com/cyclus/ciclus>`_. As part of installing and 
maintaining |Cyclus| with Conda, recipes for a number of dependencies have 
also been created.  All lowercase directories in this repo (except fetch) are 
Conda recipes.  Additionally, this repo contains a stock ``.condarc`` file
which automatically points to the 
|Cyclus| `Binstar Account <http://binstar.org/cyclus>`_. 


------------------------------------------------------------------
How to work with Conda
------------------------------------------------------------------
There are many ways to customize the files in Ciclus repo.

1) Push a package to Binstar Once you have successfully built a Conda recipe,
it can be uploaded to Binstar with the command ::

   binstar upload -u cyclus anaconda/conda-bld/linux-64/cyclus-<VERSION>.tar.bz2

So, for instance, uploading version 1.0 of |Cyclus| would be ::

   binstar upload -u cyclus anaconda/conda-bld/linux-64/cyclus-1.0.tar.bz2


2) **Change the repository  to build:** Say you want to test your fork of |Cyclus|
before making a pull request. To customize what repos |Cyclus| and Cycamore
are pulled from, look in ``cyclus/meta.yaml`` and ``cycamore/meta.yaml``
respectively.  In these files you can change the ``git_url`` field to point to
the repo of your choice.

3) **Change the branch to build:** In ``cyclus/meta.yaml`` (or Cycamore), alter the
``git_tag`` field to the branch or tag you want to use.

4) **Test a new build process for Cyclus and Cycamore:** To alter |Cyclus| or
Cycamore's build process, look at ``build.sh`` in |Cyclus| or Cycamore
respectively. 

5) **Create/upload a new version of a dependency:** Alter the dependency's
``meta.yaml`` file to point to the correct version of dependency source code.
Build the package, follow instructions in 1 to upload to Binstar.

.. _`Cyclus Homepage`: http://cyclus.github.com
