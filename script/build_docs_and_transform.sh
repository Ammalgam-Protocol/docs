#!/bin/bash

start=$PWD

if [ $# -ne 1 ]
then
    # clone core-v1
    git clone git@github.com:Ammalgam-Protocol/core-v1.git
    cd core-v1
    current_tag=$(git describe --tags)

    echo "checked out tag"
    echo $current_tag
    echo "building docs"
    core_dir="core_v1"
else
  core_dir=$1
fi

cd $core_dir

# Build docs using forge assumes calling from the root of the repo
forge doc --build

echo "formatting docs for docusaurus"

# Transform docs from mdbook format to docusaurus
find docs/src/contracts -type f -name "README.md" -exec bash -c '
    echo $1
    # Define the JSON content

    category_file="${1%/*}/_category_.json"
    echo $category_file
    echo "{ \"link\": { \"type\": \"generated-index\" } }" > "$category_file"
    rm "$1"
' bash {} \;

# Copy docs to docusaurus
echo "Replacing current contract docs with new version"
# move out of core-v1 to root
cd $start
rm -rf docs/contracts
cp -r $core_dir/docs/src/contracts docs/contracts

# remove core-v1
rm -rf core-v1