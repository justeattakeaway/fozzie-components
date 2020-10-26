# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


Latest (to be added to next release)
------------------------------
*October 26, 2020*

### Added
- Stylelint added to lint styling on build.

### Changed
- 'jet' theme instead of 'je'


v1.0.0-beta.1
------------------------------
*September 3, 2020*

### Changed
- Rebasing `v0.3.0` changes into the beta branch.


v1.0.0-beta.0
------------------------------
*August 27, 2020*

### Changed
- Uses `JustEatBasis` font and new fozzie font size declarations.


v0.3.1
------------------------------
*September 8, 2020*

### Changed
- `eslint-config-fozzie` & `f-trak` peer dependencies use a range value.


v0.3.0
------------------------------
*August 28, 2020*

### Changed
- Removed component top margin. This should be set in the host app, if required
- Updated packages. Reduced bundle size


v0.2.0
------------------------------
*July 23, 2020*

### Changed
- Small update to colours from updating to `fozzie-colour-palette` in the mono-repo root.
- Vue CLI minor package updates.


v0.1.1
------------------------------
*May 12, 2020*

### Changed
- Updating `vue-test-utils` to v1 and `@vue/cli-plugin-unit-test` to v4.3.1.
- ESLint autofix turned off (so that tests don't pass due to `--fix` being applied, but then publish subsequently fails)

### Removed
- `testMatch` from jest config, as not needed.


v0.1.0
------------------------------
*March 27, 2020*

### Added
- Adds `f-user-message` vue component
