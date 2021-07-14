# Fozzie Components Documentation


## Installation

This is a _mono-repo_.  It contains several packages, all controlled from a top level `packages.json`.

Each project has its own `package.json` file containing package specific configuration, **however** don't run `yarn install` from a package project; instead run it from the top level.

If you run `yarn install` from a package then you may well get an unhelpful error like this:

```none
Error: ENOENT: no such file or directory, symlink '…\fozzie-components\packages\…' -> '…\fozzie-components\node_modules\@justeat\…'
```

If this happens, delete all the `node_modules` folders throughout and then run `yarn install` from the root directory again.

In some rare cases modules specified in the components own `package.json` file can sometimes fail to resolve / install correctly. This can lead to errors like:
Example error: The following module could not be found, please run `yarn add @moduleName` to install it.

There's two solutions you could try from the root of the project which may fix this:

1. yarn cache clean
2. yarn build


## Development
It is recommended to run the following commands at the root of the monorepo in order to install dependencies and allow you to view components in isolation via Storybook.

## Importing optional SCSS helpers from Fozzie
We have created several optional mixin helpers in [Fozzie](https://github.com/justeat/fozzie/tree/master/src/scss/components/optional).
Here's an example of how to use it:

Note: Importing the optional mixin and using `@include` in the `common.scss` file of your component doesn't work if you have `module` enabled on your SFC.

```sass
<style lang="scss" module>
@include pageBanner();
</style>
```

## Testing
Unit / Integration / Contract

```bash
# Run Unit / Integration / Contract tests for all components
cd ./fozzie-components
yarn test
```

OR

```bash
# Run Unit / Integration / Contract tests for individual f-* packag
cd ./fozzie-components/packages/f-*
yarn test
```

Component Tests
```bash
# Run Component tests for all components
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components

yarn storybook:build
yarn storybook:serve-static
yarn test-component:chrome
```

OR

```bash
# Run Component tests for individual f-* package
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components/packages/f-*user-message*
yarn test-component:chrome
```

## Running Storybook

To run storybook first you must run the following at the the top level

`yarn build` to build the require packages for storybook to run.

Then run `yarn storybook:serve` to start storybook, which will open on `localhost:8080`.

## Committing Code

We use [Husky](https://github.com/typicode/husky) to manage our git hooks.

[When you make a commit, the following scripts will run as part of our pre-commit hook.](https://github.com/justeat/fozzie-components/blob/master/.husky/pre-commit)

If you wish to skip this Husky hook, simply add the `--no-verify` argument when making your commit.

For example: `git commit -m "Refactor f-button" --no-verify `.

## Publishing Components

More information about how to contribute to this repo can be found in our Storybook [Documentation section](https://vue.pie.design/?path=/story/documentation-getting-started-contributing--page)

### [Just Eat Storybook production](https://vue.pie.design/)
