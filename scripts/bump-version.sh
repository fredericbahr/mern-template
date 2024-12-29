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

set -e

help() {
  echo -e "Usage: bump-version.sh -v 0.0.0 [OPTION]"
  echo -e "Bumping version of each package inside the mono repository."
  echo -e "Optional arguments:"
  echo -e "\t-v, --version \t\tnew version for packages. If it is not set you will be asked interactively."
  echo -e "\t-h, --help \t\tshow print help"
}

 # Array of workspaces to ignore
IGNORE_WORKSPACES=("apps/website")

# check if version is already set with the cli option
getNewVersion() {
 if test -z "$VERSION"; then
 CURRENT_PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
 read -p "Current version is $CURRENT_PACKAGE_VERSION. Enter new version: " VERSION
 fi
}

# get all packages and ignore the ones in the IGNORE_WORKSPACES array
getAllPackages() {
  # Convert ignore workspaces array to a pipe-separated string for grep
  IGNORE_PATTERN=$(printf "|%s" "${IGNORE_WORKSPACES[@]}")
  IGNORE_PATTERN=${IGNORE_PATTERN:1}

  # Get all package directories containing package.json, excluding the ignored ones
  PACKAGE_DIRS=$(find . -name 'package.json' -not -path "*/node_modules/*" | grep -Ev "$IGNORE_PATTERN" | xargs -n1 dirname)
}

# bump version of each package
bumpVersion() {
  getAllPackages
  # Update versions for each package directory
  for dir in $PACKAGE_DIRS; do
    echo "Updating version in $dir to $VERSION"
    (cd "$dir" && npm version "$VERSION" --no-git-tag-version)
  done
}

# update changelog on root level
updateChangeLog() {
  CHANGELOG="CHANGELOG.md"
  # Get the current date in the desired format
  CURRENT_DATE=$(date +"%d.%m.%Y")

  # Define the replacement string
  REPLACEMENT="## $VERSION - $CURRENT_DATE"

  # Use sed to replace the text in the file
  sed -i "s/## \[Unreleased\]/$REPLACEMENT/I" "$CHANGELOG"
}

commitAndPush() {
  echo
  read -p "Commit and push changes to development? (y/n): " COMMIT
  if [[ !COMMIT =~ ^[Yy]$ ]]; then
    echo "Aborting..."
    exit 0
  fi

  git add .
  git commit -m "[release] bump version to $VERSION"
  git push --no-verify origin development
}

# arg parsing
while [ -n "$1" ]; do
  case "$1" in
    -v|--version)
      VERSION=${2}
      shift
      ;;
    -h|--help)
      help
      exit 0
      ;;
    *)
      echo "Unknown argument: $1"
      help
      exit 1
      ;;
  esac
  shift
done

ROOT_DIR=$(git rev-parse --show-toplevel)

getNewVersion
bumpVersion
updateChangeLog
commitAndPush
