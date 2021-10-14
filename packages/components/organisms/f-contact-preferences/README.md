<div align="center">

# f-contact-preferences

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Fozzie user contact preferences form component

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-contact-preferences.svg)](https://badge.fury.io/js/%40justeat%2Ff-contact-preferences)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-contact-preferences/badge.svg)](https://coveralls.io/github/justeat/f-contact-preferences)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-contact-preferences/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-contact-preferences?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-contact-preferences
```

```sh
npm install @justeat/f-contact-preferences
```



### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import ContactPreferences from '@justeat/f-contact-preferences';
import '@justeat/f-contact-preferences/dist/f-contact-preferences.css';

export default {
    components: {
        ContactPreferences
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `contact-preferences` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-contact-preferences/dist/f-contact-preferences.css';

export default {
    components: {
        // …
        ContactPreferences: () => import(/* webpackChunkName: "contact-preferences" */ '@justeat/f-contact-preferences')
    }
}
```

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |

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

Change directory to the `f-contact-preferences` package:

```sh
$ cd packages/components/organisms/f-contact-preferences
```

## Testing

To test all components, run from root directory.
To test only `f-contact-preferences`, run from the `./fozzie-components/packages/components/organisms/f-contact-preferences` directory.

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
```

yarn test-component:chrome
```
### Accessibility tests
```bash
yarn test-a11y:chrome
```
## Documentation to be completed once module is in stable state.


