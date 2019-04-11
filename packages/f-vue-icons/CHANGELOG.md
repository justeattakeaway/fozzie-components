# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


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
