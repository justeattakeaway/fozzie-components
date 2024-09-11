<div align="center">

# f-toggle-switch

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

A component to switch a single setting on/off.

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-toggle-switch.svg)](https://badge.fury.io/js/%40justeat%2Ff-toggle-switch)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-toggle-switch/badge.svg)](https://coveralls.io/github/justeat/f-toggle-switch)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-toggle-switch
```

```sh
npm install @justeat/f-toggle-switch
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import ToggleSwitch from '@justeat/f-toggle-switch';
import '@justeat/f-toggle-switch/dist/f-toggle-switch.css';

export default {
    components: {
        ToggleSwitch
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `toggle-switch` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-toggle-switch/dist/f-toggle-switch.css';

export default {
    components: {
        // …
        ToggleSwitch: () => import(/* webpackChunkName: "toggle-switch" */ '@justeat/f-toggle-switch')
    }
}
```

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |
| checked | Boolean | false | Toggles the toggle-switch on and off |
| disabled | Boolean | false | Sets the toggle-switch to disabled |
| aria-labelledby | String | '' | The id for an element that will 'label' the toggle-switch |
| aria-describedby | String | '' | The id for an element describing what the toggle-switch will control |
| dir | String | 'ltr' | The reading/writing direction |

### Events

The events that can be subscribed to are as follows (if any):

| Event | Description |
| ----- | ----------- |
| update | Fired when a user changes the state of the toggle-switch. Payload contains the updated value of the toggle-switch. |

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-toggle-switch` package:

```sh
$ cd packages/components/atoms/f-toggle-switch
```

## Testing

To test all components, run from root directory.
To test only `f-toggle-switch`, run from the `./fozzie-components/packages/components/atoms/f-toggle-switch` directory.

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


