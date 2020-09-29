Updating the Reactor and Repository
=====================================

We can add in Advanced Light Water Reactors that will flexibly switch between UOX and MOX fuel based on their availability. This protoype uses the same template as the other reactors with a few additional entries.  

Reactor Modifications
----------------------

Add additional entries for:

* Fresh Fuel Commodity: Fresh-MOX-Fuel [#f1]_ 
* Fresh Fuel Recipe: Fresh-UOX-Fuel
* Spent Fuel Commidity: Used-MOX-Fuel
* Used Fuel Recipe: Used-MOX-Fuel-4



Under user level 1, add 2 entries for the "Fresh Fuel Preference List,
one for each requested commodity.  Since MOX fuel is preferred, the
preference for MOX should be 2 times higher than that or UOX.  Perhaps:

* MOX = 2
* UOX = 1

Repository Modifications
--------------------------
Add an accepted commodity for the repository to be Separated-Waste.


.. rubric:: Footnotes

.. [#f1] Note that we are using the UOX recipe for the MOX recipe in order to have our fuel fabrication facility do its best to match that recipe by blending streams of Pu with natural U.
