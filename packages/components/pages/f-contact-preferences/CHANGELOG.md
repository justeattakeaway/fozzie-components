# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


Latest – to be added to the next release
------------------------------

*February 16, 2022*

### Updated
- Removed unneeded toggle controls


*February 14, 2022*

### Updated
- Converted Storybook Knobs to Controls


v0.16.0
------------------------------
*January 31, 2022*

### Changed
- Move the alert markup in own file
- Reworded the error message for submit action


v0.14.0
------------------------------
*January 26, 2022*

### Changed
- Styles to match the designs.


v0.13.0
------------------------------
*January 21, 2022*

### Added
- Alerts for failed and successful saving and new design for fail to load error page.


v0.12.1
------------------------------
*January 5, 2022*

### Changed
- Passed in 'services' and 'constants' to package.json files


v0.12.0
------------------------------
*December 16, 2021*

### Changed
- Simplified the Storybook file
- Updated f-button to v3.2.0
- Updated f-card to v3.4.0


v0.11.0
------------------------------
*December 16, 2021*

### Added
- `info` and `error` logs to preferences fetch and save requests
- Unit tests

### Changed
- Move store module registration from `created` to `beforeCreate`.

### Removed
- Mounted hook which was duplicating the `initialise()` call
- Unused variable from story helper


v0.10.0
------------------------------
*December 2, 2021*

### Changed
- Generic checkboxes to use `f-form-field`


v0.9.1
------------------------------
*December 1, 2021*

### Changed
- Updating classname to match naming scheme


v0.9.0
------------------------------
*November 29, 2021*

### Added
- Expose new isAuthFinished `required` property

### Changed
- Registered the Store Module on Create()
- Initialise Page based on isAuthFinished


v0.8.0
------------------------------
*November 26, 2021*

### Changed
- `f-card` wrapping component adds two props to control padding & size.

### Added
- New version of f-card (pulls in the two new props).


v0.7.0
------------------------------
*November 23, 2021*

### Changed
- Rename boolean fields to match naming conventions


### Added
- Added Accessibility Tests.
- Added Chrome & Visual Tests.


v0.6.0
------------------------------
*November 22, 2021*

### Added
- Added storybook story.


v0.5.3
------------------------------
*November 18, 2021*

### Added
- Added vuex store, wired store to template & added unit tests.


v0.5.2
------------------------------
*November 17, 2021*

### Added
- Added contact preferences mapper & unit tests.


v0.5.1
------------------------------
*November 11, 2021*

### Added
- Api provider for getting and saving consumer preferences data.


v0.5.0
------------------------------
*November 4, 2021*

### Changed
- Moved component so that it's now in `Pages` rather than `Organisms`.


v0.4.1
------------------------------
*November 2, 2021*

### Changed
- Refactored tests


v0.4.0
------------------------------
*November 1, 2021*

### Added
- Initial error handling.
- Initial error card.
- Implementation of i18n.
- Expose `test-utils` folder.


v0.3.0
------------------------------
*October 18, 2021*

### Added
- Initial mapping and hard-coded mock

### Changed
- Updated version of `f-button`.


v0.2.0
------------------------------
*October 12, 2021*

### Added
- Initial component layout and styling


v0.1.0
------------------------------
*October 11, 2021*

### Added
- Component outline using component generator
