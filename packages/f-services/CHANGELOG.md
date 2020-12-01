# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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
