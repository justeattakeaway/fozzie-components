<div align="center">
  <h1>f-mega-modal</h1>

  <img width="125px" alt="Fozzie Bear" src="../../../../bear.png" />

  <p>A Vue.js modal component</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-mega-modal.svg)](https://badge.fury.io/js/%40justeat%2Ff-mega-modal)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-mega-modal/badge.svg)](https://coveralls.io/github/justeat/f-mega-modal)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-mega-modal/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-mega-modal?targetFile=package.json)

# Usage

## Installation

```sh
yarn add @justeat/f-mega-modal
```

```sh
npm install @justeat/f-mega-modal
```

### Vue Applications

> Styles have to be imported separately.

```js
import MegaModal from '@justeat/f-mega-modal';
import '@justeat/f-mega-modal/dist/f-mega-modal.css';

export default {
    components: {
        MegaModal
    }
}
```

### Webpack

Import the component dynamically to separate the `mega-modal` bundle from the main `bundle.client.js`.

```js
import '@justeat/f-mega-modal/dist/f-mega-modal.css';

export default {
    components: {
        ...
        MegaModal: () => import(/* webpackChunkName: "mega-modal" */ '@justeat/f-mega-modal')
    }
}
```

## Configuration

### Props

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

## Development

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

### Running storybook

From the **root** directory run:

```sh
$ yarn storybook:serve
```

Serve storybook at [http://localhost:6006](http://localhost:6006).
