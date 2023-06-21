<div align="center">
  <h1>f-cookie-banner</h1>

  <img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

  <p>Cookie Banner</p>
  <p>This component lets a user tell us which cookies they consent to, and removes/avoids those that they don't.</p>
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
};
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
<f-cookie-banner
    :locale="$i18n.locale" />
```

### Non-Vue Applications

A static vanilla version of `f-cookie-banner` is available as part of the published component. These self-contained JS & CSS files are compiled from the base Vue component using the Vue CLI [pre-render plugin](https://github.com/SolarLiner/vue-cli-plugin-prerender-spa).

Static files are generated for each locale and added to `dist/static` folder. There is one JS and CSS file for each locale. For example `dist/static/en-GB.js` and `dist/static/en-GB.css`.

#### HTML Tag Implementation

Files can be accessed directly via CDN using [unkpg.com](https://unpkg.com/browse/@justeat/f-cookie-banner/dist/static/).

***By omitting the version/tag unpkg will serve the latest version automatically, you may wish to fix the version served in your application***

Using the CDN the cookie banner can be added to any web page using basic tags. The page must contain a placeholder element with an `id` of `"cookie-banner"`, e.g., `<div id="cookie-banner"></div>`.

***In order for the static cookie banner to look correct, you must also link to the `fozzie-utilities` CSS file created by `@justeat/fozzie` (please see the example below on how to link to it). Whilst `fozzie-reset` and `fozzie-typography` are not required, we highly recommend linking to them as well***

```html
<html>
  <head>
    <!-- use fozzie CSS files to provide base styles and utilities classes used by the cookie banner -->
    <link rel="stylesheet" href="https://unpkg.com/@justeat/fozzie/dist/css/fozzie-reset.css" />
    <link rel="stylesheet" href="https://unpkg.com/@justeat/fozzie/dist/css/fozzie-typography.css" />
    <link rel="stylesheet" href="https://unpkg.com/@justeat/fozzie/dist/css/fozzie-utilities.css" />
    <!--  use the cookie banner CSS NOTE: It is important that you choose the correct tenant -->
    <link href="https://unpkg.com/@justeat/f-cookie-banner/dist/static/en-GB.css" rel="stylesheet" />
  </head>
  <body>
    <div id="cookie-banner"></div>
    <script
      src="https://unpkg.com/@justeat/f-cookie-banner/dist/static/en-GB.js"
      type="text/javascript"
    ></script>
  </body>
</html>
```

A working demo can be found on [codepen.io](https://codepen.io/JamieMaguireJE/pen/QWrzboo)

#### Bundling Tool Implementation

You can use any modern bundling tool to include this version in a project. For example using [Browserify](https://browserify.org/) with [browserify-css](https://github.com/cheton/browserify-css) plugin:

```css
/* app.css */
@import "node_modules/@justeat/f-cookie-banner/dist/static/en-GB.css";
```

```js
// app.js
require("./app.css");

const cookieBanner = require("@justeat/f-cookie-banner/dist/static/en-GB.js");

(function() {
  cookieBanner();
})();
```

Use Browserify to bundle JS & CSS

`browserify -t browserify-css app.js > bundle.js`

Finally, use the generated bundle in your HTML page

```html
<html>
  <head></head>
  <body>
    <div id="cookie-banner"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

#### Non-Vue Custom Props

The Non-Vue version is compiled using the Vue CLI [pre-render plugin](https://github.com/SolarLiner/vue-cli-plugin-prerender-spa), which means that prop values are determined at build-time. You can configure your own custom version by simply adding the required props to the base template file used by the pre-renderer.

Props should be added to the [App.vue](https://github.com/justeat/fozzie-components/blob/master/packages/components/organisms/f-cookie-banner/f-cookie-banner-static/src/App.vue). Remember the `locale` prop will be replaced by the `build:static-files` task.

In the code example below we add the `nameSuffix` prop:

```html
<template>
    <cookie-banner
        locale="da-DK"
        :should-absolute-position-reopen-link="false"
        nameSuffix="myName"
    />
</template>
```

Next run `yarn build` followed by `yarn build:static-files`. The generated files will be added to the root `dist/static` folder.

## Configuration

### Props

`f-cookie-banner` has a number of props that allow you to customise its functionality.

The props that can be defined are as follows:

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |
| `locale` | `String` | `''` | Set the tenant for localisation ['da-DK', 'en-AU', 'en-GB', 'en-IE', 'en-NZ', 'es-ES', 'it-IT', 'nb-NO']. |
| `isHidden` | `Boolean` | `false` | show/hide the cookie consent banner. |
| `shouldShowLegacyBanner` | `Boolean` | `false` | Use the legacy "passive" banner markup (UK only). |
| `cookieExpiry` | `Number` | `90` | Expiry time (days) of cookies written to the browser. |
| `shouldUseGreyBackground` | `Boolean` | `true` | Use grey background for the reopen link. |
| `shouldAbsolutePositionReopenLink` | `Boolean` | `true` | Adds a ResizeObserver and absolutely positions the re-open link to the bottom when the content is smaller than the window |
| `isFirstInTabOrder` | `Boolean` | `true` | Whether or not the cookie banner should appear first in the page's tab order. |
| `nameSuffix` | `String` | `''` | Add a suffix to the cookie name. This allows the cookie banner to create a cookie with a different name to be able to handle multiple sub-domains. |
| `domain` | `String` | `null` | Specifies which hosts can receive a cookie. If unspecified, the attribute defaults to the same host that set the cookie, excluding subdomains. If it is specified, then subdomains are always included. Therefore, passing the prop is less restrictive than omitting it. For example, if you specify `just-eat.co.uk`, the cookie will be used in any subdomain of `just-eat.co.uk` |

#### ***Important***

- Please, be mindful of the amount of cookies your app will be generating when using the `nameSuffix` prop above. If you have questions, please, contact the code owners.

- The Non Vue version uses default prop values with the exception of `shouldAbsolutePositionReopenLink` which is set to false to avoid any conflicts with consuming applications. A seperate version is generated for each locale. It is possible to generate a custom build and use your own prop values, see on Vue Custom Props above.

### CSS Classes

`f-cookie-banner` has its own styles which are scoped to the component using CSS modules to prevent conflicts with existing styles on the page.

The component is also using utility css styles from [fozzie](https://github.com/justeat/fozzie/) package. You need to make sure to `@include trumps-utilities();` mixin to your application styles if you use beta version of fozzie package (>= v5.0.0-beta.0). If you are using main version (v4.X.X) styles should come out of the box.

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

### Static Vanilla Files

Static file generation is controlled by the `gulp` task `./f-cookie-banner-static/gulpfile.js`. This includes the array of language codes that determine which locale versions are compiled.

The task can be manually executed using `yarn build:static-files` from `f-cookie-banner`. You will need to ensure that you run `yarn build` to generate the `dist` folder and files used by `./f-cookie-banner-static/`

The build task is chained to the main publish task and will run automatically when publishing to NPM or using Yalc.
