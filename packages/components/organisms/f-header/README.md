<div align="center">

# f-header

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Global Header Component for Vue.js.

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-header.svg)](https://badge.fury.io/js/%40justeat%2Ff-header)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-header/badge.svg)](https://coveralls.io/github/justeat/f-header)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-header/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-header?targetFile=package.json)


## Usage


### Installation

Install the module using NPM or Yarn:

```sh
yarn add @justeat/f-header
```

```sh
npm install @justeat/f-header
```

### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import VueHeader from '@justeat/f-header';
import '@justeat/f-header/dist/f-header.css';

export default {
    components: {
        VueHeader
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `f-header` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-header/dist/f-header.css';

export default {
    components: {
      // …
        VueHeader: () => import(/* webpackChunkName: "vue-header" */ '@justeat/f-header')
    }
}
```

The package also has dependencies that need to be installed by consuming components/applications:

| Dependency | Command to install | Styles to include |
| ----- | ----- | ----- |
| f-button | `yarn add @justeat/f-button` | `import '@justeat/f-button/dist/f-button.css';` |
| f-popover | `yarn add @justeat/f-popover` | `import '@justeat/f-popover/dist/f-popover.css';` |


## Configuration

### Props

`f-header` has a number of props that allow you to customise its functionality.

The props that can be defined are as follows:

| Prop                      | Type          | Default | Description |
| :---                      |     :---:     |  :---:  | :---        |
| locale                    | `String`      | `en-GB` | Sets the locale of the component (which determines what theme and translations to use.<br><br>If the application consuming the `f-header` component is using the vue `i18n` module, then the locale from that module will be used when this prop isn't defined. When this prop is defined, it takes precedence over the locale defined by the `i18n` module.<br><br>If not defined and the `i18n` module isn't present, the default locale used is `en-GB`.|
| customNavLinks            | `Array`       | `[]`    | Array containing objects representing the custom links. To contain `text`, `url` and `gtm` properties. |
| errorLog                  | `Function`    | `-`     | Function passed in for logging errors with the `fetchUserInfo` method. |
| headerBackgroundTheme     | `String`      | `white` | Sets the background theme for the header component.<br><br>When set to `white` the header will be white with the default logo colour.<br>When set to `transparent` the header will be transparent with a white logo.<br>When set to `highlight` the header will use the primary brand colour as the background colour with a white logo. |
| isOrderCountSupported     | `Boolean`     | `true`  | ?? |
| isLogoLinkDisabled        | `Boolean`     | `false` | Whether the company logo is disabled from allowing the user to navigate home
| orderCountUrl             | `String`      | `false` | ?? |
| showDeliveryEnquiry       | `Boolean`     | `false` | Defines if it is necessary to show the "Deliver with Just Eat" link in the header. |
| showOffersLink            | `Boolean`     | `false` | Defines whether the offers link should be shown in the navigation. |
| showHelpLink              | `Boolean`     | `true`  | Defines whether the help link should be shown in the navigation. |
| showLoginInfo             | `Boolean`     | `true`  | Defines whether the login & user info icon should be shown in the navigation. |
| userInfoProp              | `Object`      | `{}`    | Optional object conaining user details. If not provided `userInfoProp` is set via XHR call to `/api/account/details` |
| userInfoUrl               | `String`      | `/api/account/details` | URL to call to retrieve the userInfo (when `userInfoProp` isn't set). |
| showCountrySelector       | `Boolean`     | `false` | Defines whether the country selector should be shown in the navigation. |
| showSkipLink              | `Boolean`     | `true`  | Set to false if you need to remove skip-to-main-content link from the header. |

**Important:** if you're adding a new property to show/hide something on the navigation bar, you probably want to check the `hasNavigationLinks` computed property, since you might have to update it.

### CSS styles

The component is using utility css styles from [fozzie](https://github.com/justeat/fozzie/) package. You need to make sure to `@include trumps-utilities();` mixin to your application styles if you use beta version of fozzie package (>= v5.0.0-beta.0). If you are using main version (v4.X.X) styles should come out of the box.

### Events

The events that can be subscribed to are as follows (if any):

| Event | Description |
| ----- | ----------- |


## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-header` package:

```sh
$ cd packages/components/molecules/f-header
```

## Testing

### Unit, Integration and Contract

To test all components, run from root directory.
To test only `f-header`, run from the `./fozzie-components/packages/f-header` directory.

```sh
yarn test
```

### Running storybook

Storybook can be used to develop new and existing components.

To start storybook:

From the **root** directory run:

```sh
$ yarn storybook:serve
```

This will build and serve storybook at [http://localhost:6006](http://localhost:6006).
