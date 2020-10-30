# PLEASE DO NOT USE THIS COMPONENT IN PRODUCTION YET.

<div align="center">
  <h1>f-searchbox</h1>

  <img width="125" alt="Fozzie Bear" src="../../bear.png" />

  <p>Just Eat Takeaway Global Searchbox</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-searchbox.svg)](https://badge.fury.io/js/%40justeat%2Ff-searchbox)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg&circle-token=4c77c1990b98c8e06e01b497bc80f376346f609d)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-searchbox/badge.svg)](https://coveralls.io/github/justeat/f-searchbox)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-searchbox/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-searchbox?targetFile=package.json)


## Usage

1.  Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/f-searchbox
    ```

    ```bash
    npm install @justeat/f-searchbox
    ```

2.  Import the component

    You can import it in your Vue SFC like this (please note that styles have to be imported separately):

    ```
    import VueSearchbox from '@justeat/f-searchbox';
    import '@justeat/f-searchbox/dist/f-searchbox.css';

    export default {
        components: {
            VueSearchbox
        }
    }
    ```

    If you are using Webpack, you can import the component dynamically to separate the `vue-searchbox` bundle from the main `bundle.client.js`:

    ```
    import '@justeat/f-searchbox/dist/f-searchbox.css';

    export default {
        components: {
            ...
            VueSearchbox: () => import(/* webpackChunkName: "vue-searchbox" */ '@justeat/f-searchbox')
        }
    }

    ```

## Development

Running below `yarn` commands from the component folder, starts a development
server displaying a preview example of the component implementation.

```bash
# cd /packages/f-searchbox
yarn install

# followed by
yarn demo
```

## Documentation to be completed once module is in stable state.
