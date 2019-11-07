# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


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
