#!/usr/bin/env bash

# Setup the environment
# rvm gemset create jekyll
# rvm gemset use jekyll
# gem install bundler


source ~/.rvm/scripts/rvm
rvm gemset use jekyll
bundle exec jekyll serve



# useful commands
# rvm list known
# rvm gemdir
# rvm gemset delete jekyll
# rvm gemset empty jekyll
