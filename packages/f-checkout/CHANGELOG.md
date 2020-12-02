# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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
