# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v4.13.1

_April 26, 2024_

### Changed

- Update `axios` to latest version.
- Improve localStorage mocking in tests.


## v4.13.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14
- `@vue/cli-plugin-babel` to 5.0.0 to resolve snyk vulnerability
- `maxBundleSize` from 100 to 102kB

## v4.12.0

_February 5, 2024_

### Added

- Address alert to remind customers to check that their address is correctly entered.
- `showAddressAlert` prop to control the alert.
  - It will only be shown if the prop is `true`, the delivery form is shown and the translations are present (currently `en-GB` only).

## v4.11.0

_August 17, 2023_

### Changed

- Revert linting warning changes on the 4.9.1 version.

## v4.10.0

_July 25, 2023_

### Changed

- Added "no allergen" copy on the Split Notes Web UK.

## v4.9.1

_April 28, 2023_

### Fixed

- Linting warnings in test mock files.

## v4.9.0

_December 1, 2022_

### Added

- `crypto` setup file to handle `getRandomValues` within jest tests. This logical stems from `f-form-field`'s use of UUID.

## v4.8.0

_November 2, 2022_

### Changed

- Added fozzie components as externals in Webpack config.

## v4.7.0

_October 24, 2022_

### Added

- Get address from cookies logic
- Get geolocation from cookies logic
- Suburb field for address format in New Zealand
- New prop `shouldLoadAddressFromLocalStorage`

### Removed

- Get address from local storage logic in the handler of UPDATE_STATE mutation

## v4.6.1

_September 28, 2022_

### Added

- New props `getNoteConfigUrl` and `checkoutFeatures` to README

## v4.6.0

_August 25, 2022_

### Removed

- Geolocating functionality as it's causing issues and wasn't a 'must-have'.

### Fixed

- Geolocation API calls when location already exists.

## v4.5.1

_August 22, 2022_

### Fixed

- Formatting of terms and conditions translations.

## v4.5.0

_August 1, 2022_

### Added

- Node 16 compatible version of `@justeat/f-services`.
- Node 16 compatible version of `@justeat/f-globalisation`.
- Node 16 compatible version of `@justeat/f-vue-icons`.

## v4.4.0

_July 26, 2022_

### Updated

- Bundlewatch maxSize

## v4.3.0

_July 25, 2022_

### Added

- Node 16 support.

## v4.2.0

_July 19, 2022_

### Added

- Peer dependencies for all fozzie components.

## v4.1.0

_July 13, 2022_

### Changed

- Update f-wdio-utils to v1.1.0 to use new Axe Core implementation.
- Accessibility tests to be async.

## v4.0.0

_July 7, 2022_

### Changed

- **Breaking change:** Update to `@use` and `@forward` SASS syntax.
- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v3.33.0

_June 29, 2022_

### Fixed

- Address mapping from local storage.

## v3.32.0

_June 22, 2022_

### Changed

- Update `f-link` to v3.1.1.

## v3.31.0

_June 15, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

## v3.30.1

_May 27, 2022_

### Added

- Visual tests for invalid basket

## v3.30.0

_May 24, 2022_

### Added

- Address handling for Ireland
- Assistive text slot to find Eircode

## v3.29.0

_May 23, 2022_

### Changed

- `maxBundleSize` to `125kb`

## v3.28.0

_May 3, 2022_

### Removed

- Retry wrapper for Axios

## v3.27.0

_May 3, 2022_

### Changed

- Logic for retrieving note types as backend key is wrong and can't be changed

## v3.26.0

_April 27, 2022_

### Added

- Retry wrapper for Axios API calls

## v3.25.0

_April 13, 2022_

### Added

- Spanish translations.
- Api user/address response details.
- Spanish Address format.
- Spain as an option in storybook.

## v3.24.1

_April 12, 2022_

### Added

- Italy to storybook.

## v3.24.0

_April 12, 2022_

### Changed

- Address service to correctly map international address lines.

## v3.23.0

_March 13, 2022_

### Changed

- Address lines to render based on translations.
- `f-services` version to `1.14.0`.

### Added

- Italian Addresses.

_March 18, 2022_

### Added

- Italian translations.

## v3.22.3

_March 3, 2022_

### Added

- GTM event fired when GCO successful.

## v3.22.2

_March 2, 2022_

### Changed

- Converted knobs to controls in `checkout.stories.js`

## v3.22.1

_March 1, 2022_

### Changed

- Address service to force postcodes to strings.

## v3.22.0

_February 16, 2022_

### Changed

- $logger interface to $log.
- Updated the tests to reflect the changes.

### Removed

- logger mixin as not needed anymore with new $log interface.

## v3.21.1

_February 16, 2022_

### Changed

- User note translations for AU/NZ.

## v3.21.0

_February 10, 2022_

### Changed

- Only call consumer endpoint on UK tenant
- Retrieve mobile number from auth token before API call

## v3.20.0

_February 9, 2022_

### Changed

- Updated versions of `f-alert`, `f-button`, `f-card`, `f-card-with-content`, `f-error-message`, `f-form-field`, `f-link` and `f-mega-modal`.

### Fixed

- Available fulfilment times to return error status only if there is a response.
- No available time stories and mocked requests

## v3.19.3

_February 7, 2022_

### Changed

- Tidy up `stories` folder.

## v3.19.2

_February 4, 2022_

### Fixed

- Handle Available fulfilment times responses without issues

### Changed

- Upgraded to ESLint v8

## v3.19.1

_February 3, 2022_

### Changed

- Use string instead of empty variable courier

## v3.19.0

_February 3, 2022_

### Changed

- Handle `getAvailableFulfilmentTimes` issues

## v3.18.1

_February 2, 2022_

### Changed

- Use old notes field for order notes

## v3.18.0

_February 2, 2022_

### Changed

- Address service to handle AU/NZ addresses.

## v3.17.0

_February 2, 2022_

### Changed

- Remove notes which aren't active from split notes calls.

## v3.16.0

_February 1, 2022_

### Updated

- `component`, `visual` and `a11y` tests with functions from `f-wdio-utils`

## v3.15.4

_January 27, 2022_

### Changed

- Bump `f-alert` version.

## v3.15.3

_January 21, 2022_

### Changed

- Passed tenant to `getCustomer` call

## v3.15.2

_January 20, 2022_

### Changed

- Updated version of `f-mega-modal`.

## v3.15.1

_January 20, 2022_

### Fixed

- Correct key for delivery note type when split notes is not enabled

## v3.15.0

_January 18, 2022_

### Added

- Refresh of note configuration if note isn't accepted

## v3.14.0

_January 14, 2022_

### Fixed

- Logic for closest postcode

## v3.13.3

_January 13, 2022_

### Added

- Test id for guest header.
- Focus for first input in fieldset.

## v3.13.2

_January 12, 2022_

### Fixed

- Logic for deciding whether notes should be formatted for split notes

## v3.13.1

_January 4, 2022_

### Fixed

- Mocked year for age verification tests.

## v3.13.0

_December 16, 2021_

### Added

- Ability to have split notes enabled or disabled

## v3.12.0

_December 6, 2021_

### Changed

- All dialog/alert/errorPage errors to be stored under `checkoutErrorMessage`.

## v3.11.0

_November 25, 2021_

### Changed

- `Error component` uses `BagSadBgIcon` from `f-vue-icons@3.0.0` and `f-card-with-content`.

## v3.10.0

_November 25, 2021_

### Added

- Error Dialog if Basket has changed.

## v3.9.0

_November 23, 2021_

### Changed

- Prevent the age verification from triggering a full validation of user details.

## v3.8.0

_November 19, 2021_

### Added

- Styling back to alert.
- Button spinner.

## v3.7.0

_November 17, 2021_

### Removed

- Spinner from checkout form.

## v3.6.2

_November 17, 2021_

### Fixed

- Spinner and loading state added back in.

## v3.6.0

_November 10, 2021_

### Changed

- `CheckoutForm` component.
- moved all form logic out of `Checkout.vue`.

## v3.5.0

_November 10, 2021_

### Changed

- Address Component to use `CheckoutFormField` component.
- `tableIdentifier` field to use `CheckoutFormField` component.

### Removed

- Checkout validation mixin.

## v3.4.0

_November 9, 2021_

### Added

- Component tests for age verification

## v3.3.0

_November 9, 2021_

### Added

- Visual tests for age verification

## v3.2.0

_November 9, 2021_

### Added

- `CheckoutFormField` component.

### Changed

- Guest Component to use `CheckoutFormField` component.

## v3.1.1

_November 5, 2021_

### Changed

- Group form fields translations together.

## v3.1.0

_November 4, 2021_

### Changed

- Moved component so that it's now in `Pages` rather than `Organisms`.

## v3.0.0

_October 29, 2021_

### Removed

- Spinner and loading state.

## v2.7.0

_October 27, 2021_

### Added

- `trackSelectedTimes` analytics event.

## v2.6.1

_October 19, 2021_

### Changed

- Updated version of `f-form-field`.

## v2.6.0

_October 19, 2021_

### Added

- `handleEventLogging` method to handle events and logging.

## v2.5.2

_October 15, 2021_

### Changed

- Updated version of `f-alert`, `f-mega-modal` to fix previous bad release.

## v2.5.1

_October 14, 2021_

### Changed

- Updated version of `f-button`, `f-alert`, `f-mega-modal`.

## v2.5.0

_October 12, 2021_

### Removed

- Redirect to login if the user is logged out and guest checkout is disabled

## v2.4.1

_October 13, 2021_

### Changed

- Place order note key to the correct case `NoteForRestaurant`

## v2.4.0

_October 12, 2021_

### Added

- Redirect to login if the user is logged out and guest checkout is disabled

## v2.3.0

_October 11, 2021_

### Removed

- Removed babel private methods.

_October 7, 2021_

### Changed

- Increased maxBundleSize to 120Kb.

## v2.2.0

_October 5, 2021_

### Changed

- Refactored component object.

## v2.1.0

_October 5, 2021_

### Changed

- Increased maxBundleSize to 105Kb.

## v2.0.0

_October 5, 2021_

### Changed

- Updated version of `f-button`, `f-mega-modal`, `f-alert`, `f-card` and `f-form-field` to include icing phase 2 changes.
- T&C, Privacy Policy and Cookie Policy links to use f-link component.

### Removed

- `o-link--noDecoration` class from the switch account link to add underline.
- `is-rounded` prop from `f-card` component call as the card is now rounded by default.

## v1.6.0

_September 30, 2021_

### Added

- Analytics service file to handle analytics events.
- `f-analytics` plugin to handle GTM events.

## v1.5.0

_September 30, 2021_

### Changed

- Only call Geolocation endpoint when the service type is delivery

## v1.4.0

_September 29, 2021_

### Changed

- `GEOLOCATION_REQUIRED` error handling.

## v1.3.0

_September 27, 2021_

### Added

- New function to map update checkout request

### Changed

- Map update checkout data before calling `handleUpdateCheckout`

## v1.2.0

_September 21, 2021_

### Changed

- Correct copy for collection time for AUZ

## v1.1.0

_September 16, 2021_

### Changed

- Updated version of `f-button`, `f-mega-modal`, `f-alert`, `f-card`, `f-error-message` and `f-form-field`.

### Removed

- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.

## v1.0.0

_September 15, 2021_

- Return beta to master. Component has JETSansDigital font.

## v1.0.0-beta.2

_September 8, 2021_

### Changed

- Updated font weights after design review.

## v1.0.0-beta.1

_September 6, 2021_

### Changed

- Updated versions of `f-alert` and `f-mega-modal` (JETSans Update).

## v1.0.0-beta.0

_September 1, 2021_

### Changed

- New font JETSansDigital
- `f-button` to v2.0.0-beta.0 which use the new font
- `f-form-field` to v3.0.0-beta.0 which use the new font

## v0.181.0

_September 14, 2021_

### Changed

- `trackDuplicateOrderWarnDialog` to `trackDialogEvent` to handle different dialog events.

### Added

- Analytics tracking for all `ErrorDialog` events.

_September 14, 2021_

### Changed

- Updated `f-checkout.component.js` with simplified tests that accept the tab loop from the tests as a parameter and removed hard coded functions
- Updated `axe-accessibility.spec.js` tests to support refactored test structure

## v0.180.3

_September 13, 2021_

### Changed

- Gelocation lookup failure back to warning from error

## v0.180.2

_September 8, 2021_

### Added

- Get checkout demo files for AU/NZ

### Changed

- Moved demo files inside the stories directory

## v0.180.1

_September 7, 2021_

### Changed

- Address labels for AU/NZ

## v0.180.0

_September 6, 2021_

### Added

- `administrativeArea` input for AU

## v0.179.0

_September 3, 2021_

### Changed

- `AgeVerification` page to show correct days per month.

## v0.178.0

_September 3, 2021_

### Changed

- Redirect to search or home if restaurant is not taking orders.
- Redirect to menu if service is not available.

## v0.177.0

_September 1, 2021_

### Changed

- Gelocation warning to error for more details in Sentry

## v0.176.0

_August 25, 2021_

### Changed

- Map checkout update request now trims whitespace from postcode

## v0.175.0

_August 25, 2021_

### Removed

- Age verification div wrapper from `AgeVerification.vue` component.

### Changed

- `AgeVerificationError` ref location from wrapper to `errorMessage` component.
- `handleAgeVerifcation` method to look for correct component when error appears.

### Fixed

- Typo in `AgeVerification.vue` component.

## v0.174.0

_August 25, 2021_

### Added

- Add copy for AU/NZ locales
- Guest dine in visual test.

## v0.173.4

_August 25, 2021_

### Changed

- Increased timeout to 60s.

## v0.173.3

_August 24, 2021_

### Added

- Logging items on invalid checkout.

## v0.173.2

_August 23, 2021_

### Changed

- Build in parallel to false

## v0.173.1

_August 18, 2021_

### Fixed

- Exports in test selector file.

## v0.173.0

_August 16, 2021_

### Added

- New file responsible for the mock response data.

### Changed

- `checkoutMocks.js` & `checkout.stories.js` refactored substantially.

## v0.172.0

_August 102, 2021_

### Added

- Error Message to Age Verification page.

## v0.171.0

_August 12, 2021_

### Changed

- Low value order experiment header to phase 2

## v0.170.0

_August 10, 2021_

### Added

- Check on basket API call to see if age verification prompt needs to be shown

## v0.169.0

_August 10, 2021_

### Added

- Age Verification Page.
- Tests to cover changes.

### Removed

- Some eventData values which were added for testing specific case

### Changed

- `f-form-field` version.

_August 9, 2021_

### Changed

- Updated version of `f-button`.

## v0.168.0

_August 5, 2021_

### Added

- Modal specific tab looping tests to `axe-accessibility.spec.js` that support `dinein`, `collection` and `delivery` variants of checkout.
  Latest (to be added to next release)

## v0.167.0

_August 5, 2021_

### Added

- `max-length` property to guest email field.
- `max-length` to component tests.

## v0.166.0

_August 4, 2021_

### Changed

- reduce character limit on address fields to 100

## v0.165.0

_July 26, 2021_

### Added

- `errorCode` property for failed UpdateCheckout is passed to the log

## v0.164.0

_July 22, 2021_

### Added

- Added `x-je-feature` to header config in `services/orderPlacementApi`

## v0.163.0

_July 17, 2021_

### Added

- Extracted APIs from Checkout Store so they are accessible to Contract Tests

### Changed

- Updated version of `f-button`.

## v0.162.0

_July 19, 2021_

### Fixed

- Ensure coordinates are always retrieved from local storage or fetched from API.

## v0.161.0

_July 15, 2021_

### Added

- Error page if `getCheckout` request returns empty times list.

### Fixed

- A typo in `CHEKOUT_ERROR_FORM_TYPE` > `CHECKOUT_ERROR_FORM_TYPE`

## v0.160.0

_July 15, 2021_

### Removed

- `pageData` from `trackInitialLoad` in the analytics module.

### Added

- `CheckoutMounted` event.

## v0.159.1

_July 14, 2021_

### Fixed

- Use correct parameter in analytics module to track LVO experiment

## v0.159.0

_July 12, 2021_

### Added

- Issue name and isFulfillable value to eventData to be captured by the error log.

## v0.158.0

_July 12, 2021_

### changed

- Removed the direct get postcode cookie call from `addressService.js` and now pass value in.

## v0.157.0

_July 9, 2021_

### Fixed

- Error handling when there are no responses (e.g. timeout).

## v0.156.0

_July 8, 2021_

### Added

- Experiment headers to PATCH checkout request
- Track experiments if returned in response headers

## v0.156.0

_July 8, 2021_

### Added

- Experiment headers to PATCH checkout request
- Track experiments if returned in response headers

## v0.155.0

_July 6, 2021_

### Changed

- Email, Postcode and Mobile was validating on every keypress but now validating onBlur.

## v0.154.0

_July 7, 2021_

### Added

- Redirect to home when `restaurant.seoName` is falsey.

## v0.153.0

_July 6, 2021_

### Added

- Chosen time to eventData to be captured by the error log.

## v0.152.0

_July 6, 2021_

### Fixed

- Returning guest user's mobile phone number not populating

## v0.151.0

_July 5, 2021_

### Fixed

- Get new `availableFulfilment` times when no available fulfilment times are available.

### Changed

- `f-form-field` version to `1.16.1`.

## v0.150.0

_June 30, 2021_

### Fixed

- Address not populating guest checkout form.

## v0.149.0

_June 30, 2021_

### Changed

- Logging levels for different errors.
- Using `f-card`'s `1.3.0` version.

## v0.148.0

_June 24, 2021_

### Added

- The ability to save to `localStorage` if the address is changed by the user.

## v0.147.0

_June 24, 2021_

### Fix

- ASAP flag applied when times are initialised.

## v0.146.0

_June 24, 2021_

### Changed

- When submitting the checkout page and we get a `403` error code, we show the `403` error page.

## v0.145.0

_June 23, 2021_

### Fixed

- Selector to display previously selected times

### Changed

- `f-form-field` version

### Added

- Storybook mocks for pre-selected fulfilment times

## v0.144.0

_June 21, 2021_

### Added

- More thorough check on whether form address and storage address match

## v0.143.1

_June 21, 2021_

### Changed

- Flipped coordinates from local storage

## v0.143.0

_June 18, 2021_

### Changed

- Fixed redirect link for Dine In orders

## v0.142.0

_June 17, 2021_

### Changed

- Percy to run desktop / mobile in separate specs

### Fixed

- Percy visual regression test

## v0.141.1

_June 17, 2021_

### Fixed

- "As soon as possible" not being displayed by default.

## v0.141.0

_June 17, 2021_

### Changed

- Fixed an issue in which the chosen delivery/collection time wasn't remembered.

## v0.140.0

_June 16, 2021_

### Changed

- Fixed cookie removal on 403 error page by now using restaurant ID instead of basket ID

## v0.139.0

_June 14, 2021_

### Changed

- Use loading spinner on submit button

## v0.138.0

_June 15, 2021_

### Changed

- Fixed the hardcoded `referralState` data we're passing to the Place Order endpoint.

## v0.137.0

_June 15, 2021_

### Changed

- Dependency updated to f-alert@v0.6.1

## v0.136.0

_June 15, 2021_

### Added

- Button for error pages
- Tests to cover button changes
- Added log warn when error component is displayed
- Visual regression tests for error pages
- `AdditionalItemsRequired` issue for storybook story

### Changed

- `updateCheckoutErrors` to `updateCheckoutRestaurantNotTakingOrders` in storybook story to be able to specify different issues as the content of the error dialogs can differ

## v0.135.0

_June 11, 2021_

### Changed

- Fixed the error dialog "Back to order" redirect

## v0.134.0

_June 10, 2021_

### Added

- Error code to analytics when errors occur for a more descriptive error

## v0.133.0

_June 9, 2021_

### Added

- Separate content for 403 error
- "Get checkout errors" knob for storybook to render different error page variations
- `errorFormType` data attribute to deside wether to show one of the error page versions or the checkout form

### Removed

- `hasCheckoutLoadedSuccessfully` data attribute as redundant

## v0.132.0

_June 8, 2021_

### Changed

- Read location coords from local storage if address in form hasn't changed

## v0.131.0

_June 9, 2021_

### Added

- Service type inside menu object for initial push to GTM data layer

## v0.130.0

_June 7, 2021_

### Added

- Feature & Visual Tests for `Duplicate Order Warning` modal

## v0.129.0

_June 2, 2021_

### Added

- Populate userNote field from session storage if it exists
- Save userNote field to session storage when checkout form is submitted

## v0.128.0

_June 2, 2021_

### Change

- Give the consumer two options; 'Close' or 'View recent orders', when showing the Duplicate Error Warning dialog box
- Added tracking to the alternative dialog box

## v0.127.0

_June 1, 2021_

### Changed

- Moved logic to show fulfilment time dropdown inside selector component to still set the time under the hood
- Passed correct params to mapper to ensure request is made correctly

## v0.126.0

_June 1, 2021_

### Changed

- Restored/Set the selected `fulfilment time` if available/valid on `mount`

## v0.125.0

_May 24, 2021_

### Added

- Populate address fields from local storage if it exists

## v0.124.0

_May 28, 2021_

### Fixed

- Scrolling broken when clicking `OK` within `megaModal` component.

### Added

- `serviceType` to data-test-id

## v0.123.0

_May 27, 2021_

### Added

- Logging of place order error code

## v0.122.0

_May 24, 2021_

### Changed

- f-card package version updated to 1.2.1 to include card footer for T&C
- T&C styles were cleaned up

## v0.121.0

_May 24, 2021_

### Updated

- Logging to include traceID from server

## v0.120.0

_May 26, 2021_

### Changed

- CSS variables to use pie design tokens instead of fozzie-colour-palette vars

## v0.119.0

_May 24, 2021_

### Added

- Ability to handle orders with the service type `dinein`
- Table number/name input field

## v0.118.1

_May 24, 2021_

### Changed

- Check mobile number exists before formatting for screen reader

## v0.118.0

_May 21, 2021_

### Updated

- `f-mega-modal` to version 0.9.0 to include `title` prop

### Changed

- Refactor ErrorDialog to use `title` prop in `f-mega-modal`

## v0.117.0

_May 20, 2021_

### Added

- Aria label with structured mobile number for screen readers

## v0.116.0

_May 18, 2021_

### Changed

- Output the tag: 'checkout' with all log messages

## v0.115.0

_May 18, 2021_

### Removed

- `UserNote.vue` as now it is just another form field from `f-form-field` component

### Updated

- `f-form-field` to version 1.12.1 to include textarea input-type

## v0.114.0

_May 17, 2021_

### Fixed

- Error modal spacing so that the title and the close button don't overlap

### Changed

- Updated `f-mega-modal` version

## v0.113.0

_May 12, 2021_

### Fixed

- mobile view for alert and t&Cs box.

## v0.112.0

_May 14, 2021_

### Added

- Max Length added to fields submitted to Api to match spec.

## v0.111.0

_May 13, 2021_

### Fixed

- Fulfilment Times drop down not populating on startup

## v0.110.0

_May 13, 2021_

### Changed

- Display 'Please enter your phone number' when the mobile number field is empty, and invalid phone message when the field is invalid but not empty

## v0.109.0

_May 13, 2021_

### Added

- `aria-describedby` and `aria-invalid` for all input fields - for reading error messages
- hidden `error-summary-section` in checkout to alert errors after submit button (resembles f-registration)

## v0.108.0

_May 13, 2021_

### Fixed

- Error when Checkout endpoint returns address with lines set to `null`

## v0.107.0

_May 12, 2021_

### Changed

- `f-button` version to fix focus state on tab.

### Fixed

- `Resturant` to `Restaurant` typo in `en-GB.js` copy text.

## v0.104.0

_May 10, 2021_

### Changed

- `genericErrorMessage` and `nonFulfillableError` replaced with `vuex` `message`.
- One of `ErrorDialog` or `f-alert` to be displayed if an error should be displayed to the user.

### Added

- Tests to cover changes in `ErrorDialog`.

## v0.103.0

_May 7, 2021_

### Added

- Tagging for future Percy tests

### Changed

- Bumped f-services version to 1.11.0.
- Bumped f-form-field version to 1.11.0.
- Set tel. no. field type as `Tel`

## v0.102.0

_May 6, 2021_

### Changed

- Guest checkout email input type to `email`

## v0.101.0

_May 5, 2021_

### Changed

- Mapping of fulfilment address and time to match the API response.

## v0.100.0

_May 5, 2021_

### Added

- red outline to input fields when an error is displayed

## v0.99.0

_May 4, 2021_

### Changed

- make header in mobile look as designed

## v0.98.0

_April 29, 2021_

### Changed

- Updated Checkout error messages to reflect latest copy
- Included service type labels to display in error messages

## v0.97.0

_April 28, 2021_

### Changed

- Changed main headers to be h1 elements

## v0.96.0

_April 28, 2021_

### Changed

- Updated notes to reflect PIE design

## v0.95.0

_April 26, 2021_

### Added

- Handling of duplicate orders.

### Changed

- Refactored handling order issues.

## v0.94.0

_April 23, 2021_

### Changed

- `UPDATE_AUTH_GUEST` mutation now sets `isLoggedIn` to `true`

## v0.93.0

_April 20, 2021_

### Added

- Removed alternative method of getting customer details so all access is via the `$State`

## v0.92.0

_April 16, 2021_

### Added

- Use AuthToken phone nos. if checkout api fails to return a customer phone no.

### Changed

- Refactored handling order issues.

## v0.91.0

_April 14, 2021_

### Added

- Refactored/Aligned logging calls
- Refactored error handling

## v0.90.0

_April 13, 2021_

### Changed

- Allowed address line 2 to not exist in PATCH request

## v0.89.0

_April 13, 2021_

### Added

- Automatic scrolling to the first inline error when trying to proceed to the payment page.

## v0.88.0

_April 12, 2021_

### Changed

- PATCH Checkout now sends null for lines 3 and 4 of address instead of empty string

## v0.87.1

_April 12, 2021_

### Changed

- `checkoutTimeout` prop now defaults to ten seconds

## v0.87.0

_April 12, 2021_

### Added

- `isGuestCreated` store flag that prevents multiple guest accounts from being created when form is resubmitted after failed validation

## v0.86.0

_April 12, 2021_

### Removed

- Hardcoded timeout before redirecting to the payment page.

## v0.85.0

_April 8, 2021_

### Added

- `otacToAuthExchanger` prop that provides functionality to exchange OTAC to JWT token for guest checkout.

## v0.84.1

_April 8, 2021_

### Added

- Ability to display server errors in Storybook

## v0.84.0

_April 6, 2021_

### Added

- Scrolling to the server-side error alert automatically.

## v0.83.0

_April 6, 2021_

### Fixed

- Error alert top margin.

## v0.82.0

_April 1, 2021_

### Added

- Ability to handle issues which we do not have stored

## v0.81.0

_April 1, 2021_

### Added

- Support for running tests on remote `Browserstack`.

### Changed

- Component test file structure to support `Browserstack`.

### Fixed

- Error message component test `isDisplayed` test to search displayed within viewport.

## v0.80.1

_April 1, 2021_

### Added

- o-links fozzie classes for the links

## v0.80.0

_March 31, 2021_

### Added

- spinnerTimeout prop that defaults to 500ms

### Changed

- Spinner shows after spinnerTimeout instead of hardcoded 1s

## v0.79.0

_March 31, 2021_

### Fixed

- Retry modal now closes when errors / issues are returned and the user tries to dismiss the modal.

## v0.78.1

_March 31, 2021_

### Changed

- Load `address` into state via new `location` object.

## v0.78.0

_March 30, 2021_

### Added

- Custom errors.

### Changed

- The whole handling of exceptions and errors.
- Several functions and tests.

### Removed

- Redundant and unnecessary functions.

## v0.77.0

_March 26, 2021_

### Added

- New time object structure for patch call to checkout. (Includes scheduled & asap values).
- Fix up `selector.vue` so times `to/from` are set correctly.

## v0.76.0

_March 25, 2021_

### Added

- Tests to test the preorder warning message
- Tests to test the checkout error message
- Supporting code in `Checkout.stories.js` and `f-checkout.component.js` to enable testing in storybook.
- `checkout-available-fulfilment-preorder.json` to support storybook tabs for testing
- Component tests for `Error.vue` component
- Accessibility tests for `Error.vue` component

## v0.75.0

_March 19, 2021_

### Added

- Mega modal dialog for when unfulfillable issues are returned from `updateCheckout`
- Constants of all the issues we are expected to receive

## v0.74.0

_March 18, 2021_

### Added

- Preorder warning message for `Selector` component.
- Tests to cover changes.

## v0.73.0

_March 18, 2021_

### Changed

- `Checkout.vue` watcher `authToken` to only initialise checkout when the token updates as below:
  - Truthy > Falsey
  - Falsey > Truthy
  - Truthy > Truthy (Checkout will not reload)

### Added

- Tests to cover authToken watcher changes.

### Removed

- Some tests that are not required as they're now covered in these new changes.

## v0.72.0

_March 18, 2021_

### Changed

- `address.city` to `address.locality` in checkout state.
- `UPDATE_STATE` mutation to use `locality`.
- `getAddress` to use locality.

## v0.71.0

_March 16, 2021_

### Changed

- `Checkout.vue` method clean up. Refactor `submitCheckout`.

### Added

- Methods `handleFulfillableContext`, `processOrderNotFulfillable`,
  `processOrderIsFulfillable` & `logInfo`.

## v0.70.0

_March 15, 2021_

### Changed

- Calling OPAPI's v2.

## v0.69.0

_March 12, 2021_

### Added

- Ability to extract customer name from JWT Claims if not retrieved from server

## v0.68.1

_March 9, 2021_

### Changed

- Locale usage in storybook

## v0.68.0

_March 9, 2021_

### Changed

- Guest checkout header to display correct text.

## v0.67.0

_March 9, 2021_

### Added

- Analytics error tracking.
- Tests to cover changes.

### Changed

- `checkout.module` `issues` to `error`.

### Fixed

- Guest field inputs Vuex mutation error.

## v0.66.0

_March 5, 2021_

### Changed

- `Checkout.vue` - refactor `onFormSubmit` method and relevant tests.

## v0.65.1

_March 5, 2021_

### Fixed

- `UPDATE_CHANGED_FIELD` mutation to sort `changedFields` correctly.

## v0.65.0

_March 4, 2021_

### Changed

- Prevent error page showing when the address call fails
- Logging when the address call does fail

## v0.64.0

_March 4, 2021_

### Changed

- `analytics` to `fCheckout.module`.
- `analytics.module` to `fCheckoutAnalytics.module`.

### Removed

- `f-trak` dependency.

## v0.63.0

_March 3, 2021_

### Added

- `analytics.module` export.

## v0.62.0

_March 3, 2021_

### Changed

- Storybook knobs to be easier to use.
- `open` function for component tests to match changes.

### Removed

- Redundant timeout props.

## v0.61.0

_March 2, 2021_

### Added

- `getGeoLocation` to call the location services api.

### Changed

- Called the api during the Submit.
- Mapped the results into the `PATCH` Checkout request model.
- Refactored/Added unit tests.

## v0.60.0

_February 26, 2021_

### Added

- `analytics.module` to store.
- `mapAnalyticsName` and `mapAnalyticsNames` to `mapper` service.
- Analytics tracking to `Checkout` component.
- Tests to cover changes.

## v0.59.0

_February 24, 2021_

### Added

- `placeOrder` to call the Order Placement API.
- Redirect to the payment page after the order has been placed.

### Changed

- Restructured component object into page object model
- Refactored component and accessibility tests
- Extracted svgTransform to global test utils for reference by other packages
- How we pass the parameters to the `PATCH` Checkout request.

## v0.58.0

_February 18, 2021_

### Added

- Loading spinner if async requests take over a second

## v0.57.0

_February 15, 2021_

### Added

- Logic to choose closest address for uk tenant

## v0.56.2

_February 12, 2021_

### Fixed

- Endpoint error logging.

## v0.56.1

_February 11, 2021_

### Changed

- Used correct comment format to prevent it being shown on UI

## v0.56.0

_February 11, 2021_

### Added

- logging to `Checkout` and `Header` components.
- Tests to cover changes.

## v0.55.0

_February 11, 2021_

### Added

- Added `vue-svg-loader` to Webpack config

### Changed

- Utilised `vue-svg-loader` for error page SVG

## v0.54.0

_February 10, 2021_

### Added

- `basketTotal` and `restaurantId` to the state, being retrieved from the Basket API.

### Changed

- Now always calling `loadBasket` regardless of if it's a guest or authenticated user.

## v0.53.0

_February 9, 2021_

### Added

- Loading customer address from API endpoint if Checkout endpoint did not return it

## v0.52.0

_February 9, 2021_

### Added

- `updateCheckoutUrl` and `updateCheckoutTimeout` props.

### Changed

- Renamed `checkoutUrl` prop to `getCheckoutUrl`.

### Removed

- `checkoutId` prop.

## v0.51.0

_February 5, 2021_

### Added

- Axios mock to Storybook for checkout PATCH requests.
- PATCH response handling, by adding `issues` and `isFulfillable` to state.

## v0.50.0

_February 5, 2021_

### Added

- `CheckoutSetupGuestSuccess`, `CheckoutSetupGuestFailure`, `CheckoutValidationError` events.
- Tests to cover changes.

## v0.49.0

_February 4, 2021_

### Added

- `Error.vue` component to display a user-friendly error page when we cannot load the necessary information to render the page.
- Test to confirm guest login/sign up link navigates to correct url when clicked

## v0.48.0

_February 4, 2021_

### Added

- Mapper service for creation of checkout PATCH payload.
- Handling of user note and including it in the PATCH request.

## v0.47.0

_February 3, 2021_

### Added

- `f-checkout-guest.spec` files for `guest checkout` tests.
- Guest Checkout tests.

### Changed

- Links directly to test pages have been changed from testing within Storybook to its own page.

## v0.46.0

_February 2, 2021_

### Changed

- Reduce nesting within state by moving `address` and `time` out of `fulfilment`.
- Update checkout URL.
- Flesh out checkout submit data.
- Use `f-form-field@1.8.0` with separate text/value in `dropdownOptions`.
- Checkout method from POST to PATCH.

## v0.45.0

_January 27, 2021_

### Changed

- Only call the Checkout `GET` endpoint when the user is logged in.
- Refactored tests.

## v0.44.0

_January 25, 2021_

### Added

- When the user is not logged in, retrieve serviceType from global basket orchestrator

## v0.43.0

_January 25, 2021_

### Changed

- The package now also exports its module, besides the component, so the consuming application can handle the registration of the Vuex module.

### Removed

- Registration of `checkout.module` from the component.
- Duplicated tests in `Checkout.test.js`.

## v0.42.0

_January 22, 2021_

### Changed

- `f-button` version.
- `Header` component `login` button to use `f-button`.

## v0.41.0

_January 22, 2021_

### Removed

- `Accept-Tenant` header from requests to the `CheckoutApi`.

## v0.40.0

_January 20, 2021_

### Added

- `validations` mixin.
- `Guest` component validations.
- `VALIDATIONS` constant.

### Changed

- `updateAddressDetails` and `updateCustomerDetails` store actions.

## v0.39.0

_January 18, 2021_

### Changed

- `getCheckout` store method passes authentication token to the api endpoint.

## v0.38.0

_January 15, 2021_

### Changed

- Use the latest version of `f-form-field`.

## v0.37.0

_January 14, 2021_

### Added

- `Guest`, `Header` and `TermsAndConditions` components.
- `Checkout` mobile view.

### Changed

- `Checkout` form method.
- `Checkout` card width.
- `Checkout` title and login link into `Header` component.
- `userNote` label.

## Latest (roll into next release)

_January 13, 2021_

### Added

- Test to confirm switch user link is displayed.

## v0.36.0

_January 12, 2021_

### Removed

- Allergen information link.

## Latest (add to next release)

_January 12, 2021_

### Changed

- Update axios version for security advisory.
- Use latest version of `f-error-message`.

## v0.35.0

_January 7, 2021_

### Added

- Tests to cover new methods, actions and mutations

### Changed

- Replaced direct state manipulations with mutations and actions

## v0.34.1

_January 7, 2021_

### Changed

- Mobile number tests naming convention for `Checkout` component to make clear differences in tests.
- Mobile number test for `Checkout` component to an unused number format.
- Updated the location of the mobile number tests.

## v0.34.0

_January 6, 2021_

### Added

- Call to create a guest user when submitting checkout form and the user is not authenticated

## v0.33.0

_January 6, 2021_

### Added

- Link to the checkout page to allow the user to correct who is logged in.

## v0.32.0

_January 5, 2021_

### Changed

- Tests for `Checkout` component methods and computed values.

### Added

- `it-IT` tenant file.

## v0.31.0

_January 5, 2021_

### Changed

- Updated skipped tests to work with Storybook component tests.
- Updated config for latest `sass-loader`.
- Updated fozzie dependencies in `common.scss` to pull in v5-beta.

### Added

- New `clearCheckoutForm` function added to clear the fields in tests in the `f-checkout-component.js` file.

## v0.30.0

_December 23, 2020_

### Changed

- props, CSS class, and event descriptions added to `README`.

### Removed

- unused event names.

## v0.29.0

_December 23, 2020_

### Added

- `setup` test helper file.
- Tests for `Checkout` component methods.

## v0.28.0

_December 22, 2020_

### Added

- Tests for `Address` component.

## v0.27.0

_December 21, 2020_

### Added

- Retrieving fulfilment information from a separate endpoint/file.

### Removed

- Watchers for Storybook. Replaced it with an object `:key` containing the different props.

## v0.26.0

_December 15, 2020_

### Added

- Tests for store `checkout.module.js`.

## v0.25.0

_December 14, 2020_

### Added

- Added 'authToken' property

## v0.24.0

_December 14, 2020_

### Changed

- Renamed 'fulfill' occurrences to 'fulfil' to keep in line with the Checkout API.

## v0.23.0

_December 11, 2020_

### Changed

- Moved justeat packages to the dev dependencies
- Updated f-button component to the latest (0.4.1)
- Renamed button-component to f-button for concistency between projects

## v0.22.0

_December 11, 2020_

### Added

- Webdriver tests for postcode format in `f-checkout-delivery`.

## v0.21.0

_December 10, 2020_

### Added

- Webdriver test for phone number format in `f-checkout-delivery`.

## v0.20.1

_December 10, 2020_

### Changed

- `f-form-field` version.
- Styling of `Address` fields in error.

## v0.20.0

_December 9, 2020_

### Changed

- `f-form-field` version.
- Styling in `Address` component.

## v0.19.0

_December 8, 2020_

### Added

- Webdriver tests for dropdown in `Selector`
- Webdriver tests for note-field character limit in `UserNote`

### Changed

- `f-form-field` version.
- `data-test-id` references in tests.

## v0.18.0

_December 8, 2020_

### Changed

- `f-services` version.
- Postcode validation.

### Removed

- Spanish Locale from storybook.

## v0.17.0

_December 7, 2020_

### Added

- Component tests for 'Collection' prop variant.

### Changed

- Split component tests into separate spec files

## v0.16.1

_December 4, 2020_

### Changed

- Updated `Checkout.stories.js` to support new checkoutMock naming for Storybook.

## v0.16.0

_December 4, 2020_

### Added

- Page object model constants for css selectors
- New test to check for existence of error messages per field

## v0.15.0

_December 3, 2020_

### Added

- Ability to change prop values in demo file for WebDriverIO component tests.
- New `Demo.vue` for f-checkout controls.

## v0.14.0

_December 2, 2020_

### Added

- `max-length` to user note.

### Changed

- Phone validation to use `f-services`.
- Styling in `Selector` component.

## v0.13.0

_December 1, 2020_

### Changed

- `f-services` version.
- Tests to match the new version of `f-services`.

## v0.12.0

_December 1, 2020_

### Changed

- Selector component to use `f-form-field` dropdown component.
- `f-button` version.

## v0.11.0

_November 25, 2020_

### Added

- Vuex modules to make state management cleaner and clearer.

## v0.10.0

_November 23, 2020_

### Changed

- Updated `f-card`, `f-button`, `f-form-field`, `f-error-message` versions.
- Updated font sizes, padding and layout to match PIE design.

## v0.9.0

_November 16, 2020_

### Added

- Checkout component calls server to get data

## v0.8.0

_November 12, 2020_

### Added

- Inline error handling to `Checkout` and `Address` components.
- Server side error handling.
- Validations from `f-services`.

## v0.7.0

_November 11, 2020_

### Added

- Integration with `f-globalisation`.

### Changed

- The way we run the demo page (used by component tests) so that we can control what we inject into the Vue instance.

## v0.6.0

_November 2, 2020_

### Added

- New component tests

## v0.5.0

_October 26, 2020_

### Added

- New functionality to component object
- New component tests

## v0.4.0

_October 22, 2020_

### Added

- Address component to be displayed if `checkoutMethod` is set to 'Delivery'.
- Stylelint added to lint styling on build.

### Removed

- Address related form fields from `f-checkout`.

### Changed

- Checkout Component to replicate Collection and Delivery in ConsumerWeb.
- Selector to uses `method` prop to change label text.

## v0.3.0

_October 21, 2020_

### Changed

- Selector to hide label when time selected.

### Added

- Selector unit tests

## v0.2.0

_October 15, 2020_

### Changed

- Layout to replicate ConsumerWeb.

## v0.1.0

_October 6, 2020_

### Added

- Component structure and basic configuration (created using `generator-component`).
