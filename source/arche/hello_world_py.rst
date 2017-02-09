.. _hello_world:

Hello, Cyclus! [Python]
=======================
This pages walks you through a very simple hello world example using
|cyclus| agents.  First make sure that you have the dependencies installed,
namely |Cyclus| and a recent version of Python (2.7 or 3.5+).

|Cyclus| can read agents from any normal python package and module. If you are unsure of
how to start and install a Python project, please see the Python documentation. There are
also many high-quality guides and tools online. Here, we will assume that there is a
project called ``proj`` that has a module called ``agents`` that contains an archetype
class called ``MyFacility``.

To start writing ``MyFacility``, open up ``agents.py``, import ``cyclus.agents``,
anf write the following:

**proj/agents.py:**

.. code-block:: Python

    from cyclus.agents import Facility

    class MyFacility(Facility):
        """My first Cyclus archetype!"""


And that is it! The above is a fully-functional |Cyclus| facility.

------------

Let's now change the behavior of the MyFacility's ``tick()`` and
``tock()`` methods to print "Hello" and "World" respectively.

**proj/agents.py:**

.. code-block:: Python

    from cyclus.agents import Facility

    class MyFacility(Facility):
        """My first Cyclus archetype!"""

        def tick(self):
            print("Hello,")

        def tock(self):
            print("World!")


Now that we have altered the behavior of the TutorialFacility, reinstall the project
so that it is available to cyclus.

------------

You can refer to this facilty in a |cyclus| input file by using the Python package and
module name in the lib section of the archetypes spec, like you would write it if you
were importing a module.  The class name goes in the
name section of the spec.

.. code-block:: xml

    <archetypes>
      <spec><lib>proj.agents</lib><name>MyFacility</name></spec>
    </archetypes>

------------

Let's run |cyclus| with this example! In the input directory there is
an :file:`example.xml`. First modify it to point to the archetype we just wrote.
Running |cyclus| on this file with the command
``cyclus input/example.xml`` should produce the following output.

.. code-block:: bash

    tutorial $ cyclus input/example.xml
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
    Hello,
    World!
    Hello,
    World!
    Hello,
    World!
    Hello,
    World!
    Hello,
    World!
    Hello,
    World!
    Hello,
    World!
    Hello,
    World!
    Hello,
    World!
    Hello,
    World!

    Status: Cyclus run successful!
    Output location: cyclus.sqlite
    Simulation ID: 0ae730e0-a9a8-4576-afaa-d1db6399d5a2

If you look in the input file you'll see that the simulation duration was set
to 10.  This is why "Hello, World!" is printed ten times.
