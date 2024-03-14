# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v6.4.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14

v6.3.0

---

_July 25, 2022_

### Added

- Node 16 support.

## v6.2.0

_July 7, 2022_

### Changed

- Update f-wdio-utils to v1.1.0 to use new Axe Core implementation.
- Accessibility tests to be async.

## v6.1.0

_June 23, 2022_

### Changed

- devDependency version range to match peerDependencies.

## v6.0.0

_June 23, 2022_

### Changed

- Update to `@use` and `@forward` SASS syntax

## v5.0.1

_Jun 20, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v5.0.0

_December 9, 2021_

### Added

- **Breaking Change**: Added `f-searchbox` dependency to peer dependencies. Now `f-searchbox` should be included as a dependency of the consuming component or application.

### Removed

- **Breaking Change**: Removed `f-searchbox` styles import from the component. Make sure to import `f-searchbox` styles in your application.

## v4.0.0

_October 5, 2021_

### Changed

- Updated version of `f-searchbox` to update style to icing phase 2.

## v3.0.0

_September 16, 2021_

### Changed

- Updated version of `f-searchbox`.

### Removed

- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.

## v2.0.0

_September 15, 2021_

- Return beta to master. Component has JETSansDigital font.

## v2.0.0-beta.0

_September 7, 2021_

### Changed

- Use beta version of `f-searchbox` (JETSans update).

## v1.3.0

_September 14, 2021_

### Removed

- `MainBannerContainer.test.js` due to GA events being deleted.
- `Services` directory due to GA events being deleted.
- Mounted hook GA calls.

## v1.2.0

_June 23, 2021_

### Added

- Visual regression tests

_April 6, 2021_

### Added

- Component tests for `MainBannerContainer.vue` and `PageBanner.vue`
- `f-statusBanner.selector.js` file for storing test elements

## v1.1.0

_February 23, 2021_

### Removed

- `header` & `footer` components so the consuming application can render their own.
- Tests that covered header & footer.
- Storybook dispatch error.

## v1.0.0

_February 12, 2021_

### Added

- `PageBanner.vue`, `MainBannerContainer.vue` components.
- Copy for each tenant.
- Test to cover changes.
- `constants.js` file.
- `f-searchbox`, `f-header` & `f-footer` components.

## v0.1.0

_February 10, 2021_

### Added

- Base component generator files.
