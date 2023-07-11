<div align="center">

# core-analytics

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Encapsulates Snowplow & GTM (Google Analytics) functionality

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Fcore-analytics.svg)](https://badge.fury.io/js/%40justeat%2Fcore-analytics)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/core-analytics/badge.svg)](https://coveralls.io/github/justeat/core-analytics)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/core-analytics/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/core-analytics?targetFile=package.json)

---
This component abstracts away the gathering of the various data values needed for Google Analytics (GA) and the setting up of Google Tag Manager (GTM).<br>
Once registered and the site is running it will prepare each page with the required GTM head tag for pushing analytics to GA.<br>
You can see the GTM tag and any GA data by inspecting the `head` tag of the page and the `dataLayer` from the browser console in developer tools.  If you exercise all the current functionality you will be able to see the following models `{platformData: {…}}`, `{userData: {…}}`, `{pageData: {…}}` & `{event: ...}` in the `dataLayer`.


## Benefits
- Single component to record GA data rather than having logic & implementations scattered around in various features.
- Self-sufficient: With only supplying a small amount of data this component will attempt to evaluate, gather and record all the data required (clientside) for the GA models: `platformData`, `userData` and `pageData`.
- Provide the facility to push 'ad-hoc' GA events.
- Allows the consumer to dictate if & when to push analytics to GA.
- Customisation (via `options`) if the need arises.
- Each method returns the model it attempted to push to GA thus allowing you to view/test what has been constructed within each method.
- Allows extra custom properties to be appended to each GA model by the consumer before the model is pushed to the dataLayer.
- Allows properties to be overridden on each GA model by the consumer before the model is pushed.

<hr></br>

## Usage

*  <strong>Install the module using npm or Yarn</strong>
    ```
    yarn add @justeat/core-analytics
    ```
    ```
    npm install @justeat/core-analytics
    ```

*  <strong>Import & Register</strong>

    core-analytics exposes a simple class that performs various steps in the 'constructor' during initialisation to prepare the service for use.  When instantiating the service it allows you to pass in 'options' (see the <a href="#options">_`Options`_</a> section) that allow you to configure some of the static values that may need to change in your environment<br><br>
    In the example below it demonstrates how to declare and instantiate the `core-analytics` service and how you can create the `options` to pass into the service;


    ```js
    import AnalyticService from '@justeat/core-analytics';

    const req = this.req; // Get a handle to the current request
    const options = {
      featureName: 'checkout-web',
      locale: 'en-GB',
      id: 'GTM-ABC123X'
    };

    const service = new AnalyticService(req, options);
    ```
</br>

*  <strong>Methods</strong>

    - ### **`pushPlatformData()`**<br>
      Evaluates and gather data for the `platformData` GA model and pushes it to the `dataLayer`<br>
      #### **Syntax**.
      > this.`$gtm`.**pushPlatformData**(_{ featureName: `custom-web`, locale: `en-AU`, customFields: { custom1: 'one', branding: 'new20' } }_);
      #### **Parameters**.
      > (**object**) {<br>
      >> - (**string**) `featureName` (_optional_) (_default is whatever was set at the point of registration or whatever was reset using the `setOptions()` method.  You may want to change this if working in on a SPA site and you want to change the feature name everytime the active page changed. Note that this will not persist the value unlike the actions of `setOptions()` method_)
      >> - (**string**) `locale` (_optional_) (_default is whatever was set at the point of registration and if not set at that point then the Options default. Note that this will not persist the value unlike the actions of `setOptions()` method_)
      >> - (**object**) `customFields` (_optional_) (_You may want to overwrite/add fields and this parameter allows you to indicate an object of fields/values that if already present will overwrite and if not then will be append to the model_)

      ><br>}
      #### **Return value**.
      > (**object**) `platformData` model

      This will be the model constructed and pushed to the `datalayer` (handy for testing and debugging)<br>
      #### **Notes**
      This is ideally only called **once** per page so it is best suited in the parent page component.<br>
      #### **Example**
      _./pages/checkout/index.vue_
      ```js
      <script>
          ...

          window.onload = function() {
              this.service.pushPlatformData();
          };

          ...

      </script>
      ```
      ___
      <br>
    - ### **`pushUserData()`**<br>
      Evaluates and gather data for the `userData` GA model and pushes it to the `dataLayer`<br>
      #### **Syntax**.
      > this.`$gtm`.**pushUserData**(_{ authtoken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`, customFields: { custom1: 'one', role: 'admin' } }_);
      #### **Parameters**.
      > (**object**) {<br>
      >> - (**string**) `authToken` (_optional_)
      >> - (**object**) `customFields` (_optional_) (_You may want to overwrite/add fields and this parameter allows you to indicate an object of fields/values that if already present will overwrite and if not then will be append to the model_)

      ><br>}
      #### **Return value**.
      > (**object**) `userData` model

      This will be the model constructed and pushed to the `datalayer` (handy for testing and debugging)
      #### **Notes**
      This is ideally only called everytime the `User` status changes so it might best suited in a `login` method.<br>     
      The method is very dependant on the `authToken` parameter and without it the `userData` model will only contain the anonymous user id.
      #### **Example**
      ```js
      <script>

          ...

          loggedIn (success) {
              if (success === true) {
                  this.service.pushUserData({ authToken: this.authToken });
              }
          }
          ...
      </script>
      ```
      ___
      <br>
    - ### **`pushPageData()`**<br>
      Evaluates and gather data for the `pageData` GA model and pushes it to the `dataLayer`<br>
      #### **Syntax**.
      > this.`$gtm`.**pushPageData**(_{ pageName: `accounts sign-up`, customFields: { custom1: 'one' } }_);
      #### **Parameters**.
      > (**object**) {<br>
      >> - (**string**) `pageName`
      >> - (**number**) `httpStatusCode` (_optional_)(_only override this if you wish to change the default 200, i.e you may be displaying a custom static 404 page and want to record the value 404 instead of 200 or you may be displaying a successful account creation page and want to record the value 201 rather than 200_)
      >> - (**object**) `customFields` (_optional_) (_You may want to overwrite/add fields and this parameter allows you to indicate an object of fields/values that if already present will overwrite and if not then will be append to the model_)

      >}<br>
      #### **Return value**.
      > (**object**) `pageData` model

      This will be the model constructed and pushed to the `datalayer` (handy for testing and debugging)
      #### **Notes**
      This is ideally called everytime the `Page` status changes, i.e. new page displayed, orientation changed, etc..<br>
      ___
      <br>
    - ### **`setOptions()`**<br>
      Overrides the current `Option` values<br>
      #### **Syntax**.
      > this.`$gtm`.**setOptions**(_{ featureName: `checkout-web`, locale: `en-IE` }_);
      #### **Parameters**.
      > (**object**) {<br>
      > - (**string**) `featureName` (_optional_)
      > - (**string**) `locale` (_optional_) (_default is whatever was set at the point of registration and if not set at that point then the Options default. Note that this method will persist the value_)
      ><br>}
      #### **Return value**.
      > (**object**) `options` model

      This will be the current `Options` model (handy for testing and debugging)
      #### **Notes**
      If working in on a SPA site and you want to change the feature name everytime the active page changes then use this method to override the featureName at the same time so all subsequent analytics contain the correct featureName. You may also need to change the current active locale and as such you will need to use this method to reset the locale at the same time so all subsequent analytics contain the correct data.</br>Note that this method will persist the value/s until this method is called again or the plugin is re-registered.
      ___
      <br>
    - ### **`getOptions()`**<br>
      Gets the current `Option` values<br>
      #### **Syntax**.
      > this.`$gtm`.**getOptions**();
      #### **Return value**.
      > (**object**) `options` model

      This will be the current `Options` model.
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
      This can be called at ad-hoc times to indicate an action, event or status as required by your Analytics team.  The shape of the event object will be dictate by your Analylics team<br>
      If this method is executed serverside then although the event cannot be pushed to GA (_because it needs a GTM prepare DOM_) it will be store internally until the plugin has re-registered clientside then any stored events will be pushed to GA.
      #### **Example**
      ```js
      <script>

          ...

              if (isLoggedIn(type)) {
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

                  this.service.pushEvent(loggedInEvent);
              }

          ...
      </script>
      ```
  ## Options
  Note: although `core-analytics` gathers most of it's analytical data from within it does rely on some specific values to be supplied by your feature via an `options` object.  See object spec. below:

  | Prop Name | Example | Optional/Required | Default | Description |
  | :--- | :--- | :--- | :--- | :--- |
  | featureName| 'coreweb' | Required | | This is used to identify analytics sent by your feature |
  | locale| 'en-GB' | Optional | `en-GB` | This is used to calcualate various platform data values |
  | id| 'GTM-X1234Z' | | | This is used know what GA account to push analytics to |
  | auth| 'authKey' | Optional | | Please speak to your Analytics team for more information about this option |
  | preview| 'preview id' | Optional (required if auth supplied) | | Please speak to your Analytics team for more information about this option |
  | cookiesWin| 'x-je-gtm_cookie' | Optional (required if auth supplied) | | Please speak to your Analytics team for more information about this option |
  <br>

\*  _Note; you don't have to supply the '`options`' object (i.e. if testing) but the component will only operate in a limited capacity without it._
</br></br>

## Environment variables
Although this component can gather most data with only the `options` object it also needs some values that may only be available on the serverside.  These can be passed in as 'custom' fields.<br>
e.g.:

| Prop Name | Type | Example |  Description |
| :----- | :----- | :----- | :----------- |
| `environment` | Server Environment Variable | `staging` | This will indicate the current environment |
| `version` | Server Environment Variable | `1.12.345.0` | This will indicate the current version of the feature |
| `instancePosition` | Server Environment Variable | `004` | This will indicate the current position of the AWD EC2 instance |
| `isPilot` | Server Environment Variable | false | This will indicate whether the server is a pilot or not |
</br>

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
$ yarn build
```

Change directory to the `core-analytics` package:

```sh
$ cd packages/services/core-analytics
```
</br>

## Testing

To test all components, run from root directory.
To test only `core-analytics`, run from the `./fozzie-components/packages/services/core-analytics` directory.

### Unit tests

```sh
yarn test
```
