# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 0.5.1 (2021-05-20)

**Note:** Version bump only for package @justeat/f-http





# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


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
