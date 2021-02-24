# PLEASE DO NOT USE THE BETA VERSION OF THIS COMPONENT IN PRODUCTION YET.

<div align="center">
  <h1>f-searchbox</h1>

  <img width="125" alt="Fozzie Bear" src="../../bear.png" />

  <p>Just Eat Takeaway Global Searchbox</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-searchbox.svg)](https://badge.fury.io/js/%40justeat%2Ff-searchbox)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-searchbox/badge.svg)](https://coveralls.io/github/justeat/f-searchbox)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-searchbox/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-searchbox?targetFile=package.json)


## Usage

1.  Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/f-searchbox
    ```

    ```bash
    npm install @justeat/f-searchbox
    ```

2.  Import the component

    You can import it in your Vue SFC like this (please note that styles have to be imported separately):

    ```
    import VueSearchbox from '@justeat/f-searchbox';
    import '@justeat/f-searchbox/dist/f-searchbox.css';

    export default {
        components: {
            VueSearchbox
        }
    }
    ```

    If you are using Webpack, you can import the component dynamically to separate the `vue-searchbox` bundle from the main `bundle.client.js`:

    ```
    import '@justeat/f-searchbox/dist/f-searchbox.css';

    export default {
        components: {
            ...
            VueSearchbox: () => import(/* webpackChunkName: "vue-searchbox" */ '@justeat/f-searchbox')
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
# Run Unit / Integration / Contract tests for f-searchbox
cd ./fozzie-components/packages/f-searchbox
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
# Run Component tests for f-searchbox
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components/packages/f-searchbox
yarn test-component:chrome
```

## Documentation to be completed once module is in stable state.

## Configuration

### Vuex namespacing

The Vuex store in this application uses `fSearchboxModule` as its namespace. When registering modules in your own application please be mindful that naming a Vuex store in your application the same as the one that's registered here will cause Vuex errors.

### Config example

To apply these configs, pass them through as part of an optional `config` prop.

E.g.

```vue
<template>
    <vue-search-box
        locale="en-GB"
        :config="{
            isShellHidden: true,
            shouldSetCookies: false
        }" />
</template>
```

```js
const config = {                 // (opt) component settings
  address: '',                    // String - override default address field value
  cuisine: '',                    // String - override default cuisine field value
  isShellHidden: false,           // Boolean – hide/show search box shell
  isCompressed: false,            // Boolean - hide/show compressed searchbox
  query: '',                      // String - override default query field value
  queryParams: {},                // Object - Query parameter overrides as key value pairs
  onSubmit: a => void,            // Function - called when user selects a valid address, prevents f-searchbox from generating and submitting a custom post request and instead allows the consuming app to handle its own custom submit.
  shouldSetCookies: false,              // Boolean - sets je default location cookies
  shouldAutoPopulateAddress: true,      // Boolean - should the address value be auto-populated?
  shouldClearAddressOnValidSubmit: true // Boolean - should the address be cleared when a valid form is submitted?
}
```

## Configuration

### Props

`f-searchbox` has a number of props that allow you to customise its functionality.

The props that can be defined are as follows:

| Prop                      | Required       | Type          | Default | Description |
| :---                      |     :---:      |     :---:     |  :---:  | :---        |
| locale                    | false          | `string`      | `en-GB` | Sets the locale of the component (which determines what theme and translations to use |
| config                    | false          | `object`      | `{}`    | When passed in `f-searchbox` will allow presentational & functional customisation (see options section) |
| dependentApiPromise       | false          | `object`      | `{}`    | Allows a `Promise` to be passed through to `f-searchbox` so the client can resolve it. |
| copyOverride              | false          | `object`      | `{}`    | Allows copy override within the component, see `Override copy` section for example. |


### Events

### Example usage

`f-searchbox` exposes a number of hooks that can be used to trigger functions in the consuming application.

```js
<search-box
    @searchbox-error="handleSearchboxError"
    @address-search-focus="addressFocus"
    @submit-saved-address="validSavedAddressSearch"
    @submit-valid-address="validSearch"
    @track-postcode-changed="onPostcodeChanged"/>
```

### Available Events

| Event | Description |
| ----- | ----------- |
| `@searchbox-error` | Fires when an error is thrown by `f-searchbox`. |
| `@address-search-focus` | Fires when the address input is focused. |
| `@submit-saved-address` | Fires if user submits an address with the same address as previously recorded by the `f-searchbox`. |
| `@submit-valid-address` | Fires if an address is submitted with no errors. |
| `@track-postcode-changed` | Fires when the address input value has changed from a previous address to a new valid address. |


### `config.queryParams`

Applies query parameters to the form URL to enable filters and other options on the search results page.

**Format**

```vue
<vue-search-box
    :config="{
        queryString: {
           [param]: value
        }
    }"
/>
```

**Example**


```vue
<vue-search-box
    :config="{
        queryString: {
           refine: 'halal' // Users are redirected to /:search-url?refine=halal
        }
    }"
/>
```

## Override copy

You can override the `f-searchbox` copy using `copy-override`.
This will also work with the headings.

```vue
<template>
    <search-box
        locale="en-GB"
        :copy-override="{ buttonText: 'Confirm' }" />
</template>
```

```js
const copyOverrides = {
    buttonText: "Confirm",
    fieldLabel: "Enter your address",
    // ...
}
```

### Non-Vue Applications

This module can be ran as a micro front-end for applications that don't make use of the Vue framework.

The following rudimentary example can be used as a guide for implementing this component in an existing static application.

NOTE: You need to provide Vue with an instance of Vuex for f-searchbox to work correctly. This should be
added after Vue has been included. Including the `unpkg` Vuex script, like the below example, will automatically install Vuex.

The version of Vuex required must be no earlier than `vuex@3.2.0` as f-searchbox under the hood registers
the store module using `this.$store.hasModule('searchbox')`, `hasModule` was added in `v3.2.0`, earlier Vuex versions will break store registration.


```html
<!doctype html>
<html lang="en">
<head>
    <title>f-searchbox example standalone</title>
    <link rel="stylesheet" href="https://unpkg.com/@justeat/f-searchbox/dist/f-searchbox.css">
</head>
<body>
    <div data-app>
        <vue-searchbox locale="en-GB" />
    </div>
    <script src="https://unpkg.com/vue@2.6.11/dist/vue.js"></script>
    <script src="https://unpkg.com/vuex@3.2.0/dist/vuex.js"></script>
    <script src="https://unpkg.com/@justeat/f-searchbox/dist/f-searchbox.umd.min.js"></script>
    <script>
        (function() {
            if (typeof Vue === 'undefined') return null;

            Vue.config.devtools = false;
            Vue.config.productionTip = false;

            return new Vue({
                store: new Vuex.Store({}), // init empty Vuex store here.
                el: '[data-app]'
            });
    	})();
    </script>
</body>
</html>
```
