Adding State Variables
=======================
In this lesson, we will:

1. Add the necessary state variables to define the storage facility
3. Modify the sample input file to include these variables

Add State Variables
----------------------------------------------
The Cyclus Python interface preprocessor provides a ``typesystem`` module that help define
variables that are state variables for an archetype. These state vars also allow convenient
annotations.

First, we'll add the maximum monthly transfer capacity, called ``throughput``.
Open the file ``tutorial/tut/agents.py`` in your text editor.
Immediately after the storage class name, add the following:

**~/tutorial/tut/agents.py:**

.. code-block:: python

    from cyclus.agents import Facility
    import cyclus.typesystem as ts


    class Storage(Facility):
        """My storage facility."""

        # this declares throughput to be of type double for purposes of storage
        # and user input
        throughput = ts.Double(
            doc="Maximum amount of material that can be transferred in or "
                "out each time step",
            tooltip="Maximum amount of material that can be transferred in "
                    "or out each time step",
            units="kg",
            uilabel="Maximum Throughput",
            )

        def tick(self):
            print("Hello, World!")


Now, we'll add variables for the minimum amount of time that material is
stored and the input/output commodity names.

**~/tutorial/tut/agents.py:**

.. code-block:: python

    class Storage(Facility):
        """My storage facility."""
        ...
        storage_time = ts.Int(
            doc="Minimum amount of time material must be stored",
            tooltip="Minimum amount of time material must be stored",
            units="months",
            uilabel="Storage Time",
            )
        incommod = ts.String(
            tooltip="Storage input commodity",
            doc="Input commodity on which Storage requests material.",
            uilabel="Input Commodity",
            uitype="incommodity",
            )
        outcommod = ts.Int(
            tooltip="Storage output commodity",
            doc="Output commodity on which Storage offers material.",
            uilabel="Output Commodity",
            uitype="outcommodity",
            )
        ...

Re-innstall the Modified Module
---------------------------------------
To reinstall this module, just issue the same ``setupy.py`` command as before:

.. code-block:: console

    ~/tutorial $ python setup.py install --user


Modify the Input File
-------------------------
If you try to run the same input file with your modified module, you will get
errors because the sample input file no longer includes the necessary pieces
to define your module.  It is missing the new variables.  Try it:

.. code-block:: console

    ~/tutorial $ cyclus -v 2 input/storage.py
                  :
              .CL:CC CC             _Q     _Q  _Q_Q    _Q    _Q              _Q
            CC;CCCCCCCC:C;         /_\)   /_\)/_/\\)  /_\)  /_\)            /_\)
            CCCCCCCCCCCCCl       __O|/O___O|/O_OO|/O__O|/O__O|/O____________O|/O__
         CCCCCCf     iCCCLCC     /////////////////////////////////////////////////
         iCCCt  ;;;;;.  CCCC
        CCCC  ;;;;;;;;;. CClL.                          c
       CCCC ,;;       ;;: CCCC  ;                   : CCCCi
        CCC ;;         ;;  CC   ;;:                CCC`   `C;
      lCCC ;;              CCCC  ;;;:             :CC .;;. C;   ;    :   ;  :;;
      CCCC ;.              CCCC    ;;;,           CC ;    ; Ci  ;    :   ;  :  ;
       iCC :;               CC       ;;;,        ;C ;       CC  ;    :   ; .
      CCCi ;;               CCC        ;;;.      .C ;       tf  ;    :   ;  ;.
      CCC  ;;               CCC          ;;;;;;; fC :       lC  ;    :   ;    ;:
       iCf ;;               CC         :;;:      tC ;       CC  ;    :   ;     ;
      fCCC :;              LCCf      ;;;:         LC :.  ,: C   ;    ;   ; ;   ;
      CCCC  ;;             CCCC    ;;;:           CCi `;;` CC.  ;;;; :;.;.  ; ,;
        CCl ;;             CC    ;;;;              CCC    CCL
       tCCC  ;;        ;; CCCL  ;;;                  tCCCCC.
        CCCC  ;;     :;; CCCCf  ;                     ,L
         lCCC   ;;;;;;  CCCL
         CCCCCC  :;;  fCCCCC
          . CCCC     CCCC .
           .CCCCCCCCCCCCCi
              iCCCCCLCf
               .  C. ,
                  :
    Entity: line 17: element Storage: Relax-NG validity error : Expecting an element throughput, got nothing
    Entity: line 17: element Storage: Relax-NG validity error : Invalid sequence in interleave
    Entity: line 17: element Storage: Relax-NG validity error : Element Storage failed to validate content
     ERROR(core  ):Document failed schema validation

The simulation now fails because it does not match the schema. You can view the schema with

.. code-block:: console

    ~/tutorial $ cyclus --agent-schema :tut.agents:Storage

Notice that you were able to take advantage of the input file validation simply by using
the special typesystem class attributes .

Our failed cyclus simulation produced an output file that will need to be deleted.

.. code-block:: console

    ~/tutorial $ rm cyclus.sqlite

Now, we'll change that input file.  Open the file ``input/storage.py`` in
your text editor, and find the prototype configuration for the single facility
named "OneFacility" that looks like this.

**~/tutorial/input/storage.py:**

.. code-block:: python

    {
    # ...
    'facility': {'config': {'Storage': None}, 'name': 'OneFacility'}
    # ...
    }

We need to replace the ``<config>`` element with this:

**~/tutorial/input/storage.py:**

.. code-block:: python

    {
    # ...
    'facility': {'config': {'Storage': {
                                'throughput': 10,
                                'storage_time': 1,
                                'incommod': 'fuel',
                                'outcommod': 'stored_fuel',
                                }},
                            'name': 'OneFacility'}
    # ...
    }

Now we can try it again:

.. code-block:: console

    ~/tutorial $ cyclus -v 2 input/storage.py
                  :
              .CL:CC CC             _Q     _Q  _Q_Q    _Q    _Q              _Q
            CC;CCCCCCCC:C;         /_\)   /_\)/_/\\)  /_\)  /_\)            /_\)
            CCCCCCCCCCCCCl       __O|/O___O|/O_OO|/O__O|/O__O|/O____________O|/O__
         CCCCCCf     iCCCLCC     /////////////////////////////////////////////////
         iCCCt  ;;;;;.  CCCC
        CCCC  ;;;;;;;;;. CClL.                          c
       CCCC ,;;       ;;: CCCC  ;                   : CCCCi
        CCC ;;         ;;  CC   ;;:                CCC`   `C;
      lCCC ;;              CCCC  ;;;:             :CC .;;. C;   ;    :   ;  :;;
      CCCC ;.              CCCC    ;;;,           CC ;    ; Ci  ;    :   ;  :  ;
       iCC :;               CC       ;;;,        ;C ;       CC  ;    :   ; .
      CCCi ;;               CCC        ;;;.      .C ;       tf  ;    :   ;  ;.
      CCC  ;;               CCC          ;;;;;;; fC :       lC  ;    :   ;    ;:
       iCf ;;               CC         :;;:      tC ;       CC  ;    :   ;     ;
      fCCC :;              LCCf      ;;;:         LC :.  ,: C   ;    ;   ; ;   ;
      CCCC  ;;             CCCC    ;;;:           CCi `;;` CC.  ;;;; :;.;.  ; ,;
        CCl ;;             CC    ;;;;              CCC    CCL
       tCCC  ;;        ;; CCCL  ;;;                  tCCCCC.
        CCCC  ;;     :;; CCCCf  ;                     ,L
         lCCC   ;;;;;;  CCCL
         CCCCCC  :;;  fCCCCC
          . CCCC     CCCC .
           .CCCCCCCCCCCCCi
              iCCCCCLCf
               .  C. ,
                  :
    INFO1(core  ):Simulation set to run from start=0 to end=10
    INFO1(core  ):Beginning simulation
    INFO1(tutori):Hello
    INFO1(tutori):World!
    INFO1(tutori):Hello
    INFO1(tutori):World!
    INFO1(tutori):Hello
    INFO1(tutori):World!
    INFO1(tutori):Hello
    INFO1(tutori):World!
    INFO1(tutori):Hello
    INFO1(tutori):World!
    INFO1(tutori):Hello
    INFO1(tutori):World!
    INFO1(tutori):Hello
    INFO1(tutori):World!
    INFO1(tutori):Hello
    INFO1(tutori):World!
    INFO1(tutori):Hello
    INFO1(tutori):World!
    INFO1(tutori):Hello
    INFO1(tutori):World!

    Status: Cyclus run successful!
    Output location: cyclus.sqlite
    Simulation ID: 9f15b93c-9ab2-49bb-a14f-fef872e64ce8
