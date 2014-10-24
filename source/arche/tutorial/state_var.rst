Adding State Variables
=======================

In this lesson, we will add the state variables that will define this
facility.  We will make use of the Cyclus ``#pragma`` directives so that these
state variables are available in the Cycic user interface as well as being
logged in the output.

We will take the following steps:

1. Add the necessary state variables
2. Build and install the updated module
3. Modify the sample input file to include these variables

Adding State Variables with Cyclus #pragma
----------------------------------------------

The Cyclus preprocessor provides a ``#pragma`` that includes a variable in the
set of state variables and allows convenient annotations.

First, we'll add the maximum monthly transfer capacity, called ``throughput``.
Open the file ``src/tutorial_storage_facility.h`` in your text editor.

Immediately after the declaration of ``Tock()``, add the following:

.. code-block:: c++

    #pragma cyclus var {'doc': 'Maximum amount of material that can be transfered in or out each time step', \
                        'tooltip': 'Maximum amount of material that can be transfered in or out each time step', \
                        'units': 'kg', \
                        'uilabel': 'Maximum Throughput'}
    double throughput;

Now, we'll add variable for the minimum amount of time that material is
stored, and the maximum fissle content of a new shipment.


.. code-block:: c++

    #pragma cyclus var {'doc': 'Minimum amount of time material must be stored', \
                        'tooltip': 'Minimum amount of time material must be stored', \
                        'units': 'months', \
                        'uilabel': 'Storage Time'}
    int storage_time;

    #pragma cyclus var {'doc': 'Maximum mass fraction of each new shipment that is fissile', \
                        'tooltip': 'Maximum mass fraction of each new shipment that is fissile', \
                        'uilabel': 'Maximum Fissile Fraction'}
    double max_fissile;

Build and Install the Modified Module
---------------------------------------

To rebuild and reinstall this module, just issue the same command as before:

.. code-block: bash

    $ python install.py

Modifying the Input File
-------------------------

If you try to run the same input file with your modified module, you will get
errors because the sample input file no longer includes the necessary pieces
to define your module.  It is missing the new variables.  Try it:

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
    Entity: line 17: element Tutorial_storageFacility: Relax-NG validity error : Expecting an element throughput, got nothing
    Entity: line 17: element Tutorial_storageFacility: Relax-NG validity error : Invalid sequence in interleave
    Entity: line 17: element Tutorial_storageFacility: Relax-NG validity error : Element Tutorial_storageFacility failed to validate content
     ERROR(core  ):Document failed schema validation

Notice that you were able to take advantage of the input file validation simply by using the ``#pragma``.

Now, we'll change that input file.  Open the file ``input/example.xml`` in
your text editor, and find the prototype configuration for the single facility
named "OneFacility" that looks like this.

.. code-block:: xml

  <facility>
    <name>OneFacility</name>
    <config>
      <Tutorial_storageFacility />
    </config>
  </facility>

We need to replace the ``<config>`` element with this:

.. code-block:: xml

    <config>
      <Tutorial_storageFacility>
        <throughput>100</throughput>
        <storage_time>60</storage_time>
        <max_fissile>1.0</max_fissile>
      </Tutorial_storageFacility>
    </config>

Now we can try it again:

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
Simulation ID: 9f15b93c-9ab2-49bb-a14f-fef872e64ce8

