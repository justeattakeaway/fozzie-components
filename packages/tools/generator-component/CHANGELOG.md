# [2.1.0](https://github.com/justeat/fozzie-components/compare/v1.0.0...v2.1.0) (2021-04-16)


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



v2.1.0
------------------------------
*February 25, 2021*

### Changed
- Updated templates in `test-utils` and `test` folder


v2.0.2
------------------------------
*February 10, 2021*

### Fixed
- Couple more `README` path and name updates.


v2.0.1
------------------------------
*February 10, 2021*

### Fixed
- Couple of path updates in the `README` and closing tag for `h1` removed.


v2.0.0
------------------------------
*January 27, 2021*

### Added
- `.yo-rc.json` to signify the destination root of the generator (to use the base of the mono-repo as our root directory, wherever the generator is run).
- Generator will now generate to a destination based on the users answers. For example, if it's specified that the component is an atom, the component will be generated into the `components/atoms` directory.
- Welcome prompt and update prompt which displays if the generator being run is out-of-date with the current published version.
- Option to exclude translations/`i18n` config when component doesn't need these.
- Excludes a number of directories and code when generated component is a service.

### Fixed
- `yeoman-generator` added to dependencies so that local testing doesn't error on missing dependency.

### Changed
- Structure of generator tidied up. Now uses `initializing` and `configuring` contexts rather than having all logic in the `writing` context.
- Prompts moved out into separate file.
- `_tests` folder updated (previously `tests`).
- `scripts` in `package.json` updated inline with recent changes to webdriver config.
- Unnecessary `scripts` removed based on yeoman options chosen.
- Sass loader config updated.


v1.10.1
------------------------------
*January 12, 2021*

### Changed
- Update axios version for security advisory.


v1.10.0
------------------------------
*December 31, 2020*

### Changed
- Jest config path updated for component skeleton.

v1.9.0
------------------------------
*December 30, 2020*

### Changed
- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.


v1.8.0
------------------------------
*November 26, 2020*

## Added
- Stub CSS files in jest.


v1.7.0
------------------------------
*November 23, 2020*

### Changed
- CircleCI badge updated.


v1.6.0
------------------------------
*October 28, 2020*

### Removed
- Template files.


v1.5.0
------------------------------
*October 23, 2020*

### Added
- Stylelint config added as part of the generator.


v1.4.0
------------------------------
*October 16, 2020*

### Added
- Axe Accessibility Spec template

### Changed
- Moved conditional statement from axe-accessibility spec to axe-helper


v1.3.0
------------------------------
*October 14, 2020*

### Added
- Use today's date when creating initial changelog entry.


v1.2.0
------------------------------
*October 14, 2020*

### Changed
- Changed path so that the generator outputs to the current directory it's in, rather than the directory above the current location.
- Updated `babel.config.js` to run the tests through latest Node version rather than our browser config.
- Deleted theme mixin, as no longer needed.
- Removed font files from `Demo.vue`.
- Storybook syntax updated to new `export` syntax (from legacy `storiesOf` syntax).

v1.1.1
------------------------------
*October 6, 2020*

### Added
- API service template
- Axios to package.json template

### Fixed
- Test template


v1.1.0
------------------------------
*October 6, 2020*

### Changed
- Added test templates


v1.0.0
------------------------------
*August 27, 2020*

### Changed
- Updating `font-size` variable.


v0.2.1
------------------------------
*September 8, 2020*

### Changed
- Updated `devDependencies` to use same versions as the other packages.
- Vue CLI minor package updates.

### Fixed
- Updated bundle name in readme template.


v0.2.0
------------------------------
*May 12, 2020*

### Changed
- Updated template to use `vue-test-utils` to v1 and `@vue/cli-plugin-unit-test` to v4.3.1.

### Removed
- `testMatch` from jest config, as not needed.


v0.1.0
------------------------------
*April 21, 2020*

### Added
- First version to be able to create new components.
