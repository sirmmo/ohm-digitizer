#!/bin/sh

chmod 755 * -R
apk update
apk add jq
jq -n env > ./assets/env.json
apk del jq
rm -rf /var/cache/apk/*
nginx -g "daemon off;"
