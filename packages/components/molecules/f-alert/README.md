
<div align="center">
  <h1>f-alert</h1>

  <img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

  <p>Fozzie Alert Component</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-alert.svg)](https://badge.fury.io/js/%40justeat%2Ff-alert)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)

## Usage

### Installation

This package can be installed using npm or yarn:

```sh
yarn add @justeat/f-alert
```

```sh
npm install @justeat/f-alert
```

The package also has dependencies that need to be installed by consuming components/applications:

| Dependency | Command to install | Styles to include |
| ----- | ----- | ----- |
| f-button | `yarn add @justeat/f-button` | `import '@justeat/f-button/dist/f-button.css';` |

### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import FAlert from '@justeat/f-alert';
import '@justeat/f-alert/dist/f-alert.css';

export default {
    components: {
        FAlert
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `f-alert` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-alert/dist/f-alert.css';

export default {
    components: {
        ...
        FAlert: () => import(/* webpackChunkName: "f-alert" */ '@justeat/f-alert')
    }
}

```

## Configuration

### Props

`f-alert` has a number of props that allow you to customise its functionality.

The props that can be defined are as follows:

| Prop  | Type  | Required | Default | Description |
| ----- | ----- | -------- |------- | ----------- |
| `locale` | `String` | No |`` | Sets locale for I18n. |
| `type` | `String` | Yes |`success` | Sets the modifier theme for styling. Options:  `success`, `warning`, `info`, `danger`. |
| `heading` | `String` | Yes |`` | The title text of the alert |
| `isDismissible` | `Boolean` | No |  `false` | Controls whether or not to display the alert close button. |

### CSS Classes

`f-alert` has its own styles which are scoped to the component using CSS modules to prevent conflicts with existing styles on the page.

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-alert` package:

```sh
$ cd packages/components/molecules/f-alert
```

### Running storybook

Storybook can be used to develop new and existing components.

To start storybook:

> Please ensure you are in the f-alert directory as outlined in the above instructions.

```sh
# cd to the storybook package
$ cd ../../../storybook

# Run storybook
$ yarn storybook:serve
```

This will build and serve storybook at [http://localhost:8080](http://localhost:8080).
