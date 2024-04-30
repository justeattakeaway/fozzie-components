# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v3.4.1

_April 29, 2024_

### Changed

- Bump `@vue/cli-plugin-babel` from v5.0.0 to v5.0.8


## v3.4.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14
- `@vue/cli-plugin-babel` to 5.0.0 to resolve snyk vulnerability

## v3.3.1

_September 4, 2023_

### Changed

- Updated http-request-mock to patch vulnerability.

## v3.3.0

_August 1, 2023_

### Removed

- removed braze adapter

## v3.2.2

_June 27, 2023_

### Fixed

- Patched content cards to the latest version 10.4.2

## v3.2.1

_June 22, 2023_

### Fixed

- Patched content cards to the latest version 10.4.1

## v3.2.0

_June 12, 2023_

### Fixed

- Patched content cards to the latest version 10.4.0

## v3.1.2

_May 25, 2023_

### Fixed

- Patched content cards to the latest version 10.3.1

## v3.1.1

_May 18, 2023_

### Fixed

- Pinned to a fixed f-globalisation version to prevent localisation breaking

## v3.1.0

_April 18, 2023_

### Changed

- Upgraded to the new version the new adapters for stampcards and braze

## v3.0.0

_February 13, 2022_

### Changed

- Upgraded to the new version of content cards component and included the new adapters for stampcards

## v2.7.1

_November 21, 2022_

### Fixed

- Linting errors

## v2.7.0

_November 8, 2022_

### Changed

- Added fozzie components as externals in Webpack config

### Deleted

- Old mocks

## v2.6.0

_November 7, 2022_

### Changed

- Updated tenant files to include new image paths
- Updated tenant files to correct percentages
- Updated test file to have new tenants tested

## v2.5.0

_August 3, 2022_

### Changed

- Changed some translation copy for AU for how it works section
- Modified tests to account for the translation changes

## v2.4.0

_August 3, 2022_

### Added

- Node 16 compatible version of `@justeat/f-services`.
- Node 16 compatible version of `@justeat/f-globalisation`.
- New `maxSize` for Bundlewatch.

## v2.3.0

_July 25, 2022_

### Added

- Node 16 support.

## v2.2.0

_July 19, 2022_

### Changed

- Move fozzie components to peer dependencies.

## v2.1.0

_July 13, 2022_

### Changed

- Update f-wdio-utils to v1.1.0 to use new Axe Core implementation.
- Accessibility tests to be async.

## v2.0.0

_July 8, 2022_

### Changed

- **Breaking changes:** Update to `@use` and `@forward` SASS syntax.
- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v1.8.0

_February 25, 2022_

### Changed

- Updated the breadcrumbs component.
- Updated main component to include missing css

## v1.7.3

_April 12, 2022_

### Added

- Check for auth token before setting global user id

## v1.7.2

_April 5, 2022_

### Added

- Added in new logging around jwt decoding for error catching

## v1.7.0

_February 25, 2022_

### Changed

- Updated f-content-cards to the latest which uses a new $log interface.

## v1.6.1

_February 17, 2022_

### Changed

- Just a version bump as previous build output was bad

## v1.6.0

_February 17, 2022_

### Changed

- updated image to have correct link

## v1.5.0

_February 8, 2022_

### Changed

- updated tabs to animate

## v1.4.0

_January 13, 2022_

### Changed

- updated content cards to v7

## v1.3.0

_November 18, 2021_

### Added

- slots component to serve cards provided by content cards

## v1.2.0

_November 4, 2021_

### Changed

- Moved component so that it's now in `Pages` rather than `Organisms`.

## v1.1.0

_October 28, 2021_

### Added

- f-breadcrumbs upgrade

## v1.0.1

_October 27, 2021_

### Added

- f-button which was missing

## v1.0.0

_October 14, 2021_

### Added

- Loading state component.
- Unit tests for the loading state component

## v1.1.0

_October 14, 2021_

### Added

- Slots component
- Unit tests for the component

## v0.9.0

_October 7, 2021_

### Added

- Terms component
- Unit tests for the component

## v0.8.0

_October 7, 2021_

### Added

- No card's error state

## v0.7.0

_October 5, 2021_

### Changed

- Updated version of `f-breadcrumbs` and `f-tabs` to include icing phase 2 changes.

## v0.6.0

_September 22, 2021_

### Added

- Unauthenticated state for when user is not logged in.
- Unit tests for the page

## v0.5.0

_September 16, 2021_

### Changed

- Updated version of `f-media-element`, `f-breadcrumbs` and `f-tabs` to remove normalize styles from the build.

### Removed

- Unused f-button and f-card dependencies

## v0.4.0

_August 24, 2021_

### Added

- Tabs to show how it works
- How it works page
- Unit tests for how it works page

## v0.3.0

_July 29, 2021_

### Added

- Header component and associated i18n text
- Unit tests for Header component

## v0.2.0

_July 20, 2021_

### Added

- Vuex module for storing data for the loyalty system
- Registration for the vuex module
- Base config for globalisation mixin

## v0.1.0

_June 2, 2021_

### Added

- Initial generation of component from the generator
