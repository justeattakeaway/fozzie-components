<div align="center">

# f-takeawaypay-activation

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Handles Takeaway Pay activation for users

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-takeawaypay-activation.svg)](https://badge.fury.io/js/%40justeat%2Ff-takeawaypay-activation)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-takeawaypay-activation/badge.svg)](https://coveralls.io/github/justeat/f-takeawaypay-activation)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-takeawaypay-activation/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-takeawaypay-activation?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-takeawaypay-activation
```

```sh
npm install @justeat/f-takeawaypay-activation
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import TakeawaypayActivation from '@justeat/f-takeawaypay-activation';
import '@justeat/f-takeawaypay-activation/dist/f-takeawaypay-activation.css';

export default {
    components: {
        TakeawaypayActivation
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `takeawaypay-activation` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-takeawaypay-activation/dist/f-takeawaypay-activation.css';

export default {
    components: {
        // …
        TakeawaypayActivation: () => import(/* webpackChunkName: "takeawaypay-activation" */ '@justeat/f-takeawaypay-activation')
    }
}
```

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |

### Events

The events that can be subscribed to are as follows (if any):

| Event | Description |
| ----- | ----------- |

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-takeawaypay-activation` package:

```sh
$ cd packages/components/organisms/f-takeawaypay-activation
```

## Testing

### Unit, Integration and Contract

To test all components, run from root directory.
To test only `f-takeawaypay-activation`, run from the `./fozzie-components/packages/components/organisms/f-takeawaypay-activation` directory.

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
# Run Component tests for f-takeawaypay-activation
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components/packages/components/organisms/f-takeawaypay-activation
yarn test-component:chrome
```
## Documentation to be completed once module is in stable state.


