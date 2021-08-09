# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v0.8.0
------------------------------
*August 09, 2021*

### Changed
- Converted from vue-cli-service to vite


v0.7.0
------------------------------
*August 05, 2021*

### Added
- Mock Factory: Now supports passing through of requests

### Changed
- Mock Factory: Setup Mock Response does not require request data to be provided

### Fixed
- Correctly point the main entry point at the dist folder


v0.6.1
------------------------------
*August 03, 2021*

### Added
- Support for resetting mocks between tests

### Changed
- Updated and simplfiied documentation

### Fixed
- Corrections to a few class names
- Removed async from the Mock Factory


v0.6.0
------------------------------
*July 26, 2021*

### Changed
- Accept an instance of f-statistics when initialising a client, doing so means that interceptors record response timings and publish a statistic with the details.
- Several files were changed to objects with constructors because not doing so means that configuration can bleed when more than one instance is initiaised.


v0.5.0
------------------------------
*May 18, 2021*

### Added
- Injected a request/response interceptor to capture and report api timings/details


v0.4.1
------------------------------
*May 11, 2021*

### Changed
- Return status code to support PACT tests further down the stack


v0.4.0
------------------------------
*May 6, 2021*

### Added
- Expose HTTPVerbs for PUT, PATCH, DELETE
- Expose methods for PUT, PATCH, DELETE on client
- Expose a method for setting authorisation token for all requests from a client
- Ability to name a client - useful when we can push stats and logs by API or grouping name

v0.3.0
------------------------------
*April 30, 2021*

### Added
- Support for content type option
- Implemented createMockClient to make integration testing easier
- Ability to setup mock API responses
- Exposed HTTPVerbs as constants

v0.2.0
------------------------------
*April 26, 2021*

### Added
- Support for configuration merging
- Support for basic GET and POST requests

### Changed
- Updated Readme documentation

v0.1.0
------------------------------
*April 26, 2021*

### Added
- Created package
