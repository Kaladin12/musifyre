#!/bin/bash
set -e

update_version(){
        # Get the current version from package.json
        old_version=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

        # Split the version into an array
        IFS='.' read -r -a version_split <<< "$old_version"

        # Increment the number at the 3rd position (0, 1, 2)
        ((version_split[2]++))

        # Form the new version
        new_version="${version_split[0]}.${version_split[1]}.${version_split[2]}"

        # Update the version in package.json
        sed -i -e "0,/$old_version/s/$old_version/$new_version/" package.json

        # Update the version in package-lock.json
        sed -i -e "/\"name\": \"musifyre-cdk\"/,/\"version\": \"$old_version\"/s/\"version\": \"$old_version\"/\"version\": \"$new_version\"/" package-lock.json

}


# show off the old version
npm version | head -1

update_version

# show off the updated version
npm version | head -1
