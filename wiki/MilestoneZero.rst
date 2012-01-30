#summary This wiki page documents progress on the first milestone.

== Design material object data structure and creation =

The material object is the main data object passed between black box facilities. An object structure is a necessary part of the interface between facilities.

I like most of the functionality that Kyle set up in the Material class for GENIUS, so for this cyclus deadline, I'm going to mostly exactly replicate it. However, I have been working on aleviating one main area of concern, which has two main consequences. 

  * The enumeration of commodities is not extensible. 
    * In the event that a user would like to invent a new link in the fuel cycle chain, he'll have to break the modularity of the code in order to introduce it, since enums cannot be written to once they are initialized. 
    * I am working on retooling this into some sort of more polymorphic enum-like structure (e.g. a map or a list) that allows reading and writing while continuing to allow some of the case switching that a lot of the rest of the code functions upon. 
    * GENIUS occaisionally uses a material constructor that can generate a material object by naming the type of commodity it is. This relies on specific case switching over commodities in the material class and is an inextensible quality of the code. It is not possible to reformulate this without breaking the encapsulation that cyclus is striving for.

== Design region & institution data structures ==

The structure of the region and institution hierarchy should not deviate heavily from the GENIUS method, but may require modification in order to reference the runtime-generated map of facility and commodity types available for deployment. That is, since deployment of facilities may rely on these region and institution structures, the type maps may need to be available to the region/institution interfaces. TBD.

== Design message passing infrastructure  == 

For facilities to offer, request, recieve and send material, a message passing infrastructure must be created. This will likely be similar to the message passing infrastructure in GENIUS, but may require modification in order to reference the runtime-generated map of facility and commodity types.