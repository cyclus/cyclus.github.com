Updating the Reactor and Repository
=====================================

Our Advanced Light Water Reactors will flexibly switch between UOX and MOX fuel based on their availability.

Reactor Modifications
----------------------

Add additional entries for:

* Fresh Fuel Commodity: Fresh-MOX-Fuel **
* Fresh Fuel Recipe: Fresh-UOX-Fuel
* Spent Fuel Commidity: Used-MOX-Fuel
* Used Fuel Recipe: Used-MOX-Fuel-4

**Note that we are using the UOX recipe for the MOX recipe in order to have our
fuel fabrication facility do its best to match that recipe by blending streams
of Pu with natural U.

Under user level 1, add 2 entries for the "Fresh Fuel Preference List,
one for each requested commodity.  Since MOX fuel is preferred, the
preference for MOX should be 2 times higher than that or UOX.  Perhaps:

* MOX = 2
* UOX = 1

Repository Modifications
--------------------------
Change the accepted commodity for the repository to be Separated-Waste.

