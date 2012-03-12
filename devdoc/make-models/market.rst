
.. summary Developers notes for the implementation of a new MarketModel

Developing Market Models
========================

Details
-------

In addition to inheriting from the main dynamic loading base class `Model`, all
MarketModel models also inherit from `Communicator`.

A MarketModel's primary function is to

  * receive offers and requests from facilities,

  * *resolve* the market by matching those offers and requests

  * generate/execute a set of orders for shipments of material between
    facilities that results from resolving the market

Therefore, all MarketModel models should implement their own version of
`receiveOfferRequest` that registers incoming offers and requests in a way that
is appropriate for this market implementation.  All MarketModel models must
also implement their own version of `resolve`.

All MarketModel models have an STL `set` of pointers to the `OfferRequest`
messages that have arrived and an STL `deque` of pointers to the `Shipment`
messages that it is generating.  MarketModel models are also free to have
additional storage modes for `OfferRequest` messages or `Shipment` messages
that facilitates the operation of that particular MarketModel paradigm.

