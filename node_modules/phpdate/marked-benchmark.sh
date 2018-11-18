#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-
for RUNS in {1..2}; do nodejs benchmark.js; done | sed -ure "s~ ops/~ $1&~"
