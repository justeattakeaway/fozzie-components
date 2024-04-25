# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v6.9.1

_April 25, 2024_

### Changed

- Update `axios` to latest v0 version.


## v6.9.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

## v4.0.0-beta.48

_March 27, 2023_

### Changed

- New focus styles
  - These require the new colour tokens from `pie-design-tokens` which are included in `fozzie` v11+.

## v4.0.0-beta.47

_November 1, 2022_

### Changed

- Product Orange update (package release to update the compiled CSS)

## v4.0.0-beta.46

_July 29, 2022_

### Added

- Node 16 compatible version of `@justeat/f-button`.
- Node 16 compatible version of `@justeat/f-error-message`.
- Node 16 compatible version of `@justeat/f-vue-icons`.
- Import css from dependencies.

## v4.0.0-beta.45

_July 26, 2022_

### Added

- Node 16 compatible dependencies

v4.0.0-beta.44

---

_July 19, 2022_

### Added

- Node 16 support.

## v4.0.0-beta.43

_July 5, 2022_

### Changed

- Update f-wdio-utils to v1.1.0
- Update component objects / specs to use ES6 syntax.

## v4.0.0-beta.42

_June 24, 2022_

### Changed

- Update to `@use` and `@forward` SASS syntax

## v4.0.0-beta.41

_June 23, 2022_

### Changed

- devDependency version range to match peerDependencies.

## v4.0.0-beta.40

_June 8, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

_May 26, 2022_

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

_February 4, 2022_

### Changed

- Upgraded to ESLint v8

## v4.0.0-beta.39

_February 2, 2022_

### Changed

- `f-button` version.

## v4.0.0-beta.38

_January 18, 2022_

### Added

- `"tag": "beta"` property to `package.json` to ensure the package is tagged correctly when publishing.

## v4.0.0-beta.37

_December 9, 2021_

### Added

- **Breaking Change**: Added `f-button`, `f-error-message` & `f-mega-modal` dependency to peer dependencies. Now `f-button`, `f-error-message` & `f-mega-modal` should be included as dependencies of the consuming component or application.

### Removed

- **Breaking Change**: Removed `f-button`, `f-error-message` & `f-mega-modal` styles import from the component. Make sure to import `f-button`, `f-error-message` & `f-mega-modal` styles in your application.

## v4.0.0-beta.36

_October 5, 2021_

### Changed

- Updated version of `f-button` and `f-mega-modal`.
  !Note: Because this component is not in prod yet, more changes for icing phase 2 will come later.

## v4.0.0-beta.35

_September 16, 2021_

### Changed

- Updated version of `f-button`, `f-error-message` and `f-mega-modal` to remove normalize styles from the build.

## v4.0.0-beta.34

_September 10, 2021_

### Changed

- Moved `clearAddressValue` later in `submit` function so that address values are not cleared before being set in the location cookie.
- Moved `onCustomSubmit` later in `submit` function so that the location cookie is set before consuming applications fire the `onSubmit` event.

## v4.0.0-beta.33

_September 6, 2021_

### Changed

- Updated version of `f-mega-modal` (JETSans Update)

## v4.0.0-beta.32

_September 1, 2021_

### Changed

- Updated version of `f-button` (JETSans Update)

## v4.0.0-beta.31

_July 14, 2021_

### Changed

- Updated version of `f-button` and buttonType changed to `ghost`.

## v4.0.0-beta.30

_May 26, 2021_

### Changed

- CSS variables to use pie design tokens instead of fozzie-colour-palette vars

## v4.0.0-beta.29

_May 6, 2021_

### Removed

- `is-visuallyHidden` css style definition as should come from `fozzie`

### Added

- Tagging for future Percy tests

## v4.0.0-beta.28

_March 31, 2021_

### Added

- Support for running tests on remote `Browserstack`.

### Changed

- Component test file structure to support `Browserstack`.

## v4.0.0-beta.27

_March 9, 2021_

### Added

- Locale switching to `searchbox` inside Storybook

### Changed

- Restructured component object into page object model
- Refactored component and accessibility tests

## v4.0.0-beta.26

_February 23, 2021_

### Changed

- `searchbox` Vuex namespace to `fSearchboxModule` to avoid clashes in consuming applications.

### Fixed

- Store / dispatch error in storybook.

## v4.0.0-beta.25

_February 11, 2021_

### Changed

- Form styles for bigger than narrow media query to include 414px.

## v4.0.0-beta.24

_February 8, 2021_

### Changed

- Full address keys saves as capitalisation.

## v4.0.0-beta.23

_February 4, 2021_

### Added

- Clear button to Loqate feature so addresses can be cleared.
- Refactor loading indicator component so it's shared.
- Added tests.

## v4.0.0-beta.22

_February 2, 2021_

### Added

- Ability to save full address to local storage.
- Ability to retrieve existing full address from local storage.
- Ability to remove full address from local storage when feature is turned off.
- Tests to cover changes.

## v4.0.0-beta.21

_January 28, 2021_

### Added

- Readme information on how to render f-searchbox in non-vue instances.
- Tests to cover changes.
- `FormFullAddressSearchModalOverlay.vue` - Allows small screens to display results in a modal (`f-mega-modal`).

### Fixed

- Casing in readme non-vue instructions.

## v4.0.0-beta.20

_January 22, 2021_

### Added

- Spinner loading indicator for Loqate.
- Ability to hide dropdown when final address is picked.

### Fixed

- Drop down flicker when setTimeout is used.

## v4.0.0-beta.19

_January 20, 2021_

### Changed

- `Address` so it comes from state instead of config.
- `created` hook to `beforeCreate` to resolve Vuex module registration issues with v-model.

### Removed

- `Address` reference from tenant config.

### Added

- Ability to set address via Vuex action `setAddress`.
- Tests to cover changes.
- `Loqate` - Allow user to continue with a suggested address.
- `Loqate` - Allow user to pick their address from street level results.

## v4.0.0-beta.18

_January 14, 2021_

### Fixed

- Keyboard selection event when Loqate is displaying results.
- Tests so they pass with changes.
- Flicker issue between suggestions drop down.

## v4.0.0-beta.17

_January 13, 2021_

### Added

- Ability to select postcode results, returns address results now.
- Tests to cover changes.
- Test IDs added so integration tests in build agent can run against DOM elements.
- Ability for users to continue with generic postcode & area `FormFullAddressContinueWithSuggestion.vue`.
- Copy to en-GB.js for Loqate specific translations.
- Vuex Mutations:
  - `SET_PARTIAL_ADDRESS_SUGGESTIONS`
  - `SET_CONTINUE_WITH_SUGGESTION`
  - `SET_SELECTED_STREET_LEVEL_ADDRESS_ID`
- Actions:
- `setContinueWithDetails`

### Changed

- Vuex Actions:
  - Modified: `getMatchedAreaAddressResults` so we can set the street ID correctly for the retrieval
    call (Retrieve: Returns the full address details based on the Id). Renamed some variables.
- Update axios version for security advisory

## v4.0.0-beta.16

_January 11, 2021_

### Added

- `hasMinimumAddressCriteria` check calls to Loqate happen when required.
- Tests to cover changes.

## v4.0.0-beta.15

_January 8, 2021_

### Fixed

- Accessibility warnings for street number input field & Powered by Google alt tag.

## v4.0.0-beta.14

_January 7, 2021_

### Added

- Loqate core functionality, initial Axios call & display of results.
- Tests to cover Loqate functionality.

## v4.0.0-beta.13

_January 5, 2021_

### Fixed

- DK & NO field options - provides component with custom attributes,
  supplied via tenant config `addressField`.
- DK & NO uses the `where` form value now.
- Google test from failing silently in CI.

### Added

- url-loader so we can inline the `powered by google` logo as a base64 URI.
- Tests to helper.js.

### Changed

- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.
- Test helper directory `tests` > `testHelpers`.

## v4.0.0-beta.12

_December 11, 2020_

### Added

- Tests for `FormSearchInnerFieldWrapper.vue`.
- Tests for `Form.vue` changes.
- Tenant `options` directory to allow individual tenants to specify further options.
- Store actions added:
  - `setFullAddressSearchConfigs` - Allow multiple configs values to be passed down at set.
  - `setAutoCompleteAvailability` - Sets Autocomplete availability for both Loqate & Google Places.
- Store Mutations added: -`SET_FULL_ADDRESS_SEARCH_CONFIGS`
  - `SET_AUTO_COMPLETE_AVAILABILITY`
- `getCookie` & `safeParseJson` to be used for detecting and turning on Loqate.
- `demo` related setup back in.

### Fixed

- `streetNumberRequired` changed to `isStreetNumberRequired`.

## v4.0.0-beta.11

_December 10, 2020_

### Changed

- Moved justeat packages to the dev dependencies
- Updated f-button component to the latest (0.4.1)

## v4.0.0-beta.10

_December 10, 2020_

### Added

- Readme improvements to the follow:
  - Events table.
  - Props table.

### Fixed

- Street number overlay issue when address is too long.
- Geo location icon postion when street number is visible.

## v4.0.0-beta.9

_December 8, 2020_

### Added

- Cookie support for when `setCookies` is enabled via the consuming app.
- Test coverage for changes.

## v4.0.0-beta.8

_December 4, 2020_

### Added

- Base line $emit events for consuming apps to listen to
  - `@address-search-focus`
  - `@submit-saved-address`
  - `@track-postcode-changed`
  - `@submit-valid-address`
  - `@searchbox-error`
- event-types folder to hold events specific constants.
- Tests to cover changes to events.

## v4.0.0-beta.7

_December 3, 2020_

### Added

- Geo icons svg colour.
- `copyOverride` prop to allow copy changes.
- Further tenant specific tests.
- Allow keyboard selection.

### Fixed

- Allow selection of pre-populated address when submit is hit.

### Changed

- Move `@justeat/browserslist-config-fozzie` to peerDependencies

## v4.0.0-beta.6

_December 1, 2020_

### Removed

- Optional chaining syntax (Breaks storybook).

## v4.0.0-beta.5

_December 1, 2020_

### Added

- Geo location feature plus components, `FormSearchGeo.vue`.
- Tenant tests.
- css/scss to `moduleNameMapper` in `jest.config.js`

### Changed

- Renamed street & geo location component to `FormSearchInnerFieldsWrapper.vue`.

### Fixed

- IE config missing validation properties.
- General tidy up of values being passed around.

## v4.0.0-beta.4

_November 25, 2020_

### Added

- demo.js & index.html to serve up local instance of the component.

### Removed

- Demo.vue in favour of demo.js & index.html

### Fixed

- Vuex store mappings in form component, now using `mapState` & `mapActions`.

## v4.0.0-beta.3

_November 20, 2020_

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

## v4.0.0-beta.2

_November 13, 2020_

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

## v4.0.0-beta.1

_October 30, 2020_

### Added

- Base components: Shell, No Shell & form.
- Styles carried over from current f-searchbox.
- Base config setup to allow `config` to be passed through to searchbox.

### Changed

- f-vue-icons > 1.8.0

## Latest (to be added to next release)

_October 23, 2020_

### Added

- Stylelint added to lint styling on build.

## v4.0.0-beta.0

_October 16, 2020_

### Added

- Initial generated component setup.

---

_BETA RELEASE FOR PORTING F-SEARCHBOX
TO FOZZIE-COMPONENTS_

---

## v3.0.3

_October 12, 2020_

### Fixed

- Move address check comparison further into `searchFullAddressLocation` logic.

## v3.0.2

_October 8, 2020_

### Added

- Feature flag check on form submission.

## v3.0.1

_October 7, 2020_

### Fixed

- Form submission when pre-populated address is used.

## v3.0.0

_September 25, 2020_

### Added

- Moving typography changes out of beta.

## v2.5.3

_October 2, 2020_

### Fixed

- Address values not populating local storage correctly on second pass.

### Changed

- Move submitting behaviour for full address out into it's own method.

### Added

- Test to cover refactor and old implementation.

## v2.5.2

_September 25, 2020_

### Fixed

- Prevent Pre-populated address behind modal from submitting when enter/go is hit.

### Added

- Tests to support form submission (submit handler) behaviour within `form.test.js`

## v2.5.1

_September 18, 2020_

### Fixed

- Pass in full address details to save to local storage.

### Added

- Test.

## v2.5.0

_September 17, 2020_

### Changed

- Selection of a final full address navigates to SERP directly.

### Added

- Feature toggle to enable navigation.
- Tests.

## v2.4.0

_September 11, 2020_

### Fixed

- Android Gboard awaiting suggestion to be selected before showing suggestions.

## v2.3.0

_September 11, 2020_

### Changed

- Emit two new events: `TRACK_POSTCODE_CHANGED` and `TRACK_ADDRESS_CHANGED`
- Allow Visual Studio Code debugging

## v2.2.0

_September 10, 2020_

### Fixed

- Remove `setLocationCookies` from en-IE config so that Google places info can be saved correctly.

## v3.0.0-beta.0

_September 8, 2020_

### Added

- Updating searchbox to use latest typography (`JustEatBasis`).

## v2.1.0

_September 8, 2020_

### Added

- Loading spinner when requesting address results from API.

## v2.0.1

_September 2, 2020_

### Changed

- Nothing, version 2.0.0 won't publish as it says it already exists when it doesn't.

## v2.0.0

_September 2, 2020_

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

## v1.52.0

_August 24, 2020_

### Changed

- Moved `Vue` and `promise-polyfill` to `devDependencies` as they are only used at build time.

## v1.51.0

_August 21, 2020_

### Changed

- `getFullAddressDetails` mixin method so it returns custom `field1` & `field2` values. Mapped to lat & long.
- `getFullAddressDetails` loqate service adds `Field1Format` & `Field1Format` config values.

## v1.49.3

_August 21, 2020_

### Fixed

- IE11 out of stack issue (Vue cli dep version bump).

## v1.49.2

_August 20, 2020_

### Fixed

- Add window type check to search history service.

## v1.49.1

_August 20, 2020_

### Fixed

- Add window check back in.

## v1.49.0

_August 19, 2020_

### Changed

- Updated search button content alignment.

## v1.48.0

_August 14, 2020_

### Added

- Search history feature to surface the data saved in searchHistoryService in the dropdown.
- Feature flags (hard coded to false) to enable this feature, and to include the history in search results.

## v1.47.3

_August 18, 2020_

### Changed

- Use web-core context to use shared access tokens

## v1.47.2

_August 14, 2020_

### Fixed

- Bug with full address picker on mobile. Now populates the localStorage object correctly.

## v1.47.1

_August 14, 2020_

### Added

- `query` to payload when using full address search.

## v1.47.0

_August 14, 2020_

### Changed

- Initialise `autoPopulateAddress` & `clearAddressOnValidSubmit` config properties with default values.

## v1.46.1

_August 12, 2020_

### Changed

- Limit files in the npm bundle to the `dist` directory (like we do with the other Fozzie packages).

## v1.46.0

_August 12, 2020_

### Added

- `autoPopulateAddress` config property which allows for the form to be displayed with no address populated when set to false.
- `clearAddressOnValidSubmit` config property which clears the address on a valid form submit.
- Unit tests to cover the new config properties.

### Changed

- General tidy up and lint fixes in the form unit test module.
- Remove curly braces from the `getLastLocation` util function.

## v1.45.1

_August 11, 2020_

### Added

- Tests to prove searchHistoryService always returns an array even when no history exists.
- JSDoc comments on all searchHistoryService methods.

### Changed

- Made searchHistoryService a proper class accepting the localStorage object as a constructor param. This was to improve test stability.

## v1.45.0

_August 11, 2020_

### Fixed

- Wrapped window.localStorage calls in conditional to protect IE11 from null reference.

## v1.44.2

_August 7, 2020_

### Fixed

- Results from flickering when returning updated results from the users input.

## v1.44.1

_August 6, 2020_

### Changed

- Limit results to GB.

## v1.44.0

_July 31, 2020_

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

## v1.43.2

_July 29, 2020_

### Removed

- Logic that was duplicated.

### Added

- All address lines to saved history state.

## v1.43.1

_July 29, 2020_

### Changed

- All address lines now included when populating searchbox.
- Tests to support changes.

## v1.43.0

_July 24, 2020_

### Changed

- Updated `fozzie` and `fozzie-colour-palette` versions.

## v1.42.1

_July 23, 2020_

### Fixed

- Scrolling issue when navigation via keyboard up/down arrows.

## v1.42.0

_July 23, 2020_

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

## v1.41.2

_July 21, 2020_

### Fixed

- Flicker between selecting a postcode & address inherited from current behaviour.
- Clear suggestion list when the user selects all and deletes via keyboard.

## v1.41.1

_July 20, 2020_

### Fixed

- "Continue with suggestion" component background color style in firefox not displaying correctly.
- Suggestions from displaying empty when focusing in the input field (Firefox bug).
- Keyboard selection of first item when going back from the last item in the list.
- Setting address only once promise resolves.

### Removed

- Removed debounce calls.
- Border from "Continue with suggestion".

## v1.41.0

_July 17, 2020_

### Added

- Validation when the address is brought from the cookie.

## v1.40.0

_July 14, 2020_

### Added

- Keyboard navigation to address list.
- Tests.

## v1.39.2

_July 16, 2020_

### Fixed

- Cleared full address suggestions when input box changes to prevent confusing interactions

## v1.39.1

_July 14, 2020_

### Fixed

- Duplicate IDs in Loqate response no longer result in doubled address in input box.

## v1.39.0

_July 13, 2020_

### Added

- Added an extra condition to the en-GB tenant full address search. This allows us to control the behaviour on a per page basis.

## v1.38.0

_July 13, 2020_

### Added

- Company name to address line 1 if available.
- Tests.

## v1.37.0

_July 10, 2020_

### Added

- Prevent default when full address is submitted to allow `postForm` to handle the submit.

## v1.36.0

_July 08, 2020_

### Added

- Introduces service for interacting with a history of searches.

### Fixed

- Fix for saving text only submission during full address search.
- Fix for broken localStorage address format.

## v1.35.1

_July 09, 2020_

### Fixed

- SERP postcode not being submitted. Using `postForm` with params `url=search/do` & `location=postcode`.

## v1.35.0

_July 08, 2020_

### Fixed

- Postcode not being submitted to SERP correctly.
- UI/UX tweaks and some minor style changes.
- Full address modal z-index so it appears correctly on the homepage.

### Added

- Full width class modifier `c-search-inputWrapper--fullWidth` for use when `isFullAddressSearchAvailable` is `true`.

## v1.34.0

_July 02, 2020_

### Added

- Fallback to valid postcode if no search results are returned.
- Tests to cover changes.

## v1.33.0

_July 2, 2020_

### Added

- TRACK_CLICK_MATCHING_POSTCODE_FROM_SUGGESTIONS
- TRACK_CLICK_ADDRESS_FROM_SUGGESTIONS
- TRACK_CLICK_ADDRESS_INPUTTED_MANUALLY
- tracking events

## v1.32.0

_June 30, 2020_

### Removed

- Couple of missed AUZ theme styling now removed.

## v1.31.0

_June 29, 2020_

### Added

- Saving full address to local storage.
- Tests.

## v1.30.0

_June 26, 2020_

### Changed

- Updated theme to new JET colours and removed Menulog specific colour switches.

## v1.29.1

_June 26, 2020_

### Fixed

- Number input field.

## v1.29.0

_June 22, 2020_

### Fixed

- Postcode not performing a search submit.

## v1.28.0

_June 18, 2020_

### Added

- Clear address button to input field.
- Test coverage.

### Fixed

- Fixed powered by google image.

## v1.27.0

_June 17, 2020_

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

## v1.26.0

_June 12, 2020_

### Added

- The focus state back to the triggering element.
- Filtering out address `type` from initial search results.
- Box shadow style to continue with address component.
- Tests to cover changes.

## v1.25.1

_June 11, 2020_

### Changed

- Nothing, package did not build properly (no dist directory) when publishing via NPM.

## v1.25.0

_June 11, 2020_

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

## v1.24.0

_June 10, 2020_

### Changed

- Removed support for a cookie based Google locations switch in IE config, as we now support only google locations in IE
- Updated the tests, removing the ones we were running for postcode search
- Removed resetGooglePlacesSetting event support from Vue.js form

## v1.23.0

_June 05, 2020_

### Fixes

- Fixes issue with colours being overridden in base JE theme.

## v1.22.0

_June 03, 2020_

### Added

- `icon-location.svg`
- `fullAddressSearch.mixin` to retrieve loqate address in two places.
- `FullAddressSuggestions.vue` to display results
- `Tests` to cover some changes.

## v1.21.0

_June 4, 2020_

### Changed

- Button colours and text following the new branding for JET.

## v1.20.0

_May 29, 2020_

### Added

- Event type `full-address-search-closed` to handle closing pop-up.
- `isFullAddressSearchEnabled` option to en-GB tenant.
- Tests to cover new methods.
- `FullAddressFinder.vue` component.

## v1.19.1

_May 6, 2020_

### Changed

- Cropping the placeholder text at one line (with ellipsis) to prevent ugly overwrap on small screens/long placeholders

## v1.19.0

_April 21, 2020_

### Changed

- Default autocomplete backend for IE (now Google Places)

## v1.18.0

_April 16, 2020_

### Added

- "Powered by Google" logo
- Tests for the logo above
- Demo page to easily test the component locally
- Capability to include inline images

### Changed

- Updated dependencies
- Updated how we mount find child components in existing tests

## v1.17.3

_April 3, 2020_

### Changed

- Updated placeholder in Ireland (when Google Places enabled)

## v1.17.2

_April 1, 2020_

### Changed

- Fixed issue caused by setting formUrl property in IE config (when Google Places enabled)
- Fixed last address format

## v1.17.1

_March 23, 2020_

### Changed

- Fixed Google Places cookie switch in Ireland when SSR is used

## v1.17.0

_March 17, 2020_

### Changed

- Make Google Places in Ireland controlled by cookie

## v1.16.0

_March 9, 2020_

### Changed

- Computed check for theme to get correct geo icon

## v1.15.0

_February 27, 2020_

### Changed

- New styling for `c-search-btn-icon` so that it's vertically centred

## v1.14.0

_February 24, 2020_

### Added

- Refactor `c-search-btn--roundedCorners` to `c-search-btn--compressed`, new styling

## v1.13.0

_February 21, 2020_

### Added

- Class for menulog geo icon

## v1.12.0

_February 19, 2020_

### Added

- `.editorconfig` added
- `CODEOWNERS` added

### Changed

- Update to use vue-cli `v4` (for `vue-cli` packages except `@vue/cli-plugin-babel`, as that will need additional config updates)
- Minor updates to a whole load of other packages
- Small formatting update to `Base.vue` due to update to `@vue/cli-service`

### Removed

- `resolutions` entry for `espree` package as no longer needed.

## v1.11.0

_February 17, 2020_

### Added

- New prop for changing the form styling to remove borders on label and round corners on button

## v1.10.0

_February 11, 2020_

### Added

- New prop for toggling the icon for menulog

## v1.9.0

_February 4, 2020_

### Added

- CircleCI config updated to include running unit tests and basic DangerJS PR checks (`package.json` and `CHANGELOG` updates)

## v1.8.0

_February 3, 2020_

### Added

- CircleCI config for PR checks

## v1.7.4

_January 15, 2020_

### Removed

- `encodeURIComponent` to the `setCookie` method to fix issues in menuweb cookies

## v1.7.3

_January 28, 2020_

### Changed

- Update README with `queryString` config functionality and add format and an example

## v1.7.2

_January 17, 2020_

### Changed

- `encodeURIComponent` to encode the individual variables `value` and `name`

## v1.7.1

_January 16, 2020_

### Fixed

- Valid postcodes were being marked as errors (due to a change in v1.4.9). Rolling this change back.

## v1.7.0

_January 15, 2020_

### Added

- `encodeURIComponent` to the `setCookie` method to fix issues in menuweb cookies

## v1.6.0

_January 15, 2020_

### Changed

- Renamed `formatAddress` method to `updateAddress`.
- Use standard event paramteers in `updateAddress` rather than magic `$event` in the template.
- `updateAddress` method also resets house number so that changes to the search text allow the number to also be updated.
- Make address suggestions visible if the form is dirty.

## v1.5.0

_January 13, 2020_

### Changed

- Updated formatting of components to make the code easier to scan.

### Fixed

- Error message class applied correctly.
- ESLint issue.

## v1.4.12

_January 3, 2020_

### Added

- Searchbox component allows promise for google api loading to be passed as parameter

## v1.4.11

_December 19, 2019_

### Fixed

- _All_ jest tests now pass again
- `formUrl` absence prevents submission to invalid URL where query string parameters are present - [#134](https://github.com/justeat/f-searchbox/issues/134).
- `vue-jest` pinned to [this version](https://github.com/vuejs/vue-jest/commit/01e0710c5d8497b89e4f6360bcfe643b24c7b126)
  to fix problems with absolute path resolution for scss dependencies when running tests on Windows.

## v1.4.10

_December 16, 2019_

### Changed

- Updated copy for Ireland

## v1.4.9

_November 27, 2019_

### Fixed

- Removes errors when you search an invalid address multiple times

## v1.4.8

_October 11, 2019_

### Fixed

- Ensures that promise rejection from dbLocator is caught, to prevent errors in test suites of consumers

## v1.4.7

_June 26, 2019_

### Fixed

- Fixed issue maps not loaded on slow connections - [#127](https://github.com/justeat/f-searchbox/issues/127).

## v1.4.6

_September 24, 2019_

### Added

- Added tests for release v1.4.5.

## v1.4.5

_September 23, 2019_

### Fixed

- Fixed issue when you select an address that requires streetNumber it flicker between address input and streetNumber input.

## v1.4.4

_September 18, 2019_

### Changed

- Fixing `je-location` cookie not being normalised, eg: `ec4M 7rF` to `EC4M7RF`.

## v1.4.3

_September 18, 2019_

### Changed

- Republish due to issues with previous build

## v1.4.0

_September 17, 2019_

### Added

- Add default location cookies based on the locale if `config.setCookies` is `true`
- Added the ability to pass `icon-submit` named slot to when using vue component.

## v1.3.0

_September 10, 2019_

### Added

- Added the ability to pass through a querystring object that will, if provided, append to the `params.formUrl`

## v1.2.7

_September 3, 2019_

### Changed

- Only retrieve fields that are used on the call to `services.places.getDetails`

## v1.2.6

_August 21, 2019_

### Changed

- Debounce search suggestions

## v1.2.5

_July 23, 2019_

### Changed

- Swap `fieldLabel` and `fieldPlaceholder` translations to reflect their usage
- Update translations to make the `aria-label`s more descriptive
- Shorten Italian placeholder to prevent overlapping
- Use fozzie variables in `form.scss`

## v1.2.4

_June 26, 2019_

### Fixed

- Issue setting cuisine param from config settings

## v1.2.3

_June 26, 2019_

### Fixed

- Issue with the searchbox breaking out of its container at small screen widths

## v1.2.2

_June 21, 2019_

### Fixed

- Resolve an issue loading the searchbox in SSR due to usage of the window object for Canada.

## v1.2.1

_June 20, 2019_

### Changed

- Updated docs inline with the configuration changes made from the beta branch updates.

## v1.2.0

_June 18, 2019_

### Added

- Imports for fozzie variables, mixins and colours so that they can be used in the styling. This is using the `node-sass-magic-importer` (Eyeglass was producing some strange results with the CSS output, so using this module for now)

### Changed

- Updated the colours to use the `fozzie-colour-palette`
- Updated breakpoints to pull from the fozzie breakpoint map using `@include media`
- Updating minor package dependencies

### Fixed

- Bug on Edge/Firefox at narrow widths where the button was too wide and breaking off the screen. Have now changed this so that the SVG search icon is visible until 600px width.

## v1.1.0

_June 14, 2019_

### Added

- Support for a new tenant, Canada - English (ca-EN).
- This tenant locates the user geographically, stores that location in IndexedDB and then redirects the user to the SERP page.

## v1.0.0

_June 11, 2019_

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

## v0.27.1

_May 31, 2019_

### Fixed

- Geolocation navigator check on client window object to enable SSR

## v0.27.0

_May 17, 2019_

### Added

- Required fields for AU/NZ config
- Tests around AU/NZ search capabilities

### Fixed

- Snapshots updated from previous release

### Removed

- Base Swiss distribution as it's been superseded by Swiss language variants

## v0.26.2

_April 16, 2019_

### Fixed

- Lighthouse issues fixed by ARIA labels in button and input field

## v0.26.1

_April 3, 2019_

### Fixed

- Removed CSRF meta check for France tenant

## v0.26.0

_April 2, 2019_

### Added

- Query field parameter introduced
- Improved testing around component search methods

### Changed

- Swiss tenants use absolute urls for form posts
- Docs include example use of query field parameter

## v0.25.0

_March 13, 2019_

### Added

- Swiss tenant with French language support
- Swiss tenant with German language support

### Fixed

- ESlint errors in test utils
- Readme links to docs

## v0.24.2

_March 7, 2019_

### Added

- More robust tenant component testing

## v0.24.1

_February 22, 2019_

### Added

- Post and header capabilities in request util

### Fixed

- Location save request for France tenant

## v0.24.0

_February 22, 2019_

### Added

- Google Places calls now use session tokens, to reduce billing costs

## v0.23.0

_February 19, 2019_

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

## v0.22.1

_February 7, 2019_

### Fixed

- Build with tenant distributions included

## v0.22.0

_February 7, 2019_

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

## v0.21.0

_January 28, 2019_

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

## v0.20.0

_January 11, 2019_

### Added

- Pre-search validation can now be configured per-tenant
- Added pre-search validation to Spain using the regex from live website

## v0.19.1

_January 07, 2019_

### Fixed

- Added Aspira font to .btn Menulog theme

## v0.19.0

_December 24, 2018_

### Added

- Street number field for autocomplete tenants
- Street number validation translations

### Fixed

- Issue where suggestion could be selected when no results were shown

## v0.18.2

_December 17, 2018_

### Fixed

- Address fragments with periods are now converted to hyphens
- Selected suggestion appears as configured format

## v0.18.1

_December 17, 2018_

### Fixed

- Promise support for Internet Explorer in distributions
- Applying button styling theme for IE11

## v0.18.0

_December 17, 2018_

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

## v0.17.0

_December 12, 2018_

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

## v0.16.0

_December 11, 2018_

### Changed

- Base vue component now unifies all tenant configurations
- Tenants configurations sit within single file rather than three
- Build files now generated on webpack build

## v0.15.0

_December 7, 2018_

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

## v0.14.1

_December 7, 2018_

### Fixed

- Callbacks not being fired on search submit

## v0.14.0

_December 6, 2018_

### Added

- Core component separated into minor components
- Search box shell can be toggeled on/off with `hideShell` config parameter

### Changed

- SASS files moved into component files
- Denmark and Norway constants exported as other tenants are

## v0.13.1

_December 5, 2018_

### Added

- Auto detect tenants in webpack config

### Fixed

- Irish build setting
- Updated tenant distributions

## v0.13.0

_December 4, 2018_

### Changed

- Renamed component to @justeat/f-searchbox, so the NPM package will be published in the @justeat namespace

## v0.12.0

_December 3, 2018_

### Added

- Irish tenant
- Additional test conditions for Spain, Norway & Denmark

### Changed

- Mocks export a javascript object, representing JSONP responses

## v0.11.0

_December 3, 2018_

### Added

- Geolocation services
- Italy tenant
- Spanish tenant

## v0.10.0

_December 3, 2018_

### Added

- Build configs for UK, DK, NO
- Uglify JS
- Distribution builds

### Changed

- async/await statements converted to promises

### Removed

- Demo files

## v0.9.0

_November 22, 2018_

### Added

- Norwegian Tenant
- Danish Tenant
- UK tenant tests
- Jest snapshot resolver to colocate all snapshots
- Directive on component which allows element attributes to be declared
- Component select event overrides default post behaviour

## v0.8.0

_November 20, 2018_

### Added

- Autocomplete on input field configurable based on location services availability
- Ignoring distribution folder until beta release
- More example documentation in Readme

### Changed

- Core service refactor, including invocation methods
- Better seperation of errors from copy using error codes

## v0.7.0

_November 15, 2018_

### Added

- autosuggest component with keyboard support
- vue-sass-loader
- css modules support
- base style file

## v0.6.0

_November 6, 2018_

### Added

- Vue Loader
- Vue Jest

### Changed

- Component file now Vue SFC

## v0.5.0

_November 6, 2018_

### Added

- Google Maps API integration
- Google places autocomplete
- Service location details and search

### Changed

- Postcode field renamed to address field for multi-tenant compatibility
- mock file name to hyphen case
- README with autosuggest usage

## v0.4.0

_October 29, 2018_

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

## v0.3.0

_October 25, 2018_

### Added

- ESLint loader
- Webpack alias resolver

### Removed

- babel-plugin-module-resolver
- babel-preset-es2015
- gulp file
- gulp-fozzie-build

## v0.2.0

_October 19, 2018_

### Added

- Moved postcode regex to a constants directory.
- `Constants.test` added for supporting `constants` file.
- `yarn.lock` file.
- `.eslintrc` and `gulpfile.js`.
- linting rule to `scripts` config.
- `resolutions` object: `espree` within `package.json` to fix `ecmaFeatures` errors.

### Removed

- `package.lock` file.

## v0.1.0

_October 11, 2018_

### Added

- UK tenant service
