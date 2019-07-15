# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v0.10.0
------------------------------
*July 12, 2019*

### Added 
- `BaseProviderIcon` and `AppStoreIcon` components

### Changed
- Move social and payment icons into their own folders
- Remove unnecessary exports


v0.9.1
------------------------------
*July 11, 2019*

### Fixed
- Export payment and social icons
- Linting errors


v0.9.0
------------------------------
*July 10, 2019*

### Added
- Social icons
- Payment/card icons


v0.8.0
------------------------------
*June 21, 2019*

### Changed
- Move dev dependencies to the root folder using `lerna link convert`
Packages that are used by npm scripts left in the package to be able to run scripts not only from the root


v0.7.0
------------------------------
*June 18, 2019*

### Added
- Warning icon.

### Changed
- Updated npm dependency.


v0.6.0
------------------------------
*May 31, 2019*

### Added
- Cash, Clock, Local Legend, Map pin, Padlock and Stopwatch icons.


v0.5.0
------------------------------
*April 25, 2019*

### Added
- Alert, Basket, Collection, and Delivery icons.

### Changed
- Updated npm dependencies.


v0.4.0
------------------------------
*April 11, 2019*

### Fixed
- Reverted `vue-svg-loader` update as it contains spread operators which aren't transpiled.

### Changed
- Updated npm dependencies.


v0.3.0
------------------------------
*April 9, 2019*

### Added
- Chevron left CSS class.
- Chevron component unit tests.

### Changed
- Updated npm dependencies.
- Updated ESLint config.


v0.2.0
------------------------------
*March 20, 2019*

### Added
- Changelog file.
- Licence files.
- `package.json` details.
- New icon components and config.

### Changed
- Updated `.gitignore` file.
- Set `useBuiltIns` to false in `f-vue-icons` babel config.
- Moved dependencies back into `f-vue-icons`.
- Replaced `for in` loop with `Object.values` in entry module.


v0.1.0
------------------------------
*March 19, 2019*

### Added
- Added initial files.
