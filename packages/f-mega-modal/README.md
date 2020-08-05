
<div align="center">
  <h1>f-mega-modal</h1>

  <img width="125" alt="Fozzie Bear" src="../../bear.png" />

  <p>A Vue.js modal component</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-mega-modal.svg)](https://badge.fury.io/js/%40justeat%2Ff-mega-modal)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg&circle-token=4c77c1990b98c8e06e01b497bc80f376346f609d)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-mega-modal/badge.svg)](https://coveralls.io/github/justeat/f-mega-modal)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-mega-modal/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-mega-modal?targetFile=package.json)


## Usage

#### Installation

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

The following props can be used to configure the component:

### `is-open`

Type: `Boolean`

Default: `false`

Sets the modal to open or closed state.

### `is-narrow`

Type: `Boolean`

Default: `false`

Use the narrow visual style.

### `is-wide`

Type: `Boolean`

Default: `false`

Use the wide visual style.

### `is-flush`

Type: `Boolean`

Default: `false`

Removes passing around the modal content.

### `is-full-height`

Type: `Boolean`

Default: `false`

Sets the modal content to full height of the screen

### `is-scrollable`

Type: `Boolean`

Default: `false`

Makes the modal content scrollable.

> Note this only applies to small screen devices.

### `is-close-fixed`

Type: `Boolean`

Default: `false`

Sets the modal close button position to `fixed`

### `is-close-rounded`

Type: `Boolean`

Default: `false`

Sets the modal close button to display in a rounded style.

### `has-overlay`

Type: `Boolean`

Default: `true`

Controls whether or not to display an overlay behind the modal.

### `has-close-button`

Type: `Boolean`

Default: `true`

Controls whether or not to display the modal close button.

### `close-on-blur`

Type: `Boolean`

Default: `true`

Controls whether or not to close the modal when the user clicks outside of the modal.

### `close-button-copy`

Type: `String`

Default: `Close modal`

Sets the hidden text value for the close button which is used by screen-readers.

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

