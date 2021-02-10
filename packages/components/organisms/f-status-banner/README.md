<div align="center">

# f-status-banner

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Global status page

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-status-banner.svg)](https://badge.fury.io/js/%40justeat%2Ff-status-banner)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-status-banner/badge.svg)](https://coveralls.io/github/justeat/f-status-banner)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-status-banner/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-status-banner?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-status-banner
```

```sh
npm install @justeat/f-status-banner
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import StatusBanner from '@justeat/f-status-banner';
import '@justeat/f-status-banner/dist/f-status-banner.css';

export default {
    components: {
        StatusBanner
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `status-banner` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-status-banner/dist/f-status-banner.css';

export default {
    components: {
        // …
        StatusBanner: () => import(/* webpackChunkName: "status-banner" */ '@justeat/f-status-banner')
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

Change directory to the `f-status-banner` package:

```sh
$ cd packages/components/organisms/f-status-banner
```

## Testing

### Unit, Integration and Contract

To test all components, run from root directory.
To test only `f-status-banner`, run from the `./fozzie-components/packages/components/organisms/f-status-banner` directory.

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
# Run Component tests for f-status-banner
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components/packages/components/organisms/f-status-banner
yarn test-component:chrome
```
## Documentation to be completed once module is in stable state.


