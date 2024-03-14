# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v3.4.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

v3.3.0

---

_March 24, 2023_

### Added

- An optional `options` prop
- Added an optional option `options.use5Stars` to show 5 stars instead of 6 in ratings skeleton.

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

_June 23, 2022_

### Changed

- **_ Breaking change _** Update to `@use` and `@forward` SASS syntax

## v2.1.1

_Jun 8, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

_May 26, 2022_

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

_February 4, 2022_

### Changed

- Upgraded to ESLint v8

## v2.1.0

_October 15, 2021_

### Changed

- Rounded corners for all the skeleton blocks.

## v2.0.0

_October 5, 2021_

### Changed

- New colour tokens from `pie-design-tokens` in line with icing phase 2.

## v1.0.0

_September 16, 2021_

### Removed

- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.

## v0.6.0

_May 25, 2021_

### Changed

- CSS variables to use pie design tokens instead of fozzie-colour-palette vars

## v0.5.0

_April 26, 2021_

### Changed

- Rename components and classnames

## v0.4.0

_March 30, 2021_

### Added

- Restaurant carousel skeleton

## v0.3.0

_March 19, 2021_

### Added

- Skeleton components to make restaurant carousel card

### Changed

- Styles to use modules rather than scoped

### Removed

- Removed isAnimated prop

## v0.2.0

_March 19, 2021_

### Added

- Text, Heading and Sentence skeleton components rendered via prop
- Animation prop and CSS to animate bones

## v0.1.0

_March 15, 2021_

### Added

- Base generated component structure.
