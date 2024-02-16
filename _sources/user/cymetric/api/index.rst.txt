Cymetric API
============
The following modules make up the cymetric package.  Note that most of the
important stuff you can get directly from ``cymetric`` without needing to import
the module.  For example:

.. code-block:: python

    from cymetric import metric


**Interface Modules:**

.. toctree::
    :maxdepth: 1

    schemas
    evaluator
    execution
    filters
    graphs


**Metrics Modules:**

.. toctree::
    :maxdepth: 1

    metrics
    root_metrics
    cycamore_root_metrics
    brightlite_root_metrics
    fco_metrics


**Helper Modules:**

.. toctree::
    :maxdepth: 1

    main
    tools
    timeseries
