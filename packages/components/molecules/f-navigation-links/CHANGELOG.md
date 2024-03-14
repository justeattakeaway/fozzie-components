# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v2.6.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

_June 23, 2023_

### Changed

- Updated test data

## v2.5.0

_March 27, 2023_

### Changed

- New focus styles
  - These require the new colour tokens from `pie-design-tokens` which are included in `fozzie` v11+.

## v2.4.0

_November 1, 2022_

### Changed

- Product Orange update (package release to update the compiled CSS)

## v2.3.0

_July 19, 2022_

### Added

- Node 16 support.

## v2.2.0

_July 5, 2022_

### Changed

- Update f-wdio-utils to v1.1.0
- Update component objects / specs to use ES6 syntax.

## v2.1.0

_June 23, 2022_

### Changed

- devDependency version range to match peerDependencies.

## v2.0.0

_June 23, 2022_

### Changed

- Update to `@use` and `@forward` SASS syntax

## v1.3.0

_June 22, 2022_

### Changed

- Update `f-link` to v3.1.1.

## v1.2.1

_June 9, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.
- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v1.2.0

_May 22, 2022_

### Added

- Version of `node-sass` that's compatible with Node 16.

## v1.1.0

_March 15, 2022_

### Added

- `aria-label` and `nav` landmark to navigation.
- Tests to cover changes.

## v1.0.0

_December 9, 2021_

### Added

- **Breaking Change**: Added `f-link` dependency to peer dependencies. Now `f-link` should be included as a dependency of the consuming component or application.

### Removed

- **Breaking Change**: Removed `f-link` styles import from the component. Make sure to import `f-link` styles in your application.

## v0.3.0

_November 9, 2021_

### Added

- Support for `<router-link>` via `<f-link>` using to attribute

### Changed

- Selected link remains a link
- Selected link styling applied via router class rather than attribute

## v0.2.1

_November 2, 2021_

### Changed

- Bumped f-link version
- Refactored tests

## v0.2.0

_October 15, 2021_

### Added

- Component layout and styling

## v0.1.0

_October 12, 2021_

### Added

- Component outline using component generator
