#!/bin/bash

# jq is the json parser
#jq=../node_modules/node-jq/bin/jq

cat<<YAML
version: 2.1

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
          command: yarn << parameters.command_name >> --since master...HEAD

  build_packages:
    description: Locally builds all packages in the monorepo
    steps:
      - run_command:
          command_description: Build packages
          command_name: build

  lint_packages:
      description: Locally lints all packages in the monorepo
      steps:
        - run_command:
            command_description: Run linting for packages
            command_name: lint

  unit_integration_tests:
    description: Run Unit / Integration Tests
    steps:
      - run_command:
          command_description: Run unit / integration tests for packages
          command_name: "test"

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
    parameters:
          scope:
            type: string
    environment:
      # required to prevent ENOMEM errors
      LERNA_ARGS: --concurrency 1 --scope << parameters.scope >>
    steps:
      - attach_workspace:
          at: .
      - build_packages
      - persist_to_workspace:
          root: .
          paths:
            - node_modules/<< parameters.scope >>

  lint:
    executor: node
    parameters:
      scope:
        type: string
    environment:
      # required to prevent ENOMEM errors
      LERNA_ARGS: --concurrency 1 --scope << parameters.scope >>
    steps:
      - attach_workspace:
          at: .
      - lint_packages

  unit:
    executor: node
    parameters:
      scope:
        type: string
    environment:
      # required to prevent ENOMEM errors
      LERNA_ARGS: --concurrency 1 --scope << parameters.scope >>
    steps:
      - attach_workspace:
          at: .
      - unit_integration_tests

YAML

# get all the changed packages since master
changed_packages=$(lerna ls --json --since master...HEAD);
changed_package_names=($(lerna ls --since master...HEAD));

cat<<YAML
workflows:
  version: 2

  build_and_test:
    jobs:
      - install:
          context: web-core
          filters:
            branches:
              ignore: [ 'gh-pages' ]
YAML
for package in $(echo "${changed_packages}" | jq -c '.[]')
do

  name=$(echo "${package}" | jq -r '.name')
  location=$(echo "${package}" | jq -r '.location')

  res=${name/@/}
      cat<<YAML

      - build:
          name: build-${res/\//-}
          context: web-core
          filters:
            branches:
              ignore: [ 'gh-pages' ]
          scope: '$name'
YAML
  # find all the devDependencies that this package relies on that are just eat so we can build in the correct order
   devDependencies=(`cat $location/package.json | jq -c -r ".devDependencies | keys[]" | grep '@justeat'`)

    buildFirst=($(
        for item in "${devDependencies[@]}"; do
            [[ ${changed_package_names[*]} =~ (^|[[:space:]])"$item"($|[[:space:]]) ]] \
                    && echo "$item"
        done
    ))

          cat<<YAML
          requires:
            - install
YAML
    for required in "${buildFirst[@]}"; do
      res=${required/@/}
            cat<<YAML
            - build-${res/\//-}

      - lint:
          name: lint-${res/\//-}
          context: web-core
          filters:
            branches:
              ignore: [ 'gh-pages' ]
          requires:
            - build-${res/\//-}

      - unit:
          name: unit-${res/\//-}
          context: web-core
          filters:
            branches:
              ignore: [ 'gh-pages' ]
          requires:
            - build-${res/\//-}
YAML
      done
done

#echo $changed_packages
# then we want to loop over the changed packages


