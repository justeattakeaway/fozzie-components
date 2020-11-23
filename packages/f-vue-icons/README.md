<div align="center">
<h1>f-vue-icons</h1>

<img width="125" alt="Fozzie Bear" src="../../bear.png" />

<p>Shared Icon Components for Vue.js.</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-vue-icons.svg)](https://badge.fury.io/js/%40justeat%2Ff-vue-icons)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-vue-icons/badge.svg)](https://coveralls.io/github/justeat/f-vue-icons)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-vue-icons/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-vue-icons?targetFile=package.json)

---

## Install

Add the module to your project

```bash
yarn add @justeat/f-vue-icons
```

## Usage

```js
// Only import what you need!
import { AlertIcon, PaymentAmexIcon, ... } from '@justeat/f-vue-icons'
```

Within the context of a Vue app, that will look like:

  ```js
  <template>
      <alert-icon />
      <payment-amex-icon />
  </template>


  <script>
  import { AlertIcon, PaymentAmexIcon, ... } from '@justeat/f-vue-icons';

  export default {
      components: {
          AlertIcon,
          PaymentAmexIcon
      }
  };
  </script>
  ```

## TODO – setup a page with an example of all the icons somewhere – See all icons and usage here: https://f-vue-icons.netlify.com


## Tree shaking

By using ES imports like `import { AlertIcon } from '@justeat/f-vue-icons'` with Webpack v4 or Rollup, unused exports in this module will be automatically eliminated.

If you can't use a tree-shaking compatible build tool, then you can use the per-file icons from [`icons`](https://unpkg.com/@justeat/f-vue-icons/icons/) directory, e.g. `import AlertIcon from '@justeat/f-vue-icons/icons/AlertIcon'`.


### Browser Support

The component extends [@justeat/browserslist-config-fozzie](https://github.com/justeat/browserslist-config-fozzie) package for the list of browsers to support.


### Building the Module

Run `yarn build` to compile the module.

### Running the Tests

Run `yarn test` to run the tests.


## Credits

This package was heavily inspired by the excellent [`vue-feather-icons`](https://github.com/egoist/vue-feather-icons) package.
