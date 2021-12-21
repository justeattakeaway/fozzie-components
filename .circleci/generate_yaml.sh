#!/bin/bash

# get all the changed packages since master
changed_packages=($(lerna ls --since master...HEAD));

cat<<YAML
---
workflows:
  version: 2
YAML
for package in "${changed_packages[@]}"
do
  cat<<YAML
  build:
    name: $package
YAML
done

#echo $changed_packages
# then we want to loop over the changed packages


