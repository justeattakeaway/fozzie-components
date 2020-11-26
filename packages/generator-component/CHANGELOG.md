# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v1.8.0
------------------------------
*November 26, 2020*

## Added
- Stub CSS files in jest.


v1.7.0
------------------------------
*November 23, 2020*

### Changed
- CircleCI badge updated.


v1.6.0
------------------------------
*October 28, 2020*

### Removed
- Template files.


v1.5.0
------------------------------
*October 23, 2020*

### Added
- Stylelint config added as part of the generator.


v1.4.0
------------------------------
*October 16, 2020*

### Added
- Axe Accessibility Spec template

### Changed
- Moved conditional statement from axe-accessibility spec to axe-helper


v1.3.0
------------------------------
*October 14, 2020*

### Added
- Use today's date when creating initial changelog entry.


v1.2.0
------------------------------
*October 14, 2020*

### Changed
- Changed path so that the generator outputs to the current directory it's in, rather than the directory above the current location.
- Updated `babel.config.js` to run the tests through latest Node version rather than our browser config.
- Deleted theme mixin, as no longer needed.
- Removed font files from `Demo.vue`.
- Storybook syntax updated to new `export` syntax (from legacy `storiesOf` syntax).

v1.1.1
------------------------------
*October 6, 2020*

### Added
- API service template
- Axios to package.json template

### Fixed
- Test template


v1.1.0
------------------------------
*October 6, 2020*

### Changed
- Added test templates


v1.0.0
------------------------------
*August 27, 2020*

### Changed
- Updating `font-size` variable.


v0.2.1
------------------------------
*September 8, 2020*

### Changed
- Updated `devDependencies` to use same versions as the other packages.
- Vue CLI minor package updates.

### Fixed
- Updated bundle name in readme template.


v0.2.0
------------------------------
*May 12, 2020*

### Changed
- Updated template to use `vue-test-utils` to v1 and `@vue/cli-plugin-unit-test` to v4.3.1.

### Removed
- `testMatch` from jest config, as not needed.


v0.1.0
------------------------------
*April 21, 2020*

### Added
- First version to be able to create new components.
