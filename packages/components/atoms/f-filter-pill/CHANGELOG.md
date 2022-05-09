# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v0.8.0
------------------------------
*May 9, 2022*

### Added
- Optional performance tracker prop

v0.7.0
------------------------------
*March 24, 2022*

### Added
- styles for loading skeleton

### Changed
- moved loading skeleton into separate component

v0.6.0
------------------------------
*March 24, 2022*

### Added
- `screenReaderMessage` prop for screen-reader friendly copy

### Changed
- Added `aria-hidden` attributes to the elements rendering `displayText` and `displayNumber`

v0.5.0
------------------------------
*March 16, 2022*

### Added
- `isLoading` prop to trigger skeleton loading

### Changed
- Removed `isToggleDisabled` property from filter pill component and instead directly reference the `isDisabled` prop
- Shorten how we pass props into the Storybook component
- Use selected color for outline when selected, instead of focus colour

v0.4.0
------------------------------
*March 15, 2022*

### Added
- `a` tag for the SEO reasons

v0.3.1
------------------------------
*March 14, 2022*

### Added
- Checked Attribute to Filter Pill

v0.3.0
------------------------------
*March 10, 2022*

### Added
- Animation on hover/select/unselect

### Changed
- Renamed SCSS variables

### Fixed
- Outline in Safari

v0.2.0
------------------------------
*February 23, 2022*

### Added
- FilterPill basic structure and functionality
- FilterPill basic styling

v0.1.0
------------------------------
*December 14, 2021*

### Added
- Initial scaffolding for new component
