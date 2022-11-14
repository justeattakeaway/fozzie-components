# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v0.8.0
------------------------------
*November 08, 2022*

### Fixed
- Some comments from version 0.7.0.
- Tests so they work with new changes.
- Simplify prop `ratingDisplayType` so now only accepts 3 options.


v0.7.0
------------------------------
*November 01, 2022*

### Added
- Visual tests to cover changes in v0.6.0
- `hasRatingAvailable` computed value to handle when to display visually hidden text.


v0.6.0
------------------------------
*October 26, 2022*

### Added
- rating.scss to shared styles between components.
- Unit tests to cover changes.
- Visual tests.

### Changed
- Split out from main rating file into Five & Single star components.


v0.5.0
------------------------------
*October 24, 2022*

### Added
- Test coverage for code changes.
- Visual tests.
- Prop validation.
- Props `ratingDisplayType` & `reviewCount`.
- Storybook contains ratings in different sizes & formats.

### Changed
- Class names to be more suitable.


v0.4.0
------------------------------
*October 19, 2022*

### Added
- Test coverage for code changes.
- `starRatingSize` to allow component sizing.
- Prop validation.

### Changed
- Refactored markup to allow fractional rating sizes.


v0.3.0
------------------------------
*October 17, 2022*

### Changed
- `@justeattakeaway/pie-icons-vue` to live as DevDep for now.


v0.2.0
------------------------------
*October 13, 2022*

### Added
- Test coverage for code changes.
- `pie-icons-vue` repo as `dep` to pull in the star icons.
- Stories component added.
- Prop `starRating` added to allow the consumer to pass in a value.
- Readme prop table.
- Snapshot test.


v0.1.0
------------------------------
*October 10, 2022*

### Added
- Generator component initial code.
