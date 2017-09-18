CEP 27 - |Cyclus| Database Restructuring
********************************************

:CEP: 27
:Title: |Cyclus| Database Restructuring
:Last-Modified: 2017-09-11
:Author: Dr. Tony Scopes & Jin whan Bae
:Status: Draft
:Type: Standards Track
:Created: 2013-09-11

Abstract
============

This CEP proposes to restructure the |cyclus| output database structure in order to
reduce the number of tables and redundancy of data, and ultimately reduce the number
of `joins' required for data analysis. Doing so would reduce the computing time
for end-user analysis, and allow for a clearer, more concise output database.


Motivation
==========
The current output database requires the user to join multiple tables to acquire
meaningful material data, such as quantity and composition. This causes long 
analysis computing times and confusion for the user.


Rationale
=========
The proposed restructure aims to reduce the number of tables the user has to query
for analysis. This can be done by two methods:
1. Combine redundant tables
2. Reduce a table (`Compositions` table) into a column with variable-type map.



Specification \& Implementation
===============================
The following tables that are currently in output are considered for editing:
1. Compositions
2. Transactions
3. Recipes
4. ExplicitInventory
5. ExplicitInventoryCompact
6. Info
7. InfoExplicitInv
8. ResCreators
9. Resources


Material and Product
--------------------

Currently, both **Material** and **Product** are in the Resources Table.
The internal state of **Material** is stored in **Compositions**, and
the internal state of **Product** is stored in **Products** table.
This requires the user to make joins to acquire the internal state
of the resources.

We can avoid unnecessary joins by creating a **Materials** and 
**Products** table, with the internal state (composition and quality)
as a column.

In short, we propose to replace **Compositions**, **Products**, and
**Resources** table with **Materials** and **Products** Table. In the
process, the **QualID** column would be removed.

Currently:

============  ==========
        Resources
------------------------
Column          Type  
============  ==========
Simid           uuid
Resourceid      int
ObjId           int
Type            string
TimeCreated     int
Quantity        double
Units           string
QualId          int
Parent1         int
Parent2         int
============  ==========



============  ==========
        Products
------------------------
Column          Type  
============  ==========
Simid           uuid
Qualid          int
Quality         string
============  ==========




============  ==========
        Compositions
------------------------
Column          Type  
============  ==========
Simid           uuid
Qualid          int
NucId           int
MassFrac        double
============  ==========

Would be restructured to:


============  ==========
        Materials
------------------------
Column          Type  
============  ==========
Simid           uuid
Resourceid      int
ObjId           int
TimeCreated     int
Parent1         int
Parent2         int
Units           string
Quantity        double
Composition     map<int,double>
============  ==========
Where map would have <NucId, MassFrac>

============  ==========
        Products
------------------------
Column          Type  
============  ==========
Simid           uuid
Resourceid      int
ObjId           int
TimeCreated     int
Parent1         int
Parent2         int
Units           string
Quantity        double
Quality         string
============  ==========


Also, since **QualID** is removed, the **Recipes** Table
also needs to be edited:

============  ==========
        Recipes
------------------------
Column          Type  
============  ==========
Simid           uuid
Recipes         string
Composition     map<int,double>
============  ==========


Transactions
------------
The transactions table would be modified
to have a flag for weather the commodity is 
a material or a product.

IS THIS NEEDED??

============  ==========
        Transactions
------------------------
Column          Type  
============  ==========
Simid           uuid
TransactionId   int
SenderId        int
ReceiverId      int
Resourceid      int
Commodity       string
Time            int
============  ==========

============  ==========
        Transactions
------------------------
Column          Type  
============  ==========
Simid           uuid
TransactionId   int
SenderId        int
ReceiverId      int
ResourceType    int(bool)
Resourceid      int
Commodity       string
Time            int
============  ==========


Rescreators
-----------
Along with **Transactions**, the **Rescreators**
table would need another column, ResourceType:

============  ==========
        Rescreators
------------------------
Column          Type  
============  ==========
Simid           uuid
Resourceid      int
AgentId         int
ResourceType    int(bool)
============  ==========


Merge ExplicitInventory & ExplicitInventoryCompct
-------------------------------------------
The **ExplicitInventory** table and **ExplicitInventoryCompact**
table should be merged to a single table, called **Inventories**.
The current **ExplicitInventory** table and **ExplicitInventoryCompact**
table has a structure as such:
============  ==========
   ExplicitInventory
------------------------
Column          Type  
============  ==========
Simid           uuid
Agentid         int
Time            int
InventoryName   string
NucId           int 
Quantity        double
============  ==========

============  ==========
 ExplicitInventoryCompact
------------------------
Column          Type  
============  ==========
Simid           uuid
Agentid         int
Time            int
InventoryName   string
Quantity        double
Composition     map<int,double>
============  ==========

============  ==========
        Inventories
------------------------
Column          Type  
============  ==========
Simid           uuid
Agentid         int
Time            int
InventoryName   string
Quantity        double
Composition     int
============  ==========


Merge Info & InfoExplicitInv
----------------------------
We saw little reason to separate the two tables.
Combining them would not significantly improve anything,
but would reduce the number of tables created.




Backwards Compatibility
=======================
This CEP is not backwards compatible.

Document History
================
This document is released under the CC-BY 3.0 license.

References and Footnotes
========================

.. rubric:: References

