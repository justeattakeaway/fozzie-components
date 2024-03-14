# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v0.5.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

## v0.4.1

_November 21, 2022_

### Fixed

- Linting errors

## v0.4.0

_September 5, 2022_

### Added

- `hasError` to `on-error` emitted event.

### Fixed

- Package `main` export filename.

## v0.3.0

_July 15, 2022_

### Added

- Node 16 support.

## v0.2.1

_June 15, 2022_

### Removed

- Removed vite as a dependency and moved to monorepo root `package.json`

## v0.2.0

_November 5, 2021_

### Added

- Implemented logic in component to handle capturing errors and providing information back to the parent component.
- logger service to generate the logging payload.
- Unit tests for logger service.
- Storybook examples with demo components.
- Readme description.

### Changed

- Moved component into the `components` directory.
- Used updated Vite config definition.

### Removed

- Dead status badges on the readme.

## v0.1.0

_November 3, 2021_

### Added

- Initial generated component
