# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v1.1.1

_April 25, 2024_

### Changed

- Update `axios` to latest v0 version.


## v1.1.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

## v1.0.2

_October 4, 2022_

### Added

- `storybook:build` script to package.json

## v1.0.1

_September 16, 2022_

### Changed

- Normally import `Axios` rather than lazy require to fix test adapter issues

## v1.0.0

_September 16, 2022_

### Added

- Now accepts a function to load cookies
- Now attempts to append conversation id headers to each call (driven by cookie value)

### Fixed

- Isomorphism error when using http serverside

## v0.10.0

_July 25, 2022_

### Added

- Node 16 support.

## v0.9.1

_June 15, 2022_

### Removed

- Removed vite as a dependency and moved to monorepo root `package.json` to solve version conflict issue

## v0.9.0

_September 01, 2021_

### Changed

- Generate and output source maps

## v0.8.1

_August 11, 2021_

### Fixed

- Issue where f-http wasn't building for Storybook.

## v0.8.0

_August 09, 2021_

### Changed

- Converted from vue-cli-service to vite

## v0.7.0

_August 05, 2021_

### Added

- Mock Factory: Now supports passing through of requests

### Changed

- Mock Factory: Setup Mock Response does not require request data to be provided

### Fixed

- Correctly point the main entry point at the dist folder

## v0.6.1

_August 03, 2021_

### Added

- Support for resetting mocks between tests

### Changed

- Updated and simplfiied documentation

### Fixed

- Corrections to a few class names
- Removed async from the Mock Factory

## v0.6.0

_July 26, 2021_

### Changed

- Accept an instance of f-statistics when initialising a client, doing so means that interceptors record response timings and publish a statistic with the details.
- Several files were changed to objects with constructors because not doing so means that configuration can bleed when more than one instance is initiaised.

## v0.5.0

_May 18, 2021_

### Added

- Injected a request/response interceptor to capture and report api timings/details

## v0.4.1

_May 11, 2021_

### Changed

- Return status code to support PACT tests further down the stack

## v0.4.0

_May 6, 2021_

### Added

- Expose HTTPVerbs for PUT, PATCH, DELETE
- Expose methods for PUT, PATCH, DELETE on client
- Expose a method for setting authorisation token for all requests from a client
- Ability to name a client - useful when we can push stats and logs by API or grouping name

## v0.3.0

_April 30, 2021_

### Added

- Support for content type option
- Implemented createMockClient to make integration testing easier
- Ability to setup mock API responses
- Exposed HTTPVerbs as constants

## v0.2.0

_April 26, 2021_

### Added

- Support for configuration merging
- Support for basic GET and POST requests

### Changed

- Updated Readme documentation

## v0.1.0

_April 26, 2021_

### Added

- Created package
