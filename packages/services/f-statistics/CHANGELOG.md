# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v0.7.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

## v0.6.0

_July 25, 2022_

### Added

- Node 16 support.

## v0.5.1

_June 15, 2022_

### Removed

- Removed vite as a dependency and moved to monorepo root `package.json` to solve version conflict issue

## v0.5.0

_Febuary 07, 2022_

### Added

- Ability to batch publish logs based on length, interval and byte size

## v0.4.0

_October 19, 2021_

### Added

- Ability to pass in custom properties during initialization which stick around
- Above properties are now published with every statistic

## v0.3.0

_September 01, 2021_

### Changed

- Generate and output source maps

## v0.2.0

_August 09, 2021_

- ### Fixed
- Change build process to Vite

## v0.1.1

_June 16, 2021_

- ### Fixed
- Correctly point the main entry point at the dist folder

## v0.1.0

_June 16, 2021_

### Added

- Created package with initial MVP
