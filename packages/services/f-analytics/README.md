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
This component abstracts away the gathering of the various data values needed for Google Analytics (GA) and the installing of Google Tag Manager (GTM).  Once declared in your template is will; on render, push these various data values to GA.  You can see this in action by inspecting the `dataLayer` from the browser console in developer tools and looking for the model `{platformData: {…}}`.


## Benefits (Now)
- Single source for GTM logic: Currently we have GTM logic scattered throught various components and parent features this will remove that logic and centralise it in this single component.
- Self sufficient: With only supplying a small amount of props this component will attempt to evaluate, gather and produce all the GA data required for the initial render.

## Benefits (Soon)
- _re-push the `platformData` GA model when we change route_
- _extend the data properties for the `platformData` GA model_
- _evaluate, gather and produce data for the `pageData` GA model_
- _evaluate, gather and produce data for the `userData` GA model_
- _provide the facility to push 'ad-hoc' GA events_
<hr></br>

## Usage

1.  Install the module using npm or Yarn
    ```
    yarn add @justeat/f-analytics
    ```
    ```
    npm install @justeat/f-analytics
    ```

2.  Import & Register

    <p>
    F-Analytics contains a mixin which should be imported into your "Smart Component".
    </p>
    <p>
    As this mixin pushes the analytics; via GTM, to GA you would want to avoid duplication so it is best for it to be imported onlyh once and at the highest level (i.e. the layout vue component).  If you install at a component level then you will end up with duplicate analytics being pushed to GA by each component that installs f-analytics.
    </p>

    ```js
    <template>
      <div>
          <page-header ... />

          <nuxt
              id="pagePlaceHolder"
          />

          <cookie-banner />
      </div>
    </template>

    <script>
    import { AnalyticsMixin } from '@justeat/f-analytics';

    export default {
        ...

        mixins: [AnalyticsMixin]

        ...
    ```
3.  Configure

    <p>
    Note; althought f-analytics gathers most of it's analytical data from within it does rely on a specific GTM object to be declared/exposed in your "Smart Component". See object spec. below:
    </p>

    ```js
    gtmSettings: {
        id: '<your gtm id for the current environment>',  // Required
        auth: '<the gtm auth key>',                       // Optional
        preview: '<the gtm preview id>',                  // Optional
        cookiesWin: '<the gtm window cookie>'             // Optional
    }

    // Speak to the Analytics Team for more information on these values
    ```
    <p>
    Exposing this data; so the f-analytics can read, it can be done in several ways and two examples are shown below:
    </p>

    #1
    ```js
      ...

          data () {
              return {
                  gtmSettings: {
                      id: 'GTM-ABC123X',
                      auth: 'XhcxXXfZ9sevt9n1QGx_zg',
                      preview: 'env-281',
                      cookiesWin: 'x'
                  }
              };
          },

      ...

    };
    </script>
    ```
    #2
    ```js
      ...

      computed: {

        gtmSettings () {
            // Note; the contents of this object need to mirror the `getSettings` object content
            return this.settings.gtm;
        },

      },

      ...

    };
    </script>
    ```
</br>

\*  _Note; you don't have to supply the `gtmSettings` object (i.e. if testing) but the component will only operate in a limited capacity without it._
</br></br>

## Environment variables
Although this component can gather most data with only the `gtmSettings` object supplied it also needs some values only available on the serverside and will expect these to be present to fulfil all of it's functionality.

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
