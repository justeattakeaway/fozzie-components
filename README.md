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
We use [Turborepo](https://www.turborepo.org) to handle all of our build tasks in order to speed up development. We utilise Turborepo caching so that certain tasks only execute for changed components and their dependencies / dependants.

Because of this, it is recommended to run the following tasks at the root of the monorepo to ensure tasks are executed for the required components:

`build`
`test`
`lint`

For other test tasks you can execute in a number of ways:

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
 cd ./fozzie-components
 yarn storybook:build
 yarn storybook:serve-static
 # And in another window
 cd ./fozzie-components/packages/f-*user-message*
 yarn test-component:chrome
 ```

## Importing optional SCSS helpers from Fozzie
We have created several optional mixin helpers in [Fozzie](https://github.com/justeat/fozzie/tree/master/src/scss/components/optional).
Here's an example of how to use it:

Note: Importing the optional mixin and using `@include` in the `common.scss` file of your component doesn't work if you have `module` enabled on your SFC.

```sass
<style lang="scss" module>
@include pageBanner();
</style>
```

## Reusable styling with common.scss
You can add reusable styles to the `common.scss` file. This can be useful for components that use sub-components and may wish to share mixins, functions and variables.

Every component comes with a `vue.config.js` file that makes the `common.scss` file available under the namespace `common` like so:
```
`@use "../assets/scss/common.scss";`
```
To access anything from the common file, simply prefix the value like so:

```
// Fake values used for demonstation
.someClass {
  color: common.$fontColor;
  line-height: common.line-height();
  @include common.truncate();
}
```

You could remove the need for namespacing by using something like `@use "../assets/scss/common.scss" as *` however utilising the namespace makes it much easier to understand where a value is coming from.

## Running Storybook

To run storybook first you must run the following at the the top level

`yarn build` to build the require packages for storybook to run.

Then run `yarn storybook:serve` to start storybook, which will open on `localhost:8080`.

Alternatively, you can run `yarn build:changed` and `yarn storybook:serve-changed` to just view the component you're working on, as well as any of it's dependencies / dependants.

### Running a single component in Storybook

If you wish to view a single component in Storybook during development, you can do this by opening the components `*.stories.js` file in your IDE and running the `Storybook - Run Currently Open Story File` task which can be found in the debug tab on the left. (This only works with VS Code).

This is particuarly useful as it prevents a bug where Storybook pulls in other components stylesheets ([See here](https://github.com/storybookjs/storybook/issues/729)).

## Committing Code

We use [Husky](https://github.com/typicode/husky) to manage our git hooks.

[When you make a commit, the following scripts will run as part of our pre-commit hook.](https://github.com/justeat/fozzie-components/blob/master/.husky/pre-commit)

If you wish to skip this Husky hook, simply add the `--no-verify` argument when making your commit.

For example: `git commit -m "Refactor f-button" --no-verify `.

## Publishing Components

More information about how to contribute to this repo can be found in our Storybook [Documentation section](https://vue.pie.design/?path=/story/documentation-getting-started-contributing--page)

### [Just Eat Storybook production](https://vue.pie.design/)
