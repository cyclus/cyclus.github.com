Setup a New Project Based on Cycstub
==============================================

In this lesson, we will:

1. Do the tasks the the Cyclus Archetype Hello World!
2. Clean up the file system for the single storage facility
3. Install the storage facility 
4. Run an input file that uses the new storage facility

Follow the Hello Cyclus! Instructions
---------------------------------------------------

Follow all of the steps of :ref:`hello_world`.

Make a Storage Facility
------------------------------------------

Next, make a new facility by copying the facility archetype from the Hello World! tutorial. 

Start by making sure you are in the correct directory

.. code-block:: console

    $ cd ~/tutorial

Then make the new archetype, updating all the files as needed

.. note::

    If you are on a Mac, replace all instances of ``sed -i`` with ``sed -i ''``.

.. code-block:: console

    $ for file in `ls src/tutorial_facility*`; do cp "${file}" "${file/tutorial_facility/storage}"; done
    $ sed -i "s/tutorial_facility/storage/g" src/storage*
    $ sed -i "s/TutorialFacility/Storage/g" src/storage*
    $ sed -i "s/TUTORIAL_FACILITY/STORAGE/g" src/storage*

Finally, open -``src/CMakeLists.txt`` with your favorite text editor and add the
following line to the end of it

.. code-block:: bash

    install_cyclus_standalone("Storage" "storage" "tutorial")


Install and Test
----------------------------------

Install the tutorial project

.. code-block:: console

    $ ./install.py

Run the unit tests

.. code-block:: console

    $ Storage_unit_tests

Make a new input file that is a copy of the test input file 

.. code-block:: console

    $ cp input/example.xml input/storage.xml

Then change every instance of ``TutorialFacility`` with ``Storage``. This can be
done by hand or on the command line with

.. code-block:: console

    $ sed -i "s/TutorialFacility/Storage/g" input/storage.xml

Test the input file by running Cyclus

.. code-block:: console

    $ cyclus -v 2 input/storage.xml
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

