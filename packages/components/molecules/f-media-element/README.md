<div align="center">

# f-media-element</h1>

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

provides ability to display text and an image in different orientations

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-media-element.svg)](https://badge.fury.io/js/%40justeat%2Ff-media-element)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-media-element/badge.svg)](https://coveralls.io/github/justeat/f-media-element)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-media-element/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-media-element?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-media-element
```

```sh
npm install @justeat/f-media-element
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import MediaElement from '@justeat/f-media-element';
import '@justeat/f-media-element/dist/f-media-element.css';

export default {
    components: {
        MediaElement
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `media-element` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-media-element/dist/f-media-element.css';

export default {
    components: {
        // …
        MediaElement: () => import(/* webpackChunkName: "media-element" */ '@justeat/f-media-element')
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

Change directory to the `MediaElement` package:

```sh
$ cd packages/components//MediaElement
```

## Testing

### Unit, Integration and Contract

To test all components, run from root directory.
To test only `f-media-element`, run from the `./fozzie-components/packages/f-media-element` directory.

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
# Run Component tests for f-media-element
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components/packages/f-media-element
yarn test-component:chrome
```
## Documentation to be completed once module is in stable state.


