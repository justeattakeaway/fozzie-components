<div align="center">

# f-form

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Generic form component for creating basic forms. Can be used to collect data from text inputs.

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-form.svg)](https://badge.fury.io/js/%40justeat%2Ff-form)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-form/badge.svg)](https://coveralls.io/github/justeat/f-form)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-form/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-form?targetFile=package.json)

---

## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-form
```

```sh
npm install @justeat/f-form
```


The package also has dependencies that need to be installed by consuming components/applications:

| Dependency     | Command to install                   | Styles to include                                       |
| -----          | -----                                | -----                                                   |
| f-button       | `yarn add @justeat/f-button`         | `import '@justeat/f-button/dist/f-button.css';`         |
| f-form-field   | `yarn add @justeat/f-form-field`     | `import '@justeat/f-form-field/dist/f-form-field.css';` |


### Vue Applications

You can import it in your Vue SFC like this (please note that styles have to be imported separately):

```js
import VForm from '@justeat/f-form';
import '@justeat/f-form/dist/f-form.css';

export default {
    components: {
        VForm
    }
}
```

If you are using Webpack, you can import the component dynamically to separate the `v-form` bundle from the main `bundle.client.js`:

```js
import '@justeat/f-form/dist/f-form.css';

export default {
    components: {
        // …
        VForm: () => import(/* webpackChunkName: "v-form" */ '@justeat/f-form')
    }
}
```

## Configuration

### Props

To add fields to the form, and text to the form button, a `formData` Object prop should be passed in. The `formData` Object should contain:
 * **formFields** - ` Array of objects. Object should include
    * **name** - The field name that data should be stored under
    * **value** - The value of the field. When not set, this defaults to ''.
    * **translations** - an object containing:
        * **label** - the field's displayed text label
 *  **buttonText** - The text displayed on the form's action button

> **Example `formData`**
```
formData: {
    formFields: [
        {
            name: 'firstName',
            value: '',
            translations: {
                label: 'First Name'
            }
        },
        {
            name: 'lastName',
            value: '',
            translations: {
                label: 'Last Name'
            }
        }
        ...
    ],
    buttonText: 'Continue'
}
```

| Prop  | Type  | Default | Description |
| ----- | ----- | ------- | ----------- |
| `formData` | Object | **Required Prop** | Object containing button text and form field data. Should be structured as above. |
| `isFormSubmitting` | Boolean | false | Allows the parent component to set a loading spinner on the submit button while any asynchronous calls are carried out by the parent |

### Events

The events that can be subscribed to are as follows (if any):

| Event | Description |
| ----- | ----------- |
| `updated` | When any form field is updated will send `{ fieldName, value }` |
| `form-submitting` | When the submit button is pressed |

## Development

Start by cloning the repository and installing the required dependencies:

```sh
$ git clone git@github.com:justeat/fozzie-components.git
$ cd fozzie-components
$ yarn
```

Change directory to the `f-form` package:

```sh
$ cd packages/components/organisms/f-form
```

## Testing

To test all components, run from root directory.
To test only `f-form`, run from the `./fozzie-components/packages/components/organisms/f-form` directory.

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


