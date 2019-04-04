#!/usr/bin/bash

REACT_FILE=react.production.min.js
REACT_URI=https://unpkg.com/react@16/umd/${REACT_FILE}

REACT_DOM_FILE=react-dom.production.min.js
REACT_DOM_URI=https://unpkg.com/react-dom@16/umd/${REACT_DOM_FILE}

TS=`date +"%Y%m%d%H%M%S"`

processFile() {
    echo $1
    echo $2

    if [ -f ${1} ]; then
        mv ${1} ${1}.${TS}.bak
    fi

    wget ${2}
    head -n 4 ${1}
    touch ${1}
}

pushd vendor

processFile ${REACT_FILE} ${REACT_URI}
processFile ${REACT_DOM_FILE} ${REACT_DOM_URI}

ls -axpl

popd
