<div align="center">

# f-template-sub-nav

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

SPA with breadcrumb, lefthand navigation and centre slot

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-template-sub-nav.svg)](https://badge.fury.io/js/%40justeat%2Ff-template-sub-nav)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-template-sub-nav/badge.svg)](https://coveralls.io/github/justeat/f-template-sub-nav)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-template-sub-nav/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-template-sub-nav?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-template-sub-nav
```

```sh
npm install @justeat/f-template-sub-nav
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import TemplateSubNav from '@justeat/f-template-sub-nav';
import '@justeat/f-template-sub-nav/dist/f-template-sub-nav.css';

export default {
    components: {
        TemplateSubNav
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `template-sub-nav` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-template-sub-nav/dist/f-template-sub-nav.css';

export default {
    components: {
        // …
        TemplateSubNav: () => import(/* webpackChunkName: "template-sub-nav" */ '@justeat/f-template-sub-nav')
    }
}
```

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-template-sub-nav` package:

```sh
$ cd packages/components/organisms/f-template-sub-nav
```

## Testing

To test all components, run from root directory.
To test only `f-template-sub-nav`, run from the `./fozzie-components/packages/components/organisms/f-template-sub-nav` directory.

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


