# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


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
