|Cyclus| Archetype Developer Guide
===================================

.. raw:: html

    <table style="width:100%">
    <tr><td style="width:300px;">

.. image:: /astatic/antipode-bike.jpg
    :align: center
    :width: 300px
    :alt: http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=9361427

.. raw:: html

    </td><td>

Welcome!

You are here because you have made (or are making) the transition from wanting
to run simulations to wanting to dig in and start dictating agent logic and
behavior on a more fundamental level. Perhaps existing archetypes are
insufficient for your needs, perhaps you are curious as to how it all works, or
are a devilishly handsome thrill-seeker.  Whatever your reasons, you have come
to the right place!

This guide assumes that you have |cyclus| installed, are familiar with running
simulations and understand user-level concepts.

To get started please follow the instructions in :doc:`hello_world`.

.. raw:: html

    </td></tr>
    </table>

Installation
-------------

.. toctree::
    :maxdepth: 1

    ../user/install

Hello World
-----------

.. toctree::
    :maxdepth: 1
    
    hello_world
    tour

Writing Agents & Modules
------------------------

Tutorial
++++++++

.. toctree::
    :maxdepth: 1
    
    tutorial/index

Building, Installing and Testing
++++++++++++++++++++++++++++++++

.. toctree::
    :maxdepth: 1

    cmake    
    cycpp
    testing

Interfacing with the |Cyclus| Kernel
++++++++++++++++++++++++++++++++++++

.. toctree::
    :maxdepth: 1
    
    timestep
    resources
    dre
    dbtypes
    custom_tables
    errors
    logger
    cli

A Word About Style
++++++++++++++++++

Having a consistent style in your code is important. Python has a great style
guide encapsulated in `PEP8 <http://legacy.python.org/dev/peps/pep-0008/>`_. As
our code base is mostly C++, the kernel development team follows the `Google C++
Style Guide <http://google-styleguide.googlecode.com/svn/trunk/cppguide.xml>`_
(GCSG) as closely as possible, and we invite you to as well! A notable (and
required) exception to the GCSG used in |Cyclus| and Cycamore :term:`archetypes
<archetype>` is the use of preprocessor-aware private member variables without a
trailing underscore, due to consistency requirements across input files,
implementation, and databases. Happy (well-styled) coding!

Under the Hood
------------------------------

.. toctree::
    :maxdepth: 1

    sim_init
    dynamic_loading
    decay
..   cyclus_env
..   materials_and_isotopes

|Cyclus| Toolkit
----------------

.. toctree::
    :maxdepth: 1

    toolkit
