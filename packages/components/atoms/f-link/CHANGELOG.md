# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v0.4.0
------------------------------
*May 27, 2021*

### Removed
- `VueGlobalisationMixin`
- `opensInNewLocation` props

### Changed
- `isExternalLink` prop to `isExternalSite`
- Tests to cover changes.

### Added
- external site aria description.


v0.3.0
------------------------------
*May 25, 2021*

### Changed
- CSS variables to use pie design tokens instead of fozzie-colour-palette vars


v0.2.0
------------------------------
*May 24, 2021*

### Added
- Props `isExternalLink` and `opensInNewLocation` to set `target`, `rel`, and `ariaDescription`.
- Props `isBold`, `isFullWidth`, `noLineBreak` and `hasTextDecoration` to toggle link style.
- Tests to cover changes.


v0.1.0
------------------------------
*May 14, 2021*

### Added
- Generated link component.
