# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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
