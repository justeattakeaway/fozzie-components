<div align="center">

# f-footer

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Global Footer Component for Vue.js.

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-footer.svg)](https://badge.fury.io/js/%40justeat%2Ff-footer)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-footer/badge.svg)](https://coveralls.io/github/justeat/f-footer)

---

## Usage

### Installation

Install the module using npm or Yarn:

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

If you are using Webpack, you can import the component dynamically to separate the `f-footer` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-footer/dist/f-footer.css';

export default {
    components: {
      // …
        VueFooter: () => import(/* webpackChunkName: "vue-footer" */ '@justeat/f-footer')
    }
}
```


- If there's a vue-i18n plugin in the project, footer component can be called without any props:

```Vue
<vue-footer />
```

- Or you can pass locale as a property to specify the tenant:

```Vue
    <vue-footer locale="en-GB" />
```

1. Browser Support

    This component extends [@justeat/browserslist-config-fozzie](https://github.com/justeat/browserslist-config-fozzie).

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop                  | Type     | Default | Description                                                                                                   |
| --------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `locale`              | `String` | `''`    | Should be passed if [vue-i18n](https://kazupon.github.io/vue-i18n/) plugin not used by consuming application. |
| `showCourierLinks`    | `Bool`   | `true`  | Controls whether to show courier links in footer.                                                             |
| `showCountrySelector` | `Bool`   | `true`  | Controls whether to show country selector in footer.                                                          |
| `content`             | `Object` | `{}`    | Content to be displayed in the footer (sections, links, etc.)                                                 |
| `globalTrackingContexts` | `Array` | `[]`  | Array containing the global tracking contexts to be passed through to f-trak. |

### CSS Classes

The footer has its own styles which are scoped to the component using CSS modules to prevent conflicts with existing styles on the page.

In addition to this, the footer exposes some classes which you can target in your application.

| Class | Description |
| ----- | ----------- |
| `c-footer-row-linkLists` | Can be used to target the footer with the list of links |
| `c-footer-row-partnerLinks` | Can be used to target the footer's links for curiers and partners |
| `c-footer-row-socialLinks` | Can be used to target the footer's links for our apps and social media links |

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
To test only `f-footer`, run from the `./packages/components/organisms/f-footer` directory.

```sh
yarn test
```

### Component Tests
```bash
# Run Component tests for all components
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components

yarn storybook:build
yarn storybook:serve-static
yarn test-component:chrome
```

OR

```bash
# Run Component tests for f-footer
# Note: Ensure Storybook is not running when running the following commands
cd ./packages/components/organisms/f-footer
yarn test-component:chrome
```
