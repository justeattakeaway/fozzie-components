# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v3.3.1

_April 29, 2024_

### Changed

- Bump `@vue/cli-plugin-babel` from v5.0.0 to v5.0.8


## v3.3.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

## v3.2.1

_March 27, 2023_

### Changed

- Increase bundlewatch maxBundleSize from 5 to 6kB.

## v3.2.0

_July 19, 2022_

### Added

- Node 16 support.

## v3.1.0

_July 5, 2022_

### Changed

- Update f-wdio-utils to v1.1.0
- Update component objects / specs to use ES6 syntax.

## v3.0.0

_June 20, 2022_

### Changed

- Update to `@use` and `@forward` SASS syntax

## v2.0.1

_June 9, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

_May 26, 2022_

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v2.0.0

_September 16, 2021_

### Added

- New MDX documentation for showing use cases as example for new storybook upgrade

### Removed

- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.

## v1.0.0

_July 2, 2021_

### Added

- Added new prop called flex, which allows custom flex rules when implementing

### Removed

- removed stackOnNarrow as we now allow breakpoints to be passed into flex prop
- removed stacked as we now allow breakpoints to be passed into flex prop
- removed reverse as we now allow reverse to be passed into flex prop

## v0.4.0

_June 21, 2021_

### Added

- stackWhenNarrow prop to stack when on device sizes <=narrowMid
- `white-space: pre-line` to enable newlines to be preserved when used in title or text
- Additional unit tests for new features

### Fixed

- Styling fix to make sure reverse prop works when not in stacked mode

## v0.3.0

_June 9, 2021_

### Added

- Slot to enable additional content to be displayed below the text and title
- Unit tests to test the classes appear when props are set
- Unit test for checking slot content works

### Changed

- Restructured component object into page object model
- Refactored component and accessibility tests

## v0.2.1

_February 25, 2021_

### Fixed

- Styling fix to ensure compatibility with some browsers/devices

## v0.2.0

_February 1, 2021_

### Added

- Add the initial start of the component, which includes styles, base component and story changes

## v0.1.0

_January 29, 2021_

### Added

- Add generated output to start component
