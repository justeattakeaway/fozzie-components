<div align="center">

# f-registration

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Registration Component.

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-registration.svg)](https://badge.fury.io/js/%40justeat%2Ff-registration)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-registration/badge.svg)](https://coveralls.io/github/justeat/f-registration)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-registration/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-registration?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-registration
```

```sh
npm install @justeat/f-registration
```

### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import RegistrationComponent from '@justeat/f-registration';
import '@justeat/f-registration/dist/f-registration.css';

export default {
    components: {
        RegistrationComponent
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `f-registration` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-registration/dist/f-registration.css';

export default {
    components: {
        // …
        RegistrationComponent: () => import(/* webpackChunkName: "vue-registration" */ '@justeat/f-registration')
    }
}
```

## Configuration

### Props

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |
| `local` | `String` | `en-gb` | Sets the translation file to use. |
| `createAccountUrl` | `String` | Required | URL to register a new user account. |
| `createAccountTimeout` | `Number` | `1000` | Timeout when submitting the registration form. |
| `showLoginLink` | `Boolean` | Required | If `true`, 'Already on Just Eat` login link will be displayed. |
| `loginUrl` | `String` | Required | URL to forward the user to on navigation to the login page. |

### Events

| Event | Description |
| ----- | ----------- |
| `registration-create-account-success` | Registration form has been successfully submitted. |
| `registration-create-account-failure` | Registration form submission has failed. |
| `registration-create-account-start` | User has begun interacting with registration form. |
| `registration-create-account-inline-error` | Validation on form fields has failed. |
| `registration-visit-login-page` | User clicked 'Already on Just Eat` login link. |
| `registration-login-blocked` | 'FailedUserAuthentication' error has been returned when submitting the registration form. |

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-registration` package:

```sh
$ cd packages/components/molecules/f-registration
```

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-registration` package:

```sh
$ cd packages/components/molecules/f-registration
```

## Testing

### Unit, Integration and Contract

To test all components, run from root directory.
To test only `f-registration`, run from the `./fozzie-components/packages/f-registration` directory.

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
