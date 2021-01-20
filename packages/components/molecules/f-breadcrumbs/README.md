
<div align="center">
  <h1>f-bread-crumbs</h1>

  <img width="125" alt="Fozzie Bear" src="../../bear.png" />

  <p>Provides clickable paths back to previous pages</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-bread-crumbs.svg)](https://badge.fury.io/js/%40justeat%2Ff-bread-crumbs)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-bread-crumbs/badge.svg)](https://coveralls.io/github/justeat/f-bread-crumbs)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-bread-crumbs/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-bread-crumbs?targetFile=package.json)


## Usage

1.  Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/f-breadcrumbs
    ```

    ```bash
    npm install @justeat/f-breadcrumbs
    ```

2.  Import the component

    You can import it in your Vue SFC like this (please note that styles have to be imported separately):

    ```
    import BreadCrumbs from '@justeat/f-bread-crumbs';
    import '@justeat/f-bread-crumbs/dist/f-bread-crumbs.css';

    export default {
        components: {
            BreadCrumbs
        }
    }
    ```

    If you are using Webpack, you can import the component dynamically to separate the `bread-crumbs` bundle from the main `bundle.client.js`:

    ```
    import '@justeat/f-bread-crumbs/dist/f-bread-crumbs.css';

    export default {
        components: {
            ...
            BreadCrumbs: () => import(/* webpackChunkName: "bread-crumbs" */ '@justeat/f-bread-crumbs')
        }
    }

    ```

## Development
It is recommended to run the following commands at the root of the monorepo in order to install dependencies and allow you to view components in isolation via Storybook.

```bash
# cd ./fozzie-components
yarn install

## Testing
Unit / Integration / Contract

```bash
# Run Unit / Integration / Contract tests for all components
cd ./fozzie-components
yarn test
```

OR

```bash
# Run Unit / Integration / Contract tests for f-breadcrumbs
cd ./fozzie-components/packages/f-breadcrumbs
yarn test
```

Component Tests
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
# Run Component tests for f-breadcrumbs
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components/packages/f-breadcrumbs
yarn test-component:chrome
```
## Documentation to be completed once module is in stable state.
