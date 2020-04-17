# generator-component

This folder should be used as a template for new Vue components being added to the monorepo.

## How to use this skeleton component

1. Make a copy of the `generator-component` directory inside the `/packages` directory and rename it with the name of your component (e.g. `f-header`).
2. Find all occurrences of `generator-component` or `Generator` within the copied files and replace with your component name (there will be quiet a few occurrences!).
3. Delete the top section of this `README` (up to and including the horizontal rule below) and use the rest of this `README` as a template for of your component.

---

<div align="center">
<h1>generator-component</h1>

<img width="125" alt="Fozzie Bear" src="../../bear.png" />

<p>Generator Component structure for new Fozzie Vue components.</p>


---

[![npm version](https://badge.fury.io/js/%40justeat%2Fgenerator-component.svg)](https://badge.fury.io/js/%40justeat%2Fgenerator-component)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg&circle-token=4c77c1990b98c8e06e01b497bc80f376346f609d)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/generator-component/badge.svg)](https://coveralls.io/github/justeat/generator-component)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/generator-component/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/generator-component?targetFile=package.json)


## Usage

1.  Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/generator-component
    ```

    ```bash
    npm install @justeat/generator-component
    ```

2.  Import the component

    You can import it in your Vue SFC like this (please note that styles have to be imported separately):

    ```
    import VueMyComponent from '@justeat/generator-component';
    import '@justeat/generator-component/dist/generator-component.css';

    export default {
        components: {
            VueMyComponent
        }
    }
    ```

    If you are using Webpack, you can import the component dynamically to separate the header bundle from the main `bundle.client.js`:

    ```
    import '@justeat/generator-component/dist/generator-component.css';

    export default {
        components: {
            ...
            VueMyComponent: () => import(/* webpackChunkName: "vue-header" */ '@justeat/generator-component')
        }
    }

    ```

## Development

Running below `yarn` commands from the component folder, starts a development
server displaying a preview example of the component implementation.

```bash
# cd /packages/generator-component
yarn install

# followed by
yarn demo
```

## Documentation to be completed once module is in stable state.
