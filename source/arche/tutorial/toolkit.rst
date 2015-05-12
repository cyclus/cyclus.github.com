Adding a ResourceBuffer from the Toolkit
========================================

Cyclus has a growing Toolkit of standard patterns that can be used by
archetype developers.  There are many advantages to using the Toolkit patterns
vs developing similar functionality yourself, typical of most code reuse
situations:

* robustness - Toolkit patterns have been subjected to the Cyclus QA process
* time savings - it will take less time to learn how to use a Toolkit than it takes to develop your own
* improvements - You can benefit immediately from any improvements in the performance of the Toolkit pattern

Code reuse is a critical best practice in all software development.

One of the Toolkit patterns is a ResourceBuff, providing a way to track an inventory of Resoure objects.

In this lesson, we will:

1. Add a ResourceBuff to use as an inventory of material
2. Change our log information to show the info about the buffer
3. Add a state variable for the user input to set the size of the buffer

Add a ResourceBuff
-------------------

A ResourceBuff is available as a data type for another state variable, so we simply have to add the following:

.. code-block:: c++

    /// this facility holds material in storage.
    #pragma cyclus var
    cyclus::toolkit::ResourceBuff inventory;

This creates a state variable named ``inventory`` that is based on the
``cyclus::toolkit::ResourceBuff`` class.  A ResourceBuff object has special
handling by the preprocessor, so it will not appear in the schema and
therefore will not appear in the Cycic UI either.

Let's build, install and test this:

.. code-block:: bash

    $ python install.py --prefix=../install
    $ cyclus -v 2 input/example.xml


Change the Log Output to Be About the Buffer
---------------------------------------------

Now that we have some interesting data, let's change our log message to report
things about that data.  In particular, we will plot the quantity of material
in the buffer and the remaining space in the buffer.

First, remove the LOG from the ``Tick()`` method that wrote "Hello".

Then change the LOG in the ``Tock()`` to be:

.. code-block:: c++

    LOG(cyclus::LEV_INFO1, "tutorial_storage") << "The current inventory is " << inventory.quantity() 
                                               << " kg of material with " << inventory.space()
                                               << " kg of space remaining.";

Notice tht this uses the built in ``quantity()`` and ``space()`` methods of a
ResourceBuff object.

Let's build, install and test this:

.. code-block:: bash

    $ python install.py --prefix=../install
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
 INFO1(tutori):The current inventory is 0 kg of material with 1.79769e+308 kg of space remaining.
 INFO1(tutori):The current inventory is 0 kg of material with 1.79769e+308 kg of space remaining.
 INFO1(tutori):The current inventory is 0 kg of material with 1.79769e+308 kg of space remaining.
 INFO1(tutori):The current inventory is 0 kg of material with 1.79769e+308 kg of space remaining.
 INFO1(tutori):The current inventory is 0 kg of material with 1.79769e+308 kg of space remaining.
 INFO1(tutori):The current inventory is 0 kg of material with 1.79769e+308 kg of space remaining.
 INFO1(tutori):The current inventory is 0 kg of material with 1.79769e+308 kg of space remaining.
 INFO1(tutori):The current inventory is 0 kg of material with 1.79769e+308 kg of space remaining.
 INFO1(tutori):The current inventory is 0 kg of material with 1.79769e+308 kg of space remaining.
 INFO1(tutori):The current inventory is 0 kg of material with 1.79769e+308 kg of space remaining.

 Status: Cyclus run successful!
 Output location: cyclus.sqlite
 Simulation ID: f26913d0-c743-4e2f-9859-20cbcb916498


Add a State Variable to Define the Size of the ResourceBuff
-------------------------------------------------------------

You will note that the space remaining is a very large number and that we have
no way to specify it in the input.  We can do this by adding another state variable:

.. code-block:: c++

    /// max inventory size
    #pragma cyclus var {'doc': 'Total quantity of material that can be stored.', \
                        'tooltip': 'Storage facility size', \
                        'units': 'kg', \
                        'uilabel': 'Inventory Size' }
    double max_inv_size;

As a special (read, undocumented) feature of a ResourceBuff, you also use the
pragma to initialize its size from another state variable.  Change the pragma
for the ResourceBuf to be:

.. code-block:: c++

    #pragma cyclus var {'capacity' : 'max_inv_size'}
    

Finally, we need to change our sample input file to include the additional
state variable.  Insert the following element into the
``<Tutorial_storageFacility>`` element:

.. code-block:: xml

     <max_inv_size>10000</max_inv_size>

Let's build, install and try it:

.. code-block:: bash

    $ python install.py --prefix=../install
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
 INFO1(tutori):The current inventory is 0 kg of material with 10000 kg of space remaining.
 INFO1(tutori):The current inventory is 0 kg of material with 10000 kg of space remaining.
 INFO1(tutori):The current inventory is 0 kg of material with 10000 kg of space remaining.
 INFO1(tutori):The current inventory is 0 kg of material with 10000 kg of space remaining.
 INFO1(tutori):The current inventory is 0 kg of material with 10000 kg of space remaining.
 INFO1(tutori):The current inventory is 0 kg of material with 10000 kg of space remaining.
 INFO1(tutori):The current inventory is 0 kg of material with 10000 kg of space remaining.
 INFO1(tutori):The current inventory is 0 kg of material with 10000 kg of space remaining.
 INFO1(tutori):The current inventory is 0 kg of material with 10000 kg of space remaining.
 INFO1(tutori):The current inventory is 0 kg of material with 10000 kg of space remaining.

 Status: Cyclus run successful!
 Output location: cyclus.sqlite
 Simulation ID: 7bf4a93e-e719-41d3-a468-9e596e725529
