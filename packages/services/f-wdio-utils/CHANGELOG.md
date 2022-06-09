# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v0.11.0
------------------------------
*June 8, 2022*

### Added
- Introduce a new base page that infers the calling component which can then reduce the client code


v0.10.0
------------------------------
*June 1, 2022*

### Changed
- load function to take in storybook args as objects


v0.9.0
------------------------------
*May 24, 2022*

### Changed
- Axe violation rules to exclude `aria-allowed-role` allowing `role="list"` to be used to add aria descriptions back to styled lists.


v0.8.1
------------------------------
*March 08, 2022*

### Fixed
- Use `require` statement as import.


v0.8.0
------------------------------
*March 07, 2022*

### Added
- `axe-core` to `page.object.js` file & devDeps.


v0.7.0
------------------------------
*March 02, 2022*

### Added
- `getAccessibilityTestResults` to `page.object.js` file.


v0.6.0
------------------------------
*January 24, 2022*

### Added
- `clearBlurField`, `populateForm`, `setFieldValue` functions to `page.object.js`


v0.5.0
------------------------------
*November 7, 2021*

### Changed
- `waitForComponent` - Expose the timeout option on the underlying `waitForExist` method.


v0.4.0
------------------------------
*November 4, 2021*

### Added
- `Pages` and `Templates` added to the storybook Url builder.


v0.3.0
------------------------------
*August 4, 2021*

### Added
- New test tab function that can be importated to any component for use in tab looping tests for accessibility.

v0.2.0
------------------------------
*March 24, 2021*

### Added
- New storybook extensions module.
- New page object base class that facilitates the URL builder

v0.1.1
------------------------------
*February 9, 2021*

### Added
- case for molecule folder inside `page object`.


v0.1.0
------------------------------
*February 4, 2021*

### Added
- Added `f-wdio-utils` folder to contain page.object and other exportable webdriverIO files.
