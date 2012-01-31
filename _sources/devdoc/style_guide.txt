
.. summary Style Guidelines for cyclus developers

Style Guidelines for Developers
===============================

The purpose of this page is to introduce some general style guidelines to help
with readability, maintainability and extensibility of the cyclus code base.


Class File Organization
-----------------------


Class header files should be organized in the following order:

  * private

    * methods

      * virtual
      * static
      * non-static

    * data members

      * static
      * non-static

  * protected (in same order as above)
  * public (in same order as above)

Within each section, methods should be grouped and ordered in logical
categories in the following order:

  * "life-cycle" methods first (e.g. constructors, destructors, initializers)
  * operators (e.g. equivalence, assignment)
  * data access methods
  * other base-class-specific categories
  * other class-specific categories

The order of method definition in the implementation file should be consistent
with the order of declaration in the header file.

Code Formatting
---------------

Line lengths, tab spacing, and bracket placement will conform to the google c++
style standard as much as possible. This requires that all tabs be replaced by
spaces, and that an indentation is equal to two spaces. Further information on
this style standard can be found in the `Google Style Guide`_.

Notable items:

  * no tabs - expand all tabs to 2 spaces.

  * enum items should be all caps

  * trailing underscores must be used with all class member variables

  * opening braces should be placed on the same line as function args: `ReturnType functionName(Arg1Type arg_name) {`

  * loop and branching statements should use the opening and closing braces (i.e. not like this: `if (true) long_statement;`)

.. _`Google Style Guide`: http://google-styleguide.googlecode.com/svn/trunk/cppguide.xml

