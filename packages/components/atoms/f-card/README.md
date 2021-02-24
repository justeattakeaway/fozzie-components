<div align="center">
  <h1>f-card</h1>

  <img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

  <p>Card Component – Used for providing wrapper card styling to an element (or group of elements).</p>
</div>


---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-card.svg)](https://badge.fury.io/js/%40justeat%2Ff-card)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-card/badge.svg)](https://coveralls.io/github/justeat/f-card)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-card/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-card?targetFile=package.json)


## Usage

### Installation

This package can be installed using npm or yarn:

```sh
yarn add @justeat/f-card
```

```sh
npm install @justeat/f-card
```

### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import CardComponent from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';

export default {
    components: {
        CardComponent
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `f-card` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-card/dist/f-card.css';

export default {
    components: {
        ...
        CardComponent: () => import(/* webpackChunkName: "vue-card" */ '@justeat/f-card')
    }
}

```

## Props

`f-card` has a number of props that allow you to customise its functionality.

The props that can be defined are as follows:

| Prop                      | Type       | Required   | Default | Description |
| :---                      | :---:      | :---:      | :---:   | :---        |
| `cardHeadingPosition`     | `String`   |  No        | `left`  | Sets the text alignment of the card component's heading.<br><br>When set to `left` the heading will aligned to the left.<br>When set to `center` the heading will be centrally aligned.<br>When set to `right` the heading will be aligned to the right. |
| `cardHeading`             | `String`   |  No        | `''`    | When set, will add a heading to the top of the card component. |
| `hasOutline`              | `Boolean`  |  No        | `false` | When set to `true`, an outline is applied to the card component.  |
| `isPageContentWrapper`    | `Boolean`  |  No        | `false` | When set to `true`, applies styles to make the card act like a page content wrapper.<br><br>The card will be full width on narrow devices, and then a fixed width above a certain breakpoint width (about 480px), when the card will be centred on the page. |
| `isRounded`               | `Boolean`  |  No        | `false` | When set to `true`, rounded corners are applied to the card component. |

### CSS Classes

`f-card` has its own styles which are scoped to the component using CSS modules to prevent conflicts with existing styles on the page.

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-card` package:

```sh
$ cd packages/components/atoms/f-card
```

### Running storybook

Storybook can be used to develop new and existing components.

To start storybook:

> Please ensure you are in the f-card directory as outlined in the above instructions.

```sh
# cd to the storybook package
$ cd ../../../storybook

# Run storybook
$ yarn storybook:serve
```

This will build and serve storybook at [http://localhost:8080](http://localhost:8080).
