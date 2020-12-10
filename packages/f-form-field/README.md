
<div align="center">
  <h1>f-form-field</h1>

  <img width="125" alt="Fozzie Bear" src="../../bear.png" />

  <p>Fozzie Form Field Component</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-form-field.svg)](https://badge.fury.io/js/%40justeat%2Ff-form-field)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-form-field/badge.svg)](https://coveralls.io/github/justeat/f-form-field)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-form-field/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-form-field?targetFile=package.json)


## Usage

1.  Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/f-form-field
    ```

    ```bash
    npm install @justeat/f-form-field
    ```

2.  Import the component

    You can import it in your Vue SFC like this (please note that styles have to be imported separately):

    ```
    import FormField from '@justeat/f-form-field';
    import '@justeat/f-form-field/dist/f-form-field.css';

    export default {
        components: {
            FormField
        }
    }
    ```

    If you are using Webpack, you can import the component dynamically to separate the header bundle from the main `bundle.client.js`:

    ```
    import '@justeat/f-form-field/dist/f-form-field.css';

    export default {
        components: {
            ...
            FormField: () => import(/* webpackChunkName: "form-field" */ '@justeat/f-form-field')
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
# Run Unit / Integration / Contract tests for f-form-field
cd ./fozzie-components/packages/f-form-field
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
# Run Component tests for f-form-field
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components/packages/f-form-field
yarn test-component:chrome
```


## Documentation to be completed once module is in stable state.
