# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v0.3.2
------------------------------
*March 2, 2021*

### Fixed
- Protocol missing from image request.

v0.3.1
------------------------------
*March 2, 2021*

### Fixed
- `shouldHideBanner` data property defaults to `true` in order to avoid flash of cookie banner after it has been dismissed.

v0.3.0
------------------------------
*February 25, 2021*

### Changed
- Update tests to use js-cookie.
- Update legacy cookie value
- Remove f-globalisation mixin

v0.2.0
------------------------------
*February 17, 2021*

### Changed
- Use js-cookie instead of universal-cookie.

### Removed
- Remove Storybook 'knob' for setting legacy banner.

v0.1.2
------------------------------
*February 12, 2021*

### Changed
- Set `isIosBrowser` property on page mount so that we can avoid using `process` check which caused issues with SSR.
- Minor lint updates.
- Moved legacy banner check into computed property in order to avoid the flash of the modern cookie banner on page load.

v0.1.1
------------------------------
*February 11, 2021*

### Changed
- Amend class name on legacy banner
- Move legacy banner out of overlay
- Include hide class for legacy banner
- Wrap `navigator` call in conditional for `process.browser`

v0.1.0
------------------------------
*February 3, 2021*

### Added
- Initial commit
