
Advanced DRE Interaction
========================

This chapter explains how to interact with Cyclus's **Dynamic Resource Exchange (DRE)** system using advanced methods. Facilities and Institutions use the DRE to participate in resource markets by issuing **requests**, placing **bids**, and accepting or rejecting **trades**.

This guide covers:

* Full lifecycle of a material trade in Cyclus
* Implementation of request, bid, and trade handlers
* Conditional bidding strategies
* Interaction with multiple commodities
* Resource validation and transformation

1. The DRE Lifecycle
--------------------

Each simulation timestep, the DRE coordinates a market:

1. Agents issue **requests** for resources (`GetMatlRequests()` or `GetProductRequests()`)
2. Agents issue **bids** in response to requests (`GetMatlBids()` or `GetProductBids()`)
3. The DRE matches trades
4. Agents execute trades using:

   * `AcceptMatlTrades()` / `AcceptProductTrades()` to receive material
   * `OfferMatl()` / `OfferGen()` to provide material


2. Requesting Material
----------------------

Requests are issued when the agent has capacity for a resource. Each request:

* Specifies a desired quantity
* Indicates the input commodity
* Can include a recipe or preference weighting

.. code-block:: cpp

std::set\<RequestPortfolio<Material>::Ptr> Reactor::GetMatlRequests() {
std::set\<RequestPortfolio<Material>::Ptr> ports;

```
double amt = fresh_fuel_.space();
if (amt <= 0) return ports;

Material::Ptr dummy = cyclus::NewBlankMaterial(amt);
RequestPortfolio<Material>::Ptr port(new RequestPortfolio<Material>());
port->AddRequest(dummy, this, in_commodity);
ports.insert(port);
return ports;
```

}

---

3. Bidding Material

---

Bids are generated when an agent has material to offer. Bids:

* Respond to specific requests
* Specify quantity and provider
* May include constraints (exclusive, mutual, etc.)

.. code-block:: cpp

std::set\<BidPortfolio<Material>::Ptr> Reactor::GetMatlBids(
cyclus::CommodMap<Material>::type& commod\_requests) {

```
std::set<BidPortfolio<Material>::Ptr> ports;
if (spent_fuel_.quantity() <= 0) return ports;

for (auto& req : commod_requests[out_commodity]) {
  Material::Ptr offer = spent_fuel_.Peek();
  BidPortfolio<Material>::Ptr port(new BidPortfolio<Material>());
  port->AddBid(req, offer, this);
  ports.insert(port);
}
return ports;
```

}

You can conditionally bid based on isotopic content, facility state, or request attributes.

---

4. Accepting Material

---

After the market resolves, agents are delivered trades.

.. code-block:: cpp

void Reactor::AcceptMatlTrades(
const std::map\<Trade<Material>, Material::Ptr>& responses) {
for (auto& pair : responses) {
fresh\_fuel\_.Push(pair.second);
}
}

This is typically where tracking, transformation, or validation occurs.

---

5. Providing Material

---

Outgoing trades are fulfilled using `OfferMatl()`:

.. code-block:: cpp

Material::Ptr Reactor::OfferMatl(Material::Ptr request) {
return spent\_fuel\_.PopQty(request->quantity());
}

You may return:

* Raw buffer contents
* A transmuted material (`mat->Transmute("NewRecipe")`)
* A composition-weighted mixture (see toolkit::Mix())

---

6. Tips and Best Practices

---

* Use Peek() to inspect buffer contents before bidding.
* Always guard bids and requests with quantity checks.
* Prefer making bids conditional on request content (e.g., recipe match).
* Store incoming trades by commodity if multiple inputs exist.
* Log commodity mismatches or undersupplied trades.

---

7. Beyond Facilities

---

Institutions can also interact with the DRE, though less commonly. They may:

* Mediate trades for child agents
* Collect price or commodity data
* Implement regional trade quotas

This often requires custom mapping or override of Institution DRE hooks.

---

8. Summary

---

Advanced DRE interaction involves five core functions and optional filtering or logic. By understanding this flow, developers can:

* Precisely control when and how trades occur
* Encode policy and preference logic
* Track material flow for safety or economics

Continue with the next chapter on inspecting materials with the `Marquetry` toolkit.

.. seealso::

* \:ref:`marquetry_query`
* \:ref:`custom_institution`
