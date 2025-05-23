<div align="center">

# f-navigation-links

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

A component to display a collection of supplied links

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-navigation-links.svg)](https://badge.fury.io/js/%40justeat%2Ff-navigation-links)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-navigation-links/badge.svg)](https://coveralls.io/github/justeat/f-navigation-links)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-navigation-links
```

```sh
npm install @justeat/f-navigation-links
```

### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import NavigationLinks from '@justeat/f-navigation-links';
import '@justeat/f-navigation-links/dist/f-navigation-links.css';

export default {
    components: {
        NavigationLinks
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `navigation-links` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-navigation-links/dist/f-navigation-links.css';

export default {
    components: {
        // …
        NavigationLinks: () => import(/* webpackChunkName: "navigation-links" */ '@justeat/f-navigation-links')
    }
}
```

The package also has dependencies that need to be installed by consuming components/applications:

| Dependency | Command to install | Styles to include |
| ----- | ----- | ----- |
| f-link | `yarn add @justeat/f-link` | `import '@justeat/f-link/dist/f-link.css';` |

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop  | Type  | Default | Required | Description |
| ----- | ----- | ------- | ----- | ----------- |
| links | array | [] | true | An array of links objects (_see example below_) |

```js
[
  {
      id: 'accountNavLinkInfo'  // Test Data Id
      to: '/account/info',      // `to` attribute will cause <f-link> to render a route-link component
      name: 'Your account',     // Text Label
      selected: false           // Indicates if the currently selected item
  },
  {
      id: 'accountNavLinkOrderHistory',
      href: '/order-history',   // `href` attribute will cause <f-link> to render an anchor link
      name: 'Your orders',
      selected: true
  }
]
 ```

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-navigation-links` package:

```sh
$ cd packages/components/molecules/f-navigation-links
```

## Testing

To test all components, run from root directory.
To test only `f-navigation-links`, run from the `./fozzie-components/packages/components/molecules/f-navigation-links` directory.

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


