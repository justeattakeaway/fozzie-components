# [1.9.0](https://github.com/justeat/fozzie-components/compare/v1.0.0...v1.9.0) (2021-04-16)


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



v1.9.0
------------------------------
*March 24, 2021*

### Changed
- `createCamelCaseClient` function passes `transformResponse` directly instead of via a `config` object.
- `createClient` & `createCamelCaseClient` both scoop up all remaining arguments via a rest parameter allowing us to pass any additional config as you would normally to `axios.create`.


v1.8.0
------------------------------
*March 23, 2021*

### Changed
- `package.json` main value to `umd.min`.
- Update axios version for security advisory.
- Replaced rollup with vite.
- Replace vue-cli commands for linting and testing with calls to eslint and jest directly.
- Update npm dependencies.


v1.7.0
------------------------------
*December 7, 2020*

### Added
- `es-ES` validations to postcode and phone validations.

### Changed
- `isValidPostcode` to accept locale.


v1.6.0
------------------------------
*December 1, 2020*

### Added
- `getDeepObjectByPath` to `utilities.js` to traverse an object using a given path.

### Changed
- `getFormValidationState` function to return the full path of a nested object.


v1.5.0
------------------------------
*November 25, 2020*

### Added
- Phone Number validation method.


v1.4.0
------------------------------
*November 9, 2020*

### Added
- Postcode and form validation methods inside new validation service.


v1.3.0
------------------------------
*October 5, 2020*

### Added
- `headerTransform` option to create client functions.


v1.2.1
------------------------------
*September 8, 2020*

### Changed
- `axios` peer dependency uses a range value.


v1.2.0
------------------------------
*September 2, 2020*

### Changed
- Handle missing navigator API so that the default axios timeout is returned when used on the server.


v1.1.0
------------------------------
*August 26, 2020*

### Added
- Request/response interceptors to add response times to response object.
- `axios-mock-adapter` to help with testing.

### Changed
- Vue CLI minor package updates.
- `@vue/cli-plugin-unit-test` to v4.3.1.
- ESLint autofix turned off (so that tests don't pass due to `--fix` being applied, but then publish subsequently fails)


v1.0.1
------------------------------
*May 6, 2020*

### Changed
- Syntax in `index.js` so that newer versions of f-services are compatible with Storybook


v1.0.0
------------------------------
*April 1, 2020*

### Added
- Axios services module.
- Axios as a peer dependency.

### Changed
- Split central "shared" module into separate "window" and "globalisation" modules.
- `jest` config updates. `moduleNameMapper` removed, `jsx` removed from checks (as we don't use) and `transformIgnorePatterns` updated.
- Rollup package updates.

### Fixed
- `addEvent` returns the function that was assigned to the event listener so that this can be passed in to `removeEvent`. This is necessary for removing throttled event listeners.


v0.13.2
------------------------------
*February 24, 2020*

### Changed
- Unneeded dependencies removed (as in root monorepo dependencies or not used)


v0.13.1
------------------------------
*January 22, 2020*

### Changed
- Refactor JSDoc to conform to syntax rules
- Refactor `getLocale` function to reduce complexity
- Refactor `addEvent` function to reduce complexity

### Added
- `DEFAULT_LOCALE` variable for appropriate fallback rules


v0.13.0
------------------------------
*November 8, 2019*

### Changed
- Making sure that necessary 3rd party dependencies are bundled as part of the package


v0.12.0
------------------------------
*November 8, 2019*

### Changed
- Switched over to rollup for bundling as webpack was giving strange results when importing as a library


v0.11.0
------------------------------
*October 4, 2019*

### Added
- `window-or-global` package for SSR issue`


v0.10.0
------------------------------
*October 2, 2019*

### Added
- Tests for new services that have been added

### Changed
- `webpack.config.js` and packages for a better build
- Name of the export in the `index.js` to `sharedServices` for consistency


v0.9.0
------------------------------
*October 1, 2019*

### Added
- `lodash-es` throttle for the `addEvent` service


v0.8.0
------------------------------
*September 30, 2019*

### Added
- `getWindowWidth` method for returning the current width of the window
- `getWindowHeight` method for returning the current height of the window
- `addEvent` method for listening to a given event and applying a given function at a given time
- `removeEvent` method for clearing the listener for a given event and function


v0.7.0
------------------------------
*September 27, 2019*

### Removed
- `transformLocale` as it is not needed any more


v0.6.0
------------------------------
*September 26, 2019*

### Changed
- Webpack config to add babel polyfill


v0.5.0
------------------------------
*September 26, 2019*

### Added
- `transformLocale` method for changing the case format of the locale


v0.4.0
------------------------------
*September 25, 2019*

### Added
- String manipulation on locale in `getLocale` method


v0.3.0
------------------------------
*September 24, 2019*

### Added
- Added fallback for other method in shared service


v0.2.0
------------------------------
*September 24, 2019*

### Added
- Fallback for locale in shared logic


v0.1.0
------------------------------
*September 24, 2019*

### Added
- Created service package for shared logic
- Tests for the methods inside
