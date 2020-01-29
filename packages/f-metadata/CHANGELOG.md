# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

1.0.2
------------------------------
*January  29, 2020*

### Changed
- Bumped `appboy-web-sdk` because of a known `contentCard` issue in 2.4.0

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
