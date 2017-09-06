.. _cym_tutorial_cli:

Cymetric Command Line Tutorial
==============================
This tutorial describes how to use cymetric from the command line.

Cymetric is an extension of |cyclus|, so it is assumed that |cyclus| is already
installed on your system. (If not, please visit `Getting and Building Cyclus
from Source <http://fuelcycle.org/kernel/build_from_source.html>`_.) Cymetric
installation instructions are available on `GitHub
<https://github.com/cyclus/cymetric>`_.

Cymetric operates by reading data from a |cyclus| database, computing metrics,
and writing those metrics back to the database. This way, previously seen
metrics are stored for later retrieval. The dependencies between metrics are
automatically computed and evaluated.

Without further ado, let's dive in!

Command Line Usage
------------------
Cymetric ships with a command line utility, just called ``cymetric``.
The command line tool is useful for quick feedback. It can show a list of
tables in a database or execute some code using a database, e.g., evaluating
a metric or quickly checking a plot.

Since cymetric is wholly dependent on |cyclus| databases, you must supply a
database as an argument on the command line. This will look something like the
following:

.. code-block:: bash

    $ cymetric database -flags

We'll be using ``test.h5`` and ``test.sqlite`` as our example databases here.
The sections below explain the flags for use on the command line.

.. warning::

    Please note that cymetric may not work on the command line within its own directory.

Table Listing: ``-l``
~~~~~~~~~~~~~~~~~~~~~
The first switch here, lowercase-L ``-l``, simply lists the tables in the
database.  Note that this may list more tables in the database than are
strictly part of the |cyclus| interface, because of the need for |cyclus| to
store metadata. Don't be alarmed. Listing the current tables is easy:

.. code-block:: bash

    $ cymetric test.h5 -l
    AgentEntry
    AgentStateAgent
    AgentStateInventories
    AgentState_agents_NullRegionInfo
    ...
    BlobKeys
    BlobVals
    BuildSchedule
    Compositions
    DecayMode
    Finish
    Info
    InputFiles
    MaterialInfo
    NextIds
    Prototypes
    Recipes
    ResCreators
    Resources
    Snapshots
    StringKeys
    StringVals
    Transactions
    XMLPPInfo

Metrics that are generated will show up in this listing after they have been
computed. All of the core |cyclus| tables are denoted as root metrics, and they
are listed here too. To understand the core tables included in a |cyclus|
database, please review the page `Understanding the Database
<http://fuelcycle.org/user/dbdoc.html>`_.

Code Execution: ``-e``
~~~~~~~~~~~~~~~~~~~~~~~
Cymetric allows you to execute arbitrary code on metrics from the command line
with the ``-e`` flag. The code that you pass in is pure Python. Every metric
and root |cyclus| table are assigned automatically to variable names that you
can use. Indexing the table variables will return the metric as a `pandas
<http://pandas.pydata.org/>`_ DataFrame. For example, to print the
``AgentEntry`` table, we would write ``AgentEntry[:]`` to get the table and
``print(AgentEntry[:])`` to display it after the ``-e`` flag:

.. code-block:: bash

    $ cymetric test.h5 -e "print(AgentEntry[:])"
                                      SimId  AgentId      Kind                    Spec          Prototype  ParentId  Lifetime  EnterTime
    0  db805939-c565-404a-9483-adfb3da8b6d2       11    Region      :agents:NullRegion       SingleRegion        -1        -1          0
    1  db805939-c565-404a-9483-adfb3da8b6d2       12      Inst    :cycamore:DeployInst  SingleInstitution        11        -1          0
    2  db805939-c565-404a-9483-adfb3da8b6d2       13  Facility        :cycamore:Source         UOX_Source        12        -1          1
    3  db805939-c565-404a-9483-adfb3da8b6d2       14  Facility        :cycamore:Source         MOX_Source        12        -1          1
    4  db805939-c565-404a-9483-adfb3da8b6d2       15  Facility  :cycamore:BatchReactor           Reactor1        12        -1          1
    5  db805939-c565-404a-9483-adfb3da8b6d2       16  Facility  :cycamore:BatchReactor           Reactor2        12        -1          2
    6  db805939-c565-404a-9483-adfb3da8b6d2       17  Facility  :cycamore:BatchReactor           Reactor3        12        -1          3

    [7 rows x 8 columns]

Indexing a metric with an empty slice (``[:]``), none (``[None]``), or an ellipsis
(``[...]``) will return the full metric. However, you can also index by condition
filters on the column names. The column names of the metric are thus also available for
use.  For example, let's just grab all of the facilities out of the entry table:

.. code-block:: bash

    $ cymetric test.h5 -e "print(AgentEntry[Kind == 'Facility'])"
                                      SimId  AgentId      Kind                    Spec   Prototype  ParentId  Lifetime  EnterTime
    0  db805939-c565-404a-9483-adfb3da8b6d2       13  Facility        :cycamore:Source  UOX_Source        12        -1          1
    1  db805939-c565-404a-9483-adfb3da8b6d2       14  Facility        :cycamore:Source  MOX_Source        12        -1          1
    2  db805939-c565-404a-9483-adfb3da8b6d2       15  Facility  :cycamore:BatchReactor    Reactor1        12        -1          1
    3  db805939-c565-404a-9483-adfb3da8b6d2       16  Facility  :cycamore:BatchReactor    Reactor2        12        -1          2
    4  db805939-c565-404a-9483-adfb3da8b6d2       17  Facility  :cycamore:BatchReactor    Reactor3        12        -1          3

    [5 rows x 8 columns]

Separate the conditions by commas (``,``) to apply multiple filters at the same
time:

.. code-block:: bash

    $ cymetric test.h5 -e "print(AgentEntry[Kind == 'Facility', AgentId > 14])"
                                      SimId  AgentId      Kind                    Spec Prototype  ParentId  Lifetime  EnterTime
    0  db805939-c565-404a-9483-adfb3da8b6d2       15  Facility  :cycamore:BatchReactor  Reactor1        12        -1          1
    1  db805939-c565-404a-9483-adfb3da8b6d2       16  Facility  :cycamore:BatchReactor  Reactor2        12        -1          2
    2  db805939-c565-404a-9483-adfb3da8b6d2       17  Facility  :cycamore:BatchReactor  Reactor3        12        -1          3

    [3 rows x 8 columns]

Because code execution is just pure Python, we can do *anything* that we would be
able to do in Python. Suppose that we have a ``Materials`` metric with a ``Mass``
column. We can compute this metric, pull the column out, multiply it by 42,
save the result to a variable, and then print this variable all via the following.

.. code-block:: bash

    $ cymetric test.h5 -e "mass = Materials[:]['Mass'] * 42; print(mass)"
    0      0.000000
    1      0.000000
    2      0.000000
    3      0.000000
    4      0.000000
    5      0.000000
    6      0.000000
    7      0.000000
    8      0.000000
    9      0.000000
    10     4.790314
    11     0.007370
    12     0.066327
    13     0.368486
    14    33.064222
    ...
    462     0.493771
    463     0.313213
    464     0.350812
    465     0.228541
    466    40.917474
    467     0.030567
    468     0.011288
    469     0.238031
    470     0.092571
    471     0.081648
    472     0.034441
    473     0.002762
    474     0.008074
    475     0.000965
    476     0.002827
    Name: Mass, Length: 477, dtype: float64

As a convenience, the following Python modules are available in the execution context
under standard aliases. This prevents you from having to import them manually yourself.

===================== ==============
Module                Alias
===================== ==============
``cymetric``          ``cym``
``numpy``             ``np``
``pandas``            ``pd``
``uuid``              ``uuid``
``matplotlib``        ``matplotlib``
``matplotlib.pyplot`` ``plt``
===================== ==============

This let's you do neat things such as plot the metrics right from the command line.
For example,

.. code-block:: bash

    $ cymetric test.h5 -e "Materials[ResourceId == 15].plot(x='NucId', y='Mass', kind='bar'); plt.show()"

Will pop up with the following figure:

.. image:: ../../astatic/tut_nucid_mass.png

To write or not to write: ``--write`` and ``--no-write``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Cymetric automatically writes an evaluated metric to the database. There are
some scenarios when you may not want this to happen. For example, you might
want your script to do many metric calculations and save the results elsewhere;
in this case, writing to the database is unneccessary. While writing is the
default functionality when you use the ``-e`` flag, the lack of writing
can be accomplished with the ``--no-write`` flag. In the example below, the
table will not be written to the database:

.. code-block:: bash

    $ cymetric test.h5 --no-write -e "Materials[:]"

Since cymetric looks up an already evaluated metric in the database,
overwriting an existing table with a new one might be desired. This is where
the ``--write`` flag is useful:

.. code-block:: bash

    $ cymetric test.h5 --write -e "Materials[:]"

