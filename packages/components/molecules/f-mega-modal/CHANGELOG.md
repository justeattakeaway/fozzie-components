# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v5.0.0
------------------------------
*April 11, 2022*

### Added
- `isTextAlignedCenter` prop - this allows modal content to be center aligned (previously aligned center by default)
### Changed
- Modal content is now left aligned by default
- Modal title and close button now sit on the same line, and the close button sites on the baseline when the title breaks to multiple lines
- Close button inset positioning changed to stay in-line with the first line of title
- Increased modal widths by 10%
- Changed close button icon color to `$color-interactive-primary`

v4.2.0
------------------------------
*February 11, 2022*

### Changed
- box-shadow values to use the elevation token from the pie-design-tokens.


v4.1.0
------------------------------
*February 2, 2022*

### Changed
- `f-button` version.


v4.0.2
------------------------------
*January 20, 2022*

### Added
- prop and computed property added for `ariaLabel` in MegaModal.vue


v4.0.1
------------------------------
*January 19, 2022*

### Added
- `aria-labelledBy` to MegaModal.vue to remove violations in storybook


v4.0.0
------------------------------
*November 26, 2021*

### Added
- **Breaking Change**: Added `f-button` dependency to peer dependencies. Now `f-button` should be included as a dependency of the consuming componet or application.

### Removed
- **Breaking Change**: Removed `f-button` styles import from the component. Make sure to import `f-button` styles in your application.


v3.0.2
------------------------------
*October 15, 2021*

Republish to fix a bad previous publish.


v3.0.1
------------------------------
*October 14, 2021*

### Changed
- Updated version of `f-button`.


v3.0.0
------------------------------
*October 5, 2021*

### Changed
- Updated version of `f-button`.
- New border radius from `pie-design-tokens` in line with icing phase 2.
- Close button type from `ghostTertiary` to `iverse`.


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
