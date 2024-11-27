# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v1.9.0

_November 27, 2024_

### Changed

- Send `Accept-Tenant` header for `ConsumerAPI` requests

## v1.8.1


_April 29, 2024_

### Changed

- Bump `@vue/cli-plugin-babel` from v5.0.0 to v5.0.8


## v1.8.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14
- `@vue/cli-plugin-babel` to 5.0.0 to resolve snyk vulnerability
- `maxBundleSize` from 50 to 55kB

## v1.7.0

_November 7, 2022_

### Removed

- Bespoke Conversation ID handling (now handled by f-http as of v1.0.0)

## v1.6.0

_November 2, 2022_

### Changed

- Added fozzie components as externals in Webpack config.

## v1.5.0

_August 22, 2022_

### Changed

- Updating `f-alert` peerDep to `v6.x`

### Removed

- `vuex` peerDependency, as we don't need to directly specify this as Nuxt depends on Vuex (and causes `UNMET PEER DEPENDENCY` warnings that are false positives).

## v1.4.0

_July 27, 2022_

### Added

- Node 16 compatible dependencies.

## v1.3.0

_July 25, 2022_

### Added

- Node 16 support.

## v1.2.0

_July 19, 2022_

### Added

- Peer dependencies for all fozzie components.
- `required` attribute to required fields but disable default HTML5 form validation.

## v1.1.0

_July 13, 2022_

### Changed

- Update f-wdio-utils to v1.1.0 to use new Axe Core implementation.
- Accessibility tests to be async.

## v1.0.0

_July 6, 2022_

### Changed

- **Breaking change:** Update to `@use` and `@forward` SASS syntax.
- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v0.28.1

_June 23, 2022_

### Changed

- Update `f-alert` to v5.0.1.
- Switched alert messages to use v-show so that screen readers can detect them.

## v0.28.0

_June 22, 2022_

### Changed

- Update `f-link` to v3.1.1.

## v0.27.0

_June 14, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

## v0.26.0

_June 14, 2022_

### Added

- `autocomplete="on"` to form fields.

## v0.25.0

_June 14, 2022_

### Changed

- Dynamically determine returnUrl for the change password link using $route

## v0.24.0

_June 13, 2022_

### Changed

- Version of f-form-field (enables asterisks automatically on required fields)

### Removed

- Manual use of asterisks in `en-GB.js`

## v0.23.0

_May 31, 2022_

### Removed

- Debug code

### Changed

- Used external redirection instead of internal for 403 errors

## v0.22.0

_May 24, 2022_

### Removed

- Temp logging to record if auth expired or not

### Added

- Prop for 'login path' which is now used for 403 responses when getting data.

## v0.21.2

_May 3, 2022_

### Changed

- Added temp logging to record if auth expired or not

## v0.21.1

_May 3, 2022_

### Added

- Component test to cover urls.

## v0.21.0

_April 27, 2022_

### Fixed

- Incorrect url when changing password.

### Added

- Test to cover url change.

## v0.20.1

_March 17, 2022_

### Added

- Chrome & Visual tests to cover the additional f-alert states.

## v0.20.0

_March 16, 2022_

### Added

- Alerts for failed and successful saving.

## v0.19.0

_March 15, 2022_

### Changed

- Wired up the Template save action to the Vuex store save method

## v0.18.0

_March 4, 2022_

### Added

- Added Save method to vuex store

## v0.17.0

_March 3, 2022_

### Added

- Method to API provider for updating the consumer details/address data

## v0.16.1

_January 27, 2022_

### Updated

- Converted Storybook Knobs to Controls
- Added Visual/Chrome tests for 'fail to load' scenario

## v0.16.0

_January 27, 2022_

### Updated

- `component` and `visual` tests to take in functions from `f-wdio-utils` package.
- visual tests to dynamically change device type

## v0.15.0

_January 18, 2022_

### Changed

- Minor design updates

## v0.14.4

_January 18, 2022_

### Added

- Exposed test methods wait & isdisplayed for error card

## v0.14.3

_January 17, 2022_

### Added

- Expose the data test id for the error card

## v0.14.2

_January 17, 2022_

### Added

- `src/services` and `src/constants.js` to `dist` in package.json

## v0.14.1

_January 13, 2022_

### Added

- Visual tests
- component tests in `f-account-info.component.spec`
- test ids in `DeleteAccount.vue` and `EmailAddressField.vue`
- `vuelidate` and `f-services` package in `package.json`

### Changed

- component test ids in `AccountInfo.vue`
- test filenames from `accountInfo` to `account-info`

## v0.14.0

_December 17, 2021_

### Added

- Analytics requirements when form is submitted.

## v0.13.0

_December 16, 2021_

### Added

- Error handling and error card using `f-card-with-content`
- `info` and `error` logs to preferences fetch and save requests

## v0.12.0

_December 15, 2021_

### Added

- Storybook Story with mocked data for details and addresses

## v0.11.0

_December 10, 2021_

### Changed

- Wired up the Vuex Store `editConsumerDetails` action to the Template

## v0.10.0

_December 10, 2021_

### Added

- `hasFormUpdate` checks to avoid submitting the form when the data hasn't changed.
- Tests to cover method `editConsumerDetails`.

## v0.9.0

_December 8, 2021_

### Changed

- Wired up the new Vuex Store that exposes the State `consumer` to the Template plus wired up the load action

## v0.8.0

_December 6, 2021_

### Added

- Vuex store - get, map & store consumer details/address data

## v0.7.0

_December 2, 2021_

### Added

- Method to API provider for getting consumer address data

## v0.6.0

_December 1, 2021_

### Added

- Validation rules for fields

### Changed

- Used correct URL's for links
- Extracted sections unrelated to main form

## v0.5.0

_November 29, 2021_

### Added

- Api provider for getting consumer details data.

## v0.4.0

_November 25, 2021_

### Added

- Send stop f-spinner event for the parent component
- Expose new isAuthFinished `required` property

### Changed

- Initialise Page based on isAuthFinished

## v0.3.0

_November 23, 2021_

### Added

- Protected the submit button whilst saving data with a is enabled flag

## v0.2.0

_November 19, 2021_

### Added

- Initial UI elements - similar to design
- Initial en-GB translation messages

## v0.1.0

_November 18, 2021_

### Added

- New page component output by the generator
