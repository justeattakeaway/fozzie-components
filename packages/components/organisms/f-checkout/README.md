
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

## Configuration

### Props

`f-checkout` has a number of props that allow you to customise its functionality.

The props that can be defined are as follows:

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |
| `checkoutUrl` | `String` | - | URL for the API called to load the Checkout Data.<br><br>The data returned from this API contains the serviceType, which determines if the Checkout component is created for Collection or Delivery. |
| `checkoutAvailableFulfilmentUrl` | `String` | - | URL for the API called to load the Available Fulfilment data. |
| `checkoutTimeout` | `Number` | `1000` | Timeout when submitting the checkout form. |
| `getCheckoutTimeout` | `Number` | `1000` | Timeout when loading checkout data. |
| `authToken` | `String` | `''` | Authorisation token used when submitting the checkout form. |
| `loginUrl` | `String` | `-` | URL to navigate to if the user wishes to change account. |

### CSS Classes

Checkout has its own styles that are scoped to the component using CSS modules to prevent conflicts with existing styles on the page.

In addition to this, checkout exposes some classes that you can target in your application.

| Class | Description |
| ----- | ----------- |
| `c-checkout` | Targets the checkout wrapper element. |
| `c-card--dimensions` | Targets the checkout content dimensions. |
| `c-checkout-alert`  | Targets the checkout alert element when it is visible. |
| `c-checkout-allergyButton` | Targets the checkout allergy button. |
| `c-checkout-submitButton` | Targets the checkout submit button. |
| `c-address-label` | Targets the address group label when checkout is using the delivery method. |
| `c-address-group` | Targets the grouped address fields when checkout is using the delivery method. |
| `c-address-error` | Targets the error message spacing in the address element when checkout is using the delivery method. |
| `c-userNote` | Targets the checkout user note wrapper. |
| `c-userNote-title` | Targets the checkout user note title. |
| `c-userNote-content` | Targets the checkout user note text description. |
| `c-userNote-textArea` | Targets the checkout user note text area. |
| `c-checkout-link` | Targets any link in the checkout page. |

### Events

| Event | Description |
| ----- | ----------- |
| `checkout-payment-success` | Emitted when checkout form is successfully submitted. |
| `checkout-payment-failure` | Emitted when checkout form fails when submitted. |
| `checkout-get-success` | Emitted when checkout data is successfully loaded.  |
| `checkout-get-failure` | Emitted when checkout data fails to load. |
| `checkout-visit-login-page` | Emitted when user clicks the _Not you?_ link |

You can add event listeners for these like so

```html
<template>
  <vue-checkout
    @checkoutPaymentSuccess="onPaymentSuccess"
    @checkoutPaymentFailure="onPaymentFailure"
    @checkoutGetPaymentSuccess="onGetPaymentSuccess"
    @checkoutGetPaymentFailure="onGetPaymentFailure"
  </vue-checkout>
</template>

<script>
export default {
  methods: {
    onPaymentSuccess () {
      // Do stuff here
    },

    onPaymentFailure () {
      // Do stuff here
    },

    onGetPaymentSuccess () {
      // Do stuff here
    },

    onGetPaymentFailure () {
      // Do stuff here
    }
  }
}
</script>
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
