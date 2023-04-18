<div align="center">

# f-toggle

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

A component to toggle a single setting on/off.

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-toggle.svg)](https://badge.fury.io/js/%40justeat%2Ff-toggle)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-toggle/badge.svg)](https://coveralls.io/github/justeat/f-toggle)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-toggle/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-toggle?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-toggle
```

```sh
npm install @justeat/f-toggle
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import VToggle from '@justeat/f-toggle';
import '@justeat/f-toggle/dist/f-toggle.css';

export default {
    components: {
        VToggle
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `v-toggle` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-toggle/dist/f-toggle.css';

export default {
    components: {
        // …
        VToggle: () => import(/* webpackChunkName: "v-toggle" */ '@justeat/f-toggle')
    }
}
```

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |
| checked | Boolean | false | Switches the toggle on and off |
| disabled | Boolean | false | Sets the toggle to disabled |
| aria-labelledby | String | '' | The id for an element that will 'label' the toggle |
| aria-describedby | String | '' | The id for an element describing what the toggle will control |
| dir | String | 'ltr' | The reading/writing direction |

### Events

The events that can be subscribed to are as follows (if any):

| Event | Description |
| ----- | ----------- |
| update | Fired when a user changes the state of the toggle. Payload contains the updated value of the toggle. |

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-toggle` package:

```sh
$ cd packages/components/atoms/f-toggle
```

## Testing

To test all components, run from root directory.
To test only `f-toggle`, run from the `./fozzie-components/packages/components/atoms/f-toggle` directory.

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


