#!/bin/bash

_PATH="$0/../";
_DATE=`date`;
_DIR="code/kernel";

npm run init
mkdir -p file/private/log/server/http file/private/log/server/socket

node $_DIR/init server/http   | tee -a "file/private/log/server/http/$_DATE.log"   &
node $_DIR/init server/socket | tee -a "file/private/log/server/socket/$_DATE.log" &