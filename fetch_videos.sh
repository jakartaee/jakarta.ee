#!/bin/bash

playlist_ids=(
  "PLutlXcN4EAwCjJYYaPhFzJ31PqFRtOUFu" # Update Calls 
  "PLutlXcN4EAwC64sgFLJSWAgQJvVo6T4Dh" # Tech Talks
  "PLutlXcN4EAwDNN2lVNlfV3u2rBvJMOFCn" # Livestream 2023 EN
)

mkdir -p ./data/videos

for playlist_id in "${playlist_ids[@]}"; do
  curl -s "https://www.youtube.com/feeds/videos.xml?playlist_id=$playlist_id" > "./data/videos/$playlist_id.xml"
done
