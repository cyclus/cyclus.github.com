Making your first change by introducing Logging: "Hello World!"
=================================================================

One of the useful features of the Cyclus kernel is the ability to log output
to the screen while it is running using the :doc:`../logger` capability.  At
this step, we will add log message to our archetype so that we can see it
operating in a simulation.

In this lesson we will do the following:

1. Change the ``Tick()`` and ``Tock()`` methods to generate log messages
2. Build and install our archetype module
4. Run Cyclus with a sample input file to see the log messages

Generate Log Messages in ``Tick()`` and ``Tock()``
---------------------------------------------------

To do this, please open up the :file:`src/tutorial_storage_facility.cc` file
in your favorite text editor (vim, emacs, gedit, `notepad++
<http://exofrills.org>`_).  

Change the original functions to look like:

**Original Tick() and Tock() in src/tutorial_storage_facility.cc:**

.. code-block:: c++

    void Tutorial_storageFacility::Tick() {}

    void Tutorial_storageFacility::Tock() {}

**New Tick() and Tock() in src/tutorial_storage_facility.cc:**

.. code-block:: c++

    void Tutorial_storageFacility::Tick() {
        LOG(cyclus::LEV_INFO1, "tutorial_storage") << "Hello";
    }

    void Tutorial_storageFacility::Tock() {
        LOG(cyclus::LEV_INFO1, "tutorial_storage") << "World!";
    }

Build and Install the New Archetype Module
---------------------------------------------

Now that we have altered the behavior of the Tutorial_storageFacility, let's compile and 
install the ``tutorial`` project.  This done with the ``install.py`` script.
The install script puts the project into your cyclus userspace, 
``${HOME}/.local/lib/cyclus``.

.. code-block:: bash

    tutorial $ python install.py

Write a Short Input File that Uses this New Archetype
-------------------------------------------------------

Let's run |cyclus| with the Tutorial_storageFacility! In the input directory
there is an :file:`example.xml`. Running |cyclus| on this file with the
command ``cyclus -v 2 input/example.xml`` should produce the following output.
Note: the arguement ``-v 2`` invokes the level 2 verbosity of the logger.

.. code-block:: bash

    $ cyclus -v 2 input/example.xml
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
    Simulation ID: 0ae730e0-a9a8-4576-afaa-d1db6399d5a2

If you look in the input file you'll see that the simulation duration was set
to 10.  This is why the log messages were printed ten times.

Commit these Changes to your Local Repository
-----------------------------------------------

Now is a good time to follow the best practice of registering your changes in
your local repository.  Commit early, commit often!

Since only one file has changed you need to add it and then commit:

.. code-block:: bash

    $ git add src/tutorial_storage_facility.cc
    $ git commit -m "Added log messages as hello world to Tick and Tock"

You don't need to push this to your Github repo, but it is not a bad idea...

.. code-block:: bash

    $ git push origin

