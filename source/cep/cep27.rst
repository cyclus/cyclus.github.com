CEP 27 - |Cyclus| Database Restructuring
********************************************

:CEP: 27
:Title: |Cyclus| Database Restructuring
:Last-Modified: 2017-09-11
:Author: Jin whan Bae & Anthony Scopatz
:Status: Draft
:Type: Standards Track
:Created: 2013-09-11

Abstract
============
This CEP proposes to restructure the |cyclus| output database structure in order to
reduce the number of tables and redundancy of data, and ultimately reduce the number
of ``joins`` required for data analysis. Doing so would reduce the computing time
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
2. Reduce a table (``Compositions`` table) into a column with variable-type map.

Additionally, this CEP proposes to store both **Inventories** and **Transactions**
by default. Either table may be backed out of the other (with additional
information coming from **Materials** etc). However, this backing out process has proven
extrodinarily expensive, exploding the number of operations needed to back out non-present
by millions to billions. Even for small databases, this has proven prohibitive.

While storing both **Inventories** and **Transactions** may seem inefficient, consider
that:

* Data storage is cheap,
* Material inventories are what most analysis tasks require, and
* This is precisely double-entry bookkeeping, as applied to the nuclear fuel cycle.

Double-entry bookkeeping was huge innovation in accounting systems. When implemented
correctly and without fraud, it leads to a self-consisent system. This enables errors
to be discovered and corrected earlier. This CEP argues that |Cyclus| should provide
the information needed to verify the mass balances, if requested.


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
process, the **QualId** column would be removed.

Currently:

============  ==========
        Resources
------------------------
Column          Type
============  ==========
SimId           uuid
ResourceId      int
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
SimId           uuid
QualId          int
Quality         string
============  ==========




============  ==========
        Compositions
------------------------
Column          Type
============  ==========
Simid           uuid
QualId          int
NucId           int
MassFrac        double
============  ==========

Would be restructured to:


============  ==========
        Materials
------------------------
Column          Type
============  ==========
SimId           uuid
ResourceId      int
ObjId           int
TimeCreated     int
Parent1         int
Parent2         int
Units           string
Quantity        double
Composition     map<int,double>
============  ==========

Where the composition column would map <NucId, MassFrac>

============  ==========
        Products
------------------------
Column          Type
============  ==========
SimId           uuid
ResourceId      int
ObjId           int
TimeCreated     int
Parent1         int
Parent2         int
Units           string
Quantity        double
Quality         string
============  ==========

Also, since **QualId** is removed, the **Recipes** Table
also needs to be edited:

============  ==========
        Recipes
------------------------
Column          Type
============  ==========
SimId           uuid
Recipes         string
Composition     map<int,double>
============  ==========


Transactions
------------
The transactions table would be modified to have an integer flag for whether
the commodity is a material or a product.  This flag let's anyone inspecting
the transaction table know which resource table (either **Materials** or
**Products**) to go to to find the actual concrete resource.

**Current:**

============  ==========
        Transactions
------------------------
Column          Type
============  ==========
SimId           uuid
TransactionId   int
SenderId        int
ReceiverId      int
ResourceId      int
Commodity       string
Time            int
============  ==========

**Proposed**

================  ==========
        Transactions
----------------------------
Column               Type
================  ==========
SimId               uuid
TransactionId       int
SenderId            int
ReceiverId          int
**ResourceType**    **int**
ResourceId          int
Commodity           string
Time                int
================  ==========

This table will now be optionally written to the database. The default will be to
write this table (true).


ResCreators
-----------
Along with **Transactions**, the **ResCreators**
table would need another column, ResourceType:

============  ==========
        ResCreators
------------------------
Column          Type
============  ==========
Simid           uuid
Resourceid      int
AgentId         int
ResourceType    int
============  ==========


Merge ExplicitInventory & ExplicitInventoryCompact
----------------------------------------------------
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

This table will be optionally written to the database. The default will be to
write this table (true).


Merge Info & InfoExplicitInv
----------------------------
We saw little reason to separate the two tables. Combining them is a matter of cleanliness.
Additionallty, the single **Info** table will have to contain an extra column, **RecordTransactions**.
Furthermore, the **RecordInventory** column is no longer needed and will be removed.

Other informational tables may also be merged into the single table.


Backwards Compatibility
=======================
This CEP is not backwards compatible.

Document History
================
This document is released under the CC-BY 3.0 license.

References and Footnotes
========================

.. rubric:: References

