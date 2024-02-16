Style Guidelines for Developers
===============================

|cyclus| uses the `Google C++ Style Guide`_ and `Google Python Style Guide`_.
In order to ensure compliance with these styles, we recommend the `Artistic
Style`_ tool with the following `settings`_ located in |cyclus| repo. However,
be wary of applying this tool blindly because it has some `limits and bugs`_.
`Cpplint`_ and `Pylint`_ are other helpful tools to check your code for style
and syntax errors. Unfortunately, these tools may also suffer false positives
and false negatives.

Doxygen Code Documentation
===============================
The definitive documentation of any software is the source code itself.
|cyclus| will relies on Doxygen for automation of rich documentation from
appropriately formatted comments in the source code. Current Doxygen 
documentation can be found online for both `cyclus 
<http://fuelcycle.org/cyclus/api/>`_ and `cycamore 
<http://fuelcycle.org/cycamore/api/>`_.  These pages will be updated nightly.

Documentation is a make target in the CMake build system. Documentation
will automatically be built when you `make all`. You can build only the
documentation by running `make cyclusdoc` instead of `make all` or `make`.


.. _`Google C++ Style Guide`: http://google-styleguide.googlecode.com/svn/trunk/cppguide.xml
.. _`Google Python Style Guide`: http://google-styleguide.googlecode.com/svn/trunk/pyguide.html
.. _`Artistic Style` : http://astyle.sourceforge.net
.. _`settings` : http://github.com/cyclus/cyclus/blob/master/misc/.astylerc
.. _`limits and bugs` : https://sourceforge.net/p/astyle/bugs/
.. _`Cpplint` : http://google-styleguide.googlecode.com/svn/trunk/cpplint/
.. _`Pylint` : http://www.pylint.org/


