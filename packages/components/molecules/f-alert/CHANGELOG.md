# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v3.0.0
------------------------------
*September 29, 2021*

### Changed
- Updated version of `f-button`.
- New colour scheme and border radius from `pie-design-tokens` in line with icing phase 2.


v2.0.0
------------------------------
*September 16, 2021*

### Changed
- Updated version of `f-button`.

### Removed
- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.


v1.0.0
------------------------------
*September 15, 2021*

- Return beta to master. Component has JETSansDigital font.


v1.0.0-beta.0
------------------------------
*September 1, 2021*

### Changed
- Updated version of `f-button` (JETSans Update)


v0.7.0
------------------------------
*July 14, 2021*

### Changed
- Updated version of `f-button`.
- Close button now uses type `ghostTertiary`.


v0.6.1
------------------------------
*June 09, 2021*

### Fixed
- Alert icon no longer resizes as content around it grows
- Warning icon no longer receives greater margin than the other alert types
- Items in the header are no longer vertically aligned as the content may exceed one line
- Added some spacing below the title so that the component doesn't feel so mushed


v0.6.0
------------------------------
*May 25, 2020*

### Changed
- CSS variables to use pie design tokens instead of fozzie-colour-palette vars


v0.5.0
------------------------------
*March 18, 2020*

### Changed
- Heading font size increase.
- Heading padding decrease.

*February 25, 2021*

### Changed
- Restructured component object into page object model
- Refactored component and accessibility tests


*January 12, 2021*

### Changed
- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.
- Update version of `f-button`.


v0.4.0
------------------------------
*December 7, 2020*

### Changed
- Regular button changed to vue button component
- Renamed VueAlert to FAlert

### Updated
- `f-vue-icons` to the latest version (1.13.0)


v0.3.0
------------------------------
*November 30, 2020*

### Added
- Ability to change prop values in demo file for WebDriverIO component tests.
- New `demo-controls.js` component object for f-alert controls.


v0.2.0
------------------------------
*October 26, 2020*

### Added
- Stylelint added to lint styling on build.
- data-test IDs to Alert Component
- Basic tests for Alert
- Alert Component-Object


v0.1.1
------------------------------
*October 20, 2020*

### Changed
- Removing unwanted comment from the code.


v0.1.0
------------------------------
*October 20, 2020*

### Added
- Initial version with support for `danger`, `warning`, `success` and `info` dismissable/non-dismissable alerts.
