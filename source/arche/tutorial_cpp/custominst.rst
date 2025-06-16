.. \_custom\_institution:

\===============================
Creating a Custom Institution
=============================

This chapter walks through the creation of a **custom Cyclus Institution archetype**, illustrating how institutions can coordinate deployment, set policy, or aggregate data across child agents.

We will explore:

* Institution design patterns
* Managing and deploying facilities dynamically
* Using `toolkit::CommodityProducerManager` and `toolkit::Position`
* Storing and interpreting time-based policy or scenario logic

---

1. Institution Basics

---

A Cyclus Institution is an agent that owns and manages a set of child facilities. It does **not** directly interact with the DRE unless explicitly programmed to do so.

Institutions are useful for:

* Controlling facility deployment
* Enforcing policy constraints
* Emitting cross-cutting diagnostics

---

2. A Sample Archetype: SmartDeployInst

---

Let’s define a new Institution called `SmartDeployInst`. This agent dynamically deploys a set of child facilities according to a time-series demand signal and manages their geographic position metadata.

.. code-block:: cpp

\#ifndef SMART\_DEPLOY\_INST\_H\_
\#define SMART\_DEPLOY\_INST\_H\_

\#include "cyclus.h"
\#include "toolkit/commodity\_producer\_manager.h"
\#include "toolkit/time\_series.h"
\#include "toolkit/position.h"

class SmartDeployInst : public cyclus::Institution {
public:
SmartDeployInst(cyclus::Context\* ctx);
virtual \~SmartDeployInst() {}

```
#pragma cyclus note {"doc": "Institution that deploys facilities in response to demand"}

#pragma cyclus var {"tooltip": "Facility to deploy"}
std::string prototype;

#pragma cyclus var {"tooltip": "Target commodity to match"}
std::string target_commod;

#pragma cyclus var {"tooltip": "Demand signal name"}
std::string demand_series;

virtual void Build(cyclus::Agent* parent);
virtual void Tick();
```

private:
cyclus::toolkit::CommodityProducerManager manager\_;
int last\_build\_time\_;
};

\#endif  // SMART\_DEPLOY\_INST\_H\_

---

3. Behavior Implementation

---

.. code-block:: cpp

\#include "smart\_deploy\_inst.h"

using cyclus::Context;

SmartDeployInst::SmartDeployInst(Context\* ctx)
: cyclus::Institution(ctx), last\_build\_time\_(-1) {}

void SmartDeployInst::Build(cyclus::Agent\* parent) {
Institution::Build(parent);
manager\_.RegisterAllChildren(this);
}

void SmartDeployInst::Tick() {
double produced = manager\_.TotalCapacity(target\_commod);
double required = cyclus::toolkit::TimeSeries<double>::Get(context())
->Get(demand\_series, context()->time());

```
if (produced < required && context()->time() > last_build_time_) {
  context()->SchedBuild(prototype);
  last_build_time_ = context()->time();

  LOG(cyclus::INFO) << "Deploying facility " << prototype
                    << " to meet demand for " << target_commod;
}
```

}

---

4. Toolkit Features

---

**a. CommodityProducerManager**

* Automatically tracks child facilities producing a given commodity.
* Allows querying current capacity or growth trends.

**b. TimeSeries**

* Use `TimeSeries<double>` to load and compare demand curves over time.
* Ideal for policy-driven modeling or economics.

**c. Position and Mapping**

* Optional: Assign facilities to physical coordinates using `toolkit::Position`.
* Enables geospatial or regional modeling.

---

5. Deployment Policy Patterns

---

Institutions can also:

* Deploy multiple facilities per timestep
* Use economic filters (e.g., cost-benefit tests)
* Read deployment orders from external files or parameters

Example:

.. code-block:: cpp

if (produced < required && available\_budget >= cost\_per\_facility) {
context()->SchedBuild("EnrichmentFacility");
available\_budget -= cost\_per\_facility;
}

---

6. Logging and Diagnostics

---

* Use `LOG(cyclus::INFO)` for deploy notices
* Record metrics with `RecordPosition`, `RecordTimeSeries`, or custom tables
* Consider emitting institutional summary reports in `Tock()`

---

7. Summary

---

Custom institutions are powerful coordination points in Cyclus simulations. By extending basic `Tick()` logic and using toolkit helpers, your institution can:

* Monitor market activity and react accordingly
* Control dynamic deployment of facilities
* Support geographically or economically nuanced behaviors

You now have all the tools necessary to design complex institutional agents that implement scenario logic, enforce system-wide policy, and guide the evolution of your simulation.
