# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## v5.1.1

_June 6, 2024_

### Changed
- Update outline button border colour to `color-border-strong`.


## v5.1.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

## v5.0.0

_April 28, 2023_

### Removed

- `small` button size (this still remains for icon buttons)

### Added

- `small-productive` button size (not for icon buttons)
- `small-expressive` button size (not for icon buttons)
  - These buttons are the same height but expressive has a larger font and therefore less vertical padding.

### Changed

- Use CSS logical properties for padding, margins, heights, widths and spinner positioning.

## v4.5.0

_March 27, 2023_

### Changed

- New focus styles
  - These require the new colour tokens from `pie-design-tokens` which are included in `fozzie` v11+.
- Updated to the new `pie-icons-vue` beta release.

## v4.4.0

_November 1, 2022_

### Changed

- Product Orange update (package release to update the compiled CSS)

## v4.3.0

_July 15, 2022_

### Added

- Node 16 support.

## v4.2.0

_July 4, 2022_

### Changed

- Update f-wdio-utils to v1.1.0 to use new Axe Core implementation.
- Accessibility tests to be async.

## v4.1.0

_July 1, 2022_

### Changed

- Update f-wdio-utils to v1.0.0
- Update component objects / specs to use ES6 syntax.

## v4.0.0

_June 16, 2022_

### Changed

- Update to `@use` and `@forward` SASS syntax

## v3.4.1

_June 10, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

_May 27, 2022_

### Removed

- unneeded `load` and `waitForComponent` functions from component object

_May 26, 2022_

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v3.4.0

_May 13, 2022_

### Changed

- Icons in component and storybook files

### Removed

- `@justeat/f-vue-icons`

### Added

- `@justeattakeaway/pie-icons-vue`

## v3.3.1

_February 8, 2022_

### Changed

- Upgraded to ESLint v8
- Converted Storybook Knobs to Controls

## v3.3.0

_January 28, 2022_

### Changed

- `spacing` references to new mapping from fozzie e.g spacing(x2) > spacing(d).

### Added

- Component, visual and accessibility tests for icon-buttons
- Updated `IconButton.stories` to show all types and sizes of icons - similar to `Button.stories`

## v3.2.0

_October 25, 2021_

### Changed

- Button border style definition moved to button types. Introduced `background-color()` mixin to apply the same colour for the background and for the border colour.
- Each button size vertical padding reduced by 1px to make button height 56px/48px/40px/32px instead of 58px/50px/42px/34px.

### Removed

- Outline css styles as focus styles applied with `box-shadow`.

## v3.1.0

_October 22, 2021_

### Changed

- Add spacing to buttons following a paragraph tag. This matches the current behaviour in Fozzie.
- Removed the background from the link button in disabled state.
- `f-vue-icons` package version bump.
- Button story now shows all the types and sizes of the button component (primary, secondary, outline and ghost).
- Changed knobs to controls for switching button props.
- Separate Demo story to still show one button in isolation.
- Separate story for Link Button to be able to run tests properly.
- Updated the tests in line with the changes.

## v3.0.2

_October 13, 2021_

### Changed

- Margin between few full width buttons increased from 8px to 16px.

## v3.0.1

_October 5, 2021_

### Changed

- Icon button loading state fix.

## v3.0.0

_October 5, 2021_

### Changed

- New colour scheme and border radius in line with Icing Phase 2.

### Removed

- Font-family declaration from the button styles as we have one font for the whole site and there is no need in declaring it on button level.

### Added

- `inverse` and `ghostInverse` props for icon buttons

## v2.0.0

_September 15, 2021_

- Return beta to master. Component has JETSansDigital font.

### Removed

- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.

## v2.0.0-beta.0

_August 26, 2021_

### Updated

- New font JETSansDigital

## v1.11.0

_August 24, 2021_

### Added

- `hasNestedContent` computed property that checks whether button content should be nested inside span tags.
- Secondary default slot to be used when content is not nested.
- Unit tests for `hasNestedContent` computed property.

### Changed

- Wrap nested content only when necessary.
- Use Vue object syntax to add optional classes.

## v1.10.1

_July 23, 2021_

### Removed

- Extra wrapper around button text to fix `isIcon` button vertical alignment.

## v1.10.0

_July 20, 2021_

### Added

- `trailing-icon` and `leading-icon` named slots for ability to add an icon before or after button text
- `hasIcon` prop for spacing and icon colours css classes to be added
- validation for `hasIcon` prop to be able to add only `leading`/`trailing`/false

### Changed

- Button paddings to be aligned with the PIE designs
- XSmall button font size to be aligned with the PIE designs

## v1.9.0

_July 7, 2021_

### Changed

- `buttonType` has been tidied up a bit. Have added type validation for when the component is either a standard `button` or an `iconButton` (when `isIcon` is set to `true`). If an invalid type is now set for these variations, the component will throw an error when created.
- New `buttonType` of `ghostTertiary` has been added for use with the `iconButton` component.
- Added button sizes to constants and added prop validation these.

## v1.8.1

_July 1, 2021_

### Fixed

- `$listeners` to button link issue
- When `v-on` is set to `f-button` with `href` e.g. link would not trigger

## v1.8.0

_June 17, 2021_

### Changed

- Percy to run desktop / mobile in separate specs

## v1.7.0

_June 15, 2021_

### Added

- Support for Vue Router link and tests

## v1.6.1

_June 15, 2021_

### Fixed

- Small tweak to class-naming of `o-btn-text--flex` > `o-btn-text` so it matches our naming scheme.

## v1.6.0

_June 7, 2021_

### Changed

- Fixed alignment of text when button is full width

### Added

- Data test ID to spinner so it's easier to test in components which use f-button

## v1.5.0

_June 7, 2021_

### Added

- `isLoading` prop to allow the button to be in a loading state.

## v1.4.0

_May 25, 2021_

### Added

- Percy visual regression tests

### Changed

- CSS variables to use pie design tokens instead of fozzie-colour-palette vars

## v1.3.0

_May 25, 2021_

### Changed

- Cascade to fix disabled styling.

### Added

- Storybook control to show enabled/disabled styles.

## v1.2.0

_March 11, 2021_

### Changed

- Button focus state.

### Fixed

- Element displaying `attributes="[object Object]"`.

## v1.1.1

_March 8, 2021_

### Changed

- Formatting in storybook files.

### Fixed

- Pass button attributes to component correctly.

## v1.1.0

_March 3, 2021_

### Added

- Separate story for `f-button--icon`
- Component and accessibility test for link button

### Changed

- Restructured component object into page object model
- Refactored component and accessibility tests
- `f-button--icon` styles to show different button sizes for `--sizeMedium`, `--sizeLarge`, `--sizeSmall` and `--sizeXSmall`
- `f-button--icon` styles to show blue background for large primary `f-button--icon` instead of orange

## v1.0.0

_February 10, 2021_

### Added

- Added `isIcon` prop to the f-button
- Added styles to display the icons properly if button is displayed as an icon

### Removed

- Removed ButtonType `icon`

## v0.7.0

_January 28, 2021_

### Changed

- Updated focus styles to provide more control over when focus outlines are displayed. See this article for more info - https://matthiasott.com/notes/focus-visible-is-here.
- Updated focus style to match the style used in the Fozzie SCSS.
- Updated package URL to match new structure.

## v0.6.1

_January 25, 2021_

### Added

- Add a previous change to `$listeners` prop down to Action.vue

## v0.6.0

_January 25, 2021_

### Added

- Forward `$listeners` prop to button component to be able to add events listeners to it without `.native`

## v0.5.0

_January 21, 2021_

### Added

- `Action` component for standard buttons.
- `Link` component for links styled as buttons.

### Changed

- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.

## v0.4.1

_December 8, 2020_

### Changed

- Renamed VueButton to FButton

## v0.4.0

_December 4, 2020_

### Added

- List of properties to the readme

### Changed

- `o-btn--icon` modifier

### Removed

- Margins from the button styles

## v0.3.0

_November 26, 2020_

### Changed

- `font-weight` and `text-decoration` for `:hover` states for link buttons.

## v0.2.0

_November 17, 2020_

### Added

- `background-colour` for `:hover` and `:active` states for primary large buttons.

## v0.1.1

_November 12, 2020_

### Fixed

- Changed prop to be called `isFullWidth` rather than `fullWidth` to match convention.

_October 23, 2020_

### Added

- Stylelint added to lint styling on build.

## v0.1.0

_October 21, 2020_

### Added

- First iteration of button component. Contains variants for primary, secondary, ghost, outline and btnLink.
