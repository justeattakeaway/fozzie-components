# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v4.3.0
------------------------------
*December 1, 2020*

### Changed
- 'jet' theme instead of 'je'
- Added prop to allow skip link to be disabled.


v4.2.0
------------------------------
*October 26, 2020*

### Changed
- Don't fetch user details when showUserInfo prop is false.
- Use `axiosServices` from `f-services` instead of axios.
- Use latest `f-vue-icons`.

### Added
- Stylelint added to lint styling on build.


v4.1.0
------------------------------
*September 28, 2020*

### Added
- Property to show/hide the Help link.

### Changed
- Hamburger icon. Hide it if there are no visible links to be shown.
- Storybook property from free text to boolean for "Show login/user info".


v4.0.0
------------------------------
*September 14, 2020*

### Changed
- Moving header components out of `beta` state as now released.


v3.9.0
------------------------------
*September 14, 2020*

### Changed
- Directory of component UI test specs


v4.0.0-beta.1
------------------------------
*August 28, 2020*

### Changed
- Rebase latest master onto beta release.


v4.0.0-beta.0
------------------------------
*August 27, 2020*

### Changed
- Uses `JustEatBasis` font and new fozzie font size declarations.


v3.8.0
------------------------------
*September 1, 2020*

### Added
- WebDriverIO component tests


v3.7.0
------------------------------
*August 26, 2020*

### Added
- Added new prop on header & navigation to allow hiding of login / user icon in navigation.


v3.6.0
------------------------------
*August 19, 2020*

### Changed
- Changed folder structure for test utils.


v3.5.0
------------------------------
*July 23, 2020*

### Changed
- Updating logo colour to orange and new colour changes for Rebrand phase 3.1
- Changing `data-theme` to `data-theme-header` to avoid clashing with any other components in the future.
- Vue CLI minor package updates.


v3.4.1
------------------------------
*July 16, 2020*

### Changed
- Updating `f-vue-icons` version and some dependency updates.


v3.4.0
------------------------------
*July 14, 2020*

### Changed
- Fix `f-header` regression with api response for user details.
- Added `?testuser` Demo mocks.
- Updated README.md with Demo mock details.


v3.3.0
------------------------------
*July 9, 2020*

### Changed
- Updated `f-vue-icons` version.
- Made `f-trak` peer dependency use a range value.

### Removed
- Unused `lodash-es` dependency.
- `lodash-es` ignore from jest config.


v3.2.0
------------------------------
*July 2, 2020*

### Added
- Accessibility add-on to Storybook story.


v3.1.0
------------------------------
*July 2, 2020*

### Changed
- Updated logo and header background highlight colour to red to enable phased rollout of JET theme.
- Changed logic for the header background & logo logic, as there was a bug when the navigation was in highlight mode and was open.
- Updated theme to add Menulog orange branding in for the logo.


v3.0.0
------------------------------
*June 25, 2020*

### Changed
- Updated component to new orange JET theme for all tenants.
- Demo component updated to reflect same structure im other packages.
- Minor package updates.


v2.6.0
------------------------------
*June 9, 2020*

### Changed
- Updated Menulog header to switch to white logo when using transparent background header theme.


v2.5.0
------------------------------
*June 8, 2020*

### Changed
- New Menulog JET updates (logo and colours).
- Structure of Storybook stories changed to CSF (Component Story Format) – the new recommended way to write stories.
- ESLint autofix turned off (so that tests don't pass due to `--fix` being applied, but then publish subsequently fails)


v2.4.0
------------------------------
*May 12, 2020*

### Fixed
- Have added proper mocking for API data via `axios`. Quite a few of the tests were trying to call API endpoints and were passing without actually testing anything (but passed giving the impression they were). Have fixed this now so that these tests all work as expected with proper mocks.
- Fixed some tests that broke when upgrading to the latest `vue-test-utils`.

### Changed
- Updated some of the methods that handle API calls to return as promises, so that they are easier to unit test.
- Updating `vue-test-utils` to v1 and `@vue/cli-plugin-unit-test` to v4.3.1.
- Use `node current` in unit test Babel config, so that it supports `async > await` properly.

### Removed
- `testMatch` from jest config, as not needed.


v2.3.0
------------------------------
*May 6, 2020*

### Fixed
- Add `userInfo` back to data so that it can be updated after the AJAX call is performed.
- Watch the value of `userInfoProp` so that when it changes the `userInfo` data property is also updated.
- Ran lint fix task.


v2.2.1
------------------------------
*May 1, 2020*

### Changed
- exports in `f-header.page.js` to CommonJS syntax


v2.2.0
------------------------------
*April 29, 2020*

### Added
- `page-objects` folder for use with our WebDriverIO tests within the Nuxt app

### Changed
- Made f-header `userInfo` data more generic


v2.1.1
------------------------------
*April 20, 2020*

### Added
- `stories` folder that will contain `*.stories.js` files for use with Storybook

### Changed
- Updated name of component in `index.js` from `Header` > `VueHeader` (as `Header` is a reserved word according to linting rules)



v2.1.0
------------------------------
*March 11, 2020*

### Changed
- Case of "For you" navigation copy to match original designs.

### Removed
- Temporary feature toggle for the "For you" copy change.


v2.0.2
------------------------------
*March 3, 2020*

### Changed
- Run `yarn` on prepublish
- `jest` config updates. `moduleNameMapper` removed, `jsx` removed from checks (as we don't use) and `transformIgnorePatterns` updated.


v2.0.1
------------------------------
*February 19, 2020*

### Added
- `@justeat/browserslist-config-fozzie` added to `peerDependencies`

### Changed
- Separated out `lint` and `lint:fix` into two tasks (so CircleCI build can run lint task without fixing)


v2.0.0
------------------------------
*February 13, 2020*

### Added
- Styles for displaying red header without gradient
- Prop to render red header

### Changed
- **Breaking Change**: `isTransparent` Prop deprecated for `headerBackgroundTheme`. `headerBackgroundTheme` accepts `red` `transparent` and `white`(default) as properties.
- Moving `f-header` Vue component to be `v2.0.0`.
  If we need to update the old `f-header` package, those changes can be released on the legacy `v1.x.x` release branch via the [legacy `f-header` repo](https://github.com/justeat/f-header).


v2.0.0-beta.39
------------------------------
*February 12, 2020*

### Changed
- Add temporary feature flag to 'For You' updates


v2.0.0-beta.38
------------------------------
*February 12, 2020*

### Changed
- Change offers copy to 'For You'
- Change offers icon to gift


v2.0.0-beta.37
------------------------------
*Feb 11, 2020*

### Changed
- Saved cards' URL to avoid an unnecessary redirect.


v2.0.0-beta.36
------------------------------
*February 5, 2020*

### Removed
- `created` hook call and replaced show and hide with css helpers.


v2.0.0-beta.35
------------------------------
*February 4, 2020*

### Changed
- Moved `resize` method to be called within created hook.


v2.0.0-beta.34
------------------------------
*January 17, 2020*

### Changed
- Use `data-trak` instead of `data-gtm`.


v2.0.0-beta.33
------------------------------
*January 16, 2020*

### Added
- `data-gtm` attributes for the Offers inbox icons

### Removed
- `data-trak` attributes for the Offers inbox icons
- Now-defunct copy


v2.0.0-beta.32
------------------------------
*December 3, 2019*

### Added
- Link to offers page
- Translations for Offers page link


v2.0.0-beta.31
------------------------------
*December 3, 2019*

### Fixed
- DOM inconsistency caused by SSR issue when trying to calculate screen width on server
- Opaque header when tabbing out of nav with narrow viewport


v2.0.0-beta.30
------------------------------
*November 15, 2019*

### Changed
- Set homepage as fallback return URL


v2.0.0-beta.29
------------------------------
*November 14, 2019*

### Changed
- Encode current path for `returnUrl` rather than route name


v2.0.0-beta.28
------------------------------
*November 11, 2019*

### Fixed
- Set correct class on navToggle


v2.0.0-beta.27
------------------------------
*November 8, 2019*

### Changed
- Tenant urls for login and logout
- `returnUrl` method


v2.0.0-beta.26
------------------------------
*November 8, 2019*

### Changed
- `f-services` and other small package updates

### Fixed
- `yarn demo` error in babel config fixed so that `core-js` dependencies use entry paths


v2.0.0-beta.25
------------------------------
*November 7, 2019*

### Removed
- Typography include from styles, as not needed


v2.0.0-beta.24
------------------------------
*October 24, 2019*

### Changed
 - Copy on `NO` and `DK`


v2.0.0-beta.23
------------------------------
*October 21, 2019*

### Changed
 - CSS to fix mobile scrolling.


v2.0.0-beta.22
------------------------------
*October 18, 2019*

### Added
 - Pointer events rule to header gradient so that links displayed underneath the gradient are able to be clicked.
 - New styles to the `.c-nav-toggle` class.


v2.0.0-beta-21
------------------------------
*October 10, 2019*

### Changed
 - The way data is passed around in the order count logic

### Added
 - Tests for order count logic


v2.0.0-beta-20
------------------------------
*October 9, 2019*

### Changed
 - Prop default and value for `errorLog`


v2.0.0-beta-19
------------------------------
*October 8, 2019*

### Changed
 - New version of `getWindowHeight` to `getWindowWidth`
 - Italian tenant that was wrong


v2.0.0-beta-18
------------------------------
*October 7, 2019*

### Added
 - New version of `f-services`


v2.0.0-beta-17
------------------------------
*October 3, 2019*

### Added
 - New version of `f-services`


v2.0.0-beta-16
------------------------------
*October 1, 2019*

### Added
 - New methods added for getting and setting local storage with order count `setAnalyticsBlob` and `getLocalAnalyticsBlob`
 - New method added for saving the users data `saveUserData`
 - New method added for pushing the user data to the windows data layer `pushUserData`
 - New method for fetching the order count through GET request `fetchOrderCountAndSave`
 - new method for updating the order count `enrichUserDataWithCount`

 ### Removed
 - Methods and added them to `f-services`


v2.0.0-beta-15
------------------------------
*September 27, 2019*

### Changed
 - Reference to `$i18n` localization library
 - Added prop for `userInfoUrl`


v2.0.0-beta-14
------------------------------
*September 26, 2019*

### Changed
 - Updated version of `f-services`


v2.0.0-beta-13
------------------------------
*September 26, 2019*

### Changed
 - Condition against data in `getUserInfo`


v2.0.0-beta-12
------------------------------
*September 25, 2019*

### Changed
 - Import for `f-services` package instead of calling file on the root
 - Updated version of `f-services`


v2.0.0-beta-11
------------------------------
*September 25, 2019*

### Added
- `no-js` css for mobile hamburger menu

### Changed
- Styling for mobile open menu state header when transparent


v2.0.0-beta-10
------------------------------
*September 20, 2019*

### Changed
- Name of method from `setUserDetails` to `fetchUserInfo`

### Added
- New prop for `userInfo` coming from outside the component
- Logic to call the data if prop is `false`


v2.0.0-beta-9
------------------------------
*September 20, 2019*

### Changed
 - Props in `Navigation.vue`

### Added
 - New logic to return URL for login and logout
 - Added new computed function to get `userInfo`
 - Axios for GET request


v2.0.0-beta-8
------------------------------
*September 20, 2019*

### Added
 - Added some accessibility improvements to the navigation component


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
