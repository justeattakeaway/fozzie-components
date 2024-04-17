# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v2.5.0

_April 16, 2024_

### Changed

- - `fozzie` in package.json to `11x`

## v2.4.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

_December 5, 2022_

### Changed

- Updated to the new `pie-icons-vue` beta release.

## v2.3.0

_September 30, 2022_

### Added

- `fozzie` as peerDep so consuming applications use the correct version of `fozzie` when using `f-error-message` v2.3.0.

### Fixed

- `font-size` call to `body-s`. Version 9 of fozzie changed the way default value was used which causes the size to increase now.

## v2.2.0

_July 15, 2022_

### Added

- Node 16 support.

## v2.1.0

_July 4, 2022_

### Changed

- Update f-wdio-utils to v1.1.0 to use new Axe Core implementation.
- Accessibility tests to be async.
- Specs to ES6 syntax

## v2.0.0

_June 15, 2022_

### Changed

- **_ Breaking change _** - Implement @use for fozzie where required.

## v1.2.1

_Jun 10, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

_May 27, 2022_

### Removed

- unneeded `load` and `waitForComponent` functions from component object

_May 26, 2022_

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v1.2.0

_May 13, 2022_

### Changed

- Icons in component and storybook files

### Removed

- `@justeat/f-vue-icons`

### Added

- `@justeattakeaway/pie-icons-vue`

## v1.1.0

_January 28, 2022_

### Changed

- `spacing` references to new mapping from fozzie e.g spacing(x2) > spacing(d).

## v1.0.0

_September 16, 2021_

### Removed

- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.

## v0.6.0

_August 25, 2021_

### Added

- `role="alert"` attribute to error component.
- Tests to cover `role="alert"` addition.

## v0.5.0

_May 25, 2021_

### Changed

- CSS variables to use pie design tokens instead of fozzie-colour-palette vars

## v0.4.0

_March 3, 2021_

### Added

- Added component test file and tests

_February 25, 2021_

### Changed

- Restructured component object into page object model
- Refactored accessibility tests

_December 30, 2020_

### Changed

- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.

## v0.3.1

_November 12, 2020_

### Fixed

- Reference to old `base` variable in font-size mixin.

## v0.3.0

_November 12, 2020_

### Changed

- Icon from `Warning Icon` to `Danger Icon`.

### Added

- Styling to display icon inline with text for multiline messages.

## v0.2.0

_October 26, 2020_

### Added

- Built out functionality
- Added unit tests

## v0.1.0

_October 6, 2020_

### Added

- Initial commit
