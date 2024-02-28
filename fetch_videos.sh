#!/bin/bash

# ===========================================================================
# Copyright (c) 2024 Eclipse Foundation and others.
# 
# This program and the accompanying materials are made
# available under the terms of the Eclipse Public License 2.0
# which is available at https://www.eclipse.org/legal/epl-2.0/
# 
# SPDX-License-Identifier: EPL-2.0
# ===========================================================================

playlist_ids=(
  "PLutlXcN4EAwC64sgFLJSWAgQJvVo6T4Dh" # Tech Talks
  "PLutlXcN4EAwDCVHTlhymKrKBwSyddZoc8" # Update Calls 
  "PLutlXcN4EAwAfZaPt8pdamYvE7APRcPbA" # Livestream 2024 PT
  "PLutlXcN4EAwDNN2lVNlfV3u2rBvJMOFCn" # Livestream 2023 EN
  "PLutlXcN4EAwD_rW8juyr1ZQf7MEYRQuWb" # Livestream 2023 ES
  "PLutlXcN4EAwCGe7GN9htD_QvANU9xTvrh" # Livestream 2023 ZH
)

mkdir -p ./data/videos

for playlist_id in "${playlist_ids[@]}"; do
  curl -s "https://www.youtube.com/feeds/videos.xml?playlist_id=$playlist_id" > "./data/videos/$playlist_id.xml"
done
