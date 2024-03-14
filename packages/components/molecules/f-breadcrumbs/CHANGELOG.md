# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v4.4.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

## v4.3.0

_March 27, 2023_

### Changed

- New focus styles
  - These require the new colour tokens from `pie-design-tokens` which are included in `fozzie` v11+.

## v4.2.0

_July 19, 2022_

### Added

- Node 16 support.

## v4.1.0

_July 5, 2022_

### Changed

- Update f-wdio-utils to v1.1.0
- Update component objects / specs to use ES6 syntax.

## v4.0.0

_June 20, 2022_

### Changed

- Update to `@use` and `@forward` SASS syntax

## v3.2.2

_Jun 9, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

_May 26, 2022_

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v3.2.1

_March 18, 2022_

### Changed

- `package` version as previous bump does not seem to pull through changes.

## v3.2.0

_March 15, 2022_

### Changed

- Upgraded to ESLint v8

### Added

- `nav` landmark & `aria-label`.
- Tests to cover change.

## v3.1.0

_October 27, 2021_

### Changed

- Replace `<span>` with `<template>`.
- Simplify and shuffle around styles accordingly.

### Added

- Storybook control for `hasBackground`.

### Removed

- Breadcrumb separators from accessibility tree. They were being announced by NVDA as "greater".

## v3.0.0

_October 25, 2021_

### Added

- `hasBackground` prop which adds a layer of style to the default version.
- Unit test coverage.

## v2.1.0

_October 21, 2021_

### Changed

- If no URL is given, render `<span>` instead of `<a>` or `<router-link>`.

### Added

- Unit test coverage

## v2.0.0

_October 5, 2021_

### Changed

- New colour scheme and border radius from `pie-design-tokens` in line with icing phase 2.

## v1.0.0

_September 16, 2021_

### Removed

- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.

## v0.3.0

_May 25, 2021_

### Changed

- CSS variables to use pie design tokens instead of fozzie-colour-palette vars
- Restructured component object into page object model
- Refactored component tests

## v0.2.0

_February 2, 2021_

### Added

- Added styles, component structure and updated story.

## v0.1.0

_January 20, 2021_

### Added

- Added the generated output to start component
