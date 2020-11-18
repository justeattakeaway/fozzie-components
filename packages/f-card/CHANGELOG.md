# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v0.9.0
------------------------------
*November 18, 2020*

### Changed
- `pageContentWrapper` width, so that it sits on our 8px grid.


v0.8.0
------------------------------
*October 26, 2020*

### Added
- Stylelint added to lint styling on build.
- data-test IDs to Card Component
- Test for Card
- Card Component-Object

### Changed
- 'jet' theme instead of 'je'


v0.7.0
------------------------------
*October 13, 2020*

### Changed
- Removed 'beta' style from card heading to align font-size with designs.


v0.6.0
------------------------------
*September 21, 2020*

### Fixed
- Add top and bottom margins to F-Card when 'isPageContentWrapper' is enabled


v0.5.1
------------------------------
*September 21, 2020*

### Fixed
- Fix linting issues fo `f-card` computed properties tests.


v0.5.0
------------------------------
*September 18, 2020*

### Added
- Tests for `f-card` computed properties.


v0.4.0
------------------------------
*July 23, 2020*

### Changed
- Updating colour variables to use new versions set in `fozzie-colour-palette` (rebrand phase 3.1).
- Changing `data-theme` to `data-theme-card` to avoid clashing with any other components in the future.
- Vue CLI minor package updates.

*July 2, 2020*

### Added
- Accessibility add-on to Storybook story.

*June 25, 2020*

### Changed
- Updating colour variables to use new versions set in `fozzie-colour-palette`.


v0.3.1
------------------------------
*June 11 2020*

### Changed
- Fixed linting issue.


v0.3.0
------------------------------
*June 10 2020*

### Changed
- Additional prop to indicate card heading text alignment.
- Storybook updated for card component.
- Updating `vue-test-utils` to v1.
- Structure of Storybook stories changed to CSF (Component Story Format) – the new recommended way to write stories.
- ESLint autofix turned off (so that tests don't pass due to --fix being applied, but then publish subsequently fails)


v0.2.0
------------------------------
*April 27, 2020*

### Added
- Component markup and core functionality added.
- Storybook config added.


v0.1.0
------------------------------
*April 21, 2020*

### Added
- Component structure and basic configuration (copied from `f-skeleton-component`).
