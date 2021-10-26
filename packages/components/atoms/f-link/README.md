<div align="center">

# f-link

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Fozzie link component

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-link.svg)](https://badge.fury.io/js/%40justeat%2Ff-link)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-link/badge.svg)](https://coveralls.io/github/justeat/f-link)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-link/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-link?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-link
```

```sh
npm install @justeat/f-link
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import VLink from '@justeat/f-link';
import '@justeat/f-link/dist/f-link.css';

export default {
    components: {
        VLink
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `v-link` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-link/dist/f-link.css';

export default {
    components: {
        // …
        VLink: () => import(/* webpackChunkName: "v-link" */ '@justeat/f-link')
    }
}
```

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |
| `href` | `String` | This is a required prop | The URL or path of the link. For a `router-link` this will be mapped to the `to` attribute. |
| `isExternalSite` | `Boolean` | `false` | Sets aria description to 'Opens and external site' or 'Opens and external site in a new window/screen/tab' depending on target of link.|
| `isRouterLink` | `Boolean` | `false` | Determines whether to configure the link as a Vue Router router-link. |
| `isBold` | `Boolean` | `false` | Sets link text to bold. |
| `hasTextDecoration` | `Boolean` | `true` | Adds underline to link text. |
| `isFullWidth` | `Boolean` | `false` | Link set as full width. |
| `noLineBreak` | `Boolean` | `false` | Removes white space. |
| `isDistinct` | `Boolean` | `false` | Changes default link colour (dark grey) to blue. |

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-link` package:

```sh
$ cd packages/components/atoms/f-link
```

## Testing

### Unit, Integration and Contract

To test all components, run from root directory.
To test only `f-link`, run from the `./fozzie-components/packages/components/atoms/f-link` directory.

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
# Run Component tests for f-link
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components/packages/components/atoms/f-link
yarn test-component:chrome
```
## Documentation to be completed once module is in stable state.
