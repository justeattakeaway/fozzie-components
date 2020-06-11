# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v0.7.0
------------------------------
*June 11, 2020*

### Changed
- Storybook category updated to `Organisms`.

Latest (rolled into next release)
------------------------------
*June 9, 2020*

### Added
- Login link to registration component.


v0.6.0
------------------------------
*June 2, 2020*

### Added
- Create account API call when clicking create account button


v0.5.0
------------------------------
*May 26, 2020*

### Added
- `Vuelidate` package added for validation of form inputs. Validation currently set-up to show to form submission.
- Error messages for error states and styling for error messages (needs to be in the form rather than on the input because of the way CSS Modules works – the plan will be to move this styling to a more generic `f-form` component down the line).
- `name` attributes added to each form field component.
- Added base `typography` file to the demo component so that it shows how the component will look with the global fozzie typographic styles applied (global styles like this will be made available as a separate include that is imported into each component in the future).

### Changed
- Stubbed `.css` file module imports as was causing build error.


v0.4.0
------------------------------
*May 18, 2020*

### Added
- Added Storybook file to include component in documentation component library.

### Changed
- `f-card` and `f-form-field` now used in the registration component in place of inline components.
- Added props for component `title` and `buttonText`.
- Changed `theme` data attribute to be more specific to component.


v0.3.0
------------------------------
*May 14, 2020*

### Added
- Added `data-test-id` for input elements in `f-registration`.

### Changed
- Updating `vue-test-utils` to v1 and `@vue/cli-plugin-unit-test` to v4.3.1.

### Removed
- `testMatch` from jest config, as not needed.


v0.2.0
------------------------------
*April 17, 2020*

### Added
- `f-registration` base HTML structure and styling has been added.

### Changed
- Components separated out into separate `.vue` files.


v0.1.0
------------------------------
*April 7, 2020*

### Added
- `f-registration` component structure and config.
