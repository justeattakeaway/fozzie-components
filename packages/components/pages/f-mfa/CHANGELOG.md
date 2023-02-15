# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v0.24.0
------------------------------
*February 9, 2023*

### Added
- Translation content for es, ie and it for use in f-mfa page.


v0.23.1
------------------------------
*December 12, 2022*

### Added
- `crypto` setup file to handle `getRandomValues` within jest tests. This logical stems from `f-form-field`'s use of UUID.


v0.23.0
------------------------------
*November 17, 2022*

### Changed
- Heading tag to h1 for accessibility


v0.22.0
------------------------------
*October 10, 2022*

### Added
- `ci` WebDriverIO scripts in `package.json`.
- Missing component object functions.


v0.21.0
------------------------------
*September 22, 2022*

### Removed
- Custom Conversation ID Handling - now handled by F-HTTP


v0.20.0
------------------------------
*September 16, 2022*

### Added
- Tags to all warn/info logs

### Fixed
- Issue of double pushing of the `MFA_VISIBLE` event


v0.19.0
------------------------------
*September 14, 2022*

### Added
- Translations for en-AU and en-NZ locales.


v0.18.0
------------------------------
*September 12, 2022*

### Changed
- Changed the GA tracking models shape


v0.17.0
------------------------------
*September 12, 2022*

### Fixed
- Handling of returnUrl. If missing or invalid, return users to the homepage.
- Simplify test snapshots.


v0.16.0
------------------------------
*September 8, 2022*

### Added
- Peer dependency on `@justeat/f-link`.

### Changed
- Use f-link component for FAQs link.


v0.15.0
------------------------------
*September 7, 2022*

### Changed
- Only make a new API call if there isn't one already in flight.
- Move query string validation from CSR to SSR.
- Logs for 400/429 errors to warnings.
- Protect against null/undefined query string values.


v0.14.0
------------------------------
*September 6, 2022*

### Changed
- Disable the auto complete on the opt field.


v0.13.0
------------------------------
*September 5, 2022*

### Changed
- Clear the opt field on mount().
- New FAQ url


v0.12.0
------------------------------
*August 24, 2022*

### Changed
- Added fozzie components as externals in Webpack config.


v0.11.0
------------------------------
*August 19, 2022*

### Added
- Visual Regression tests.


v0.10.0
------------------------------
*August 17, 2022*

### Changed
- Changed mfa load success log message to `Info`.
- Help screen primary button text.

### Removed
- Mfa Form field validation/message.

### Added
- GTM events.
- Back button to error screen.


v0.9.1
------------------------------
*August 11, 2022*

### Changed
- Update `code` regex.

### Added
- Success/failure logs on page load.


v0.9.0
------------------------------
*August 11, 2022*

### Changed
- Take in the entire MFA `validateUrl` instead of building it up from `smartGatewayBaseUrl`.
- Help link now points to FAQs page.

### Fixed
- Pass `returnUrl` through to Help component.


v0.8.2
------------------------------
*August 10, 2022*

### Added
- Vertical margin to MFA component.


v0.8.1
------------------------------
*August 10, 2022*

### Changed
- Prepared the storybook story to handle changing of the properties and simulating the different api responses


v0.8.0
------------------------------
*August 9, 2022*

### Added
- Help info card/page.

### Changed
- "Need help?" button now points to new help page.


v0.7.0
------------------------------
*August 9, 2022*

### Changed
- Instead of reading the querystring for our values they are now being supplied as properties


v0.6.0
------------------------------
*August 8, 2022*

### Added
- Validation of the input data (querystring).
- Error page
- Emit Event upon success with the return url


v0.5.1
------------------------------
*August 8, 2022*

### Changed
- Primary and secondary action buttons to size large.
- Primary button to full width.


v0.5.0
------------------------------
*August 2, 2022*

### Added
- Error handling for different status codes.
- Visuals for errors from validation and API.


v0.4.0
------------------------------
*August 1, 2022*

### Added
- Api provider for call to AccountWeb (`PostChallenge()`)


v0.3.0
------------------------------
*August 1, 2022*

### Added
- MFA page template to match designs


v0.2.1
------------------------------
*July 27, 2022*

### Fixed
- ES6 syntax in WebDriverIO tests.
- Tests not async / awaiting commands.


v0.2.0
------------------------------
*July 25, 2022*

### Added
- Node 16 support.


v0.1.0
------------------------------
*July 20, 2022*

### Added
- Initial Yeoman Generated Files
