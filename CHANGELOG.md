# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v1.17.0
------------------------------
*June 24, 2020*

### Changed
- CircleCI params to restrict build concurrency to 1 to solve memory issues
- StoryBook CircleCI build to build packages first to ensure dependencies are available


v1.16.0
------------------------------
*June 8, 2020*

### Changed
- Updated `fozzie` and `fozzie-colour-palette` dependencies to pull in updated JET theme variables for ML.


v1.15.0
------------------------------
*June 4, 2020*

### Changed
- ESLint autofix turned off across all packages for default lint tasks so that tests don't pass due to `--fix` being applied (as they should fail when this happens to prompt engineers to autofix).


v1.14.0
------------------------------
*June 3, 2020*

### Changed
- Updated `fozzie` and `fozzie-colour-palette` dependencies to pull in latest JET theme variables for ML.


v1.13.0
------------------------------
*May 12, 2020*

### Changed
- Updating Storybook story file format.


v1.12.0
------------------------------
*May 12, 2020*

### Changed
- Updated some base dependencies (all minor version bumps).


v1.11.0
------------------------------
*May 1, 2020*

### Added
- `webdriverio` dependency so that we're able to utilise WebDriverIO functionality in our new `*.page.js` files.


v1.10.0
------------------------------
*April 27, 2020*

### Added
- NPM Scripts at the root of the mono repo to run the Storybook docs through `yarn storybook:build` and `yarn storybook:serve`.

v1.9.0
------------------------------
*April 23, 2020*

### Added
- `@storybook/storybook-deployer` dependency to easily deploy storybook using the `storybook:deploy` script
- Updated Circle CI config.yml to include new `deploy` workflow + other tweaks to existing `build` workflow
- Added link to hosted Storybook in fozzie-component docs.


v1.9.0
------------------------------
*April 23, 2020*

### Added
- `generator-component` added to scaffold new components.


v1.8.1
------------------------------
*April 9, 2020*

### Fixed
- Running build CI step before unit tests and linting tests, as some linting checks rely on the compiled `dist` asset to check against (when checking `import` for instance).


v1.8.0
------------------------------
*April 3, 2020*

### Added
- Empty `babel.config.js` added at the mono-repo root, because otherwise `vue-cli` upgrade commands fail as it assumes its presence.

### Changed
- Upgraded `vue-cli` to `v4` where possible (includes `@vue/cli-service` and `@vue/cli-plugin-babel`). Have tried running auto-migration of `@vue/cli-plugin-eslint` and `@vue/cli-plugin-jest` but both of these tasks require further work, so have parked for now as not essential.


v1.7.0
------------------------------
*March 31, 2020*

### Added
- `f-skeleton-component` added for use when creating base component structure.


v1.6.0
------------------------------
*March 30, 2020*

### Added
- Added the `eslint-import-resolver-webpack` so that eslint can understand webpack special characters such as `@` used in import paths

### Changed
- Minor package updates


v1.5.1
------------------------------
*February 24, 2020*

### Removed
- `isSettings` check from package babel configs. This is a custom `ENV` variable used in `f-searchbox` and isn't used anywhere else.


v1.5.0
------------------------------
*February 24, 2020*

### Changed
- Updated packages to have consistent lint rules
- CircleCI Badge on README replaces TravisCI badge
- Node version (`package.json`) updated to be `>=10.0.0` across all packages, as that's what we test against.
- CircleCI Build now runs lint and build checks on all packages
- `f-services` patch release (deleted some redundant/unneeded packages)


v1.4.1
------------------------------
*February 10, 2020*

### Fixed
- DangerJS fix for package paths and for false positive around reporting change in the root


v1.4.0
------------------------------
*February 6, 2020*

### Added
- DangerJS Checks (via CircleCI)
- Pull Request Template
- `CODEOWNERS` file


v1.3.0
------------------------------
*February 5, 2020*

### Added
- CircleCI base config for PR checks. Config currently will run unit tests across all `fozzie-components` packages


v1.2.1
------------------------------
*January 30, 2020*

### Added
- Link to Fozzie docs


v1.2.0
------------------------------
*September 18, 2019*

### Added
- `shared.service.js` for duplicated logic used in `f-header` and `f-footer`
- `@babel/plugin-proposal-optional-chaining` to be used in `f-header` and `f-footer` components


v1.1.0
------------------------------
*June 21, 2019*

### Added
- Shareable browserslist config

### Changed
- ESLint configs moved to root of monorepo


v1.0.0
------------------------------
*June 21, 2019*

### Added
- `package.json` versioning and changelog of the root package to follow root it's specific changes

### Changed
- Move dev dependencies from `f-vue-icons` to the root folder using `lerna link convert`
Packages that are used by npm scripts left in the package to be able to run scripts not only from the root
