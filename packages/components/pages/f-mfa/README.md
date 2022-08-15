<div align="center">

# f-mfa

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Multi-factor Authenticator - Input Form

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-mfa.svg)](https://badge.fury.io/js/%40justeat%2Ff-mfa)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-mfa/badge.svg)](https://coveralls.io/github/justeat/f-mfa)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-mfa/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-mfa?targetFile=package.json)

---
This form is for accepting a MFA token that has been sent to a user, then submitting it to be verified, if successful then an event to passed to the parent component to return the user to where they came from.

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-mfa
```

```sh
npm install @justeat/f-mfa
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import VMfa from '@justeat/f-mfa';
import '@justeat/f-mfa/dist/f-mfa.css';

export default {
    components: {
        VMfa
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `v-mfa` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-mfa/dist/f-mfa.css';

export default {
    components: {
        // …
        VMfa: () => import(/* webpackChunkName: "v-mfa" */ '@justeat/f-mfa')
    }
}
```

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop        | Type   | Required |  default | Description |
| ----------- | ------ | -------- | -------- | ----------- |
| validateUrl | string | true     | n/a      | The URL to POST the MFA validation request to. |
| code        | string | false    | `''`     | The MFA token to POST to the API |
| email       | string | false    | `''`     | The email to display on the page |
| returnUrl   | string | false    |  `/`     | The URL to return the user to upon success |

### Events

| Event | Payload | Description |
| ----- | ----- | ----------- |
| `mfa-success-return-url` | return url (no host) |  The mfa & otp have been successfully submitted and the user is now logged in, the payload of the event carries the return url (path only, no host and a leading `'/'`, i.e. `/where/i/came/from` ). |

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-mfa` package:

```sh
$ cd packages/components/pages/f-mfa
```

## Testing

To test all components, run from root directory.
To test only `f-mfa`, run from the `./fozzie-components/packages/components/pages/f-mfa` directory.

### Unit and Integration tests

```sh
yarn test
```

### Component and Accessibility Tests

```bash
# Note: Ensure Storybook is running when running the following commands
cd ./fozzie-components

yarn storybook:build
yarn storybook:serve-static

yarn test-component:chrome
yarn test-a11y:chrome
```
