<div align="center">

# f-account-info

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

The account information page

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-account-info.svg)](https://badge.fury.io/js/%40justeat%2Ff-account-info)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-account-info/badge.svg)](https://coveralls.io/github/justeat/f-account-info)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-account-info/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-account-info?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-account-info
```

```sh
npm install @justeat/f-account-info
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import AccountInfo from '@justeat/f-account-info';
import '@justeat/f-account-info/dist/f-account-info.css';

export default {
    components: {
        AccountInfo
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `account-info` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-account-info/dist/f-account-info.css';

export default {
    components: {
        // …
        AccountInfo: () => import(/* webpackChunkName: "account-info" */ '@justeat/f-account-info')
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

Change directory to the `f-account-info` package:

```sh
$ cd packages/components/pages/f-account-info
```

## Testing

To test all components, run from root directory.
To test only `f-account-info`, run from the `./fozzie-components/packages/components/pages/f-account-info` directory.

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


