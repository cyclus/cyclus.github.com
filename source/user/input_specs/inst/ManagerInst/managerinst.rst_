
ManagerInst
===========

Input Parameters
----------------

The ManagerInst module tracks producers of commodities that it 
constructs. It takes no additional input parameters over those 
provided by the core-level institution models. For those familiar with
C++ coding strategies, it simply uses an inherited mix-in class in 
order to manage the facilities it instatiates.

Definiton
+++++++++

.. code-block:: xml

  <define name="ManagerInst">
    <element name="ManagerInst">
      <text/>
    </element>
  </define>

Example
+++++++

.. code-block:: xml

    <institution>    <!-- for explanation of the institution input parameters, see the core-level documentation -->
      <name>SingleInstitution</name>
      <availableprototype>Source</availableprototype>
      <availableprototype>Sink</availableprototype>
      <initialfacilitylist>
	<entry>
	  <prototype>Sink</prototype>
	  <number>1</number>
	</entry>
      </initialfacilitylist>
      <model>
        <ManagerInst/>
      </model>
    </institution>
