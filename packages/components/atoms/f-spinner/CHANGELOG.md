# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v1.3.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

## v1.2.0

_July 15, 2022_

### Added

- Node 16 support.

## v1.1.0

_July 4, 2022_

### Changed

- Update f-wdio-utils to v1.1.0 to use new Axe Core implementation.
- Accessibility tests to be async.
- Specs to ES6 syntax

## v1.0.0

_Jun 17, 2022_

### Changed

- Update to `@use` and `@forward` SASS syntax

## v0.4.1

_Jun 13, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

_May 27, 2022_

### Removed

- unneeded `load` and `waitForComponent` functions from component object

_May 26, 2021_

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v0.4.0

_March 22, 2022_

### Changed

- Put spinner content inside `div` instead of `span` for accessibility.
- Add storybook control to make spinner duration configurable.

## Latest (to be added to next release)

_February 4, 2022_

### Changed

- Upgraded to ESLint v8

## v0.3.0

_October 28, 2021_

### Added

- aria attributes so the spinner is read out to users with a screen reader

## v0.2.0

_October 28, 2021_

### Added

- event handling to start/stop spinner.
- Tests to cover changes

## v0.1.0

_October 28, 2021_

### Added

- Initial version of spinner component
