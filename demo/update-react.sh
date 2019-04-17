#!/usr/bin/bash

#
# Updates the react/vendor files used by the demo application.  It uses
# wget to retrieve minimized javascript code from a CDN.
#
# The list of files to retrieve (FILES) are in the format:
#
#     "{filename},${URI}"
#

FILES=(
    "react.production.min.js,https://unpkg.com/react@16/umd/"
    "react-dom.production.min.js,https://unpkg.com/react-dom@16/umd/"
)

TS=`date +"%Y%m%d%H%M%S"`

processFile() {
    FILENAME=$1
    URI=$2

    if [ -f ${FILENAME} ]; then
        mv ${FILENAME} ${FILENAME}.${TS}.bak
    fi

    wget ${URI}${FILENAME}
    head -n 4 ${FILENAME}
    touch ${FILENAME}
}

pushd vendor

for PARAM in ${FILES[@]}; do
    IFS=","
    set -- ${PARAM}
    processFile $1 $2
done

ls -axpl

popd
