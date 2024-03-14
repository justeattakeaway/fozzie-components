# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v6.3.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

_December 5, 2022_

### Changed

- Updated to the new `pie-icons-vue` beta release.

v6.2.0

---

_July 19, 2022_

### Added

- Node 16 support.

## v6.1.0

_July 5, 2022_

### Changed

- Update f-wdio-utils to v1.1.0
- Update component objects / specs to use ES6 syntax.

## v6.0.0

_June 24, 2022_

### Changed

- devDependency version range to match peerDependencies.

## v5.0.1

_June 20, 2022_

### Fixed

- Alert messages are now read out to accessible users when displayed

## v5.0.0

_June 17, 2022_

### Changed

- Update to `@use` and `@forward` SASS syntax

## v4.4.1

_June 9, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

_May 26, 2021_

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v4.4.0

_May 13, 2022_

### Changed

- Icons in component

### Removed

- `@justeat/f-vue-icons`

### Added

- `@justeattakeaway/pie-icons-vue`

## v4.3.0

_February 17, 2022_

### Fixed

- Small CSS bug when cross icon is displayed

### Changed

- Bump of `f-vue-icons` with new cross and info icon
- defined svg fill colour inside the component

_February 8, 2022_

### Added

- Visual regression tests

## v4.2.0

_February 2, 2022_

### Changed

- `f-button` version.

## v4.1.0

_January 24, 2022_

### Changed

- Aligned the title with the icons
- Set the distance between the title and description & margins to meet the Icing designs.

## v4.0.0

_November 26, 2021_

### Added

- **Breaking Change**: Added `f-button` dependency to peer dependencies. Now `f-button` should be included as a dependency of the consuming componet or application.

### Removed

- **Breaking Change**: Removed `f-button` styles import from the component. Make sure to import `f-button` styles in your application.

## v3.0.2

_October 15, 2021_

Republish to fix a bad previous publish.

## v3.0.1

_October 14, 2021_

### Changed

- Updated version of `f-button`.

## v3.0.0

_October 5, 2021_

### Changed

- Updated version of `f-button`.
- New colour scheme and border radius from `pie-design-tokens` in line with icing phase 2.

## v2.0.0

_September 16, 2021_

### Changed

- Updated version of `f-button`.

### Removed

- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.

## v1.0.0

_September 15, 2021_

- Return beta to master. Component has JETSansDigital font.

## v1.0.0-beta.0

_September 1, 2021_

### Changed

- Updated version of `f-button` (JETSans Update)

## v0.7.0

_July 14, 2021_

### Changed

- Updated version of `f-button`.
- Close button now uses type `ghostTertiary`.

## v0.6.1

_June 09, 2021_

### Fixed

- Alert icon no longer resizes as content around it grows
- Warning icon no longer receives greater margin than the other alert types
- Items in the header are no longer vertically aligned as the content may exceed one line
- Added some spacing below the title so that the component doesn't feel so mushed

## v0.6.0

_May 25, 2020_

### Changed

- CSS variables to use pie design tokens instead of fozzie-colour-palette vars

## v0.5.0

_March 18, 2020_

### Changed

- Heading font size increase.
- Heading padding decrease.

_February 25, 2021_

### Changed

- Restructured component object into page object model
- Refactored component and accessibility tests

_January 12, 2021_

### Changed

- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.
- Update version of `f-button`.

## v0.4.0

_December 7, 2020_

### Changed

- Regular button changed to vue button component
- Renamed VueAlert to FAlert

### Updated

- `f-vue-icons` to the latest version (1.13.0)

## v0.3.0

_November 30, 2020_

### Added

- Ability to change prop values in demo file for WebDriverIO component tests.
- New `demo-controls.js` component object for f-alert controls.

## v0.2.0

_October 26, 2020_

### Added

- Stylelint added to lint styling on build.
- data-test IDs to Alert Component
- Basic tests for Alert
- Alert Component-Object

## v0.1.1

_October 20, 2020_

### Changed

- Removing unwanted comment from the code.

## v0.1.0

_October 20, 2020_

### Added

- Initial version with support for `danger`, `warning`, `success` and `info` dismissable/non-dismissable alerts.
