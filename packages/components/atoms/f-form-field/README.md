<div align="center">

# f-form-field

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Fozzie Form Field Component.

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-form-field.svg)](https://badge.fury.io/js/%40justeat%2Ff-form-field)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-form-field/badge.svg)](https://coveralls.io/github/justeat/f-form-field)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-form-field/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-form-field?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-form-field
```

```sh
npm install @justeat/f-form-field
```

### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';

export default {
    components: {
        FormField
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `f-form-field` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-form-field/dist/f-form-field.css';

export default {
    components: {
        // …
        FormField: () => import(/* webpackChunkName: "form-field" */ '@justeat/f-form-field')
    }
}
```

## Configuration

### Props

There may be props that allow you to customise its functionality.

The props that can be defined are as follows (if any):

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |
| `locale` | `String` | `''` | Sets locale for I18n. |
| `labelText` | `String` | `''` | The text that will be displayed in the form field label. |
| `inputType` | `Sting` | `text` | The type of input needed. <br>Options: `text`, `email`, `password`, `radio`, `checkbox` |
| `labelStyle` | `String` | `'default'` | Defines where the label will be rendered in relation to the form field. <br>Options: <br>`default` - Displays the label above the form field, <br>`inline` Displays the label inside the form field,<br>`inlineNarrow` Displays the label above the form field when in web/tablet. Displays the label inside the form field when in mobile.<br>|
| `value` | `String` or `Number` | `''` | The value of the form field. |
| `hasError` | `Boolean` | `false` | When `true` border colour changes to red. |
| `dropdownOptions` | `Array` | `null` | The options to be displayed in the dropdown. |
| `isGrouped` | `Boolean` | `false` | When `true` will remove margin between all grouped form fields. |

### Events

The events that can be subscribed to are as follows (if any):

| Event | Description |
| ----- | ----------- |
| `input` | Fired when a user changes the value of the form field, args contain details of the change and it's context. |

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-form-field` package:

```sh
$ cd packages/components/molecules/f-form-field
```

## Testing

### Unit, Integration and Contract

To test all components, run from root directory.
To test only `f-form-field`, run from the `./fozzie-components/packages/f-form-field` directory.

```sh
yarn test
```

### Component Tests

```bash
# Run Component tests for all components
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components

yarn storybook:build
yarn storybook:serve-static
yarn test-component:chrome
```

OR

```bash
# Run Component tests for f-form-field
# Note: Ensure Storybook is not running when running the following commands
cd ./fozzie-components/packages/f-form-field
yarn test-component:chrome
```


## Documentation to be completed once module is in stable state.
