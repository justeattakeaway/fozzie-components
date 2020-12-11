# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v2.25.0
------------------------------
*December 11, 2020*

### Changed
- README's for components to remove references to demo files.


*December 11, 2020*

### Changed
- package.json component test scripts


v2.23.0
------------------------------
*December 9, 2020*

### Changed
- CircleCI config to build / serve Storybook for component tests
- package.json component test scripts

### Removed
- Component demo files


v2.22.1
------------------------------
*December 8, 2020*

### Changed
- Loglevel in `wdio.conf` to silent for less terminal-logging.


v2.22.0
------------------------------
*December 7, 2020*

### Fixed
- Eslint ignore error for newlines around `option` tags.


v2.21.1
------------------------------
*December 7, 2020*

### Fixed
- Broken test helper function.

### Added
- Colour-coding to success and fail messages
- Fozzie bear now either approves or disapproves of your build!


v2.21.0
------------------------------
*December 1, 2020*

### Added
- Ability for CircleCI to post build statuses to slack.


v2.20.0
------------------------------
*November 30, 2020*

### Added
- `demo-controls-helper.js` to contain any shared functions for controlling props values in WebDriverIO tests


v2.19.0
------------------------------
*November 24, 2020*

### Added
- Additional webdriver tests for f-header.
- Allure reporter in the package.json script of each component folder (so it can be called more easily).
- Video reporter in wdio.conf so errors are shown via recording in allure report.


v2.18.0
------------------------------
*November 23, 2020*

### Removed
- Removing CircleCI status reference.


v2.17.0
------------------------------
*November 17, 2020*

### Changed
- Consolidated test-ids in fozzie components - replaced `data-js-test` attribute with `data-test-id`.


v2.16.0
------------------------------
*November 17, 2020*

### Updated
- Splitting out `sassOptions` config to allow Eyeglass includes, so all components can use the same config.


v2.15.0
------------------------------
*November 12, 2020*

### Updated
- Version of `f-utils` updated to v1.


v2.14.0
------------------------------
*November 11, 2020*

### Added
- `import/no-extraneous-dependencies` to the list of ignored linting rules because many dependencies are set at a workspace level rather than at each package level.


v2.13.0
------------------------------
*November 10, 2020*

### Added
-  Added Allure reporting using WebdriverIO and Jest to Fozzie Components.


v2.12.0
------------------------------
*November 9, 2020*

### Added
- `services` folder to host services.

### Changed
- Lerna and yarn workspace configurations.


v2.11.0
------------------------------
*November 6, 2020*

### Changed
- Fozzie updated to v5 beta branch (no changes in components required - mostly restructuring at this point).


v2.10.0
------------------------------
*November 2, 2020*

### Added
- Added `mocha-each` to package.json.


v2.9.0
------------------------------
*October 28, 2020*

### Added
- Added an entry to gitignore to ignore some local development tools for mocking http requests


v2.8.3
------------------------------
*October 28, 2020*

### Added
- `CONTRIBUTING` file added to explain some of the guidelines we have around PRs.


v2.8.2
------------------------------
*October 28, 2020*

### Removed

- Year from the copyright notes
- Authors from f-vue-icons
- Params from a corporate link
- travis yml file


v2.8.1
------------------------------
*October 26, 2020*

### Changed
- 'jet' theme variable instead of 'je' in common.scss for the components.


v2.8.0
------------------------------
*October 23, 2020*

### Added
- Stylelint added to lint styling on component builds (for relevant packages).


v2.7.0
------------------------------
*October 21, 2020*

### Added
- Added `#globalconfig` flag that can be added to PR titles to stop danger running on all packages (only runs on root).


v2.6.0
------------------------------
*October 21, 2020*

### Added
- Upgrading `fozzie-colour-palette` and `fozzie` package versions.


v2.5.0
------------------------------
*October 15, 2020*

### Changed
- Circle CI Docker image
- Chromedriver version to v86.0.0


v2.4.0
------------------------------
*October 13, 2020*

### Added
- Jest support to Storybook
- Made unit test folder names consistent


v2.3.0
------------------------------
*October 5, 2020*

### Added
- Axe packages for running a11y tests in any component.


v2.2.0
------------------------------
*September 29, 2020*

### Added
- Bundlewatch config for monitoring bundle file sizes.


v2.1.0
------------------------------
*September 28, 2020*

### Removed
- Build config for visual regression tests


v2.0.0
------------------------------
*September 24, 2020*

### Changed
- Updating components to use `JustEatBasis` and subsequent breaking changes to update font variables to hook into new design token variables in fozzie.


v1.34.0
------------------------------
*September 24, 2020*

### Changed
- Lerna script to run component tests in series.
- `maxInstanstances` property in WebDriverIO config

### Removed
- Contract test dependency.
- Contract test publish npm script.
- Dependency for finding available ports.


v1.33.0
------------------------------
*September 21, 2020*

### Removed
- Contract test dependencies + scripts


v1.32.1
------------------------------
*September 23, 2020*

### Changed
- Updated typography CSS snippet to use valid comment.


v1.32.0
------------------------------
*September 21, 2020*

### Changed
- Comment out npm publish build step


v1.31.0
------------------------------
*September 17, 2020*

### Changed
- Updated typography font loading JS snippet to use `classList.add()`.


v1.30.0
------------------------------
*September 14, 2020*

### Added
- New build step for to run component UI tests
- `local:tests` script to easily run all tests locally before submitting a PR

### Changed
- `wdio.conf.js` compnent test spec directory


v1.29.0
------------------------------
*September 9, 2020*

### Added
- New build to publish npm packages as part of CI.

### Changed
- Build step name in config.yml to include addition of integration tests
- Move `@pact-foundation/pact` to devDependencies.


v1.28.0
------------------------------
*September 9, 2020*

### Changed
- Updated typography font loading JS snippet to use a self-executing function in order to avoid polluting the global namespace.
- Updated typography font loading JS snippet to follow our lint rules more closely.


v1.27.0
------------------------------
*September 8, 2020*

### Added
-  `@pact-foundation/pact` dependency for pact tests
- .gitignore entry for `pacts` folder
- lerna script to execute `test:consumer` script
- `publish:pact` script to publish pacts to the broker

### Changed
- `testEnvironment` in `package.json` for consumer pact tests


v1.26.0
------------------------------
*September 8, 2020*

### Changed
- Updating `peerDependencies` to use ranges values.
- Updating `devDependencies` in generator package to use same values as the other packages.

### Fixed
- Updated bundle name in generator readme template.


v1.25.0
------------------------------
*September 1, 2020*

### Added
- WebDriverIO for browser driven component tests


v1.24.1
------------------------------
*August 20, 2020*

### Changed
- Updated typography docs for importing custom font.


v1.24.0
------------------------------
*August 18, 2020*

### Changed
- Updated to Storybook `v6` (and updated stories across other packages as part of the migration).


v1.23.1
------------------------------
*August 18, 2020*

### Added
- CircleCI context to use shared variables.


v1.23.0
------------------------------
*July 23, 2020*

### Added
- `storybook:serve` & `storybook:build` scripts re-added so that storybook can be run from the root of the mono-repo.

### Changed
- Updating `fozzie` and `fozzie-colour-palette` to latest version (Rebrand rollout - Phase 3).
- Minor package updates.

### Removed
- Moved some specific `f-vue-icons` dependencies away from the root, as not shared by any other package.


v1.22.0
------------------------------
*July 16, 2020*

### Changed
- Adding package dependencies for new `f-vue-icons` release.


v1.21.0
------------------------------
*July 13, 2020*

### Added
- Updated Docker image in `config.yml` to include Chrome for Percy visual regression tests
- New task in `config.yml` to run visual regression tests

### Changed
- Updated `sass-loader` to 7.3.1 to allow storybook to perform contextual import of common.scss files
  from Single File Components in subdirectories
- SSH key fingerprint that is used to deploy Storybook


v1.20.0
------------------------------
*July 9, 2020*

### Changed
- Updating dependencies of `fozzie-header` and `f-footer` packages.


v1.19.0
------------------------------
*June 25, 2020*

### Changed
- Updating base version of `fozzie-colour-palette` and updating any colour variables affected.
- Minor package updates.


v1.18.0
------------------------------
*June 25, 2020*

### Added
- devDependency on `cross-env` to allow for cross-platform environment variables in CI scripts

### Changed
- scripts using `$LERNA_ARGS` to use `cross-env` as above


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
