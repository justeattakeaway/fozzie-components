# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v2.2.1
------------------------------
*June 22, 2023*

### Changed
- Adding patch for content cards 10.4.1


v2.2.0
------------------------------
*June 12, 2023*

### Changed
- Adding patch for content cards 10.4.0


v2.1.3
------------------------------
*June 06, 2023*

### Changed
- updated version of braze adapter 
- updated the adapter to accept filters


v2.0.3
------------------------------
*May 25, 2023*

### Changed
- Adding patch for content cards 10.3.1 to fix bug 


v2.0.2
------------------------------
*May 18, 2023*

### Fixed
- Pinned to a fixed f-globalisation version to prevent localisation breaking


v2.0.1
------------------------------
*April 28, 2023*

### Fixed
- Linting warning.


v2.0.0
------------------------------
*February 15, 2023*

### Changed
- Updated to include the new braze adapter
- also updated to the latest version of content cards


v1.15.2
------------------------------
*February 13, 2023*

### Added
- braze sk 3.3.0 under dev dependencies to allow tests to work.


v1.15.1
------------------------------
*November 21, 2022*

### Fixed
- Linting errors


v1.15.0
------------------------------
*November 15, 2022*

### Changed
- Added fozzie components as externals in Webpack config


v1.14.0
------------------------------
*August 3, 2022*

### Added
- Node 16 compatible version of `@justeat/f-services`.
- Node 16 compatible version of `@justeat/f-globalisation`.
- Node 16 compatible version of `@justeat/f-content-cards`.


v1.13.0-beta.1
------------------------------
*July 25, 2022*

### Added
- Node 16 support.


v1.12.0-beta.5
-----------------------------
*July 19, 2022*

### Changed
- Move fozzie components to peer dependencies.


v1.12.0-beta.4
------------------------------
*July 13, 2022*

### Changed
- Update f-wdio-utils to v1.1.0 to use new Axe Core implementation.
- Accessibility tests to be async.


v1.12.0-beta.3
-----------------------------
*July 12, 2022*

### Changed
- **Breaking changes:** Update to `@use` and `@forward` SASS syntax
- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.


v1.12.0-beta.2
------------------------------
*May 24, 2022*

### Changed
- Updated content cards to get fix to small style issue


v1.12.0-beta.1
------------------------------
*May 11, 2022*

### Changed
- Updated version of content cards to v8.
- updated to use css grid instead of flex so we can get better spacing across multiple devices.


v1.11.0
------------------------------
*April 12, 2022*

### Changed
- Modified some styles to get offers inline with latest design file, plus fixing an issue with background on search box.


v1.10.0
------------------------------
*April 7, 2022*

### Changed
- `f-searchbox` to stop alerts when `ZERO_RESULTS` appear.


v1.9.0
------------------------------
*March 15, 2022*

### Changed
- Updated background color to `$color-support-brand-01`


v1.8.0
------------------------------
*February 25, 2022*

### Changed
- Updated f-content-cards to the latest which uses a new $log interface.


v1.7.0
------------------------------
*February 17, 2022*

### Changed
- $logger interface to $log.


v1.6.0
------------------------------
*January 6, 2022*

### Changed
- Fixed UK-specific copy-pasted strings in IE, AU and NZ.


v1.5.0
------------------------------
*November 4, 2021*

### Changed
- Moved component so that it's now in `Pages` rather than `Organisms`.


v1.4.0
------------------------------
*November 1, 2021*

### Changed
- Updated version of `f-button`.


v1.3.0
------------------------------
*October 5, 2021*

### Changed
- Updated version of `f-button`, `f-searchbox` and `f-mega-modal` to be inline with icing phase 2.


v1.2.0
------------------------------
*September 21, 2021*

### Added
- Added logging in prep for adding page to coreweb

### Changed
- Updated tenant files
- Update to modal voucher code pop up to add f-button
- Update image urls


v1.1.0
------------------------------
*September 16, 2021*

### Changed
- Updated version of `f-button`, `f-content-cards`, `f-media-element`, `f-searchbox` and `f-mega-modal` to remove normalize styles from the build.


v1.0.0
------------------------------
*September 15, 2021*

- Return beta to master. Component has JETSansDigital font.


v1.0.0-beta.2
------------------------------
*September 7, 2021*

### Changed
- Updated version of `f-searchbox` (JETSans Update).


v1.0.0-beta.1
------------------------------
*September 6, 2021*

### Changed
- Updated version of `f-mega-modal` (JETSans Update).


v1.0.0-beta.0
------------------------------
*August 26, 2021*

### Changed
- New font JETSansDigital
- `f-button` to v2.0.0-beta.0 which use the new font


v0.8.0
------------------------------
*August 11, 2021*

### Added
- Results page that shows content cards for a user
- Unit tests to support results component


v0.7.0
------------------------------
*August 2, 2021*

### Added
- Unauthenticated state component
- unit tests for new component

### Changed
- Updated version of `f-button`.


v0.6.0
------------------------------
*July 5, 2021*

### Added
- Header.vue for displaying offers header
- Added tests for Header component

### Changed
- Updated the offers vuex module to support header
- Updated Search to the latest version and updated tests


v0.5.0
------------------------------
*June 22, 2021*

### Added
- Mirage JS server to provide mock cards for storybook

### Changed
- Updated the story file to get cards based on storybook controls


v0.4.0
------------------------------
*June 17, 2021*

### Added
- No Results component.
- Unit tests for NoResults component


v0.3.0
------------------------------
*June 11, 2021*

### Added
- SearchBox component for use in no results and header.
- Unit tests for SearchBox component


v0.2.0
------------------------------
*June 4, 2021*

### Added
- Vuex module for offers header search box.
- Unit tests for offers header search box vuex module
- Unit tests for helpers
- Helper functions
- Added Types for actions
- Added Types for mutations


v0.1.0
------------------------------
*June 2, 2021*

### Added
- First initial generated output.
