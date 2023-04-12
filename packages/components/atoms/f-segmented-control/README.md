<div align="center">

# f-segmented-control

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

TBD

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-segmented-control.svg)](https://badge.fury.io/js/%40justeat%2Ff-segmented-control)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-segmented-control/badge.svg)](https://coveralls.io/github/justeat/f-segmented-control)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-segmented-control/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-segmented-control?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-segmented-control
```

```sh
npm install @justeat/f-segmented-control
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import SegmentedControl from '@justeat/f-segmented-control';
import '@justeat/f-segmented-control/dist/f-segmented-control.css';

export default {
    components: {
        SegmentedControl
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `segmented-control` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-segmented-control/dist/f-segmented-control.css';

export default {
    components: {
        // …
        SegmentedControl: () => import(/* webpackChunkName: "segmented-control" */ '@justeat/f-segmented-control')
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

Change directory to the `f-segmented-control` package:

```sh
$ cd packages/components/atoms/f-segmented-control
```

## Testing

To test all components, run from root directory.
To test only `f-segmented-control`, run from the `./fozzie-components/packages/components/atoms/f-segmented-control` directory.

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


