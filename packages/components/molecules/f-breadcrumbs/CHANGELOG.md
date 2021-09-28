# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v2.0.0
------------------------------
*September 29, 2021*

### Changed
- New colour scheme and border radius from `pie-design-tokens` in line with icing phase 2.


v1.0.0
------------------------------
*September 16, 2021*

### Removed
- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.


v0.3.0
------------------------------
*May 25, 2021*

### Changed
- CSS variables to use pie design tokens instead of fozzie-colour-palette vars
- Restructured component object into page object model
- Refactored component tests


v0.2.0
------------------------------
*February 02, 2021*

### Added
- Added styles, component structure and updated story.


v0.1.0
------------------------------
*January 20, 2021*

### Added
- Added the generated output to start component
