<div align="center">
<h1>f-services</h1>

<img width="125" alt="Fozzie Bear" src="../../bear.png" />

<p>Global Header Component for Vue.js.</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-header.svg)](https://badge.fury.io/js/%40justeat%2Ff-header)
[![Build Status](https://travis-ci.org/justeat/f-header.svg)](https://travis-ci.org/justeat/f-header)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-header/badge.svg)](https://coveralls.io/github/justeat/f-header)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-header/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-header?targetFile=package.json)


## Usage

1.  Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/f-services
    ```

    ```bash
    npm install @justeat/f-services
    ```

2.  Import the component

    You can import it in your Vue SFC like this (please note that styles have to be imported separately):

    ```
    import VueServices from '@justeat/f-services';

    export default {
        components: {
            VueServices
        }
    }
    ```

    If you are using Webpack, you can import the component dynamically to separate the services bundle from the main `bundle.client.js`:

    ```
    export default {
        components: {
            ...
            VueServices: () => import(/* webpackChunkName: "vue-services" */ '@justeat/f-services')
        }
    }

    ```

3. Services in the bundle:

    `getLocale` - Returns the locale where the user is logged in

    `getTheme` - Returns the theme based on the users locale

## Documentation to be completed once module is in stable state.
