#!/bin/bash
#FLEXPATH=../../flex_sdk_4.6
#FLEXPATH=../../apache_flex_sdk
FLEXPATH=/Applications/FlexSDK

OPT_DEBUG="-use-network=false \
    -optimize=true \
    -define=CONFIG::LOGGING,true"

OPT_RELEASE="-use-network=false \
    -optimize=true \
    -define=CONFIG::LOGGING,false"

echo "Compiling bin/debug/flashls.swc"
$FLEXPATH/bin/compc \
    $OPT_DEBUG \
    -include-sources ../src/org/mangui/hls \
    -output ../bin/debug/flashls.swc \
    -target-player="10.1"

echo "Compiling bin/release/flashls.swc"
$FLEXPATH/bin/compc \
    $OPT_RELEASE \
    -include-sources ../src/org/mangui/hls \
    -output ../bin/release/flashls.swc \
    -target-player="10.1"


echo "Compiling bin/release/chromeless-10-8.swf"
$FLEXPATH/bin/mxmlc ../src/org/mangui/chromeless/ChromelessPlayer.as \
    -source-path ../src \
    -o /Applications/MAMP/htdocs/flashls/examples/blive/chromeless-10-8.swf \
    $OPT_RELEASE \
    -library-path+=../lib/blooddy_crypto.swc \
    -target-player="11.1" \
    -default-size 480 270 \
    -default-background-color=0x000000
./add-opt-in.py /Applications/MAMP/htdocs/flashls/examples/blive/chromeless-10-8.swf


