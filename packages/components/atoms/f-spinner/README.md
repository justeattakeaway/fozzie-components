<div align="center">

# f-spinner

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

loading indicator

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-spinner.svg)](https://badge.fury.io/js/%40justeat%2Ff-spinner)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-spinner/badge.svg)](https://coveralls.io/github/justeat/f-spinner)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-spinner/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-spinner?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-spinner
```

```sh
npm install @justeat/f-spinner
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import VSpinner from '@justeat/f-spinner';
import '@justeat/f-spinner/dist/f-spinner.css';

export default {
    components: {
        VSpinner
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `v-spinner` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-spinner/dist/f-spinner.css';

export default {
    components: {
        // …
        VSpinner: () => import(/* webpackChunkName: "v-spinner" */ '@justeat/f-spinner')
    }
}
```

## Configuration

### Events

The spinner handles the following events:

| Event | Description |
| ----- | ----------- |
| 'stop-spinner' | Hides the spinner and displays the slot component |
| 'start-spinner' | Hides the slot component and runs displays the spinner |

To use these events, use `this.$parent.$emit('start-spinner')` or `this.$parent.$emit('stop-spinner')`.
`f-spinner` cannot handle `this.$emit` as is not possible to access `this.$emit` from a slot.

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-spinner` package:

```sh
$ cd packages/components/atoms/f-spinner
```

## Testing

To test all components, run from root directory.
To test only `f-spinner`, run from the `./fozzie-components/packages/components/atoms/f-spinner` directory.

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


