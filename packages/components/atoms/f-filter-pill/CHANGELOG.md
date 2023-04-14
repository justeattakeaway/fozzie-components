# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v1.4.0
------------------------------
*March 27, 2023*

### Changed
- New focus styles
  - These require the new colour tokens from `pie-design-tokens` which are included in `fozzie` v11+.
- Use border for "selected" styles instead of box-shadow to avoid conflict with new focus styles.


v1.3.0
------------------------------
*July 29, 2022*

### Added
- Node 16 compatible version of `@justeat/f-vue-icons`.


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


v1.0.0
-----------------------------
*Jun 16, 2022*

### Changed
- *** Breaking change *** - Implement @use for fozzie where required.


v0.8.1
-----------------------------
*Jun 10, 2022*

### Changed
- Bumped wdio version and fixed breaking changes.

*May 27, 2022*

### Removed
- unneeded `load` and `waitForComponent` functions from component object

*May 26, 2022*

### Changed
- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.


v0.8.0
------------------------------
*May 9, 2022*

### Added
- Optional `performanceTracker` prop & `performanceTrackerLabel` prop


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
