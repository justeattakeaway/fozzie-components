# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v3.6.1

_April 25, 2024_

### Changed

- Update `axios` to latest v0 version.


## v3.6.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

## v3.5.0

_November 15, 2022_

### Changed

- Added fozzie components as externals in Webpack config

## v3.4.0

_August 2, 2022_

### Changed

- Bundlewatch `maxSize`.
- Jest snapshot to include updated SVG

## v3.3.0

_July 29, 2022_

### Added

- Node 16 compatible version of `@justeat/f-services`.

## v3.2.0

_July 25, 2022_

### Added

- Node 16 support.

## v3.1.0

_July 15, 2021_

### Added

- Peer dependencies for fozzie components.

## v3.0.0

_July 14, 2022_

### Changed

- **breaking changes** Update to `@use` and `@forward` SASS syntax

## v2.14.0

_July 13, 2022_

### Changed

- Update f-wdio-utils to v1.1.0 to use new Axe Core implementation.
- Accessibility tests to be async.

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v2.13.0

_June 8, 2022_

### Added

- Added IE/ES/IT localization

## v2.12.0

_May 3, 2022_

### Changed

- Improved accessibility by adding <main> tag
- Updated f-vue-icons package

## v2.11.0

_April 4, 2022_

### Changed

- Added NZ localization

## v2.10.0

_February 23, 2022_

### Changed

- $logger interface to $log.

## v2.9.0

_January 14, 2022_

### Changed

- Accessibility improvements. Added an announcement about progress of takeaway pay activation

## v2.8.0

_December 1, 2021_

### Changed

- Update visual regression tests to include UK and AU tenants, as they have different branding (JustEat Pay / Menulog Pay).

## v2.7.0

_October 29, 2021_

### Changed

- Moved to the `components/pages` directory.

## v2.6.0

_October 29, 2021_

### Changed

- Added AU localization

## v2.5.1

_October 13, 2021_

### Changed

- Updated version of `f-button` which have styles for more space between action buttons. Removed custom styles added in v2.5.0.

## v2.5.0

_October 13, 2021_

### Changed

- Added more space between action buttons

## v2.4.0

_October 11, 2021_

### Changed

- Component tests
- Accessibility tests
- Visual regression tests

## v2.3.0

_October 8, 2021_

### Changed

- Takeaway Pay => Just Eat Pay renaming

## v2.2.1

_October 6, 2021_

Re-publish to clean up the old styles from the compiled package.

## v2.2.0

_October 6, 2021_

### Changed

- Reverted Takeaway Pay => Just Eat Pay renaming

## v2.1.0

_October 5, 2021_

### Added

- Visual regression tests

## v2.0.0

_October 5, 2021_

### Changed

- Updated version of `f-button` and `f-card` to include icing phase 2 changes.

### Removed

- `is-rounded` prop from `f-card` component call as the card is now rounded by default.

## v1.2.0

_September 16, 2021_

### Changed

- Updated version of `f-button` and `f-card`.

### Removed

- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.

## v1.1.0

_September 15, 2021_

### Changed

- Updated branding for UK

## v1.0.0

_September 15, 2021_

- Return beta to master. Component has JETSansDigital font.

## v1.0.0-beta.1

_September 1, 2021_

### Updated

- `f-button` to v2.0.0-beta.0 which use the new font

## v1.0.0-beta.0

_August 26, 2021_

### Updated

- New font JETSansDigital

## v0.9.0

_August 17, 2021_

### Changed

- Updated icons according to mockups

## v0.8.0

_August 13, 2021_

### Added

- Loading spinner

### Changed

- Cleanup styles

## v0.7.0

_August 9, 2021_

### Added

- Added logic to handle guest users
- Code cleanup

## v0.6.0

_August 9, 2021_

### Added

- Added logging around API requests

### Changed

- Updated version of `f-button`.

## v0.4.0

_July 20, 2021_

### Changed

- Updated version of `f-button`.
- Dynamically update UI based on activation states.

## v0.3.0

_June 30, 2021_

### Changed

- Extracted styles to the separate file

## v0.2.0

_June 27, 2021_

### Added

- Created markup/styles for the static components.

## v0.1.0

_May 14, 2021_

### Added

- Generated Takeaway Pay activation component.
