# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v1.18.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14
- `maxBundleSize` from 20 to 21kB

## v1.17.0

_July 25, 2022_

### Added

- Node 16 support.

## v1.16.1

_June 15, 2022_

### Removed

- Removed vite as a dependency and moved to monorepo root `package.json`

## v1.16.0

_May 13, 2022_

### Added

- Irish phone number validations

## v1.15.0

_May 11, 2022_

### Added

- Irish postcode validations

## v1.14.0

_February 21, 2022_

### Added

- Italian postcode and phone validations

## v1.13.0

_August 26, 2021_

### Changed

- Postcode validations for GB to be in line with ConsumerWeb

## v1.12.0

_August 18, 2021_

### Added

- Postcode validations for AUS/NZ

## v1.11.0

_May 5, 2021_

### Changed

- Reverted the Tel. no. regex for en-GB back to v1.9.0.

## v1.10.0

_April 27, 2021_

### Changed

- Tel. no. regex for en-GB.

### Added

- Tel. no. regex for en-AU and en-NZ.

## v1.9.0

_March 24, 2021_

### Changed

- `createCamelCaseClient` function passes `transformResponse` directly instead of via a `config` object.
- `createClient` & `createCamelCaseClient` both scoop up all remaining arguments via a rest parameter allowing us to pass any additional config as you would normally to `axios.create`.

## v1.8.0

_March 23, 2021_

### Changed

- `package.json` main value to `umd.min`.
- Update axios version for security advisory.
- Replaced rollup with vite.
- Replace vue-cli commands for linting and testing with calls to eslint and jest directly.
- Update npm dependencies.

## v1.7.0

_December 7, 2020_

### Added

- `es-ES` validations to postcode and phone validations.

### Changed

- `isValidPostcode` to accept locale.

## v1.6.0

_December 1, 2020_

### Added

- `getDeepObjectByPath` to `utilities.js` to traverse an object using a given path.

### Changed

- `getFormValidationState` function to return the full path of a nested object.

## v1.5.0

_November 25, 2020_

### Added

- Phone Number validation method.

## v1.4.0

_November 9, 2020_

### Added

- Postcode and form validation methods inside new validation service.

## v1.3.0

_October 5, 2020_

### Added

- `headerTransform` option to create client functions.

## v1.2.1

_September 8, 2020_

### Changed

- `axios` peer dependency uses a range value.

## v1.2.0

_September 2, 2020_

### Changed

- Handle missing navigator API so that the default axios timeout is returned when used on the server.

## v1.1.0

_August 26, 2020_

### Added

- Request/response interceptors to add response times to response object.
- `axios-mock-adapter` to help with testing.

### Changed

- Vue CLI minor package updates.
- `@vue/cli-plugin-unit-test` to v4.3.1.
- ESLint autofix turned off (so that tests don't pass due to `--fix` being applied, but then publish subsequently fails)

## v1.0.1

_May 6, 2020_

### Changed

- Syntax in `index.js` so that newer versions of f-services are compatible with Storybook

## v1.0.0

_April 1, 2020_

### Added

- Axios services module.
- Axios as a peer dependency.

### Changed

- Split central "shared" module into separate "window" and "globalisation" modules.
- `jest` config updates. `moduleNameMapper` removed, `jsx` removed from checks (as we don't use) and `transformIgnorePatterns` updated.
- Rollup package updates.

### Fixed

- `addEvent` returns the function that was assigned to the event listener so that this can be passed in to `removeEvent`. This is necessary for removing throttled event listeners.

## v0.13.2

_February 24, 2020_

### Changed

- Unneeded dependencies removed (as in root monorepo dependencies or not used)

## v0.13.1

_January 22, 2020_

### Changed

- Refactor JSDoc to conform to syntax rules
- Refactor `getLocale` function to reduce complexity
- Refactor `addEvent` function to reduce complexity

### Added

- `DEFAULT_LOCALE` variable for appropriate fallback rules

## v0.13.0

_November 8, 2019_

### Changed

- Making sure that necessary 3rd party dependencies are bundled as part of the package

## v0.12.0

_November 8, 2019_

### Changed

- Switched over to rollup for bundling as webpack was giving strange results when importing as a library

## v0.11.0

_October 4, 2019_

### Added

- `window-or-global` package for SSR issue`

## v0.10.0

_October 2, 2019_

### Added

- Tests for new services that have been added

### Changed

- `webpack.config.js` and packages for a better build
- Name of the export in the `index.js` to `sharedServices` for consistency

## v0.9.0

_October 1, 2019_

### Added

- `lodash-es` throttle for the `addEvent` service

## v0.8.0

_September 30, 2019_

### Added

- `getWindowWidth` method for returning the current width of the window
- `getWindowHeight` method for returning the current height of the window
- `addEvent` method for listening to a given event and applying a given function at a given time
- `removeEvent` method for clearing the listener for a given event and function

## v0.7.0

_September 27, 2019_

### Removed

- `transformLocale` as it is not needed any more

## v0.6.0

_September 26, 2019_

### Changed

- Webpack config to add babel polyfill

## v0.5.0

_September 26, 2019_

### Added

- `transformLocale` method for changing the case format of the locale

## v0.4.0

_September 25, 2019_

### Added

- String manipulation on locale in `getLocale` method

## v0.3.0

_September 24, 2019_

### Added

- Added fallback for other method in shared service

## v0.2.0

_September 24, 2019_

### Added

- Fallback for locale in shared logic

## v0.1.0

_September 24, 2019_

### Added

- Created service package for shared logic
- Tests for the methods inside
