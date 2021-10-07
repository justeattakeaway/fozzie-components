<div align="center">

# f-ie-compatibility

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Banner for Internet Explorer warning users that we no longer support the browser

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-ie-compatibility.svg)](https://badge.fury.io/js/%40justeat%2Ff-ie-compatibility)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-ie-compatibility/badge.svg)](https://coveralls.io/github/justeat/f-ie-compatibility)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-ie-compatibility/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-ie-compatibility?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-ie-compatibility
```

```sh
npm install @justeat/f-ie-compatibility
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import IeCompatibility from '@justeat/f-ie-compatibility';
import '@justeat/f-ie-compatibility/dist/f-ie-compatibility.css';

export default {
    components: {
        IeCompatibility
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `ie-compatibility` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-ie-compatibility/dist/f-ie-compatibility.css';

export default {
    components: {
        // …
        IeCompatibility: () => import(/* webpackChunkName: "ie-compatibility" */ '@justeat/f-ie-compatibility')
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

Change directory to the `f-ie-compatibility` package:

```sh
$ cd packages/components/atoms/f-ie-compatibility
```

## Testing

To test all components, run from root directory.
To test only `f-ie-compatibility`, run from the `./fozzie-components/packages/components/atoms/f-ie-compatibility` directory.

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


