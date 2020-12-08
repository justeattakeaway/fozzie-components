# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v0.43.3
------------------------------
*December 8, 2020*

### Fixed
- Remove tabindex from form element – results in visible border temporarily appearing around form when inputs are clicked.


v0.43.2
------------------------------
*December 7, 2020*

### Fixed
- All tests now run in component spec files.


v0.43.1
------------------------------
*December 2, 2020*

### Fixed
- Remove erroneous `>`.


v0.43.0
------------------------------
*November 20, 2020*

### Changed
- Margin at top of component updated for narrow widths.
- De-capitalised `name` on form labels.

### Fixed
- Generic error message updated to use `f-error-message` component.


v0.42.0
------------------------------
*November 18, 2020*

### Added
- `box-shadow` around component card.

### Changed
- Some minor spacing tweaks.


v0.41.0
------------------------------
*November 18, 2020*

### Added
- Underline for link `:hover` and `:focus` states.

### Changed
- Updating `f-button` to pull in new hover states.


v0.40.0
------------------------------
*November 17, 2020*

### Added
- Eyeglass sass config added so that the component can just import the base fozzie `index.scss`.

### Changed
- `Button.vue` replaced in favour of `f-button` component.
- Some small class name updates to make more consistent with our naming scheme.

### Removed
- `theme()` mixin as no longer needed.


v0.39.1
------------------------------
*November 5, 2020*

### Added
- Added f-error-message into dependencies for f-registration


v0.39.0
------------------------------
*November 3, 2020*

### Changed
- Added f-error-message for inline registration page errors

*October 28, 2020*

### Added
- Stylelint added to lint styling on build.

### Changed
- 'jet' theme instead of 'je'

### Removed
- System test mocks


v0.37.0
------------------------------
*October 22, 2020*

### Changed
- Various style to align better with designs.


v0.36.0
------------------------------
*October 20, 2020*

### Added
- Handling of 403 responses in `f-registration`.
- New prop to set the form AJAX call timeout.


v0.35.0
------------------------------
*October 16, 2020*

### Added
- Moved text into translations file
- Support for locale en-GB
- Emit VisitLoginPage event on login page click interaction

### Changed
- Prop for showing login link changed to boolean called `showLoginLink`


v0.34.0
------------------------------
*October 9, 2020*

### Added
- Emit CreateAccountStart event on first form interaction
- Emit CreateAccountInlineError event on field blur and fails validation

### Changed
- Updated CreateAccountFailure emit event to pass the valid & invalid fields in the payload


v0.33.0
------------------------------
*October 5, 2020*

### Added
- Emit CreateAccountFailure event when form is submitted with validation errors

### Changed
- Password field has no max length requirement
- Refactored unit tests to ensure failure event is emitted because of validation errors and not service failures


v0.32.0
------------------------------
*October 05, 2020*

### Changed
- Use the latest version of `f-form-field` to display form labels on desktop.


v0.31.0
------------------------------
*September 30, 2020*

### Added
- Accessibility tests that run as part of the pipeline


v0.30.0
------------------------------
*September 29, 2020*
### Added
- Added bag icon to registration component.


v0.29.0
------------------------------
### Changed
- Uses `JustEatBasis` font and new fozzie font size declarations.


v0.28.0
------------------------------
### Removed
- Contract tests + scripts


v0.27.0
------------------------------
*September 23, 2020*

### Changed
- Use the latest version of F-Card to apply top and bottom margins to the registration component


v0.26.2
------------------------------
*September 23, 2020*

### Changed
- Reverted syntax change in `RegistrationService` due to issues when running `yarn:demo`


v0.26.1
------------------------------
*September 21, 2020*

### Fixed
- RegistrationService import so that it can be used by contract tests


v0.26.0
------------------------------
*September 17 , 2020*

### Changed
- Validation for inputs now displayed when focus is lost

### Added
- Email input max length is now 50 characters
- Password input must be between 4 and 50 characters


v0.25.0
------------------------------
*September 17, 2020*

### Changed
- Updated `f-registration` component object to make tests pass


v0.24.0
------------------------------
*September 15, 2020*

### Changed
- Include Registration API service as part of npm package for use in Magikarp contract tests


v0.23.0
------------------------------
*September 15, 2020*

### Changed
- font-weight for the Button bold text is now 500


v0.22.0
------------------------------
*September 15, 2020*

### Changed
- font-weight for the Button bold text is now 600


v0.21.0
------------------------------
*September 10, 2020*

### Added
- `registrationSource` and `marketingPreferences` to account creation post request body.


v0.20.0
------------------------------
*September 9, 2020*

### Added
- Integration tests


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
