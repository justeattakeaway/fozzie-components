<div align="center">

# f-<%= name.default %></h1>

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

<%= description %>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-<%= name.default %>.svg)](https://badge.fury.io/js/%40justeat%2Ff-<%= name.default %>)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-<%= name.default %>/badge.svg)](https://coveralls.io/github/justeat/f-<%= name.default %>)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-<%= name.default %>/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-<%= name.default %>?targetFile=package.json)

---

## Usage

### Installation

Install the module using NPM or Yarn:

```sh
yarn add @justeat/f-<%= name.default %>
```

```sh
npm install @justeat/f-<%= name.default %>
```

### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import <%= name.component %> from '@justeat/f-<%= name.default %>';
import '@justeat/f-<%= name.default %>/dist/f-<%= name.default %>.css';

export default {
    components: {
        <%= name.component %>
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `<%= name.template%>` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-<%= name.default %>/dist/f-<%= name.default %>.css';

export default {
    components: {
        // …
        <%= name.component %>: () => import(/* webpackChunkName: "<%= name.template%>" */ '@justeat/f-<%= name.default %>')
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

The `<%= name.template%>` has its own styles which are scoped to the component using CSS modules to prevent conflicts with existing styles on the page.

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

Change directory to the `f-<%= name.default %>` package:

```sh
$ cd packages/components/molecules/`f-<%= name.default %>`
```

## Testing

### Unit, Integration and Contract

* To test all components, run from root directory.
* To test only `f-<%= name.default %>`, run from the `./fozzie-components/packages/f-<%= name.default %>` directory.

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
* To run only the `f-<%= name.default %>` component tests, run the following from the `f-form-field` directory.

```sh
yarn test-component:chrome
```
