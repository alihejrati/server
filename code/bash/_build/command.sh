#!/bin/bash

_PATH="$0/../";

npm run init
cp -rf ./code/bash/_driver.sh ./driver.sh
tsc
mkdir -p compile/code/bash
cp -rf code/bash/[^_]* compile/code/bash
mv compile app
node "$_PATH/handler.js"
rm -rf app
rm -rf ./driver.sh