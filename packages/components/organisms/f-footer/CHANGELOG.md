# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v4.8.3
------------------------------
*February 9, 2021*

### Added
- All tenants to a tenant prop for storybook f-footer story
- New modifier css class to fix footer items alignment 


v4.8.2
------------------------------
*February 4, 2021*

### Changed
- AUS Menulog footer links update

### Added
- "McDonald's delivery" to "Brands" section

### Removed
- "Our Price Promise" from "A bit more about us" section


v4.8.1
------------------------------
*January 29, 2021*
### Changed
- Fixed a condition to show country selector

### Added
- Tests to cover this change
- Styles for right aligned footer row


v4.8.0
------------------------------
*January 28, 2021*
### Added
- `showCountrySelector` property to turn it off if there is one in the header


v4.7.0
------------------------------
*January 15, 2021*

### Added
- Added new tests to test courier links are visible based on tenant.

### Changed
- Changes and refactoring to component tests that bypass the use of testing within the Storybook view.


v4.6.1
------------------------------
*January 14, 2021*

### Changed
- Fix broken link for NZ (Menulog)


v4.6.0
------------------------------
*January 12, 2021*

### Changed
- Added extra cuisine link for IT


v4.5.0
------------------------------
*January 12, 2021*

### Changed
- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.
- Fixed typo in IT footer


v4.4.2
------------------------------
*November 10, 2020*

### Changed
- Modern slavery statement link


v4.4.1
------------------------------
*November 3, 2020*

### Changed
- Fix small styling issue with apps icons


v4.4.0
------------------------------
*November 2, 2020*

### Added
- New Huawei icon and link in app links for the UK.


v4.3.0
------------------------------
*October 30, 2020*

### Changed
- New country list in country selector
- New round flag icons in country selector
- Extracted country list from tenants files


v4.2.0
------------------------------
*October 26, 2020*

### Added
- Stylelint added to lint styling on build.

### Changed
- 'jet' theme instead of 'je'
- Removed typo in component test
- Updated dependencies.
- Updated `f-services` imports to use new variables.


v4.1.0
------------------------------
*September 28, 2020*

### Added
- data-test IDs to Footer Component
- Test for Footer Icons
- F-Footer Component-Object

### Changed
- Npm scripts


v4.0.0
------------------------------
*September 24, 2020*

### Changed
- Moving package out of beta now typography has been released.


v4.0.0-beta.1
------------------------------
*September 3, 2020*

### Changed
- Updating footer headings to new JustEatBasis font.


v4.0.0-beta.0
------------------------------
*August 27, 2020*

### Changed
- Uses `JustEatBasis` font and new fozzie font size declarations.


v3.4.0
------------------------------
*July 23, 2020*

### Changed
- Updating component with the latest rebrand phase 3.1 colour changes (and updated internal colour aliases).
- Updated to `v1` of `f-vue-icons`.
- Changing `data-theme` to `data-theme-footer` to avoid clashing with any other components in the future.
- Vue CLI minor package updates.


v3.3.2
------------------------------
*July 10, 2020*

### Changed
- Patch to include latest `f-vue-icons`.


v3.3.1
------------------------------
*July 10, 2020*

### Changed
- Patch to include latest `f-vue-icons`.


v3.3.0
------------------------------
*July 9, 2020*

### Changed
- Updated link to Modern Slavery statement
- Updated footer links to avoid redirects

### Added
- "Leads to external site" to social media link alt text (currently English only)


v3.2.0
------------------------------
*July 9, 2020*

### Changed
- Updated `f-vue-icons` version.
- Made `f-trak` peer dependency use a range value.

### Removed
- Unused `lodash-es` dependency.
- `lodash-es` ignore from jest config.


v3.1.0
------------------------------
*July 2, 2020*

### Added
- Accessibility add-on to Storybook story.


v3.0.0
------------------------------
*June 22, 2020*

### Changed
- Updated component to new orange JET theme for all tenants.
- ESLint autofix turned off (so that tests don't pass due to `--fix` being applied, but then publish subsequently fails).
- Jest config updated to hide style warnings (as we don't need them to be shown for the tests).

### Removed
- Menulog colour theming (typography switch is still needed).


v2.3.0
------------------------------
*June 3, 2020*

### Changed
- Updated component to use new orange JET theme for ML.


v2.2.0
------------------------------
*June 2, 2020*

### Changed
- Include rel="noopener" attr in ButtonList items
- Include target attr/property in LinksList items
- Add rel: 'noopener' to en-GB link item with target: '_blank' property
- Updating `vue-test-utils` to v1 and `@vue/cli-plugin-unit-test` to v4.3.1.
- Use `node current` in unit test Babel config, so that it supports `async > await` properly.
- Structure of Storybook stories changed to CSF (Component Story Format) – the new recommended way to write stories.

### Removed
- `testMatch` from jest config, as not needed.


v2.1.1
------------------------------
*April 20, 2020*

### Added
- `stories` folder that will contain `*.stories.js` files for use with Storybook.

### Changed
- Updated name of component in `index.js` from `Footer` > `VueFooter` (as `Footer` is a reserved word according to linting rules).


v2.1.0
------------------------------
*March 06, 2020*

### Fixed
- Moved v-click-outside handler from button to parent element to prevent the country selector from closing on-click.


v2.0.1
------------------------------
*March 5, 2020*

### Changed
- Update courier footer link URLs for IE (Ireland).
- `jest` config updates. `jsx` removed from transforms (as we don't use) and `transformIgnorePatterns` updated, `common.scss` added to globals loaded in, and `moduleNameMapper` updated to load in scss imports from `common.scss`.
- Skipped test re-added (as it passes when tested).


v2.0.0
------------------------------
*February 19, 2020*

### Changed
- Moving `f-footer` Vue component to be `v2.0.0`.
  If we need to update the old `f-footer` package, those changes can be released on the legacy `v1.x.x` release branch via the [legacy `f-footer` repo](https://github.com/justeat/f-footer).
- Separated out `lint` and `lint:fix` into two tasks (so CircleCI build can run lint task without fixing).


v2.0.0-beta.36
------------------------------
*February 4, 2020*

### Changed
- Default to open state for footer, and then collapse for mobile on mounted. This means the footer links will still be shown if Javascript fails or is disabled.


v2.0.0-beta.35
------------------------------
*January 23, 2020*

### Added
- Icon props mixin so that the app store and base providor icon components can share the props.
- Icon props mixin contains all possible props which can be passed to the icons to prevent stray attributed in the rendered HTML markup.

### Changed
- Removed `required` from props which already have a default value.


v2.0.0-beta.34
------------------------------
*January 10, 2020*

### Removed
- `vue` dependency in component `package.json` as was causing conflicts when imported and the version didn't match the consuming application version.


v2.0.0-beta.33
------------------------------
*December 30, 2019*

### Fixed
- Only load accordions collapsed in mobile
- Set `panelCollapsed` depending on device
- Collapse panels when going from > to < mid.


v2.0.0-beta.32
------------------------------
*December 16, 2019*

### Fixed
- Accordions load in collapsed state


v2.0.0-beta.31
------------------------------
*November 19, 2019*

### Added
- Toggled courier links off with new prop `showCourierLinks`.


v2.0.0-beta.30
------------------------------
*November 13, 2019*

### Added
- Courier links to `IE`.


v2.0.0-beta.29
------------------------------
*November 8, 2019*

### Changed
- `f-services` and other small package updates

### Fixed
- `yarn demo` error in babel config fixed so that `core-js` dependencies use entry paths


v2.0.0-beta.29
------------------------------
- Skipped version, as was published to main branch


v2.0.0-beta.27
------------------------------
*November 7, 2019*

### Removed
- Typography include from styles, as not needed


v2.0.0-beta.26
------------------------------
*October 25, 2019*

### Added
- Updated `UK` brand links.


v2.0.0-beta.25
------------------------------
*October 21, 2019*

### Added
- Updated `NZ`, `DK` & `NO` tenant copy.


v2.0.0-beta.24
------------------------------
*October 17, 2019*

### Added
- `data-test-id` for system testing`


v2.0.0-beta.23
------------------------------
*October 8, 2019*

### Removed
- Methods and added them to `f-services`

### Changed
- New version of `getWindowHeight` to `getWindowWidth`


v2.0.0-beta.22
------------------------------
*September 27, 2019*

### Changed
- Confianza logo to use new svg icon instead of png image


v2.0.0-beta.21
------------------------------
*September 27, 2019*

### Changed
 - Reference to `$i18n` localization library
 - Version of `f-services`


v2.0.0-beta.20
------------------------------
*September 26, 2019*

### Changed
 - Version of `f-services`


v2.0.0-beta.19
------------------------------
*September 25, 2019*

### Changed
 - Import for `f-services` package instead of calling file on the root
 - Updated version of `f-services`


v2.0.0-beta.18
------------------------------
*September 19, 2019*

### Changed
 - Removed css module style call from non-module css class
 - Moved some css styles out of css module to be reusable


v2.0.0-beta.17
------------------------------
*September 18, 2019*

### Changed
 - `babel.config.js` to use `@babel/plugin-proposal-optional-chaining`

### Removed
 - Old calls to scoped methods


v2.0.0-beta.16
------------------------------
*September 9, 2019*

### Changed
- Using CSS modules to apply styles.
- Applied ESLint auto-fix to components.
- Moved legal field image import out of method and inline in the component.
- `v-for` loop keys more robust by updating the key names.


v2.0.0-beta.15
------------------------------
*August 30, 2019*

### Added
- `AppStoreIcon`, `BaseProviderIcon` and `FlagIcon` components

### Changed
- Replace f-vue-icons package with it's demo version
- Added Readme


v2.0.0-beta.14
------------------------------
*August 23, 2019*

### Changed
- Apps links for different tenants according to the latest resources
- Fixed data-trak attribute to be picked up by f-trak


v2.0.0-beta.13
------------------------------
*August 16, 2019*

### Changed
- Fixed syntax in `data-trak` attributes
- Added `is-invisible` class to `data-gtm-feedback` element
- Disabled `vue/html-quotes` eslint rule to resolve json parse errors
- Readme.md file amended


v2.0.0-beta.12
------------------------------
*August 7, 2019*

### Changed
- Small css changes for country selector component
- Updated resource files according to the latest changes


v2.0.0-beta.11
------------------------------
*August 6, 2019*

### Added
- `data-trak` attributes for all the footer links
- `gtm` data in resource files for all the tenants
- `@justeat/f-trak` as a peer dependency

### Changed
- Some AU resource links according to the latest changes in live version of the footer


v2.0.0-beta.10
------------------------------
*August 6, 2019*

### Added
- Styles and `data-gtm-feedback` attr for feedback component


v2.0.0-beta.9
------------------------------
*August 5, 2019*

### Added
- `LegalField` component
- new metaLegalField object in resource files

### Changed
- Some styles fixes for footer rows


v2.0.0-beta.8
------------------------------
*August 1, 2019*

### Added
- `ButtonList` component
- Small styles fixes for IE11
- Some css global variables for MenuLog styles
- `theme` mixin for picking up MenuLog styles
- `@vue/cli-plugin-babel` to the package dev dependencies, it wasn't picked up from the root monorepo level

### Changed
- Restructured AU resource file for new button list block + added empty `linkButtonList` array for other tenants


v2.0.0-beta.7
------------------------------
*August 1, 2019*

### Added
- `CountrySelector` component logic and styles
- `CountrySelector` tests


v2.0.0-beta.6
------------------------------
*July 18, 2019*

### Added
- `yarn demo` command for easier prototyping
- Dependency on `f-vue-icons`
- Make use of `AppStoreIcon`, `BaseProviderIcon` and `ChevronIcon` from `f-vue-icons`
- Generic `IconList` component
- Component styles
- Extend tests for `LinkList` component

### Changed
- Remove `Footer` prefix from most components
- Remove unused fields from resource files and add locale


v2.0.0-beta.5
------------------------------
*July 15, 2019*

### Added
- Tests for LinksList component

### Changed
- Clean up some css class names for Footer component


v2.0.0-beta.4
------------------------------
*July 12, 2019*

### Added
- Imports for fozzie variables, mixins and colours so that they can be used in the styling.
- Add logic for collapsing and styling for FooterList component
- Some base styling for Footer component

### Changed
- Update footer URL for the "Locations" and "Cuisines" sections in Australia(Menulog)


v2.0.0-beta.3
------------------------------
*July 10, 2019*

### Added
- Child components containers for the footer: AppList, CountrySelector, Feedback, PaymentsList, SocialList and LegalField

### Changed
- Structure of the resource files for the lists of links
- Replace googlePlus social link with blog
- Add Italian VAT number


v2.0.0-beta.2
------------------------------
*July 5, 2019*

### Added
- Transferred all footer data from the original f-footer module


v2.0.0-beta.1
------------------------------
*July 4, 2019*

### Added
- `FooterList` container component
- `TestComponentForFooter` wrapper component for local testing
- tenants resource files
- logic to pick up tenants locales either from component's props or vue i18n plugin
- `@justeat/f-footer` to mono repo dependencies, was missed from initial setup


v2.0.0-beta.0
------------------------------
*June 21, 2019*

### Added
- Added initial files.