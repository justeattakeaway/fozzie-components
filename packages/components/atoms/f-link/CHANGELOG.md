# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v2.1.0
------------------------------
*October 25, 2021*

### Added
- Support for `router-link`.
- `isRouterLink` prop.

### Changed
- `href` from implicit attribute to (required) prop.


v2.0.0
------------------------------
*October 5, 2021*

### Changed
- New colour scheme in line with Icing Phase 2.

### Added
- `o-link--distinct` prop to change default link colour (dark grey) to blue.


v1.0.0
------------------------------
*September 16, 2021*

### Removed
- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.


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
