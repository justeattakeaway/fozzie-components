# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v2.0.0-beta.7
------------------------------
*August 01, 2019*

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
- Transferred all footer data from the original f-footer mobule 


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
