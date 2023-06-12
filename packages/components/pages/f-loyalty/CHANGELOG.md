# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v3.2.0
------------------------------
*June 12, 2023*

### Fixed
- Patched content cards to the latest version 10.4.0


v3.1.2
------------------------------
*May 25, 2023*

### Fixed
- Patched content cards to the latest version 10.3.1


v3.1.1
------------------------------
*May 18, 2023*

### Fixed
- Pinned to a fixed f-globalisation version to prevent localisation breaking


v3.1.0
------------------------------
*April 18, 2023*

### Changed
- Upgraded to the new version the new adapters for stampcards and braze


v3.0.0
------------------------------
*February 13, 2022*

### Changed
- Upgraded to the new version of content cards component and included the new adapters for stampcards


v2.7.1
------------------------------
*November 21, 2022*

### Fixed
- Linting errors


v2.7.0
------------------------------
*November 8, 2022*

### Changed
- Added fozzie components as externals in Webpack config

### Deleted
- Old mocks

v2.6.0
------------------------------
*November 7, 2022*

### Changed
- Updated tenant files to include new image paths
- Updated tenant files to correct percentages
- Updated test file to have new tenants tested


v2.5.0
------------------------------
*August 3, 2022*

### Changed
- Changed some translation copy for AU for how it works section
- Modified tests to account for the translation changes


v2.4.0
------------------------------
*August 3, 2022*

### Added
- Node 16 compatible version of `@justeat/f-services`.
- Node 16 compatible version of `@justeat/f-globalisation`.
- New `maxSize` for Bundlewatch.


v2.3.0
------------------------------
*July 25, 2022*

### Added
- Node 16 support.


v2.2.0
-----------------------------
*July 19, 2022*

### Changed
- Move fozzie components to peer dependencies.


v2.1.0
------------------------------
*July 13, 2022*

### Changed
- Update f-wdio-utils to v1.1.0 to use new Axe Core implementation.
- Accessibility tests to be async.


v2.0.0
-----------------------------
*July 8, 2022*

### Changed
- **Breaking changes:** Update to `@use` and `@forward` SASS syntax.
- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.


v1.8.0
------------------------------
*February 25, 2022*

### Changed
- Updated the breadcrumbs component.
- Updated main component to include missing css


v1.7.3
------------------------------
*April 12, 2022*

### Added
- Check for auth token before setting global user id


v1.7.2
------------------------------
*April 5, 2022*

### Added
- Added in new logging around jwt decoding for error catching


v1.7.0
------------------------------
*February 25, 2022*

### Changed
- Updated f-content-cards to the latest which uses a new $log interface.


v1.6.1
------------------------------
*February 17, 2022*

### Changed
- Just a version bump as previous build output was bad


v1.6.0
------------------------------
*February 17, 2022*

### Changed
- updated image to have correct link


v1.5.0
------------------------------
*February 8, 2022*

### Changed
- updated tabs to animate


v1.4.0
------------------------------
*January 13, 2022*

### Changed
- updated content cards to v7


v1.3.0
------------------------------
*November 18, 2021*

### Added
- slots component to serve cards provided by content cards


v1.2.0
------------------------------
*November 4, 2021*

### Changed
- Moved component so that it's now in `Pages` rather than `Organisms`.


v1.1.0
------------------------------
*October 28, 2021*

### Added
- f-breadcrumbs upgrade


v1.0.1
------------------------------
*October 27, 2021*

### Added
- f-button which was missing


v1.0.0
------------------------------
*October 14, 2021*

### Added
- Loading state component.
- Unit tests for the loading state component


v1.1.0
------------------------------
*October 14, 2021*

### Added
- Slots component
- Unit tests for the component


v0.9.0
------------------------------
*October 7, 2021*

### Added
- Terms component
- Unit tests for the component


v0.8.0
------------------------------
*October 7, 2021*

### Added
- No card's error state


v0.7.0
------------------------------
*October 5, 2021*

### Changed
- Updated version of `f-breadcrumbs` and `f-tabs` to include icing phase 2 changes.


v0.6.0
------------------------------
*September 22, 2021*

### Added
- Unauthenticated state for when user is not logged in.
- Unit tests for the page


v0.5.0
------------------------------
*September 16, 2021*

### Changed
- Updated version of `f-media-element`, `f-breadcrumbs` and `f-tabs` to remove normalize styles from the build.

### Removed
- Unused f-button and f-card dependencies


v0.4.0
------------------------------
*August 24, 2021*

### Added
- Tabs to show how it works
- How it works page
- Unit tests for how it works page


v0.3.0
------------------------------
*July 29, 2021*

### Added
- Header component and associated i18n text
- Unit tests for Header component


v0.2.0
------------------------------
*July 20, 2021*

### Added
- Vuex module for storing data for the loyalty system
- Registration for the vuex module
- Base config for globalisation mixin


v0.1.0
------------------------------
*June 2, 2021*

### Added
- Initial generation of component from the generator
