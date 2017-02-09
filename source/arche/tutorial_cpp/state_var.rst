Adding State Variables
=======================

In this lesson, we will:

1. Add the necessary state variables to define this facility using the Cyclus
   ``#pragma`` directives
2. Build and install the updated module
3. Modify the sample input file to include these variables

Add State Variables with Cyclus #pragma
----------------------------------------------

The Cyclus preprocessor provides a ``#pragma`` that defines variables to
be part of the set of state variables and allows convenient annotations.

First, we'll add the maximum monthly transfer capacity, called ``throughput``.
Open the file ``src/storage.h`` in your text editor.

Immediately after the declaration of ``Tock()``, add the following:

.. code-block:: c++

    #pragma cyclus var { \
      "doc": "Maximum amount of material that can be transferred in or out each time step", \
      "tooltip": "Maximum amount of material that can be transferred in or out each time step", \
      "units": "kg", \
      "uilabel": "Maximum Throughput" \
    }
    double throughput;

Now, we'll add variables for the minimum amount of time that material is
stored and the input/output commodity names.

.. code-block:: c++

    #pragma cyclus var { \
      "doc": "Minimum amount of time material must be stored", \
      "tooltip": "Minimum amount of time material must be stored", \
      "units": "months", \
      "uilabel": "Storage Time" \ 
    }
    int storage_time;

    #pragma cyclus var { \
     "tooltip": "Storage input commodity", \
     "doc": "Input commodity on which Storage requests material.", \
     "uilabel": "Input Commodity", \
     "uitype": "incommodity", \
    }
    std::string incommod;

    #pragma cyclus var { \
     "tooltip": "Storage output commodity", \
     "doc": "Output commodity on which Storage offers material.", \
     "uilabel": "Output Commodity", \
     "uitype": "outcommodity", \
    }
    std::string outcommod;

Build and Install the Modified Module
---------------------------------------

To rebuild, reinstall, and test this module, just issue the same command as before:

.. code-block:: console

    $ ./install.py
    $ Storage_unit_tests

Modify the Input File
-------------------------

If you try to run the same input file with your modified module, you will get
errors because the sample input file no longer includes the necessary pieces
to define your module.  It is missing the new variables.  Try it:

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
    Entity: line 17: element Storage: Relax-NG validity error : Expecting an element throughput, got nothing
    Entity: line 17: element Storage: Relax-NG validity error : Invalid sequence in interleave
    Entity: line 17: element Storage: Relax-NG validity error : Element Storage failed to validate content
     ERROR(core  ):Document failed schema validation

The simulation now fails because it does not match the schema. You can view the schema with

.. code-block:: console

    $ cyclus --agent-schema tutorial:Storage:Storage

Notice that you were able to take advantage of the input file validation simply by using the ``#pragma``.

Our failed cyclus simulation produced an output file that will need to be deleted.

.. code-block:: console

    $ rm cyclus.sqlite

Now, we'll change that input file.  Open the file ``input/storage.xml`` in
your text editor, and find the prototype configuration for the single facility
named "OneFacility" that looks like this.

.. code-block:: xml

  <facility>
    <name>OneFacility</name>
    <config>
      <Storage />
    </config>
  </facility>

We need to replace the ``<config>`` element with this:

.. code-block:: xml

    <config>
      <Storage>
        <throughput>10</throughput>
        <storage_time>1</storage_time>
        <incommod>fuel</incommod>
        <outcommod>stored_fuel</outcommod>
      </Storage>
    </config>

Now we can try it again:

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
