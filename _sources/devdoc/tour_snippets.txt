
Tour Snippets
=============



.. _tutr1a:

Snip 1a
-----------------------------------------------------------



.. code-block:: cpp

    //-----------------------------------------------------------------------
    // Main entry point for the test application...
    //-----------------------------------------------------------------------
    int main(int argc, char* argv[]) {
      LOG(LEV_ERROR, "tutr1a") << "Cyclus has started.";
    
      // parse command line options
      po::options_description desc("Allowed options");
      desc.add_options()
        ("help,h", "produce help message")
        ("no-model", "only print log entries from cyclus core code")
        ("no-mem", "exclude memory log statement from logger output")
        ("verbosity,v", po::value<string>(), "set output log verbosity level")
        ("input-file", po::value<string>(), "input file")
        ;
    
      po::variables_map vm;


:ref:`tour mainpage<code-tour-home>`


.. _tutr1b:

Snip 1b
-----------------------------------------------------------



.. code-block:: cpp

      // read input file and setup simulation
      try {
        LOG(LEV_INFO1, "tutr1b") << "Reading the input file.";
        XMLinput->load_file(vm["input-file"].as<string>()); 


:ref:`tour mainpage<code-tour-home>`


.. _tutr1c:

Snip 1c
-----------------------------------------------------------



.. code-block:: cpp

      // Run the simulation 
      try {
        LOG(LEV_INFO1, "tutr1c") << "Starting up the simulation.";
        TI->runSim();


:ref:`tour mainpage<code-tour-home>`


.. _tutr1d:

Snip 1d
-----------------------------------------------------------



.. code-block:: cpp

      LOG(LEV_INFO1, "tutr1d") << "Cyclus is exiting.";
      return 0;
    }
    


:ref:`tour mainpage<code-tour-home>`


.. _tutr6e:

Snip 6e
-----------------------------------------------------------



.. code-block:: cpp

    void Message::approveTransfer() {
      LOG(LEV_DEBUG1, "tutr6e") << "Beginning a material transfer...";
    
      msg_ptr me = msg_ptr(this);
    
      vector<rsrc_ptr> manifest;
      Model* req = requester();
      Model* sup = supplier();
    
      try {
        manifest = sup->removeResource(me);
        req->addResource(me, manifest);
      } catch (CycException err) {
        CLOG(LEV_ERROR) << "Material transfer failed from " 
                        << sup->ID() << " to " << req->ID() << ": " << err.what();
        return;
      }
    
      int id = nextTransID_++;
      
      // register that this transaction occured
      this->Message::addTransToTable(id);
      int nResources = manifest.size();
      for (int pos = 0; pos < nResources; pos++) {
        this->Message::addResourceToTable(id, pos + 1, manifest.at(pos));
      }
    
      CLOG(LEV_INFO3) << "Material sent from " << sup->ID() << " to " 
                      << req->ID() << ".";
    
      LOG(LEV_DEBUG1, "tutr6e") << "... Finished transfer from id=" << sup->ID() << " to id=" 
                      << req->ID() << ".";
    
    }


:ref:`tour mainpage<code-tour-home>`


.. _tutr2a:

Snip 2a
-----------------------------------------------------------



.. code-block:: cpp

    void Timer::runSim() {
      CLOG(LEV_INFO1) << "Simulation set to run from start="
                      << startDate_ << " to end=" << endDate_;
    
      time_ = -1;
      handlePreHistory();
      time_ = time0_;
      CLOG(LEV_INFO1) << "Beginning simulation";
      while (date_ < endDate()){
        if (date_.day() == 1){
          LOG(LEV_INFO1, "tutr2a") << "Current date: " << date_;
    
          CLOG(LEV_INFO2) << "Current date: " << date_ << " {";
          CLOG(LEV_DEBUG3) << "The list of current tick listeners is: " << reportListeners();
    
          Material::decayMaterials(time_);
    
          sendTick();
          sendResolve();
        }
        


:ref:`tour mainpage<code-tour-home>`


.. _tutr3b:

Snip 3b
-----------------------------------------------------------



.. code-block:: cpp

    void Timer::sendResolve() {
      for(vector<MarketModel*>::iterator agent=resolve_listeners_.begin();
           agent != resolve_listeners_.end(); 
           agent++) {
        try {
          CLOG(LEV_INFO3) << "Sending resolve to Model ID=" << (*agent)->ID()
                          << ", name=" << (*agent)->name() << " {";
          LOG(LEV_INFO2, "tutr3b") << "Timer is sending resolve to " << (*agent)->name() << " id=" << (*agent)->ID();
          (*agent)->resolve();


:ref:`tour mainpage<code-tour-home>`


.. _tutr3a:

Snip 3a
-----------------------------------------------------------



.. code-block:: cpp

    void Timer::sendTick() {
      for(vector<TimeAgent*>::iterator agent=tick_listeners_.begin();
           agent != tick_listeners_.end(); 
           agent++) {
        try {
          CLOG(LEV_INFO3) << "Sending tick to Model ID=" << (*agent)->ID()
                          << ", name=" << (*agent)->name() << " {";
          LOG(LEV_INFO2, "tutr3a") << "Timer is sending tick to " << (*agent)->name() << " id=" << (*agent)->ID();
          (*agent)->handleTick(time_);


:ref:`tour mainpage<code-tour-home>`


.. _tutr3c:

Snip 3c
-----------------------------------------------------------



.. code-block:: cpp

    void Timer::sendTock() {
      for(vector<TimeAgent*>::iterator agent=tick_listeners_.begin();
           agent != tick_listeners_.end(); 
           agent++) {
        try {
          CLOG(LEV_INFO3) << "Sending tock to Model ID=" << (*agent)->ID()
                          << ", name=" << (*agent)->name() << " {";
          LOG(LEV_INFO2, "tutr3c") << "Timer is sending tock to " << (*agent)->name() << " id=" << (*agent)->ID();
          (*agent)->handleTock(time_);


:ref:`tour mainpage<code-tour-home>`


.. _tutr4a:

Snip 4a
-----------------------------------------------------------



.. code-block:: cpp

    void InstModel::handleTick(int time){
      // tell all of the institution models to handle the tick
      LOG(LEV_INFO4, "tutr4a") << name() << "id=" << ID() << " is ticking.";
      for(vector<Model*>::iterator fac=children_.begin();
          fac != children_.end();
          fac++){
        (dynamic_cast<FacilityModel*>(*fac))->handleTick(time);
      }
    }


:ref:`tour mainpage<code-tour-home>`


.. _tutr4b:

Snip 4b
-----------------------------------------------------------



.. code-block:: cpp

    void InstModel::handleTock(int time){
      // tell all of the institution models to handle the tick
      LOG(LEV_INFO4, "tutr4b") << name() << "id=" << ID() << " is tocking.";
      for(vector<Model*>::iterator fac=children_.begin();
          fac != children_.end();
          fac++){
        (dynamic_cast<FacilityModel*>(*fac))->handleTock(time);
      }
    }


:ref:`tour mainpage<code-tour-home>`


.. _tutr2d:

Snip 2d
-----------------------------------------------------------



.. code-block:: cpp

    void SinkFacility::init(xmlNodePtr cur) {
      FacilityModel::init(cur);
    
      LOG(LEV_INFO2, "tutr2d") << "A new SinkFacility is being initialized from xml input.";
    
      /// Sink facilities can have many input/output commodities
      /// move XML pointer to current model
      cur = XMLinput->get_xpath_element(cur,"model/SinkFacility");
    
      /// all facilities require commodities - possibly many
      string commod;
      xmlNodeSetPtr nodes = XMLinput->get_xpath_elements(cur,"incommodity");
      for (int i=0;i<nodes->nodeNr;i++) {
        commod = (const char*)(nodes->nodeTab[i]->children->content);
        in_commods_.push_back(commod);
      }
    
      // get monthly capacity
      capacity_ = strtod(XMLinput->get_xpath_content(cur,"capacity"), NULL);
    


:ref:`tour mainpage<code-tour-home>`


.. _tutr2e:

Snip 2e
-----------------------------------------------------------



.. code-block:: cpp

    void SinkFacility::copy(SinkFacility* src) {
      LOG(LEV_INFO2, "tutr2e") << "A new SinkFacility is being created by copying another.";
      FacilityModel::copy(src);
    
      in_commods_ = src->in_commods_;
      capacity_ = src->capacity_;
      inventory_.setCapacity(src->inventory_.capacity());
      commod_price_ = src->commod_price_;
    }


:ref:`tour mainpage<code-tour-home>`


.. _tutr5c:

Snip 5c
-----------------------------------------------------------



.. code-block:: cpp

    void SinkFacility::handleTick(int time){
      LOG(LEV_INFO5, "tutr5c") << name() << " id=" << ID() << " is ticking.";
    
      LOG(LEV_INFO3, "SnkFac") << facName() << " is ticking {";
    
      double requestAmt = getRequestAmt(); 
      double minAmt = 0;
    
      if (requestAmt>EPS_KG){
        // for each potential commodity, make a request
        for (vector<string>::iterator commod = in_commods_.begin();
            commod != in_commods_.end();
            commod++) {
          LOG(LEV_INFO4, "SnkFac") << " requests "<< requestAmt << " kg of " << *commod << ".";
    
    


:ref:`tour mainpage<code-tour-home>`


.. _tutr6b:

Snip 6b
-----------------------------------------------------------



.. code-block:: cpp

          MarketModel* market = MarketModel::marketForCommod(*commod);
          Communicator* recipient = dynamic_cast<Communicator*>(market);
    
          // create a generic resource
          gen_rsrc_ptr request_res = gen_rsrc_ptr(new GenericResource((*commod), "kg", requestAmt));
    
          // build the transaction and message
          Transaction trans;
          trans.commod = *commod;
          trans.minfrac = minAmt/requestAmt;
          trans.is_offer = false;
          trans.price = commod_price_;
          trans.resource = request_res;
    
          LOG(LEV_DEBUG1, "tutr6b") << "requests "<< requestAmt << " kg of " << *commod << ".";
    
          msg_ptr request(new Message(this, recipient, trans)); 
          request->setNextDest(facInst());
          request->sendOn();


:ref:`tour mainpage<code-tour-home>`


.. _tutr5d:

Snip 5d
-----------------------------------------------------------



.. code-block:: cpp

    void SinkFacility::handleTock(int time){
      LOG(LEV_INFO5, "tutr5d") << name() << " id=" << ID() << " is tocking.";
    
      LOG(LEV_INFO3, "SnkFac") << facName() << " is tocking {";
    
      // On the tock, the sink facility doesn't really do much. 
      // Maybe someday it will record things.
      // For now, lets just print out what we have at each timestep.
      LOG(LEV_INFO4, "SnkFac") << "SinkFacility " << this->ID()
                      << " is holding " << inventory_.quantity()
                      << " units of material at the close of month " << time
                      << ".";
      LOG(LEV_INFO3, "SnkFac") << "}";
    }


:ref:`tour mainpage<code-tour-home>`


.. _tutr6h:

Snip 6h
-----------------------------------------------------------



.. code-block:: cpp

    void SinkFacility::addResource(msg_ptr msg, vector<rsrc_ptr> manifest) {
      LOG(LEV_DEBUG1, "tutr6h") << "receiving material from id=" << msg->supplier()->ID();
    
      inventory_.pushAll(MatStore::toMat(manifest));
    }


:ref:`tour mainpage<code-tour-home>`


.. _tutr2b:

Snip 2b
-----------------------------------------------------------



.. code-block:: cpp

    void SourceFacility::init(xmlNodePtr cur) {
      FacilityModel::init(cur);
    
      LOG(LEV_DEBUG2, "SrcFac") << "The Source Facility is being initialized";
      LOG(LEV_INFO2, "tutr2b") << "A new SourceFacility is being initialized from xml input.";
    
      /// move XML pointer to current model
      cur = XMLinput->get_xpath_element(cur,"model/SourceFacility");
    
    
      /// all facilities require commodities - possibly many
      string input_token;
    
      out_commod_ = XMLinput->get_xpath_content(cur,"outcommodity");
    
      // get recipe
      recipe_name_ = XMLinput->get_xpath_content(cur,"recipe");
      recipe_ = IsoVector::recipe(recipe_name_);


:ref:`tour mainpage<code-tour-home>`


.. _tutr2c:

Snip 2c
-----------------------------------------------------------



.. code-block:: cpp

    void SourceFacility::copy(SourceFacility* src) {
      LOG(LEV_INFO2, "tutr2c") << "A new SourceFacility is created by copying another.";
      FacilityModel::copy(src);
    
      out_commod_ = src->out_commod_;
      recipe_ = src->recipe_;
      capacity_ = src->capacity_;
      inventory_.setCapacity(src->inventory_.capacity());
      commod_price_ = src->commod_price_;
    }
    


:ref:`tour mainpage<code-tour-home>`


.. _tutr6c:

Snip 6c
-----------------------------------------------------------



.. code-block:: cpp

    void SourceFacility::receiveMessage(msg_ptr msg){
    
      // is this a message from on high? 
      if(msg->supplier() == this){
        // file the order
        ordersWaiting_.push_front(msg);
    
        LOG(LEV_DEBUG1, "tutr6c") << "received matched order to send to id=" << msg->requester()->ID();
    
      } else {
        throw CycException("SourceFacility is not the supplier of this msg.");
      }
    }


:ref:`tour mainpage<code-tour-home>`


.. _tutr6g:

Snip 6g
-----------------------------------------------------------



.. code-block:: cpp

    vector<rsrc_ptr> SourceFacility::removeResource(msg_ptr msg) {
      LOG(LEV_DEBUG1, "tutr6g") << "sending material to id=" << msg->requester()->ID();
      Transaction trans = msg->trans();
      return MatStore::toRes(inventory_.popQty(trans.resource->quantity()));
    }


:ref:`tour mainpage<code-tour-home>`


.. _tutr5a:

Snip 5a
-----------------------------------------------------------

See :ref:`tutr6a` for what buildTransaction does. See :ref:`tutr6k` for what sendOffer does.


.. code-block:: cpp

    void SourceFacility::handleTick(int time){
      LOG(LEV_INFO5, "tutr5a") << name() << " id=" << ID() << " is ticking.";
    
      LOG(LEV_INFO3, "SrcFac") << facName() << " is ticking {";
    
      generateMaterial(time);
      Transaction trans = buildTransaction();
    
      LOG(LEV_INFO4, "SrcFac") << "offers "<< trans.resource->quantity() << " kg of "
                               << out_commod_ << ".";
    
      sendOffer(trans);
    
      LOG(LEV_INFO3, "SrcFac") << "}";
    }


:ref:`tour mainpage<code-tour-home>`


.. _tutr6a:

Snip 6a
-----------------------------------------------------------



.. code-block:: cpp

    Transaction SourceFacility::buildTransaction() {
      // there is no minimum amount a source facility may send
      double min_amt = 0;
      double offer_amt = inventory_.quantity();
    
      gen_rsrc_ptr offer_res = gen_rsrc_ptr(new GenericResource(out_commod_,"kg",offer_amt));
    
      Transaction trans;
      trans.commod = out_commod_;
      trans.minfrac = min_amt/offer_amt;
      trans.is_offer = true;
      trans.price = commod_price_;
      trans.resource = offer_res;
    
      LOG(LEV_DEBUG1, "tutr6a") << "offers "<< trans.resource->quantity() << " kg of "
                               << out_commod_ << ".";
      return trans;
    }


:ref:`tour mainpage<code-tour-home>`


.. _tutr6k:

Snip 6k
-----------------------------------------------------------



.. code-block:: cpp

    void SourceFacility::sendOffer(Transaction trans) {
      MarketModel* market = MarketModel::marketForCommod(out_commod_);
    
      Communicator* recipient = dynamic_cast<Communicator*>(market);
      msg_ptr msg(new Message(this, recipient, trans)); 
      msg->setNextDest(dynamic_cast<Communicator*>(parent()));
      msg->sendOn();
    }


:ref:`tour mainpage<code-tour-home>`


.. _tutr5b:

Snip 5b
-----------------------------------------------------------



.. code-block:: cpp

    void SourceFacility::handleTock(int time){
      LOG(LEV_INFO5, "tutr5b") << name() << " id=" << ID() << " is tocking.";
    
      LOG(LEV_INFO3, "SrcFac") << facName() << " is tocking {";
    
      // check what orders are waiting,
      // send material if you have it now
      while (!ordersWaiting_.empty()) {
        msg_ptr order = ordersWaiting_.front();
        if (order->resource()->quantity() - inventory_.quantity() > EPS_KG) {
          LOG(LEV_INFO3, "SrcFac") << "Not enough inventory. Waitlisting remaining orders.";
          break;
        } else {
          // begin 6d
          LOG(LEV_DEBUG1, "tutr6d") << "approving order to send to id=" << order->requester()->ID();
          order->approveTransfer();
          ordersWaiting_.pop_front();
          // end 6d
        }
      }


:ref:`tour mainpage<code-tour-home>`


.. _tutr6d:

Snip 6d
-----------------------------------------------------------



.. code-block:: cpp

          LOG(LEV_DEBUG1, "tutr6d") << "approving order to send to id=" << order->requester()->ID();
          order->approveTransfer();
          ordersWaiting_.pop_front();


:ref:`tour mainpage<code-tour-home>`


