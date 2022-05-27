# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


Latest (add to next release)
------------------------------
*May 27, 2021*

### Removed
- unneeded `load` and `waitForComponent` functions from component object

*May 26, 2021*

### Changed
- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.
*May 26, 2021*

### Changed
- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.


v0.4.0
------------------------------
*March 22, 2022*

### Changed
- Put spinner content inside `div` instead of `span` for accessibility.
- Add storybook control to make spinner duration configurable.


Latest (to be added to next release)
------------------------------
*February 4, 2022*

### Changed
- Upgraded to ESLint v8


v0.3.0
------------------------------
*October 28, 2021*

### Added
- aria attributes so the spinner is read out to users with a screen reader

v0.2.0
------------------------------
*October 28, 2021*

### Added
- event handling to start/stop spinner.
- Tests to cover changes


v0.1.0
------------------------------
*October 28, 2021*

### Added
- Initial version of spinner component
