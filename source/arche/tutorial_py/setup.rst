Setup a New Project
==============================================
In this lesson, we will:

1. Clean up the file system for the single storage facility
2. Install the storage facility
3. Run an input file that uses the new storage facility

Make a New Project
-------------------
First let's start by making a tutorial example project with an ``agents.py`` file.

.. code-block:: console

    ~ $ mkdir -p tutorial/tut
    ~ $ cd tutorial/tut
    ~/tuorial/tut $ touch __init__.py agents.py


Make a Storage Facility
------------------------------------------
Next, make a new facility by editing the ``agents.py`` file to look like the following:

**~/tutorial/tut/agents.py:**

.. code-block:: python

    from cyclus.agents import Facility


    class Storage(Facility):
        """My storage facility."""

        def tick(self):
            print("Hello,")
            print("World!")


Install and Test
----------------------------------
To install the tutorial project, we'll need to have a ``setup.py`` file in the
root tutorial directory. Create one that looks like:

**~/tutorial/setup.py:**

.. code-block:: python

    #!/usr/bin/env python
    from distutils.core import setup


    VERSION = '0.0.1'
    setup_kwargs = {
        "version": VERSION,
        "description": 'My Cyclus tutorial',
        "author": 'Just Me',
        }

    if __name__ == '__main__':
        setup(
            name='tut',
            packages=['tut'],
            scripts=['xo'],
            **setup_kwargs
            )


Now we can install the tutorial project via,

.. code-block:: console

    ~ $ cd tutorial
    ~/tutorial $ python setup.py install --user


Let's now make an exmaple input file in a special ``input`` directory:

.. code-block:: console

    ~ $ cd tutorial
    ~/tutorial $ mkdir -p input
    ~/tutorial $ touch input/storage.py

Now open up the ``input/storage.`` input file and edit it to look like:

.. code-block:: python

    SIMULATION = {
     'simulation': {
      'archetypes': {
       'spec': [
        {'lib': 'tut.agents', 'name': 'Storage'},
        {'lib': 'agents', 'name': 'NullInst'},
        {'lib': 'agents', 'name': 'NullRegion'},
       ],
      },
      'control': {'duration': 10, 'startmonth': 1, 'startyear': 2000},
      'facility': {'config': {'Storage': None}, 'name': 'OneFacility'},
      'region': {
       'config': {'NullRegion': None},
       'institution': {
        'config': {'NullInst': None},
        'initialfacilitylist': {'entry': {'number': 1, 'prototype': 'OneFacility'},},
        'name': 'OneInst',
       },
       'name': 'OneRegion',
      },
     },
    }


Test the input file by running Cyclus:

.. code-block:: console

    $ cyclus -v 2 input/storage.py
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

