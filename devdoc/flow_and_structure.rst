
.. summary Describe & Design Program Flow and Data Structures

Program Flow and Data Structures
================================

Program Flow Overview
+++++++++++++++++++++

Execution flow outline:

   #.  Read input
   #.  Setup model
   #.  Start time steps

     * `The Tick`_: collect offers/requests
     * `Market Resolution`_
     * `The Tock`_: distribute material objects

Simulation Initialization
-------------------------

  #. Load markets based on market models

    #. for each market

      #. check whether the model for this market has been loaded already, and load if necessary
      #. instantiate new market and initialize parameters

        #. Assign commodities to markets

  #. Load facilities based on facility models

    #. for each facility

      #. check whether the model for this facility has been loaded already, and load if necessary
      #. instantiate a template for a new facility based on input parameters

         #. assign commodities to facilities and cross-reference with markets

      #. add template to facility template map

  #. Load regions based on region models

    #. for each region

      #. check whether the model for this region has been loaded already, and load if necessary
      #. instantiate new region and initialize parameters
      #. create list of available facility templates for that region

  #. Load simulation parameters

Facility Deployment
-------------------

When and how does facility deployment happen, based on the list of facility
templates?

The Tick
--------

  # cycle through Regions
    # cycle through Institutions
      # deploy new facilities as necessary
      # cycle through facilities
        # update facility state as appropriate
        # prompt for requests/offers

Market Resolution
-----------------

  * convert sets of requests/offers into sets of material transactions

The Tock
--------

  #. cycle through Markets

    #. cycle through transactions

      #. preform material transactions
      #. update facility state as appropriate

Data Structure Overview
+++++++++++++++++++++++

Abstract Base Classes
---------------------

Communicator
~~~~~~~~~~~~

Provides all functionality for message passing among facilities and markets,
including offers/requests and transactions.

Facility
~~~~~~~~

Provides base definition of facility and standard interface.  All derived
classes must implement this interface cleanly so that they can operate as
plug-in modules.

Market
~~~~~~

Provides base definition of a market and standard interface.  All derived
classes must implement this interface cleanly so that they can operate as
plug-in modules.

Region
~~~~~~

Provides base definition of a region and standard interface.  All derived
classes must implement this interface cleanly so that they can operate as
plug-in modules.

