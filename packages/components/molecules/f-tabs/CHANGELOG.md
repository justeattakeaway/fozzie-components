# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v0.9.0
------------------------------
*July 22, 2021*

### Added
- `UPDATE_TITLE` injection to make tab title reactive.


v0.8.0
------------------------------
*June 4, 2021*

### Changed
- Reverse animation direction (when choosing a tab that is further left, its contents should slide in from the left and vice-versa).

### Fixed
- Don't *change* direction if tab selection isn't changing.


v0.7.0
------------------------------
*June 3, 2021*

### Changed
- Emit `change` event when the tab is changed. Event payload contains the `new` and `prev` tab indices.


v0.6.0
------------------------------
*June 2, 2021*

### Changed
- Button type from `submit` (the default) to `button` to prevent submission when tabs are used inside a form.


v0.5.0
------------------------------
*May 25, 2021*

### Changed
- CSS variables to use pie design tokens instead of fozzie-colour-palette vars


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
- `data-test-id` naming for `tab-` to `tab-button-` in `Tabs.vue` and `Tabs.test.js`
- `data-test-id` naming for `transition-tab-` to `tab-content-` in `Tab.vue` and `Tab.test.js`
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
