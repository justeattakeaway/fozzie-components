# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

Latest (add to next release)
------------------------------
*May 27, 2021*

### Removed
- unneeded `load` and `waitForComponent` functions from component object

*May 26, 2021*

### Changed
- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.


v1.2.0
------------------------------
*May 13, 2022*

### Changed
- Icons in component and storybook files

### Removed
- `@justeat/f-vue-icons`

### Added
- `@justeattakeaway/pie-icons-vue`


v1.1.0
------------------------------
*January 28, 2022*

### Changed
- `spacing` references to new mapping from fozzie e.g spacing(x2) > spacing(d).


v1.0.0
------------------------------
*September 16, 2021*

### Removed
- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.


v0.6.0
------------------------------
*August 25, 2021*

### Added
- `role="alert"` attribute to error component.
- Tests to cover `role="alert"` addition.


v0.5.0
------------------------------
*May 25, 2021*

### Changed
- CSS variables to use pie design tokens instead of fozzie-colour-palette vars


v0.4.0
------------------------------
*March 3, 2021*

### Added
- Added component test file and tests

*February 25, 2021*

### Changed
- Restructured component object into page object model
- Refactored accessibility tests

*December 30, 2020*

### Changed
- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.


v0.3.1
------------------------------
*November 12, 2020*

### Fixed
- Reference to old `base` variable in font-size mixin.


v0.3.0
------------------------------
*November 12, 2020*

### Changed
- Icon from `Warning Icon` to `Danger Icon`.

### Added
- Styling to display icon inline with text for multiline messages.


v0.2.0
------------------------------
*October 26, 2020*

### Added
- Built out functionality
- Added unit tests


v0.1.0
------------------------------
*October 6, 2020*

### Added
- Initial commit
