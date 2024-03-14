# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v1.5.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

_March 27, 2023_

### Fixed

- Broken/commented tests from v1.3.0.

## v1.4.0

_March 26, 2023_

### Removed

- v1.3.0 revert this change.

### Added

- `locale` & `localeConfig` guard to protect consuming applications against having to provide a locale.
- Test to support change.

## v1.3.0

_March 24, 2023_

### Fixed

- Add a check for locale passed and do not set up locale if not passed by consuming app.

## v1.2.0

_March 22, 2023_

### Fixed

- Merge locale messages instead of replacing them.

## v1.1.0

_July 25, 2022_

### Added

- Node 16 support.

## v1.0.0

_December 17, 2020_

### Added

- Support for `dateTimeFormats`, which requires a change in the structure of the tenancy files.

## v0.2.0

_November 10, 2020_

### Added

- Provided a wrapper around the vue-i18n module for component tests to import

## v0.1.0

_November 9, 2020_

### Added

- Added a Globalisation Mixin which performs all required wiring to integrate vue-i18n
