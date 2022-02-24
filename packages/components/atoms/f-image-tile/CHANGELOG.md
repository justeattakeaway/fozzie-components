# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v0.9.3
------------------------------
*February 24, 2022*

### Changed
        
- Moved `isToggleSelected` assignement into created lifecycle method for SSR


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
