<div align="center">
<h1>f-vue-icons</h1>

<img width="125" alt="Fozzie Bear" src="../bear.png" />

<p>Shared Icon Components for Vue.js.</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-vue-icons.svg)](https://badge.fury.io/js/%40justeat%2Ff-vue-icons)
[![Build Status](https://travis-ci.org/justeat/f-vue-icons.svg)](https://travis-ci.org/justeat/f-vue-icons)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-vue-icons/badge.svg)](https://coveralls.io/github/justeat/f-vue-icons)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-vue-icons/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-vue-icons?targetFile=package.json)

---

1. Add the module to your project

    ```bash
    yarn install @justeat/f-vue-icons
    ```

1. Import Individually at the component level (recommended)

    To save on bundle size you can import components individually in the app entry file.

    ```js
    <template>
        <info-icon />
    </template>


    <script>
    import { InfoIcon } from '@justeat/f-vue-icons';

    export default {
        components: {
            InfoIcon
        }
    };
    </script>
    ```

1. Import Individually at the app level

    ```js
    import Vue from 'vue';
    import { InfoIcon } from '@justeat/f-vue-icons';

    Vue.component('info-icon', InfoIcon);
    ```

1. Import all at the app level

    Register the components in your app entry file.

    ```js
    import Vue from 'vue';
    import FozzieIcons from '@justeat/f-vue-icons';

    Vue.use(FozzieIcons);
    ```

1. Usage

    You can then reference the components like so

    ```html
    <info-icon
        is-blue
        is-small />
    ```

1. Browser Support

    There is some config included in this module but it is untested.

1. Building the Module

    Run `yarn build` to compile the module.

1. Running the Tests

    Run `yarn test:unit` to run the tests.
