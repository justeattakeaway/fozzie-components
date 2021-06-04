
<div align="center">
  <h1>f-tabs</h1>

  <img width="125" alt="Fozzie Bear" src="../../bear.png" />

  <p>Switchable slots for content&#34;</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-tabs.svg)](https://badge.fury.io/js/%40justeat%2Ff-tabs)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-tabs/badge.svg)](https://coveralls.io/github/justeat/f-tabs)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-tabs/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-tabs?targetFile=package.json)


## Usage

1.  Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/f-tabs
    ```

    ```bash
    npm install @justeat/f-tabs
    ```

2.  Import the component

    This component has two exports `Tab.vue` and `Tabs.vue`. The reasoning behind this is that due to the ability to
    register a tab with provide / inject, you may wish in a particular circumstance create your own tab and register
    it manually, therefore removing the need to import `Tab.vue`.

    You can import it in your Vue SFC like this (please note that styles have to be imported separately):

    ```
    import { Tabs, Tab } from '@justeat/f-tabs';
    import '@justeat/f-tabs/dist/f-tabs.css';

    export default {
        components: {
            Tabs,
            Tab
        }
    }
    ```

    If you are using Webpack, you can import the component dynamically to separate the `vue-tabs` bundle from the main `bundle.client.js`:

    ```
    import '@justeat/f-tabs/dist/f-tabs.css';

    export default {
        components: {
            ...
            VueTabs: () => import(/* webpackChunkName: "vue-tabs" */ '@justeat/f-tabs')
        }
    }

    ```

## Configuration

### Events

The events that can be subscribed to are as follows (if any):

| Event | Description |
| ----- | ----------- |
| `change` | Fired from `f-tabs` when the selected tab is changed. Payload contains the indices of the `new` and `prev` selected tabs. |


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
# Run Unit / Integration / Contract tests for f-tabs
cd ./fozzie-components/packages/f-tabs
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
# Run Component tests for f-tabs
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components/packages/f-tabs
yarn test-component:chrome
```
## Documentation to be completed once module is in stable state.
