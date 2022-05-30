# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v0.21.0
------------------------------
*April 27, 2022*

### Fixed
- Incorrect url when changing password.

### Added
- Test to cover url change.

v0.21.2
------------------------------
*May 3, 2022*

### Changed
- Added temp logging to record if auth expired or not


v0.21.1
------------------------------
*May 3, 2022*

### Added
- Component test to cover urls.


v0.21.0
------------------------------
*April 27, 2022*

### Fixed
- Incorrect url when changing password.

### Added
- Test to cover url change.


v0.20.1
------------------------------
*March 17, 2022*

### Added
- Chrome & Visual tests to cover the additional f-alert states.


v0.20.0
------------------------------
*March 16, 2022*

### Added
- Alerts for failed and successful saving.


v0.19.0
------------------------------
*March 15, 2022*

### Changed
- Wired up the Template save action to the Vuex store save method


v0.18.0
------------------------------
*March 4, 2022*

### Added
- Added Save method to vuex store


v0.17.0
------------------------------
*March 3, 2022*

### Added
- Method to API provider for updating the consumer details/address data


v0.16.1
------------------------------
*January 27, 2022*

### Updated
- Converted Storybook Knobs to Controls
- Added Visual/Chrome tests for 'fail to load' scenario


v0.16.0
------------------------------
*January 27, 2022*

### Updated
- `component` and `visual` tests to take in functions from `f-wdio-utils` package.
- visual tests to dynamically change device type


v0.15.0
------------------------------
*January 18, 2022*

### Changed
-  Minor design updates


v0.14.4
------------------------------
*January 18, 2022*

### Added
-  Exposed test methods wait & isdisplayed for error card


v0.14.3
------------------------------
*January 17, 2022*

### Added
-  Expose the data test id for the error card


v0.14.2
------------------------------
*January 17, 2022*

### Added
-  `src/services` and `src/constants.js` to `dist` in package.json


v0.14.1
------------------------------
*January 13, 2022*

### Added
- Visual tests
- component tests in `f-account-info.component.spec`
- test ids in `DeleteAccount.vue` and `EmailAddressField.vue`
- `vuelidate` and `f-services` package in `package.json`

### Changed
- component test ids in `AccountInfo.vue`
- test filenames from `accountInfo` to `account-info`


v0.14.0
------------------------------
*December 17, 2021*

### Added
- Analytics requirements when form is submitted.


v0.13.0
------------------------------
*December 16, 2021*

### Added
- Error handling and error card using `f-card-with-content`
- `info` and `error` logs to preferences fetch and save requests


v0.12.0
------------------------------
*December 15, 2021*

### Added
- Storybook Story with mocked data for details and addresses


v0.11.0
------------------------------
*December 10, 2021*

### Changed
- Wired up the Vuex Store `editConsumerDetails` action to the Template


v0.10.0
------------------------------
*December 10, 2021*

### Added
- `hasFormUpdate` checks to avoid submitting the form when the data hasn't changed.
- Tests to cover method `editConsumerDetails`.


v0.9.0
------------------------------
*December 08, 2021*

### Changed
- Wired up the new Vuex Store that exposes the State `consumer` to the Template plus wired up the load action


v0.8.0
------------------------------
*December 06, 2021*

### Added
- Vuex store - get, map & store consumer details/address data


v0.7.0
------------------------------
*December 02, 2021*

### Added
- Method to API provider for getting consumer address data


v0.6.0
------------------------------
*December 01, 2021*

### Added
- Validation rules for fields

### Changed
- Used correct URL's for links
- Extracted sections unrelated to main form


v0.5.0
------------------------------
*November 29, 2021*

### Added
- Api provider for getting consumer details data.


v0.4.0
------------------------------
*November 25, 2021*

### Added
- Send stop f-spinner event for the parent component
- Expose new isAuthFinished `required` property

### Changed
- Initialise Page based on isAuthFinished


v0.3.0
------------------------------
*November 23, 2021*

### Added
- Protected the submit button whilst saving data with a is enabled flag


v0.2.0
------------------------------
*November 19, 2021*

### Added
- Initial UI elements - similar to design
- Initial en-GB translation messages


v0.1.0
------------------------------
*November 18, 2021*

### Added
- New page component output by the generator
