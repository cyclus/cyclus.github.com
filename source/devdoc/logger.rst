Using the Cyclus Logger
=======================

.. code-block:: bash

  LOG(LogLevel level, std::string prefix)

Built-in logging functionality has been provided to aid debugging.  To use the
logger, you must include the *Logger.h* header file. `std::cout` statements
should be generally avoided.  The `LOG(level, prefix)` macro should be used for
all logging/debugging needs.  The LOG macro uses the Logger class to provide
this functionality.  The Logger class should generally not be accessed
directly.  The macro returns a string stream object that can be used exactly as
`std::cout` for printing output.  Streamed in content is flushed to stdout as
soon as execution passes beyond the terminating semi-colon of the log
statement.  

A brief description of when to use which log level is given with the 
LogLevel enum doxygen documentation. The following is a summary:

  * LEV_ERROR: Use for errors that require model code or input file
    modification/fixing (use extremely sparingly)

  * LEV_WARN: Use to report questionable simulation state (use extremely
    sparingly)

  * LEV_INFO[2, 3, 4]

  * LEV_INFO1: Information helpful for simulation users and developers alike -
    least verbose.

  * LEV_INFO5: Information helpful for simulation users and developers alike -
    most verbose.

  * LEV_DEBUG1: debugging information - least verbose

  * LEV_DEBUG[2, 3, 4]

  * LEV_DEBUG5: debugging information - most verbose

Developers working on models set the LOG prefix argument to a unique
module/model-specific identifier (up to 6 characters long).  This will allow
developers to more easily filter the logger output in order to isolate
information most relevant to their work. 

This macro does a check on the given LogLevel 'level' argument; if the
specified level is not higher than or equal to the report-level cutoff, the
macro does nothing, limiting the performance impact of logging statements.

.. warning::

  Do NOT place any state-changing expressions with the LOG 
  macro as they may not run if the report level excludes the specified LogLevel.  

Examples
--------

.. code-block:: cpp

  #include "Logger.h"

  void myfunc() {

    LOG(LEV_ERROR, "prefix") << "This is my error statement. "
                             << "and more info...";
    
    LOG(LEV_DEBUG2, "prefix") << "This is my first debug statement. "
                              << "and more info...";  
    LOG(LEV_DEBUG1, "prefix") << "This is another debug statement. "
                              << "and more info...";  
  }

The command-line specified verbosity is used to determine the logger
report-cutoff.  Available levels are described in the LogLevel enum.  In the
above example if the command line verbosity were set to *LEV_DEBUG1*, the first
and third statements would print, while the second would not. Output would be
something like this::

  ERROR (prefix): This is my error statement. and more info...
  DEBUG1(prefix): This is another debug statement. and more info...

Any expression placed with a log statment that is not printed will not be
executed. An example of what NOT to do follows:

.. code-block:: cpp

  LOG(LEV_DEBUG2, "module name") << "The expression myobject.setName(newname): " 
                                 << myobject.setName(newname) 
                                 << " might not ever execute" 
                                 << " depending on the verbosity level."; 


