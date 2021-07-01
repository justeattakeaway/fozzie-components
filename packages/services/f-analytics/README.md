<div align="center">

# f-analytics

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Encapsulates the GTM / Google Analytics functionality

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-analytics.svg)](https://badge.fury.io/js/%40justeat%2Ff-analytics)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-analytics/badge.svg)](https://coveralls.io/github/justeat/f-analytics)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-analytics/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-analytics?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-analytics
```

```sh
npm install @justeat/f-analytics
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import Analytics from '@justeat/f-analytics';
import '@justeat/f-analytics/dist/f-analytics.css';

export default {
    components: {
        Analytics
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `analytics` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-analytics/dist/f-analytics.css';

export default {
    components: {
        Analytics: () => import(/* webpackChunkName: "analytics" */ '@justeat/f-analytics')
    }
}
```
</br>

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
</br>

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-analytics` package:

```sh
$ cd packages/services/f-analytics
```
</br>

## Testing

To test all components, run from root directory.
To test only `f-analytics`, run from the `./fozzie-components/packages/services/f-analytics` directory.

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
</br>

## Documentation to be completed once module is in stable state.
