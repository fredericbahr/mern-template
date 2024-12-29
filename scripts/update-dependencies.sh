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

shopt -s globstar

# Function to handle cleanup on interrupt
exit() {
  exit 1
}

# Trap SIGINT (Ctrl + C) and call the cleanup function
trap exit SIGINT

# find all package paths in the code repository matching the given names
findPackagePaths() {
  # Extract patterns from package.json
  patterns=$(npm pkg get workspaces | jq -r '.[]')

  workspaces=$(for pattern in $patterns; do
    find "$pattern" -type d -name "node_modules" -prune -o -name "package.json" -print | xargs -I {} dirname {}
  done)
}

# update dependencies in the code repository
updateDependencies() {
  for workspace in $workspaces; do
      # Get the base directory of the npm project
    base_dir=$(npm prefix)
    cd "$base_dir/$workspace"
    npx npm-check-updates -u -t minor
  done
}

# update root dependencies in the code repository
updateRootDependencies() {
  # Get the base directory of the npm project
  base_dir=$(npm prefix)
  cd $base_dir
  npx npm-check-updates -u -t minor
}

# install dependencies in the code repository
installDependencies() {
  # Get the base directory of the npm project
  base_dir=$(npm prefix)
  cd $base_dir
  npm install
}

runAuditFix() {
   for workspace in $workspaces; do
      # Get the base directory of the npm project
    base_dir=$(npm prefix)
    cd "$base_dir/$workspace"
    npm audit fix
  done
}

findPackagePaths
updateDependencies
updateRootDependencies
installDependencies
runAuditFix
