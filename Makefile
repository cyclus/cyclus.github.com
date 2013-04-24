# Makefile for Sphinx documentation
#
GH_SOURCE_DIRS = source 
GH_BUILT_DIRS = 

GH_CURRENT_BRANCH = $(shell git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/')
GH_SOURCE_BRANCH = source
GH_BUILD_BRANCH = master


.PHONY: help gh-preview gh-pages

help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  gh-preview to update branch $(GH_BUILD_BRANCH) with new HTML based on content"
	@echo "                  from branch $(GH_CURRENT_BRANCH) for previewing"
	@echo "  gh-pages   to update branch $(GH_BUILD_BRANCH) with new HTML based on content"
	@echo "                  from branch $(GH_SOURCE_BRANCH) and push it to the server LIVE"

gh-preview:
	git checkout $(GH_BUILD_BRANCH)
	git checkout $(GH_CURRENT_BRANCH) $(GH_SOURCE_DIRS)
	git reset HEAD 
	make html
	make gh-install

gh-pages:
	git checkout $(GH_BUILD_BRANCH)
	git checkout $(GH_SOURCE_BRANCH) $(GH_SOURCE_DIRS)
	git reset HEAD 
	make html
	make gh-install
	make gh-push

