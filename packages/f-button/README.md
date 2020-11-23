
<div align="center">
  <h1>f-button</h1>

  <img width="125" alt="Fozzie Bear" src="../../bear.png" />

  <p>The generic button component</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-button.svg)](https://badge.fury.io/js/%40justeat%2Ff-button)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-button/badge.svg)](https://coveralls.io/github/justeat/f-button)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-button/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-button?targetFile=package.json)


## Usage

1.  Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/f-button
    ```

    ```bash
    npm install @justeat/f-button
    ```

2.  Import the component

    You can import it in your Vue SFC like this (please note that styles have to be imported separately):

    ```
    import VueButton from '@justeat/f-button';
    import '@justeat/f-button/dist/f-button.css';

    export default {
        components: {
            VueButton
        }
    }
    ```

    If you are using Webpack, you can import the component dynamically to separate the `vue-button` bundle from the main `bundle.client.js`:

    ```
    import '@justeat/f-button/dist/f-button.css';

    export default {
        components: {
            ...
            VueButton: () => import(/* webpackChunkName: "vue-button" */ '@justeat/f-button')
        }
    }

    ```

## Development

Running below `yarn` commands from the component folder, starts a development
server displaying a preview example of the component implementation.

```bash
# cd /packages/f-button
yarn install

# followed by
yarn demo
```

## Documentation to be completed once module is in stable state.
