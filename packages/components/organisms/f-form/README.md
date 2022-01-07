<div align="center">

# f-form

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

fozzie form

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-form.svg)](https://badge.fury.io/js/%40justeat%2Ff-form)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-form/badge.svg)](https://coveralls.io/github/justeat/f-form)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-form/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-form?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-form
```

```sh
npm install @justeat/f-form
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import VForm from '@justeat/f-form';
import '@justeat/f-form/dist/f-form.css';

export default {
    components: {
        VForm
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `v-form` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-form/dist/f-form.css';

export default {
    components: {
        // …
        VForm: () => import(/* webpackChunkName: "v-form" */ '@justeat/f-form')
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

Change directory to the `f-form` package:

```sh
$ cd packages/components/organisms/f-form
```

## Testing

To test all components, run from root directory.
To test only `f-form`, run from the `./fozzie-components/packages/components/organisms/f-form` directory.

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


