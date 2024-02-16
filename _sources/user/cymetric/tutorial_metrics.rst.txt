.. _cym_tutorial_metrics:

Writing Your Own Metrics Tutorial
==================================
This tutorial will describe how to write your own metrics for your own
custom analyses. This takes place within Python, so you may want to check
out the Cymetric Python tutorial first.

Writing Metrics
------------------
Naturally, you do not want to be limited to the metrics that come predefined
by cymetric! You have
your own data and your own analysis that you want to perform. It is easy to
write metrics and fully hook into the cymetric tools.

A metric is a function that accepts a pandas Series, returns a
pandas DataFrame, and is decorated by the ``@metric()`` decorator found in
cymetric. The general format is as follows:

.. code-block:: python

    import cyclus.typesystem as ts
    import cymetic as cym

    dependencies = [
        ('Table1', ('Col1', 'Col2'), 'Value1'),
        ('Table2', ('Col3',), 'Value2')
        ]

    schema = [('Id', ts.INT), ('MetricValue', ts.DOUBLE)]

    @cym.metric(name='MyMetric', depends=dependencies, schema=schema)
    def my_metric(series):
        one = series[0]
        two = series[1]
        #calculations and pandas manipulations go here
        return dataframe

This metric may be evaulated with:

.. code-block:: python

    cym.eval('MyMetric', db)


In the above, the ``@metric()`` decorator takes three arguments. The first is
the ``name`` of the metric (e.g., ``'MyMetric'``). Note that this can be
distinct from the function name.

The second is ``depends``, which represents the metric dependencies.  This is a
list of 3-tuples that represents which ``series`` to pull out of the database
and pass into the metric function (e.g., ``my_metric()``).  The entries in the
dependency list have three components. The first element is the table name as a
string (e.g., ``'Table1'``). The second element is a tuple of column names that
become the index of the series (e.g., ``('Col1', 'Col2')``). Finally, the last
element is the column of the table that becomes the values of the series (e.g.,
``'Value1'``).  A metric may have as many dependencies as required. Circular
dependencies are not allowed!

Lastly, the ``@metric()`` decorator takes a ``schema`` argument. The schema is
defined by a list of 2-tuples. The first entry is the column name and the
second is the |cyclus| database type. This represents the structure of the
metric table on disk and in |cyclus|. Thus, it is highly tied to the |cyclus|
`type system <http://fuelcycle.org/arche/dbtypes.html>`_.
The DataFrame that is returned should have column names that match
the schema provided. It is generally a good idea to include a ``SimId`` column.

For a more concrete example, if you wanted to square the mass of materials as a
metric, you could write a ``MaterialsSquared`` metric.

.. code-block:: python

    import pandas as pd

    import cyclus.typesystem as ts
    import cymetic as cym

    deps = [('Materials', ('SimId', 'ResourceId', 'NucId'), 'Mass')]

    schema = [('SimId', ts.UUID), ('ResourceId', ts.INT),
              ('NucId', ts.INT),  ('MassSquared', ts.DOUBLE)]

    @cym.metric(name='MaterialsSquared', depends=deps, schema=schema)
    def mats_sqrd(series):
        mats = series[0].reset_index()
        mats = pd.DataFrame(data={'SimId': mats.SimId,
                                  'ResourceId': mats.ResourceId,
                                  'NucId': mats.NucId,
                                  'MassSquared': mats.Mass.apply(lambda x: x**2)},
                            columns=['SimId', 'ResourceId', 'NucId', 'MassSquared'])
        mats.name = 'MaterialsSquared'
        return mats

This metric may be evaulated with:

.. code-block:: python

    cym.eval('MaterialsSquared', db)

Note that to write this metric, no knowledge of the database or any filters is
assumed. Cymetric handles all of these details for you!

If the pandas functionality seems mysterious to you, it may be beneficial to
review a quick tutorial, `10 Minutes to pandas
<http://pandas.pydata.org/pandas-docs/stable/10min.html>`_.

Making Metrics from Custom Database Tables
------------------------------------------
The above shows how easy it is to incorporate metrics that are computed via
cymetric. Moreover, |cyclus| databases can be comprised of both `default tables
<http://fuelcycle.org/user/dbdoc.html#table-descriptions>`_ and  `custom tables
<http://fuelcycle.org/arche/custom_tables.html>`_. Cymetric also helps you
bring in data that might come as a custom table in a |cyclus| database.  All you
need to do is use the ``root_metric()`` function somewhere. This simply accepts
the name of the table. For example,

.. code-block:: python

    my_root_table = cym.root_metric(name='MyRootTable')


This metric may be evaulated with:

.. code-block:: python

    cym.eval('MyRootTable', db)

And that is all!
