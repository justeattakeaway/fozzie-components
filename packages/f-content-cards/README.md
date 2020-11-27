<div align="center">
  <h1>f-content-cards</h1>

  <img width="125" alt="Fozzie Bear" src="../../bear.png" />

  <p>Content cards component</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-content-cards.svg)](https://badge.fury.io/js/%40justeat%2Ff-content-cards)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-content-cards/badge.svg)](https://coveralls.io/github/justeat/f-content-cards)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-content-cards/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-content-cards?targetFile=package.json)

## Prerequisites

### Appboy (Braze SDK)

This component requires Braze SDK credentials and an associated User ID to invoke calls to the Braze service.

If credentials are not provided the component will attempt to use any instances of appboy that have been initialised on `window.appboy`.

### Vue

This component requires Vue to render. This can either be implemented as part of an existing Vue application or as a micro front-end.

If implementing Vue as part of a static application, we recommend using the following CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>
```

> More information can be found at [https://vuejs.org/v2/guide/installation.html#Direct-lt-script-gt-Include](https://vuejs.org/v2/guide/installation.html#Direct-lt-script-gt-Include)

### yarn

This package is a lerna monorepo that makes use of yarn workspaces.

yarn can be installed with the following curl script:

```bash
curl -o- -L https://yarnpkg.com/install.sh | bash
```

> More information can be found at [https://classic.yarnpkg.com/en/docs/install/#mac-stable](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

## Usage

#### Installation

This package can be installed using npm or yarn:

```bash
# npm
$ npm i @justeat/f-content-cards

# yarn
$ yarn add @justeat/f-content-cards
```

### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import ContentCards from '@justeat/f-content-cards';
import '@justeat/f-content-cards/dist/f-content-cards.css';

export default {
    components: {
        ContentCards
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the header bundle from the main `bundle.client.js`:

```
import '@justeat/f-content-cards/dist/f-content-cards.css';

export default {
    components: {
        ...
        ContentCards: () => import(/* webpackChunkName: "f-content-cards" */ '@justeat/f-content-cards')
    }
}
```

### Non-Vue Applications

This module can be ran as a micro front-end for applications that don't make use of the Vue framework.

The following rudimentary example can be used as a guide for implementing this component in an existing static application:

```html
<!doctype html>
<html lang="en">
<head>
    <title>Content Cards Example</title>
    <link rel="stylesheet" href="node_modules/@justeat/f-content-cards/dist/f-content-cards.css">
</head>
<body>
    <div data-content-card>
        <content-cards />
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="node_modules/@justeat/f-content-cards/dist/f-content-cards.umd.min.js"></script>
    <script>
        (function() {
            if (typeof Vue === 'undefined') return null;

            Vue.config.devtools = false;
            Vue.config.productionTip = false;

            return new Vue({
                el: '[data-content-card]',
            });
    	})()
    </script>
</body>
</html>
```

## Configuration

The following props can be used to configure the component:

### `api-key`

**Type:** string
**Required:** false

The Braze SDK api key.

> If no apiKey is provided the component will look for an existing appboy implementation at `window.appboy`.

### `brands`

**Type:** array
**Required:** false

List of brands for user's current postcode.

> Only required when displaying Home Promotion Card 1 and 2

### `user-id`

**Type:** string
**Required:** false

The Braze User ID associated to the current authenticated user.

> If no userId is provided the component will look for an existing appboy implementation at `window.appboy`.

### `enabled-card-types`

**Type:** array
**Required:** false

An array of custom content card types to display.

> If no array is passed the component will default to showing all supported content card types.

### `locale`

**Type:** string
**Required:** true _if_ [vue-i18n](https://kazupon.github.io/vue-i18n/) plugin not used by consuming application

Locale in `lang_COUNTRY` format - e.g. `en-GB`

### `pushToDataLayer`

**Type:** function
**Required:** false

A callback for feeding back analytics regarding content cards to the consuming application

> If no function is passed then this will be replaced with a noop function

### `testId`

**Type:** string
**Required:** false

Indicates the test id attribute of the component root element.

> If this is missing or nully, all child components will also be rendered without test id
> attributes.

### `showLoadingState`

**Type:** boolean
**Required:** false

Whether or not to show a skeleton loading state whilst initialising Braze. Defaults to `true`.
For configurations where the enabled card types includes cards other than Post Order cards, the
number of loading state cards shown is limited to the lowest of either `3` or the limit set in
`cardLimit`

### `cardLimit`

**Type:** number
**Required:** false

Limit the amount of cards to show. Defaults to `-1` which shows all cards.

## Events

The following events can be emitted by the component, with the shape given:

### `@voucherCodeClick`

```json5
{
    "url": "http://example.org/test" // Forwarding Url for the card containing the voucher code that was clicked
}
```

### `@custom-cards-callback`

Called with a function that can be used by the consuming code to inject custom content cards

### `@on-braze-init`

Called with the appboy instance once appboy has initialised.

### `@get-card-count`

Called with a number outlining the total card count once Appboy has initialised.

### `@has-loaded`

Called with a boolean indicating that the component has initialised.

### `@on-error`

Called with an Error object if appboy fails to initialise.

## Development

Start by cloning the repository and installing the required dependencies:

```bash
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-content-cards` package:

```bash
$ cd packages/f-content-cards
```

### Running the demo

This package comes with a demo application which can be accessed as follows:

> Please ensure you are in the f-content-card directory as outlined in the above instructions.

```sh
$ yarn demo
```

### Running storybook

Storybook can be used to develop new and existing components.

To start storybook:

> Please ensure you are in the f-content-card directory as outlined in the above instructions.

```bash
# cd to the storybook package
$ cd ../storybook

# Run storybook
$ yarn storybook:serve
```

This will build and serve storybook at [http://localhost:6006](http://localhost:6006).

## Issues

Feel free to submit issues and enhancement requests.

Please use [Fozzie Components Issues](https://github.com/justeat/fozzie-components/issues) specific bugs and errors.

## Contributing

1. Optional: Fork the repo on github
2. Clone the project to your own machine
3. Create your own branch (This should follow the pattern *component-name@version* e.g. *f-content-cards@1.0.0*).
4. Ensure you've bumped the package version and added a CHANGELOG entry.
4. Push your work (Commit messages should follow the pattern *component-name@version - commit description* e.g. *f-content-cards@1.0.0 - Update README*)
5. Submit a pull request

### Versioning

Our versioning format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

For more information on versioning and previous examples please see the [CHANGELOG](CHANGELOG.md).

### Deployment

Once your change has been merged you must tag, push and deploy your changes using `yarn publish` or `npm publish`.

```sh
# Checkout master
$ git checkout master

# Check your PR was the last commit
$ git log

# Add a tag (Replacing 0.0.0 with the version)
$ git tag f-content-card@0.0.0

# Push tags
$ git push --tags

# Optional: cd to f-content-cards package
$ cd packages/f-content-cards

# Publish
$ yarn publish
```

## License

This project is licensed under the Apache v2.0 License - see the [LICENSE](LICENSE) file for details.
