.. _cym_tutorial_py:

Cymetric Python Interface Tutorial
==================================`
This tutorial will describe how to use cymetric from Python.

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


Python Interface
------------------
While quick feedback is useful, it is more likely that cymetric will be of use
in a script.  Therefore, this section details how to employ Python to interact
with cymetric. In addition to writing scripts to compute metrics and produce
figures, this is essential for the development of new metrics.

Typically, it is recommended that you alias ``cymetric`` as ``cym``, because
all of the important functionality lives here.  To start, use the ``dbopen()``
function to open up a database:

.. code-block:: python

    import cymetric as cym

    db = cym.dbopen('test.sqlite')

Evaluating Metrics
~~~~~~~~~~~~~~~~~~~~~~~
The main purpose of cymetric is to evaluate metrics. The easiest way to do this
is via the ``eval()`` function. This accepts a metric name and a database and
returns a pandas DataFrame:

.. code-block:: python

    frame = cym.eval('Materials', db)

You may also optionally supply a list of 3-tuples representing the conditions to
filter the metric on.

.. code-block:: python

    filtered_frame = cym.eval('Materials', db, conds=[('NucId', '==', 922350000)])

Multiple filters can be applied at once. These filters are ``&&``-ed with each other.

.. code-block:: python

    filtered_frame = cym.eval('AgentEntry', db, conds=[('Kind', '==','Facility'), ('AgentId', '>', 14)])

However, if you are evaluating many metrics, this method will be
computationally inefficient. Calling ``eval()`` creates a new ``Evaluator``
object each time a metric is evaluated. Since each ``Evaluator`` object reads
the database individually, this means ``eval()`` reads the database each time
it is called. Alternatively, there is a way to ensure the database only gets
read once by accessing the ``eval()`` functionality directly within an
``Evaluator`` object.  You can create an ``Evaluator`` instance with a single
database and call ``eval()`` from within it. For example,

.. code-block:: python

    evaler = cym.Evaluator(db)
    frame1 = evaler.eval('Materials')
    frame2 = evaler.eval('AgentEntry', conds=[('Kind', '==', 'Facility')])

And you can run with the data from there! We recommend learning `pandas
<http://pandas.pydata.org/>`_ to get the most out of your analysis from this
point.

Executing Code
~~~~~~~~~~~~~~~~~~~~~~~
Sometimes, you just have a code snippet as a string like you might run from the
command line, even though you are in Python. The ``exec_code()`` function gives
you easy access to the exact same capabilities that you have on the command line.
This function accepts the code string and the database:

.. code-block:: python

    cym.exec_code("print(AgentEntry[:])", db)

For more exciting capabilities, please explore the `examples directory
<https://github.com/cyclus/cymetric>`_ in the cymetric repository or ask us
questions on the |cyclus| users mailing list.
