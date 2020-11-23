
<div align="center">
  <h1>f-globalisation</h1>

  <img width="125" alt="Fozzie Bear" src="../../bear.png" />

  <p>A utility which wires up vue-i18n within your Smart Component</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-globalisation.svg)](https://badge.fury.io/js/%40justeat%2Ff-globalisation)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-globalisation/badge.svg)](https://coveralls.io/github/justeat/f-globalisation)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-globalisation/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-globalisation?targetFile=package.json)


## Usage

1.  Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/f-globalisation
    ```

2.  Import the Mixin

    F-Globalisation contains a mixin which should be imported into your "Smart Component", for example in F-Checkout import it into the Checkout.vue component as that is the root.

    ```
    import { VueGlobalisationMixin } from '@justeat/f-globalisation';

    export default {
        mixins: [VueGlobalisationMixin]
    }
    ```

3.  Add `tenantConfigs` to your component data

    The mixin will access your localisation by accessing this data property. See F-Checkout for an example if needed. It should expose an import for the localisation files in your component.

    ```
    import tenantConfigs from '../tenants';

    export default {
        mixins: [VueGlobalisationMixin],

        data () {
            return {
                tenantConfigs
            }
        }
    }
    ```

4. Now apply vue-i18n within your components

    Once installed; you should be able to access `$t`, `<i18n>` and `this.$i18n`. The correct locale messages should be loaded automatically and `en-GB` should also be loaded as a fallback.

    vue-i18n is not needed as a dependency, because it is registered by the host application, such as CoreWeb or Storybook and thus exists in context.

    The mixin also exposes a prop; so that you can pass a locale in from a website host where required.
