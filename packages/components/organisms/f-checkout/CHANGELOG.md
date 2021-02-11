# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v0.55.0
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
*_February 9, 2021_*

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
