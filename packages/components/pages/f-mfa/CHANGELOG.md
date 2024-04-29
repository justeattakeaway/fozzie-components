# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v0.25.1

_April 29, 2024_

### Changed

- Bump `@vue/cli-plugin-babel` from v5.0.0 to v5.0.8


## v0.25.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14
- `@vue/cli-plugin-babel` to 5.0.0 to resolve snyk vulnerability

## v0.24.0

_February 9, 2023_

### Added

- Translation content for es, ie and it for use in f-mfa page.

## v0.23.1

_December 12, 2022_

### Added

- `crypto` setup file to handle `getRandomValues` within jest tests. This logical stems from `f-form-field`'s use of UUID.

## v0.23.0

_November 17, 2022_

### Changed

- Heading tag to h1 for accessibility

## v0.22.0

_October 10, 2022_

### Added

- `ci` WebDriverIO scripts in `package.json`.
- Missing component object functions.

## v0.21.0

_September 22, 2022_

### Removed

- Custom Conversation ID Handling - now handled by F-HTTP

## v0.20.0

_September 16, 2022_

### Added

- Tags to all warn/info logs

### Fixed

- Issue of double pushing of the `MFA_VISIBLE` event

## v0.19.0

_September 14, 2022_

### Added

- Translations for en-AU and en-NZ locales.

## v0.18.0

_September 12, 2022_

### Changed

- Changed the GA tracking models shape

## v0.17.0

_September 12, 2022_

### Fixed

- Handling of returnUrl. If missing or invalid, return users to the homepage.
- Simplify test snapshots.

## v0.16.0

_September 8, 2022_

### Added

- Peer dependency on `@justeat/f-link`.

### Changed

- Use f-link component for FAQs link.

## v0.15.0

_September 7, 2022_

### Changed

- Only make a new API call if there isn't one already in flight.
- Move query string validation from CSR to SSR.
- Logs for 400/429 errors to warnings.
- Protect against null/undefined query string values.

## v0.14.0

_September 6, 2022_

### Changed

- Disable the auto complete on the opt field.

## v0.13.0

_September 5, 2022_

### Changed

- Clear the opt field on mount().
- New FAQ url

## v0.12.0

_August 24, 2022_

### Changed

- Added fozzie components as externals in Webpack config.

## v0.11.0

_August 19, 2022_

### Added

- Visual Regression tests.

## v0.10.0

_August 17, 2022_

### Changed

- Changed mfa load success log message to `Info`.
- Help screen primary button text.

### Removed

- Mfa Form field validation/message.

### Added

- GTM events.
- Back button to error screen.

## v0.9.1

_August 11, 2022_

### Changed

- Update `code` regex.

### Added

- Success/failure logs on page load.

## v0.9.0

_August 11, 2022_

### Changed

- Take in the entire MFA `validateUrl` instead of building it up from `smartGatewayBaseUrl`.
- Help link now points to FAQs page.

### Fixed

- Pass `returnUrl` through to Help component.

## v0.8.2

_August 10, 2022_

### Added

- Vertical margin to MFA component.

## v0.8.1

_August 10, 2022_

### Changed

- Prepared the storybook story to handle changing of the properties and simulating the different api responses

## v0.8.0

_August 9, 2022_

### Added

- Help info card/page.

### Changed

- "Need help?" button now points to new help page.

## v0.7.0

_August 9, 2022_

### Changed

- Instead of reading the querystring for our values they are now being supplied as properties

## v0.6.0

_August 8, 2022_

### Added

- Validation of the input data (querystring).
- Error page
- Emit Event upon success with the return url

## v0.5.1

_August 8, 2022_

### Changed

- Primary and secondary action buttons to size large.
- Primary button to full width.

## v0.5.0

_August 2, 2022_

### Added

- Error handling for different status codes.
- Visuals for errors from validation and API.

## v0.4.0

_August 1, 2022_

### Added

- Api provider for call to AccountWeb (`PostChallenge()`)

## v0.3.0

_August 1, 2022_

### Added

- MFA page template to match designs

## v0.2.1

_July 27, 2022_

### Fixed

- ES6 syntax in WebDriverIO tests.
- Tests not async / awaiting commands.

## v0.2.0

_July 25, 2022_

### Added

- Node 16 support.

## v0.1.0

_July 20, 2022_

### Added

- Initial Yeoman Generated Files
