# [1.1.0](https://github.com/justeat/fozzie-components/compare/v1.0.0...v1.1.0) (2021-04-16)


### Bug Fixes

* **fozzie-components:** fix formatting of all changelogs ([5301ad6](https://github.com/justeat/fozzie-components/commit/5301ad6fd4f2783c5894177dc1f6e9dbe639d1fb))
* **fozzie-components:** fix yarn.lock ([926c1ec](https://github.com/justeat/fozzie-components/commit/926c1ec14693e35c286a9b295901ea785373c35d))
* **fozzie-components:** follow conventional changelog format ([a4ef63f](https://github.com/justeat/fozzie-components/commit/a4ef63f131670340c035ffe4509bff1214fd6536))
* **fozzie-components:** update package.json ([a1e99eb](https://github.com/justeat/fozzie-components/commit/a1e99eb937c414a2e23c759dcb269bb75fc85bee))


### Features

* **fozzie-components:** adds commitizen support and husky / git hook support ([11c1026](https://github.com/justeat/fozzie-components/commit/11c10261d45ce2e9bfa89b026cf85d8cf52b5d63))
* **fozzie-components:** enforce commit messages to follow conventional commit format ([131eeb1](https://github.com/justeat/fozzie-components/commit/131eeb152b7b384d4054791cf535db403b9239ac))
* **fozzie-components:** enforce conventional commits with husky hook ([3d8f4aa](https://github.com/justeat/fozzie-components/commit/3d8f4aa6e0a05273d5962fae3937ac281aebce70))
* **fozzie-components:** runs linting against changed packages ([75fdfb6](https://github.com/justeat/fozzie-components/commit/75fdfb6546224ebb8621deadecd911f2cb96dfc8))



v1.1.0
------------------------------
*March 17, 2021*

### Added
- Added a `prop` to allow the customisation of the heading level.

### Changed
- Restructured component object into page object model
- Refactored accessibility tests

v1.0.0
------------------------------
*February 22, 2021*

### Removed
- `tenant` and `theme` config, as not used in Card component.

### Changed
- Storybook config switched over to using `controls` rather than `knobs`.
- Reordered props (Alphabetical order).
- Updated README.
- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.


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
