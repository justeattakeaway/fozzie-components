<div align="center">

# f-analytics

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Encapsulates the GTM / Google Analytics functionality

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-analytics.svg)](https://badge.fury.io/js/%40justeat%2Ff-analytics)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-analytics/badge.svg)](https://coveralls.io/github/justeat/f-analytics)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-analytics/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-analytics?targetFile=package.json)

---
This component abstracts away the gathering of the various data values needed for Google Analytics (GA) and the setting up of Google Tag Manager (GTM).  Once registered it will; on render, push these various data values to GA.  You can see the results by inspecting the `dataLayer` from the browser console in developer tools and looking for the model `{platformData: {…}}`.


## Benefits (Now)
- Single point to record GA data: Currently we have GA/GTM logic scattered throught various features, this will allow that logic to be removed and centralise it a single component.
- Self sufficient: With only supplying a small amount of global data this component will attempt to evaluate, gather and record all the data required for the GA `platformData` and `userData` model.

## Benefits (Soon)
- _extend the data properties for the GA `platformData` model_
- _evaluate, gather and produce data for the GA `pageData` model_
- _provide the facility to push 'ad-hoc' GA events via a global service_
- _instead of owning when to push each GA model the consumer will have control over this_
- _allow extra bespoke/custom properties to be appended to each GA model by the consumer before the model is pushed_
- _allow 'ad-hoc' GA events to be push even when server side_
<hr></br>

## Usage

1.  <strong>Install the module using npm or Yarn</strong>
    ```
    yarn add @justeat/f-analytics
    ```
    ```
    npm install @justeat/f-analytics
    ```

2.  <strong>Import & Register</strong>

    <p>
    F-Analytics contains a 'Mixin' which should be imported into your "Smart Component" plus a 'Nuxt - Plugin' that needs to be registered in the "nuxt.config.js" via a local plugin and both need to be present.
    </p>
    <p>
    As this mixin uses authentication token for some of its data it is needed for it to be added on the page level. There are three public methods available to use:
    - `preparePlatformData` - evaluates and gather data for the `platformData` GA model.
    - `prepareUserData` - evaluates and gather data for the `userData` GA model. Can take optional `authToken` prop to push data related to authToken. Without the prop userData will contain only userId.
    - `pushAnalytics` - pushes `platformData` and `userData` to the dataLayer.

    <strong>Below is an example of how to include the 'Mixin':</strong>
    </p>

    _../layouts/main.vue_
    ```js
    <template>
      <div>
          <vue-checkout />
      </div>
    </template>

    <script>
    import { AnalyticsMixin } from '@justeat/f-analytics';

    export default {
        ...

        mixins: [AnalyticsMixin],

        ...

        watch: {
        // Watch for authentication token to become available
        isAuthFinished (newVal) {
            if (newVal === true) {
                this.prepareUserData(this.authToken);
                this.pushAnalytics();
            }
        },

        ...

        mounted () {
            this.preparePlatformData();
        }
    }
    ```

    <strong>You also need to create a local plugin to reference the external plugin, which then allows you to pass in options </strong>(_see Options section_)<strong>,  In the example below it demonstrates how you can create the 'options' to pass into the plugin;</strong>
    </p>

    _../plugins/f.analytics.plugin.js_
    ```js
    import { AnalyticsPlugin } from '@justeat/f-analytics';

    const options = {
        id: 'GTM-ABC123X',
        auth: 'some auth key',
        preview: 'true',
        cookiesWin: 'some cookie name'
    };

    export default (context, inject) => { AnalyticsPlugin(context, inject, options); };
    ```

    <strong>Then, finally, you need to register the local plugin you have just created in the nuxt config, see below;</strong>
    </p>

    _nuxt.config.js_
    ```js
    const config = async () => {
      return {

        ...

        plugins: [
          '~/plugins/f.analytics.plugin.js'
        ],

        ...

      };
    };

    export default config;
    ```
</br>

  ## Options
  Note: although f-analytics gathers most of it's analytical data from within it does rely on a specific GTM objects to be supplied by your "Smart Component". See object spec. below:

  ```js
    options: {
        id: '<your gtm id for the current environment>',  // Required
        auth: '<the gtm auth key>',                       // Optional
        preview: '<the gtm preview id>',                  // Optional
        cookiesWin: '<the gtm window cookie>'             // Optional
    }

    // Speak to the Analytics Team for more information on these values
  ```
\*  _Note; you don't have to supply the '`options`' objects (i.e. if testing) but the component will only operate in a limited capacity without it.<br>* Also, if you supply the 'auth' value then you need to supply the 'preview' and 'cookieWin' values._
</br></br>

## Environment variables
Although this component can gather most data with only the `options` object supplied it also needs some values only available on the serverside and will expect these to be present to fulfil all of it's functionality.

| Prop Name | Type | Example |  Description |
| :----- | :----- | :----- | :----------- |
| `justEatEnvironment` | Server Environment Variable | `staging` | This will indicate the current environment |
| `FEATURE_VERSION` | Server Environment Variable | `1.12.345.0` | This will indicate the current version of the feature |
| `INSTANCE_POSITION` | Server Environment Variable | `004` | This will indicate the current position of the AWD EC2 instance |
| `je-user_percentage` | cookie (httponly) | `34` | This will indicate the user percent value (this assist with experiment bucketing) |
</br>

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
$ yarn build
```

Change directory to the `f-analytics` package:

```sh
$ cd packages/services/f-analytics
```
</br>

## Testing

To test all components, run from root directory.
To test only `f-analytics`, run from the `./fozzie-components/packages/services/f-analytics` directory.

### Unit tests

```sh
yarn test
```
