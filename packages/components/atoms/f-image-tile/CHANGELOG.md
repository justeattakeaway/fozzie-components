# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v1.5.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

## v1.4.0

_March 27, 2023_

### Changed

- New focus styles
  - These require the new colour tokens from `pie-design-tokens` which are included in `fozzie` v11+.

## v1.3.1

_November 21, 2022_

### Fixed

- Linting errors

## v1.3.0

_November 1, 2022_

### Changed

- Product Orange update (package release to update the compiled CSS)

## v1.2.0

_July 15, 2022_

### Added

- Node 16 support.

## v1.1.0

_July 4, 2022_

### Changed

- Update f-wdio-utils to v1.1.0 to use new Axe Core implementation.
- Accessibility tests to be async.
- Specs to ES6 syntax

## v1.0.1

_Jun 23, 2022_

### Changed

- Update icon colour when selected

## v1.0.0

_Jun 17, 2022_

### Changed

- Update to `@use` and `@forward` SASS syntax

## v0.14.0

_Jun 16, 2022_

### Added

- Loading skeletons

## v0.13.1

_Jun 13, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

## v0.13.0

_May 30, 2022_

### Added

- Breakout image option and tests

### Removed

- unneeded `load` and `waitForComponent` functions from component object

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v0.12.0

_May 9, 2022_

### Added

- Optional `performanceTracker` prop & `performanceTrackerLabel` prop

## v0.11.1

_March 31, 2022_

### Added

- A pointer cursor to image tile

## v0.11.0

_March 11, 2022_

### Added

- Unit tests for props: `href`, `displayText` & `altText`

### Changed

`outline` to `box-shadow` to create rounded corners in safari

## v0.10.3

_March 10, 2022_

### Added

- checked attribute

### Changed

- `href` always added to link
- `isLink` test updated

## v0.10.2

_March 8, 2022_

### Changed

- Margin between text and image

## v0.10.1

_February 28, 2022_

### Changed

- Props and Events within `README.md`

## v0.10.0

_February 25, 2022_

### Changed

- Moved `isToggleSelected` assignment into created lifecycle method for SSR
- Updated stories to use args instead of default value
- Added label style for `isLink`

## v0.9.2

_February 23, 2022_

### Fixed

- Hide image on error

## v0.9.1

_February 22, 2022_

### Added

- `f-vue-icons` as a dependency

## v0.9.0

_February 14, 2022_

### Added

- `sass:math` to `vue.config` to allow `dart-sass` migration.

## v0.8.0

_February 8, 2022_

### Changed

- Storybook, combine stories so ImageTile is always shown within a container.

## v0.7.0

_February 8, 2022_

### Added

- Clickable component test

### Changed

- Upgraded to ESLint v8

## v0.6.0

_January 31, 2022_

### Changed

- `spacing` references to new mapping from fozzie e.g spacing(x2) > spacing(d).

## v0.5.1

_January 31, 2022_

### Changed

- Updated tabindex value on input

## v0.5.0

_January 28, 2022_

### Added

- Focus styles for keyboard navigation

## v0.4.0

_January 26, 2022_

### Added

- Styled and truncated text
- Transitions accounting for prefers-reduced-motion

## v0.3.0

_January 19, 2022_

### Added

- ImageTile image and fallback image
- Supporting tests and stories

## v0.2.0

_December 17, 2021_

### Added

- ImageTile component structure and toggling behaviour
- ImageTile stories

## v0.1.0

_October 28, 2021_

### Added

- Created initial component using yeoman generator
- Added to circle ci cache
