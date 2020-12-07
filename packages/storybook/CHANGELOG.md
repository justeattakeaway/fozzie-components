# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v0.20.0
------------------------------
*December 7, 2020*

### Changed
- Updated Context structure to make it identical to F-Development-Context which is used by WebDriver


v0.19.0
------------------------------
*December 3, 2020*

### Added
- Added Logger Context to allow writing to browser console within Storybook

### Changed
- Updated I18n Context Setup to follow new pattern


v0.18.0
------------------------------
*December 2, 2020*

### Added
- Add Cookie Universal into Context so Mono Repo components can do this.$cookies.get('my-cookie-name');


v0.17.0
------------------------------
*November 17, 2020*

### Changed
- Moved `sassOptions` config out of the Storybook `vue.config.js` so that it can be used by other components.


v0.16.0
------------------------------
*November 16, 2020*

### Added
- PIE dark theme!
- Custom PIE logo.
- Custom favicon.
- Set up public directory so that we can reference assets in stories and mdx
- `manager-head.html` so we can set up fonts and layout config.

### Changed
- Updated Storybook npm dependencies.
- Override list styles in `preview-head.html`.


v0.15.0
------------------------------
*November 9, 2020*

### Added
- `preview.js` file to decorate our stories with `vue-i18n`.


v0.14.0
------------------------------
*November 6, 2020*

### Removed
- Jest addon for Storybook


v0.13.0
------------------------------
*November 6, 2020*

### Changed
- CSS imports updated in line with fozzie v5.


v0.12.0
------------------------------
*September 28, 2020*

### Removed
- Percy visual regression dependencies


v0.11.0
------------------------------
*August 21, 2020*

### Changed
- Updated a11y addon reference for Storybook `v6` compatibility

### Added
- Added 'controls' addon (newer version of knobs for Storybook `v6`)


v0.10.0
------------------------------
*August 18, 2020*

### Added
- Config for parsing `.mdx` files which can be used for markdown documentation with components.

### Changed
- Updated to Storybook `v6` (and updated stories across other packages as part of the migration).


v0.9.0
------------------------------
*July 23, 2020*

### Fixed
- Ensures common and fozzie styles applied exclusively for scss fragments within `src`
  directory of a component only (allows stories themselves to be styled separately)


v0.8.0
------------------------------
*July 23, 2020*

### Changed
- Vue CLI minor package updates.


v0.7.0
------------------------------
*July 16, 2020*

### Fixed
- Stopped bad styles removing border around registration component.


v0.6.0
------------------------------
*July 9, 2020*

### Added
- New `percy` and `snapshot` scripts in `storybook` package for visual regression tests.


v0.5.0
------------------------------
*July 9, 2020*

### Changed
- Updated vue.config.js to import fozzie styles for all components in storybook build.


v0.4.0
------------------------------
*July 9, 2020*

### Changed
- Updated `sass-loader` to 7.3.1 to allow for contextual import of common.scss files from
  Single File Components in subdirectories.


v0.3.0
------------------------------
*July 2, 2020*

### Added
- Added `@storybook/addon-a11y` to a11y test our UI components in Storybook.


v0.2.0
------------------------------
*April 22, 2020*

### Added
- Added README.md


v0.1.0
------------------------------
*April 16, 2020*

### Added
- Added initial files.
