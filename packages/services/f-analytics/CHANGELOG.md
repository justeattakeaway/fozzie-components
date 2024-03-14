# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v1.21.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

## v0.20.1

_September 20, 2022_

### Changed

- No change just verion bump to align with npm

## v0.19.0

_September 16, 2022_

### Changed

- Converted the objects being passed to `pushEvent()` to simple object which removes any unwanted reflection details

## v0.18.0

_July 25, 2022_

### Added

- Node 16 support.

## v0.17.1

_June 15, 2022_

### Removed

- Removed vite as a dependency and moved to monorepo root `package.json` to solve version conflict issue

## v0.17.0

_September 27, 2021_

### Changed

- Removed the plugin and moved logic to into the Service constructor, onus now on consumer to declare as global in local plugin

## v0.16.0

_September 24, 2021_

### Changed

- Removed the redundant fields from pushPlatformData() & pushPageData().

## v0.15.0

_September 21, 2021_

### Changed

- Always attempt to register the store but always preserve state, if present.
- Removed the redundant `groupName` prop from pushPageData().

## v0.14.0

_September 10, 2021_

### Added

- Support for isPilot property

## v0.13.0

_September 07, 2021_

### Changed

- Read pageData.conversationId from x-je-conversation cookie
- Updated analytics.mapper functions to return new objects

## v0.12.0

_September 3, 2021_

### Added

- The ability to override/reset the Options `Feature Name` and/or `Locale` after plugin registration via the `pushPlatformData()` method.
- The ability to add a list of fields to pushPlatformData(), pushPageData() & pushUserData() methods that overrides any of the fields already present and if not present then adds the fields.

## v0.11.0

_September 01, 2021_

### Changed

- Generate and output source maps

## v0.10.0

_August 19, 2021_

### Changed

- Moved the prepPageData from Mixin into Service to allow the consumer to dictate when to push the GA data.
- Remove redundant Mixin
- Updated readme

## v0.9.0

_August 16, 2021_

### Changed

- Moved the prepUserData from Mixin into Service to allow the consumer to dictate when to push the GA data.

## v0.8.0

_August 12, 2021_

### Added

- Added push ad-hoc event method to global var

### Changed

- Moved the preparation of the server side plaform data to a plugin.
- Refactored the Store to allow store serverside events to be stored until clientside.

## v0.7.0

_August 10, 2021_

### Added

- `PreparePageData` method

### Changed

- Replaced `MAP_ROUTE_TO_FEATURE_NAME` const with `mapRouteToGroup` & `mapRouteToFeature`

## v0.6.0

_August 9, 2021_

### Added

- `PrepareUserData` method

### Changed

- `PrepareAnalytics` method renamed to `PreparePlatformData`
- `null` values changed to `undefined` because of analytics team requirement

### Removed

- Watch and mounted hook for prepare and push functions as now they will be called from a consuming app

## v0.5.0

_July 28, 2021_

### Changed

- Moved the preparation of the gtm tags to a plugin.
- Expose service globally within the plugin.

## v0.4.0

_July 26, 2021_

### Added

- Route to Feature name constant mapper.

## v0.3.0

_July 2, 2021_

### Added

- Added `analytics.mixin.vue` to handle GTM/GA platformData push logic

## v0.2.0

_July 1, 2021_

### Added

- Remove markup and convert to `Service`

## v0.1.0

_June 17, 2021_

### Added

- Initial scaffolding for new component
