<div align="center">
<h1>f-footer</h1>

<img width="125" alt="Fozzie Bear" src="../../bear.png" />

<p>Global Footer Component for Vue.js.</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-footer.svg)](https://badge.fury.io/js/%40justeat%2Ff-footer)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-footer/badge.svg)](https://coveralls.io/github/justeat/f-footer)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-footer/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-footer?targetFile=package.json)

---

1. Add the module to your project

    ```bash
    yarn add @justeat/f-footer
    ```

1. Import the component

    You can import it in your Vue SFC like this (please note that styles have to be imported separately):

    ```
    import VueFooter from '@justeat/f-footer';
    import '@justeat/f-footer/dist/f-footer.css';

    export default {
        components: {
            VueFooter
        }
    }
    ```

    If you are using Webpack, you can import the component dynamically to separate the footer bundle from the main `bundle.client.js`:

    ```
    import '@justeat/f-footer/dist/f-footer.css';

    export default {
        components: {
            ...
            VueFooter: () => import(/* webpackChunkName: "vue-footer" */ '@justeat/f-footer')
        }
    }

    ```

    - If there is a vue-i18n plugin in the project, footer component can be called without any props:

    `<vue-footer />`

    - Or you can pass locale as a property to specify the tenant:

    `<vue-footer
        locale="en-GB" />`

1. Browser Support

    This component extends [@justeat/browserslist-config-fozzie](https://github.com/justeat/browserslist-config-fozzie).

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
# Run Unit / Integration / Contract tests for f-footer
cd ./fozzie-components/packages/f-footer
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
# Run Component tests for f-footer
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components/packages/f-footer
yarn test-component:chrome
```
