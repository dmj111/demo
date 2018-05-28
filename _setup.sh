#!/usr/bin/env bash

source ~/.rvm/scripts/rvm
rvm gemset use jekyll
bundle exec jekyll serve
