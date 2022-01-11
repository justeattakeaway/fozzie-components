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

The form component is only available for creating basic forms. It can be used to collect data from text inputs.

Fields can have two types of error checks:
  * **required** if the field is required to submit the form
  * **invalid** if the field needs to be checked against field type. Existing available validation checks can be added for:

| Type check | Available Tenants |
| --- | --- |
| `email` | all |
| `mobilePhone` | `en-GB`, `es-ES`, `en-AU`, `en-NZ` |
| `postcode` | `en-GB`, `es-ES`, `en-AU`, `en-NZ` |

To add validation messages, `validationMessages` should be provided via translations for the individual form field. ([to see how click here](#Props))
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
import FForm from '@justeat/f-form';
import '@justeat/f-form/dist/f-form.css';

export default {
    components: {
        FForm
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
        * **validationMessages** - an object that can contain two types of validation messages:
            * **required** - the validation message that will be displayed if a field is required
            * **invalid** - the validation message that will be displayed if a field needs to match standard character requirements.
              > **Currently available invalid field checks**
                mobileNumber, email, postcode
 *  **buttonText** - The text displayed on the form's action button, this defaults to 'Submit'.

> **Example `formData`**
```
formData: {
    formFields: [
        {
            name: 'firstName',
            value: '',
            translations: {
                label: 'First Name',
                validationMessages: {
                    required: 'Enter First Name'
                }
            }
        },
        {
            name: 'lastName',
            value: '',
            translations: {
                label: 'Last Name'
            }
        },
        mobileNumber: {
            name: 'mobileNumber',
            value: '',
            translations: {
                label: 'Mobile Number',
                validationMessages: {
                    required: 'Enter Mobile Number',
                    invalid: 'Enter valid Mobile Number'
                }
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
| `locale` | String | `en-GB` | Sets the translation file to use. |
| `isFormSubmitting` | Boolean | false | Allows the parent component to set a loading spinner on the submit button while any asynchronous calls are carried out by the parent |

### Events

The events that can be subscribed to are as follows (if any):

| Event | Description |
| ----- | ----------- |
| `updated` | When any form field is updated will send `{ fieldName, value }` |
| `form-submitting` | When the submit button is pressed |
| `form-valid` | When the submit button is pressed and form has no validation errors. |
| `form-invalid` | When the submit button is pressed and form has validation errors. |

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


