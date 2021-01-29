<!--suppress SpellCheckingInspection -->
<div align="center">

# f-services

<img width="125" alt="Fozzie Bear" src="../../../bear.png" />

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-services.svg)](https://badge.fury.io/js/%40justeat%2Ff-services)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-services/badge.svg)](https://coveralls.io/github/justeat/f-services)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-services/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-services?targetFile=package.json)

## Usage

### Installation

Install the module using NPM or Yarn:

```sh
yarn add @justeat/f-services
```

```sh
npm install @justeat/f-services
```

### Import the package

You can import it in your component/application like this (please note that styles have to be imported separately)

```js
import { windowServices } from '@justeat/f-services';

// You can then (optionally) destructure
const { addEvent, getWindowWidth, removeEvent } = windowServices;

```

If you are using Webpack, you can import the component dynamically to separate the services bundle from the main `bundle.client.js`:

### Services in the bundle:

----

#### Axios

##### `createClient`

Create an axios client.
##### `createCamelCaseClient`

Create an axios client with all response JSON transformed to camelCase.

##### `getNetworkDetails`

Uses the navigator API (falling back to moz/webkit) to return network information.

##### `objectToCamelCase`

Recursively converts object's property names to camelCase.

----

#### Globalisation

##### `getLocale`

Returns the locale for the current tenant, if the configuration for that locale is present, otherwise returns the default locale.

##### `getTheme`

Returns the theme based on the user's locale. Either `ml` for Menulog or `je` for Just Eat.

----

#### Window

Uses the `window-or-global` module for SSR compatibility.

##### `addEvent`

Add an event listener with a callback function. Optional throttling. Returns the function that will be called by the listener.

##### `getWindowHeight`

Returns the current innerHeight.

##### `getWindowWidth`

Returns the current innerWidth.

##### `removeEvent`

Remove an event listener. To remove a throttled event, pass in the value returned by `addEvent` when the listener was added.

----

#### Utilities

##### default export

Returns a deep object by traversing following the provided path.

----

#### Validations

##### `getFormValidationState`

Returns an object containing arrays of the names of valid and invalid validation rules.

##### `isValidPostcode`

Returns a boolean indicating whether the provided postcode is valid in the provided locale.

##### `isValidPhoneNumber`

Returns a boolean indicating whether the provided phone number is valid in the provided locale.x
