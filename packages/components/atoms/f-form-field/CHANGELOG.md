# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v1.20.0
------------------------------
*July 22, 2021*

### Added
- `labelDetails` and `assistiveText`.
- Styling to placeholder.


v1.19.0
------------------------------
*July 22, 2021*

### Added
- Leading and Trailing icon slots.
- Tests to cover changes.


v1.18.0
------------------------------
*July 22, 2021*

### Changed
- Made text area data test id dynamic based on name attribute


v1.17.0
------------------------------
*July 19, 2021*

### Changed
- Updates to match PIE designs.
- Disabled label style.

### Added
- `fieldSize` prop.


v1.16.1
------------------------------
*June 30, 2021*

### Changed
- Label description class name.
- Label description from `<p>` to `<span>`.
- Background colours to `common.scss`


v1.16.0
------------------------------
*June 28, 2021*

### Fixed
- Hover state to be consistent across all field types.
- First grouped form field to have correct `border-radius`.


v1.15.1
------------------------------
*June 15, 2021*

### Fixed
- Clicking exactly on the arrow icon did not open the dropdown


v1.15.0
------------------------------
*June 11, 2021*

### Changed
- Default value of `maxNumber` to `undefined`
- Default value of `minNumber` to `undefined`


v1.14.0
------------------------------
*May 25, 2021*

### Changed
- CSS variables to use pie design tokens instead of fozzie-colour-palette vars


v1.13.0
------------------------------
*May 25, 2021*

### Fixed
- `isSelectionControl` was back-to-front and was true when not a selector like checkbox or radio. This has been fixed.
- `c-formField-field--focus` switched to `c-formField-field--noFocus` class.


v1.12.1
------------------------------
*May 18, 2021*

### Added
- Added back missed css class to the textarea element
- Wrapped input description slot into a p html element


v1.12.0
------------------------------
*May 17, 2021*

### Added
- Textarea element to the formField component

v1.11.0
------------------------------
*April 28, 2021*

### Added
- Extended the `Type` values to include `tel` for telephone fields.


v1.10.1
------------------------------
*April 14, 2021*

### Fixed
- Duplicate firing of `input` and `update` events.


v1.10.0
------------------------------
*April 13, 2021*

### Added
- Support for `number` input type.
  - Includes two new optional props, `minNumber` and `maxNumber`.

### Fixed
- vuejs-accessibility violation [`form-control-has-label`](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/1cb838c853af763ac4d77467cdcd790f6896a810/docs/form-control-has-label.md)


v1.9.0
------------------------------
*March 30, 2021*

### Added
- New `value` prop to `FormDropdown` component to make the selected value assignable programmatically.
  - This is done by passing down the existing `value` prop from the parent `FormField` component.

### Changed
- Restructured component object into page object model
- Refactored accessibility tests


v1.8.0
------------------------------
*January 27, 2021*

### Changed
- `dropdownOptions` prop should now be an array of objects with the properties `text` and `value` rather than an array of strings.


v1.7.0
------------------------------
*January 14, 2021*

### Changed
- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.

### Fixed
- Axe accessibility violation: `Ensures every form element has a label`


v1.6.1
------------------------------
*December 9, 2020*

### Fixed
- Styling on grouped fields with errors


v1.6.0
------------------------------
*December 9, 2020*

### Added
- Grouped fields selection and styles.


v1.5.0
------------------------------
*December 3, 2020*

### Changed
- `data-test-id`'s updated across `FormField` and `FormDropdown` components.
- Updating CSS variable names and classnames.
- Updated `isInputField` to be called `isSelectionControl`.

### Fixed
- Extra space removed in `option` tag of dropdown component.


v1.4.0
------------------------------
*November 30, 2020*

### Changed
- `padding` and `font-size` for inline label.
- `fill` for dropdown arrow, `color` and `background` hover state.


v1.3.0
------------------------------
*November 20, 2020*

### Added
- Focus and Active styles for `text`, `password`, `dropdown`, and `email` inputs.

### Changed
- Inline label `font-weight` and `color`.


v1.2.0
------------------------------
*November 19, 2020*

### Added
- New `dropdown` module.


v1.1.0
------------------------------
*November 13, 2020*

### Changed
- Updating tests, test hooks (and removing `data-js-test` attribute).


v1.0.0
------------------------------
*November 9, 2020*

### Changed
- Added styles for error state and disabled state of form input.


v0.9.0
------------------------------
*November 6, 2020*

### Changed
- Style of default form-field and label updated in line with PIE designs (colours, border-radius, font-size etc).


v0.8.0
------------------------------
*October 23, 2020*

### Added
- data-test IDs to FormField Component
- Test for FormField
- FormField Component-Object


Latest (to be added to next release)
------------------------------
*October 26, 2020*

### Added
- Stylelint added to lint styling on build.

### Changed
- 'jet' theme instead of 'je'


v0.7.1
------------------------------
*September 29, 2020*

### Changed
- `debounce.js` lint issue and timeout variable name.
- `labelStyle` test setup.


v0.7.0
------------------------------
*September 29, 2020*

### Added
- `inlineNarrow` label style that changes label positioning based on window size.
- `form-field` tests for `inlineNarrow` style.

### Changed
- `babel.config.js` to match other packages as it was causing `ReferenceError: regeneratorRuntime is not defined`.


v0.6.0
------------------------------
*June 23, 2020*

### Changed
- Changing `data-theme` to `data-theme-formfield` to avoid clashing with any other components in the future.
- Vue CLI minor package updates.
- Updating colour of input label and border.

*July 2, 2020*

### Added
- Accessibility add-on to Storybook story.

*June 4, 2020*

### Changed
- Updating colour variables to use new versions set in `fozzie-colour-palette`.
- ESLint autofix turned off (so that tests don't pass due to `--fix` being applied, but then publish subsequently fails)


v0.5.0
------------------------------
*May 29, 2020*

### Added
- `data-test-id` attribute to the input element.


v0.4.0
------------------------------
*May 26, 2020*

### Added
- Component now emits an event when its value is updated. This is so that validation applied to the consuming form component knows when to run on the field.
- Unique ID applied to form input so that clashes between fields doesn't occur.
- Named slot for error message markup to be passed through from a consuming form.

### Changed
- Wrapper element added around the input field, to accommodate error message placement.
- `for` attribute moved from inside the `FormLabel` component and is now applied in the `FormField` component, so that it can make use of passed in `$attrs`.


v0.3.0
------------------------------
*May 18, 2020*

### Changed
- Adding spacing between two adjacent form-fields.
- Structure of Storybook stories changed to CSF (Component Story Format) – the new recommended way to write stories.


v0.2.0
------------------------------
*May 12, 2020*

### Added
- Added some simple initial tests.

### Changed
- Updating `vue-test-utils` to v1 and `@vue/cli-plugin-unit-test` to v4.3.1.
- Use `node current` in unit test Babel config, so that it supports `async > await` properly.

### Removed
- `testMatch` from jest config, as not needed.


v0.1.0
------------------------------
*May 1, 2020*

### Added
- Component structure and basic configuration (created using `generator-component`).
- Component markup and core functionality.
- Storybook config.
