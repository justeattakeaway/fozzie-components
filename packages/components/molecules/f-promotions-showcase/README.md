<div align="center">

# f-promotions-showcase

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

A place for promotional messages to be displayed

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-promotions-showcase.svg)](https://badge.fury.io/js/%40justeat%2Ff-promotions-showcase)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-promotions-showcase/badge.svg)](https://coveralls.io/github/justeat/f-promotions-showcase)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-promotions-showcase/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-promotions-showcase?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-promotions-showcase
```

```sh
npm install @justeat/f-promotions-showcase
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import PromotionsShowcase from '@justeat/f-promotions-showcase';
import '@justeat/f-promotions-showcase/dist/f-promotions-showcase.css';

export default {
    components: {
        PromotionsShowcase
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `promotions-showcase` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-promotions-showcase/dist/f-promotions-showcase.css';

export default {
    components: {
        // …
        PromotionsShowcase: () => import(/* webpackChunkName: "promotions-showcase" */ '@justeat/f-promotions-showcase')
    }
}
```

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop    | Type  | Default | Description                 |
| ------- | ----- | ------- | --------------------------- |
| `items` | Array | []      | Array of items that specify what promotional messaging is shown within the component. The component is currently designed to take a maximum of 2 items. The form of an item is as follows below |

#### Items

An item within the `items` prop has the following expected form:

```javascript
{
  illustration: VueComponent, // optional - Vue component definition object or one created through Vue.extend()
  title: String, // required - title to be displayed for the item
  lines: [ // required - array where elements are either:
    'an example line', // strings (given default text styling)
    { // objects - with the styling for that line specified using one of the exported constants
      text: 'another example line',
      style: STYLE_LINK
    }
  ],
  link: { // optional - Depending on config causes the item to be rendered as an `<a>` or a `<button>`. If specified can be a Function (called on click), text (interpreted as a URL) or object specifying link attribute values like so:
    href: '/im-a-link', // required
    rel: 'noowner',
    target: '_blank'
  }
}
```

### Events

No events are as yet emitted by the component

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-promotions-showcase` package:

```sh
$ cd packages/components/molecules/f-promotions-showcase
```

## Testing

To test all components, run from root directory.
To test only `f-promotions-showcase`, run from the `./fozzie-components/packages/components/molecules/f-promotions-showcase` directory.

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
## Documentation to be completed once module is in stable state.


