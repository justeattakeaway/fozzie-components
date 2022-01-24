# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


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
