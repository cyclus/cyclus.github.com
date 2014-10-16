Errors and Warnings
===================

Module developers may also leverage the |Cyclus| error and warning system
within the code that they write. These are useful for failing gracefully from
undefined behavior or to signal that code is still experimental and under
development.

Errors
------

|Cyclus| uses `standard C++ execptions
<http://www.cplusplus.com/doc/tutorial/exceptions/>`_ to throw and catch
errors. However, whenever you ``#include "cyclus.h"`` or ``#include
"error.h"`` you have access to a suite of exceptions that the kernel itself
knows about.  :ref:`errors-table-1` displays all of the |Cyclus| errors which
live within the ``cyclus`` namespace and subclass from ``std::exception``.

.. rst-class:: centered

.. _errors-table-1:

.. table:: **Table I.** Cyclus Error Classes
    :widths: 1 9
    :column-alignment: left left
    :column-wrapping: true true 
    :column-dividers: none single none

    =============== ==============================================================
    Error           Description
    =============== ==============================================================
    Error           Base error for |Cyclus|.
    ValueError      For values that are too big, too small, etc.
    KeyError        For failed retrieval/insertion of key-based data into/from 
                    data structures.
    StateError      For failed object state expectations.
    IOError         For failed reading/writing to files, network connections, etc.
    CastError       For failed casts that shouldn't.
    ValidationError For validating files received via I/O or for indicating that
                    the software has not been properly benchmarked.
    =============== ==============================================================

.. raw:: html

    <br />

For example, if a reactor finds itself with a negative flux in its ``Tock()``
function then it could choose to throw either a ValueError or a StateError.
If the flux happened to be a state variable a StateError would be more
appropriate. This would be implemented as follows:

**Error example:**

.. code-block:: c++

    void Reactor::Tock(int time) {
      if (flux < 0.0)
        throw cyclus::StateError("negative fluxes are impossible!");
    }

Warnings
--------

Along with errors, there are corresponding non-terminal warning messages that
modules may issue. These print messages to ``sdterr`` along with the kind of
warning that was given.  All warnings are issued through the
``cyclus::Warn<T>()`` function.  This functions is templated on the
``cyclus::Warnings`` enum whose values and meanings may be seen in
:ref:`errors-table-2`.

.. rst-class:: centered

.. _errors-table-2:

.. table:: **Table II.** Cyclus Warnings
    :widths: 3 7
    :column-alignment: left left
    :column-wrapping: true true 
    :column-dividers: none single none

    =========================== =================================================
    Warnings                    Description
    =========================== =================================================
    WARNING                     Basic warning for |Cyclus|.
    VALUE_WARNING               For values that are too big, too small, etc.
    KEY_WARNING                 For unexpected retrieval/insertion of key-based 
                                data into/from data structures.
    STATE_WARNING               For unexpected object state.
    IO_WARNING                  For unexpected reading/writing to files, network 
                                connections, etc.
    CAST_WARNING                For unexpected casts.
    VALIDATION_WARNING          For validating files received via I/O or for 
                                indicating that the software has not been 
                                properly benchmarked.
    DEPRECATION_WARNING         For features, behaviors, or APIs that are no
                                longer supported. Expect removal in future 
                                releases.
    PENDING_DEPRECATION_WARNING For features, behaviors, or APIs that are 
                                candidates for future deprecation.
    EXPERIMENTAL_WARNING        For features, behaviors, or APIs that are not 
                                considered stable. Reasons for instability may 
                                include a lack of benchmarking, uncertainty about
                                future needs, or known future API changes.
    =========================== =================================================

.. raw:: html

    <br />

Revisiting the reactor error example from above, we could have issued a 
warning instead.

**Warning example:**

.. code-block:: c++

    void Reactor::Tock(int time) {
      if (flux < 0.0)
        cyclus::Warn<cyclus::STATE_WARNING>("negative fluxes are impossible!");
    }

Warnings have a number of advantages over errors.  The first is that since
they do not stop the process they are fast to issue. They are also a great way
for communicating with users the expectations of using your module. 

Warnings also have two command line options that users can provide which
modify their behavior.  The first is ``--warn-limit``.  This changes the
maximum number of times a warning of each kind will be issued before further
warnings are suppressed.  This defaults to 1.  A value of zero means to
suppress all warnings and a very large number will print them all.  For
example, if the user wished to print the first 42 warnings of each kind they
would call |cyclus| as follows:

.. code-block:: bash

    $ cyclus --warn-limit 42 ...

The second command line argument that alters warning behavior is
``--warn-as-error``.  This turns all warnings into corresponding error types
and throws the error.  This is useful for ensuring that only stable code is
executed or to help uncover what is causing a warning to be thrown.  It takes
no arguments:

.. code-block:: bash

    $ cyclus --warn-as-error ...

