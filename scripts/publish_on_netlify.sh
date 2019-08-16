#!/usr/bin/env bash

# Exit on error
set -e

# https://gist.github.com/cjus/1047794
echo 'Retrieving latest deploy...'
url=`curl -H "Authorization: Bearer $NETLIFY_KEY" https://api.netlify.com/api/v1/sites/5f145979-fd7f-4b3f-b435-d5d4a095d9a7/deploys`
temp=`echo $url | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w -m 1 'id'`

# https://www.netlify.com/docs/api/#deploys
echo "Publishing build ${temp##*|}..."
curl -X POST -H "Authorization: Bearer $NETLIFY_KEY" -d "{}" "https://api.netlify.com/api/v1/sites/5f145979-fd7f-4b3f-b435-d5d4a095d9a7/deploys/${temp##*|}/restore"
