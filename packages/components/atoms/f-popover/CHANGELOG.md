# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v3.3.0

_March 24, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

## v3.2.0

_July 15, 2022_

### Added

- Node 16 support.

## v3.1.0

_July 4, 2022_

### Changed

- Update f-wdio-utils to v1.1.0 to use new Axe Core implementation.
- Accessibility tests to be async.
- Specs to ES6 syntax

## v3.0.0

_Jun 17, 2022_

### Changed

- Update to `@use` and `@forward` SASS syntax

## v2.3.1

_Jun 13, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

_May 27, 2022_

### Removed

- unneeded `load` and `waitForComponent` functions from component object

_May 26, 2022_

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v2.3.0

_March 28, 2022_

### Removed

- Tooltip arrow from `Popover.vue` as per the request of design.

## v2.2.0

_February 11, 2022_

### Changed

- box-shadow value to use the elevation token from the pie-design-tokens.

## v2.1.0

_January 28, 2022_

### Changed

- `spacing` references to new mapping from fozzie e.g spacing(x2) > spacing(d).

## v2.0.0

_October 5, 2021_

### Changed

- New border radius in line with Icing Phase 2.

## v1.0.0

_September 16, 2021_

### Removed

- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.

## v0.3.0

_May 16, 2021_

### Changed

- CSS variables to use pie design tokens instead of fozzie-colour-palette vars

## v0.2.1

_March 15, 2021_

### Changed

- Media query to include 768px

## v0.2.0

_March 3, 2021_

### Added

- Component markup
- Storybook story

## v0.1.0

_March 2, 2021_

### Added

- Initial commit
