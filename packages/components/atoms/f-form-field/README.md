<div align="center">

# f-form-field

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Fozzie Form Field Component.

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-form-field.svg)](https://badge.fury.io/js/%40justeat%2Ff-form-field)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-form-field/badge.svg)](https://coveralls.io/github/justeat/f-form-field)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-form-field/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-form-field?targetFile=package.json)

---

## Usage

### Installation

Install the module using NPM or Yarn:

```sh
yarn add @justeat/f-form-field
```

```sh
npm install @justeat/f-form-field
```

### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';

export default {
    components: {
        FormField
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `mega-modal` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-form-field/dist/f-form-field.css';

export default {
    components: {
        // …
        FormField: () => import(/* webpackChunkName: "form-field" */ '@justeat/f-form-field')
    }
}
```

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |

### CSS Classes

The modal has its own styles which are scoped to the component using CSS modules to prevent conflicts with existing styles on the page.

In addition to this, the modal exposes some classes which you can target in your application.

The classes that can be defined are as follows (if any):

| Class | Description |
| ----- | ----------- |

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

Change directory to the `f-form-field` package:

```sh
$ cd packages/components/molecules/f-form-field
```

## Testing

### Unit, Integration and Contract

To test all components, run from root directory.
To test only `f-form-field`, run from the `./fozzie-components/packages/f-form-field` directory.

```sh
yarn test
```

### Component Tests

Start Storybook if it is not already running by running the following from the root directory.

```sh
yarn storybook:build
yarn storybook:serve-static
```

* To run _all_ the component tests, run the following from the root directory.
* To run only the `f-form-field` component tests, run the following from the `f-form-field` directory.

```sh
yarn test-component:chrome
```
