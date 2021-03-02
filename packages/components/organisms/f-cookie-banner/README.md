<div align="center">
  <h1>f-cookie-banner</h1>

  <img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

  <p>Cookie Banner</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-cookie-banner.svg)](https://badge.fury.io/js/%40justeat%2Ff-cookie-banner)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-cookie-banner/badge.svg)](https://coveralls.io/github/justeat/f-cookie-banner)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-cookie-banner/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-cookie-banner?targetFile=package.json)


## Usage

### Installation

This package can be installed using npm or yarn:

```sh
yarn add @justeat/f-cookie-banner
```

```sh
npm install @justeat/f-cookie-banner
```

### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import CookieBanner from '@justeat/f-cookie-banner';
import '@justeat/f-cookie-banner/dist/f-cookie-banner.css';

export default {
    components: {
        CookieBanner
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `cookie-banner` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-cookie-banner/dist/f-cookie-banner.css';

export default {
    components: {
        ...
        CookieBanner: () => import(/* webpackChunkName: "cookie-banner" */ '@justeat/f-cookie-banner')
    }
}
```

Call the component in your template:

```js
<f-cookie-banner />
```

## Configuration

### Props

`f-cookie-banner` has a number of props that allow you to customise its functionality.

The props that can be defined are as follows:

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |
| `locale` | `String` | `''` | Set the tenant for localisation ['da-DK', 'en-AU', 'en-GB', 'en-IE', 'en-NZ', 'es-ES', 'it-IT', 'nb-NO']. |
| `isHidden` | `Boolean` | `false` | show/hide the cookie consent banner. |
| `showLegacyBanner` | `Boolean` | `false` | Use the legacy "passive" banner markup (UK only). |
| `cookieExpiry` | `Number` | `7776000` | Expiry time of cookies written to the browser. |

### CSS Classes

`f-cookie-banner` has its own styles which are scoped to the component using CSS modules to prevent conflicts with existing styles on the page.

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-cookie-banner` package:

```sh
$ cd packages/components/organisms/f-cookie-banner
```

### Running storybook

Storybook can be used to develop new and existing components.

To start storybook:

> Please ensure you are in the f-cookie-banner directory as outlined in the above instructions.

```sh
# cd to the storybook package
$ cd ../../../storybook

# Run storybook
$ yarn storybook:serve
```

This will build and serve storybook at [http://localhost:8080](http://localhost:8080).
