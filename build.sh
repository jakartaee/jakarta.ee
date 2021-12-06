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
mkdir /tmp/specifications && cp content/specifications/_index.md /tmp/specifications/ && cp content/specifications/_index.zh.md /tmp/specifications/
rm -rf content/specifications && rm -rf static/specifications

echo "Step 2: Clone specifications git repository"
git clone https://github.com/jakartaee/specifications.git content/specifications

echo -e "\nStep 3: Remove specifications/.git\n"
rm -rf content/specifications/.git

echo "Step 4: Create static/specifications folder"
mkdir -p static/specifications
cd content
cp -rf /tmp/specifications/* specifications
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

echo -e "Step 7: Create missing language copies..."
LANGS=(zh)
FILES=`find ./specifications -type f -name "*.md"`
for F in $FILES; do
  if [ -f "$F" ]; then
    FILE_NAME=`basename $F`
    EXTENSION=${FILE_NAME#**.}
    for LANG in ${LANGS[@]}; do
      ## Skip non base-lang copies
      if [[ "$EXTENSION" =~ .*"$LANG".* ]];then
        continue 2
      fi
    done
    REL_DIR=`dirname $F`
    for LANG in ${LANGS[@]}; do
      LANG_FILE="$REL_DIR/`basename $F .md`.$LANG.md"
      if [ ! -f $LANG_FILE ]; then
        echo "Creating langauge copy of $F in $LANG_FILE"
        cp $F $LANG_FILE
      fi
    done
  fi
done
echo "Done!"
