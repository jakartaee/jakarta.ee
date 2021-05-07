#!/bin/bash

# prerequisites xattr imagemagick jpegoptim optipng
# e.g. 
# apt-get install xattr imagemagick jpegoptim optipng
MAXIMUM_JPG_SIZE=2048 #2MB.
PNG_OPTIMIZATION_LEVEL=3
IMAGES_FOLDER=${1:-content/news} # first argument ('content/news' by default)
MAXIMUM_WIDTH=${2:-1350} # second argument ('1350' by default)

if ! [ -x "$(command -v xattr)" ]; then
  echo 'Error: xattr is not installed. Install xattr to continue. (apt-get install xattr)' >&2
  exit 1
fi

if ! [ -x "$(command -v mogrify)" ]; then
  echo 'Error: imagemagick is not installed. Install imagemagick to continue. (apt-get install imagemagick)' >&2
  exit 1
fi

if hash jpegoptim 2>/dev/null; then
    for image in $(find $IMAGES_FOLDER -regextype posix-extended -iregex ".*\.(jpeg|jpg)"); do
        # check attribute if already optimized
        if xattr -l "$image" 2>&1 | grep -q "user.optimised: true"; then
            echo "$image already optimized"
        else
            echo "started optimizing $image" 
            # resize to width MAXIMUM_WIDTH only if bigger than MAXIMUM_WIDTH
            mogrify -resize "$MAXIMUM_WIDTH>" "$image"
            # remove all metadata and try to optimize jpeg image to match the Maximum size defined above
            jpegoptim --strip-all --force --all-progressive "$image" && xattr -w user.optimised true "$image"
            echo "finished optimizing $image" 
        fi
    done;
else
    echo "Warn: JPEG images not optimized. Install jpegoptim to optimize. (apt-get install jpegoptim)"
fi

if hash optipng 2>/dev/null; then
    for image in $(find $IMAGES_FOLDER -regextype posix-extended -iregex ".*\.(png)"); do
        # check attribute if already optimized
        if xattr -l $image 2>&1 | grep -q "user.optimised: true"; then
            echo "$image already optimized" 
        else
            echo "started optimizing $image" 
            # resize to width MAXIMUM_WIDTH only if bigger than MAXIMUM_WIDTH
            mogrify -resize "$MAXIMUM_WIDTH>" "$image"
            # optimize PNG with a given level (higher = slower) and remove all metadata
            optipng -clobber -quiet -strip all -o $PNG_OPTIMIZATION_LEVEL "$image" && xattr -w user.optimised true "$image"
            echo "finished optimizing $image" 
        fi
        
            done;
else
    echo "Warn: PNG images not optimized. Install optipng to optimize. (apt-get install optipng)"
fi