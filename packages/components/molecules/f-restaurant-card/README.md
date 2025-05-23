<div align="center">

# f-restaurant-card

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

 Responsible for displaying restaurant data and linking to a restaurant

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-restaurant-card.svg)](https://badge.fury.io/js/%40justeat%2Ff-restaurant-card)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-restaurant-card/badge.svg)](https://coveralls.io/github/justeat/f-restaurant-card)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-restaurant-card
```

```sh
npm install @justeat/f-restaurant-card
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import RestaurantCard from '@justeat/f-restaurant-card';
import '@justeat/f-restaurant-card/dist/f-restaurant-card.css';

export default {
    components: {
        RestaurantCard
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `restaurant-card` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-restaurant-card/dist/f-restaurant-card.css';

export default {
    components: {
        // …
        RestaurantCard: () => import(/* webpackChunkName: "restaurant-card" */ '@justeat/f-restaurant-card')
    }
}
```

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |

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

Change directory to the `f-restaurant-card` package:

```sh
$ cd packages/components/molecules/f-restaurant-card
```

## Testing

To test all components, run from root directory.
To test only `f-restaurant-card`, run from the `./fozzie-components/packages/components/molecules/f-restaurant-card` directory.

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


