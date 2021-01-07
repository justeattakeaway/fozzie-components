
<div align="center">
  <h1>f-cookie-banner</h1>

  <img width="125" alt="Fozzie Bear" src="../../bear.png" />

  <p>Cookie Banner</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-cookie-banner.svg)](https://badge.fury.io/js/%40justeat%2Ff-cookie-banner)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-cookie-banner/badge.svg)](https://coveralls.io/github/justeat/f-cookie-banner)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-cookie-banner/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-cookie-banner?targetFile=package.json)


## Usage

1.  Install the module using NPM or Yarn:

    ```bash
    yarn add @justeat/f-cookie-banner
    ```

    ```bash
    npm install @justeat/f-cookie-banner
    ```

2.  Import the component

    You can import it in your Vue SFC like this (please note that styles have to be imported separately):

    ```
    import CookieBanner from '@justeat/f-cookie-banner';
    import '@justeat/f-cookie-banner/dist/f-cookie-banner.css';

    export default {
        components: {
            CookieBanner
        }
    }
    ```

    If you are using Webpack, you can import the component dynamically to separate the `cookie-banner` bundle from the main `bundle.client.js`:

    ```
    import '@justeat/f-cookie-banner/dist/f-cookie-banner.css';

    export default {
        components: {
            ...
            CookieBanner: () => import(/* webpackChunkName: "cookie-banner" */ '@justeat/f-cookie-banner')
        }
    }

    ```

## Development

Running below `yarn` commands from the component folder, starts a development
server displaying a preview example of the component implementation.

```bash
# cd /packages/f-cookie-banner
yarn install

# followed by
yarn demo
```

## Documentation to be completed once module is in stable state.
