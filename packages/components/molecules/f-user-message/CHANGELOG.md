# [1.2.0](https://github.com/justeat/fozzie-components/compare/v1.0.0...v1.2.0) (2021-04-16)


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



v1.2.0
------------------------------
*February 9, 2021*

### Added
- Added `f-user-message.component.spec` tests
- Added accessibility tests


v1.1.0
------------------------------
*January 29, 2021*

### Added
- Added the component to storybook

### Changed
- Update service to use new values as the contract has changed


*January 12, 2021*

### Changed
- 'jet' theme instead of 'je'
- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.
- Update axios version for security advisory

### Added
- Stylelint added to lint styling on build.


v1.0.0-beta.1
------------------------------
*September 3, 2020*

### Changed
- Rebasing `v0.3.0` changes into the beta branch.


v1.0.0-beta.0
------------------------------
*August 27, 2020*

### Changed
- Uses `JustEatBasis` font and new fozzie font size declarations.


v0.3.1
------------------------------
*September 8, 2020*

### Changed
- `eslint-config-fozzie` & `f-trak` peer dependencies use a range value.


v0.3.0
------------------------------
*August 28, 2020*

### Changed
- Removed component top margin. This should be set in the host app, if required
- Updated packages. Reduced bundle size


v0.2.0
------------------------------
*July 23, 2020*

### Changed
- Small update to colours from updating to `fozzie-colour-palette` in the mono-repo root.
- Vue CLI minor package updates.


v0.1.1
------------------------------
*May 12, 2020*

### Changed
- Updating `vue-test-utils` to v1 and `@vue/cli-plugin-unit-test` to v4.3.1.
- ESLint autofix turned off (so that tests don't pass due to `--fix` being applied, but then publish subsequently fails)

### Removed
- `testMatch` from jest config, as not needed.


v0.1.0
------------------------------
*March 27, 2020*

### Added
- Adds `f-user-message` vue component
