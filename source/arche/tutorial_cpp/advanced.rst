
Advanced Agent Creation
===============================

This chapter offers a comprehensive walkthrough of developing a fully functional and feature-rich **Cyclus Facility archetype**. It is intended for users who have completed the basic C++ agent tutorial and are ready to begin writing production-grade archetypes with more advanced capabilities.

By the end of this chapter, you will understand how to:

* Declare validated input parameters and manage internal state.
* Interact with Cyclus's Dynamic Resource Exchange (DRE) to request and accept trades.
* Use toolkit classes for material management, querying, and time series.
* Implement lifecycle methods (`Tick`, `Tock`, `EnterNotify`) effectively.
* Incorporate logging, testing, and optional output recording.

The concepts are demonstrated using a simplified but illustrative example facility: an **AdvancedReactor**, which consumes fuel, burns it for a defined residence time, and then discharges spent fuel.

---

1. Agent Structure and Metadata

---

Begin by defining the agent header file with proper Cyclus metadata and parameter declarations.

.. code-block:: cpp

// advanced\_reactor.h
\#ifndef ADVANCED\_REACTOR\_H\_
\#define ADVANCED\_REACTOR\_H\_

\#include <string>
\#include <queue>
\#include "cyclus.h"
\#include "toolkit/resource\_buff.h"
\#include "toolkit/mat\_query.h"
\#include "toolkit/commod\_map\_inst.h"
\#include "toolkit/time\_series.h"

class AdvancedReactor : public cyclus::Facility {
public:
AdvancedReactor(cyclus::Context\* ctx);
virtual \~AdvancedReactor() {}

```
#pragma cyclus note {
  "doc": "An advanced reactor facility that models fuel intake, burnup, and discharge."
}

// Core parameters
#pragma cyclus var {"tooltip": "Maximum fresh fuel inventory (kg)", "units": "kg"}
double fresh_fuel_cap;

#pragma cyclus var {"tooltip": "Maximum spent fuel inventory (kg)", "units": "kg"}
double spent_fuel_cap;

#pragma cyclus var {"tooltip": "Residence time in core (timesteps)", "default": 3, "lbound": 1}
int residence_time;

#pragma cyclus var {"tooltip": "Input commodity for fresh fuel"}
std::string in_commodity;

#pragma cyclus var {"tooltip": "Output commodity for spent fuel"}
std::string out_commodity;

#pragma cyclus var {"tooltip": "Recipe for spent fuel"}
std::string out_recipe;

virtual std::string str();
virtual void EnterNotify();
virtual void Tick();
virtual void Tock();

virtual std::set<cyclus::RequestPortfolio<cyclus::Material>::Ptr> GetMatlRequests();
virtual std::set<cyclus::BidPortfolio<cyclus::Material>::Ptr> GetMatlBids(
    cyclus::CommodMap<cyclus::Material>::type& commod_requests);
virtual void AcceptMatlTrades(
    const std::map<cyclus::Trade<cyclus::Material>, cyclus::Material::Ptr>& responses);
virtual cyclus::Material::Ptr OfferMatl(
    cyclus::Material::Ptr request);
```

private:
cyclus::toolkit::ResourceBuff fresh\_fuel\_;  // buffer for incoming fuel
cyclus::toolkit::ResourceBuff spent\_fuel\_;  // buffer for outgoing waste

```
std::queue<std::pair<int, cyclus::Material::Ptr>> core_;  // (entry_time, material)

cyclus::toolkit::TimeSeries<double> power_output_;  // optional logging
```

};

\#endif  // ADVANCED\_REACTOR\_H\_

---

2. Facility Behavior (Source)

---

Implement the lifecycle and DRE methods:

.. code-block:: cpp

\#include "advanced\_reactor.h"

using cyclus::Material;
using cyclus::Trade;
using cyclus::Context;

AdvancedReactor::AdvancedReactor(Context\* ctx)
: cyclus::Facility(ctx),
fresh\_fuel\_(), spent\_fuel\_(), power\_output\_("power\_output") {}

void AdvancedReactor::EnterNotify() {
cyclus::Facility::EnterNotify();
fresh\_fuel\_.capacity(fresh\_fuel\_cap);
spent\_fuel\_.capacity(spent\_fuel\_cap);
}

void AdvancedReactor::Tick() {
// discharge spent fuel if residence time reached
while (!core\_.empty() && context()->time() - core\_.front().first >= residence\_time) {
cyclus::Material::Ptr m = core\_.front().second->Transmute(out\_recipe);
spent\_fuel\_.Push(m);
core\_.pop();
}
}

void AdvancedReactor::Tock() {
// move fresh fuel to core if there's room
while (!fresh\_fuel\_.empty()) {
cyclus::Material::Ptr m = fresh\_fuel\_.Pop();
core\_.push(std::make\_pair(context()->time(), m));
}
}

std::string AdvancedReactor::str() {
std::stringstream ss;
ss << Facility::str() << \n
<< "Fresh fuel buffer: " << fresh\_fuel\_.quantity() << " / " << fresh\_fuel\_cap << " kg\n"
<< "Spent fuel buffer: " << spent\_fuel\_.quantity() << " / " << spent\_fuel\_cap << " kg\n"
<< "Core loading: " << core\_.size() << " assemblies";
return ss.str();
}

std::set\<RequestPortfolio<Material>::Ptr> AdvancedReactor::GetMatlRequests() {
std::set\<RequestPortfolio<Material>::Ptr> ports;
double qty = fresh\_fuel\_.space();
if (qty > 0) {
Material::Ptr dummy = cyclus::NewBlankMaterial(qty);
RequestPortfolio<Material>::Ptr port(new RequestPortfolio<Material>());
port->AddRequest(dummy, this, in\_commodity);
ports.insert(port);
}
return ports;
}

std::set\<cyclus::BidPortfolio<Material>::Ptr> AdvancedReactor::GetMatlBids(
cyclus::CommodMap<Material>::type& commod\_requests) {
std::set\<cyclus::BidPortfolio<Material>::Ptr> ports;
if (spent\_fuel\_.quantity() <= 0) return ports;

```
for (auto& pair : commod_requests[out_commodity]) {
  Material::Ptr offer = spent_fuel_.Peek();
  cyclus::BidPortfolio<Material>::Ptr port(new cyclus::BidPortfolio<Material>());
  port->AddBid(pair, offer, this);
  ports.insert(port);
}
return ports;
```

}

void AdvancedReactor::AcceptMatlTrades(
const std::map\<Trade<Material>, Material::Ptr>& responses) {
for (auto& pair : responses) {
fresh\_fuel\_.Push(pair.second);
}
}

Material::Ptr AdvancedReactor::OfferMatl(Material::Ptr request) {
return spent\_fuel\_.PopQty(request->quantity());
}

---

3. Advanced Features

---

**a. Material Inspection**

Use `cyclus::toolkit::MatQuery` to inspect isotopic makeup:

.. code-block:: cpp

cyclus::toolkit::MatQuery mq(mat);
double u235 = mq.mass\_frac("U235");

This is helpful for tracking enrichment or decay over time.

**b. Time Series Logging**

Track performance over time:

.. code-block:: cpp

power\_output\_.Get(context())->AddValue("power\_output", current\_mw);

You can emit curves to the output database for later plotting.

**c. Error Handling and Validation**

Use assertions and logs to guard runtime logic:

.. code-block:: cpp

if (fresh\_fuel\_.space() <= 0) {
LOG(cyclus::WARN) << "No room for new fuel";
}

Use `lbound`, `ubound`, and `default` pragmas for robust schema validation.

---

4. Testing Notes

---

* Use Google Test (`gtest`) in the `tests/` directory.
* Validate:

  * Behavior under full/empty buffer conditions
  * Core loading and discharge timing
  * Material transformation into output recipe

---

5. Summary and Next Steps

---

This advanced tutorial walked through the full implementation of a robust Cyclus Facility agent with:

* Input validation and toolkit buffers
* Core DRE interactions for both input and output commodities
* Material transformation and storage logic
* Optional logging and diagnostics

Continue on to the specialized chapters for:

.. toctree::
dre\_interaction
marquetry\_query
custom\_institution
