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
This component abstracts away the gathering of the various data values needed for Google Analytics (GA) and the setting up of Google Tag Manager (GTM).<br>
Once registered and the site is running it will prepare each page with the required GTM tags for pushing analytics to GA plus it will gather and store any serverside values to be used in analytics that are pushed to GA clientside.<br>
You can see the GTM tags and any GA data by inspecting the `header` of the page and the `dataLayer` from the browser console in developer tools.  If you excerise all the current functionality you will be able to see the following models `{platformData: {…}}`, `{userData: {…}}`, `{pageData: {…}}` & `{event: ...}` in the `dataLayer`.


## Benefits
- Single component to record GA data rather than having logic & implementations scattered around in various features.
- Self-sufficient: With only supplying a small amount of data this component will attempt to evaluate, gather and record all the data required (serverside and clientside) for the GA models; `platformData`, `userData` and `pageData`.
- Provide the facility to push 'ad-hoc' GA events (even if serverside).
- Allows the consumer to dictate if & when to push analytics to GA.
- Allows the consumer to access this service globally via the name `$gtm`, i.e. `this.$gtm.pushEvent({...}`).
- Customisation (via `options`) of the global variable name and also of the `namespace` used by the internal vuex store (i.e. if they clashes with names already in use within your site).
- Each method returns the model it attempted to push to GA thus allowing you to view/test what has been constructed within each method.

## Benefits (Soon)
- _Allow extra bespoke/custom properties to be appended to each GA model by the consumer before the model is pushed_
<hr></br>

## Usage

*  <strong>Install the module using npm or Yarn</strong>
    ```
    yarn add @justeat/f-analytics
    ```
    ```
    npm install @justeat/f-analytics
    ```

*  <strong>Import & Register</strong>

    F-Analytics is a 'Nuxt - Plugin' that needs to be registered in the "nuxt.config.js" but as it is contained in a fozzie service you need to create a local plugin to reference the external plugin, which then allows you to pass in options (see the `Options` section).<br><br>
    In the example below it demonstrates how to create a local plugin; that references the `f-analytics` plugin, and how you can create the `options` to pass into the plugin;


    _./plugins/f.analytics.plugin.js_
    ```js
    import { AnalyticsPlugin } from '@justeat/f-analytics';

    const options = {
        featureName: 'checkout-web',
        locale: 'en-GB',
        id: 'GTM-ABC123X'
    };

    export default (context, inject) => { AnalyticsPlugin(context, inject, options); };
    ```

    Then, finally, you need to register the local plugin you have just created in the nuxt config, see below;

    _./nuxt.config.js_
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

*  <strong>Methods</strong>

    - ### **`pushPlatformData()`**<br>
      Evaluates and gather data for the `platformData` GA model and pushes it to the `dataLayer`<br>
      #### **Syntax**.
      > this.`$gtm`.**pushPlatformData**();
      #### **Parameters**.
      > none
      #### **Return value**.
      > (**object**) `platformData` model

      This will be the model constructed and pushed to the `datalayer` (handy for testing and debugging)<br>
      #### **Notes**
      This is ideally only called **once** per page so it is best suited at parent of the page component.<br>
      It gathers most of its data clientside and so needs to be executed in **`mounted`** vue hook.<br>
      Some of the data it needs can only be read serverside but this has already been gathered at the point the plugin was registered and then store internally until this method is executed.
      #### **Example**
      _./pages/checkout/index.vue_
      ```js
      <script>

      export default {

          components: {
              VueCheckout
          },

          ...

          mounted () {
              this.$gtm.pushPlatformData();
          },

          ...
      };
      </script>
      ```
      ___
      <br>
    - ### **`pushUserData()`**<br>
      Evaluates and gather data for the `userData` GA model and pushes it to the `dataLayer`<br>
      #### **Syntax**.
      > this.`$gtm`.**pushUserData**(_{ authtoken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` }_);
      #### **Parameters**.
      > (**object**) {<br>
      > - (**string**) `authToken` (_optional_)
      ><br>}
      #### **Return value**.
      > (**object**) `userData` model

      This will be the model constructed and pushed to the `datalayer` (handy for testing and debugging)
      #### **Notes**
      This is ideally only called everytime the `User` status changes so it might best suited in the `watch` vue hook.<br>
      It gathers most of its data clientside and so needs to be executed in a clientside hook.<br>
      The method is very dependant on the `authToken` parameter and without it the `userData` model will only contain the anonymous user id.
      #### **Example**
      ```js
      <script>

      export default {

          ...

          watch: {
              // Watch for authentication token to become available
              isAuthFinished (newVal) {
                  if (newVal === true) {
                      this.$gtm.pushUserData({ authToken: this.authToken });
                  }
              },
          }
          ...
      };
      </script>
      ```
      ___
      <br>
    - ### **`pushPageData()`**<br>
      Evaluates and gather data for the `pageData` GA model and pushes it to the `dataLayer`<br>
      #### **Syntax**.
      > this.`$gtm`.**pushPageData**(_{ pageName: `checkout`, conversationId: `3e8ab8f2-fded-...`, requestId: `021c24d2-86ef-...` }_);
      #### **Parameters**.
      > (**object**) {<br>
      > - (**string**) `pageName`
      > - (**string**) `conversationId` (_optional_)
      > - (**string**) `requestId` (_optional_)
      > - (**number**) `httpStatusCode` (_optional_)(_only override this if you wish to change the default 200, i.e you may be displaying a custom static 404 page and want to record the value 404 instead of 200 or you may be displaying a successful account creation page and want to record the value 201 rather than 200_)
      ><br>}
      #### **Return value**.
      > (**object**) `pageData` model

      This will be the model constructed and pushed to the `datalayer` (handy for testing and debugging)
      #### **Notes**
      This is ideally called everytime the `Page` status changes.<br>
      It gathers most of its data clientside and so needs to be executed in a clientside hook.<br>
      Some of the data it needs can only be read serverside but this has already been gathered at the point the plugin was registered and then store internally until this method is executed.
      ___
      <br>
    - ### **`pushEvent()`**<br>
      Pushes the given event object to the `dataLayer`<br>
      #### **Syntax**.
      > this.`$gtm`.**pushEvent**(_{ event object ... }_);
      #### **Parameters**.
      > (**object**) `event`
      #### **Return value**.
      > (**object**) `event` model

      This will be the model constructed and pushed to the `datalayer` (handy for testing and debugging)
      #### **Notes**
      This can be called at ad-hoc times to indicate an action, event or status as required by your Analylics team.  The shape of the event object will be dictate by your Analylics team<br>
      If this method is executed serverside then although the event cannot be pushed to GA (_because it needs a GTM prepare DOM_) it will be store internally until the plugin has re-registered clientside then any stored events will be pushed to GA.
      #### **Example**
      ```js
      <script>

      export default {

          ...

          watch: {
              isLoggedIn (type) {
                  const loggedInEvent = {
                      event: 'loggedIn-`${type}`',
                      experiment: {
                          id: 'EX-1234',
                          name: 'Some experiment',
                          platform: 'experiment_api',
                          variant: {
                              name: 'increase_a'
                          },
                      version: 1
                      }
                  };

                  this.$gtm.pushEvent(loggedInEvent);
              },
          }

          ...
      };
      </script>
      ```
  ## Options
  Note: although `f-analytics` gathers most of it's analytical data from within it does rely on some specific values to be supplied by your feature via an `options` object.  See object spec. below:

  | Prop Name | Example | Optional/Required | Default | Description |
  | :--- | :--- | :--- | :--- | :--- |
  | namespace| 'some_unique-namespace' | Optional | `f-analytics` | This is used to ensure uniqueness with regards to internal objects, e.g. the internal Vuex Store used by this service, do not change unless you have an issue and need to use this namespace locally |
  | globalVarName| 'gtm' | Optional | `gtm` | This is used to access the global service/methods, do not change unless you have an issue and need to use this name locally |
  | featureName| 'coreweb-registration' | Required | | This is used to identify analytics sent by your feature |
  | locale| 'en-GB' | Optional | `en-GB` | This is used to calcualate various platform data values |
  | id| 'GTM-X1234Z' | | | This is used know what GA account to push analytics to |
  | auth| 'authKey' | Optional | | Please speak to your Analytics team for more information about this option |
  | preview| 'preview id' | Optional (required if auth supplied) | | Please speak to your Analytics team for more information about this option |
  | cookiesWin| 'x-je-gtm_cookie' | Optional (required if auth supplied) | | Please speak to your Analytics team for more information about this option |
  <br>

\*  _Note; you don't have to supply the '`options`' object (i.e. if testing) but the component will only operate in a limited capacity without it._
</br></br>

## Environment variables
Although this component can gather most data with only the `options` object it also needs some values only available on the serverside and will expect these to be present to fulfil all of it's functionality.

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
