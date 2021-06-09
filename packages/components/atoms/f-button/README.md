
<div align="center">
  <h1>f-button</h1>

  <img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

  <p>The generic button component</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-button.svg)](https://badge.fury.io/js/%40justeat%2Ff-button)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-button/badge.svg)](https://coveralls.io/github/justeat/f-button)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-button/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-button?targetFile=package.json)


## Usage

### Installation

This package can be installed using npm or yarn:

```sh
yarn add @justeat/f-button
```

```sh
npm install @justeat/f-button
```

### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):


```js
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';

export default {
    components: {
        FButton
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `f-button` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-button/dist/f-button.css';

export default {
    components: {
        ...
        FButton: () => import(/* webpackChunkName: "f-button" */ '@justeat/f-button')
    }
}

```

Call the component in your template:

```js
<f-button buttonType="secondary" buttonSize="small">Button Text</f-button>

<f-button buttonType="secondary" buttonSize="small" isIcon="true"><my-icon /><f-button>
```

## Configuration

If the `f-button` component has an `href` attribute set, it will automatically change the markup of this component to be an `<a>` tag, while still visually looking like a button component. If no `href` is set, it will render a `<button>` tag.

When `to` attribute is set, it uses Vue Router `router-link` component, this helps solve the issue with App router links reloading the page upon navigation. Note for it to work properly, it is required for the host project to have `vue-router` installed and set.

### Props

`f-button` has a number of props that allow you to customise its functionality.

The props that can be defined are as follows:

| Prop          | Type       | Required   | Default  | Description |
| :---          | :---:      | :---:      | :---:    | :---        |
| `actionType`  | `String`   | No         | `button` | Sets the action button type.<br>Options: `button`, `submit`, `reset`. |
| `buttonType`  | `String`   | No         | `primary`| Sets the modifier theme for styling.<br>Options: `primary`, `secondary`, `outline`, `ghost`, `link`. |
| `buttonSize`  | `String`   | No         | `medium` | Sets the button size.<br>Options: `large`, `medium`, `small`, `xsmall`. |
| `isFullWidth` | `Boolean`  | No         | `false`  | Controls whether or not to apply `fullWidth` modifier class |
| `isIcon`      | `Boolean`  | No         | `false`  | When true, changes the button style to be displayed as an Icon Button (Icon, with no text). |
| `isLoading`   | `Boolean`  | No         | `false`  | When true, replaces the text with a loading spinner, and it prevents any further interaction with the button (e.g. `click`). |
| `href`        | `String`   | No         | `null`   | When set, generated markup is Anchor element e.g. <a> |
| `to`          | `String`   | No         | `null`   | When set, generated markup is Anchor element e.g. <a>. Additionally it allows to work with host App defined routes. |

### CSS Classes

`f-button` has its own styles which are scoped to the component using CSS modules to prevent conflicts with existing styles on the page.

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-button` package:

```sh
$ cd packages/components/atoms/f-button
```

### Running storybook

Storybook can be used to develop new and existing components.

To start storybook:

> Please ensure you are in the f-button directory as outlined in the above instructions.

```sh
# cd to the storybook package
$ cd ../../../storybook

# Run storybook
$ yarn storybook:serve
```

This will build and serve storybook at [http://localhost:8080](http://localhost:8080).
