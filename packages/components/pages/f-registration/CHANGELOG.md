# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v3.14.1

_April 29, 2024_

### Changed

- Bump `@vue/cli-plugin-babel` from v5.0.0 to v5.0.8


## v3.14.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14
- `@vue/cli-plugin-babel` to 5.0.0 to resolve snyk vulnerability

## v3.13.3

_June 26, 2023_

### Changed

- Terms and Conditions link for NZ.

## v3.13.2

_May 29, 2023_

### Changed

- Terms and Conditions link for AU.

## v3.13.1

_December 8, 2022_

### Added

- `crypto` setup file to handle `getRandomValues` within jest tests. This logical stems from `f-form-field`'s use of UUID.

## v3.13.0

_November 8, 2022_

### Changed

- Added fozzie components as externals in Webpack config (via the PR hokey-cokey)

## v3.12.0

_November 7, 2022_

### Changed

- Reverting externals change so can test CoreWeb integration further

## v3.11.0

_November 4, 2022_

### Changed

- Removed asterisks from registration page form fields

## v3.10.0

_November 2, 2022_

### Changed

- Added fozzie components as externals in Webpack config.

## v3.9.0

_October 28, 2022_

### Changed

- Visual tests to include new tenants
- Updated Story file to use Storybook `Controls`.

## v3.8.0

_October 27, 2022_

### Changed

- Update component to use Vue I18n.
- Added translations for form error message.

## v3.7.2

_October 13, 2022_

### Changed

- Added translations for es-ES, en-IE and it-IT.

## v3.7.1

_October 03, 2022_

### Changed

- `f-http` package version.

## v3.7.0

_August 22, 2022_

### Changed

- Updated component to emit RateLimitExceeded event for 429 errors

## v3.6.1

_August 19, 2022_

### Changed

- Add LoginBlock event not emitted assertion

## v3.6.0

_August 18, 2022_

### Changed

- Updated component to emit MfaChallengeIssue event for 403 errors

## v3.5.0

_August 15, 2022_

### Changed

- Updated component to handle 401 error

## v3.4.0

_July 28, 2022_

### Added

- Node 16 compatible version of `@justeat/f-services`.
- Node 16 compatible version of `@justeat/f-error-message`.
- Node 16 compatible version of `@justeat/f-vue-icons`.
- Node 16 compatible peerDependency version of `@justeat/f-button`.
- Node 16 compatible peerDependency version of `@justeat/f-card`.

## v3.3.0

_July 25, 2022_

### Added

- Node 16 support.

## v3.2.0

_July 19, 2021_

### Added

- Peer dependencies for fozzie components.
- `required` attribute to required fields but disable default HTML5 form validation.

## v3.1.0

_July 13, 2022_

### Changed

- Update f-wdio-utils to v1.1.0 to use new Axe Core implementation.
- Accessibility tests to be async.

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v3.0.0

_July 13, 2022_

### Changed

- **breaking changes** Update to `@use` and `@forward` SASS syntax.

## v2.4.2

_June 29, 2022_

### Added

- Increase password minimum length from 4 to 10 characters.

## v2.4.1

_June 27, 2022_

### Added

- Component tests to check correct URLs for Ts & Cs, Privacy and Cookies policy links.

## v2.4.0

_June 22, 2022_

### Changed

- Update `f-link` to v3.1.1.

## v2.3.0

_June 20, 2022_

### Changed

- Bumped `f-form-field` version to add `required` fields.

## v2.2.0

_June 16, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

_February 4, 2022_

### Changed

- Upgraded to ESLint v8

## v2.1.1

_January 27, 2022_

### Changed

- `component` and `visual` tests to take in functions from `f-wdio-utils` package.
- visual tests to dynamically change device type

## v2.1.0

_November 4, 2021_

### Changed

- Updated references to point to being a `Page` rather than an `Organism`.

## v2.0.3

_October 18, 2021_

### Changed

- Updated version of `f-form-field`.

## v2.0.2

_October 15, 2021_

Republish to fix a bad previous publish.

## v2.0.1

_October 14, 2021_

### Changed

- Updated version of `f-button`.

## v2.0.0

_October 5, 2021_

### Changed

- Updated version of `f-button`, `f-card`, `f-link` and `f-form-field` to include icing phase 2 changes.

### Removed

- `is-rounded` prop from `f-card` component call as the card is now rounded by default.

### Added

- `is-distinct` prop for f-link component call to make links blue.

## v1.1.0

_September 16, 2021_

### Changed

- Updated version of `f-button`, `f-form-field`, `f-error-message`, `f-link` and `f-card` to remove normalize styles from the build.

### Removed

- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.

## v1.0.0

_September 15, 2021_

- Return beta to master. Component has JETSansDigital font.

## v1.0.0-beta.2

_September 8, 2021_

### Changed

- Updated font weights after design review.
- Restored decoration (underline) for link to login page.

## v1.0.0-beta.1

_September 7, 2021_

### Changed

- Republish to remove JustEatBasis from css output file.

## v1.0.0-beta.0

_September 1, 2021_

### Updated

- New font JETSansDigital
- `f-button` to v2.0.0-beta.0 which use the new font
- `f-form-field` to v3.0.0-beta.0 which use the new font

## v0.63.0

_August 31, 2021_

### Updated

- Updated generic error message and handling on registration failure.

## v0.62.0

_August 19, 2021_

### Updated

- Versions of `f-card`, `f-error-message`,`f-form-field`, `f-vue-icons` to the latest

## v0.61.0

_August 19, 2021_

### Fixed

- Removing the `je-oidc` cookie when registering to avoid logged in users from being kept logged in to the previous account.

## v0.60.0

_August 5, 2021_

### Changed

- Update the story file API mocking to work with f-http

## v0.59.0

_August 4, 2021_

### Changed

- Updated Integration Tests to work with new f-http version
- Use $http from context instead of creating a new HTTP Client
- Updated version of `f-button`.

## v0.58.0

_June 25, 2021_

### Added

- `CreateAccountWarning` event to be emitted for logging warning instead of errors. Now is used for 409 errors.

## v0.57.0

_June 18, 2021_

### Added

- Percy Visual regression tests

## v0.56.0

_May 27, 2021_

### Changed

- f-card package version updated to 1.2.1
- Some styles were cleaned up in connection with new f-card version

## v0.55.0

_May 27, 2021_

### Added

- `f-link` to login link and terms and conditions.`

## v0.54.0

_May 25, 2021_

### Changed

- CSS variables to use pie design tokens instead of fozzie-colour-palette vars

## v0.53.2

_May 20, 2021_

### Changed

- Bumped f-http version to 0.5.0

## v0.53.1

_May 14, 2021_

### Fixed

- Error message for 409 - Conflict was no longer being rendered due to recent accessibility changes.
- Added functionality to validate conflicted email addresses

## v0.53.0

_May 11, 2021_

### Changed

- Switched from Axios and Axios Mock Adapter to f-http

## v0.52.0

_May 6, 2021_

### Removed

- `is-visuallyHidden` css style definition as should come from `fozzie`

### Added

- Tagging for future Percy tests

## v0.51.0

_April 15, 2021_

### Changed

- Error messages retrieved from i18n files.

## v0.50.0

_April 1, 2021_

### Added

- A11y markup to support screen-reader

## v0.49.2

_April 1, 2021_

### Added

- `o-link` fozzie classes for the links.

_March 31, 2021_

### Changed

- user email and password in unit and component tests

## v0.49.1

_March 23, 2021_

### Added

- `f-wdio-utils` npm package to package.json

## v0.49.0

_March 19, 2021_

### Added

- Add translations for 'en-AU' and 'en-NZ'

## v0.48.0

_March 18, 2021_

### Removed

- Remove 'en-GB' as the default value for `props.locale.default`

## v0.47.0

_March 12, 2021_

### Added

- Browserstack test config in `package.json`
- Axios mocks for Storybook
- 'email in use' component test
- `f-wdio-utils` npm package to `f-registration-component`
- `selector.js` file for referencing attributes

### Changed

- Restructured component tests to support Browserstack
- component feature tests
- component object into a class that imports `page.object`
- Update axios version for security advisory.
- Use latest version of `f-form-field`.
  - Updated tests to handle new `data-test-id` attributes.

## v0.46.0

_December 30, 2020_

### Changed

- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.
- Updated `f-form-field` dependency.

## v0.45.0

_December 10, 2020_

### Changed

- Moved justeat packages to the dev dependencies
- Updated f-button component to the latest (0.4.1)
- Renamed button-component to f-button for concistency between projects

## v0.44.1

_December 10, 2020_

### Fixed

- Set form method to POST.

## v0.44.0

_December 9, 2020_

### Added

- 'loginUrl' prop so that returnUrl is not lost when clicking 'Already on Just Eat' as it can be passed in by the parent

### Changed

- Updated storybook to include missing props
- Make 'showLoginLink' a required prop

### Removed

- Unsupported EU tenants
- Obselete localisation message for loginUrl

## v0.43.3

_December 8, 2020_

### Fixed

- Remove tabindex from form element – results in visible border temporarily appearing around form when inputs are clicked.

## v0.43.2

_December 7, 2020_

### Fixed

- All tests now run in component spec files.

## v0.43.1

_December 2, 2020_

### Fixed

- Remove erroneous `>`.

## v0.43.0

_November 20, 2020_

### Changed

- Margin at top of component updated for narrow widths.
- De-capitalised `name` on form labels.

### Fixed

- Generic error message updated to use `f-error-message` component.

## v0.42.0

_November 18, 2020_

### Added

- `box-shadow` around component card.

### Changed

- Some minor spacing tweaks.

## v0.41.0

_November 18, 2020_

### Added

- Underline for link `:hover` and `:focus` states.

### Changed

- Updating `f-button` to pull in new hover states.

## v0.40.0

_November 17, 2020_

### Added

- Eyeglass sass config added so that the component can just import the base fozzie `index.scss`.

### Changed

- `Button.vue` replaced in favour of `f-button` component.
- Some small class name updates to make more consistent with our naming scheme.

### Removed

- `theme()` mixin as no longer needed.

## v0.39.1

_November 5, 2020_

### Added

- Added f-error-message into dependencies for f-registration

## v0.39.0

_November 3, 2020_

### Changed

- Added f-error-message for inline registration page errors
- 'jet' theme instead of 'je'

### Added

- Stylelint added to lint styling on build.

### Removed

- System test mocks

## v0.37.0

_October 22, 2020_

### Changed

- Various style to align better with designs.

## v0.36.0

_October 20, 2020_

### Added

- Handling of 403 responses in `f-registration`.
- New prop to set the form AJAX call timeout.

## v0.35.0

_October 16, 2020_

### Added

- Moved text into translations file
- Support for locale en-GB
- Emit VisitLoginPage event on login page click interaction

### Changed

- Prop for showing login link changed to boolean called `showLoginLink`

## v0.34.0

_October 9, 2020_

### Added

- Emit CreateAccountStart event on first form interaction
- Emit CreateAccountInlineError event on field blur and fails validation

### Changed

- Updated CreateAccountFailure emit event to pass the valid & invalid fields in the payload

## v0.33.0

_October 5, 2020_

### Added

- Emit CreateAccountFailure event when form is submitted with validation errors

### Changed

- Password field has no max length requirement
- Refactored unit tests to ensure failure event is emitted because of validation errors and not service failures

## v0.32.0

_October 5, 2020_

### Changed

- Use the latest version of `f-form-field` to display form labels on desktop.

## v0.31.0

_September 30, 2020_

### Added

- Accessibility tests that run as part of the pipeline

## v0.30.0

_September 29, 2020_

### Added

- Added bag icon to registration component.

## v0.29.0

### Changed

- Uses `JustEatBasis` font and new fozzie font size declarations.

## v0.28.0

### Removed

- Contract tests + scripts

## v0.27.0

_September 23, 2020_

### Changed

- Use the latest version of F-Card to apply top and bottom margins to the registration component

## v0.26.2

_September 23, 2020_

### Changed

- Reverted syntax change in `RegistrationService` due to issues when running `yarn:demo`

## v0.26.1

_September 21, 2020_

### Fixed

- RegistrationService import so that it can be used by contract tests

## v0.26.0

_September 17 , 2020_

### Changed

- Validation for inputs now displayed when focus is lost

### Added

- Email input max length is now 50 characters
- Password input must be between 4 and 50 characters

## v0.25.0

_September 17, 2020_

### Changed

- Updated `f-registration` component object to make tests pass

## v0.24.0

_September 15, 2020_

### Changed

- Include Registration API service as part of npm package for use in Magikarp contract tests

## v0.23.0

_September 15, 2020_

### Changed

- font-weight for the Button bold text is now 500

## v0.22.0

_September 15, 2020_

### Changed

- font-weight for the Button bold text is now 600

## v0.21.0

_September 10, 2020_

### Added

- `registrationSource` and `marketingPreferences` to account creation post request body.

## v0.20.0

_September 9, 2020_

### Added

- Integration tests

## v0.19.0

_September 7, 2020_

### Added

- `consumer` folder for consumer pact tests
- `test:consumer` script to execute consumer pact tests

### Changed

- `testEnvironment` in `package.json` for consumer pact tests
- `modulePathIgnorePatterns` in `jest.config.js`

## v0.18.0

_September 4, 2020_

### Added

- Legal text and relevant hyperlinks

## v0.17.0

_September 1, 2020_

### Added

- WebDriverIO component tests

## v0.16.0

_August 28, 2020_

### Changed

- Remove tenant prop and infer from locale prop instead.

## v0.15.0

_August 26, 2020_

### Changed

- Update button colour to orange.

## v0.14.0

_August 21, 2020_

### Changed

- Validation message for conflicting email address.

## v0.13.0

_August 19, 2020_

### Added

- Wiremock files for Nuxt system tests

### Changed

- Changed folder structure for test utils.

## v0.12.0

_August 13, 2020_

### Added

- `f-registration.page.js` for use within WebDriverIO test frameworks.
- New `data-test-id` attributes for f-registration error selectors.

## v0.11.1

_August 7, 2020_

### Changed

- Unit tests cleaned up in Registration.test.js

## v0.11.0

_August 6, 2020_

### Added

- Validation on First name and Last name regarding max length and invalid characters

## v0.10.0

_August 3, 2020_

### Fixed

- Update expected structure of the axios error object to show custom 409 error message

## v0.9.2

_July 31, 2020_

### Fixed

- Changed property name of POST object from `email` to `emailAddress`.

## v0.9.1

_July 28, 2020_

### Changed

- Vue CLI minor package updates.
- Small update to colours from updating to `fozzie-colour-palette` in the mono-repo root.

## v0.9.0

_July 15, 2020_

### Changed

- Update registration component to handle AccountWeb API endpoint.
- Updating colour variables to use new versions set in `fozzie-colour-palette`.

### Added

- Accessibility add-on to Storybook story.

## v0.7.1

_June 12, 2020_

### Changed

- Added space between login preLinkText and linkText.

## v0.7.0

_June 11, 2020_

### Changed

- Storybook category updated to `Organisms`.

### Added

- Login link to registration component.

## v0.6.0

_June 2, 2020_

### Added

- Create account API call when clicking create account button

## v0.5.0

_May 26, 2020_

### Added

- `Vuelidate` package added for validation of form inputs. Validation currently set-up to show to form submission.
- Error messages for error states and styling for error messages (needs to be in the form rather than on the input because of the way CSS Modules works – the plan will be to move this styling to a more generic `f-form` component down the line).
- `name` attributes added to each form field component.
- Added base `typography` file to the demo component so that it shows how the component will look with the global fozzie typographic styles applied (global styles like this will be made available as a separate include that is imported into each component in the future).

### Changed

- Stubbed `.css` file module imports as was causing build error.

## v0.4.0

_May 18, 2020_

### Added

- Added Storybook file to include component in documentation component library.

### Changed

- `f-card` and `f-form-field` now used in the registration component in place of inline components.
- Added props for component `title` and `buttonText`.
- Changed `theme` data attribute to be more specific to component.

## v0.3.0

_May 14, 2020_

### Added

- Added `data-test-id` for input elements in `f-registration`.

### Changed

- Updating `vue-test-utils` to v1 and `@vue/cli-plugin-unit-test` to v4.3.1.

### Removed

- `testMatch` from jest config, as not needed.

## v0.2.0

_April 17, 2020_

### Added

- `f-registration` base HTML structure and styling has been added.

### Changed

- Components separated out into separate `.vue` files.

## v0.1.0

_April 7, 2020_

### Added

- `f-registration` component structure and config.
