
``fuelcycle.org-deps`` contains a dockerfile with all dependencies for
building cymetric.  This is used by the docker based build targets added to
the makefile.  This image will need to be updated and repushed to docker hub
periodically when dependencies for the website need updating.  Particularly,
this image will need to be rebuilt whenever there is a new release of
cyclus+cycamore.

