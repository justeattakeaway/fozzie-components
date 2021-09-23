# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v3.0.0
------------------------------
*September 22, 2021*

### Changed
- New colour scheme and border radius in line with Icing Phase 2.

### Removed
- Font-family declaration from the button styles as we have one font for the whole site and there is no need in declaring it on button level.


v2.0.0
------------------------------
*September 15, 2021*

- Return beta to master. Component has JETSansDigital font.

### Removed
- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.


v2.0.0-beta.0
------------------------------
*August 26, 2021*

### Updated
- New font JETSansDigital


v1.11.0
------------------------------
*August 24, 2021*

### Added
- `hasNestedContent` computed property that checks whether button content should be nested inside span tags.
- Secondary default slot to be used when content is not nested.
- Unit tests for `hasNestedContent` computed property.

### Changed
- Wrap nested content only when necessary.
- Use Vue object syntax to add optional classes.


v1.10.1
------------------------------
*July 23, 2021*

### Removed
- Extra wrapper around button text to fix `isIcon` button vertical alignment.


v1.10.0
------------------------------
*July 20, 2021*

### Added
- `trailing-icon` and `leading-icon` named slots for ability to add an icon before or after button text
- `hasIcon` prop for spacing and icon colours css classes to be added
- validation for `hasIcon` prop to be able to add only `leading`/`trailing`/false

### Changed
- Button paddings to be aligned with the PIE designs
- XSmall button font size to be aligned with the PIE designs


v1.9.0
------------------------------
*July 7, 2021*

### Changed
- `buttonType` has been tidied up a bit. Have added type validation for when the component is either a standard `button` or an `iconButton` (when `isIcon` is set to `true`). If an invalid type is now set for these variations, the component will throw an error when created.
- New `buttonType` of `ghostTertiary` has been added for use with the `iconButton` component.
- Added button sizes to constants and added prop validation these.


v1.8.1
------------------------------
*July 01, 2021*

### Fixed
- `$listeners` to button link issue
 - When `v-on` is set to `f-button` with `href` e.g. link would not trigger

 v1.8.0
------------------------------
*June 17, 2021*

### Changed
- Percy to run desktop / mobile in separate specs

v1.7.0
------------------------------
*June 15, 2021*

### Added
- Support for Vue Router link and tests


v1.6.1
------------------------------
*June 15, 2021*

### Fixed
- Small tweak to class-naming of `o-btn-text--flex` > `o-btn-text` so it matches our naming scheme.


v1.6.0
------------------------------
*June 7, 2021*

### Changed
- Fixed alignment of text when button is full width

### Added
- Data test ID to spinner so it's easier to test in components which use f-button


v1.5.0
------------------------------
*June 7, 2021*

### Added
- `isLoading` prop to allow the button to be in a loading state.


v1.4.0
------------------------------
*May 25, 2021*

### Added
- Percy visual regression tests

### Changed
- CSS variables to use pie design tokens instead of fozzie-colour-palette vars


v1.3.0
------------------------------
*May 25, 2021*

### Changed
- Cascade to fix disabled styling.

### Added
- Storybook control to show enabled/disabled styles.


v1.2.0
------------------------------
*March 11, 2021*

### Changed
- Button focus state.

### Fixed
- Element displaying `attributes="[object Object]"`.


v1.1.1
------------------------------
*March 8, 2021*

### Changed
- Formatting in storybook files.

### Fixed
- Pass button attributes to component correctly.


v1.1.0
------------------------------
*March 3, 2021*

### Added
- Separate story for `f-button--icon`
- Component  and accessibility test for link button

### Changed
- Restructured component object into page object model
- Refactored component and accessibility tests
- `f-button--icon` styles to show different button sizes for `--sizeMedium`, `--sizeLarge`, `--sizeSmall` and `--sizeXSmall`
- `f-button--icon` styles to show blue background for large primary `f-button--icon` instead of orange


v1.0.0
------------------------------
*February 10, 2021*

### Added
- Added `isIcon` prop to the f-button
- Added styles to display the icons properly if button is displayed as an icon

### Removed
 - Removed ButtonType `icon`


v0.7.0
------------------------------
*January 28, 2021*

### Changed
- Updated focus styles to provide more control over when focus outlines are displayed. See this article for more info - https://matthiasott.com/notes/focus-visible-is-here.
- Updated focus style to match the style used in the Fozzie SCSS.
- Updated package URL to match new structure.


v0.6.1
------------------------------
*January 25, 2021*

### Added
- Add a previous change to `$listeners` prop down to Action.vue


v0.6.0
------------------------------
*January 25, 2021*

### Added
- Forward `$listeners` prop to button component to be able to add events listeners to it without `.native`


v0.5.0
------------------------------
*January 21, 2021*

### Added
- `Action` component for standard buttons.
- `Link` component for links styled as buttons.

### Changed
- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.


v0.4.1
------------------------------
*December 8, 2020*

### Changed
- Renamed VueButton to FButton


v0.4.0
------------------------------
*December 4, 2020*

### Added
- List of properties to the readme

### Changed
- `o-btn--icon` modifier

### Removed
- Margins from the button styles


v0.3.0
------------------------------
*November 26, 2020*

### Changed
- `font-weight` and `text-decoration` for `:hover` states for link buttons.


v0.2.0
------------------------------
*November 17, 2020*

### Added
- `background-colour` for `:hover` and `:active` states for primary large buttons.


v0.1.1
------------------------------
*November 12, 2020*

### Fixed
- Changed prop to be called `isFullWidth` rather than `fullWidth` to match convention.

*October 23, 2020*

### Added
- Stylelint added to lint styling on build.


v0.1.0
------------------------------
*October 21, 2020*

### Added
- First iteration of button component. Contains variants for primary, secondary, ghost, outline and btnLink.
