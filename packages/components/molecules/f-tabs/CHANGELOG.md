# [0.4.0](https://github.com/justeat/fozzie-components/compare/v1.0.0...v0.4.0) (2021-04-16)


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



v0.4.0
------------------------------
*April 1, 2021*

### Fixed
- When tab selection is updated in `Tab` props, ensures that the focus is reflected back
  to surrounding `Tabs` component

### Changed
- Factored out Tabs' `provide` keys to constants


v0.3.0
------------------------------
*March 3, 2021*

### Added
- Added component tests
- Added supporting code to component object file

### Changed
- `Data-test-id` naming for `tab-` to `tab-button-` in `Tabs.vue` and `Tabs.test.js`
- `Data-test-id` naming for `transition-tab-` to `tab-content-` in `Tab.vue` and `Tab.test.js`

*February 24, 2021*

### Changed
- Restructured component object into page object model
- Refactored component and accessibility tests


v0.2.1
------------------------------
*February 08, 2021*

### Added
- Added unit tests for the tabs component


v0.2.0
------------------------------
*January 28, 2021*

### Added
- Added the first version of tabs with Tab and Tabs vue component


v0.1.0
------------------------------
*January 21, 2021*

### Added
- Add generated output for tabs
