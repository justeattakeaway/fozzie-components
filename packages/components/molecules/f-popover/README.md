<div align="center">

# f-popover

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

recieves content to render as a popover

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-popover.svg)](https://badge.fury.io/js/%40justeat%2Ff-popover)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-popover/badge.svg)](https://coveralls.io/github/justeat/f-popover)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-popover/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-popover?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-popover
```

```sh
npm install @justeat/f-popover
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import VPopover from '@justeat/f-popover';
import '@justeat/f-popover/dist/f-popover.css';

export default {
    components: {
        VPopover
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `v-popover` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-popover/dist/f-popover.css';

export default {
    components: {
        // …
        VPopover: () => import(/* webpackChunkName: "v-popover" */ '@justeat/f-popover')
    }
}
```

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |

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

Change directory to the `f-popover` package:

```sh
$ cd packages/components/molecules/f-popover
```

## Testing

### Unit, Integration and Contract

To test all components, run from root directory.
To test only `f-popover`, run from the `./fozzie-components/packages/components/molecules/f-popover` directory.

```sh
yarn test
```

### Component Tests

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
# Run Component tests for f-popover
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components/packages/components/molecules/f-popover
yarn test-component:chrome
```
## Documentation to be completed once module is in stable state.


