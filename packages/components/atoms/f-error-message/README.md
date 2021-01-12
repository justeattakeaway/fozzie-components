
<div align="center">
  <h1>f-error-message</h1>

  <img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

  <p>Generic inline error message</p>
</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-error-message.svg)](https://badge.fury.io/js/%40justeat%2Ff-error-message)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-error-message/badge.svg)](https://coveralls.io/github/justeat/f-error-message)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-error-message/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-error-message?targetFile=package.json)


## Usage

### Installation

This package can be installed using npm or yarn:

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import ErrorMessage from '@justeat/f-error-message';
import '@justeat/f-error-message/dist/f-error-message.css';

export default {
    components: {
        ErrorMessage
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `error-message` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-error-message/dist/f-error-message.css';

export default {
    components: {
        ...
        ErrorMessage: () => import(/* webpackChunkName: "error-message" */ '@justeat/f-error-message')
    }
}

```

## Configuration

### Props

`f-error-message` does not expose any props.

```js
<error-message>Default error message</error-message>
```

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-error-message` package:

```sh
$ cd packages/components/atoms/f-error-message
```

### Running storybook

Storybook can be used to develop new and existing components.

To start storybook:

> Please ensure you are in the f-error-message directory as outlined in the above instructions.

```sh
# cd to the storybook package
$ cd ../../../storybook

# Run storybook
$ yarn storybook:serve
```

This will build and serve storybook at [http://localhost:8080](http://localhost:8080).
