# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v2.0.0
------------------------------
*September 27, 2021*

### Changed
- New colour tokens from `pie-design-tokens` in line with icing phase 2.


v1.0.0
------------------------------
*September 16, 2021*

### Removed
- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.


v0.6.0
------------------------------
*May 25, 2021*

### Changed
- CSS variables to use pie design tokens instead of fozzie-colour-palette vars


v0.5.0
------------------------------
*April 26, 2021*

### Changed
- Rename components and classnames


v0.4.0
------------------------------
*March 30, 2021*

### Added
- Restaurant carousel skeleton


v0.3.0
------------------------------
*March 19, 2021*

### Added
- Skeleton components to make restaurant carousel card

### Changed
- Styles to use modules rather than scoped

### Removed
- Removed isAnimated prop


v0.2.0
------------------------------
*March 19, 2021*

### Added
- Text, Heading and Sentence skeleton components rendered via prop
- Animation prop and CSS to animate bones


v0.1.0
------------------------------
*March 15, 2021*

### Added
- Base generated component structure.
