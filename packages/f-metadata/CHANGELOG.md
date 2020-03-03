# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

2.3.0
------------------------------
*March  2, 2020*

### Changed
- Callback with `null` if `apiKey` or `userId` is not defined.
- Return before SDK import if dependencies are not available.


2.2.0
------------------------------
*February  20, 2020*

### Added
- Jest configuration and unit tests for both server and client.

### Changed
- Promisify `f-metadata` initialisation and improve error handling.
- Callback resolve with the appboy instance.


2.1.0
------------------------------
*February  18, 2020*

### Changed
- Call `handleContentCards` with an empty array if no content cards are available, enabling any side effects once Braze is called.


2.0.0
------------------------------
*February  10, 2020*

### Changed
- Callback methods are now called with the whole appboy instance ensuring functionality is available on the appboy instance whenever a refresh is called. This also means that the callback will always return an object even when no content cards are available. Further instructions and upgrade instructions can be found in the [README](README.md).


1.0.4
------------------------------
*February 10, 2020*

### Fixed
- Ensure that `handleContentCards` callback has been set before attempting to call it.


1.0.3
------------------------------
*January  29, 2020*

### Added
- `requestContentCardsRefresh()` call back as on some page refreshes it fails to invoke sync.


1.0.2
------------------------------
*January  29, 2020*

### Changed
- Bumped `appboy-web-sdk` because of a known `contentCard` issue in 2.4.0

### Removed
- `requestContentCardsRefresh()` unnecessary call.

### Fixed
- `ContentCard` - Not displaying on initial first load due to appboy `sync`
calls happening before the sdk is ready to update the
`ab.storage.cc.[api-key]` in localStorage. Now using `subscribeToContentCardsUpdates` to listen
for updates.


1.0.1
------------------------------
*November 18, 2019*

### Fixed
- GTM event loading issues


v1.0.0
------------------------------
*November 15, 2019*

### Added
- Support for handling content cards through SDK methods
- User ID to `initialiseBraze` function
- Support for GTM with Braze

### Changed
- Changing Braze to be a dynamic import
- Don't bundle `f-metadata`, leave that to the consuming component.


v0.3.0
------------------------------
*October 4, 2019*

### Added
- Babel config (as wasn't transpiling ES functionality)


v0.2.0
------------------------------
*October 2, 2019*

### Added
- `disable` toggle added to disable Braze


v0.1.0
------------------------------
*September 19, 2019*

### Added
- Created package
- Enabling initialisation of Braze
