<div align="center">
<h1>f-header</h1>

<img width="125" alt="Fozzie Bear" src="../../bear.png" />

<p>Global Header Component for Vue.js.</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-header.svg)](https://badge.fury.io/js/%40justeat%2Ff-header)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg&circle-token=4c77c1990b98c8e06e01b497bc80f376346f609d)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-header/badge.svg)](https://coveralls.io/github/justeat/f-header)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-header/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-header?targetFile=package.json)


## Usage

1.  Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/f-header
    ```

    ```bash
    npm install @justeat/f-header
    ```

2.  Import the component

    You can import it in your Vue SFC like this (please note that styles have to be imported separately):

    ```JavaScript
    import VueHeader from '@justeat/f-header';
    import '@justeat/f-header/dist/f-header.css';

    export default {
        components: {
            VueHeader
        }
    }
    ```

    If you are using Webpack, you can import the component dynamically to separate the header bundle from the main `bundle.client.js`:

    ```JavaScript
    import '@justeat/f-header/dist/f-header.css';

    export default {
        components: {
            // ...
            VueHeader: () => import(/* webpackChunkName: "vue-header" */ '@justeat/f-header')
        }
    }

    ```

3. Properties which component accepts:

    `locale` - If there is a vue-i18n plugin in the project, the header component can be called without locale property, otherwise it accepts it in format like 'en-GB'

    `isTransparent` - Boolean property with `false` as a default value, defines whether the header has transparent or white background.

    `showDeliveryEnquiry` - Boolean property with `false` as a default value, defines if it is necessary to show the "Deliver with Just Eat" link in the header.

    `errorLog` - Function passed in for logging errors with the `fetchUserInfo` method. It has empty function as a default value

    `userInfoProp` - Optional object conaining user details. If not provided `userInfoProp` is set via XHR call to `/api/account/details`

## Demo and local development

Running the command below from the component folder e.g. `./packages/f-header` will start a development server and allow to preview the component usually on http://localhost:8080/ 

```bash
# Local preview
yarn demo

# Logged out user - http://localhost:8080/
# Logged in user - http://localhost:8080/?testuser
```

In addition using a `?testuser` parameter will simulate a logged in state. 


## Documentation to be completed once module is in stable state.
