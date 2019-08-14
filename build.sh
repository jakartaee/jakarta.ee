#!/bin/bash
# ===========================================================================
# Copyright (c) 2019 Eclipse Foundation and others.
# 
# This program and the accompanying materials are made
# available under the terms of the Eclipse Public License 2.0
# which is available at https://www.eclipse.org/legal/epl-2.0/
# 
# Contributors:
# Christopher Guindon (Eclipse Foundation)
# 
# SPDX-License-Identifier: EPL-2.0
# ===========================================================================

echo -e "Processing Jakarta EE Specifications...\n"

echo -e "Step 1: Clean up specifications content\n"
rm -rf content/specifications && rm -rf static/specifications

echo "Step 2: Clone specifications git repository"
git clone https://github.com/jakartaee/specifications.git content/specifications

echo -e "\nStep 3: Remove specifications/.git\n"
rm -rf content/specifications/.git

echo "Step 4: Create static/specifications folder"
mkdir -p static/specifications
cd content
echo -e "Current working directory: $PWD\n"

echo -e "Step 5: Preparing to move html files to static folder..."
for f in specifications/*/*/*.html; do
  if [ -f "$f" ]; then
    echo -e  "Moving $f to `dirname ../static/$f`"
    mkdir -p `dirname ../static/$f`
    mv -f "$f" "../static/$f"
  fi
done

echo -e "Step 6: Preparing to move folders to static folder..."
for f in specifications/*/*/*/; do
  if [ -d "$f" ]; then
    echo -e "Moving $f folder to `dirname ../static/$f`"
    mkdir -p `dirname ../static/$f`
    mv -f "$f" "../static/$f"
  fi
done

echo "Done!"
