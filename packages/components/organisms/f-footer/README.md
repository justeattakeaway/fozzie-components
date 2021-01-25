<div align="center">

# f-footer

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Global Footer Component for Vue.js.

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-footer.svg)](https://badge.fury.io/js/%40justeat%2Ff-footer)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-footer/badge.svg)](https://coveralls.io/github/justeat/f-footer)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-footer/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-footer?targetFile=package.json)

---

## Usage

### Installation

Install the module using NPM or Yarn:

```sh
yarn add @justeat/f-footer
```

```sh
npm install @justeat/f-footer
```

### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```sh
import VueFooter from '@justeat/f-footer';
import '@justeat/f-footer/dist/f-footer.css';

export default {
    components: {
        VueFooter
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `mega-modal` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-footer/dist/f-footer.css';

export default {
    components: {
      // …
        VueFooter: () => import(/* webpackChunkName: "vue-footer" */ '@justeat/f-footer')
    }
}
```

    - If there is a vue-i18n plugin in the project, footer component can be called without any props:

    `<vue-footer />`

    - Or you can pass locale as a property to specify the tenant:

    `<vue-footer
        locale="en-GB" />`

1. Browser Support

    This component extends [@justeat/browserslist-config-fozzie](https://github.com/justeat/browserslist-config-fozzie).

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

Change directory to the `f-footer` package:

```sh
$ cd packages/components/molecules/f-footer
```

## Testing

### Unit, Integration and Contract

To test all components, run from root directory.
To test only `f-footer`, run from the `./fozzie-components/packages/f-footer` directory.

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
* To run only the `f-footer` component tests, run the following from the `f-footer` directory.

```sh
yarn test-component:chrome
```
