# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v0.4.0
------------------------------
*April 1, 2021*

### Fixed
- When tab selection is updated in `Tab` props, ensures that the focus is reflected back
  to surrounding `Tabs` component

### Changed
- Factored out Tabs' `provide` keys to constants


v0.3.0
------------------------------
*March 3, 2021*

### Added
- Added component tests
- Added supporting code to component object file

### Changed
- `Data-test-id` naming for `tab-` to `tab-button-` in `Tabs.vue` and `Tabs.test.js`
- `Data-test-id` naming for `transition-tab-` to `tab-content-` in `Tab.vue` and `Tab.test.js`

*February 24, 2021*

### Changed
- Restructured component object into page object model
- Refactored component and accessibility tests


v0.2.1
------------------------------
*February 08, 2021*

### Added
- Added unit tests for the tabs component


v0.2.0
------------------------------
*January 28, 2021*

### Added
- Added the first version of tabs with Tab and Tabs vue component


v0.1.0
------------------------------
*January 21, 2021*

### Added
- Add generated output for tabs
