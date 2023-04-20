<div align="center">

# f-switch

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

A component to switch a single setting on/off.

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-switch.svg)](https://badge.fury.io/js/%40justeat%2Ff-switch)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-switch/badge.svg)](https://coveralls.io/github/justeat/f-switch)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-switch/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-switch?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-switch
```

```sh
npm install @justeat/f-switch
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import FSwitch from '@justeat/f-switch';
import '@justeat/f-switch/dist/f-switch.css';

export default {
    components: {
        FSwitch
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `v-switch` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-switch/dist/f-switch.css';

export default {
    components: {
        // …
        FSwitch: () => import(/* webpackChunkName: "v-switch" */ '@justeat/f-switch')
    }
}
```

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |
| checked | Boolean | false | Switch the switch on and off |
| disabled | Boolean | false | Sets the switch to disabled |
| aria-labelledby | String | '' | The id for an element that will 'label' the switch |
| aria-describedby | String | '' | The id for an element describing what the switch will control |
| dir | String | 'ltr' | The reading/writing direction |

### Events

The events that can be subscribed to are as follows (if any):

| Event | Description |
| ----- | ----------- |
| update | Fired when a user changes the state of the switch. Payload contains the updated value of the switch. |

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-switch` package:

```sh
$ cd packages/components/atoms/f-switch
```

## Testing

To test all components, run from root directory.
To test only `f-switch`, run from the `./fozzie-components/packages/components/atoms/f-switch` directory.

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


