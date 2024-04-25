# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html)

## v11.2.1

_April 10, 2024_

### Changed

- Update `jest` to latest version.


## v11.2.0

_April 10, 2024_

### Changed

- `@justeat/pie-design-tokens` from 5.0.0 to 6.2.1

## v11.1.0

_March 13, 2024_

### Fixed

- node engines in `package.json` to include all versions above 14

## Future Todo List

- Make typography and utility classes silent extenders (so that they can be extended by components without importing all utility classes).

## v11.0.2

_November 8, 2023_

### Changed

- `include-media` reference to released 2.0.0 version.

## v11.0.1

_September 5, 2023_

### Changed

- Update test snapshot

## v11.0.0

_March 27, 2023_

### Changed

- Update focus styles to new double outline, using box-shadow.
  - To prevent anti-aliasing issues when used with rounded borders, the two shadows had to be separated into separate declarations.
  - The inner shadow is applied to the element and the outer shadow to the `:after` pseudo-element.
  - Deprecated `%u-elementFocus--boxShadow` as all focus styles should use box-shadow by default.
    - `%u-elementFocus` now sets `outline: none` by default.

### Added

- `%u-elementFocus--borderless` for elements that do not have a border.
  - The default `%u-elementFocus` extender assumes the element will have a 1px border, so this extender repositions the `:after` pseudo-element slightly.
  - `position: relative` is also applied to the element by default (to anchor the position of the `:after` pseudo-element) so if you need a different value please override it.

### Removed

- `$btn-default-outline-color` SCSS variable. This shouldn't be being used elsewhere, but if it is then please use the silent extenders to get the focus styles instead.

## v10.11.1

_March 15, 2023_

### Added

- Optional parameter in `f.rating` to set star count.

## v10.11.0

_February 22, 2023_

### Updated

- Upgrade to `@justeat/pie-design-tokens` 4.2.0

## v10.10.3

_December 4, 2022_

### Fixed

- Security patch – v10.10.2 was released as a malicious package.

## v10.10.1

_November 30, 2022_

### Fixed

- SCSS Tests now run as part of CI (`ci:test:tools`).
- `it()` removed from scss-setup, as causes nested test errors in Jest.

## v10.10.0

_November 29, 2022_

### Fixed

- Fix v10.9.1 Patch release, which seems to have been an undocumented version release.
- Added node version 12 back into support list. This is just so that legacy microsites can use fozzie without having to change their build commands.

## v10.9.0

_November 16, 2022_

### Fixed

- Failing tests.
- Linting errors.
  - Including renaming keyframe animation names to kebab-case.

## v10.8.1

_November 1, 2022_

### Added

- `u-hideOnMid` Responsive Trump Class

## v10.8.0

_October 25, 2022_

### Changed

- Updated to `v3.2.0` of `pie-design-tokens`
- Some minor dependency updates

## v10.7.0

_October 13, 2022_

### Added

- CSS outputted files for typography, utilities and reset
- Snapshot tests for outputted files

### Changed

- Rename `compileToCss.js` to `cssCompiler.js`
- Rename `compileToCss` function to `compile`
- Path updates in snapshot test
- Replace multiline comments with single line so that they are removed by Sass without minification/compression
- Replace `prepare` with `prepack` as yarn lifecycle script to prepare `dist`

## v10.6.0

_October 6, 2022_

### Added

- SCSS compilation utilities
- Snapshot test of compiled Fozzie CSS
- A (disabled) validity test of compiled Fozzie CSS using StyleLint (to be enabled in a future piece of work)
- Disable `eslint` extraneous-dependencies rule for project

### Changed

- Fixed an `em()` call in `_modal.scss` to be called with the `functions` namespace
- Fixed a number of `line-height()` calls in `_order-card.scss` to be called with the `functions` namespace
- Removed an invalid `solid` used as part of a `box-shadow` declaration in `_buttons.scss` (invalid CSS)
- Changed declaration orders of `$line-height-base` and `line-height` function in `_units.scss` to fix compiled CSS output

## v10.5.0

_September 29, 2022_

### Changed

- Reverted box-shadow to custom value.

## v10.4.0

_September 27, 2022_

### Changed

- Unify namespaced `function` references throughout.

## v10.3.0

_September 26, 2022_

### Added

- Variables `$star-icon-path--filled` & `$star-icon-path--empty`.

### Changed

- `ratings` optional component to read from variables file for consuming applications to set custom paths for svg star icons.

## v10.2.0

_September 22, 2022_

### Changed

- Updated a bunch of dependencies. None of these should be breaking.
- `pie-design-tokens` has been updated to v3, which has a name change in the [global tokens for paragraph spacing](https://github.com/justeat/pie-design-tokens/blob/master/CHANGELOG.md#v300).

  As these are global token updates, it's expected that they shouldn't be referenced in consuming applications/components directly, but if they are, refer to the `pie-design-token` changelog above to update this to the new variable names.

## v10.1.0

_September 15, 2022_

### Added

- Ratings `extend` back in as a short term fix for consuming applications.

## v10.0.0

_September 1, 2022_

### Changed

- **Breaking** Upgraded `@justeat/pie-design-tokens` to `v2.0.0`. [Link to changelog](https://github.com/justeat/pie-design-tokens/blob/master/CHANGELOG.md#v200)
- **Breaking** Replaced `$color-grey` variants with new aliases

## v9.3.3

_September 1, 2022_

### Added

- A basic integration test to catch SCSS errors

## v9.3.2

_September 1, 2022_

### Fixed

- SCSS math division warning.

## v9.3.1

_August 31, 2022_

### Changed

- Updated to newer version of `stylelint-config-fozzie` package

## v9.3.0

_August 25, 2022_

### Fixed

- `spacing` & `zIndex` references.

## v9.2.0

_August 24, 2022_

### Fixed

- Ordering issue to prevent use & forward from throwing load order errors in consuming apps when using sass `with` syntax.

## v9.1.0

_August 19, 2022_

### Added

- Utilities mixin module containing a new `spacing-map` variable and `spacing-classes` mixin which can be used to generate utility classes for each spacing variable.
- Optional spacing trump module which generates margin & padding utility classes.
- `u-noBorder`, `u-noBackground`, and `u-hover--cursor` utility classes.

## v9.0.2

_August 11, 2022_

### Fixed

- Colour palette references now point to `pie-design-tokens`

## v9.0.1

_August 10, 2022_

### Removed

- `throw` usage and updated tests accordingly.

### Fixed

- `$fozzie-breakpoints` reference.

## v9.0.0

_August 9, 2022_

- **Breaking** Implement `@use` & `@forward` syntax in preference to `import` statements due to deprecation in `dart-sass`.
- v9 Migration [Guide can be found here](https://vue.pie.design/?path=/story/documentation-guides-fozzie-fozzie-migration-guide--page).
- README updated with new usage info. Documentation on vue.pie.design updated with full info on migration and usage.
- SCSS unit testing capabilities using `sass-true`

### Changed

- `yarn test` command now tests js and scss together with `test:js` and `test:scss` individually being called
- Updated to the latest non-breaking version of `pie-design-tokens`. Will update to `v2+` of the design tokens as a separate fozzie release, so that any applications updating to `dart-sass` don't also potentially have to make a bunch of token name updates as part of this v9 release.
- CanIUse DB updated to latest.
- Jest config updated due to version update (`testURL` moved to `testEnvironmentOptions`).

### Fixed

- `$font-size-base` was pointing incorrectly at the `font-paragraph-01` design token (which is used for paragraph spacing). Have fixed this to now point at the correct font-size token.
- Default font-size key in `font-size` mixin changed from `body-s` to `body-l` (`14px` to `16px`).

## v9.0.0-beta.12

_August 8, 2022_

### Added

- `listingSkeleton` mixin back in as it is currently being used by another application.

## v9.0.0-beta.11

_August 8, 2022_

### Added

- Some basic unit tests for the `font-size` mixin. Should provide a bit more reliability if any key font-size base values change accidentally.

### Fixed

- Default font-size key in `font-size` mixin changed from `body-s` to `body-l` (`14px` to `16px`).

### Changed

- Updated a number of package versions to latest; Babel, ESLint, and our Browserslist, ESLint and Stylelint configs.
- CanIUse DB updated to latest.
- Jest config updated due to version update (`testURL` moved to `testEnvironmentOptions`).

## v9.0.0-beta.10

_August 8, 2022_

### Fixed

- `$font-size-base` was pointing incorrectly at the `font-paragraph-01` design token (which is used for paragraph spacing). Have fixed this to now point at the correct font-size token.

### Changed

- Updated to the latest non-breaking version of `pie-design-tokens`. Will update to `v2+` of the design tokens as a separate fozzie release, so that any applications updating to `dart-sass` don't also potentially have to make a bunch of token name updates as part of this v9 release.

### Removed

- Deprecation warnings for `modal` and `orderCard` components. These styles are currently being used on the Order pages.

## v9.0.0-beta.9

_July 29, 2022_

### Removed

- `listingSkeleton` mixin.

## v9.0.0-beta.8

_July 27, 2022_

### Removed

- `~` Tilde from imports.
- `importer` method from `scss-setup.spec.js` file.

## v9.0.0-beta.7

_July 6, 2022_

### Changed

- `yarn test` command now tests js and scss together with `test:js` and `test:scss` individually being called

## v9.0.0-beta.6

_July 1, 2022_

### Added

- SCSS unit testing capabilities using `sass-true`
- New unit testing directory (to avoid packaging tests with npm)

### Changed

- yarn test command specifies which `jest.config.js` file to use

## v9.0.0-beta.5

_June 21, 2022_

### Changed

- moved `$fozzie-breakpoints` out of variables file and into the breakpoints helper file to remove circular reference
- moved `$line-height-base` out of variables file and into the units function file to remove circular reference

## v9.0.0-beta.4

_June 20, 2022_

### Changed

- import variables into various function and mixin files using `@use` to prevent build errors in consumining clients

## v9.0.0-beta.3

_June 17, 2022_

### Changed

- import variables into `zIndex` scss function file

## v9.0.0-beta.2

_June 15, 2022_

### Changed

- Use a `@use` rule for `line-height` function in `_type.scss`
- Remove namespace aliases from `@use` rules in `_type.scss`

## v9.0.0-beta.1

_June 7, 2022_

### Removed

- Removed namespace.

## v9.0.0-beta.0

_May 30, 2022_

### Changed

- **Breaking** Implement `@use` & `@forward` syntax in preference to `import` statements due to deprecation in `dart-sass`.
  - README updated with new usage info. Documentation on vue.pie.design to be updated with full info on migration and usage.

## v8.4.0

_July 6, 2022_

### Added

- circleci config file

### Removed

- unused travis config

## v8.3.0

_June 17, 2022_

### Added

- `sass:map` to resolve `map-get` error when using `sass` in consuming apps.

## v8.4.1

_July 6, 2022_

### Changed

- switch from `prepare` to `prepublishOnly` in package.json scripts

## v8.4.0

_July 6, 2022_

### Added

- circleci config file

### Removed

- unused travis config

## v8.3.0

_June 17, 2022_

### Added

- `sass:map` to resolve `map-get` error when using `sass` in consuming apps.

## v8.2.0

_May 23, 2022_

### Added

- Node 16 to the `engines` property in `package.json`.

## v8.1.0

_May 12, 2022_

### Added

- f-utils `functions`, `helpers` & `mixins` in order to depreciate `f-utils` in favour of `fozzie`.

### Removed

- f-utils dependency.

## v8.0.0

_February 15, 2022_

### Changed

- Removing reliance on eyeglass in favour of using sass-loader `includePaths` option to resolve imports to node_modules.
  Downside to this will be we are tied to using either webpack or a tool that allows similar functionality through it's resolver options.

## v7.5.0

_February 9, 2022_

### Changed

- box-shadow values now use pie-design-tokens `$elevation` tokens.
- Deprecation warning to the `c-modal` and `orderCard` components.

### Removed

- box-shadow from hover state of cuisinesWidget component styles.
- `.c-menu--expandable` and `.c-menu--expandable--expanded` classes from menu component styles.

## v7.4.0

_Feburary 8, 2022_

### Changed

- f-utils version to fix `dart-sass` warnings whilst switching from `node-sass` to `sass`.

## v7.3.0

_January 31, 2022_

### Changed

- f-utils version to fix `map.merge` lint error.

## v7.2.0

_January 31, 2022_

### Changed

- f-utils version to fix further scss lint error.

## v7.1.0

_January 28, 2022_

### Changed

- f-utils version to fix scss lint error.

## v7.0.0

_January 25, 2022_

### Changed

- **Breaking** Type map for $spacing to reference pie design tokens.
  - If you are using the below mapping values please note they have changed or been removed:
    $spacing x 6 = spacing(h) instead of spacing(x6) - Note the size change has gone from 48px > 56px.
    $spacing x 9 - Has been removed - Please map to the next value up or down e.g spacing(j) or spacing(i).

| Old map usage | New map usage                                |
| ------------- | -------------------------------------------- |
| spacing(x0.5) | spacing(a)                                   |
| spacing(base) | spacing(b)                                   |
| spacing(x1.5) | spacing(c)                                   |
| spacing(x2)   | spacing(d)                                   |
| spacing(x3)   | spacing(e)                                   |
| spacing(x4)   | spacing(f)                                   |
| spacing(x5)   | spacing(g)                                   |
| spacing(x6)   | spacing(h)                                   |
| spacing(x7)   | spacing(h)                                   |
| spacing(x8)   | spacing(i)                                   |
| spacing(x9)   | Removed, replace with closet size up or down |
| spacing(x10)  | spacing(j)                                   |

- `pie-design-tokens` package.json version to bring in new elevation changes.

## v6.2.0

_December 20, 2021_

### Removed

- `$theme` variable (`_theme.scss` file) as there are no more theme overrides (like typography or specific styles for ml).

## v6.1.0

_November 9, 2021_

### Added

- `c-tag` white modifier as per PIE designs.

## v6.0.0

_October 27, 2021_

## Main changes:

- New font and colour theme from `pie-design-tokens` package.
- New border radius values for different components styles.
- Button styles now are in line with icing phase 2. Note that there are a lot of changes in css class names. Full list can be found below in beta release CHANGELOGs.
- Set default paragraph size to match base font-size which now is 16px instead of 14px.

### Added

- `c-tag` optional component styles and a deprecation warning to the `c-badge` component.

### Changed

- `pie-design-tokens` package updated to v1.0.0-beta.2.

### Removed

- Menulog font files.

** Full list of changes (including all css class names changes) can be found below in beta release CHANGELOGs **

## v6.0.0-beta.13

_October 25, 2021_

### Fixed

- `spinnerColor` mixin in `loading-indicator` to allow default colours to be displayed.

## v6.0.0-beta.12

_October 21, 2021_

### Added

- `c-tag` optional component styles.
- Deprecation warning to the `c-badge` component.

## v6.0.0-beta.11

_October 21, 2021_

### Changed

- Rebased master to include v5.2.1 (moved some dependencies from outside dev dependencies).

## v6.0.0-beta.10

_October 20, 2021_

### Changed

- Fixed linting error in \_grid.scss (missed semicolons).
- Rebased master to include v5.2.0 (removed gulp).

## v6.0.0-beta.9

_October 12, 2021_

### Changed

- link hover and active styles to lighten instead of darkening.

### Added

- `o-link--distinct` class to make links blue instead of default text colour if needed.
- `g--alignSpaceAround` and `g--alignSpaceBetween` classes for the grid mixin.

### Removed

- `.o-btn.is-loading` styles. Use `o-btn--loading` instead. Now button styles utilize `loadingIndicator` and `spinnerColor` mixins to make sure that the spinner looks right and changes colour depending on what the type of the button is in use. If you need to check the markup for the button please see fozzie-components f-button component as an example.

## v6.0.0-beta.8

_October 4, 2021_

Republish to fix some build issues.

## v6.0.0-beta.7

_October 4, 2021_

### Added

- `c-card--info` component modifier.
- `c-rating-description` component modifier.

### Changed

- Set default paragraph size to match base font-size.
- Card border colour matches PIE designs.
- `c-mediaElement--fullstack--negativeTop` modifier top margin updated.
- Badge component font-size explicitly set.
- `c-badge--indicator` modifier colours updated.

### Fixed

- Breadcrumb icon size.

## v6.0.0-beta.6

_October 4, 2021_

### Added

- `belowMid` z-index value.

### Changed

- Breadcrumb "pill" modifier styles to ensure alignment and colours are correct.

## v6.0.0-beta.5

_September 28, 2021_

### Changed

- body font size from 14px/0.875rem to 16px/1rem

## v6.0.0-beta.4

_September 27, 2021_

### Added

- `o-btn--outline`, `o-btn--ghost`, `o-btn--fullWidth` modifiers.
- `o-btn--sizeLarge`, `o-btn--sizeSmall`, `o-btn--sizeXSmall` size modifiers.

### Removed

- `o-btn--tertiary`. Use `o-btn--outline` instead.
- `o-btn--block`. Use `o-btn--fullWidth` instead.
- `o-btn--wide`.

### Changed

- Button styles in line with icing phase 2.
- renamed `o-btnLink` to `o-btn--link`.
  Now button modifiers are:
- Btn Background Colour modifiers: `o-btn--primary`, `o-btn--secondary`, `o-btn--outline`, `o-btn--ghost`.
- Btn Size Modifiers: `o-btn--sizeLarge`, `o-btn--sizeSmall`, `o-btn--sizeXSmall`.
- Btn Layout Modifiers: `o-btn--icon`, `o-btn--fullWidth`, `o-btn--disabled`, `o-btn--link`.
- Moved font-family declaration from the button component styles to typography styles.

## v6.0.0-beta.3

_September 22, 2021_

### Changed

- Various border-radius values in line with the latest pie tokens.
- Various global tokens to the alias token equivalent.
- `$border-radius` from 2px to `$radius-rounded-a`.

### Removed

- `$btn-transparent-color`, `$btn-transparent-color--hover`, `$btnGroup-outline`, `$btnToggle`, `$btn-icon-dimension` and `$btn-rounded-width` css vars as unused.

## v6.0.0-beta.2

_September 17, 2021_

### Changed

- `$font-size-base` to use `$font-paragraph-01`(16px) instead of `$font-paragraph-02`(14px).
- Separate font-sizes for mobile and desktop screen sizes for `h3, .gamma, h4, .delta, h5, .epsilon` headings.

## v6.0.0-beta.1

_September 15, 2021_

- Bump the version to include changes from v5.1.0 to beta version

## v6.0.0-beta.0

_August 24, 2021_

### Updated

- pie-design-tokens package to v1.0.0-beta.0 to include new font vars

### Added

- `$font-family-secondary` as a fallback font (Arial)

### Changed

- `$font-weight-headings` use `$font-weight-extrabold` font weight (800)

### Removed

- Menulog font files

## v5.2.1

_October 20, 2021_

### Changed

- Moved some devDependencies to dependencies

## v5.2.0

_October 19, 2021_

### Removed

- `gulp` as a dependency.

### Added

- `jest`-, `babel`-, `eslint`- and `stylelint`-related dependencies.

## v5.1.0

_September 13, 2021_

### Changed

- Move normalize styles from base to optional. We had to copy the styles straight into the project to be able to make them optional wrapping them into a mixin.
  !!Note: If you don't use `$includeBaseFramework` or `$includeMinimalFramework` vars and want to have normalize styles in you project, you need to `@include normalize()` mixin starting from this version.

## v5.0.0

_August 23, 2021_

## Main changes:

- Colour and typography variables updated to use `pie-design-tokens` repo instead of `fozzie-colour-palette`.
- When importing v5 fozzie, consuming applications only get included variables, functions and mixins (no classes). Component styles for buttons, form-fields etc are being deprecated as we move our components over to versionable packages, but can still be included via optional mixins applications that still need this as part of the transition.
- Two optional variables can be used to include a base set of styles (similar to v4). These are `$includeBaseFramework` and `$includeMinimalFramework`. Check out the `_templates.scss` file to see what styles are included when these are set to true.

### Changed

- Eyeglass version bumped to v3.
- Made all styles and components optional (wrapped in a mixin).
- Lots of colour variables moved over as part of using the new `pie-design-tokens` repo instead of `fozzie-colour-palette`.
- Updated type-map with new typography variables for font-size and line-height.

### Removed

- `/settings/glyphs` moved into badges, as it is the only place it is used.
- `/images` as not used.
- `kickoff-grid` dependency brought into fozzie, to remove external dependency (making it easier to change if needed).
- `$font-weight-bold` was removed as it now comes straight from `pie-design-tokens`.

** Full list of changes (including all colour variable changes) can be found below in beta release CHANGELOGs **

## v5.0.0-beta.10

_July 8, 2021_

### Changed

- pie-design-tokens package

## v5.0.0-beta.9

_June 30, 2021_

### Changed

- More colour variables transitioned:
  - `$color-headings--highlight` > `$color-content-brand`
  - `$color-bg--accept` > `$color-support-positive-02`
  - `$color-bg--notification` > `$color-support-warning-02`
  - `$color-bg--error` > `$color-support-error-02`
  - `$color-disabled` > `$color-disabled-01`
  - `$color-bg--component` > `$color-container-default`
- Changed some global tokens to aliases

## v5.0.0-beta.8

_June 4, 2021_

### Added

- Mixin in `loading-indicator` to be able to customise the colours of the spinner.

## v5.0.0-beta.7

_April 29, 2021_

### Changed

- More colour variables transitioned:
  - `$color-secondary` > `$color-blue`
  - `$color-text--hint` > `$color-grey-40`
  - `$color-text--success` > `$color-content-positive`
  - `$color-text--danger` > `$color-content-error`
  - `$color-text--warning` > `$color-content-brand-strong`
  - `$color-focus-outline` > `$color-focus`
- Updated `f-utils` to v2.0.0

## v5.0.0-beta.6

_March 31, 2021_

### Changed

- Underlined hover and focus state for `.o-link--noDecoration`.
- More colour variables transitioned:
  - `$color-bg` > `$color-background-default`
  - `$color-text` > `$color-content-default`
  - `$color-headings` > `$color-content-default`
  - `$color-link-default` > `$color-content-link`
  - `$color-border` > `$color-border-strong`
  - `$color-link-hover` > `$color-content-link` & darken(4%)
  - `$color-link-active` > `$color-content-link` & darken(6%)

## v5.0.0-beta.5

_March 23, 2021_

### Changed

- Updated type-map with new typography variables for font-size and line-height.
- `$font-weight-bold` was removed as it now comes straight from pie-design-tokens
- Typography variables transitioned:
  - `$font-weight-base` > `$font-weight-regular`

## v5.0.0-beta.4

_March 5, 2021_

### Changed

- Moved from using `fozzie-colour-palette` to `pie-design-tokens`.
- Colour variables transitioned:
  - `$black` > `$color-black`
  - `$white` > `$color-white`
  - `$grey--light` > `$color-grey-30`
  - `$brand--orange` > `$color-orange-30`
  - `$orange` > `$color-orange`
  - `$orange-dark` > `$color-orange` & darken(4%)
  - `$orange-darkest` > `$color-orange` & darken(10%)
  - `$orange--aa` > `$color-orange-60`
  - `$orange--offWhite` > `$color-orange-10`
  - `$blue` > `$color-blue`
  - `$blue--offWhite` > `$color-blue-10`
  - `$blue--offWhite--dark`> `$color-blue-10` & darken(4%)
  - `$blue--offWhite--darkest`> `$color-blue-10` & darken(10%)
  - `$red` > `$color-red`
  - `$green` > `$color-green`
  - `$green--offWhite` > `$color-green-10`
  - `$yellow--offWhite` > `$color-yellow-10`
  - `$grey--offWhite` > `$color-grey-10`
  - `$grey--lighter` > `$color-grey-20`
  - `$grey--mid` > `$color-grey-40`
  - `$grey--dark` > `$color-grey-50`
  - `$grey--darkest` > `$color-grey`
  - `$purple` > `$color-purple`
  - `$purple--light` > `color-purple-10`

## v5.0.0-beta.3

_February 16, 2021_

### Added

- Loading indicator which was in version 4 with an optional size

## v5.0.0-beta.2

_December 31, 2020_

### Changed

- Updated versions of `f-utils` and `fozzie-colour-palette` and other minor deps.

## v5.0.0-beta.1

_December 31, 2020_

### Changed

- Eyeglass version bumped to v3.

## v5.0.0-beta.0

_November 3, 2020_

### Added

- Base template includes for legacy consuming applications (PoC – needs testing).

### Changed

- Made all styles and components optional (wrapped in a mixin).

### Removed

- `/settings/glyphs` moved into badges, as it is the only place it is used.
- `/images` as not used.
- `kickoff-grid` dependency brought into fozzie, to remove external dependency (making it easier to change if needed).

## v4.5.2

_July 7, 2021_

### Fixed

- fixed the linter error

## v4.5.1

_July 5, 2021_

### Fixed

- fixed `em` scaling

## v4.5.0

_March 25, 2021_

### Changed

- change `max-width` of apps banner image

## v4.4.1

_February 11, 2021_

### Changed

- `.u-showAboveNarrow` class to include 414px in media query

## v4.4.0

_January 25, 2021_

### Changed

- Latest colour-palette pulled in and some minor package updates.

## v4.3.0

_November 4, 2020_

### Added

- `loading-indicator` styles which provides a spinner/loading style.

## v4.2.0

_October 26, 2020_

### Added

- `:focus-visible` styles which provide more control over when focus outlines are displayed. See this article for more info - https://matthiasott.com/notes/focus-visible-is-here.

## v4.1.0

_September 23, 2020_

### Changed

- Added `font-family` property back for headings as the font-family can be overridden by the reset styles if headings are children of elements such as buttons.

## v4.0.0

_September 18, 2020_

### Changed

- Moving package out of beta to release typography.
- Updating teriary button text colour to `$blue`.
- Minor package update to `danger.js`.

## v4.0.0-beta.1

_September 15, 2020_

### Changed

- btn-default-weight now 600 for new font

## v4.0.0-beta.0

_August 25, 2020_

### Changed

- **Breaking** Type map has all been updated to match new design-token names.
- Updating typography set to `JustEatBasis` and updating all typography definitions to new sizes/weights.
- Pre-loading font classes no longer needed, as the webfonts should be loaded in immediately (as part of `head` of document).

### Removed

- `Aspira` font-face declaration no longer needed.
- `stopFoit` function as not needed due to the way we now import the font.

## Typography Naming Migration Guide

- `base` > `body-s`
- `base--scaleUp` > `body-l`
- `small` > `caption`
- `mid` > `heading-s` or `subheading-s`
- `large` > `heading-m` or `subheading-l`
- `jumbo` > `heading-xl`
- `jumbo--scaleUp` > `heading-xxl`
- `large--scaleDown` > `heading-s`
- `mid--scaleUp` > No longer exists in type map. Should change to `heading-s` or `heading-m`

## v3.0.0

_August 3, 2020_

### Changed

- Bumping version to `v3` as colour changes should now be stable (and to enable us to prep for v4 which will be font changes).

## v3.0.0-beta.10

_July 30, 2020_

### Changed

- Updating `fozzie-colour-palette` version with new alias colours for background colours.
- Updated Danger npm package.

## v3.0.0-beta.9

_July 23, 2020_

### Changed

- Updating `c-formToggle` border colours (uses knocked back border, rather than default border colour).

## v3.0.0-beta.8

_July 22, 2020_

### Changed

- Updating various uses of grey across components and updating `fozzie-colour-palette` version with new alias colours for default text and borders.

## v3.0.0-beta.7

_July 20, 2020_

### Changed

- Update `fozzie-colour-palette` to latest version.
- `Danger.js` update so that the plugin still works on CI.

## v3.0.0-beta.6

_June 26, 2020_

### Changed

- Update card and badge to match rebrand designs for menu

## v3.0.0-beta.5

_June 18, 2020_

### Changed

- All references to `grey--lightest` changed to `grey--lighter` (to match new colour palette).
- All references to `grey--lighter` changed to `grey--light` (to match new colour palette).
- All references to old colours that are no longer part of the new palette updated to new colour variables.

### Removed

- Glaze and Menulog colour overrides removed.

## v3.0.0-beta.4

_June 5, 2020_

### Fixed

- More glaze stuff re-added (doh).

## v3.0.0-beta.3

_June 5, 2020_

### Fixed

- Glaze theme mixin re-added.

## v3.0.0-beta.2

_June 4, 2020_

### Changed

- Updated Menulog review stars to be brand orange (uses `@justeat/f-icons` v1.34.0)

## v3.0.0-beta.1

_June 4, 2020_

### Changed

- Bump to `fozzie-colour-palette` version.

## v3.0.0-beta.0

_June 2, 2020_

### Changed

- Updated Menulog theme to include first batch of Takeaway.com brand changes. Buttons, links and base colours all updated.

## v2.3.0

_April 28, 2020_

### Added

- Additional spacing properties to the SCSS variables.

## v2.2.0

_March 24, 2020_

### Fixed

- Updated jest.config.js so that test files are now detected

## v2.1.0

_March 10, 2020_

### Fixed

- Updated `c-modal` max width to an even number as odd numbered widths cause text to become blurry in some browsers.

## v2.0.0

_March 9, 2020_

### Removed

- **Breaking** Support for Node 8 has been removed. Now only tested in Node v10 and v12.
- `espree` resolution removed as no longer needed.
- `gulp` removed from dependency list – not needed as it comes down as a dependency of `gulp-build-fozzie`.

### Changed

- Updated to use `gulp-build-fozzie` v10 (which uses `gulp` v4).
- Babel and ESLint configs updated in line with current recommendations.
- Browserslist updated to use shared configuration.

## v1.91.1

_February 12, 2020_

### Fixed

- Added `prepare` task back in.

## v1.91.0

_February 12, 2020_

### Changed

- Moved modal close button to the left slightly.

### Removed

- Transitions from modal.

## v1.90.0

_February 6, 2020_

### Added

- Menulog colour for `$btn-secondary-textColor--active` and `$btn-secondary-textColor--hover`

## v1.89.0

_February 6, 2020_

### Added

- Reduce motion query to `c-modal--popUp` which disables transition if user has setting enabled.
- Modal close button styles.

### Changed

- `c-modal--popUp--belowMid` modifier changed to `c-modal--popUp`.
- Switch `js-test-budy` for `@justeat/js-test-buddy`.
- Updated npm dependencies.

### Removed

- Unused `c-modal-actions--raised` & `c-modal-actions--fixed` classes.

### Fixed

- `c-modal--popUp` now applies transition correctly.
- Ignore test files when transpiling with Babel.

## v1.88.0

_February 5, 2020_

### Added

- New helper to rwd.scss for hiding items on tiny devices
- Stylelint disable rule for Firefox only element as it was throwing error when running Homeweb

## v1.87.0

_January 30, 2020_

### Added

- Height to `is-fixed` class again

## v1.86.0

_January 28, 2020_

### Added

- Separate class for the height of the scroll page - `c-modal-content-scrollHeight`

### Removed

- Height from `is-fixed` class

## v1.85.0

_January 23, 2020_

### Changed

- Updated overflow carousel to hide scrollbar on YourFavourites component

## v1.84.0

_January 22, 2020_

### Changed

- Updated card section styles.

## v1.83.1

_January 21, 2020_

### Changed

- Reverted previous change to badge style.
- Use explicit value for card rounded variable.

## v1.83.0

_January 21, 2020_

### Fixed

- Reverted `max-height` change to `.c-modal-content-scrollable` as it prevents scrolling on small screen devices.

### Changed

- Use explicit value for rounded badge border radius.

## v1.82.0

_January 20, 2020_

### Added

- `c-badge` component small rounded modifier styles.
- `u-spacingBottom--large--aboveMid` & `u-shadowBottom--belowMid` helper to the utilities.

### Changed

- Updated `c-card` component highlight modifier styles.
- Updated `c-modal` component styles.
- Consistent spacing between rules in the utilities module.

### Removed

- `c-card` component large rounded modifier styles.

## v1.81.0

_January 20, 2020_

### Removed

- `max-height` on `.c-modal-content-scrollable` to prevent locking on iOS

## v1.80.0

_January 7, 2020_

### Changed

- Media element style changes reverted.
- Toast styles updated.

### Fixed

- Undefined variable reference fixed.

## v1.79.0

_December 12, 2019_

### Changed

- Styles for `c-mediaElement-img--negativeTop` and `c-mediaElement-heading`

## v1.78.0

_December 9, 2019_

### Changed

- Fix OrderCard styling forYour Favourites Experiment

## v1.77.0

_December 3, 2019_

### Changed

- OrderCard styling for Your Favourites Experiment

## v1.76.2

_November 29, 2019_

### Changed

- Styles to include review stars for Menulog

## v1.76.1

_November 27, 2019_

### Changed

- `yarn.lock` file.

## v1.76.0

_November 27, 2019_

### Changed

- `fozzie-colour-palette` version.

## v1.75.1

_November 27, 2019_

### Fixed

- Vertical menu overflow x scroll axis

## v1.75.0

_November 26, 2019_

### Changed

- Menu style indentation.

### Fixed

- Menu link active style.

## v1.74.0

_November 25, 2019_

### Added

- Modifiers for `c-card` component.

### Changed

- Updated styles for `c-mediaElement` component.
- Updated styles for `c-menu` component.
- Updated styles for `c-modal` component.

## v1.73.0

_November 4, 2019_

### Added

- Class for fixed modal.

## v1.72.0

_November 1, 2019_

### Changed

- OrderCard for Your Favourites rollout.
- Media Element Breakpoint issue

## v1.71.0

_October 30, 2019_

### Changed

- Styles for `.c-mediaElement-infoLink` and `$mediaElement-img-borderRadius` for menuweb designs

## Added

- `c-mediaElement--fullstack--negativeTop`

## v1.70.0

_October 21, 2019_

### Added

- New `z-index` size.

## v1.69.0

_October 21, 2019_

### Changed

- Updated modal styles.
- Set `z-index` value for toast component to ensure it is always visible.

## v1.68.0

_October 9, 2019_

### Changed

- Updated popular cuisines component styling

## v1.67.0

_October 7, 2019_

### Changed

- Updated breakpoint unit intervals to fix Safari rounding issue.

## v1.66.0

_October 1, 2019_

### Changed

- Updated CSS fallback fonts cascade to be more design-sympathetic.

## v1.65.0

_September 30, 2019_

### Changed

- Order card updated for Recent Orders and Favourites component

## v1.64.0

_August 29, 2019_

### Added

- Hide overflow on `c-modal-content` class.

## v1.63.0

_August 29, 2019_

### Added

- `c-modal-title--spacing` modifier.

### Changed

- `c-modal-content--flush` now only removes padding.
- `c-modal-content--scrollable` renamed to `c-modal-content-scrollable` as it is applied to a child of `c-modal-content`.
- Casing on `c-modal--fullPage--belowMid` updated.

## v1.62.1

_August 23, 2019_

### Removed

- Removed animation from the `c-listing-item-header` for performance increase

## v1.62.0

_August 20, 2019_

### Changed

- Added `will-change` to `c-listing` loading animation to stop a larger redraw

## v1.61.0

_August 6, 2019_

### Added

- `c-pageBanner--loading` modifier to remove margin whilst images are loading.

### Changed

- Increased `margin-top` for images on wide screens for `c-pageBanner--narrow`.

## v1.60.0

_August 1, 2019_

### Added

- `c-modal-content--flush` styles.
- `c-modal-content--scrollable` styles.

## v1.59.0

_July 8, 2019_

### Changed

- Updated collapsible card styles.

## v1.58.0

_July 3, 2019_

### Added

- Styles for `c-breadcrumb--pill`.

## v1.57.0

_June 21, 2019_

### Removed

- Styles for `c-cuisinesCollage`.

## v1.56.0

_June 18, 2019_

### Added

- Styles for `c-cuisinesCollage`.

## v1.55.0

_June 18, 2019_

### Added

- Tweakpoint for `narrowMid: 600px` added to breakpoints

## v1.54.0

_June 13, 2019_

### Changed

- Update `c-listing` component to reflect new design

## v1.53.0

_June 3, 2019_

### Added

- Added modifier to `c-overflowCarousel` to also include mid version

### Fixed

- Updated media queries on full screen pop over to not exclude breakpoint

## v1.52.0

_June 6, 2019_

### Added

- Style for earned promo text

## v1.50.0

_June 3, 2019_

### Fixed

- Usage of the Glaze theme

## v1.49.0

_May 22, 2019_

### Fixed

- Hero banner max height reduction

## v1.48.0

_May 21, 2019_

### Fixed

- Apps banner styling adjustments

## v1.47.1

_May 15, 2019_

### Fixed

- User message component styles in IE11

## v1.47.0

_May 9, 2019_

### Added

- User message component

## v1.46.0

_May 8, 2019_

### Added

- `c-modal--fullpage--belowMid` modal setting to enable fullscreen modals for small screens.

## v1.45.0

_May 1, 2019_

### Added

- `c-modal-content--wide` modal setting to allow the modal to be larger in size.
- `c-modal-content--narrow` modal setting to allow the modal to be narrow in size.

## v1.44.0

_April 25, 2019_

### Changed

- Modal transition time.

## v1.43.0

_April 12, 2019_

### Added

- `default--scaleUp` size to ratings component.
- `--spaced` modifier to rating component.

## v1.42.0

_April 11, 2019_

### Added

- OK, dark, and indicator badge modifiers.

## v1.41.0

_April 8, 2019_

### Added

- Added `c-listingSkeleton` component, a `c-listing` loading skeleton.

## v1.40.0

_April 3, 2019_

### Changed

- Updated npm dependencies.

### Fixed

- Modal styles which caused the modal to be hidden on large screens.

## v1.39.0

_March 21, 2019_

### Changed

- `c-order-card` style amendments.
- `c-cuisinesWidget` underline text on hover state.

## v1.38.0

_March 20, 2019_

### Changed

- Alignment and image size of app component.

## v1.37.0

_March 20, 2019_

### Fixed

- Styling for `c-cookieWarning-inner` to prevent text flowing under the close button.

## v1.36.0

_March 12, 2019_

### Added

- Modal optional component.
- Expandable menu modifier.
- Overlay & prevent scroll utility helpers.

### Fixed

- Menu component `has-icon` class only applied to small device widths.

## v1.35.0

_March 6, 2019_

### Changed

- Styles for `c-orderCard--inactive`

### Added

- `u-absolutelyCentered` styles

## v1.34.0

_March 5, 2019_

### Changed

- Small styles amends to `c-cuisinesGrid--gridOfThree`

## v1.33.0

_February 20, 2019_

### Changed

- Add more media breakpoints to `c-pageBanner--tall`

## v1.32.0

_February 14, 2019_

### Changed

- `l-container` media queries breakpoints
- `c-pageBanner` small styles amends

## v1.31.0

_February 12, 2019_

### Changed

- Change class names from `c-cuisinesWidget-grid` and `c-cuisinesWidget-grid--gridOfThree` to `c-cuisinesGrid` and `c-cuisinesGrid--gridOfThree`

## v1.30.1

_February 11, 2019_

### Fixed

- Update the cursor type for the cookie banner close button

## v1.30.0

_February 11, 2019_

### Changed

- Rewrite `c-cuisinesWidget` to use css grid instead of flex

Now the component has grid modifier class `c-cuisinesWidget-grid--gridOfThree` instead of widget modifier class `c-cuisinesWidget--gridOfThree`

## v1.29.1

_February 6, 2019_

### Fixed

- Centre align child elements in `c-overflowCarousel` component
- Adjust spacing around the `c-overflowCarousel` component

## v1.29.0

_February 6, 2019_

### Changed

- Fix some styles for `c-orderCard` and `c-overflowCarousel` components

### Added

- `.o-link` classes

## v1.28.0

_January 31, 2019_

### Added

- more cookie warning tweaks

## v1.27.0

_January 31, 2019_

### Added

- cookie warning text style tweaks

## v1.26.0

_January 29, 2019_

### Added

- cookie warning styles

## v1.25.0

_January 29, 2019_

### Changed

- Updated card component styles.
- Updated page banner component styles.

## v1.24.1

_January 24, 2019_

### Fixed

- Adjusted dates in changelog.
- Removed height on `c-contentTitle-icon` to fix icon alignment.

### Added

- `white-space: initial` to `.c-listing-item-detailsRow-text` to adjust line wrapping.

## v1.24.0

_January 15, 2019_

### Added

- `l-innerContainer--verticalSpacing` for base spacing between sections.

## v1.23.0

_January 11, 2019_

### Changed

- Adjusted collapsible card padding and heights for different device widths.

## v1.22.0

_January 10, 2019_

### Added

- LGTM badge on readme.

### Changed

- Updated readme layout.

### Fixed

- Hide first of type paragraph in a collapsed card section.

## v1.21.0

_January 9, 2019_

### Changed

- Hide all but the paragraph element in a collapsed card section.

## v1.20.0

_December 17, 2018_

### Changed

- Updated button vert padding

## v1.19.0

_December 13, 2018_

### Added

- Styles for `c-orderCard`.

## v1.18.0

_December 4, 2018_

### Added

- Styles for `c-appsBanner`.

## v1.17.0

_December 4, 2018_

### Added

- Styles for `c-cuisinesWidget`.
- Babel resolution set to fix Travis build
- Minor package updates

### Removed

- Babel 7 dependencies removed from package.json (as now installed as part of gulp-build-fozzie).

## v1.16.0

_November 19, 2018_

### Changed

- Expand styles for `c-pageBanner`.

## v1.15.0

_November 19, 2018_

### Added

- Added `c-breadcrumbs--compact` rule.

### Fixed

- Fixed breadcrumbs font size and line height.

## v1.14.1

_November 19, 2018_

### Change

- Change switch to object literal in `isWithinBreakpoint` for better performance and readability.

## v1.14.0

_November 16, 2018_

### Fixed

- Fixed star rating SVG rendering on IE11 by setting the background size to the set size of the SVG.

## v1.13.0

_November 14, 2018_

### Change

- Change `o-formToggle` animation timing to be quicker on `<mid`.

## v1.12.0

_November 9, 2018_

### Changed

- Moved menulog fonts into their own sub-folder.

## v1.11.0

_November 6, 2018_

### Added

- Added `display: none` to `has-noItems` within the listing component.

## v1.10.0

_November 5, 2018_

### Added

- Added `.c-breadcrumb--transparent` class to use breadcrumbs with the transparent header.

## v1.9.0

_October 30, 2018_

### Fixed

- Fixed small star rating widths on devices with pixel density ratio of +3.

## v1.9.0

_November 2, 2018_

### Fixed

- Fixed small star rating widths on devices with pixel density ratio of +3.

## v1.8.0

_October 29, 2018_

### Added

- Improved a11y focus states on `.o-formToggle`.

### Changed

- Updated `.o-formToggle` checked state to reflect new design.

### Fixed

- Fixed icon showing on hover.
- Fixed border updating when checked (missing content in pseudo).

## v1.7.0

_October 22, 2018_

### Added

- Added `belowHighest` to zIndex map.

## v1.6.0

_October 9, 2018_

### Fixed

- Added `overflow-y: hidden` to overflow carousel to stop X and Y scrolling.

## v1.5.0

_October 8, 2018_

### Added

- Menulog custom Header typeface `Aspira Heavy` added and included to assets copied to project when module is installed and run (via `f-copy-assets`).
- `@font-face` rules for Asipra Heavy in Menulog theme

## v1.4.0

_October 5, 2018_

### Added

- Optional `c-toast` component.

### Changed

- `c-menu` active styles applied to link rather than list-item.
- `c-pagebanner` styles updated.
- `zIndex` map value for `low` changed.
- Sticky utility classes updated.

### Fixed

- Border radius reset on the `c-card--outline--aboveMid` class.

## v1.3.0

_October 5, 2018_

- Added `isWithinBreakpoint` method to breakpoint helper for breakpoint queries that match our SCSS style
- Added associated unit tests for `isWithinBreakpoint` method

## v1.2.0

_October 3, 2018_

### Fixed

- Fixed spacing on `c-listing` component
- Fixed display on `c-overflowCarousel` component

## v1.1.0

_October 3, 2018_

### Fixed

- Issue with `!default` causing spacing and breakpoint maps to not be set correctly (as already set previously, so not overriding properly).
- CHANGELOG typo fix
- Adding `resolutions` entry for `espree` to resolve errors when running `scripts:lint`

### Changed

- Moved optionally included components (via mixin) into `/optional` subfolder within `/components` directory
- Minor package updates

## v1.0.0

_October 2, 2018_

### Added

- `$theme` variable (via `_theme.scss` file) added to allow for theme overrides (such as for Menulog)
- Ability to switch to Menulog theme by setting `$theme: 'ml'`.

### Changed

- **Breaking change**: Using new `@justeat/f-utils` package for utility functions/mixins instead of `kickoff/utils.scss`.
- **Breaking change**: Moved and renamed text utility classes.
  - `text-center` -> `u-text-center`
  - `text-centre` -> `u-text-centre`
  - `text-left` -> `u-text-left`
  - `text-right` -> `u-text-right`
  - `text-highlight` -> `u-text-highlight`
  - `text-indent` -> `u-text-indent`
- **Breaking change**: The following components have now been made optional, and are included by referencing the appropriate mixin: `badge`, `contentHeader`, `contentTitle`, `fullScreenPopOver`, `listing`, `overflowCarousel`, `pageBanner`, `rating`.
- Updated variable names across component files to be a bit more consistent with one another.
- Updated comments across SCSS files for better consistency.

### Removed

- **Breaking change**: Mixins, Functions and helpers (such as breakpoints and code-highlighting) all moved to `@justeat/f-utils` module.
- **Breaking change**: A number of button types have been removed that aren't needed as yet in global. These include `o-btnToggle`, `o-btn--progress`, `o-btn--roundedIcon`, `o-btn--rounded`, `o-btn--transparent`, `o-btn--small` and `o-btn-group`.

## v0.102.0

_September 27, 2018_

### Changed

- Media element negative image position.
- Top menu spacing.
- Page banner positions.

### Fixed

- Badge separator display fix.

## v0.101.0

_September 26, 2018_

### Changed

- Changed `c-badge--transparent` and `c-badge--light` divider to be a pseudo element to improve accessibility

### Added

- Added glyphs file within settings to house CSS glyoh variables

## v0.100.1

_September 26, 2018_

### Changed

- preload font-weight to 400 to stop large visible jump in weight once webfonts have loaded
- set headings to use headings font-weight

## v0.100.0

_September 26, 2018_

### Added

- Stop FOIT JS module to reduce meaningful paint with webfonts

### Changed

- formToggle count text size

## v0.99.2

_September 25, 2018_

### Fixed

- Addition of modifier on `c-fullScreenPopOver` to stop non tabable functionality affecting other devices >mid

## v0.99.1

_September 25, 2018_

### Fixed

- Content header link mobile display property

## v0.99.0

_September 21, 2018_

### Changed

- Changed target of listing component is-premier image.
- Removed redundant font weight from listing title.

### Added

- Added styles to `display: none` popover component content when not visible for accessible tabbing.

## v0.98.0

_September 19, 2018_

### Changed

- Changed pop over action button text decoration from underlined to underlined on hover.

## v0.97.1

_September 18, 2018_

### Fixed

- Added missing semicolon to color util to fix build.

## v0.97.0

_September 18, 2018_

### Added

- Added `.u-color-secondary` class to color utils.

## v0.96.0

_September 18, 2018_

### Fixed

- Fixed `.o-formControl-indicator--radio` position on <= mid devices.

## v0.95.0

_September 18, 2018_

### Added

- Added `c-listing-item-badge` to the listing component to handle badge responsiveness

## v0.94.0

_September 17 2018_

### Changed

- Made responsive breakpoints more consistent on `c-contentHeader`.

## v0.93.0

_September 17 2018_

### Added

- Added additional focus states to improves accessibility of formToggles.

### Changed

- Moved the padding from c-listing-item to c-listing-item-link for a nicer focus border look.

## v0.92.0

_September 14, 2018_

### Added

- `l-inlined--top` layout helper.
- New card modifiers for spacing, borders, and background colours.
- Utility helper for text truncation.

## v0.91.0

_September 13 2018_

### Changed

- Added height to `c-listing-item-premierImage`.

## v0.90.0

_September 13 2018_

### Changed

- Removed margin from the span within `c-badge`.

## v0.89.0

_September 13 2018_

### Added

- Addition of `c-listing-loader` class to seperate the loading animation from the `c-listing` container.

## v0.88.0

_September 12 2018_

### Added

- Addition of `c-badge--transparent`

## v0.87.0

_September 12 2018_

### Added

- Card component normalise links modifier.
- Position sticky utility helper.
- Padding utility helpers.

### Changed

- Applied `!important` declaration to spacing utilities to ensure that they always trump other styles.
- Badge component text never wraps.
- Increased spacing between badges.
- Card components display as blocks.
- Card component comments updated.

### Fixed

- Overlap of angled badge section over text.

## v0.86.0

_September 12, 2018_

### Added

- Added `cursor: pointer` to the hover of `o-btnLink`.

## v0.85.0

_September 11, 2018_

### Changed

- Updated formToggle click area.
- Removed formToggle count pointer events.
- Updated overflowCarousel display to `inline-flex`.

## v0.84.0

_September 11, 2018_

### Added

- Added new class for alert status on listings.

### Changed

- Removed unused variable names within listings.

## v0.83.0

_September 11, 2018_

### Added

- Added text colour utility classes.

## v0.82.0

_September 11, 2018_

### Added

- Added `--extraSmall` modifier to ratings.

### Changed

- Updated listing rating styles to work with new rating size.

## v0.81.0

_September 10, 2018_

### Changed

- Updated listing state styles.
- Updated listing state class names
- Updated listing first and last childred to have border radius

## v0.80.0

_September 10, 2018_

### Added

- Card no padding modifier.
- Card highlight modifier.
- Card bottom section modifier.
- Animation to card section chevron.
- 0.5 spacing value.

### Changed

- Updated modules to use new 0.5 spacing value.

### Fixed

- Card section margin only applied on larger screens.

## v0.79.0

_September 7, 2018_

### Added

- No padding collapsible card section styles.

### Changed

- Updated menu styles.

## v0.78.0

_September 7, 2018_

### Added

- Card component section child styles.

### Changed

- Updated breakpoints for menu and page banner components.

## v0.77.0

_September 6, 2018_

### Changed

- Menu component now using borders rather than box-shadow.

## v0.76.0

_September 5, 2018_

### Changed

- Updated formToggle count styling
- Changed formToggle class modifier `--withCount` to `--hasCount`

### Fixed

- Fixed formToggle large touch area class to target narrow screens only

## v0.75.0

_September 5, 2018_

### Added

- Menu component condensed modifier.
- Menu component horizontal modifier.
- Moved more CSS values into SCSS variables.

### Changed

- Updated package dependencies.

### Removed

- Removed Node v6 Travis build until a fix for the object spread error has been completed.

## v0.74.1

_September 5, 2018_

### Fixed

- Fullscreen popover content styles to be within media breakpoint

## v0.74.0

_September 4, 2018_

### Added

- Added `--noPad` modifier to `c-badge`
- Added `c-listing-item-premier` (Local legend badge) styling

### Changed

- Updating listing component by removing text divider and badge styles to now use c-badge

## v0.73.0

_September 4, 2018_

### Changed

- Optional `c-menu` component.

### Changed

- `l-inlined` extended so that it can be referenced as a placeholder.
- `$truncation-boundary` parameter is now optional on the `truncate` mixin.

## v0.72.0

_September 4, 2018_

### Added

- Added fullScreenPopOver content section to allow for large content within popOvers

### Changed

- Changed fullScreenPopOver JS to `is-open`

## v0.71.0

_September 3, 2018_

### Added

- Added additional modifiers to formToggle to help change style between mobile and desktop

### Changed

- Content title width
- Changed listing content widths
- Changed positioning of listing meta block between mid and wide

## v0.70.0

_August 31, 2018_

### Added

- Added `u-spacingTop--large` utility class.

### Changed

- Applied border radius to angled badges.

## v0.69.0

_August 31, 2018_

### Added

- Added `c-badge--success`.
- Added `c-badge--important`.
- Added `c-badge--award`.
- Added `c-badge--angled`.

### Changed

- Updated `c-badge` padding.

## v0.68.0

_August 30, 2018_

### Added

- Added `u-spacingBottom--large` helper.

### Changed

- Updated heading font weight to match latest UI designs.
- Increased default star rating size.

## v0.67.0

_August 30, 2018_

### Changed

- Updated listing tile styling

## v0.66.0

_August 29, 2018_

### Changed

- Update styles within listings component to target svg to work with inline-svg helper
- Update styles within form toggle component to target svg to work with inline-svg helper

## v0.65.0

_August 29, 2018_

### Changed

- Changed page banner image media query.
- Updated component documentation.

## v0.64.0

_August 28, 2018_

### Added

- Spacing between spans inside the `c-badge` component.

## v0.63.0

_August 28, 2018_

### Removed

- Decoration images.
- Copy assets config from `package.json`.

## v0.62.0

_August 24, 2018_

### Added

- `o-body` object styles.
- `c-card` modifier.
- Optional `c-pageBanner` component.
- Rays images.

### Changed

- `c-mediaElement` image border radius.
- Updated npm test script.

### Fixed

- Extra space in utilities styles.
- Documentation links in components.

## v0.61.0

_August 23, 2018_

### Added

- Centre align layout utility.
- No underline utility.

### Removed

- Media element centered element.
- Removed fullstack mediaElement width restraint on smaller screens.

## v0.60.2

_August 23, 2018_

### Changed

- Updated Jest coverage directory.

### Removed

- Packagephobia badge.

## v0.60.1

_August 22, 2018_

### Added

- Coveralls module.
- Coveralls and packagephobia badges.

### Changed

- Updated Travis config.

## v0.60.0

_August 22, 2018_

### Added

- Media element centered element.

## v0.59.1

_August 22, 2018_

### Changed

- Change content header action hover state from no decoration normal and underline when hovered.

## v0.59.0

_August 22, 2018_

### Added

- `is-sticky` utility class and styles

## v0.58.0

_August 22, 2018_

### Added

- New badge component modifiers

### Fixed

- Added prefix to badge component classes.

## v0.57.0

_August 21, 2018_

### Added

- `c-mediaElement` element and modifier added.

## v0.56.0

_August 21, 2018_

### Added

- Optional `badge` component.

### Changed

- `card` component modifiers.
- Applied relative position to `card` component.

## v0.55.0

_August 20, 2018_

### Added

- Added spacing utility classes.

## v0.54.0

_August 16, 2018_

### Added

- Addition of `has-noItems` class and styling to `.c-listing` item. (removes border).

## v0.53.4

_August 15, 2018_

### Changed

- Change formToggle from CSS based icon to SVG f-icon asset

## v0.53.3

_August 15, 2018_

### Fixed

- Fullscreen popover background to grey--offWhite instead of white.
- Fullscreen popover header/footer background colour set to white due to popover background colour change

## v0.53.2

_August 14, 2018_

### Fixed

- Fixed formToggle hover state - Only checked state is applied to < mid. >=mid has hover and checked states.

## v0.53.1

_August 2, 2018_

### Fixed

- Fixed stars look like selectable when the input is disabled.

## v0.53.0

_August 2, 2018_

### Added

- addition of .o-formToggle--disabled state styles
- addition of form toggle inline spacing to give 44px touch area
- addition of cursor pointer of form toggle hover

### Fixed

- height unit on fullScreenOverlay from vh to % as Android didnt take into account browser bars making 100vh larger than 100%

## v0.52.0

_July 27, 2018_

### Changed

- Update of font styles to content header
- Addition of subTitle styles to content header

## v0.51.2

_July 25, 2018_

### Changed

- Remove of margin top on listing item meta block to change to a <p> for better screen reader experience

## v0.51.1

_July 23, 2018_

### Fixed

- A minor layout fix for the form toggle control

## v0.51.0

_July 20, 2018_

### Added

- Form toggle object
- Mobile pop over component
- Mobile (scroll only) carousel component
- Content title component

### Changed

- Addition of JS toggle classes (`active`, `inactive`) to listing component

## v0.50.1

_July 3, 2018_

### Fixed

- Ratings star count fix, changed from 25 (test amount) back to 6.

## v0.50.0

_July 3, 2018_

### Added

- Text utility classes for `text-highlight` and `text-indent`

## v0.49.0

_July 3, 2018_

### Changed

- Updated styling on listing component, improved layout on smallest variation of screens

### Added

- Addition of new breakpoint, tiny

## v0.48.0

_July 2, 2018_

### Added

- SERP header with alternative variations

## v0.47.0

_June 29, 2018_

### Added

- Styling for address elements

## v0.46.0

_June 28, 2018_

### Added

- Addition of variation to c-card padding

### Changed

- Changed border utility to be a mixin so can be used within a breakpoint mixin. In this case it was to create a class that was only bordered after a certain width
- Updated and extended listing styles to match current variation of visuals.
- Variation to c-card padding, changed border utility to be a mixin so it can be included within a breakpoint without code duplication, updated listing component to current variations of design
- Updated rating widths to allow for spacing new (compressed) rating icons have

## v0.45.0

_June 22, 2018_

### Changed

- Font size for default and narrow screens. `large--scaleUp` renamed to `large--scaleDown`

## v0.44.0

_May 14, 2018_

### Added

- `u-textPad` utility class added for padding text

### Changed

- Updated ordered list styling
- Updated typography utility classes so that `.alpha`, `.beta`, `.gamma`, `.gamma` and `.delta` all match header styles when applied

## v0.43.0

_May 1, 2018_

### Added

- Pull Request Template Added to repo

### Removed

- Removing a couple of buttons that are no longer in the brand guidelines

## v0.42.2

_April 30, 2018_

### Fixed

- Broken build is fixed. It was depending on an icon that isn't always present in the ratings.

## v0.42.1

_April 30, 2018_

### Fixed

- Green light colour variable name is fixed.

## v0.42.0

_April 26, 2018_

### Changed

- fozzie-colour-palette version is updated

## v0.41.1

_April 25, 2018_

### Added

- Focus outline to buttons with the class `o-btnLink`.

## v0.41.0

_April 20, 2018_

### Fixed

- Button font size rendered larger due to v0.38.0 release so fix applied here.

## v0.40.0

_April 19, 2018_

### Added

- Enhanced `c-alert` component styling

## v0.39.0

_April 17, 2018_

### Added

- Selectable star ratings
- Non selectable star ratings
- Mixin to generate fill classes for ratings

## v0.38.0

_April 10, 2018_

### Changed

- Font size variable map updated.

## v0.37.0

_March 16, 2018_

### Fixed

- Table border style flipped to fix rowspan columns.

## v0.36.0

_March 12, 2018_

### Fixed

- Removed unnecessary _$_ infront of zIndex variable.

## v0.35.0

_March 9, 2018_

### Added

- Dangerfile check to validate PR titles with respect to version numbers
- Basic CODEOWNERS file added

### Changed

- Licence updated

## v0.34.0

_March 8, 2018_

### Added

- Styling for radio buttons and checkboxes (crosses and ticks)

## v0.33.0

_February 28, 2018_

### Added

- Listing - An element that allows display of vertically stacked content e.g. a list.

## v0.32.0

_February 23, 2018_

### Removed

- `plugins`, `env` and most of the `rules` from `.eslintrc` to fix some errors encountered when running gulp.
- `yarn start` and `yarn lint` scripts. These are now part of `yarn prepare`, which runs `gulp --prod`.
- `scripts-info` section from `package.json` and `npm-scripts-info` dependency.

### Added

- `breakpointHelper.js` to handle CSS breakpoints.
- `index.js` as the module entrypoint.
- JS unit tests.
- Dependencies on `f-dom` and `js-test-buddy`.
- `_breakpoints.scss` to `scss/tools/` directory.
- `getCurrentScreenWidth()` which returns `'narrow'`, `'mid'`, `'wide'`, `'huge'`, or `false` if no breakpoints are defined.
- JS files to `dist/js` folder.
- `yarn compile` and `yarn test`.

### Changed

- `yarn prepare` now runs `gulp --prod`.
- `yarn lint` lints JS and SCSS.

## v0.31.0

_February 22, 2018_

### Changed

- _Nothing to see here..._

## v0.30.0

_February 22, 2018_

### Added

- Media Element - Image followed by a block of information.

## v0.29.0

_February 16, 2018_

### Changed

- Renamed base `scss` file to `fozzie.scss`

## v0.28.0

_February 14, 2018_

### Fixed

- Inline svg for breadcrumbs breaking build. Now uses separate svg icon.

## v0.27.0

_February 9, 2018_

### Added

- Layout classes - A class for inlining elements side by side and a divider class for vertically separating two elements with a border.

## v0.26.0

_February 7, 2018_

### Fixed

- List styling. Indentation when text wrapped onto second line is now consistent and margin-top on nested lists removed (as not needed).

## v0.25.1

_February 6, 2018_

### Fixed

- `.o-btn.is-loading` so the loading image renders correctly in Chrome for Android

## v0.25.0

_February 6, 2018_

### Added

- Breadcrumb site navigation component

## v0.24.0

_February 1, 2018_

### Added

- Added debug messages for passed in environment variables

### Changed

- Updating `.gitignore` to exclude `yalc` config

## v0.23.2

_January 31, 2018_

### Changed

- fozzie-colour-palette version is bumped

## v0.23.1

_January 31, 2018_

### Changed

- Fixed o-btnLink's background-color for different statuses

## v0.23.0

_January 29, 2018_

### Changed

- Updated `browserlist` in `package.json`
- Updated to use `babel-preset-env`

## v0.22.0

_January 17, 2018_

### Added

- Danger added to fozzie to carry out PR checks via travis

### Changed

- Updated `gulp-build-fozzie` to latest version
- Amended SCSS in-line with new Stylelint rules

## v0.21.1

_November 13, 2017_

### Added

- Missing default H1-H6 color according to palette.

## v0.21.0

_November 13, 2017_

### Added

- `.not-striped` class to the table.
- `.is-loading` class to the o-btn.

## v0.20.0

_November 8, 2017_

### Added

- `relativeToParent` parameter to the `font-size` mixin to allow font sizes to use `em` rather than `rem`.

## v0.19.0

_November 6, 2017_

### Added

- `c-alert` component is added.
- `alert-variant` mixin is added.

v0.18.4

---

_November 6, 2017_

### Added

- `u-elementFocus--boxShadow` utility class is added.

## v0.18.3

_November 3, 2017_

### Added

- `u-pointer` utility class is added.

## v0.18.2

_November 1, 2017_

### Added

- `u-uppercase` utility class is added.

## v0.18.1

_November 1, 2017_

### Changed

- Changed default font-weight of `o-btn` to `500`

## v0.18.0

_October 24, 2017_

### Added

- `truncate` mixin is added.

### Changed

- `fozzie-colour-palette` version bumped to 0.9.0.
- Changed `$btn-default-font-family` to 'Ubuntu'

## v0.17.1

_October 24, 2017_

### Changed

- `:focus` state updated to be `2px solid` rather than `3px auto` by default.

## v0.17.0

_October 20, 2017_

### Changed

- `:focus` state added (controlled via colour palette variable).

## v0.16.0

_October 18, 2017_

### Changed

- Updated dependencies.

## v0.15.0

_October 3, 2017_

### Changed

- Updated `btnToggle` styles.

### Removed

- Removed icons SCSS partial — now using SCSS from `f-icons` module.

## v0.14.0

_September 26, 2017_

### Changed

- Tidied up gulp setup and config.
- Moved build packages in `devDependencies`.

### Removed

- Removed icons — they now live in the [`f-icons`](https://github.com/justeat/f-icons) module.
- Removed `require-dir` package.
- Removed placeholder JavaScript.

## v0.13.0

_August 31, 2017_

### Changed

- Publish only `src/` to npm.
- Specify icons as contained in `src/` rather than `dist/`

## v0.12.0

_August 30, 2017_

### Added

- Base button class `o-btn`
- A range of button colour and design modifiers
- Toggle button component
- Base icon class `c-icon`
- Icon size modifiers
- Tick icon classes
- Operator icon classes (plus & minus)
- SVG files for tick and operator icons
- Assets manifest in package.json, specifying the icons to be copied

### Changed

- Updated `gulp-build-fozzie`
- Made the scss path variables overridable

## v0.11.1

_August 25, 2017_

### Changed

- Production flag added to lint task

## v0.11.0

_August 25, 2017_

### Added

- Lint task to run on travis so we can see any failures before they get published

### Changed

- Couple of small updates in line with the linting errors
- Path for local scripts changed in line with new build config

## v0.10.0

_August 25, 2017_

### Added

- Custom bullets on unordered lists.
- `u-bordered` class for adding a border around a block.
- Added narrow view type sizes for headings

### Changed

- Updated line-height for jumbo homepage text.
- Updated the `l-content` class so that it can contain a `header` and `main` that are appropriately spaced for content pages.
- Updated packages

## v0.9.0

_August 24, 2017_

### Added

- Table Styling
- `$border-radius` variable added to standardise the radius of rounded components.
- Utility class `u-lightenBg` added so that a lighter background colour can be applied to a page or section of a page.

### Changed

- Better list item spacing. By default now adds spacing between `li`s (which can be removed by applying the `u-unstyled` class).
- More sensible typographic spacing based on baseline spacing.

## v0.8.0

_August 9, 2017_

### Added

- CHANGELOG (changelog inception ✨)

### Changed

- Updated dependencies for `gulp-build-fozzie` and `fozzie-colour-palette`
- `hr` styling updated to use `border` rather than `background` as more native

### Removed

- `@debug` statement in `line-height` function

## v0.7.0

_August 4, 2017_

### Added

- `$line-height-base` added to variables

### Changed

- line-height function changed so that it can take strings to access the type map directly by specifying a key

## v0.5.1

_July 28, 2017_

### Changed

- Updated dependencies for `gulp-build-fozzie`

## v0.5.0

_July 27, 2017_

### Added

- Optional `card` component
- Body copy given a base font-weight
- Default list styling for `ul` and `ol` tags

## v0.4.0

_July 18, 2017_

### Added

- Added the `zIndex` mixin for accessing the `zIndex` map

### Changed

- Updated dependencies for `gulp-build-fozzie`
- Utility classes given `!important` as they should never be overridden
- Font-weight variables adjusted in line with the design guidelines
- Indentation made consistent throughout all files

### Removed

- Dependency on Stylelint as now included in the build tasks

## v0.3.0

_July 10, 2017_

### Changed

- Updated license and README
- `l-container` width and padding adjusted

### Fixed

- Link to `normalize.css` module fixed

## v0.2.3

_June 14, 2017_

### Fixed

- Fixed `font-size` and `rem` mixins

## v0.2.2

_June 13, 2017_

### Changed

- Updating docs folder and path to compiled CSS

## v0.2.1

_June 13, 2017_

### Changed

- Incremented depencies for `fozzie-colour-palette` and `gulp-build-fozzie`

## v0.2.0

_May 15, 2017_

### Added

- Eyeglass support added
- Documentation files added

### Changed

- Package name updated to `@justeat/fozzie` inline with NPM organisation structure

## v0.1.1

_May 10, 2017_

### Changed

- Updating dependency to `gulp-build-fozzie`

## v0.1.0

_May 9, 2017_

### Added

- Travis config added so that CI checks can be run

### Changed

- `gulp-build-fozzie` integrated to abstract out the build tasks
- Line endings… :ambulance:

## v0.0.1

_May 5, 2017_

### Added

- Base structure of module. Essentially a skeleton version of the module with relevant editorconfigs, gitconfig, license and a very rough outline for the CSS structure
