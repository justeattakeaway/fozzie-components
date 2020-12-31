
<div align="center">
  <h1>f-mega-modal</h1>

  <img width="125" alt="Fozzie Bear" src="../../bear.png" />

  <p>A Vue.js modal component</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-mega-modal.svg)](https://badge.fury.io/js/%40justeat%2Ff-mega-modal)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-mega-modal/badge.svg)](https://coveralls.io/github/justeat/f-mega-modal)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-mega-modal/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-mega-modal?targetFile=package.json)


## Usage

### Installation

This package can be installed using npm or yarn:

```sh
yarn add @justeat/f-mega-modal
```

```sh
npm install @justeat/f-mega-modal
```

### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import MegaModal from '@justeat/f-mega-modal';
import '@justeat/f-mega-modal/dist/f-mega-modal.css';

export default {
    components: {
        MegaModal
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `mega-modal` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-mega-modal/dist/f-mega-modal.css';

export default {
    components: {
        ...
        MegaModal: () => import(/* webpackChunkName: "mega-modal" */ '@justeat/f-mega-modal')
    }
}

```

### Non-Vue Applications

This module can be ran as a micro front-end for applications that don't make use of the Vue framework.

The following rudimentary example can be used as a guide for implementing this component in an existing static application:

```html
<!doctype html>
<html lang="en">
<head>
    <title>Mega Modal Example</title>
    <link rel="stylesheet" href="https://unpkg.com/@justeat/f-mega-modal/dist/f-mega-modal.css">
</head>
<body>
    <div data-app>
        <mega-modal is-open>
          <p>Modal content</p>
        </mega-modal>
    </div>
    <script src="https://unpkg.com/vue@2.6.11/dist/vue.js"></script>
    <script src="https://unpkg.com/@justeat/f-mega-modal/dist/f-mega-modal.umd.min.js"></script>
    <script>
        (function() {
            if (typeof Vue === 'undefined') return null;

            Vue.config.devtools = false;
            Vue.config.productionTip = false;

            return new Vue({
                el: '[data-app]'
            });
    	})();
    </script>
</body>
</html>
```

## Configuration

### Props

`f-mega-modal` has a number of props that allow you to customise its functionality.

The props that can be defined are as follows:

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |
| `is-open` | `Boolean` | `false` | Sets the modal to open or closed state. |
| `is-narrow` | `Boolean` | `false` | Use the narrow visual style. |
| `is-wide` | `Boolean` | `false` | Use the wide visual style. |
| `is-flush` | `Boolean` | `false` | Removes passing around the modal content. |
| `is-full-height` | `Boolean` | `false` | Sets the modal content to full height of the screen.<br/><br/><blockquote>Note this only applies to small screen devices.</blockquote> |
| `is-scrollable` | `Boolean` | `false` | Makes the modal content scrollable. |
| `is-close-fixed` | `Boolean` | `false` | Sets the modal close button position to `fixed`. |
| `is-close-rounded` | `Boolean` | `false` | Sets the modal close button to display in a rounded style. |
| `has-overlay` | `Boolean` | `true` | Controls whether or not to display an overlay behind the modal. |
| `has-close-button` | `Boolean` | `true` | Controls whether or not to display the modal close button. |
| `close-on-blur` | `Boolean` | `true` | Controls whether or not to close the modal when the user clicks outside of the modal. |
| `close-button-copy` | `String` | `"Close modal"` | Sets the hidden text value for the close button which is used by screen-readers. |

### CSS Classes

The modal has its own styles which are scoped to the component using CSS modules to prevent conflicts with existing styles on the page.

In addition to this, the modal exposes some classes which you can target in your application.

| Class | Description |
| ----- | ----------- |
| `c-megaModal` | Can be used to target the modal wrapper element. |
| `c-megaModal-content` | Can be used to target the modal content element. |
| `c-megaModal-content--visible` | Can be used to target the modal content element when it is visible. |
| `c-megaModal-document` | Can be used to target the modal document element. |
| `c-megaModal-document--scrollable` | Can be used to target the modal document element when it is scrollable. |
| `c-megaModal-closeBtn` | Can be used to target the modal close button element. |

### Events

| Event | Description |
| ----- | ----------- |
| `open` | This event is emitted when the modal is opened. |
| `close` | This event is emitted when the modal is closed. |

You can add event listeners for these like so

```js
<template>
  <mega-modal
    @open="onModalOpen"
    @close="onModalClose">
    <p>Modal content</p>
  </mega-modal>
</template>

<script>
export default {
  methods: {
    onModalOpen () {
      // Do stuff here
    },

    onModalClose () {
      // Do stuff here
    }
  }
}
</script>
```

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-mega-modal` package:

```sh
$ cd packages/f-mega-modal
```

### Running storybook

Storybook can be used to develop new and existing components.

To start storybook:

> Please ensure you are in the f-mega-modal directory as outlined in the above instructions.

```sh
# cd to the storybook package
$ cd ../storybook

# Run storybook
$ yarn storybook:serve
```

This will build and serve storybook at [http://localhost:6006](http://localhost:6006).

