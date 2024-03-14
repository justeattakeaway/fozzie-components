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
- Use border for "selected" styles instead of box-shadow to avoid conflict with new focus styles.

## v1.3.0

_July 29, 2022_

### Added

- Node 16 compatible version of `@justeat/f-vue-icons`.

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

## v1.0.0

_Jun 16, 2022_

### Changed

- **_ Breaking change _** - Implement @use for fozzie where required.

## v0.8.1

_Jun 10, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

_May 27, 2022_

### Removed

- unneeded `load` and `waitForComponent` functions from component object

_May 26, 2022_

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v0.8.0

_May 9, 2022_

### Added

- Optional `performanceTracker` prop & `performanceTrackerLabel` prop

## v0.7.0

_March 24, 2022_

### Added

- styles for loading skeleton

### Changed

- moved loading skeleton into separate component

## v0.6.0

_March 24, 2022_

### Added

- `screenReaderMessage` prop for screen-reader friendly copy

### Changed

- Added `aria-hidden` attributes to the elements rendering `displayText` and `displayNumber`

## v0.5.0

_March 16, 2022_

### Added

- `isLoading` prop to trigger skeleton loading

### Changed

- Removed `isToggleDisabled` property from filter pill component and instead directly reference the `isDisabled` prop
- Shorten how we pass props into the Storybook component
- Use selected color for outline when selected, instead of focus colour

## v0.4.0

_March 15, 2022_

### Added

- `a` tag for the SEO reasons

## v0.3.1

_March 14, 2022_

### Added

- Checked Attribute to Filter Pill

## v0.3.0

_March 10, 2022_

### Added

- Animation on hover/select/unselect

### Changed

- Renamed SCSS variables

### Fixed

- Outline in Safari

## v0.2.0

_February 23, 2022_

### Added

- FilterPill basic structure and functionality
- FilterPill basic styling

## v0.1.0

_December 14, 2021_

### Added

- Initial scaffolding for new component
