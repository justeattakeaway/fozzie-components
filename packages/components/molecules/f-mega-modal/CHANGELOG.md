# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v7.7.1

_April 29, 2024_

### Changed

- Bump `@vue/cli-plugin-babel` from v5.0.0 to v5.0.8


## v7.7.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14
- `@vue/cli-plugin-babel` to 5.0.0 to resolve snyk vulnerability

### Added

- node engines 18 and 20 to `package.json`

## v7.6.0

_August 8, 2023_

### Added

- `position: fixed;` to modal to allow `z-index` to apply.

## v7.5.0

_June 13, 2023_

### Changed

- Upgraded `@justeat/f-button` to `v5.x`

## v7.4.1

_April 28, 2023_

### Fixed

- Linting warning.

## v7.4.0

_April 12, 2023_

### Added

- Prop `closeButtonStyle` allows either a chevron icon `chevron-left-icon` or close icon `close-small-icon` to be used.
- `isModeRightToLeft` prop to allow a chevron icon to be used in a right to left tenant.

## v7.3.0

_March 27, 2023_

### Changed

- Handle new focus styles from fozzie v11.
  - Button positioning was specified as `'relative'` by default and needed overriding in some scenarios.
- Updated to the new `pie-icons-vue` beta release.

## v7.2.1

_August 31, 2022_

### Fixed

- Flush styles

## v7.2.0

_July 19, 2022_

### Added

- Node 16 support.

## v7.1.0

_July 5, 2022_

### Changed

- Update f-wdio-utils to v1.1.0
- Update component objects / specs to use ES6 syntax.

## v7.0.0

_June 24, 2022_

### Changed

- peerDependency versions to use new major version.
- devDependency version range to match peerDependencies.

## v6.0.0

_June 20, 2022_

### Changed

- Update to `@use` and `@forward` SASS syntax

## v5.1.1

_June 9, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

_May 26, 2022_

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v5.1.0

_May 13, 2022_

### Changed

- Icons in component

### Removed

- `@justeat/f-vue-icons`

### Added

- `@justeattakeaway/pie-icons-vue`

## v5.0.0

_April 11, 2022_

### Added

- `isTextAlignedCenter` prop - this allows modal content to be center aligned (previously aligned center by default)

### Changed

- Modal content is now left aligned by default
- Modal title and close button now sit on the same line, and the close button sites on the baseline when the title breaks to multiple lines
- Close button inset positioning changed to stay in-line with the first line of title
- Increased modal widths by 10%
- Changed close button icon color to `$color-interactive-primary`

## v4.2.0

_February 11, 2022_

### Changed

- box-shadow values to use the elevation token from the pie-design-tokens.

## v4.1.0

_February 2, 2022_

### Changed

- `f-button` version.

## v4.0.2

_January 20, 2022_

### Added

- prop and computed property added for `ariaLabel` in MegaModal.vue

## v4.0.1

_January 19, 2022_

### Added

- `aria-labelledBy` to MegaModal.vue to remove violations in storybook

## v4.0.0

_November 26, 2021_

### Added

- **Breaking Change**: Added `f-button` dependency to peer dependencies. Now `f-button` should be included as a dependency of the consuming componet or application.

### Removed

- **Breaking Change**: Removed `f-button` styles import from the component. Make sure to import `f-button` styles in your application.

## v3.0.2

_October 15, 2021_

Republish to fix a bad previous publish.

## v3.0.1

_October 14, 2021_

### Changed

- Updated version of `f-button`.

## v3.0.0

_October 5, 2021_

### Changed

- Updated version of `f-button`.
- New border radius from `pie-design-tokens` in line with icing phase 2.
- Close button type from `ghostTertiary` to `iverse`.

## v2.0.0

_September 16, 2021_

### Changed

- Updated version of `f-button`.

### Removed

- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.

## v1.0.0

_September 15, 2021_

- Return beta to master. Component has JETSansDigital font.

## v1.0.0-beta.0

_September 1, 2021_

### Changed

- Updated version of `f-button` (JETSans Update)

## v0.12.1

_September 1, 2021_

### Changed

- Fixed bug where scrolling is not re-enabled if the modal is destroyed while open for whatever reason.

## v0.12.0

_August 18, 2021_

### Changed

- Aligned to PIE designs
- Updated version of `f-button`.

## v0.11.0

_July 14, 2021_

### Changed

- Updated version of `f-button`.
- Close button now uses type `ghostTertiary`.

## v0.10.0

_May 25, 2021_

### Changed

- CSS variables to use pie design tokens instead of fozzie-colour-palette vars

## v0.9.0

_May 19, 2021_

### Added

- `title` and `titleHtmlTag` props to allow passing the title value so that we can control the default display of the title inside the component
- Unit tests

## v0.8.0

_May 6, 2021_

### Removed

- `u-overlay` css style definition as should come from `fozzie`

## v0.7.0

_May 5, 2021_

### Added

- `isPositionedBottom` prop to allow modal to sit at the bottom of the screen for all screen widths.

## v0.6.0

_March 5, 2021_

### Changed

- Updated npm dependencies.

## v0.5.0

_March 3, 2021_

### Added

- Added component test file, component object file and tests
- Added `Data-test-id` to elements within the `MegaModal.stories.js`

### Changed

- Restructured component object into page object model
- Refactored component and accessibility tests

## v0.4.0

_January 28, 2021_

### Changed

- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.
- Updated npm dependencies.

### Fixed

- Readme component reference.

## v0.3.0

_December 9, 2020_

### Added

- Stylelint added to lint styling on build.
- `f-vue-icons` to use cross icon in the modal

### Changed

- 'jet' theme instead of 'je'
- Regular close button changed to button component

### Removed

- Bracket in Storybook file
- Hardcoded buttons from storybook file

## v0.2.0

_August 6, 2020_

### Added

- CSS classes which can be targeted in a consuming application..

### Changed

- Tidied up close button styles.
- Use Fozzie colour aliases where possible.

### Fixed

- Spelling mistaxe.
- Moved config comment to correct prop.

## v0.1.0

_August 5, 2020_

### Added

- Component structure and basic configuration (created using `generator-component`).
- Component markup and core functionality.
- Storybook config.
- Unit tests.
- Readme content.
