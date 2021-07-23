# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v0.164.0
------------------------------
*July 22, 2021*

### Added
- Added `x-je-feature` to header config in `services/orderPlacementApi`


v0.163.0
------------------------------
*July 17, 2021*

### Added
- Extracted APIs from Checkout Store so they are accessible to Contract Tests


Latest (to be added to next version)
------------------------------
*July 15, 2021*

### Changed
- Updated version of `f-button`.


Latest (to be added to next version)
------------------------------
*July 15, 2021*

### Changed
- Updated version of `f-button`.


v0.162.0
------------------------------
*July 19, 2021*

### Fixed
- Ensure coordinates are always retrieved from local storage or fetched from API.


v0.161.0
------------------------------
*July 15, 2021*

### Added
- Error page if `getCheckout` request returns empty times list.

### Fixed
- A typo in `CHEKOUT_ERROR_FORM_TYPE` > `CHECKOUT_ERROR_FORM_TYPE`


v0.160.0
------------------------------
*July 15, 2021*

### Removed
- `pageData` from `trackInitialLoad` in the analytics module.

### Added
- `CheckoutMounted` event.


v0.159.1
------------------------------
*July 14, 2021*

### Fixed
- Use correct parameter in analytics module to track LVO experiment


v0.159.0
------------------------------
*July 12, 2021*

### Added
- Issue name and isFulfillable value to eventData to be captured by the error log.


v0.158.0
------------------------------
*July 12, 2021*

### changed
- Removed the direct get postcode cookie call from `addressService.js` and now pass value in.


v0.157.0
------------------------------
*July 9, 2021*

### Fixed
- Error handling when there are no responses (e.g. timeout).


v0.156.0
------------------------------
*July 8, 2021*

### Added
- Experiment headers to PATCH checkout request
- Track experiments if returned in response headers


v0.156.0
------------------------------
*July 8, 2021*

### Added
- Experiment headers to PATCH checkout request
- Track experiments if returned in response headers


v0.155.0
------------------------------
*July 6, 2021*

### Changed
- Email, Postcode and Mobile was validating on every keypress but now validating onBlur.


v0.154.0
------------------------------
*July 7, 2021*

### Added
- Redirect to home when `restaurant.seoName` is falsey.


v0.153.0
------------------------------
*July 6, 2021*

### Added
- Chosen time to eventData to be captured by the error log.


v0.152.0
------------------------------
*July 6, 2021*

### Fixed
- Returning guest user's mobile phone number not populating


v0.151.0
------------------------------
*July 5, 2021*

### Fixed
- Get new `availableFulfilment` times when no available fulfilment times are available.

### Changed
- `f-form-field` version to `1.16.1`.


v0.150.0
------------------------------
*June 30, 2021*

### Fixed
- Address not populating guest checkout form.


v0.149.0
------------------------------
*June 30, 2021*

### Changed
- Logging levels for different errors.
- Using `f-card`'s `1.3.0` version.


v0.148.0
------------------------------
*June 24, 2021*

### Added
- The ability to save to `localStorage` if the address is changed by the user.


v0.147.0
------------------------------
*June 24, 2021*

### Fix
- ASAP flag applied when times are initialised.


v0.146.0
------------------------------
*June 24, 2021*

### Changed
- When submitting the checkout page and we get a `403` error code, we show the `403` error page.


v0.145.0
------------------------------
*June 23, 2021*

### Fixed
- Selector to display previously selected times

### Changed
- `f-form-field` version

### Added
- Storybook mocks for pre-selected fulfilment times


v0.144.0
------------------------------
*June 21, 2021*

### Added
- More thorough check on whether form address and storage address match


v0.143.1
------------------------------
*June 21, 2021*

### Changed
- Flipped coordinates from local storage


v0.143.0
------------------------------
*June 18, 2021*

### Changed
- Fixed redirect link for Dine In orders


v0.142.0
------------------------------
*June 17, 2021*

### Changed
- Percy to run desktop / mobile in separate specs


### Fixed
- Percy visual regression test


v0.141.1
------------------------------
*June 17, 2021*

### Fixed
- "As soon as possible" not being displayed by default.


v0.141.0
------------------------------
*June 17, 2021*

### Changed
- Fixed an issue in which the chosen delivery/collection time wasn't remembered.


v0.140.0
------------------------------
*June 16, 2021*

### Changed
- Fixed cookie removal on 403 error page by now using restaurant ID instead of basket ID


v0.139.0
------------------------------
*June 14, 2021*

### Changed
- Use loading spinner on submit button


v0.138.0
------------------------------
*June 15, 2021*

### Changed
- Fixed the hardcoded `referralState` data we're passing to the Place Order endpoint.


v0.137.0
------------------------------
*June 15, 2021*

### Changed
- Dependency updated to f-alert@v0.6.1


v0.136.0
------------------------------
*June 15, 2021*

### Added

- Button for error pages
- Tests to cover button changes
- Added log warn when error component is displayed
- Visual regression tests for error pages
- `AdditionalItemsRequired` issue for storybook story

### Changed
- `updateCheckoutErrors` to `updateCheckoutRestaurantNotTakingOrders` in storybook story to be able to specify different issues as the content of the error dialogs can differ


v0.135.0
------------------------------
*June 11, 2021*

### Changed
- Fixed the error dialog "Back to order" redirect


v0.134.0
------------------------------
*June 10, 2021*

### Added
- Error code to analytics when errors occur for a more descriptive error


v0.133.0
------------------------------
*June 9, 2021*

### Added
- Separate content for 403 error
- "Get checkout errors" knob for storybook to render different error page variations
- `errorFormType` data attribute to deside wether to show one of the error page versions or the checkout form

### Removed
- `hasCheckoutLoadedSuccessfully` data attribute as redundant


v0.132.0
------------------------------
*June 8, 2021*

### Changed
- Read location coords from local storage if address in form hasn't changed


v0.131.0
------------------------------
*June 9, 2021*

### Added
- Service type inside menu object for initial push to GTM data layer


v0.130.0
------------------------------
*June 7, 2021*

### Added
- Feature & Visual Tests for `Duplicate Order Warning` modal


v0.129.0
------------------------------
*June 2, 2021*

### Added
- Populate userNote field from session storage if it exists
- Save userNote field to session storage when checkout form is submitted


v0.128.0
------------------------------
*June 2, 2021*

### Change
- Give the consumer two options; 'Close' or 'View recent orders', when showing the Duplicate Error Warning dialog box
- Added tracking to the alternative dialog box


v0.127.0
------------------------------
*June 1, 2021*

### Changed
- Moved logic to show fulfilment time dropdown inside selector component to still set the time under the hood
- Passed correct params to mapper to ensure request is made correctly


v0.126.0
------------------------------
*June 1, 2021*

### Changed
- Restored/Set the selected `fulfilment time` if available/valid on `mount`


v0.125.0
------------------------------
*May 24, 2021*

### Added
- Populate address fields from local storage if it exists


v0.124.0
------------------------------
*May 28, 2021*

### Fixed
- Scrolling broken when clicking `OK` within `megaModal` component.

### Added
- `serviceType` to data-test-id


v0.123.0
------------------------------
*May 27, 2021*

### Added
- Logging of place order error code


v0.122.0
------------------------------
*May 24, 2021*

### Changed
- f-card package version updated to 1.2.1 to include card footer for T&C
- T&C styles were cleaned up


v0.121.0
------------------------------
*May 24, 2021*

### Updated
- Logging to include traceID from server


v0.120.0
------------------------------
*May 26, 2021*

### Changed
- CSS variables to use pie design tokens instead of fozzie-colour-palette vars


v0.119.0
------------------------------
*May 24, 2021*

### Added
- Ability to handle orders with the service type `dinein`
- Table number/name input field

v0.118.1
------------------------------
*May 24, 2021*

### Changed
- Check mobile number exists before formatting for screen reader


v0.118.0
------------------------------
*May 21, 2021*

### Updated
- `f-mega-modal` to version 0.9.0 to include `title` prop

### Changed
- Refactor ErrorDialog to use `title` prop in `f-mega-modal`


v0.117.0
------------------------------
*May 20, 2021*

### Added
- Aria label with structured mobile number for screen readers


v0.116.0
------------------------------
*May 18, 2021*

### Changed
- Output the tag: 'checkout' with all log messages


v0.115.0
------------------------------
*May 18, 2021*

### Removed
- `UserNote.vue` as now it is just another form field from `f-form-field` component

### Updated
- `f-form-field` to version 1.12.1 to include textarea input-type


v0.114.0
------------------------------
*May 17, 2021*

### Fixed
- Error modal spacing so that the title and the close button don't overlap

### Changed
- Updated `f-mega-modal` version


v0.113.0
------------------------------
*May 12, 2021*

### Fixed
- mobile view for alert and t&Cs box.


v0.112.0
------------------------------
*May 14, 2021*

### Added
- Max Length added to fields submitted to Api to match spec.


v0.111.0
------------------------------
*May 13, 2021*

### Fixed
- Fulfilment Times drop down not populating on startup


v0.110.0
------------------------------
*May 13, 2021*

### Changed
- Display 'Please enter your phone number' when the mobile number field is empty, and invalid phone message when the field is invalid but not empty


v0.109.0
------------------------------
*May 13, 2021*

### Added
- `aria-describedby` and `aria-invalid` for all input fields - for reading error messages
- hidden `error-summary-section` in checkout to alert errors after submit button (resembles f-registration)



v0.108.0
------------------------------
*May 13, 2021*

### Fixed
- Error when Checkout endpoint returns address with lines set to `null`


v0.107.0
------------------------------
*May 12, 2021*

### Changed
- `f-button` version to fix focus state on tab.

### Fixed
- `Resturant` to `Restaurant` typo in `en-GB.js` copy text.

v0.104.0
------------------------------
*May 10, 2021*

### Changed
- `genericErrorMessage` and `nonFulfillableError` replaced with `vuex` `message`.
- One of `ErrorDialog` or `f-alert` to be displayed if an error should be displayed to the user.

### Added
- Tests to cover changes in `ErrorDialog`.


v0.103.0
------------------------------
*May 7, 2021*

### Added
- Tagging for future Percy tests

### Changed
- Bumped f-services version to 1.11.0.
- Bumped f-form-field version to 1.11.0.
- Set tel. no. field type as `Tel`


v0.102.0
------------------------------
*May 6, 2021*

### Changed
- Guest checkout email input type to `email`


v0.101.0
------------------------------
*May 5, 2021*

### Changed
- Mapping of fulfilment address and time to match the API response.


v0.100.0
------------------------------
*May 5, 2021*

### Added
- red outline to input fields when an error is displayed


v0.99.0
------------------------------
*May 4, 2021*

### Changed
- make header in mobile look as designed


v0.98.0
------------------------------
*April 29, 2021*

### Changed
- Updated Checkout error messages to reflect latest copy
- Included service type labels to display in error messages


v0.97.0
------------------------------
*April 28, 2021*

### Changed
- Changed main headers to be h1 elements


v0.96.0
------------------------------
*April 28, 2021*

### Changed
- Updated notes to reflect PIE design


v0.95.0
------------------------------
*April 26, 2021*

### Added
- Handling of duplicate orders.

### Changed
- Refactored handling order issues.


v0.94.0
------------------------------
*April 23, 2021*

### Changed
- `UPDATE_AUTH_GUEST` mutation now sets `isLoggedIn` to `true`


v0.93.0
------------------------------
*April 20, 2021*

### Added
- Removed alternative method of getting customer details so all access is via the `$State`


v0.92.0
------------------------------
*April 16, 2021*

### Added
- Use AuthToken phone nos. if checkout api fails to return a customer phone no.


### Changed
- Refactored handling order issues.


v0.91.0
------------------------------
*April 14, 2021*

### Added
- Refactored/Aligned logging calls
- Refactored error handling


v0.90.0
------------------------------
*April 13, 2021*

### Changed
- Allowed address line 2 to not exist in PATCH request


v0.89.0
------------------------------
*April 13, 2021*

### Added
- Automatic scrolling to the first inline error when trying to proceed to the payment page.


v0.88.0
------------------------------
*April 12, 2021*

### Changed
- PATCH Checkout now sends null for lines 3 and 4 of address instead of empty string


v0.87.1
------------------------------
*April 12, 2021*

### Changed
- `checkoutTimeout` prop now defaults to ten seconds


v0.87.0
------------------------------
*April 12, 2021*

### Added
- `isGuestCreated` store flag that prevents multiple guest accounts from being created when form is resubmitted after failed validation


v0.86.0
------------------------------
*April 12, 2021*

### Removed
- Hardcoded timeout before redirecting to the payment page.


v0.85.0
------------------------------
*April 8, 2021*

### Added
- `otacToAuthExchanger` prop that provides functionality to exchange OTAC to JWT token for guest checkout.


v0.84.1
------------------------------
*April 8, 2021*

### Added
- Ability to display server errors in Storybook


v0.84.0
------------------------------
*April 6, 2021*

### Added
- Scrolling to the server-side error alert automatically.


v0.83.0
------------------------------
*April 6, 2021*

### Fixed
- Error alert top margin.


v0.82.0
------------------------------
*April 1, 2021*

### Added
- Ability to handle issues which we do not have stored


v0.81.0
------------------------------
*April 1, 2021*

### Added
- Support for running tests on remote `Browserstack`.

### Changed
- Component test file structure to support `Browserstack`.

### Fixed
- Error message component test `isDisplayed` test to search displayed within viewport.


v0.80.1
------------------------------
*April 1, 2021*

### Added
- o-links fozzie classes for the links


v0.80.0
------------------------------
*March 31, 2021*

### Added
- spinnerTimeout prop that defaults to 500ms

### Changed
- Spinner shows after spinnerTimeout instead of hardcoded 1s


v0.79.0
------------------------------
*March 31, 2021*

### Fixed
- Retry modal now closes when errors / issues are returned and the user tries to dismiss the modal.


v0.78.1
------------------------------
*March 31, 2021*

### Changed
- Load `address` into state via new `location` object.


v0.78.0
------------------------------
*March 30, 2021*

### Added
- Custom errors.

### Changed
- The whole handling of exceptions and errors.
- Several functions and tests.

### Removed
- Redundant and unnecessary functions.


v0.77.0
------------------------------
*March 26, 2021*

### Added
- New time object structure for patch call to checkout. (Includes scheduled & asap values).
- Fix up `selector.vue` so times `to/from` are set correctly.


v0.76.0
------------------------------
*March 25, 2021*

### Added
- Tests to test the preorder warning message
- Tests to test the checkout error message
- Supporting code in `Checkout.stories.js` and `f-checkout.component.js` to enable testing in storybook.
- `checkout-available-fulfilment-preorder.json` to support storybook tabs for testing
- Component tests for `Error.vue` component
- Accessibility tests for `Error.vue` component


v0.75.0
------------------------------
*March 19, 2021*

### Added
- Mega modal dialog for when unfulfillable issues are returned from `updateCheckout`
- Constants of all the issues we are expected to receive


v0.74.0
------------------------------
*March 18, 2021*

### Added
- Preorder warning message for `Selector` component.
- Tests to cover changes.


v0.73.0
------------------------------
*March 18, 2021*

### Changed
- `Checkout.vue` watcher `authToken` to only initialise checkout when the token updates as below:
  - Truthy > Falsey
  - Falsey > Truthy
  - Truthy > Truthy (Checkout will not reload)

### Added
- Tests to cover authToken watcher changes.

### Removed
- Some tests that are not required as they're now covered in these new changes.


v0.72.0
------------------------------
*March 18, 2021*

### Changed
- `address.city` to `address.locality` in checkout state.
- `UPDATE_STATE` mutation to use `locality`.
- `getAddress` to use locality.


v0.71.0
------------------------------
*March 16, 2021*

### Changed
- `Checkout.vue` method clean up. Refactor `submitCheckout`.

### Added
- Methods `handleFulfillableContext`, `processOrderNotFulfillable`,
`processOrderIsFulfillable` & `logInfo`.


v0.70.0
------------------------------
*March 15, 2021*

### Changed
- Calling OPAPI's v2.


v0.69.0
------------------------------
*March 12, 2021*

### Added
- Ability to extract customer name from JWT Claims if not retrieved from server


v0.68.1
------------------------------
*March 9, 2021*

### Changed
- Locale usage in storybook


v0.68.0
------------------------------
*March 9, 2021*

### Changed
- Guest checkout header to display correct text.


v0.67.0
------------------------------
*March 9, 2021*

### Added
- Analytics error tracking.
- Tests to cover changes.

### Changed
- `checkout.module` `issues` to `error`.

### Fixed
- Guest field inputs Vuex mutation error.


v0.66.0
------------------------------
*March 5, 2021*

### Changed
- `Checkout.vue` - refactor `onFormSubmit` method and relevant tests.


v0.65.1
------------------------------
*March 5, 2021*

### Fixed
- `UPDATE_CHANGED_FIELD` mutation to sort `changedFields` correctly.


v0.65.0
-------------------------------
*March 4, 2021*

### Changed
- Prevent error page showing when the address call fails
- Logging when the address call does fail


v0.64.0
------------------------------
*March 4, 2021*

### Changed
- `analytics` to `fCheckout.module`.
- `analytics.module` to `fCheckoutAnalytics.module`.

### Removed
- `f-trak` dependency.


v0.63.0
------------------------------
*March 3, 2021*

### Added
- `analytics.module` export.


v0.62.0
------------------------------
*March 3, 2021*

### Changed
- Storybook knobs to be easier to use.
- `open` function for component tests to match changes.

### Removed
- Redundant timeout props.


v0.61.0
------------------------------
*March 2, 2021*

### Added
- `getGeoLocation` to call the location services api.

### Changed
- Called the api during the Submit.
- Mapped the results into the `PATCH` Checkout request model.
- Refactored/Added unit tests.


v0.60.0
-------------------------------
*February 26, 2021*

### Added
- `analytics.module` to store.
- `mapAnalyticsName` and `mapAnalyticsNames` to `mapper` service.
- Analytics tracking to `Checkout` component.
- Tests to cover changes.


v0.59.0
------------------------------
*February 24, 2021*

### Added
- `placeOrder` to call the Order Placement API.
- Redirect to the payment page after the order has been placed.

### Changed
- Restructured component object into page object model
- Refactored component and accessibility tests
- Extracted svgTransform to global test utils for reference by other packages
- How we pass the parameters to the `PATCH` Checkout request.


v0.58.0
-------------------------------
*February 18, 2021*

### Added
- Loading spinner if async requests take over a second


v0.57.0
-------------------------------
*February 15, 2021*

### Added
- Logic to choose closest address for uk tenant


v0.56.2
-------------------------------
*February 12, 2021*

### Fixed
- Endpoint error logging.


v0.56.1
-------------------------------
*February 11, 2021*

### Changed
- Used correct comment format to prevent it being shown on UI


v0.56.0
-------------------------------
*February 11, 2021*

### Added
- logging to `Checkout` and `Header` components.
- Tests to cover changes.


v0.55.0
-------------------------------
*February 11, 2021*
### Added
- Added `vue-svg-loader` to Webpack config

### Changed
- Utilised `vue-svg-loader` for error page SVG


v0.54.0
-------------------------------
*February 10, 2021*

### Added
- `basketTotal` and `restaurantId` to the state, being retrieved from the Basket API.

### Changed
- Now always calling `loadBasket` regardless of if it's a guest or authenticated user.


v0.53.0
-------------------------------
*February 9, 2021*

### Added
- Loading customer address from API endpoint if Checkout endpoint did not return it


v0.52.0
-------------------------------
*February 9, 2021*

### Added
- `updateCheckoutUrl` and `updateCheckoutTimeout` props.

### Changed
- Renamed `checkoutUrl` prop to `getCheckoutUrl`.

### Removed
- `checkoutId` prop.


v0.51.0
-------------------------------
*February 5, 2021*

### Added
- Axios mock to Storybook for checkout PATCH requests.
- PATCH response handling, by adding `issues` and `isFulfillable` to state.


v0.50.0
-------------------------------
*February 5, 2021*

### Added
- `CheckoutSetupGuestSuccess`, `CheckoutSetupGuestFailure`, `CheckoutValidationError` events.
- Tests to cover changes.


v0.49.0
-------------------------------
*February 4, 2021*

### Added
- `Error.vue` component to display a user-friendly error page when we cannot load the necessary information to render the page.
- Test to confirm guest login/sign up link navigates to correct url when clicked


v0.48.0
-------------------------------
*February 4, 2021*

### Added
- Mapper service for creation of checkout PATCH payload.
- Handling of user note and including it in the PATCH request.


v0.47.0
-------------------------------
*February 3, 2021*

### Added
- `f-checkout-guest.spec` files for `guest checkout` tests.
- Guest Checkout tests.

### Changed
- Links directly to test pages have been changed from testing within Storybook to its own page.


v0.46.0
-------------------------------
*February 2, 2021*

### Changed
- Reduce nesting within state by moving `address` and `time` out of `fulfilment`.
- Update checkout URL.
- Flesh out checkout submit data.
- Use `f-form-field@1.8.0` with separate text/value in `dropdownOptions`.
- Checkout method from POST to PATCH.


v0.45.0
-------------------------------
*January 27, 2021*

### Changed
- Only call the Checkout `GET` endpoint when the user is logged in.
- Refactored tests.


v0.44.0
-------------------------------
*January 25, 2021*

### Added
- When the user is not logged in, retrieve serviceType from global basket orchestrator


v0.43.0
-------------------------------
*January 25, 2021*

### Changed
- The package now also exports its module, besides the component, so the consuming application can handle the registration of the Vuex module.

### Removed
- Registration of `checkout.module` from the component.
- Duplicated tests in `Checkout.test.js`.


v0.42.0
-------------------------------
*January 22, 2021*

### Changed
- `f-button` version.
- `Header` component `login` button to use `f-button`.


v0.41.0
-------------------------------
*January 22, 2021*

### Removed
- `Accept-Tenant` header from requests to the `CheckoutApi`.


v0.40.0
-------------------------------
*January 20, 2021*

### Added
- `validations` mixin.
- `Guest` component validations.
- `VALIDATIONS` constant.

### Changed
- `updateAddressDetails` and `updateCustomerDetails` store actions.


v0.39.0
-------------------------------
*January 18, 2021*

### Changed
- `getCheckout` store method passes authentication token to the api endpoint.


v0.38.0
-------------------------------
*January 15, 2021*

### Changed
- Use the latest version of `f-form-field`.


v0.37.0
-------------------------------
*January 14, 2021*

### Added
- `Guest`, `Header` and `TermsAndConditions` components.
- `Checkout` mobile view.

### Changed
- `Checkout` form method.
- `Checkout` card width.
- `Checkout` title and login link into `Header` component.
- `userNote` label.


Latest (roll into next release)
-------------------------------
*January 13, 2021*

### Added
- Test to confirm switch user link is displayed.


v0.36.0
-------------------------------
*January 12, 2021*

### Removed
- Allergen information link.


Latest (add to next release)
------------------------------
*January 12, 2021*

### Changed
- Update axios version for security advisory.
- Use latest version of `f-error-message`.


v0.35.0
-------------------------------
*January 7, 2021*

### Added
- Tests to cover new methods, actions and mutations

### Changed
- Replaced direct state manipulations with mutations and actions


v0.34.1
------------------------------
*January 7, 2021*

### Changed
- Mobile number tests naming convention for `Checkout` component to make clear differences in tests.
- Mobile number test for `Checkout` component to an unused number format.
- Updated the location of the mobile number tests.


v0.34.0
-------------------------------
*January 6, 2021*

### Added
-  Call to create a guest user when submitting checkout form and the user is not authenticated


v0.33.0
------------------------------
*January 6, 2021*

### Added
- Link to the checkout page to allow the user to correct who is logged in.


v0.32.0
------------------------------
*January 5, 2021*

### Changed
- Tests for `Checkout` component methods and computed values.

### Added
- `it-IT` tenant file.


v0.31.0
-------------------------------
*January 5, 2021*

### Changed
- Updated skipped tests to work with Storybook component tests.
- Updated config for latest `sass-loader`.
- Updated fozzie dependencies in `common.scss` to pull in v5-beta.

### Added
- New `clearCheckoutForm` function added to clear the fields in tests in the `f-checkout-component.js` file.


v0.30.0
------------------------------
*December 23, 2020*

### Changed
- props, CSS class, and event descriptions added to `README`.

### Removed
- unused event names.


v0.29.0
------------------------------
*December 23, 2020*

### Added
- `setup` test helper file.
- Tests for `Checkout` component methods.


v0.28.0
------------------------------
*December 22, 2020*

### Added
- Tests for `Address` component.


v0.27.0
------------------------------
*December 21, 2020*

### Added
- Retrieving fulfilment information from a separate endpoint/file.

### Removed
- Watchers for Storybook. Replaced it with an object `:key` containing the different props.


v0.26.0
------------------------------
*December 15, 2020*

### Added
- Tests for store `checkout.module.js`.


v0.25.0
------------------------------
*December 14, 2020*

### Added
- Added 'authToken' property


v0.24.0
------------------------------
*December 14, 2020*

### Changed
- Renamed 'fulfill' occurrences to 'fulfil' to keep in line with the Checkout API.


v0.23.0
------------------------------
*December 11, 2020*

### Changed
- Moved justeat packages to the dev dependencies
- Updated f-button component to the latest (0.4.1)
- Renamed button-component to f-button for concistency between projects


v0.22.0
------------------------------
*December 11, 2020*

### Added
- Webdriver tests for postcode format in `f-checkout-delivery`.


v0.21.0
------------------------------
*December 10, 2020*

### Added
- Webdriver test for phone number format in `f-checkout-delivery`.


v0.20.1
------------------------------
*December 10, 2020*

### Changed
- `f-form-field` version.
- Styling of `Address` fields in error.


v0.20.0
------------------------------
*December 9, 2020*

### Changed
- `f-form-field` version.
- Styling in `Address` component.


v0.19.0
------------------------------
*December 8, 2020*

### Added
- Webdriver tests for dropdown in `Selector`
- Webdriver tests for note-field character limit in `UserNote`

### Changed
- `f-form-field` version.
- `data-test-id` references in tests.


v0.18.0
------------------------------
*December 8, 2020*

### Changed
- `f-services` version.
- Postcode validation.

### Removed
- Spanish Locale from storybook.


v0.17.0
------------------------------
*December 7, 2020*

### Added
- Component tests for 'Collection' prop variant.

### Changed
- Split component tests into separate spec files


v0.16.1
------------------------------
*December 4, 2020*

### Changed
- Updated `Checkout.stories.js` to support new checkoutMock naming for Storybook.


v0.16.0
------------------------------
*December 4, 2020*

### Added
- Page object model constants for css selectors
- New test to check for existence of error messages per field


v0.15.0
------------------------------
*December 3, 2020*

### Added
- Ability to change prop values in demo file for WebDriverIO component tests.
- New `Demo.vue` for f-checkout controls.


v0.14.0
------------------------------
*December 2, 2020*

### Added
- `max-length` to user note.

### Changed
- Phone validation to use `f-services`.
- Styling in `Selector` component.


v0.13.0
------------------------------
*December 1, 2020*

### Changed
- `f-services` version.
- Tests to match the new version of `f-services`.


v0.12.0
------------------------------
*December 1, 2020*

### Changed
- Selector component to use `f-form-field` dropdown component.
- `f-button` version.


v0.11.0
------------------------------
*November 25, 2020*

### Added
- Vuex modules to make state management cleaner and clearer.


v0.10.0
------------------------------
*November 23, 2020*

### Changed
- Updated `f-card`, `f-button`, `f-form-field`, `f-error-message` versions.
- Updated font sizes, padding and layout to match PIE design.


v0.9.0
------------------------------
*November 16, 2020*

### Added
- Checkout component calls server to get data


v0.8.0
------------------------------
*November 12, 2020*

### Added
- Inline error handling to `Checkout` and `Address` components.
- Server side error handling.
- Validations from `f-services`.


v0.7.0
------------------------------
*November 11, 2020*

### Added
- Integration with `f-globalisation`.

### Changed
- The way we run the demo page (used by component tests) so that we can control what we inject into the Vue instance.


v0.6.0
------------------------------
*November 2, 2020*

### Added
- New component tests


v0.5.0
------------------------------
*October 26, 2020*

### Added
- New functionality to component object
- New component tests


v0.4.0
------------------------------
*October 22, 2020*

### Added
- Address component to be displayed if `checkoutMethod` is set to 'Delivery'.
- Stylelint added to lint styling on build.

### Removed
- Address related form fields from `f-checkout`.

### Changed
- Checkout Component to replicate Collection and Delivery in ConsumerWeb.
- Selector to uses `method` prop to change label text.


v0.3.0
------------------------------
*October 21, 2020*

### Changed
- Selector to hide label when time selected.

### Added
- Selector unit tests


v0.2.0
------------------------------
*October 15, 2020*

### Changed
- Layout to replicate ConsumerWeb.


v0.1.0
------------------------------
*October 6, 2020*

### Added
- Component structure and basic configuration (created using `generator-component`).
