#!/bin/bash

_PATH="$0/../";
_DATE=`date`;
_DIR="compile/code/kernel";

npm run init
mkdir -p file/private/log/server/http file/private/log/server/instagram file/private/log/server/socket file/private/log/server/telegram/bot file/private/log/server/telegram/cli  

tsc
node $_DIR/init server/http         | tee -a "file/private/log/server/http/$_DATE.log" |  tee -a "file/public/log/log.log"       &
echo $! > pid
node $_DIR/init server/instagram    | tee -a "file/private/log/server/instagram/$_DATE.log"    &
echo $! >> pid
node $_DIR/init server/socket       | tee -a "file/private/log/server/socket/$_DATE.log"       &
echo $! >> pid
node $_DIR/init server/telegram/bot | tee -a "file/private/log/server/telegram/bot/$_DATE.log" &
echo $! >> pid
node $_DIR/init server/telegram/cli | tee -a "file/private/log/server/telegram/cli/$_DATE.log" &
echo $! >> pid
echo `jobs -p` >> pid
exit 0;