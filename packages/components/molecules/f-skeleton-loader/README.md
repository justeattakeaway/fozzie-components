<div align="center">

# f-skeleton-loader

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Provides a visual indication that another component is loading.  A set of predefined skeletonTypes render lightweight markup to represent the component that is loading.

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-skeleton-loader.svg)](https://badge.fury.io/js/%40justeat%2Ff-skeleton-loader)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-skeleton-loader/badge.svg)](https://coveralls.io/github/justeat/f-skeleton-loader)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-skeleton-loader
```

```sh
npm install @justeat/f-skeleton-loader
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import SkeletonLoader from '@justeat/f-skeleton-loader';
import '@justeat/f-skeleton-loader/dist/f-skeleton-loader.css';

export default {
    components: {
        SkeletonLoader
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `skeleton-loader` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-skeleton-loader/dist/f-skeleton-loader.css';

export default {
    components: {
        // …
        SkeletonLoader: () => import(/* webpackChunkName: "skeleton-loader" */ '@justeat/f-skeleton-loader')
    }
}
```

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop          | Type  | Default | Description |
| -----         | ----- | ------- | ----------- |
| skeletonType  | String  | ""  | The predefined component skeleton to render

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-skeleton-loader` package:

```sh
$ cd packages/components/molecules/f-skeleton-loader
```

## Testing

### Unit, Integration and Contract

To test all components, run from root directory.
To test only `f-skeleton-loader`, run from the `./fozzie-components/packages/components/molecules/f-skeleton-loader` directory.

```sh
yarn test
```

### Component Tests

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
# Run Component tests for f-skeleton-loader
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components/packages/components/molecules/f-skeleton-loader
yarn test-component:chrome
```

##Acknowledgments

This component is heavily based on the Vuetify SkeletonLoader component https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/components/VSkeletonLoader Huge thanks to the team and everyone involved in its development.

## Documentation to be completed once module is in stable state.

