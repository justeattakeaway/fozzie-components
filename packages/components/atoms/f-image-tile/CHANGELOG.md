# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v1.3.0
------------------------------
*November 1, 2022*

### Changed
- Product Orange update (package release to update the compiled CSS)


v1.2.0
------------------------------
*July 15, 2022*

### Added
- Node 16 support.


v1.1.0
------------------------------
*July 4, 2022*

### Changed
- Update f-wdio-utils to v1.1.0 to use new Axe Core implementation.
- Accessibility tests to be async.
- Specs to ES6 syntax

v1.0.1
-----------------------------
*Jun 23, 2022*

### Changed
- Update icon colour when selected

v1.0.0
-----------------------------
*Jun 17, 2022*

### Changed
- Update to `@use` and `@forward` SASS syntax


v0.14.0
-----------------------------
*Jun 16, 2022*

### Added
- Loading skeletons

v0.13.1
-----------------------------
*Jun 13, 2022*

### Changed
- Bumped wdio version and fixed breaking changes.


v0.13.0
------------------------------
*May 30, 2022*

### Added
- Breakout image option and tests

### Removed
- unneeded `load` and `waitForComponent` functions from component object

### Changed
- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.


v0.12.0
------------------------------
*May 9, 2022*

### Added
- Optional `performanceTracker` prop & `performanceTrackerLabel` prop

v0.11.1
------------------------------
*March 31, 2022*

### Added
- A pointer cursor to image tile

v0.11.0
------------------------------
*March 11, 2022*

### Added
- Unit tests for props: `href`, `displayText` & `altText`

### Changed
`outline` to `box-shadow` to create rounded corners in safari


v0.10.3
------------------------------
*March 10, 2022*

### Added
- checked attribute

### Changed
- `href` always added to link
- `isLink` test updated

v0.10.2
------------------------------
*March 8, 2022*

### Changed
- Margin between text and image

v0.10.1
------------------------------
*February 28, 2022*

### Changed
- Props and Events within `README.md`

v0.10.0
------------------------------
*February 25, 2022*

### Changed

- Moved `isToggleSelected` assignment into created lifecycle method for SSR
- Updated stories to use args instead of default value
- Added label style for `isLink`


v0.9.2
------------------------------
*February 23, 2022*

### Fixed
- Hide image on error

v0.9.1
------------------------------
*February 22, 2022*

### Added
- `f-vue-icons` as a dependency

v0.9.0
------------------------------
*February 14, 2022*

### Added
- `sass:math` to `vue.config` to allow `dart-sass` migration.


v0.8.0
------------------------------
*February 8, 2022*

### Changed
- Storybook, combine stories so ImageTile is always shown within a container.


v0.7.0
------------------------------
*February 8, 2022*

### Added
- Clickable component test

### Changed
- Upgraded to ESLint v8


v0.6.0
------------------------------
*January 31, 2022*

### Changed
- `spacing` references to new mapping from fozzie e.g spacing(x2) > spacing(d).


v0.5.1
------------------------------
*January 31, 2022*

### Changed
- Updated tabindex value on input

v0.5.0
------------------------------
*January 28, 2022*

### Added
- Focus styles for keyboard navigation


v0.4.0
------------------------------
*January 26, 2022*

### Added
- Styled and truncated text
- Transitions accounting for prefers-reduced-motion


v0.3.0
------------------------------
*January 19, 2022*

### Added
- ImageTile image and fallback image
- Supporting tests and stories


v0.2.0
------------------------------
*December 17, 2021*

### Added
- ImageTile component structure and toggling behaviour
- ImageTile stories

v0.1.0
------------------------------
*October 28, 2021*

### Added
- Created initial component using yeoman generator
- Added to circle ci cache
