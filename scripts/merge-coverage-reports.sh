#!/bin/bash

# COPYRIGHT (C) 2024 Frederic Bahr
#
# The PROGRAM is protected by national and international copyright laws and conventions.
# The copyright lies with Frederic Bahr, unless expressly stated otherwise.
# All rights reserved.
# Especially the reproduction and distribution of the PROGRAM without written permission of
# the copyright owner is prohibited.
#
# See LICENSE for licensing information.

COUNTER=0

# Find all coverage directories in apps or packages
COVERAGE_PATHS=$(find apps/ packages/ -name coverage -type d -print 2>/dev/null)

# Create a coverage directory in root
mkdir -p .nyc_output

# Copy all coverage reports to root
for COVERAGE_PATH in $COVERAGE_PATHS; do
    cp $COVERAGE_PATH/coverage-final.json .nyc_output/$COUNTER-coverage.json
    let COUNTER++
done

# Merge all coverage reports
npx nyc report --reporter=clover --reporter=json --reporter=json-summary --reporter=lcov --reporter=text-summary

# Remove all coverage reports
rm -rf .nyc_output
