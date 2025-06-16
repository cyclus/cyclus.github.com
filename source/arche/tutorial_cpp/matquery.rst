.. \_marquetry\_query:

\===============================
Material Inspection with Marquetry
==================================

This chapter introduces the use of **cyclus::toolkit::MatQuery** and related utilities to inspect and analyze nuclear material compositions inside Cyclus agents. These tools are essential for modeling enrichment, burnup, quality control, and any behavior conditioned on isotopic content.

Covered Topics:

* Introduction to `MatQuery`
* Retrieving isotopic mass fractions and total masses
* Composition filtering and enrichment logic
* Recipe matching and decay handling

---

1. What is MatQuery?

---

`MatQuery` is a Cyclus toolkit class that wraps a `cyclus::Material::Ptr` and provides methods to easily extract isotopic data.

It enables:

* Retrieval of mass fractions: `mq.mass_frac("U235")`
* Retrieval of total mass of isotope: `mq.mass("Pu239")`
* Access to full isotope maps: `mq.comp()->mass()`
* Composition property tests (e.g., `IsFissile`, `HasElement`, etc.)

---

2. Basic Usage

---

.. code-block:: cpp

void EnrichmentFacility::AcceptMatlTrades(
const std::map\<cyclus::Trade[cyclus::Material](cyclus::Material), cyclus::Material::Ptr>& responses) {
for (auto& pair : responses) {
cyclus::Material::Ptr mat = pair.second;
cyclus::toolkit::MatQuery mq(mat);

```
  double u235_frac = mq.mass_frac("U235");
  double total_u = mq.mass("U235") + mq.mass("U238");

  if (u235_frac < tails_assay_) {
    LOG(cyclus::ERROR) << "Incoming material under-enriched";
  }

  feed_buffer_.Push(mat);
}
```

}

---

3. Conditional Bidding or Acceptance

---

`MatQuery` can be used to evaluate trade viability. For instance:

.. code-block:: cpp

bool IsAcceptableFuel(cyclus::Material::Ptr mat) {
cyclus::toolkit::MatQuery mq(mat);
double pu\_frac = mq.mass\_frac("Pu239");
return pu\_frac > 0.02;
}

This lets your agent filter trade offers or gate reactor core loading based on fuel specs.

---

4. Filtering and Enrichment Modeling

---

When performing enrichment or isotope separation, you'll often:

* Extract uranium mass vector
* Normalize target enrichment
* Compute SWU requirements (via toolkit::Separations)

.. code-block:: cpp

double feed\_assay = mq.mass\_frac("U235") + mq.mass\_frac("U234");
double swu = toolkit::Separations::SwuRequired(
feed\_mass, feed\_assay, product\_assay, tails\_assay);

You may optionally track the material path and produce a blended result using `Material::Blend()` or `toolkit::Mix()`.

---

5. Advanced Composition Access

---

Use the `comp()` method to directly access the underlying `cyclus::Composition::Ptr`:

.. code-block:: cpp

cyclus::CompMap cm = mq.comp()->mass();
for (auto iso : cm) {
std::cout << "Isotope: " << iso.first << ", mass = " << iso.second << std::endl;
}

You can use this for generating custom reports or modeling precise decay chains.

---

6. Considerations for Decay and Recipes

---

* Materials do **not** decay unless `Material::Decay()` is explicitly called.
* Use `mat->Transmute("new_recipe")` to apply predefined compositions.
* Validate incoming recipes using `mat->comp()->Equals(Context()->GetRecipe("name"))`.

---

7. Summary

---

The `MatQuery` toolkit provides intuitive, composable access to isotopic material data. It is useful for:

* Enrichment and burnup modeling
* Safety validation and material rejection
* Conditional processing logic

Next, we explore how institutions can leverage Cyclus features to coordinate agents and implement deployment or policy logic.

.. seealso::

* \:ref:`custom_institution`
