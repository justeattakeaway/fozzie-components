# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v2.0.0-beta-8
------------------------------
*September 20, 2019*

### Changed
 - Props in `Navigation.vue`

### Added
 - New logic to return URL for login and logout
 - Added new computed function to get `userInfo`
 - Axios for GET request


v2.0.0-beta-7
------------------------------
*September 18, 2019*

### Changed
 - `babel.config.js` to use `@babel/plugin-proposal-optional-chaining`

### Removed
 - Old calls to scoped methods


v2.0.0-beta-6
------------------------------
*September 18, 2019*

### Changed
 - Added tests for the navigation component
 - Added new snapshot


v2.0.0-beta-5
------------------------------
*September 18, 2019*

### Changed
 - Add a logic to hide "Deliver with Just Eat" link from mobile screen size
 - DeliveryEnquiry gtm label changed to be 'click_courier_signup'

### Removed
- Cleaned up unused css styles


v2.0.0-beta-4
------------------------------
*September 16, 2019*

### Added
- Styles for the header component
- Some ml css variable overrides
- User email rendering for mobile view


v2.0.0-beta-3
------------------------------
*September 13, 2019*

### Added
- Navigation component
- `f-trak` attributes to the links

### Changed
- Resource files updated with the navigation links
- `@justeat/f-vue-icons` package updated to contain latest header icons


v2.0.0-beta-2
------------------------------
*September 10, 2019*

 ### Added
- SkipToMain component

### Changed
- Made `is-transparent` property to be not required with default `false` value


v2.0.0-beta-1
------------------------------
*September 5, 2019*

### Added
- Logo component
- Tenants resource files
- Vue.config.js for rewriting default vue cli webpack config
- common.scss base styles imports
- theme and locale logic for Header component (later will be moved to independant package because it repeats in footer and searchbox already)


v2.0.0-beta-0
------------------------------
*September 4, 2019*

### Added
- Initial setup of f-header vue component
