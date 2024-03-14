# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v3.5.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

## v3.4.0

_May 24, 2023_

### Changed

- Added active tab name to the change emit fire

## v3.3.0

_March 27, 2023_

### Changed

- New focus styles
  - These require the new colour tokens from `pie-design-tokens` which are included in `fozzie` v11+.

## v3.2.0

_July 19, 2022_

### Added

- Node 16 support.

## v3.1.0

_July 5, 2022_

### Changed

- Update f-wdio-utils to v1.1.0
- Update component objects / specs to use ES6 syntax.

## v3.0.0

_June 22, 2022_

### Changed

- Update to `@use` and `@forward` SASS syntax

## v2.1.1

_Jun 9, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

_May 26, 2022_

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v2.1.0

_May 22, 2022_

### Added

- Version of `node-sass` that's compatible with Node 16.

### Changed

- Upgraded to ESLint v8

## v2.0.0

_October 5, 2021_

### Changed

- New colour tokens from `pie-design-tokens` in line with icing phase 2.

## v1.0.0

_September 16, 2021_

### Removed

- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.

## v0.9.0

_July 22, 2021_

### Added

- `UPDATE_TITLE` injection to make tab title reactive.

## v0.8.0

_June 4, 2021_

### Changed

- Reverse animation direction (when choosing a tab that is further left, its contents should slide in from the left and vice-versa).

### Fixed

- Don't _change_ direction if tab selection isn't changing.

## v0.7.0

_June 3, 2021_

### Changed

- Emit `change` event when the tab is changed. Event payload contains the `new` and `prev` tab indices.

## v0.6.0

_June 2, 2021_

### Changed

- Button type from `submit` (the default) to `button` to prevent submission when tabs are used inside a form.

## v0.5.0

_May 25, 2021_

### Changed

- CSS variables to use pie design tokens instead of fozzie-colour-palette vars

## v0.4.0

_April 1, 2021_

### Fixed

- When tab selection is updated in `Tab` props, ensures that the focus is reflected back
  to surrounding `Tabs` component

### Changed

- Factored out Tabs' `provide` keys to constants

## v0.3.0

_March 3, 2021_

### Added

- Added component tests
- Added supporting code to component object file

### Changed

- `data-test-id` naming for `tab-` to `tab-button-` in `Tabs.vue` and `Tabs.test.js`
- `data-test-id` naming for `transition-tab-` to `tab-content-` in `Tab.vue` and `Tab.test.js`
- Restructured component object into page object model
- Refactored component and accessibility tests

## v0.2.1

_February 8, 2021_

### Added

- Added unit tests for the tabs component

## v0.2.0

_January 28, 2021_

### Added

- Added the first version of tabs with Tab and Tabs vue component

## v0.1.0

_January 21, 2021_

### Added

- Add generated output for tabs
