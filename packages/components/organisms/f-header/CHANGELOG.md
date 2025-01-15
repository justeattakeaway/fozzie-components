# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v10.22.0

_Jan 15, 2025_

### Changed

- Update and remove deprecated account pages links from user navigation

## v10.21.1

_July 05, 2024_

### Changed

- Updated `@justeat/f-button@5.x` due to Node compatibility

## v10.21.0

_June 24, 2024_

### Added

- New prop `globalTrackingContexts` which are passed through to f-trak for analytics events.
- Use `f-trak` v1+

## v10.20.0

_May 16, 2024_

### Changed

- Stop Portugal, Romania, and New Zealand support.
- Support new country Slovakia.

## v10.19.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14
- `maxBundleSize` from 46 to 55kB

## v10.18.0

_February 21, 2024_

### Changed

- Updated `deliveryEnquiry` links for UK, AU, NZ, ES & IT.

## v10.17.0

_November 24, 2023_

### Changed

- Added translations (which also enables) for 'Become a courier' links for AU & NZ.

## v10.16.0

_November 15, 2023_

### Changed

- Added translations (which also enables) for corporate ordering links for ES & IT.

## v10.15.0

_June 23, 2023_

### Changed

- Update /member links to /account.

## v10.14.0

_April 17, 2023_

### Changed

- Update delivery enquiry link for UK.

## v10.13.0

_March 27, 2023_

### Changed

- New focus styles - these require the new colour tokens from `pie-design-tokens` which are included in `fozzie` v11+.
- Use CSS Grid in the country selector to avoid issues with CSS overflow between columns.
  - This has the side effect of reordering the countries, they now wrap by row rather than by column.
- Use NavLink component for logout link for consistency and to fix keyboard navigation bug (see below).
- Styles for "Skip to main content" link to make it easier to see and read.

### Added

- `onFocus` and `onBlur` function props to internal NavLinks component to help fix a bug where Shift-Tabbing from the logout link back into the user panel would cause the user panel to close.

### Removed

- Now-unused `$nav-trigger-focus-color` SCSS variable.

## v10.12.0

_February 23, 2023_

### Fixed

- Country selector chevron flashing on page load
- Nav toggle icon flashing on page load.

### Changed

- Updated to the new `pie-icons-vue` beta release.

## v10.11.0

_November 23, 2022_

### Added

- "Corporate Ordering" to AU & NZ

## v10.10.1

_November 21, 2022_

### Fixed

- Linting errors

## v10.10.0

_November 3, 2022_

### Added

- "Deliver With Just Eat" to ES & IT

### Changed

- Update Nav Icons to small variants
- Moved `hide-on-mid` to fozzie under `u-hideOnMid`

## v10.9.0

_November 1, 2022_

### Fixed

- JE Logo vertical positioning.
- Country text & logo alignment in country selector

### Changed

- Friendly Name Truncation Tweak Points

### Added

- `showCorporateLink` - Shows "Corporate Ordering" Link.
- `isCondensed` - A flag to hide icons, reduce spacing between nav-links on mid size, reduce container padding on tweak points and apply stricter friendly name truncation.

## v10.8.0

_November 1, 2022_

### Changed

- Product Orange update (package release to update the compiled CSS)

## v10.7.0

_September 7, 2022_

### Fixed

- Log out clickable area not allowing users to logout properly.

### Added

- Cursor pointers to `countrySelector` and `userNavigationPanel` components.

## v10.6.2

_September 6, 2022_

### Fixed

- Analytics order count URL.

## v10.6.1

_August 18, 2022_

### Changed

- Truncation now uses fozzie `truncate()` mixin (compiled CSS is exactly the same).

## v10.6.0

_August 17, 2022_

### Fixed

- Friendly name now gets truncated at longer lengths on narrower screen widths. Previously, for longer names it would cause the navigation links to wrap onto two lines just above the mid breakpoint (>769px).

## v10.5.0

_July 29, 2022_

### Added

- Node 16 compatible version of `@justeat/f-popover`.
- Node 16 compatible version of `@justeat/f-button`.

## v10.4.0

_July 26, 2022_

### Added

- Node 16 compatible dependencies

## v10.3.0

_July 25, 2022_

### Added

- Node 16 support.

## v10.2.1

_July 13, 2022_

### Changed

- Background of the "whiteSeamless" theme
- Renamed "disappearingWhite" into "whiteSeamless"

## v10.2.0

_July 13, 2022_

### Added

- Theme "disappearingWhite" to support header on Search

## v10.1.0

_July 7, 2022_

### Changed

- Update f-wdio-utils to v1.1.0 to use new Axe Core implementation.
- Accessibility tests to be async.

## v10.0.0

_June 28, 2022_

### Changed

- **_ Breaking change _** Update to `@use` and `@forward` SASS syntax.

## v9.17.1

_June 27, 2022_

### Changed

- `maxSize` to prevent bundlewatch failure.

## v9.17.0

_June 24, 2022_

### Changed

- devDependency version range to match peerDependencies.

  9.16.1

---

_June 21, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v9.16.0

_May 19, 2022_

### Removed

- `border-radius` in `Header.vue`

### Changed

- padding in `countrySelectorPanel.vue`

## v9.15.0

_May 12, 2022_

### Added

- `@justeattakeaway/pie-icons-vue` icons.
- `Help` icon.
- `Chevron` icon to country selector.

### Changed

- Hamburger and `Gift` icon colours in mobile view.
- Padding and margin changes to accommodate new icons.

## v9.14.0

_April 25, 2022_

### Fixed

- Accessibility country selector announcement on small screens.

## v9.13.1

_April 14, 2022_

### Changed

- small CSS refactor
- padding in `UserNavigationPanel`

## v9.13.0

_April 12, 2022_

### Changed

- added font size and color to nav buttons
- refactored `UserNavigationPanel` to take in `NavLink` component

## v9.12.0

_April 11, 2022_

### Changed

- CSS change to add hover to button

## v9.11.0

_April 8, 2022_

### Changed

- Interactive states of component (focus, active and hover)

## v9.10.1

_April 7, 2022_

### Fixed

- User Profile Icon changed to using v-if rather than `is-hidden` class to hide it.
- `showCountrySelector` added to `hasNavigationLinks` property so that it appears if only that prop is set to `true`.

## v9.10.0

_March 30, 2022_

### Changed

- Version of `f-popover`

## v9.9.0

_March 23, 2022_

### Added

- `lang` attribute to country selector links.

## v9.8.0

_March 23, 2022_

### Changed

- corner radius when navigation is closed on mobile view
- horizontal navigation when using a tablet
- padding and bottom-border in account popover
- padding of header container above mid

## v9.7.0

_March 16, 2022_

### Changed

- component to match latest designs

_February 23, 2022_

### Changed

- a11y tests to use storybook controls

## v9.6.0

_February 11, 2022_

### Changed

- box-shadow values to use the elevation token from the pie-design-tokens.

## v9.5.0

_February 4, 2022_

### Changed

- Version of `f-button` & `f-popover`.
- Upgraded to ESLint v8

## v9.4.0

_January 28, 2021_

### Updated

- f-vue-icons to the latest (3.4.0) to fix jet logo rendering.

## v9.3.0

_January 20, 2021_

### Added

- Tests for `UserNavigationPanel`'s computed property `tabIndex`.
- `aria-label` to user account submenu button.

### Fixed

- User menu was not visibly toggling with keyboard navigation.

### Changed

- User account submenu link to button for increased accessibility.
- Screen readers will now announce the country selector title, e.g., "Select your country".
- Reorganised and rewritten some of the Navigation unit tests.

## v9.2.0

_December 20, 2021_

### Removed

- 'ml' theme override for Logo.
- width css definition from logo icon to make sure that icons for different tenants (je and ml) are rendered correctly with same height.
- nb-No and da-DK from copy, storybook story and tests.

### Changed

- Fixed Logo tests.

## v9.1.0

_December 14, 2021_

### Added

- Jet logo support via `shouldUseJetLogo` prop.

### Updated

- f-vue-icons to the latest (3.3.0).

### Removed

- Arrow button size override from mobile country selector as with the latest version of f-vue-icons arrow doesn't have a transparent spacing around it.

## v9.0.0

_December 13, 2021_

### Added

- **Breaking Change**: Added `f-button` and `f-popover` dependencies to peer dependencies. Now `f-button` and `f-popover` should be included as a dependency of the consuming component or application.

### Removed

- **Breaking Change**: Removed `f-button` and `f-popover` styles import from the component. Make sure to import `f-button` and `f-popover` styles in your application.

## v8.0.0

_December 9, 2021_

### Changed

- Make icons visible in mobile nav for highlight theme.

### Added

- (BREAKING) `tallBelowMid` prop to support taller header for mobile viewports (currently used in highlight theme).
- Supporting visual regression tests.

## v7.3.0

_December 6, 2021_

### Added

- Support for custom links in the nav via `customNavLinks` prop.
- Visual tests (currently skipped because of [storybook issue](https://github.com/storybookjs/storybook/issues/14420)).

### Changed

- Story now uses controls instead of knobs.

## v7.2.0

_December 1, 2021_

### Changed

- Extracted NavLink component
- Extracted CountrySelector component
- Pull some styles out of `Navigation.vue` into `navigation.scss` and extracted components.
- Extract some f-trak object creation into a service

## v7.1.1

_November 19, 2021_

### Changed

- Replaced ES exports with node exports to allow external applications to access the components.

## v7.1.0

_November 1, 2021_

### Changed

- Mobile menu tab functionality to ensure hidden content is not focussed when tabbing and focus loops.

## v7.0.1

_October 15, 2021_

### Changed

- Updated version of `f-button`.

## v7.0.0

_October 5, 2021_

### Changed

- `$color-support-brand` pie value to `$color-support-brand-01` in line with icing phase 2.
- New colour scheme and border-radius from `pie-design-tokens` in line with icing phase 2.
- Updated version of `f-button` and `f-popover`.

## v6.0.0

_September 16, 2021_

### Changed

- Updated version of `f-button` and `f-popover`.

### Removed

- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.

## v5.0.0

_September 15, 2021_

- Return beta to master. Component has JETSansDigital font.

## v5.0.0-beta.1

_September 1, 2021_

### Changed

- `f-button` to v2.0.0-beta.0 which use the new font.

## v5.0.0-beta.0

_August 26, 2021_

### Updated

- New font JETSansDigital.

## v4.20.0

_August 26, 2021_

### Changed

- Updated version of f-button.

### Fixed

- Ensure main navigation and country selector links are hidden from screen readers when visually hidden.

## v4.20.0

_September 2, 2021_

### Changed

- Updated version of f-button.

### Fixed

- Ensure main navigation and country selector links are hidden from screen readers when visually hidden.

## v4.19.1

_July 22, 2021_

### Changed

- Updated version of `f-button`.

### Fixed

- 'Contact Preferences' URL for en-IE tenant.

## v4.19.0

_June 17, 2021_

### Added

- Visual regression tests

## v4.18.0

_June 17, 2021_

### Changed

- "Deliver with Just Eat" link

## v4.17.2

_June 15, 2021_

### Fixed

- fix nav links colour when profile dropdown is open

## v4.17.1

_June 4, 2021_

### Fixed

- Update expected URL for BE and LU

### Changed

- Use domain names in country selector tests

## v4.17.0

_May 25, 2021_

### Changed

- CSS variables to use pie design tokens instead of fozzie-colour-palette vars

## v4.16.0

_May 12, 2021_

### Added

- Ability to disable Just Eat logo navigation

## v4.15.0

_May 6, 2021_

### Removed

- `is-visuallyHidden`, `is-hidden`, `is-hidden--noJS`, `is-shown`, `is-shown--noJS` css style definition as should come from `fozzie`

### Added

- Focus styles for navigation links for transparent and orange header versions
- Tagging for future Percy tests

## v4.14.0

_May 4, 2021_

### Changed

- replace `border-bottom` with `box-shadow` to reflect the design

## v4.13.0

_April 16, 2021_

### Changed

- Convert `Header` component to use css modules.
- Convert `Navigation` component to use css modules.
- Unit and Component tests to support changes.

## v4.12.0

_April 14, 2021_

### Changed

- Add shared `nav.scss` file.
- Convert `CountrySelectorPanel`, `Logo`, `SkipToMain` and `UserNavigationPanel` components to use css modules.
- Unit and Component tests to support changes.

## v4.11.2

_March 13, 2021_

### Fixed

- Fixed typo in Italian header

_April 9, 2021_

### Changed

- Refactored large country selector test into two separate tests
- Added string placeholder to tenant component tests

_March 31, 2021_

### Added

- Component tests for locales `au, dk, ie, es, no, it, nz`
- Component test for offers icon in mobile spec
- Accessibility tests for the above locales

### Changed

- Small refactor to `open` function in component-object

## v4.11.1

_March 16, 2021_

### Changed

- Small css amends to the mobile menu and country selector button

## v4.11.0

_March 15, 2021_

### Changed

- Media queries to pick up 768px width to render mobile view for tablet devices
- `f-popover` package version bump
- Fixed the tests for offers link
- Mobile nav view to show offers and delivery links to have the same experience as on SiteCore header nav

### Added

- Unique keys for each link in `countryList.js`

## v4.10.0

_March 12, 2021_

### Added

- Browserstack test config in `package.json`

### Changed

- Restructured component tests to support Browserstack

## v4.9.0

_March 4, 2021_

### Added

- `@justeat/f-popover` component
- `CountrySelectorPanel` component
- `UserNavigationPanel` component
- Main menu title for all the tenants for screen readers

### Updated

- `@justeat/f-button` updated to v1.1.0
- tests to cover the changes

### Removed

- `CountrySelector` component

## v4.8.0

_February 24, 2021_

### Changed

- f-button and f-vue-icons packages version bump
- Country selector buttons updated
- Language specified for french link for Canada in country selector

## v4.7.0

_February 11, 2021_

### Added

- Country selector component tests
- dataTestKeys into country selector component
- All tenants to a tenant prop for storybook f-header story

### Changed

- component tests to use page object model

## v4.6.0

_January 27, 2021_

### Added

- Country selector

### Changed

- Check not only that `showOffersLink` if true but that there is offers content to show offers link
- Header icons to match new designs

## v4.5.0

_January 18, 2021_

### Changed

- Default value of `showOffersLink` to `false`.

## v4.4.0

_January 7, 2021_

### Changed

- Updated Webdriver test-utils to include `selector` file.
- Refactored component tests.
- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.

## v4.3.0

_December 1, 2020_

### Changed

- 'jet' theme instead of 'je'
- Added prop to allow skip link to be disabled.

## v4.2.0

_October 26, 2020_

### Changed

- Don't fetch user details when showUserInfo prop is false.
- Use `axiosServices` from `f-services` instead of axios.
- Use latest `f-vue-icons`.

### Added

- Stylelint added to lint styling on build.

## v4.1.0

_September 28, 2020_

### Added

- Property to show/hide the Help link.

### Changed

- Hamburger icon. Hide it if there are no visible links to be shown.
- Storybook property from free text to boolean for "Show login/user info".

## v4.0.0

_September 14, 2020_

### Changed

- Moving header components out of `beta` state as now released.

## v3.9.0

_September 14, 2020_

### Changed

- Directory of component UI test specs

## v4.0.0-beta.1

_August 28, 2020_

### Changed

- Rebase latest master onto beta release.

## v4.0.0-beta.0

_August 27, 2020_

### Changed

- Uses `JustEatBasis` font and new fozzie font size declarations.

## v3.8.0

_September 1, 2020_

### Added

- WebDriverIO component tests

## v3.7.0

_August 26, 2020_

### Added

- Added new prop on header & navigation to allow hiding of login / user icon in navigation.

## v3.6.0

_August 19, 2020_

### Changed

- Changed folder structure for test utils.

## v3.5.0

_July 23, 2020_

### Changed

- Updating logo colour to orange and new colour changes for Rebrand phase 3.1
- Changing `data-theme` to `data-theme-header` to avoid clashing with any other components in the future.
- Vue CLI minor package updates.

## v3.4.1

_July 16, 2020_

### Changed

- Updating `f-vue-icons` version and some dependency updates.

## v3.4.0

_July 14, 2020_

### Changed

- Fix `f-header` regression with api response for user details.
- Added `?testuser` Demo mocks.
- Updated README.md with Demo mock details.

## v3.3.0

_July 9, 2020_

### Changed

- Updated `f-vue-icons` version.
- Made `f-trak` peer dependency use a range value.

### Removed

- Unused `lodash-es` dependency.
- `lodash-es` ignore from jest config.

## v3.2.0

_July 2, 2020_

### Added

- Accessibility add-on to Storybook story.

## v3.1.0

_July 2, 2020_

### Changed

- Updated logo and header background highlight colour to red to enable phased rollout of JET theme.
- Changed logic for the header background & logo logic, as there was a bug when the navigation was in highlight mode and was open.
- Updated theme to add Menulog orange branding in for the logo.

## v3.0.0

_June 25, 2020_

### Changed

- Updated component to new orange JET theme for all tenants.
- Demo component updated to reflect same structure im other packages.
- Minor package updates.

## v2.6.0

_June 9, 2020_

### Changed

- Updated Menulog header to switch to white logo when using transparent background header theme.

## v2.5.0

_June 8, 2020_

### Changed

- New Menulog JET updates (logo and colours).
- Structure of Storybook stories changed to CSF (Component Story Format) – the new recommended way to write stories.
- ESLint autofix turned off (so that tests don't pass due to `--fix` being applied, but then publish subsequently fails)

## v2.4.0

_May 12, 2020_

### Fixed

- Have added proper mocking for API data via `axios`. Quite a few of the tests were trying to call API endpoints and were passing without actually testing anything (but passed giving the impression they were). Have fixed this now so that these tests all work as expected with proper mocks.
- Fixed some tests that broke when upgrading to the latest `vue-test-utils`.

### Changed

- Updated some of the methods that handle API calls to return as promises, so that they are easier to unit test.
- Updating `vue-test-utils` to v1 and `@vue/cli-plugin-unit-test` to v4.3.1.
- Use `node current` in unit test Babel config, so that it supports `async > await` properly.

### Removed

- `testMatch` from jest config, as not needed.

## v2.3.0

_May 6, 2020_

### Fixed

- Add `userInfo` back to data so that it can be updated after the AJAX call is performed.
- Watch the value of `userInfoProp` so that when it changes the `userInfo` data property is also updated.
- Ran lint fix task.

## v2.2.1

_May 1, 2020_

### Changed

- exports in `f-header.page.js` to CommonJS syntax

## v2.2.0

_April 29, 2020_

### Added

- `page-objects` folder for use with our WebDriverIO tests within the Nuxt app

### Changed

- Made f-header `userInfo` data more generic

## v2.1.1

_April 20, 2020_

### Added

- `stories` folder that will contain `*.stories.js` files for use with Storybook

### Changed

- Updated name of component in `index.js` from `Header` > `VueHeader` (as `Header` is a reserved word according to linting rules)

## v2.1.0

_March 11, 2020_

### Changed

- Case of "For you" navigation copy to match original designs.

### Removed

- Temporary feature toggle for the "For you" copy change.

## v2.0.2

_March 3, 2020_

### Changed

- Run `yarn` on prepublish
- `jest` config updates. `moduleNameMapper` removed, `jsx` removed from checks (as we don't use) and `transformIgnorePatterns` updated.

## v2.0.1

_February 19, 2020_

### Added

- `@justeat/browserslist-config-fozzie` added to `peerDependencies`

### Changed

- Separated out `lint` and `lint:fix` into two tasks (so CircleCI build can run lint task without fixing)

## v2.0.0

_February 13, 2020_

### Added

- Styles for displaying red header without gradient
- Prop to render red header

### Changed

- **Breaking Change**: `isTransparent` Prop deprecated for `headerBackgroundTheme`. `headerBackgroundTheme` accepts `red` `transparent` and `white`(default) as properties.
- Moving `f-header` Vue component to be `v2.0.0`.
  If we need to update the old `f-header` package, those changes can be released on the legacy `v1.x.x` release branch via the [legacy `f-header` repo](https://github.com/justeat/f-header).

## v2.0.0-beta.39

_February 12, 2020_

### Changed

- Add temporary feature flag to 'For You' updates

## v2.0.0-beta.38

_February 12, 2020_

### Changed

- Change offers copy to 'For You'
- Change offers icon to gift

## v2.0.0-beta.37

_Feb 11, 2020_

### Changed

- Saved cards' URL to avoid an unnecessary redirect.

## v2.0.0-beta.36

_February 5, 2020_

### Removed

- `created` hook call and replaced show and hide with css helpers.

## v2.0.0-beta.35

_February 4, 2020_

### Changed

- Moved `resize` method to be called within created hook.

## v2.0.0-beta.34

_January 17, 2020_

### Changed

- Use `data-trak` instead of `data-gtm`.

## v2.0.0-beta.33

_January 16, 2020_

### Added

- `data-gtm` attributes for the Offers inbox icons

### Removed

- `data-trak` attributes for the Offers inbox icons
- Now-defunct copy

## v2.0.0-beta.32

_December 3, 2019_

### Added

- Link to offers page
- Translations for Offers page link

## v2.0.0-beta.31

_December 3, 2019_

### Fixed

- DOM inconsistency caused by SSR issue when trying to calculate screen width on server
- Opaque header when tabbing out of nav with narrow viewport

## v2.0.0-beta.30

_November 15, 2019_

### Changed

- Set homepage as fallback return URL

## v2.0.0-beta.29

_November 14, 2019_

### Changed

- Encode current path for `returnUrl` rather than route name

## v2.0.0-beta.28

_November 11, 2019_

### Fixed

- Set correct class on navToggle

## v2.0.0-beta.27

_November 8, 2019_

### Changed

- Tenant urls for login and logout
- `returnUrl` method

## v2.0.0-beta.26

_November 8, 2019_

### Changed

- `f-services` and other small package updates

### Fixed

- `yarn demo` error in babel config fixed so that `core-js` dependencies use entry paths

## v2.0.0-beta.25

_November 7, 2019_

### Removed

- Typography include from styles, as not needed

## v2.0.0-beta.24

_October 24, 2019_

### Changed

- Copy on `NO` and `DK`

## v2.0.0-beta.23

_October 21, 2019_

### Changed

- CSS to fix mobile scrolling.

## v2.0.0-beta.22

_October 18, 2019_

### Added

- Pointer events rule to header gradient so that links displayed underneath the gradient are able to be clicked.
- New styles to the `.c-nav-toggle` class.

## v2.0.0-beta-21

_October 10, 2019_

### Changed

- The way data is passed around in the order count logic

### Added

- Tests for order count logic

## v2.0.0-beta-20

_October 9, 2019_

### Changed

- Prop default and value for `errorLog`

## v2.0.0-beta-19

_October 8, 2019_

### Changed

- New version of `getWindowHeight` to `getWindowWidth`
- Italian tenant that was wrong

## v2.0.0-beta-18

_October 7, 2019_

### Added

- New version of `f-services`

## v2.0.0-beta-17

_October 3, 2019_

### Added

- New version of `f-services`

## v2.0.0-beta-16

_October 1, 2019_

### Added

- New methods added for getting and setting local storage with order count `setAnalyticsBlob` and `getLocalAnalyticsBlob`
- New method added for saving the users data `saveUserData`
- New method added for pushing the user data to the windows data layer `pushUserData`
- New method for fetching the order count through GET request `fetchOrderCountAndSave`
- new method for updating the order count `enrichUserDataWithCount`

### Removed

- Methods and added them to `f-services`

## v2.0.0-beta-15

_September 27, 2019_

### Changed

- Reference to `$i18n` localization library
- Added prop for `userInfoUrl`

## v2.0.0-beta-14

_September 26, 2019_

### Changed

- Updated version of `f-services`

## v2.0.0-beta-13

_September 26, 2019_

### Changed

- Condition against data in `getUserInfo`

## v2.0.0-beta-12

_September 25, 2019_

### Changed

- Import for `f-services` package instead of calling file on the root
- Updated version of `f-services`

## v2.0.0-beta-11

_September 25, 2019_

### Added

- `no-js` css for mobile hamburger menu

### Changed

- Styling for mobile open menu state header when transparent

## v2.0.0-beta-10

_September 20, 2019_

### Changed

- Name of method from `setUserDetails` to `fetchUserInfo`

### Added

- New prop for `userInfo` coming from outside the component
- Logic to call the data if prop is `false`

## v2.0.0-beta-9

_September 20, 2019_

### Changed

- Props in `Navigation.vue`

### Added

- New logic to return URL for login and logout
- Added new computed function to get `userInfo`
- Axios for GET request

## v2.0.0-beta-8

_September 20, 2019_

### Added

- Added some accessibility improvements to the navigation component

## v2.0.0-beta-7

_September 18, 2019_

### Changed

- `babel.config.js` to use `@babel/plugin-proposal-optional-chaining`

### Removed

- Old calls to scoped methods

## v2.0.0-beta-6

_September 18, 2019_

### Changed

- Added tests for the navigation component
- Added new snapshot

## v2.0.0-beta-5

_September 18, 2019_

### Changed

- Add a logic to hide "Deliver with Just Eat" link from mobile screen size
- DeliveryEnquiry gtm label changed to be 'click_courier_signup'

### Removed

- Cleaned up unused css styles

## v2.0.0-beta-4

_September 16, 2019_

### Added

- Styles for the header component
- Some ml css variable overrides
- User email rendering for mobile view

## v2.0.0-beta-3

_September 13, 2019_

### Added

- Navigation component
- `f-trak` attributes to the links

### Changed

- Resource files updated with the navigation links
- `@justeat/f-vue-icons` package updated to contain latest header icons

## v2.0.0-beta-2

_September 10, 2019_

### Added

- SkipToMain component

### Changed

- Made `is-transparent` property to be not required with default `false` value

## v2.0.0-beta-1

_September 5, 2019_

### Added

- Logo component
- Tenants resource files
- Vue.config.js for rewriting default vue cli webpack config
- common.scss base styles imports
- theme and locale logic for Header component (later will be moved to independant package because it repeats in footer and searchbox already)

## v2.0.0-beta-0

_September 4, 2019_

### Added

- Initial setup of f-header vue component
