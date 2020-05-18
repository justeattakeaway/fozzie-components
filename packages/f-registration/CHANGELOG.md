# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v0.4.0
------------------------------
*May 18, 2020*

### Added
- Added Storybook file to include component in documentation component library.

### Changed
- `f-card` and `f-form-field` now used in the registration component in place of inline components.
- Added props for component `title` and `buttonText`.
- Changed `theme` data attribute to be more specific to component.


v0.3.0
------------------------------
*May 14, 2020*

### Added
- Added `data-test-id` for input elements in `f-registration`.

### Changed
- Updating `vue-test-utils` to v1 and `@vue/cli-plugin-unit-test` to v4.3.1.

### Removed
- `testMatch` from jest config, as not needed.


v0.2.0
------------------------------
*April 17, 2020*

### Added
- `f-registration` base HTML structure and styling has been added.

### Changed
- Components separated out into separate `.vue` files.


v0.1.0
------------------------------
*April 7, 2020*

### Added
- `f-registration` component structure and config.
