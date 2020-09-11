# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v0.20.0
------------------------------
*September 10, 2020*

### Added
- `registrationSource` and `marketingPreferences` to account creation post request body.


v0.19.0
------------------------------
*September 7, 2020*

### Added
- `consumer` folder for consumer pact tests
- `test:consumer` script to execute consumer pact tests

### Changed
- `testEnvironment` in `package.json` for consumer pact tests
- `modulePathIgnorePatterns` in `jest.config.js`


v0.18.0
------------------------------
*September 4, 2020*

### Added
- Legal text and relevant hyperlinks


v0.17.0
------------------------------
*September 1, 2020*

### Added
- WebDriverIO component tests


v0.16.0
------------------------------
*August 28, 2020*

### Changed
- Remove tenant prop and infer from locale prop instead.


v0.15.0
------------------------------
*August 26, 2020*

### Changed
- Update button colour to orange.


v0.14.0
------------------------------
*August 21, 2020*

### Changed
- Validation message for conflicting email address.


v0.13.0
------------------------------
*August 19, 2020*

### Added
- Wiremock files for Nuxt system tests

### Changed
- Changed folder structure for test utils.


v0.12.0
------------------------------
*August 13, 2020*

### Added
- `f-registration.page.js` for use within WebDriverIO test frameworks.
- New `data-test-id` attributes for f-registration error selectors.


v0.11.1
------------------------------
*August 7, 2020*

### Changed
- Unit tests cleaned up in Registration.test.js


v0.11.0
------------------------------
*August 6, 2020*

### Added
- Validation on First name and Last name regarding max length and invalid characters


v0.10.0
------------------------------
*August 3, 2020*

### Fixed
- Update expected structure of the axios error object to show custom 409 error message


v0.9.2
------------------------------
*July 31, 2020*

### Fixed
- Changed property name of POST object from `email` to `emailAddress`.


v0.9.1
------------------------------
*July 28, 2020*

### Changed
- Vue CLI minor package updates.
- Small update to colours from updating to `fozzie-colour-palette` in the mono-repo root.


v0.9.0
------------------------------
*July 15, 2020*

### Changed
- Update registration component to handle AccountWeb API endpoint.
- Updating colour variables to use new versions set in `fozzie-colour-palette`.

### Added
- Accessibility add-on to Storybook story.


v0.7.1
------------------------------
*June 12, 2020*

### Changed
- Added space between login preLinkText and linkText.


v0.7.0
------------------------------
*June 11, 2020*

### Changed
- Storybook category updated to `Organisms`.

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
