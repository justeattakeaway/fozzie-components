<div align="center">

# f-navigation-links

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

A component to display a collection of supplied links

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-navigation-links.svg)](https://badge.fury.io/js/%40justeat%2Ff-navigation-links)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-navigation-links/badge.svg)](https://coveralls.io/github/justeat/f-navigation-links)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-navigation-links/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-navigation-links?targetFile=package.json)

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
      Id: 'link1',            // Test Data Id
      url: '/account/info',   // Url
      name: 'Your account',   // Text Label
      selected: false         // Indicates if the currently selected item
  },
  {
      Id: 'link2',
      url: '/order-history',
      name: 'Your orders',
      selected: true
  }
]
 ```

### Events

The events that can be subscribed to are as follows (if any):

| Event | Description |
| ----- | ----------- |
None

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


