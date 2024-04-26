# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v4.4.1

_April 26, 2024_

### Changed

- Update `axios` to latest v0 version.


## v4.4.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14
- Increased `maxBundleSize` from 25 to 28kB

_December 5, 2022_

### Changed

- Updated to the new `pie-icons-vue` beta release.

## v4.3.0

_July 28, 2022_

### Changed

- f-services implementation to use new major version.

v4.2.0

---

_July 19, 2022_

### Added

- Node 16 support.

## v4.1.0

_July 5, 2022_

### Changed

- Update f-wdio-utils to v1.1.0
- Update component objects / specs to use ES6 syntax.

## v4.0.0

_June 23, 2022_

### Changed

- Update to `@use` and `@forward` SASS syntax

## v3.2.1

_June 9, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

_May 26, 2022_

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v3.2.0

_May 13, 2022_

### Changed

- Icons in component

### Removed

- `@justeat/f-vue-icons`

### Added

- `@justeattakeaway/pie-icons-vue`

_February 15, 2022_

### Changed

- Updated method mock to spy, as method mocks not supported by vue-test-utils.

## v3.1.0

_October 18, 2021_

### Changed

- Background and text colour to be in line with default warning message.

### Removed

- Font-family and font-weight declaration as comes from fozzie and there is no need to override.

## v3.0.0

_October 5, 2021_

### Changed

- Background colour token in line with Icing Phase 2.

## v2.0.0

_September 15, 2021_

- Return beta to master. Component has JETSansDigital font.

### Removed

- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.

## v2.0.0-beta.0

_August 26, 2021_

### Updated

- New font JETSansDigital

## v1.3.0

_May 25, 2021_

### Changed

- CSS variables to use pie design tokens instead of fozzie-colour-palette vars

## v1.2.0

_February 9, 2021_

### Added

- Added `f-user-message.component.spec` tests
- Added accessibility tests

## v1.1.0

_January 29, 2021_

### Added

- Added the component to storybook

### Changed

- Update service to use new values as the contract has changed

_January 12, 2021_

### Changed

- 'jet' theme instead of 'je'
- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.
- Update axios version for security advisory

### Added

- Stylelint added to lint styling on build.

## v1.0.0-beta.1

_September 3, 2020_

### Changed

- Rebasing `v0.3.0` changes into the beta branch.

## v1.0.0-beta.0

_August 27, 2020_

### Changed

- Uses `JustEatBasis` font and new fozzie font size declarations.

## v0.3.1

_September 8, 2020_

### Changed

- `eslint-config-fozzie` & `f-trak` peer dependencies use a range value.

## v0.3.0

_August 28, 2020_

### Changed

- Removed component top margin. This should be set in the host app, if required
- Updated packages. Reduced bundle size

## v0.2.0

_July 23, 2020_

### Changed

- Small update to colours from updating to `fozzie-colour-palette` in the mono-repo root.
- Vue CLI minor package updates.

## v0.1.1

_May 12, 2020_

### Changed

- Updating `vue-test-utils` to v1 and `@vue/cli-plugin-unit-test` to v4.3.1.
- ESLint autofix turned off (so that tests don't pass due to `--fix` being applied, but then publish subsequently fails)

### Removed

- `testMatch` from jest config, as not needed.

## v0.1.0

_March 27, 2020_

### Added

- Adds `f-user-message` vue component
