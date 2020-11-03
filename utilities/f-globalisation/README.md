
<div align="center">
  <h1>f-globalisation</h1>

  <img width="125" alt="Fozzie Bear" src="../../bear.png" />

  <p>A utility which wires up vue-i18n within your Smart Component</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-globalisation.svg)](https://badge.fury.io/js/%40justeat%2Ff-globalisation)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg&circle-token=4c77c1990b98c8e06e01b497bc80f376346f609d)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-globalisation/badge.svg)](https://coveralls.io/github/justeat/f-globalisation)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-globalisation/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-globalisation?targetFile=package.json)


## Usage

1.  Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/f-globalisation
    ```

    ```bash
    npm install @justeat/f-globalisation
    ```

2.  Import the component

    You can import it in your Vue SFC like this (please note that styles have to be imported separately):

    ```
    import VueGlobalisation from '@justeat/f-globalisation';
    import '@justeat/f-globalisation/dist/f-globalisation.css';

    export default {
        components: {
            VueGlobalisation
        }
    }
    ```

    If you are using Webpack, you can import the component dynamically to separate the `vue-globalisation` bundle from the main `bundle.client.js`:

    ```
    import '@justeat/f-globalisation/dist/f-globalisation.css';

    export default {
        components: {
            ...
            VueGlobalisation: () => import(/* webpackChunkName: "vue-globalisation" */ '@justeat/f-globalisation')
        }
    }

    ```

## Development

Running below `yarn` commands from the component folder, starts a development
server displaying a preview example of the component implementation.

```bash
# cd /packages/f-globalisation
yarn install

# followed by
yarn demo
```

## Documentation to be completed once module is in stable state.
