# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v0.26.0
------------------------------
*December 15, 2020*

### Added
- Tests for store `checkout.module.js`.


v0.25.0
------------------------------
*December 14, 2020*

### Added
- Added 'authToken' property


v0.24.0
------------------------------
*December 14, 2020*

### Changed
- Renamed 'fulfill' occurrences to 'fulfil' to keep in line with the Checkout API.


v0.23.0
------------------------------
*December 11, 2020*

### Changed
- Moved justeat packages to the dev dependencies
- Updated f-button component to the latest (0.4.1)
- Renamed button-component to f-button for concistency between projects


v0.22.0
------------------------------
*December 11, 2020*

### Added
- Webdriver tests for postcode format in `f-checkout-delivery`.


v0.21.0
------------------------------
*December 10, 2020*

### Added
- Webdriver test for phone number format in `f-checkout-delivery`.


v0.20.1
------------------------------
*December 10, 2020*

### Changed
- `f-form-field` version.
- Styling of `Address` fields in error.


v0.20.0
------------------------------
*December 9, 2020*

### Changed
- `f-form-field` version.
- Styling in `Address` component.


v0.19.0
------------------------------
*December 8, 2020*

### Added
- Webdriver tests for dropdown in `Selector`
- Webdriver tests for note-field character limit in `UserNote`

### Changed
- `f-form-field` version.
- `data-test-id` references in tests.


v0.18.0
------------------------------
*December 8, 2020*

### Changed
- `f-services` version.
- Postcode validation.

### Removed
- Spanish Locale from storybook.


v0.17.0
------------------------------
*December 7, 2020*

### Added
- Component tests for 'Collection' prop variant.

### Changed
- Split component tests into separate spec files


v0.16.1
------------------------------
*December 4, 2020*

### Changed
- Updated `Checkout.stories.js` to support new checkoutMock naming for Storybook.


v0.16.0
------------------------------
*December 4, 2020*

### Added
- Page object model constants for css selectors
- New test to check for existence of error messages per field


v0.15.0
------------------------------
*December 3, 2020*

### Added
- Ability to change prop values in demo file for WebDriverIO component tests.
- New `Demo.vue` for f-checkout controls.


v0.14.0
------------------------------
*December 2, 2020*

### Added
- `max-length` to user note.

### Changed
- Phone validation to use `f-services`.
- Styling in `Selector` component.


v0.13.0
------------------------------
*December 1, 2020*

### Changed
- `f-services` version.
- Tests to match the new version of `f-services`.


v0.12.0
------------------------------
*December 1, 2020*

### Changed
- Selector component to use `f-form-field` dropdown component.
- `f-button` version.


v0.11.0
------------------------------
*November 25, 2020*

### Added
- Vuex modules to make state management cleaner and clearer.


v0.10.0
------------------------------
*November 23, 2020*

### Changed
- Updated `f-card`, `f-button`, `f-form-field`, `f-error-message` versions.
- Updated font sizes, padding and layout to match PIE design.


v0.9.0
------------------------------
*November 16, 2020*

### Added
- Checkout component calls server to get data


v0.8.0
------------------------------
*November 12, 2020*

### Added
- Inline error handling to `Checkout` and `Address` components.
- Server side error handling.
- Validations from `f-services`.


v0.7.0
------------------------------
*November 11, 2020*

### Added
- Integration with `f-globalisation`.

### Changed
- The way we run the demo page (used by component tests) so that we can control what we inject into the Vue instance.


v0.6.0
------------------------------
*November 2, 2020*

### Added
- New component tests


v0.5.0
------------------------------
*October 26, 2020*

### Added
- New functionality to component object
- New component tests


v0.4.0
------------------------------
*October 22, 2020*

### Added
- Address component to be displayed if `checkoutMethod` is set to 'Delivery'.
- Stylelint added to lint styling on build.

### Removed
- Address related form fields from `f-checkout`.

### Changed
- Checkout Component to replicate Collection and Delivery in ConsumerWeb.
- Selector to uses `method` prop to change label text.


v0.3.0
------------------------------
*October 21, 2020*

### Changed
- Selector to hide label when time selected.

### Added
- Selector unit tests


v0.2.0
------------------------------
*October 15, 2020*

### Changed
- Layout to replicate ConsumerWeb.


v0.1.0
------------------------------
*October 6, 2020*

### Added
- Component structure and basic configuration (created using `generator-component`).
