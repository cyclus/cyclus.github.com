Adding a Separations Facility
================================

The separations facility will request all the commodities in its Feed
Commodity List, and separate them into any number of streams, plus a waste
stream. 

The following is the input template for ``Cycamore::Separations`` archetype:

.. code-block:: XML

   <facility>
     <name>SeparationsFacility</name>
     <config>
       <Separations>
         <feed_commods>
           <val>_______</val>
         </feed_commods>
         <feed_commod_prefs>
           <val>_______</val>
         </feed_commod_prefs>
         <feedbuf_size>_______</feedbuf_size>
         <throughput>_______</throughput>
         <leftover_commod>_______</leftover_commod>
         <leftoverbuf_size>_______</leftoverbuf_size>
         <streams>
           <item>
             <commod>_______</commod>
             <info> 
               <buf_size>_______</buf_size>
               <efficiencies>
                 <item>
                   <comp>_______</comp>
                   <eff>_______</eff>
                 </item>              
               </efficiencies>
             </info>
           </item>
         </streams>
       </Separations>
     </config>
   </facility>


* Our feed commodity list should include both:
   * Used-UOX-Fuel
   * Used-MOX-Fuel
* The maximum feed inventory is the most feed material that we'll have on
  hand: 1000 tonnes.
* The maximum separations throughout is the size of our plant: 80 tonnes/timestep
* This simple scenario will have a single output stream: Separated_Fissile
    * we will hold no more than 5 tonnes of separated material on hand at any time
    * 99% of all Pu (94000) will go into that stream
* all other material will go to Separated_Waste

Filling in the template, the input block looks like:

.. code-block:: XML

   <facility>
     <name>SeparationsFacility</name>
     <config>
       <Separations>
         <feed_commods>
           <val>spent_uox</val>
           <val>used_mox</val>
         </feed_commods>
         <feed_commod_prefs>
           <val>1.0</val>
           <val>1.0</val>
         </feed_commod_prefs>
         <feedbuf_size>1000E+3_</feedbuf_size>
         <throughput>80e+3</throughput>
         <leftover_commod>Separated_Waste</leftover_commod>
         <leftoverbuf_size>1000e+3</leftoverbuf_size>
         <streams>
           <item>
             <commod>Separated_Fissile</commod>
             <info> 
               <buf_size>5e+3</buf_size>
               <efficiencies>
                 <item>
                   <comp>94000</comp>
                   <eff>0.99</eff>
                 </item>              
               </efficiencies>
             </info>
           </item>
         </streams>
       </Separations>
     </config>
   </facility>


