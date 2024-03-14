# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v1.11.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14
- `@vue/cli-plugin-babel` to 5.0.0 to resolve snyk vulnerability

## v1.10.0

_November 2, 2022_

### Changed

- Added fozzie components as externals in Webpack config.

## v1.9.0

_November 2, 2022_

### Removed

- Bespoke Conversation ID handling (now handled by f-http as of v1.0.0)

## v1.8.0

_July 29, 2022_

### Added

- Node 16 compatible version of `@justeat/f-vue-icons`.

## v1.3.0

_July 25, 2022_

### Added

- Node 16 support.

## v1.2.0

_July 19, 2022_

### Added

- Peer dependencies for all fozzie components.

## v1.1.0

_July 13, 2022_

### Changed

- Update f-wdio-utils to v1.1.0 to use new Axe Core implementation.
- Accessibility tests to be async.

## v1.0.0

_July 7, 2022_

### Changed

- **Breaking change:** Update to `@use` and `@forward` SASS syntax.
- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v0.20.0

_June 15, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

## v0.19.0

_May 31, 2022_

### Updated

- Version of `f-form-field`

## v0.18.0

_February 18, 2022_

### Updated

- Version of `f-alert`

### Removed

- Unneeded controls and watchers in `ContactPreferences.stories`

## v0.17.0

_February 16, 2022_

### Added

- Included 'Accept-Language' header for all consumerApi calls

### Updated

- Converted Storybook Knobs to Controls

## v0.16.0

_January 31, 2022_

### Changed

- Move the alert markup in own file
- Reworded the error message for submit action

## v0.14.0

_January 26, 2022_

### Changed

- Styles to match the designs.

## v0.13.0

_January 21, 2022_

### Added

- Alerts for failed and successful saving and new design for fail to load error page.

## v0.12.1

_January 5, 2022_

### Changed

- Passed in 'services' and 'constants' to package.json files

## v0.12.0

_December 16, 2021_

### Changed

- Simplified the Storybook file
- Updated f-button to v3.2.0
- Updated f-card to v3.4.0

## v0.11.0

_December 16, 2021_

### Added

- `info` and `error` logs to preferences fetch and save requests
- Unit tests

### Changed

- Move store module registration from `created` to `beforeCreate`.

### Removed

- Mounted hook which was duplicating the `initialise()` call
- Unused variable from story helper

## v0.10.0

_December 2, 2021_

### Changed

- Generic checkboxes to use `f-form-field`

## v0.9.1

_December 1, 2021_

### Changed

- Updating classname to match naming scheme

## v0.9.0

_November 29, 2021_

### Added

- Expose new isAuthFinished `required` property

### Changed

- Registered the Store Module on Create()
- Initialise Page based on isAuthFinished

## v0.8.0

_November 26, 2021_

### Changed

- `f-card` wrapping component adds two props to control padding & size.

### Added

- New version of f-card (pulls in the two new props).

## v0.7.0

_November 23, 2021_

### Changed

- Rename boolean fields to match naming conventions

### Added

- Added Accessibility Tests.
- Added Chrome & Visual Tests.

## v0.6.0

_November 22, 2021_

### Added

- Added storybook story.

## v0.5.3

_November 18, 2021_

### Added

- Added vuex store, wired store to template & added unit tests.

## v0.5.2

_November 17, 2021_

### Added

- Added contact preferences mapper & unit tests.

## v0.5.1

_November 11, 2021_

### Added

- Api provider for getting and saving consumer preferences data.

## v0.5.0

_November 4, 2021_

### Changed

- Moved component so that it's now in `Pages` rather than `Organisms`.

## v0.4.1

_November 2, 2021_

### Changed

- Refactored tests

## v0.4.0

_November 1, 2021_

### Added

- Initial error handling.
- Initial error card.
- Implementation of i18n.
- Expose `test-utils` folder.

## v0.3.0

_October 18, 2021_

### Added

- Initial mapping and hard-coded mock

### Changed

- Updated version of `f-button`.

## v0.2.0

_October 12, 2021_

### Added

- Initial component layout and styling

## v0.1.0

_October 11, 2021_

### Added

- Component outline using component generator
