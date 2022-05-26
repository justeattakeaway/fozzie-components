# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

Latest (add to next release)
------------------------------
*May 26, 2021*

### Changed
- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.


v2.0.0
------------------------------
*September 16, 2021*

### Added
- New MDX documentation for showing use cases as example for new storybook upgrade

### Removed
- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.


v1.0.0
------------------------------
*July 02, 2021*

### Added
- Added new prop called flex, which allows custom flex rules when implementing

### Removed
- removed stackOnNarrow as we now allow breakpoints to be passed into flex prop
- removed stacked as we now allow breakpoints to be passed into flex prop
- removed reverse as we now allow reverse to be passed into flex prop


v0.4.0
------------------------------
*June 21, 2021*

### Added
- stackWhenNarrow prop to stack when on device sizes <=narrowMid
- `white-space: pre-line` to enable newlines to be preserved when used in title or text
- Additional unit tests for new features

### Fixed
- Styling fix to make sure reverse prop works when not in stacked mode


v0.3.0
------------------------------
*June 09, 2021*

### Added
- Slot to enable additional content to be displayed below the text and title
- Unit tests to test the classes appear when props are set
- Unit test for checking slot content works

### Changed
- Restructured component object into page object model
- Refactored component and accessibility tests


v0.2.1
------------------------------
*February 25, 2021*

### Fixed
- Styling fix to ensure compatibility with some browsers/devices


v0.2.0
------------------------------
*February 1, 2021*

### Added
- Add the initial start of the component, which includes styles, base component and story changes


v0.1.0
------------------------------
*January 29, 2021*

### Added
- Add generated output to start component
