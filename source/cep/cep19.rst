CEP 19 - Cyclus Input Procedure Updates
********************************************

:CEP: 19
:Title: Cyclus Input Procedure Updates
:Last-Modified: 2013-10-16
:Author: Dr. Tony Scopes & Robert Flanagan
:Status: Draft
:Type: Standards Track
:Created: 2013-10-16

Introduction
============

This CEP proposes to update the cyclus input paradigm and the module schemas such that
they enable a wider variety of tools. This CEP was written with two types of tools in mind:
graphical user interfaces and large scale parameter investigations. The goal of this 
CEP is to give the input scheme the descriptive power it needs to provide users and module
developers with an elegent and clear method of building cyclus input files.


The first major change is to develop a suite of patterns for use by cyclus module schema. 
These patterns are meant to richly representing module input fields. These patterns will be a 
collection of elements that provide sufficient metadata needed by the two use cases listed
above. For instance, one such additional element is 'tooltip'.

The second change is the addition of an interface to modules. This interface will be used in 
conjuction with the current 'schema()' member function. This function will be called 'default_inputs()'
and return an xml input file snippit for the facility with default values in all input fields.

Motivation
==========
CycIC (and other less useful interfaces) requires this new suite of patterns to provide users with
a better experience. For example integrated module documentation is part of this proposal. In addition,
many elements of the pattern will also be useful for parametric sweeps.  

Specification \& Implementation
===============================
The following patterns are proposed to be added to the master Cyclus schema.


Tooltip
+++++++
Tooltip elements is a short string of text that the developer can add to an input field that will 
show when a user scrolls over this field in the graphical user interface. This is an optional field.

.. code-block:: xml

  <define name="tooltip">
    <element name="tooltip">
      <data type="string" />
     </element>
  </define>


Help
++++
Help elements will provide a more thorough explaination of the input field, it can be accessed through the
graphical user interface. This is an optional field.

.. code-block:: xml

  <define name="help">
    <element name="help">
      <data type="string" />
    </element>
  </define>


Units
+++++
Units elements apply information to an input field that indicate to the user what units are attached to the
value in this field. 

.. code-block:: xml 

  <define name="units">
    <element name="units">
      <data type="string" />
    </element>
  </define>


User Level
++++++++++
User level elements allow developers to set the user level of a specific input field. This value ranges
from 0 to 10 with 0 being simple inputs and 10 being very advanced inputs. This is an optional field
and if left blank the value will be set to zero by the graphical user interface.

.. code-block:: xml 

  <define name="userLevel">
    <element name="userLevel">
      <choice>
	<value>0</value>
	<value>1</value>
	<value>2</value>
	<value>3</value>
	<value>4</value>
	<value>5</value>
	<value>6</value>
	<value>7</value>
	<value>8</value>
	<value>9</value>
	<value>10</value>
      </choice>
    </element>
  </define>


Vary
++++
The 'vary' element is a special boolean element that allows a cyclus user to set wether the input 
field it is attached to can be varied for a parametric study. This flag is optional and can take
the values "true", "false", "1", "0".

.. code-block:: xml

  <define name="vary"> 
    <element name="vary">
      <data type="boolean" />
    </element>
  </define>


Sampling Function
+++++++++++++++++
Sampling function is an element that goes with the vary element. If the vary element is set to true
a sampling function is required to provide the sampling behavior for the element. This is a string
input that represents the mathematical expression of the sampling function. This is an optional flag.

.. code-block:: xml

  <define name="samplingFunction">
    <element name="samplingFunction">				
      <data type="string" />
    </element>
  </define>


Field Types
+++++++++++

The field types used for input fields are listed below. In general they are associated with a 
specific data type. In addition there are several field types that are categorical. This
implies that the field has discrete values for which it can take.  

.. code-block:: xml

  <define name="floatField">
    <element name="floatField">
      <interleave>
        <element name="value">
	  <data type="double" />
        </element>
        <optional>
	  <element name="lower">
            <data type="double" />
	  </element>
        </optional>
	<optional>
	  <element name="upper">
	    <data type="double" />
	  </element>
	</optional>
	<optional>
	  <ref name="userLevel" />
	</optional>
	<optional>
	  <ref name="vary" />
	</optional>
	<optional>
	  <ref name="samplingFunction" />
	</optional>
	<optional>
	  <ref name="tooltip" />
	</optional>
	<optional>
	  <ref name="help" />
	</optional>
	<optional>
	  <ref name="units" />
	</optional>
      </interleave>		
    </element>
  </define>

  <define name="intField">
    <element name="intField">
      <interleave>
        <element name="value">
	  <data type="int" />
        </element>
        <optional>
	  <element name="lower">
            <data type="int" />
	  </element>
        </optional>
	<optional>
	  <element name="upper">
	    <data type="int" />
	  </element>
	</optional>
	<optional>
	  <ref name="userLevel" />
	</optional>
	<optional>
	  <ref name="vary" />
	</optional>
	<optional>
	  <ref name="samplingFunction" />
	</optional>
	<optional>
	  <ref name="tooltip" />
	</optional>
	<optional>
	  <ref name="help" />
	</optional>
	<optional>
	  <ref name="units" />
	</optional>
      </interleave>		
    </element>
  </define>

  <define name="boolField">
    <element name="boolField">
      <interleave>
        <element name="value">
	  <data type="boolean" />
        </element>
        <optional>
	  <element name="lower">
            <data type="boolean" />
	  </element>
        </optional>
	<optional>
	  <element name="upper">
	    <data type="boolean" />
	  </element>
	</optional>
	<optional>
	  <ref name="userLevel" />
	</optional>
	<optional>
	  <ref name="vary" />
	</optional>
	<optional>
	  <ref name="samplingFunction" />
	</optional>
	<optional>
	  <ref name="tooltip" />
	</optional>
	<optional>
	  <ref name="help" />
	</optional>
	<optional>
	  <ref name="units" />
	</optional>
      </interleave>		
    </element>
  </define>

  <define name="stringField">
    <element name="stringField">
      <interleave>
        <element name="value">
	  <data type="string" />
        </element>
	<optional>
	  <ref name="userLevel" />
	</optional>
	<optional>
	  <ref name="vary" />
	</optional>
	<optional>
	  <ref name="samplingFunction" />
	</optional>
	<optional>
	  <ref name="tooltip" />
	</optional>
	<optional>
	  <ref name="help" />
	</optional>
	<optional>
	  <ref name="units" />
	</optional>
      </interleave>		
    </element>
  </define>

  <define name="blobField">
    <element name="blobField">
      <interleave>
        <element name="value">
	  <data type="base64Binary" />
        </element>
	<optional>
	  <ref name="userLevel" />
	</optional>
	<optional>
	  <ref name="vary" />
	</optional>
	<optional>
	  <ref name="samplingFunction" />
	</optional>
	<optional>
	  <ref name="tooltip" />
	</optional>
	<optional>
	  <ref name="help" />
	</optional>
	<optional>
	  <ref name="units" />
	</optional>
      </interleave>		
    </element>
  </define>

  <define name="categoricalBlobField">
    <element name="categoricalBlobField">
      <interleave>
        <element name="value">
	  <data type="base64Binary" />
        </element>
	<element name="categories">
	  <list>
	    <oneOrMore>
	      <data type="base64Binary" />
	    </oneOrMore>
	  </list>	
	</element>
	<optional>
	  <ref name="userLevel" />
	</optional>
	<optional>
	  <ref name="vary" />
	</optional>
	<optional>
	  <ref name="samplingFunction" />
	</optional>
	<optional>
	  <ref name="tooltip" />
	</optional>
	<optional>
	  <ref name="help" />
	</optional>
	<optional>
	  <ref name="units" />
	</optional>
      </interleave>		
    </element>
  </define>

  <define name="categoricalStringField">
    <element name="categoricalStringField">
      <interleave>
        <element name="value">
	  <data type="string" />
        </element>
	<element name="categories">
	  <list>
	    <oneOrMore>
	      <data type="string" />
	    </oneOrMore>
	  </list>	
	</element>
	<optional>
	  <ref name="userLevel" />
	</optional>
	<optional>
	  <ref name="vary" />
	</optional>
	<optional>
	  <ref name="samplingFunction" />
	</optional>
	<optional>
	  <ref name="tooltip" />
	</optional>
	<optional>
	  <ref name="help" />
	</optional>
	<optional>
	  <ref name="units" />
	</optional>
      </interleave>		
    </element>
  </define>

  <define name="categoricalIntField">
    <element name="categoricalIntField">
      <interleave>
        <element name="value">
	  <data type="int" />
        </element>
	<element name="categories">
	  <list>
	    <oneOrMore>
	      <data type="int" />
	    </oneOrMore>
	  </list>	
	</element>
	<optional>
	  <ref name="userLevel" />
	</optional>
	<optional>
	  <ref name="vary" />
	</optional>
	<optional>
	  <ref name="samplingFunction" />
	</optional>
	<optional>
	  <ref name="tooltip" />
	</optional>
	<optional>
	  <ref name="help" />
	</optional>
	<optional>
	  <ref name="units" />
	</optional>
      </interleave>		
    </element>
  </define>

  <define name="categoricalFloatField">
    <element name="categoricalFloatField">
      <interleave>
        <element name="value">
	  <data type="double" />
        </element>
	<element name="categories">
	  <list>
	    <oneOrMore>
	      <data type="double" />
	    </oneOrMore>
	  </list>	
	</element>
	<optional>
	  <ref name="userLevel" />
	</optional>
	<optional>
	  <ref name="vary" />
	</optional>
	<optional>
	  <ref name="samplingFunction" />
	</optional>
	<optional>
	  <ref name="tooltip" />
	</optional>
	<optional>
	  <ref name="help" />
	</optional>
	<optional>
	  <ref name="units" />
	</optional>
      </interleave>		
    </element>
  </define>



Document History
================

This document is released under the CC-BY 3.0 license.

References and Footnotes
========================

.. rubric:: References

