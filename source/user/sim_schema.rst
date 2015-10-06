Simulation Schema
=================
|Cyclus| currently has two top-level schema that all input XML files must 
adhere to be valid and executable. If you have questions about how an input 
file should look, please refer to the schema.  Both of these are also printable
from the command line as well, should you ever need them.

Default Schema
--------------
This is the recommended schema to use for most simulations.  It imposes a
Region, Institution, and Facility hierarchy that is natural for modeling
the relationship between different actors in the nuclear fuel cycle.  You 
can print this schema from the command line with the ``--schema`` option:

.. code-block:: bash

    $ cyclus --schema

This returns the following:

.. code-block:: xml

    <grammar xmlns="http://relaxng.org/ns/structure/1.0"
	datatypeLibrary="http://www.w3.org/2001/XMLSchema-datatypes">
	<start>

	<element name="simulation">
	  <optional><element name="schematype"><text/></element></optional>
	<interleave>

	  <optional><element name="ui"><text/></element></optional>

	  <element name ="control">
		<interleave>
		  <optional>
			<element name="simhandle"> <data type="string"/> </element>
		  </optional>
		  <element name="duration"> <data type="nonNegativeInteger"/> </element>
		  <element name="startmonth"> <data type="nonNegativeInteger"/> </element>
		  <element name="startyear"> <data type="nonNegativeInteger"/> </element>
		  <optional>
			<element name="decay"> <text/> </element>
		  </optional>
		  <optional>
			<element name="solver"> 
			  <interleave>
				<optional><element name="config">
				<choice>
				  <element name="greedy">
					<interleave>
					  <optional>
						<element name="preconditioner"> <text/> </element>
					  </optional>
					</interleave>
				  </element>
				  <element name="coin-or">
					<interleave>
					  <optional>
						<element name="timeout">  <data type="positiveInteger"/>  </element>
					  </optional>
					  <optional><element name="verbose"><data type="boolean"/></element></optional>
					  <optional><element name="mps"><data type="boolean"/></element></optional>
					</interleave>
				  </element>
				</choice>
				</element></optional>
				<optional>
				  <element name="allow_exclusive_orders">
					<data type="boolean" />
				  </element>
				</optional>
			  </interleave>
			</element>
		  </optional>
		</interleave>
	  </element>

	  <zeroOrMore>
		<element name="commodity">
		  <interleave>
			<element name="name"> <text/> </element>
			<element name="solution_priority"> <data type="double"/> </element>
		  </interleave>
		</element>
	  </zeroOrMore>

	  <element name="archetypes"> 
		<oneOrMore>
		  <element name="spec">
			<interleave>
			  <optional><element name="path"><text/></element></optional>
			  <optional><element name="lib"><text/></element></optional>
			  <element name="name"><text/></element>
			  <optional><element name="alias"><text/></element></optional>
			</interleave>
		  </element>
		</oneOrMore>
	  </element>

	  <oneOrMore>
		<element name="facility">
		  <interleave>
			<element name="name"> <text/> </element>
			<optional>
			  <element name="lifetime"> <data type="nonNegativeInteger"/> </element>
			</optional>

			<element name="config">
			  <choice>
			  @Facility_REFS@
			  </choice>
			</element>
		  </interleave>
		</element>
	  </oneOrMore>

	  <oneOrMore>
		<element name="region"> <interleave>
		  <element name="name"> <text/> </element>
		  <optional>
			<element name="lifetime"> <data type="nonNegativeInteger"/> </element>
		  </optional>

		  <element name="config">
			<choice>
			@Region_REFS@
			</choice>
		  </element>

		  <oneOrMore>
			<element name="institution"> <interleave>
			  <element name="name"> <text/> </element>
			  <optional>
				<element name="lifetime"> <data type="nonNegativeInteger"/> </element>
			  </optional>

			  <optional>
				<element name="initialfacilitylist">
				  <oneOrMore>
					<element name="entry">
					  <interleave>
						<element name="prototype"> <text/> </element>
						<element name="number"> <data type="nonNegativeInteger"/> </element>
					  </interleave>
					</element>
				  </oneOrMore>
				</element>
			  </optional>

			  <element name="config">
				<choice>
				@Inst_REFS@
				</choice>
			  </element>
			</interleave> </element>
		  </oneOrMore>

		</interleave> </element>
	  </oneOrMore>

	  <zeroOrMore>
		<element name="recipe">
		  <interleave>
			<element name="name"><text/></element>
			<element name="basis"><text/></element>
			<oneOrMore>
			  <element name="nuclide">
				<interleave>
				  <element name="id"><data type="string"/></element>
				  <element name="comp"><data type="double"/></element>
				</interleave>
			  </element>
			</oneOrMore>
		  </interleave>
		</element>
	  </zeroOrMore>

	</interleave> </element>

	</start>

	</grammar>

Flat Schema
-----------
The flat schema is an option schema for advanced users. It 'flattens' the 
Region, Institution, and Facility hierarchy. This make it easier to model
collections of facilities in cases where regional and institutional effects
are not of primary interest.  You can print this from the command line 
with the combination of the ``--schema`` and ``--flat-schema`` options:

.. code-block:: bash

    $ cyclus --flat-schema --schema

This displays the following:

.. code-block:: xml

    <grammar xmlns="http://relaxng.org/ns/structure/1.0"
	datatypeLibrary="http://www.w3.org/2001/XMLSchema-datatypes">
	<start>
	<element name="simulation">
	  <optional><element name="schematype"><text/></element></optional>
	<interleave>

	  <optional><element name="ui"><text/></element></optional>

	  <element name ="control">
		<interleave>
		  <optional>
			<element name="simhandle"><data type="string"/></element>
		  </optional>
		  <element name="duration"><data type="nonNegativeInteger"/></element>
		  <element name="startmonth"><data type="nonNegativeInteger"/></element>
		  <element name="startyear"><data type="nonNegativeInteger"/></element>
		  <optional> 
			<element name="decay"><text/></element> 
		  </optional>
		  <optional>
			<element name="solver"> 
			  <interleave>
				<optional><element name="config">
				<choice>
				  <element name="greedy">
					<interleave>
					  <optional>
						<element name="preconditioner"> <text/> </element>
					  </optional>
					</interleave>
				  </element>
				  <element name="coin-or">
					<interleave>
					  <optional>
						<element name="timeout">  <data type="positiveInteger"/>  </element>
					  </optional>
					  <optional><element name="verbose"><data type="boolean"/></element></optional>
					  <optional><element name="mps"><data type="boolean"/></element></optional>
					</interleave>
				  </element>
				</choice>
				</element></optional>
				<optional>
				  <element name="allow_exclusive_orders">
					<data type="boolean" />
				  </element>
				</optional>
			  </interleave>
			</element>
		  </optional>
		</interleave>
	  </element>

	  <zeroOrMore>
		<element name="commodity">
		  <interleave>
			<element name="name"><text/></element>
			<element name="solution_priority"><data type="double"/></element>
		  </interleave>
		</element>
	  </zeroOrMore>

	  <element name="archetypes"> 
		<oneOrMore>
		  <element name="spec">
			<interleave>
			  <optional><element name="path"><text/></element></optional>
			  <optional><element name="lib"><text/></element></optional>
			  <element name="name"><text/></element>
			  <optional><element name="alias"><text/></element></optional>
			</interleave>
		  </element>
		</oneOrMore>
	  </element>

	  <oneOrMore>
		<element name="prototype">
		<interleave>
		  <element name="name"><text/></element>
		  <optional>
			<element name="lifetime"> <data type="nonNegativeInteger"/> </element>
		  </optional>

		  <element name="config">
			<choice>
			  @MODEL_SCHEMAS@
			</choice>
		  </element>

		</interleave>
		</element>
	  </oneOrMore>

	  <oneOrMore>
		<element name="agent">
		  <interleave>
			<element name="name"><text/></element>
			<element name="prototype"><text/></element>
			<optional>
			  <element name="parent"><text/></element>
			</optional>
		  </interleave>
		</element>
	  </oneOrMore>

	  <zeroOrMore>
		<element name="recipe">
		  <interleave>
			<element name="name"><text/></element>
			<element name="basis"><text/></element>
			<oneOrMore>
			  <element name="nuclide">
				<interleave>
				  <element name="id"><data type="string"/></element>
				  <element name="comp"><data type="double"/></element>
				</interleave>
			  </element>
			</oneOrMore>
		  </interleave>
		</element>
	  </zeroOrMore>

	</interleave>
	</element><!-- end of simulation -->
	</start>
	</grammar>

