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

# Create the data file directory of videos if it does not already exist.
mkdir -p ./data/videos

# Clean the data file directory of videos which may of been downloaded from a
# previous run.
rm -f ./data/videos/*.xml
echo "Cleaning the video data file directory"

# Loop through each playlist ID and download its XML feed.
for playlist_id in "${playlist_ids[@]}"; do
  curl_output=$(curl -s "https://www.youtube.com/feeds/videos.xml?playlist_id=$playlist_id")
  
  # Check if curl command was successful. Otherwise, print an error.
  if [ $? -eq 0 ]; then
    # Save the XML feed to a new data file.
    echo "$curl_output" > "./data/videos/$playlist_id.xml"
    echo "Downloaded XML for playlist: $playlist_id"
  else
    echo "Failed to download XML for playlist: $playlist_id"
    exit 1 # Return non-zero exit code to indicate failure.
  fi
done
