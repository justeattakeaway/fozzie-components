<div align="center">

# f-self-exclusion

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Customers must be able to voluntarily self-exclude or nominate themselves for self exclusion for a specified time period or permanently (includes purchasing and marketing), and their account (associated to the email address or phone number provided during self exclusions) must be blocked from purchasing alcohol and other items.

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-self-exclusion.svg)](https://badge.fury.io/js/%40justeat%2Ff-self-exclusion)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-self-exclusion/badge.svg)](https://coveralls.io/github/justeat/f-self-exclusion)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-self-exclusion
```

```sh
npm install @justeat/f-self-exclusion
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import SelfExclusion from '@justeat/f-self-exclusion';
import '@justeat/f-self-exclusion/dist/f-self-exclusion.css';

export default {
    components: {
        SelfExclusion
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `self-exclusion` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-self-exclusion/dist/f-self-exclusion.css';

export default {
    components: {
        // …
        SelfExclusion: () => import(/* webpackChunkName: "self-exclusion" */ '@justeat/f-self-exclusion')
    }
}
```

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop                    | Type    | Default | Description                                                                   |
|-------------------------|---------|---------|-------------------------------------------------------------------------------|
| locale                  | String  | en-AU   | -----------                                                                   |
| authToken               | String  | ------- | the users authorisation token                                                 |
| smartGatewayBaseUrl     | String  | ------- | the smartgateway host                                                         |
| showUnsavedChangesAlert | Boolean | false   | property that controls showing of an alert when user navigates away from page |
| privacyPolicyUrl        | String  | null    | url to privacy policy page                                                    |

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

Change directory to the `f-self-exclusion` package:

```sh
$ cd packages/components/pages/f-self-exclusion
```

## Testing

To test all components, run from root directory.
To test only `f-self-exclusion`, run from the `./fozzie-components/packages/components/pages/f-self-exclusion` directory.

### Unit and Integration tests

```sh
yarn test
```

### Component and Accessibility Tests

```bash
# Note: Ensure Storybook is running when running the following commands
cd ./fozzie-components

yarn storybook:build
yarn storybook:serve-static
```

yarn test-component:chrome
```
### Accessibility tests
```bash
yarn test-a11y:chrome
```
## Documentation to be completed once module is in stable state.


