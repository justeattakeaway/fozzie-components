# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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

### Removed
- Address related form fields from `f-checkout`.

### Changed
- Checkout Component to replicate Collection and Delivery in ConsumerWeb.
- Selector to uses `method` prop to change label text.


Latest (to be added to next release)
------------------------------
*October 23, 2020*

### Added
- Stylelint added to lint styling on build.


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
