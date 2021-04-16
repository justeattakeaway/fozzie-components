## [1.10.1](https://github.com/justeat/fozzie-components/compare/v1.0.0...v1.10.1) (2021-04-16)


### Bug Fixes

* **fozzie-components:** fix formatting of all changelogs ([5301ad6](https://github.com/justeat/fozzie-components/commit/5301ad6fd4f2783c5894177dc1f6e9dbe639d1fb))
* **fozzie-components:** fix yarn.lock ([926c1ec](https://github.com/justeat/fozzie-components/commit/926c1ec14693e35c286a9b295901ea785373c35d))
* **fozzie-components:** follow conventional changelog format ([a4ef63f](https://github.com/justeat/fozzie-components/commit/a4ef63f131670340c035ffe4509bff1214fd6536))
* **fozzie-components:** update package.json ([a1e99eb](https://github.com/justeat/fozzie-components/commit/a1e99eb937c414a2e23c759dcb269bb75fc85bee))


### Features

* **fozzie-components:** adds commitizen support and husky / git hook support ([11c1026](https://github.com/justeat/fozzie-components/commit/11c10261d45ce2e9bfa89b026cf85d8cf52b5d63))
* **fozzie-components:** enforce commit messages to follow conventional commit format ([131eeb1](https://github.com/justeat/fozzie-components/commit/131eeb152b7b384d4054791cf535db403b9239ac))
* **fozzie-components:** enforce conventional commits with husky hook ([3d8f4aa](https://github.com/justeat/fozzie-components/commit/3d8f4aa6e0a05273d5962fae3937ac281aebce70))
* **fozzie-components:** runs linting against changed packages ([75fdfb6](https://github.com/justeat/fozzie-components/commit/75fdfb6546224ebb8621deadecd911f2cb96dfc8))



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
