Cymetric API
============
The following modules make up the cymetric package.  Note that most of the
important stuff you can get directly from ``cymetric`` without needing to import 
the module.  For example, the following two imports are the same:

.. code-block:: python

    from cymetric import metric           # nice and short
    from cymetric.metrics import metrics  # where 'metric' really lives


**Interface Modules:**

.. toctree::
    :maxdepth: 1

    typesystem
    schemas
    metrics
    root_metrics
    evaluator
    execution

**Helper Modules:**

.. toctree::
    :maxdepth: 1

    cyclus
    main
    tools
