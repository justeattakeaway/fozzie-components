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
      run_all:
        type: boolean
    description: Runs commands based on passed parameters
    steps:
      - when:
          condition:
            equal: [ true, << parameters.run_all >> ]
          steps:
            - run:
                name: << parameters.command_description >>
                command: yarn << parameters.command_name >>
      - when:
          condition:
            equal: [ false, << parameters.run_all >> ]
          steps:
            - run:
                name: << parameters.command_description >>
                command: yarn << parameters.command_name >> --since master...HEAD

  build_packages:
    parameters:
      run_all:
        type: boolean
    description: Locally builds all packages in the monorepo
    steps:
      - run_command:
          command_description: Build packages
          command_name: build
          run_all: << parameters.run_all >>

  lint_packages:
      parameters:
        run_all:
          type: boolean
      description: Locally lints all packages in the monorepo
      steps:
        - run_command:
            command_description: Run linting for packages
            command_name: lint
            run_all: << parameters.run_all >>

  unit_integration_tests:
    parameters:
      run_all:
        type: boolean
    description: Run Unit / Integration Tests
    steps:
      - run_command:
          command_description: Run unit / integration tests for packages
          command_name: test
          run_all: << parameters.run_all >>

  bundle_watch:
    description: Run Bundlewatch tests
    steps:
      - run_command:
          command_description: Run Bundlewatch tests for packages
          command_name: bundlewatch
          run_all: true

  danger_ci:
    description: Run danger ci script
    steps:
      - run_command:
          command_description: Run danger ci script
          command_name: 'danger ci'
          run_all: true

  component_tests:
    parameters:
      run_all:
        type: boolean
    description: Run Component Tests
    steps:
      - run_command:
          command_description: Run component tests for packages
          command_name: "test-component:chrome"
          run_all: << parameters.run_all >>

  accessibility_tests:
    parameters:
      run_all:
        type: boolean
    description: Run Accessibility Tests
    steps:
      - run_command:
          command_description: Run accessibility tests for packages
          command_name: "test-a11y:chrome"
          run_all: << parameters.run_all >>

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
      - restore_cache:
          name: Restore Yarn Package Cache
          keys:
            - yarn-packages-{{ checksum "yarn.lock" }}
      - run:
          name: Installing required global packages
          command: yarn global add @vue/cli @vue/cli-service-global
      - run:
          name: Install Dependencies
          command: yarn install --frozen-lockfile --cache-folder ~/.cache/yarn
      - save_cache:
          name: Save Yarn Package Cache
          key: yarn-packages-{{ checksum "yarn.lock" }}
          paths:
            - ~/.cache/yarn
            - node_modules
      - persist_to_workspace:
          root: .
          paths:
            - '*'

  ci_checks:
    executor: node
    environment:
      # required to prevent ENOMEM errors
      LERNA_ARGS: --concurrency 1
    steps:
      - attach_workspace:
          at: .
      - danger_ci

  bundle_size_check:
    executor: node
    environment:
      # required to prevent ENOMEM errors
      LERNA_ARGS: --concurrency 1
    steps:
      - attach_workspace:
          at: .
      - bundle_watch

  build:
    executor: node
    parameters:
      path:
        type: string
      scope:
        type: string
      run_all:
        type: boolean
    environment:
      # required to prevent ENOMEM errors
      LERNA_ARGS: --concurrency 1 --scope << parameters.scope >>
    steps:
      - attach_workspace:
          at: .
      - build_packages:
          run_all: << parameters.run_all >>
      - save_cache:
          name: Save << parameters.scope >>'s dist folder
          key: << parameters.scope >>-{{ checksum "<< parameters.path >>/package.json" }}
          paths:
            - << parameters.path >>/dist
      - persist_to_workspace:
          root: .
          paths:
            - node_modules/<< parameters.scope >>
            - << parameters.path >>/dist

  lint:
    executor: node
    parameters:
      scope:
        type: string
      run_all:
        type: boolean
    environment:
      # required to prevent ENOMEM errors
      LERNA_ARGS: --concurrency 1 --scope << parameters.scope >>
    steps:
      - attach_workspace:
          at: .
      - lint_packages:
          run_all: << parameters.run_all >>

  unit:
    executor: node
    parameters:
      scope:
        type: string
      run_all:
        type: boolean
    environment:
      # required to prevent ENOMEM errors
      LERNA_ARGS: --concurrency 1 --scope << parameters.scope >>
    steps:
      - attach_workspace:
          at: .
      - unit_integration_tests:
          run_all: << parameters.run_all >>

  browser_tests:
    executor: node
    parameters:
      story_path:
        type: string
      scope:
        type: string
      run_all:
        type: boolean
    environment:
      LERNA_ARGS: --concurrency 1 --scope << parameters.scope >>
      CI_STORY_PATH: << parameters.story_path >>
    steps:
      - attach_workspace:
          at: .
      - run:
          name: Build Storybook
          command: yarn storybook:build
          background: true
      - run:
          name: Serve Storybook
          command: yarn storybook:serve-static
          background: true
      - component_tests:
          run_all: << parameters.run_all >>
      - accessibility_tests:
          run_all: << parameters.run_all >>

YAML

changes=`git diff --name-only origin/master...$CIRCLE_BRANCH | { grep -Ev '^packages/|yarn.lock|bear.png|.editorconfig' || true; }`

if [[ $changes ]] || [ $CIRCLE_BRANCH == "master" ]; then
  # get all the changed packages since master
  changed_packages=$(lerna ls --json);
  changed_package_names=($(lerna ls));
  run_all=true
else
  echo 'export RUN_ALL=false' >> $BASH_ENV
  # get all the changed packages since master
  changed_packages=$(lerna ls --json --since master...HEAD);
  changed_package_names=($(lerna ls --since master...HEAD));
  run_all=false
fi



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
      - ci_checks:
          filters:
            branches:
              ignore: [ 'gh-pages' ]
          requires:
            - install
      - bundle_size_check:
          filters:
            branches:
              ignore: [ 'gh-pages' ]
          requires:
YAML
for package in $(echo "${changed_packages}" | jq -c '.[]'); do
      name=$(echo "${package}" | jq -r '.name')
      res=${name/@/}
            cat<<YAML
            - build-${res/\//-}
YAML
done
for package in $(echo "${changed_packages}" | jq -c '.[]')
do

      name=$(echo "${package}" | jq -r '.name')
      location=$(echo "${package}" | jq -r '.location')
      path_for_ci=$(echo "${location}" | sed 's/^.*packages/packages/')
      story_path="../../../../${path_for_ci}/stories/**/*.stories.@(js|mdx)"

      res=${name/@/}
      cat<<YAML

      - browser_tests:
          name: browser-${res/\//-}
          context: web-core
          filters:
            branches:
              ignore: [ 'gh-pages' ]
          scope: '$name'
          run_all: $run_all
          story_path: '$story_path'
          requires:
            - build-${res/\//-}

      - lint:
          name: lint-${res/\//-}
          context: web-core
          filters:
            branches:
              ignore: [ 'gh-pages' ]
          scope: '$name'
          run_all: $run_all
          requires:
            - build-${res/\//-}

      - unit:
          name: unit-${res/\//-}
          context: web-core
          filters:
            branches:
              ignore: [ 'gh-pages' ]
          scope: '$name'
          run_all: $run_all
          requires:
            - build-${res/\//-}

      - build:
          name: build-${res/\//-}
          context: web-core
          filters:
            branches:
              ignore: [ 'gh-pages' ]
          scope: '$name'
          run_all: $run_all
          path: '$path_for_ci'
YAML
    # find all the devDependencies that this package relies on that are just eat so we can build in the correct order
    devDependencies=(`cat $location/package.json | jq -c -r ".devDependencies | keys[]" | grep '@justeat'`)

     # find all the dependencies that this package relies on that are just eat so we can build in the correct order
    dependencies=(`cat $location/package.json | jq -c -r ".dependencies | keys[]" | grep '@justeat'`)

    buildFirstDevDependencies=($(
        for item in "${devDependencies[@]}"; do
            [[ ${changed_package_names[*]} =~ (^|[[:space:]])"$item"($|[[:space:]]) ]] \
                    && echo "$item"
        done
    ))

    buildFirstDependencies=($(
        for item in "${dependencies[@]}"; do
            [[ ${changed_package_names[*]} =~ (^|[[:space:]])"$item"($|[[:space:]]) ]] \
                    && echo "$item"
        done
    ))

          cat<<YAML
          requires:
            - install
YAML
    for required in "${buildFirstDevDependencies[@]}"; do
      res=${required/@/}
            cat<<YAML
            - build-${res/\//-}
YAML
    done
    for required in "${buildFirstDependencies[@]}"; do
      res=${required/@/}
            cat<<YAML
            - build-${res/\//-}
YAML
      done
done

#echo $changed_packages
# then we want to loop over the changed packages


