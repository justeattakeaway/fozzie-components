# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v3.0.0
------------------------------
*September 24, 2021*

### Changed
- Updated version of `f-button`.
- New border radius from `pie-design-tokens` in line with icing phase 2.


v2.0.0
------------------------------
*September 16, 2021*

### Changed
- Updated version of `f-button`.

### Removed
- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.


v1.0.0
------------------------------
*September 15, 2021*

- Return beta to master. Component has JETSansDigital font.


v1.0.0-beta.0
------------------------------
*September 1, 2021*

### Changed
- Updated version of `f-button` (JETSans Update)


v0.12.1
------------------------------
*September 1, 2021*

### Changed
- Fixed bug where scrolling is not re-enabled if the modal is destroyed while open for whatever reason.


v0.12.0
------------------------------
*August 18, 2021*

### Changed
- Aligned to PIE designs
- Updated version of `f-button`.

v0.11.0
------------------------------
*July 14, 2021*

### Changed
- Updated version of `f-button`.
- Close button now uses type `ghostTertiary`.


v0.10.0
------------------------------
*May 25, 2021*

### Changed
- CSS variables to use pie design tokens instead of fozzie-colour-palette vars


v0.9.0
------------------------------
*May 19, 2021*

### Added
- `title` and `titleHtmlTag` props to allow passing the title value so that we can control the default display of the title inside the component
- Unit tests


v0.8.0
------------------------------
*May 6, 2021*

### Removed
- `u-overlay` css style definition as should come from `fozzie`


v0.7.0
------------------------------
*May 5, 2021*

### Added
- `isPositionedBottom` prop to allow modal to sit at the bottom of the screen for all screen widths.


v0.6.0
------------------------------
*March 5, 2021*

### Changed
- Updated npm dependencies.


v0.5.0
------------------------------
*March 3, 2021*

### Added
- Added component test file, component object file and tests
- Added `Data-test-id` to elements within the `MegaModal.stories.js`

### Changed
- Restructured component object into page object model
- Refactored component and accessibility tests


v0.4.0
------------------------------
*January 28, 2021*

### Changed
- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.
- Updated npm dependencies.

### Fixed
- Readme component reference.

v0.3.0
------------------------------
*December 9, 2020*

### Added
- Stylelint added to lint styling on build.
- `f-vue-icons` to use cross icon in the modal

### Changed
- 'jet' theme instead of 'je'
- Regular close button changed to button component

### Removed
- Bracket in Storybook file
- Hardcoded buttons from storybook file


v0.2.0
------------------------------
*August 6, 2020*

### Added
- CSS classes which can be targeted in a consuming application..

### Changed
- Tidied up close button styles.
- Use Fozzie colour aliases where possible.

### Fixed
- Spelling mistaxe.
- Moved config comment to correct prop.


v0.1.0
------------------------------
*August 5, 2020*

### Added
- Component structure and basic configuration (created using `generator-component`).
- Component markup and core functionality.
- Storybook config.
- Unit tests.
- Readme content.
