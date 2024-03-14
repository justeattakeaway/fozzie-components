# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v.11.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

## v0.10.2

_September 4, 2023_

### Changed

- Bump jest from v25 to v26

## v0.10.1

_March 27, 2023_

### Changed

- Pin feature-management version to fix monorepo build issue

## v0.10.0

_July 25, 2022_

### Added

- Node 16 support.

## v0.9.1

_June 15, 2022_

### Removed

- Removed vite as a dependency and moved to monorepo root `package.json` to solve version conflict issue

## v0.9.0

_March 17, 2022_

### Changed

- Replace old deprecated logger with new interface

## v0.8.0

_March 3, 2022_

### Changed

- Replace in-situ feature management library with @justeat/feature-management

## v0.7.2

_February 21, 2022_

### Changed

- Fix import of config JSON action import for features store module

## v0.7.1

_November 23, 2021_

### Changed

- Enable namespacing for store

## v0.7.0

_November 18, 2021_

### Changed

- Improved error logging

## v0.6.0

_November 11, 2021_

### Changed

- Added Vue service encapsulating Vue plugin and store logic
- Separated Vue-specific and Vue-independent files
- Updated tests to match new structure

## v0.5.0

_October 27, 2021_

### Changed

- Separate config loading and module initialisation
- Switch from fetch to injected client + default axios client
- Update tests to use jest-mock-axios

## v0.4.0

_September 14, 2021_

### Added

- Ability to poll for config

## v0.3.0

_August 31, 2021_

### Changed

- Switched from Webpack to Vite for the build

## v0.2.0

_July 30, 2021_

### Added

- full implementation, aside from fetching config
- working e2e tests

## v0.1.0

_July 6, 2021_

### Added

- Skeleton interface
- Disabled tests
