
Institution Model Input
=======================

Core-level Input
----------------

Input parameters that all institutions must specify are:

  * name - the institution's name
  * available prototypes - a list of prototypes that this institution 
    is able to build
  * initial facility list - a list of facilities to be built at time 
    t = 0

    * prototype - the prototype to be built
    * number - the number to be built

  * model - the institution model defining this institution

Definiton
+++++++++

.. code-block:: xml

  <!-- begin section for institutions -->
  <define name="institution">
    <element name="institution">

      <element name="name">
         <text/>
      </element>
      
      <optional>
        <oneOrMore>
          <element name="availableprototype">
            <text/>
          </element>
        </oneOrMore>
      </optional>

      <optional>
        <element name="initialfacilitylist">
          <oneOrMore>
            <element name="entry">
              <element name="prototype">
                <text/>
              </element>
              <element name="number">
                <data type="nonNegativeInteger"/>
              </element>
            </element>
          </oneOrMore>
        </element>
      </optional>

      <element name="model">
        <text/>
      </element>
    </element>
  </define>

Example
+++++++

.. code-block:: xml

    <institution>
      <name>SingleInstitution</name>                   <!-- a name -->
      <availableprototype>Source</availableprototype>  <!-- this institution can build prototypes of type "Source" -->
      <availableprototype>Sink</availableprototype>    <!-- this institution can build prototypes of type "Source" -->
      <initialfacilitylist>
        <entry>
          <prototype>Source</prototype>                <!-- facilities from the prototype "Source" will be built at time t = 0 -->
          <number>1</number>                           <!-- 1 such facility will be built -->
        </entry>
        <entry>
          <prototype>Sink</prototype>                  <!-- facilities from the prototype "Source" will be built at time t = 0 -->
          <number>1</number>                           <!-- 1 such facility will be built -->
        </entry>
      </initialfacilitylist>
      <model>
        <NullInst/>                                    <!-- use the simplest type of Institution Module -->
      </model>
    </institution>

Supported Institution Modules
-----------------------------

The following is a list of currently-available Cycamore module
input specifications:

.. toctree::
   :glob:

   */*
