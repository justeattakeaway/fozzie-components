#!/bin/bash

# jq is the json parser
#jq=../node_modules/node-jq/bin/jq

cat<<YAML
commands:
  install_node_dependencies:
    description: Installs the node dependencies
    steps:
      - run:
          name: Install node dependencies
          command: yarn install --frozen-lockfile --cache-folder ~/.cache/yarn

  cache_checksum:
    description: Yarn node_modules cache checksum
    steps:
      - run:
          name: Create cache checksum file
          command: |
            mkdir -p ~/.tmp/checksumfiles
            find . -type f -name 'yarn.lock' -not -path "*node_modules*" -exec cat {} + >> ~/.tmp/checksumfiles/yarn.lock

  run_command:
    parameters:
      command_description:
        type: string
      command_name:
        type: string
    description: Runs commands based on passed parameters
    steps:
      - run:
          name: << parameters.command_description >>
          command: lerna run $LERNA_ARGS << parameters.command_name >> --since master...HEAD

  build_packages:
    parameters:
      scope:
        type: string
    description: Locally builds all packages in the monorepo
    steps:
      - run_command:
          command_description: Build packages
          command_name: build --scope << parameters.scope >>

executors:
  node:
    docker:
      # specify the version you desire here
      - image: circleci/node:14.18.1-browsers # For latest available images check – https://circleci.com/docs/2.0/docker-image-tags.json

jobs:

  install:
    executor: node
    environment:
      # required to prevent ENOMEM errors
      LERNA_ARGS: --concurrency 1
    steps:
      - checkout
      - cache_checksum
      - restore_cache:
            name: Restore Yarn Package Cache
            keys:
              - yarn-packages-{{ checksum "yarn.lock" }}
      - install_node_dependencies
      - persist_to_workspace:
          root: .
          paths:
            - '*'

  build:
    executor: node
    environment:
      # required to prevent ENOMEM errors
      LERNA_ARGS: --concurrency 1
    parameters:
      scope:
        type: string
    steps:
      - attach_workspace:
          at: .
      - build_packages:
          scope: << parameters.scope >>
YAML

# get all the changed packages since master
changed_packages=($(lerna ls --since master...HEAD));

cat<<YAML
workflows:
  version: 2

  build_and_test:
    jobs:
      - install
YAML
for package in "${changed_packages[@]}"
do
      cat<<YAML
      - build:
          name: build-$package
          parameters:
            scope: $package
YAML
  # find all the devDependencies that this package relies on that are just eat so we can build in the correct order
   devDependencies=(`cat ../node_modules/$package/package.json | jq -c -r ".devDependencies | keys[]" | grep '@justeat'`)

    buildFirst=($(
        for item in "${devDependencies[@]}"; do
            [[ ${changed_packages[*]} =~ (^|[[:space:]])"$item"($|[[:space:]]) ]] \
                    && echo "$item"
        done
    ))

if (( ${#buildFirst[@]} )); then
          cat<<YAML
          requires:
YAML
    fi
    for required in "${buildFirst[@]}"; do
            cat<<YAML
            - build-$required
YAML
      done
done

#echo $changed_packages
# then we want to loop over the changed packages


