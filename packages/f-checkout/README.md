
<div align="center">
  <h1>f-checkout</h1>

  <img width="125" alt="Fozzie Bear" src="../../bear.png" />

  <p>Fozzie Checkout Component</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-checkout.svg)](https://badge.fury.io/js/%40justeat%2Ff-checkout)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-checkout/badge.svg)](https://coveralls.io/github/justeat/f-checkout)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-checkout/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-checkout?targetFile=package.json)


## Usage

1.  Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/f-checkout
    ```

    ```bash
    npm install @justeat/f-checkout
    ```

2.  Import the component

    You can import it in your Vue SFC like this (please note that styles have to be imported separately):

    ```
    import VueCheckout from '@justeat/f-checkout';
    import '@justeat/f-checkout/dist/f-checkout.css';

    export default {
        components: {
            VueCheckout
        }
    }
    ```

    If you are using Webpack, you can import the component dynamically to separate the `vue-checkout` bundle from the main `bundle.client.js`:

    ```
    import '@justeat/f-checkout/dist/f-checkout.css';

    export default {
        components: {
            ...
            VueCheckout: () => import(/* webpackChunkName: "vue-checkout" */ '@justeat/f-checkout')
        }
    }

    ```

## Development
It is recommended to run the following commands at the root of the monorepo in order to install dependencies and allow you to view components in isolation via Storybook.

```bash
# cd ./fozzie-components
yarn install

## Testing
Unit / Integration / Contract

```bash
# Run Unit / Integration / Contract tests for all components
cd ./fozzie-components
yarn test
```

OR

```bash
# Run Unit / Integration / Contract tests for f-checkout
cd ./fozzie-components/packages/f-checkout
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
# Run Component tests for f-checkout
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components/packages/f-checkout
yarn test-component:chrome
```
## Documentation to be completed once module is in stable state.
