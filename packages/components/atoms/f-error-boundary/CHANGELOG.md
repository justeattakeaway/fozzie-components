# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v0.4.1
------------------------------
*November 21, 2022*

### Fixed
- Linting errors


v0.4.0
------------------------------
*September 5, 2022*

### Added
- `hasError` to `on-error` emitted event.

### Fixed
- Package `main` export filename.


v0.3.0
------------------------------
*July 15, 2022*

### Added
- Node 16 support.


v0.2.1
------------------------------
*June 15, 2022*

### Removed
- Removed vite as a dependency and moved to monorepo root `package.json`


v0.2.0
------------------------------
*November 5, 2021*

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


v0.1.0
------------------------------
*November 3, 2021*

### Added
- Initial generated component
