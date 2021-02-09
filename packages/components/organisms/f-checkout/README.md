
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

2.  Import the component and its module, ensuring the latter is registered in the Vuex store upon creation.

    You can import it in your Vue SFC like this (please note that styles have to be imported separately):

    ```
    import { VueCheckout, CheckoutModule } from '@justeat/f-checkout';
    import '@justeat/f-checkout/dist/f-checkout.css';

    export default {
        components: {
            VueCheckout
        },

        created () {
            if (!this.$store.hasModule('checkout')) {
                this.$store.registerModule('checkout', CheckoutModule);
            }
        },
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
| `updateCheckoutUrl` | `String` | - | URL for the API called to update the Checkout Data |
| `getCheckoutUrl` | `String` | - | URL for the API called to load the Checkout Data.<br><br>The data returned from this API contains the serviceType, which determines if the Checkout component is created for Collection or Delivery when the user is authenticated. |
| `checkoutAvailableFulfilmentUrl` | `String` | - | URL for the API called to load the Available Fulfilment data. |
| `createGuestUrl` | `String` | - | URL for the API called to load the Create a Guest User. |
| `getBasketUrl` | `String` | - | URL for the API called to get Basket Details.<br><br>The data returned from this API contains the serviceType, which determines if the Checkout component is created for Collection or Delivery when the user is not authenticated. |
| `checkoutTimeout` | `Number` | 1000 | Timeout when submitting the checkout form. |
| `getCheckoutTimeout` | `Number` | 1000 | Timeout when loading checkout data. |
| `createGuestTimeout` | `Number` | 1000 | Timeout when creating a guest user. |
| `getBasketTimeout` | `Number` | 1000 | Timeout when loading basket data. |
| `updateCheckoutTimeout` | `Number` | 1000 | Timeout when updating checkout data. |
| `authToken` | `String` | `''` | Authorisation token used when submitting the checkout form. |
| `loginUrl` | `String` | `-` | URL to navigate to if the user wishes to change account. |

### Events

| Event | Description |
| ----- | ----------- |
| `checkout-payment-success` | Emitted when checkout form is successfully submitted. |
| `checkout-payment-failure` | Emitted when checkout form fails when submitted. |
| `checkout-get-success` | Emitted when checkout data is successfully loaded.  |
| `checkout-get-failure` | Emitted when checkout data fails to load. |
| `checkout-available-fulfilment-get-success` | Emitted when available fulfilment times are successfully loaded. |
| `checkout-available-fulfilment-get-failure` | Emitted when available fulfilment times fail to load. |
| `checkout-visit-login-page` | Emitted when user clicks the _Not you?_ link |
| `checkout-basket-get-success` | Emitted when basket data is successfully loaded. |
| `checkout-setup-guest-success` | Emitted when guest user is created successfully. |
| `checkout-setup-guest-failure` | Emitted when guest user is not created successfully. |
| `checkout-validation-error` | Emitted validation error occurs. |

You can add event listeners for these like so

```html
<template>
  <vue-checkout
    @checkoutPaymentSuccess="onPaymentSuccess"
    @checkoutPaymentFailure="onPaymentFailure"
    @checkoutGetSuccess="onGetCheckoutSuccess"
    @checkoutGetFailure="onGetCheckoutFailure"
    @checkoutGetPaymentSuccess="onGetPaymentSuccess"
    @checkoutGetPaymentFailure="onGetPaymentFailure"
    @checkoutGetBasketSuccess="onGetBasketSuccess"
    @checkoutGetBasketFailure="onGetBasketFailure"
    @checkoutSetupGuestSuccess="onSetupGuestSuccess"
    @checkoutSetupGuestFailure="onSetupGuestFailure"
    @checkoutValidationError="onValidationError">
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

    onGetCheckoutSuccess () {
      // Do stuff here
    },

    onGetCheckoutFailure () {
      // Do stuff here
    },


    onGetPaymentSuccess () {
      // Do stuff here
    },

    onGetPaymentFailure () {
      // Do stuff here
    },

    onGetBasketSuccess () {
      // Do stuff here
    },

    onGetBasketFailure () {
      // Do stuff here
    },

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
