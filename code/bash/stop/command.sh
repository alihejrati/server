#!/bin/bash

_PID=`cat pid`;

for i in $_PID; do
    echo "kill ${i}"
	kill $i
done