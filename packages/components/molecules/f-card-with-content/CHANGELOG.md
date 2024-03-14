# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v3.4.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

## v3.3.0

_August 3, 2022_

### Added

- Node 16 compatible version of `@justeat/f-vue-icons`.

v3.2.0

---

_July 19, 2022_

### Added

- Node 16 support.

## v3.1.0

_July 5, 2022_

### Changed

- Update f-wdio-utils to v1.1.0
- Update component objects / specs to use ES6 syntax.

## v3.0.0

_June 24, 2022_

### Changed

- peerDependency versions to use new major version.
- devDependency version range to match peerDependencies.

## v2.0.0

_June 20, 2022_

### Changed

- Update to `@use` and `@forward` SASS syntax

## v1.1.1

_Jun 9, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

_May 26, 2022_

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v1.1.0

_February 2, 2022_

### Changed

- `f-button` & `f-card` version.

## v1.0.0

_November 26, 2021_

### Added

- **Breaking Change**: Added `f-button` dependency to peer dependencies. Now `f-button` should be included as a dependency of the consuming component or application.
- **Breaking Change**: Added `f-card` dependency to peer dependencies. Now `f-card` should be included as a dependency of the consuming component or application.

### Removed

- **Breaking Change**: Removed `f-button` styles import from the component. Make sure to import `f-button` styles in your application.
- **Breaking Change**: Removed `f-card` styles import from the component. Make sure to import `f-card` styles in your application.

## v0.2.1

_November 12, 2021_

### Added

- `data-test-id`s for child elements.
- Unit test coverage

## v0.2.0

_November 11, 2021_

### Added

- Heading
- Description
- Primary and secondary buttons
  - These emit events like `primary-button-click`
  - Expect objects containing the properties:
    - `text`
    - (Optionally) `href`/`to` for rendering the button as an anchor or router-link.
- Named slot for icon
- Storybook story

## v0.1.0

_November 3, 2021_

### Added

- Initial generated component
