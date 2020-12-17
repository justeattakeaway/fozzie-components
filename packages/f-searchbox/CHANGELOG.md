# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

Latest (to be added to next release)
------------------------------
*December 15, 2020*

### Fixed
- Google test from failing silently in CI.


Latest (to be added to next release)
------------------------------
*December 14, 2020*

### Added
- Tests to helper.js.

### Changed
- Test helper directory `tests` > `testHelpers`.


v4.0.0-beta.12
------------------------------
*December 11, 2020*

### Added
- Tests for `FormSearchInnerFieldWrapper.vue`.
- Tests for `Form.vue` changes.
- Tenant `options` directory to allow individual tenants to specify further options.
- Store actions added:
  - `setFullAddressSearchConfigs` - Allow multiple configs values to be passed down at set.
  - `setAutoCompleteAvailability` - Sets Autocomplete availability for both Loqate & Google Places.
- Store Mutations added:
  -`SET_FULL_ADDRESS_SEARCH_CONFIGS`
  - `SET_AUTO_COMPLETE_AVAILABILITY`
- `getCookie` & `safeParseJson` to be used for detecting and turning on Loqate.
- `demo` related setup back in.

### Fixed
- `streetNumberRequired` changed to `isStreetNumberRequired`.


v4.0.0-beta.11
------------------------------
*December 10, 2020*

### Changed
- Moved justeat packages to the dev dependencies
- Updated f-button component to the latest (0.4.1)


v4.0.0-beta.10
------------------------------
*December 10, 2020*

### Added
- Readme improvements to the follow:
  - Events table.
  - Props table.

### Fixed
- Street number overlay issue when address is too long.
- Geo location icon postion when street number is visible.


v4.0.0-beta.9
------------------------------
*December 8, 2020*

### Added
- Cookie support for when `setCookies` is enabled via the consuming app.
- Test coverage for changes.

v4.0.0-beta.8
------------------------------
*December 4, 2020*

### Added
- Base line $emit events for consuming apps to listen to
    - `@address-search-focus`
    - `@submit-saved-address`
    - `@track-postcode-changed`
    - `@submit-valid-address`
    - `@searchbox-error`
- event-types folder to hold events specific constants.
- Tests to cover changes to events.


v4.0.0-beta.7
------------------------------
*December 3, 2020*

### Added
- Geo icons svg colour.
- `copyOverride` prop to allow copy changes.
- Further tenant specific tests.
- Allow keyboard selection.

### Fixed
- Allow selection of pre-populated address when submit is hit.

### Changed
- Move `@justeat/browserslist-config-fozzie` to peerDependencies


v4.0.0-beta.6
------------------------------
*December 1, 2020*

### Removed
- Optional chaining syntax (Breaks storybook).


v4.0.0-beta.5
------------------------------
*December 1, 2020*

### Added
- Geo location feature plus components, `FormSearchGeo.vue`.
- Tenant tests.
- css/scss to `moduleNameMapper` in `jest.config.js`

### Changed
- Renamed street & geo location component to `FormSearchInnerFieldsWrapper.vue`.

### Fixed
- IE config missing validation properties.
- General tidy up of values being passed around.


v4.0.0-beta.4
------------------------------
*November 25, 2020*

### Added

- demo.js & index.html to serve up local instance of the component.

### Removed

- Demo.vue in favour of demo.js & index.html

### Fixed

- Vuex store mappings in form component, now using `mapState` & `mapActions`.


v4.0.0-beta.3
------------------------------
*November 20, 2020*

### Added

- Some accessibility improvements to google places, suggestion dropdown now reads out to the user & result items are `button` elements.
- Tests to cover changes.
- `copy` per tenant.
- `service` config per tenant.
- `debounce` to `address` watch.
- `mutation.types.js` for use within the store.
- `searchbox.module` updated to handle `setSuggestions` call.
- Switched out search button for `f-button` component.
- `FormSearchSuggestions.vue` to display results from API


v4.0.0-beta.2
------------------------------
*November 13, 2020*

### Added
- Baseline for UK logic (without Events at the moment).
- Tests to cover changes.
- Searchbox with/without shell comfigs.
- Vuex (Needs work).
- `shouldsetCookies`
- `onSubmit`
- `shouldAutoPopulateAddress`
- `isShellHidden`
- `shouldClearAddressOnValidSubmit`
- Allow previous postcode (saved in cookie) to proceed.

### Changed
- Extracted out form specific components into their own component directory & ported over styles into those directories.


v4.0.0-beta.1
------------------------------
*October 30, 2020*

### Added
- Base components: Shell, No Shell & form.
- Styles carried over from current f-searchbox.
- Base config setup to allow `config` to be passed through to searchbox.

### Changed
- f-vue-icons > 1.8.0


Latest (to be added to next release)
------------------------------
*October 23, 2020*

### Added
- Stylelint added to lint styling on build.


v4.0.0-beta.0
------------------------------
*October 16, 2020*

### Added
- Initial generated component setup.

------------------------------
*BETA RELEASE FOR PORTING F-SEARCHBOX
TO FOZZIE-COMPONENTS*
------------------------------

v3.0.3
------------------------------
*October 12, 2020*

### Fixed
- Move address check comparison further into `searchFullAddressLocation` logic.


v3.0.2
------------------------------
*October 8, 2020*

### Added
- Feature flag check on form submission.


v3.0.1
------------------------------
*October 7, 2020*

### Fixed
- Form submission when pre-populated address is used.


v3.0.0
------------------------------
*September 25, 2020*

### Added
- Moving typography changes out of beta.


v2.5.3
------------------------------
*October 2, 2020*

### Fixed
- Address values not populating local storage correctly on second pass.

### Changed
- Move submitting behaviour for full address out into it's own method.

### Added
- Test to cover refactor and old implementation.


v2.5.2
------------------------------
*September 25, 2020*

### Fixed
- Prevent Pre-populated address behind modal from submitting when enter/go is hit.

### Added
- Tests to support form submission (submit handler) behaviour within `form.test.js`


v2.5.1
------------------------------
*September 18, 2020*

### Fixed
- Pass in full address details to save to local storage.

### Added
- Test.

v2.5.0
------------------------------
*September 17, 2020*

### Changed
- Selection of a final full address navigates to SERP directly.

### Added
- Feature toggle to enable navigation.
- Tests.


v2.4.0
------------------------------
*September 11, 2020*

### Fixed
- Android Gboard awaiting suggestion to be selected before showing suggestions.


v2.3.0
------------------------------
*September 11, 2020*

### Changed
- Emit two new events: `TRACK_POSTCODE_CHANGED` and `TRACK_ADDRESS_CHANGED`
- Allow Visual Studio Code debugging


v2.2.0
------------------------------
*September 10, 2020*

### Fixed
- Remove `setLocationCookies` from en-IE config so that Google places info can be saved correctly.


v3.0.0-beta.0
------------------------------
*September 8, 2020*

### Added
- Updating searchbox to use latest typography (`JustEatBasis`).


v2.1.0
------------------------------
*September 8, 2020*

### Added
- Loading spinner when requesting address results from API.

v2.0.1
------------------------------
*September 2, 2020*

### Changed
- Nothing, version 2.0.0 won't publish as it says it already exists when it doesn't.


v2.0.0
------------------------------
*September 2, 2020*

Consuming apps will now need to include `axios` as a `dependency`. This change avoids bundling axios up in the final build and instead requires the consuming app to
list it as a dependency.

### Added
- Axios as a `peerDependency`.

### Changed
- Switch fetch for axios.

### Fixed
- Unit tests so they pass with the new changes.
- IE11 text alignment.
- IE11 Clear button alignment.


v1.52.0
------------------------------
*August 24, 2020*

### Changed
- Moved `Vue` and `promise-polyfill` to `devDependencies` as they are only used at build time.


v1.51.0
------------------------------
*August 21, 2020*

### Changed
- `getFullAddressDetails` mixin method so it returns custom `field1` & `field2` values. Mapped to lat & long.
- `getFullAddressDetails` loqate service adds `Field1Format` & `Field1Format` config values.


v1.49.3
------------------------------
*August 21, 2020*

### Fixed
- IE11 out of stack issue (Vue cli dep version bump).


v1.49.2
------------------------------
*August 20, 2020*

### Fixed
- Add window type check to search history service.


v1.49.1
------------------------------
*August 20, 2020*

### Fixed
- Add window check back in.


v1.49.0
------------------------------
*August 19, 2020*

### Changed
- Updated search button content alignment.


v1.48.0
------------------------------
*August 14, 2020*

### Added
- Search history feature to surface the data saved in searchHistoryService in the dropdown.
- Feature flags (hard coded to false) to enable this feature, and to include the history in search results.


v1.47.3
------------------------------
*August 18, 2020*

### Changed
- Use web-core context to use shared access tokens


v1.47.2
------------------------------
*August 14, 2020*

### Fixed
- Bug with full address picker on mobile. Now populates the localStorage object correctly.


v1.47.1
------------------------------
*August 14, 2020*

### Added
- `query` to payload when using full address search.


v1.47.0
------------------------------
*August 14, 2020*

### Changed
- Initialise `autoPopulateAddress` & `clearAddressOnValidSubmit` config properties with default values.


v1.46.1
------------------------------
*August 12, 2020*

### Changed
- Limit files in the npm bundle to the `dist` directory (like we do with the other Fozzie packages).


v1.46.0
------------------------------
*August 12, 2020*

### Added
- `autoPopulateAddress` config property which allows for the form to be displayed with no address populated when set to false.
- `clearAddressOnValidSubmit` config property which clears the address on a valid form submit.
- Unit tests to cover the new config properties.

### Changed
- General tidy up and lint fixes in the form unit test module.
- Remove curly braces from the `getLastLocation` util function.


v1.45.1
------------------------------
*August 11, 2020*

### Added
- Tests to prove searchHistoryService always returns an array even when no history exists.
- JSDoc comments on all searchHistoryService methods.

### Changed
- Made searchHistoryService a proper class accepting the localStorage object as a constructor param. This was to improve test stability.


v1.45.0
------------------------------
*August 11, 2020*

### Fixed
-  Wrapped window.localStorage calls in conditional to protect IE11 from null reference.


v1.44.2
------------------------------
*August 7, 2020*

### Fixed
-  Results from flickering when returning updated results from the users input.


v1.44.1
------------------------------
*August 6, 2020*

### Changed
- Limit results to GB.


v1.44.0
------------------------------
*July 31, 2020*

### Fixed
- Small screens displaying old results when attempting a second search. (Beta Feedback)
- Vue warning regarding directly modifying a prop value, instead emitting to parent with value.

### Changed
- Character limit to return results after 2 values. (Beta Feedback)
- Small screens to display a full screen results overlay.
- Loqate limit call increased from default (10) to 20 results, the default at the moment causes a lack of results if only 3 characters
have been entered. (10 consists of a mixture of address & postcode results, we filter out Address results so we can end up with only 2 results)

### Added
- Unit tests for modified updates to `fullAddressFinder`.
- Drop shadow to the searchbox when scrolling past the first result in the list.


v1.43.2
------------------------------
*July 29, 2020*

### Removed
- Logic that was duplicated.

### Added
- All address lines to saved history state.


v1.43.1
------------------------------
*July 29, 2020*

### Changed
- All address lines now included when populating searchbox.
- Tests to support changes.


v1.43.0
------------------------------
*July 24, 2020*

### Changed
- Updated `fozzie` and `fozzie-colour-palette` versions.


v1.42.1
------------------------------
*July 23, 2020*

### Fixed
- Scrolling issue when navigation via keyboard up/down arrows.


v1.42.0
------------------------------
*July 23, 2020*

### Fixed
- GA event not being listened to correctly.
- Improvements in the way the results are displayed once resolved, no more flashing.
- Improved the way we resolve final address selection.

### Added
- Tests to cover changes.
- Missing (AAA) comments in tests.
- Truncating address lines as requested by UX.

### Removed
- `getMatchedAddress` tests.
- Address count.


v1.41.2
------------------------------
*July 21, 2020*

### Fixed
- Flicker between selecting a postcode & address inherited from current behaviour.
- Clear suggestion list when the user selects all and deletes via keyboard.


v1.41.1
------------------------------
*July 20, 2020*

### Fixed
- "Continue with suggestion"  component background color style in firefox not displaying correctly.
- Suggestions from displaying empty when focusing in the input field (Firefox bug).
- Keyboard selection of first item when going back from the last item in the list.
- Setting address only once promise resolves.

### Removed
- Removed debounce calls.
- Border from "Continue with suggestion".

v1.41.0
------------------------------
*July 17, 2020*

### Added
- Validation when the address is brought from the cookie.


v1.40.0
------------------------------
*July 14, 2020*

### Added
- Keyboard navigation to address list.
- Tests.


v1.39.2
------------------------------
*July 16, 2020*

### Fixed
- Cleared full address suggestions when input box changes to prevent confusing interactions


v1.39.1
------------------------------
*July 14, 2020*

### Fixed
- Duplicate IDs in Loqate response no longer result in doubled address in input box.


v1.39.0
------------------------------
*July 13, 2020*

### Added
- Added an extra condition to the en-GB tenant full address search. This allows us to control the behaviour on a per page basis.


v1.38.0
------------------------------
*July 13, 2020*

### Added
- Company name to address line 1 if available.
- Tests.


v1.37.0
------------------------------
*July 10, 2020*

### Added
- Prevent default when full address is submitted to allow `postForm` to handle the submit.


v1.36.0
------------------------------
*July 08, 2020*

### Added
- Introduces service for interacting with a history of searches.

### Fixed
- Fix for saving text only submission during full address search.
- Fix for broken localStorage address format.


v1.35.1
------------------------------
*July 09, 2020*

### Fixed
- SERP postcode not being submitted. Using `postForm` with params `url=search/do` & `location=postcode`.


v1.35.0
------------------------------
*July 08, 2020*

### Fixed
- Postcode not being submitted to SERP correctly.
- UI/UX tweaks and some minor style changes.
- Full address modal z-index so it appears correctly on the homepage.

### Added
- Full width class modifier `c-search-inputWrapper--fullWidth` for use when `isFullAddressSearchAvailable` is `true`.


v1.34.0
------------------------------
*July 02, 2020*

### Added
- Fallback to valid postcode if no search results are returned.
- Tests to cover changes.


v1.33.0
------------------------------
*July 2, 2020*

### Added
- TRACK_CLICK_MATCHING_POSTCODE_FROM_SUGGESTIONS
- TRACK_CLICK_ADDRESS_FROM_SUGGESTIONS
- TRACK_CLICK_ADDRESS_INPUTTED_MANUALLY
- tracking events


v1.32.0
------------------------------
*June 30, 2020*

### Removed
- Couple of missed AUZ theme styling now removed.


v1.31.0
------------------------------
*June 29, 2020*

### Added
- Saving full address to local storage.
- Tests.


v1.30.0
------------------------------
*June 26, 2020*

### Changed
- Updated theme to new JET colours and removed Menulog specific colour switches.


v1.29.1
------------------------------
*June 26, 2020*

### Fixed
- Number input field.


v1.29.0
------------------------------
*June 22, 2020*

### Fixed
- Postcode not performing a search submit.


v1.28.0
------------------------------
*June 18, 2020*

### Added
- Clear address button to input field.
- Test coverage.

### Fixed
- Fixed powered by google image.


v1.27.0
------------------------------
*June 17, 2020*

### Added
- Tests to cover changes.
- Emit `continue-with-suggestion` events up to parent to allow users to continue with a suggested address.
- `display-full-address-details` event to `event-types.js`.
- Ability to allow users to select street level results.

### Changed
- `en-gb.js` `POSTCODE_INVALID` to allow full address capture.
- `getFormattedSelectedAddress` to return a correct address based on array length.

### Fixed
- Tests so they pass with the new changes.


v1.26.0
------------------------------
*June 12, 2020*

### Added
- The focus state back to the triggering element.
- Filtering out address `type` from initial search results.
- Box shadow style to continue with address component.
- Tests to cover changes.

v1.25.1
------------------------------
*June 11, 2020*

### Changed
- Nothing, package did not build properly (no dist directory) when publishing via NPM.

v1.25.0
------------------------------
*June 11, 2020*

### Added
- `onStreetLevelAddressSelected` & `getMatchedAreaAddressResults` methods to `form.vue`.
- `FullAddressContinueWithSuggestion.vue` to display a suggested (selected) address to continue with.
- `onStreetLevelAddressSelected` & `getMatchedAreaAddressResults` methods to `FullAddressFinder.vue`.
- `SELECTED_STREET_LEVEL_ADDRESS` to `event-types.js`.
- `onAddressSelection` to `src/service/location/loqate/index.js`.
- `fullAddressSearchSuggestions` object to translations file.
- `getMatchedAreaAddressResults` & `onStreetLevelAddressSelected` tests added to `form.test.js`.
- `getFormattedSelectedAddress` tests added to `fullAddressContinueWithSuggestion.test.js`.
- `getUsersFullAddressSearch` & `onAddressSelection` tests added to `loqate/index.test.js`

### Changed
- `FullAddressSuggestions.vue` to display street level addresses if available.
- `fullAddressSearch.mixin.js` to check for `hasSelectedStreetLevelAddress` to avoid API call at street level results.

v1.24.0
------------------------------
*June 10, 2020*

### Changed
- Removed support for a cookie based Google locations switch in IE config, as we now support only google locations in IE
- Updated the tests, removing the ones we were running for postcode search
- Removed resetGooglePlacesSetting event support from Vue.js form

v1.23.0
------------------------------
*June 05, 2020*

### Fixes
- Fixes issue with colours being overridden in base JE theme.


v1.22.0
------------------------------
*June 03, 2020*

### Added
- `icon-location.svg`
- `fullAddressSearch.mixin` to retrieve loqate address in two places.
- `FullAddressSuggestions.vue` to display results
- `Tests` to cover some changes.


v1.21.0
------------------------------
*June 4, 2020*

### Changed
- Button colours and text following the new branding for JET.

v1.20.0
------------------------------
*May 29, 2020*

### Added
- Event type `full-address-search-closed` to handle closing pop-up.
- `isFullAddressSearchEnabled` option to en-GB tenant.
- Tests to cover new methods.
- `FullAddressFinder.vue` component.

v1.19.1
------------------------------
*May 6, 2020*

### Changed
- Cropping the placeholder text at one line (with ellipsis) to prevent ugly overwrap on small screens/long placeholders

v1.19.0
------------------------------
*April 21, 2020*

### Changed
- Default autocomplete backend for IE (now Google Places)

v1.18.0
------------------------------
*April 16, 2020*

### Added
- "Powered by Google" logo
- Tests for the logo above
- Demo page to easily test the component locally
- Capability to include inline images

### Changed
- Updated dependencies
- Updated how we mount find child components in existing tests


v1.17.3
------------------------------
*April 3, 2020*

### Changed
- Updated placeholder in Ireland (when Google Places enabled)

v1.17.2
------------------------------
*April 1, 2020*

### Changed
- Fixed issue caused by setting formUrl property in IE config (when Google Places enabled)
- Fixed last address format


v1.17.1
------------------------------
*March 23, 2020*

### Changed
- Fixed Google Places cookie switch in Ireland when SSR is used


v1.17.0
------------------------------
*March 17, 2020*

### Changed
- Make Google Places in Ireland controlled by cookie


v1.16.0
------------------------------
*March 9, 2020*

### Changed
- Computed check for theme to get correct geo icon


v1.15.0
------------------------------
*February 27, 2020*

### Changed
- New styling for `c-search-btn-icon` so that it's vertically centred


v1.14.0
------------------------------
*February 24, 2020*

### Added
- Refactor `c-search-btn--roundedCorners` to `c-search-btn--compressed`, new styling


v1.13.0
------------------------------
*February 21, 2020*

### Added
- Class for menulog geo icon


v1.12.0
------------------------------
*February 19, 2020*

### Added
- `.editorconfig` added
- `CODEOWNERS` added

### Changed
- Update to use vue-cli `v4` (for `vue-cli` packages except `@vue/cli-plugin-babel`, as that will need additional config updates)
- Minor updates to a whole load of other packages
- Small formatting update to `Base.vue` due to update to `@vue/cli-service`

### Removed
- `resolutions` entry for `espree` package as no longer needed.


v1.11.0
------------------------------
*February 17, 2020*

### Added
- New prop for changing the form styling to remove borders on label and round corners on button


v1.10.0
------------------------------
*February 11, 2020*

### Added
- New prop for toggling the icon for menulog


v1.9.0
------------------------------
*February 4, 2020*

### Added
- CircleCI config updated to include running unit tests and basic DangerJS PR checks (`package.json` and `CHANGELOG` updates)


v1.8.0
------------------------------
*February 3, 2020*

### Added
- CircleCI config for PR checks


v1.7.4
------------------------------
*January 15, 2020*

### Removed
- `encodeURIComponent` to the `setCookie` method to fix issues in menuweb cookies


v1.7.3
------------------------------
*January 28, 2020*

### Changed
- Update README with `queryString` config functionality and add format and an example


v1.7.2
------------------------------
*January 17, 2020*

### Changed
- `encodeURIComponent` to encode the individual variables `value` and `name`


v1.7.1
------------------------------
*January 16, 2020*

### Fixed
- Valid postcodes were being marked as errors (due to a change in v1.4.9). Rolling this change back.


v1.7.0
------------------------------
*January 15, 2020*

### Added
- `encodeURIComponent` to the `setCookie` method to fix issues in menuweb cookies


v1.6.0
------------------------------
*January 15, 2020*

### Changed
- Renamed `formatAddress` method to `updateAddress`.
- Use standard event paramteers in `updateAddress` rather than magic `$event` in the template.
- `updateAddress` method also resets house number so that changes to the search text allow the number to also be updated.
- Make address suggestions visible if the form is dirty.


v1.5.0
------------------------------
*January 13, 2020*

### Changed
- Updated formatting of components to make the code easier to scan.

### Fixed
- Error message class applied correctly.
- ESLint issue.


v1.4.12
------------------------------
*January 3, 2020*

### Added
- Searchbox component allows promise for google api loading to be passed as parameter


v1.4.11
------------------------------
*December 19, 2019*

### Fixed
- _All_ jest tests now pass again
- `formUrl` absence prevents submission to invalid URL where query string parameters are present - [#134](https://github.com/justeat/f-searchbox/issues/134).
- `vue-jest` pinned to [this version](https://github.com/vuejs/vue-jest/commit/01e0710c5d8497b89e4f6360bcfe643b24c7b126)
   to fix problems with absolute path resolution for scss dependencies when running tests on Windows.


v1.4.10
------------------------------
*December 16, 2019*

### Changed
- Updated copy for Ireland


v1.4.9
------------------------------
*November 27, 2019*

### Fixed
- Removes errors when you search an invalid address multiple times


v1.4.8
------------------------------
*October 11, 2019*

### Fixed
- Ensures that promise rejection from dbLocator is caught, to prevent errors in test suites of consumers


v1.4.7
------------------------------
*June 26, 2019*

### Fixed
- Fixed issue maps not loaded on slow connections - [#127](https://github.com/justeat/f-searchbox/issues/127).


v1.4.6
------------------------------
*September 24, 2019*

### Added
- Added tests for release v1.4.5.


v1.4.5
------------------------------
*September 23, 2019*

### Fixed
- Fixed issue when you select an address that requires streetNumber it flicker between address input and streetNumber input.


v1.4.4
------------------------------
*September 18, 2019*

### Changed
- Fixing `je-location` cookie not being normalised, eg: `ec4M 7rF` to `EC4M7RF`.


v1.4.3
------------------------------
*September 18, 2019*

### Changed
- Republish due to issues with previous build


v1.4.0
------------------------------
*September 17, 2019*

### Added
- Add default location cookies based on the locale if `config.setCookies` is `true`
- Added the ability to pass `icon-submit` named slot to when using vue component.


v1.3.0
------------------------------
*September 10, 2019*

### Added
- Added the ability to pass through a querystring object that will, if provided, append to the `params.formUrl`


v1.2.7
------------------------------
*September 3, 2019*

### Changed
- Only retrieve fields that are used on the call to `services.places.getDetails`


v1.2.6
------------------------------
*August 21, 2019*

### Changed
- Debounce search suggestions


v1.2.5
------------------------------
*July 23, 2019*

### Changed
- Swap `fieldLabel` and `fieldPlaceholder` translations to reflect their usage
- Update translations to make the `aria-label`s more descriptive
- Shorten Italian placeholder to prevent overlapping
- Use fozzie variables in `form.scss`


v1.2.4
------------------------------
*June 26, 2019*

### Fixed
- Issue setting cuisine param from config settings


v1.2.3
------------------------------
*June 26, 2019*

### Fixed
- Issue with the searchbox breaking out of its container at small screen widths


v1.2.2
------------------------------
*June 21, 2019*

### Fixed
- Resolve an issue loading the searchbox in SSR due to usage of the window object for Canada.


v1.2.1
------------------------------
*June 20, 2019*

### Changed
- Updated docs inline with the configuration changes made from the beta branch updates.


v1.2.0
------------------------------
*June 18, 2019*

### Added
- Imports for fozzie variables, mixins and colours so that they can be used in the styling.  This is using the `node-sass-magic-importer` (Eyeglass was producing some strange results with the CSS output, so using this module for now)

### Changed
- Updated the colours to use the `fozzie-colour-palette`
- Updated breakpoints to pull from the fozzie breakpoint map using `@include media`
- Updating minor package dependencies

### Fixed
- Bug on Edge/Firefox at narrow widths where the button was too wide and breaking off the screen. Have now changed this so that the SVG search icon is visible until 600px width.


v1.1.0
------------------------------
*June 14, 2019*

### Added
- Support for a new tenant, Canada - English (ca-EN).
- This tenant locates the user geographically, stores that location in IndexedDB and then redirects the user to the SERP page.


v1.0.0
------------------------------
*June 11, 2019*

Quite a comprehensive update to the component, moving all the work that was in beta over to the master branch. See below for details on all the updates:

### Added
- SSR support
- Design of component updated slightly in line with global homepage designs
- Component can be consumed via `import` as a regular component via NPM. This is packaged via `vue-cli`. The component is also still available as a standalone script include
- Added functions for emitting analytics events
- Babel config updated so that the component still works in IE11

### Changed
- Locale configs handled by the component, with the locale passed in as a `prop`. Config can still be extended with the options detailed in the docs
- `@justeat/eslint-config-fozzie` config added to component
- Tests added and updated for new setup
- Menulog theming changed slightly. Now done via data-attribute on component that the SCSS hooks onto

### Fixed
- Couple of small accessibility issues fixed


v0.27.1
------------------------------
*May 31, 2019*

### Fixed
- Geolocation navigator check on client window object to enable SSR


v0.27.0
------------------------------
*May 17, 2019*

### Added
- Required fields for AU/NZ config
- Tests around AU/NZ search capabilities

### Fixed
- Snapshots updated from previous release

### Removed
- Base Swiss distribution as it's been superseded by Swiss language variants


v0.26.2
------------------------------
*April 16, 2019*

### Fixed
- Lighthouse issues fixed by ARIA labels in button and input field


v0.26.1
------------------------------
*April 3, 2019*

### Fixed
- Removed CSRF meta check for France tenant


v0.26.0
------------------------------
*April 2, 2019*

### Added
- Query field parameter introduced
- Improved testing around component search methods

### Changed
- Swiss tenants use absolute urls for form posts
- Docs include example use of query field parameter


v0.25.0
------------------------------
*March 13, 2019*

### Added
- Swiss tenant with French language support
- Swiss tenant with German language support

### Fixed
- ESlint errors in test utils
- Readme links to docs


v0.24.2
------------------------------
*March 7, 2019*

### Added
- More robust tenant component testing


v0.24.1
------------------------------
*February 22, 2019*

### Added
- Post and header capabilities in request util

### Fixed
- Location save request for France tenant


v0.24.0
------------------------------
*February 22, 2019*

### Added
- Google Places calls now use session tokens, to reduce billing costs


v0.23.0
------------------------------
*February 19, 2019*

### Added
- French tenant
- `request` util with custom headers and tests
- `onSearch` callback for form submission
- `setCookie` util

### Changed
- Width of shell component
- SVG dimension attributes added to CSS
- Street number component width
- Readme split into sections
- Form error accepts HTML messages
- `serialize` util serialises deeply nested objects
- Font weight reduction on shell title/subtitle


v0.22.1
------------------------------
*February 7, 2019*

### Fixed
- Build with tenant distributions included


v0.22.0
------------------------------
*February 7, 2019*

### Added
- Switzerland tenant with last cookie using `je-preferred_zip` postcode
- Exportable Vue component

### Changed
- `Base.js` converted to Vue component

### Fixed
- Irish tenant posts form rather than running callback
- Australia/New Zealand location formatting
- Last address searches run from cookie location data, rather than address value

### Removed
- Form submit callback option


v0.21.0
------------------------------
*January 28, 2019*

### Added
- Display address suggestion in search box when selected
- Enforces numeric field limitations on address field
- Additional location properties to be consumed by location cookie
- Helper for fetching last location from cookie
- Formatting for the pre-populated search string per tenant

### Changed
- Slimmer base component for a lighter payload and faster initialisation
- Removes the callback fired on a successful autocomplete search, and replaces it with a post method to an endpoint configured for each tenant
- Fieldset wrapper around form input fields
- Moved postcode fetch from location into location factory

### Fixed
- Street number field positioning within the address field
- Directive for setting field attribute


v0.20.0
------------------------------
*January 11, 2019*

### Added
- Pre-search validation can now be configured per-tenant
- Added pre-search validation to Spain using the regex from live website


v0.19.1
------------------------------
*January 07, 2019*

### Fixed
- Added Aspira font to .btn Menulog theme


v0.19.0
------------------------------
*December 24, 2018*

### Added
- Street number field for autocomplete tenants
- Street number validation translations

### Fixed
- Issue where suggestion could be selected when no results were shown


v0.18.2
------------------------------
*December 17, 2018*

### Fixed
- Address fragments with periods are now converted to hyphens
- Selected suggestion appears as configured format


v0.18.1
------------------------------
*December 17, 2018*

### Fixed
- Promise support for Internet Explorer in distributions
- Applying button styling theme for IE11


v0.18.0
------------------------------
*December 17, 2018*

### Added
- Zipcode service integration used by Ireland tenant
- Location service factory to unify different location service apis
- Geo location tests
- Custom autocomplete field format
- Url formatter callback for autocomplete enabled tenants
- Request util

### Changed
- Main service component
- Ireland autocomplete using zipcode endpoint
- Mock formats JSON formats to JS

### Fixed
- Snapshots include geo markup


v0.17.0
------------------------------
*December 12, 2018*

### Added
- Dirty check: validation only begins after form submission attempt
- Address field override
- Cuisine field override
- Readme examples of test methods

### Changed
- Component without shell is centred on screen by default

### Fixed
- Styling consistency when component shell is removed
- Additional test scenarios on UK postcodes


v0.16.0
------------------------------
*December 11, 2018*

### Changed
- Base vue component now unifies all tenant configurations
- Tenants configurations sit within single file rather than three
- Build files now generated on webpack build


v0.15.0
------------------------------
*December 7, 2018*

### Added
- Themed components with vue themed directive
- Australia tenant
- New Zealand tenant
- Distribution demo file
- `submitForm` component config workaround for search callback fix

### Changed
- `select` event emitter to `submit` for clarity

### Fixed
- Suggestions not showing on search box


v0.14.1
------------------------------
*December 7, 2018*

### Fixed
- Callbacks not being fired on search submit


v0.14.0
------------------------------
*December 6, 2018*

### Added
- Core component separated into minor components
- Search box shell can be toggeled on/off with `hideShell` config parameter

### Changed
- SASS files moved into component files
- Denmark and Norway constants exported as other tenants are


v0.13.1
------------------------------
*December 5, 2018*

### Added
- Auto detect tenants in webpack config

### Fixed
- Irish build setting
- Updated tenant distributions


v0.13.0
------------------------------
*December 4, 2018*

### Changed
- Renamed component to @justeat/f-searchbox, so the NPM package will be published in the @justeat namespace


v0.12.0
------------------------------
*December 3, 2018*

### Added
- Irish tenant
- Additional test conditions for Spain, Norway & Denmark

### Changed
- Mocks export a javascript object, representing JSONP responses


v0.11.0
------------------------------
*December 3, 2018*

### Added
- Geolocation services
- Italy tenant
- Spanish tenant


v0.10.0
------------------------------
*December 3, 2018*

### Added
- Build configs for UK, DK, NO
- Uglify JS
- Distribution builds

### Changed
- async/await statements converted to promises

### Removed
- Demo files

v0.9.0
------------------------------
*November 22, 2018*

### Added
- Norwegian Tenant
- Danish Tenant
- UK tenant tests
- Jest snapshot resolver to colocate all snapshots
- Directive on component which allows element attributes to be declared
- Component select event overrides default post behaviour


v0.8.0
------------------------------
*November 20, 2018*

### Added
- Autocomplete on input field configurable based on location services availability
- Ignoring distribution folder until beta release
- More example documentation in Readme

### Changed
- Core service refactor, including invocation methods
- Better seperation of errors from copy using error codes


v0.7.0
------------------------------
*November 15, 2018*

### Added
- autosuggest component with keyboard support
- vue-sass-loader
- css modules support
- base style file


v0.6.0
------------------------------
*November 6, 2018*

### Added
- Vue Loader
- Vue Jest

### Changed
- Component file now Vue SFC


v0.5.0
------------------------------
*November 6, 2018*

### Added
- Google Maps API integration
- Google places autocomplete
- Service location details and search

### Changed
- Postcode field renamed to address field for multi-tenant compatibility
- mock file name to hyphen case
- README with autosuggest usage


v0.4.0
------------------------------
*October 29, 2018*

### Added
- Vue core component
- UK Vue component
- Demo folder
- Components distribution via webpack config
- vue-svg-loader

### Changed
- Localised constants file
- Readme with Vue component use

### Fixed
- jest and babel install issues
- eslint errors


v0.3.0
------------------------------
*October 25, 2018*

### Added
- ESLint loader
- Webpack alias resolver

### Removed
- babel-plugin-module-resolver
- babel-preset-es2015
- gulp file
- gulp-fozzie-build


v0.2.0
------------------------------
*October 19, 2018*

### Added
- Moved postcode regex to a constants directory.
- `Constants.test` added for supporting `constants` file.
- `yarn.lock` file.
- `.eslintrc` and `gulpfile.js`.
- linting rule to `scripts` config.
- `resolutions` object: `espree` within `package.json` to fix `ecmaFeatures` errors.

### Removed
- `package.lock` file.

v0.1.0
------------------------------
*October 11, 2018*

### Added
- UK tenant service
