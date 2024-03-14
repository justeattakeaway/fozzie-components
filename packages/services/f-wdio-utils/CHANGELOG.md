# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v1.4.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

## v1.3.0

_August 26, 2022_

### Fixed

- Issue with configuration import.

## v1.2.1

_September 1, 2022_

### Changed

- Environment variable to ensure tests work across multiple CI systems.

## v1.2.0

_July 25, 2022_

### Added

- Node 16 support.

## v1.1.0

_July 4, 2022_

### Changed

- Axe Core implementation to use native WDIO plugin.

## v1.0.0

_July 1, 2022_

### Changed

- Strucutre of page objects

### Added

- Vite to build f-wdio-utils

## v0.12.0

_June 10, 2022_

### Added

- Async versions of exisiting `page.object` functions.

## v0.11.0

_June 8, 2022_

### Added

- Introduce a new base page that infers the calling component which can then reduce the client code

## v0.10.0

_June 1, 2022_

### Changed

- load function to take in storybook args as objects

## v0.9.0

_May 24, 2022_

### Changed

- Axe violation rules to exclude `aria-allowed-role` allowing `role="list"` to be used to add aria descriptions back to styled lists.

## v0.8.1

_March 08, 2022_

### Fixed

- Use `require` statement as import.

## v0.8.0

_March 07, 2022_

### Added

- `axe-core` to `page.object.js` file & devDeps.

## v0.7.0

_March 02, 2022_

### Added

- `getAccessibilityTestResults` to `page.object.js` file.

## v0.6.0

_January 24, 2022_

### Added

- `clearBlurField`, `populateForm`, `setFieldValue` functions to `page.object.js`

## v0.5.0

_November 7, 2021_

### Changed

- `waitForComponent` - Expose the timeout option on the underlying `waitForExist` method.

## v0.4.0

_November 4, 2021_

### Added

- `Pages` and `Templates` added to the storybook Url builder.

## v0.3.0

_August 4, 2021_

### Added

- New test tab function that can be importated to any component for use in tab looping tests for accessibility.

## v0.2.0

_March 24, 2021_

### Added

- New storybook extensions module.
- New page object base class that facilitates the URL builder

## v0.1.1

_February 9, 2021_

### Added

- case for molecule folder inside `page object`.

## v0.1.0

_February 4, 2021_

### Added

- Added `f-wdio-utils` folder to contain page.object and other exportable webdriverIO files.
