# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v1.2.0
------------------------------
*May 22, 2022*

### Added
- Version of `node-sass` that's compatible with Node 16.

v1.1.0
------------------------------
*March 15, 2022*

### Added
- `aria-label` and `nav` landmark to navigation.
- Tests to cover changes.


v1.0.0
------------------------------
*December 9, 2021*

### Added
- **Breaking Change**: Added `f-link` dependency to peer dependencies. Now `f-link` should be included as a dependency of the consuming component or application.

### Removed
- **Breaking Change**: Removed `f-link` styles import from the component. Make sure to import `f-link` styles in your application.


v0.3.0
------------------------------
*November 9, 2021*

### Added
- Support for `<router-link>` via `<f-link>` using to attribute

### Changed
- Selected link remains a link
- Selected link styling applied via router class rather than attribute


v0.2.1
------------------------------
*November 2, 2021*

### Changed
- Bumped f-link version
- Refactored tests


v0.2.0
------------------------------
*October 15, 2021*

### Added
- Component layout and styling


v0.1.0
------------------------------
*October 12, 2021*

### Added
- Component outline using component generator
