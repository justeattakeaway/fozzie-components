# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v1.5.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

## v1.4.1

_September 4, 2023_

### Changed

- Bump jest from v25 to v26

## v1.4.0

_July 25, 2022_

### Added

- Node 16 support.

## v1.3.1

_June 15, 2022_

### Removed

- Removed vite as a dependency and moved to monorepo root `package.json` to solve version conflict issue

## v1.3.0

- September 8, 2021\*

### Fixed

- `dist` references to resolve import error in consuming application.

## v1.2.0

- September 3, 2021\*

### Removed

- `webpack` references from package.json.
- `webpack.config.js` from directory.

### Added

- `vite` config & build command to package.json > scripts.

## v1.1.0

- February 1, 2021\*

### Added

- `uglifyjs-webpack-plugin` so we can output `min.js` files.

## v1.0.0

- January 20, 2021\*

### Added

- Migrate repository
