# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v0.18.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14
- `@vue/cli-plugin-babel` to 5.0.0 to resolve snyk vulnerability

  0.17.0

---

_April 14, 2023_

### Added

- Added `hasRatingData` property to hide the RatingMultiStarVariant component until we have data
- Added mounted on the RatingMultiStarVariant and using Vue.nextTick to set the `hasRatingData` property after Vue.nextTick to ensure the % of masking over the filled stars occur after the DOM has been updated
- Default to 0 and log warning when star rating is not within the allowed range

### Changed

- `starRating` prop default and set it to use `0`.

### Removed

- Props validation for the star rating as this is not stateless

## v0.16.0

_March 27, 2023_

### Fixed

- `ratingDisplayType` prop default and set it to use `'short'`.
- Tests for `ratingDisplayType`.

## v0.15.0

_March 24, 2023_

### Added

- `locale` check to component when returning descriptions.

## v0.14.0

_December 12, 2022_

### Added

- Props:
  - `shouldAlignRatingTextLeft` to allow positioning of accompanying text and SVG icons.
  - `ratingFontSize` to allow large and default font sizes to be used.
- Visual tests to cover above additions.

### Removed

- Visual tests that weren't useful.

### Changed

- Updated to the new `pie-icons-vue` beta release.

## v0.13.0

_November 28, 2022_

### Added

- Translations for ES & IT

## v0.12.0

_November 21, 2022_

### Added

- `isUserRating` prop to control when (You) is displayed.
- Tests included – both unit and visual.

## v0.11.0

_November 17, 2022_

### Added

- `package.json` scripts to handle parallel jobs in CI.

## v0.10.0

_November 16, 2022_

### Added

- `xsmall` prop option.
- Visual tests to cover `xsmall` prop size.
- Unit tests to constant file to cover `xsmall` prop size.
- Note about usage for sizes.

### Fixed

- Text alignment issue.

## v0.9.0

_November 14, 2022_

### Fixed

- Description returned within `getRatingDescription` based on `starRating` value.
- Tests added to cover changes to method `getRatingDescription`.

## v0.8.0

_November 08, 2022_

### Fixed

- Some comments from version 0.7.0.
- Tests so they work with new changes.
- Simplify prop `ratingDisplayType` so now only accepts 3 options.

## v0.7.0

_November 01, 2022_

### Added

- Visual tests to cover changes in v0.6.0
- `hasRatingAvailable` computed value to handle when to display visually hidden text.

## v0.6.0

_October 26, 2022_

### Added

- rating.scss to shared styles between components.
- Unit tests to cover changes.
- Visual tests.

### Changed

- Split out from main rating file into Five & Single star components.

## v0.5.0

_October 24, 2022_

### Added

- Test coverage for code changes.
- Visual tests.
- Prop validation.
- Props `ratingDisplayType` & `reviewCount`.
- Storybook contains ratings in different sizes & formats.

### Changed

- Class names to be more suitable.

## v0.4.0

_October 19, 2022_

### Added

- Test coverage for code changes.
- `starRatingSize` to allow component sizing.
- Prop validation.

### Changed

- Refactored markup to allow fractional rating sizes.

## v0.3.0

_October 17, 2022_

### Changed

- `@justeattakeaway/pie-icons-vue` to live as DevDep for now.

## v0.2.0

_October 13, 2022_

### Added

- Test coverage for code changes.
- `pie-icons-vue` repo as `dep` to pull in the star icons.
- Stories component added.
- Prop `starRating` added to allow the consumer to pass in a value.
- Readme prop table.
- Snapshot test.

## v0.1.0

_October 10, 2022_

### Added

- Generator component initial code.
