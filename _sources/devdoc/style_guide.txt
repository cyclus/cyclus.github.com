
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

* opening braces should be placed on the same line as function args::

    ReturnType functionName(Arg1Type arg_name) {

* loop and branching statements should use the opening and closing braces. **Not** like this::

    if (true) long_statement;

.. _`Google Style Guide`: http://google-styleguide.googlecode.com/svn/trunk/cppguide.xml

Documenatation Formatting
-------------------------

Documentation in Cyclus is automated via Doxygen. All documentation occurs in header files. 
Additionally, there are two distinct instances of automated documentation: class overviews 
and function overviews. Class overviews occur once per class at the top of the header file 
while function overviews occur once per function above that function. All documentation 
segments begin with a slash-double-asterisk and end with an askerisk-slash: ::

  /**
    Some documenatation...
   */

Class Overviews
~~~~~~~~~~~~~~~

Class overviews should include a brief overview of the class and an introduction as well as 
sections corresponding to the key parameters used by the class and its detailed behavior, if
the class in complex. Each portion must be preceded by the Doxygen keyword. An example is 
given below: ::

   /**
     @class SomeClass
  
     @brief A brief overview of SomeClass

     @section intro Introduction
     Place an introduction to the class here. 

     @section classparams Class Parameters
     Place a description of the key parameters used by the class.

     @section detailed Detailed Behavior
     If the class is complex, provided a detailed description of its behavior.
    */

Function Overviews
~~~~~~~~~~~~~~~~~~

Function overviews should fully describe the function's behavior, the parameters
required to call it, and the value it returns. Each portion must be preceded by 
the Doxygen keyword. 

Please note that class and function overviews differ in asterisk usage in the 
overview's body. An example is given below: ::

  /**
   * @brief An explanation of the function's behavior
   * 
   * @param aParam description of aParam
   * @return description of what the function returns
   *
   */ 
   returnType aFuction(paramType aParam);
