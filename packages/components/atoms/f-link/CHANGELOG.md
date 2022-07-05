# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v3.2.0
------------------------------
*July 4, 2022*

### Changed
- Update f-wdio-utils to v1.1.0 to use new Axe Core implementation.
- Accessibility tests to be async.
- Specs to ES6 syntax


v3.1.1
------------------------------
*June 21, 2022*

### Changed
- Moved `data-test-id` back to an attribute to avoid issues when stubbing with vue-test-utils.


v3.1.0
------------------------------
*June 17, 2022*

### Added
- `dataTestId` prop, with a default value of `"v-link-component"` to allow custom `data-test-id` attributes.


v3.0.0
-----------------------------
*June 17, 2022*

### Changed
- Update to `@use` and `@forward` SASS syntax


v2.4.0
------------------------------
*June 16, 2022*

### Fixed
- Overly verbose "opens in a new window/screen/tab" translations.


v2.3.1
-----------------------------
*June 13, 2022*

### Removed
- Unneeded `load` and `waitForComponent` functions from component object

### Changed
- Bumped wdio version and fixed breaking changes.
- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.


v2.3.0
------------------------------
*November 8, 2021*

### Added
- Support for custom link CSS class via `link-class` attribute. Also ensures other `$attrs` are bound to the component not the wrapper.


v2.2.0
------------------------------
*October 27, 2021*

### Removed
- `isRouterLink` and `href` props, in favour of deferring to `$attrs`.


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
