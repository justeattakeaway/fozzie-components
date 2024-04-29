# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v7.56.2

_April 29, 2024_

### Changed

- Bump `@vue/cli-plugin-babel` from v5.0.0 to v5.0.8
- Bump `@vue/babel-preset-app` from v5.0.0 to v5.0.8
- Bump `@vue/cli-plugin-unit-jest` from v5.0.0 to v5.0.8


## v7.56.1

_April 26, 2024_

### Changed

- Assorted security package updates.
- Update `chromedriver` to v124


## v7.56.0

_April 10, 2024_

### Changed

- Updated version of `@justeat/pie-design-tokens` to 6.2.1

## v7.55.0

_March 13, 2024_

### Added

- support for Node version 18 and 20 and Yarn v3.5.0
  - Volta pin Node v20.3.1
  - Volta pin Yarn v3.5.0
- `--openssl-legacy-provider` in `package.json` scripts to fix issue with Node 17 and above
- Fix vulnerabilities with Yeoman component generator
- Bump vulnerable packages
  - `jest`, `jest-environment-jsdom`, `babel-jest`, `@vue/babel-preset-app`, `@vue/cli-plugin-babel`, `@vue/cli-plugin-unit-jest`, `stylelint`, `@vue/vue2-jest`
- `testURL` to `testEnvironmentOptions.url` and `vue-jest` to `@vue/vue2-jest` in `jest.config` for all components, tools and services
- Axios v.1.6.0 to `jest.config` `transformIgnorePatterns` (`@justeat/f-checkout`)
- `experimentalCSSCompile` to `jest.config` to resolve node-sass error (`@justeat/f-error-boundary`)

## Removed

- support for deprecated Node version 12

## Changed

- `build.yml` file to reflect setup for Node 20 and yarn 3.5.0

## v7.54.4

_November 24, 2023_

### Changed

- Updated chromedriver to 119.0.1.

## v7.54.2

_September 4, 2023_

### Changed

- Bump danger version

## v7.54.1

_September 4, 2023_

### Changed

- Combined several dependabot updates

## v7.54.0

_July 31, 2023_

### Changed

- WebDriverIO tests to only run against changed packages and their dependants for PR's. This change should reduce our Percy usage.
- `chromedriver@115.0.0`

## v7.53.0

_May 22, 2023_

### Added

- volta to `components`, `tools`, `services` and `storybook`

## v7.52.0

_May 18, 2023_

### Changed

- Updated chromedriver to 113.0.0.

## v7.51.0

_April 19, 2023_

### Added

- Percy tokens removed for `f-toggle` and created for `f-toggle-switch`

## v7.50.0

_April 19, 2023_

### Added

- Percy tokens for `f-toggle` and `f-segmented-control`

## v7.49.0

_March 27, 2023_

### Changed

- Update `@justeat/pie-design-tokens` to v5.0.0 for new focus tokens.
- Update `@justeat/fozzie` to v11 to include new focus styles.

### Added

- Volta config to root `package.json`.

## v7.48.1

_March 23, 2023_

### Fixed

- Turned off caching of storybook-build to fix CI deployment.

## v7.48.0

_March 22, 2023_

### Added

- Turborepo remote caching

## v7.47.0

_February 22, 2023_

### Changed

- Updated version of `@justeat/pie-design-tokens` to 4.2.0

## v7.46.0

_December 13, 2022_

### Changed

- Updated chromedriver to 108.0.0.

## v7.45.0

_December 5, 2022_

### Changed

- Updated packages to the new `pie-icons-vue` beta release.

## v7.44.1

_December 6, 2022_

### Fixed

- Provide `--no-verify-access` to Github Actions config to get around issue where npm automation tokens don't work with current lerna version. - https://github.com/lerna/lerna/issues/2788

## v7.44.0

_November 30, 2022_

### Added

- Automatic npm publishing via Github Actions

## v7.43.0

_November 21, 2022_

### Changed

- Use latest eslint-config-fozzie.

## v7.42.1

_November 18, 2022_

### Added

- Fix CI bug that prevented package changes from executing WDIO tests.

## v7.42.0

_November 17, 2022_

### Removed

- Duplicate dependencies of `organisms`, `pages`, `templates`, `services`, and `tools` packages.

## v7.41.0

_November 17, 2022_

### Added

- Revert CI change which caused tests not to run.

## v7.40.0

_November 4, 2022_

### Added

- `f-rating` percy ci check.

v7.39.0

---

_October 24, 2022_

### Removed

- Duplicate dependencies of `molecules` packages.

## v7.38.0

_October 24, 2022_

### Removed

- Duplicate dependencies of `atoms` packages.

## v7.37.1

_October 21, 2022_

### Changed

- Updated `danger` to `11.4.1`

## v7.37.0

_October 19, 2022_

### Changed

- Updated Browser Support page by removing Internet Explorer 11 and versions.

## v7.36.0

_October 13, 2022_

### Changed

- Migrate `@justeat/fozzie` to the monorepo.
- Update root `@justeat/fozzie` to `10.x` so local version if used.
- Replaced various design tokens that were removed from the newer version.
- Added `@justeat/pie-design-tokens` as a root `devDependency` as it's no longer being hoisted by `@justeat/fozzie` to root `node_modules`.

## v7.35.2

_October 10, 2022_

### Fixed

- Get Turborpo to filter by `origin/master`.
- Stop Danger running against master.

## v7.35.1

_October 10, 2022_

### Fixed

- Issue where builds weren't being trigged against master.
- Issue where all branches/tags weren't fetched, preventing Turborepo `--filter` from working.

## v7.35.0

_October 10, 2022_

### Added

- Ability to run GitHub Actions on PR's.
- Ability to prevent WDIO tests running if previous jobs fail.
- Remove references to CircleCI.

## v7.34.0

_October 10, 2022_

### Added

- Turborepo filtering to GitHub Actions.

### Changed

- Version of Chromedriver to `106`

## v7.33.1

_October 6, 2022_

### Removed

- `f-form` organism component

## v7.33.0

_October 4, 2022_

### Added

- Danger checks to GitHub Actions.

## v7.32.0

_October 4, 2022_

### Changed

- Update to `fozzie` v10.5.0
- Replaced various design tokens that were removed from the newer version

## v7.31.0

_September 27, 2022_

### Added

- `fozzie` v9.3.1 to the root.

### Removed

- Beta versions from individual components.

## v7.31.0

_October 3, 2022_

### Added

- New `build:changed` script to build any changed components and their dependencies.

## v7.30.1

_September 28, 2022_

### Fixed

- Issue in CI where Storybook changes weren't picked up as global changes.

## v7.30.0

_September 27, 2022_

### Added

- NPM publish to GitHub Actions.

## v7.29.1

_September 27, 2022_

### Changed

- Include any Storybook changes in PR test triggers for CircleCI

## v7.29.0

_September 14, 2022_

### Added

- Bundlewatch checks to GitHub Actions.

## v7.28.1

_September 12, 2022_

### Fixed

- Environment variable used for cache keys in GH Actions config.
- Incorrect Storybook cache being pulled.

## v7.28.0

_September 2, 2022_

### Added

- Unit testing / Linting to GitHub Actions.

## v7.27.0

_September 1, 2022_

### Added

- Browser tests to GitHub Actions

### Changed

- Chromedriver version
- Locked Chromedriver version in CI.

## v7.26.0

_August 23, 2022_

### Changed

- Codeowners updated to point to new Core Team for mono-repo config, atoms and core owned components (like `f-header`/`f-footer`).
  Test files are set to be owned by the QE Reviewers team.

## v7.25.1

_August 22, 2022_

### Fixed

- Issue where incorrect cache was being used to deploy Storybook.

## v7.25.0

_August 11, 2022_

### Added

- `fozzie > guides` consuming application documentation for Gulp.

## v7.24.0

_August 10, 2022_

### Added

- New GitHub Actions config to build components / deploy storybook in master
- Removed references to Storybook Deploy in CircleCI config.

## v7.23.0

_August 4, 2022_

### Added

- Turborepo local caching for `build` / `lint` / `test` / tasks
- New concurrency rules in CircleCI config
- Disabled npm publishing / Storybook deploy

### Changed

- Allure report generation to execute on fail to speed up CI.

## v7.22.0

_August 3, 2022_

### Changed

- CircleCI to use Node 16 Docker image.
- Updated Chromedriver to use latest version.
- Add concurrency=1 to stop build errors due to lack of memory.

## v7.21.0

_July 26, 2022_

### Changed

- Components to use Node 16 compatible verisons of f-services

### Removed

`lerna.json`

## v7.20.1

_July 26, 2022_

### Fixed

- Issue where dependants weren't being analysed by Bundlewatch Turborepo implementation.

### Removed

`lerna.json`

## v7.20.0

_July 26, 2022_

### Updated

- `@justeat/f-wdio-utils` to latest version in root.

### Removed

`@justeat/f-wdio-utils` from component package.json

## v7.19.0

_July 25, 2022_

### Added

- Node 16 support.

## v7.18.1

_July 25, 2022_

### Fixed

- CircleCI from testing dependants

## v7.18.0

_July 25, 2022_

### Removed

- `lerna` dependency.

## v7.17.0

_July 19, 2022_

### Changed

- Fixed Storybook deploy
- set `--concurrency=1` for unit tests to prevent memory issues in CI

## v7.16.0

_July 14, 2022_

### Removed

- `@wdio/sync` dependency to enable Node 16 support.

## v7.14.5

_July 6, 2022_

### Added

- `fozzie > guides` consuming application documentation.

## v7.14.4

_July 4, 2022_

### Changed

- `@justeat/f-wdio-utils` package version on various packages from `0.11.0` to `0.12.0`

## v7.14.3

_June 27, 2022_

### Fixed

- Storybook deploy step

## v7.14.2

_June 27, 2022_

### Fixed

- Bug with BASH_ENV not being updated in CircleCI config.
- Evaluation in bundlewatch.config.js

## v7.14.1

_June 27, 2022_

### Changed

- Fixed bundlewatch to only run against changed packages.

## v7.14.0

_June 24, 2022_

### Changed

- `turbo.json` to specify that dependencies should be built along with the changed package.

### Removed

- CircleCI Caching to prevent issues with outdated deps.

## v7.13.0

_June 15, 2022_

### Added

- Vite as a global monorepo dependency to stop version clashing

## v7.12.0

_June 10, 2022_

### Removed

- `node-sass` from `f-tabs` & `f-navigation-links`.

## v7.11.0

_May 31, 2022_

### Added

- Documentation for Fozzie Sass Helper Library and usage

## v7.10.0

_May 22, 2022_

### Changed

- Dependency versions to allow for Node 16 support.

## v7.9.0

_May 16, 2022_

### Changed

- `fozzie` package version to pull in the f-utils deprecation change.

## v7.8.0

_May 12, 2022_

### Changed

- Icons in `f-footer`, `f-alert`, `f-button`, `f-error-message`, `f-form-field` and `f-user-message`

### Removed

- `@justeat/f-vue-icons` from the above components

### Added

- `@justeattakeaway/pie-icons-vue` to the above components

## v7.7.0

_May 10, 2022_

### Added

- Renovate for automatic version bumps of minor dependencies

## v7.6.0

_April 13, 2022_

### Changed

- Node 12 / 14 now required in order to match CI.

## v7.5.0

_April 11, 2022_

### Changed

- Upgrade Percy packages to prevent warnings in the Percy dashboard.

## v7.4.0

_March 21, 2022_

### Changed

- Upgrade several Vue CLI packages to avoid a node-ipc issue

## v7.3.0

_March 29, 2022_

### Changed

- Stylelint called directly now rather than through vue-cli in NPM scripts.

## v7.2.0

_March 28, 2022_

### Removed

- f-development-context service removed.

## v7.1.0

_March 9, 2022_

### Added

- `f-wido-utils` version bump.

### Removed

- Reference to `getAccessibilityTestResults` from `axe-helper` file.

### Changed

- References within mono-repo to take wrapper method `getAxeResults` instead.

## v7.0.1

_March 1, 2022_

### Added

- `resource_class` to circleci `config.yml` file to increase resource level for more powerful VMs.

## v7.0.0

_February 15, 2022_

### Changed

- **Breaking Change** – repo now uses `dart-sass` instead of `node-sass` for styles.
  There is still an outstanding issue in `vue-jest` and it's support of dart-sass which means for components
  wanting to compile styles in jest (to test classnames for instance), `node-sass` still needs to be included
  as part of that packages `devDepenedencies`. For all other packages, `experimentalCSSCompile: false` has been
  set to turn off jest compiling styles, otherwise the tests won't run as expected.
- Eyeglass has been removed in favour of using `sass-loader`'s node_modules path resolution, as this comes out of the box.

### Removed

- Any references to fozzie `$theme` variables in `common.scss` files, as no longer needed.
- Removed webpack tilda `~` for fozzie scss refrences, as not needed – sass-loader does this automatically now.

## v6.1.1

_February 4, 2022_

### Added

- Additional content to `visual-regression-setup.stories.mdx` readme for visual testing.

## v6.1.0

_February 4, 2022_

### Changed

- Updated repo to use ESLint v8
- wdio plugin added to ESLint

### Removed

- Reliance on vue-cli for JS linting as meant we were tied to the version it supported (which is currently v6).

## v6.0.0

_January 31, 2022_

### Changed

- `spacing()` calls throughout repo to new Pie token references e.g `spacing(x2)` > `spacing(d)`

## v5.11.0

_January 27, 2022_

### Changed

- `test/shared.config` added additional filename `test/visual/*.visual.spec.js` to testType array.

## v5.10.1

_January 21, 2022_

### Changed

- `axe-helper.js` with A11y Axe rules to match storybook and to increase our a11y test coverage.

## v5.10.0

_January 20, 2022_

### Changed

- `.circleci/config.yml` to automatically publish new package versions to the npm registry.

## v5.9.0

_January 20, 2022_

### Changed

- `.circleci/config.yml` to put danger checks in their own workflow.

## v5.8.7

_January 17, 2022_

### Changed

- `axe-core` version to latest.

### Fixed

- `axe-helper.js` to create reports in the correct directory if tests fail locally.

## v5.8.6

_January 13, 2022_

### Fixed

- Small issue with memory being exceeded with concurrency 2

## v5.8.5

_January 10, 2022_

### Fixed

- Small `yarn.lock` update and whitespace fix

## v5.8.4

_January 7, 2022_

### Fixed

- Storybook deploy + reverted to old cache mechanism.

## v5.8.3

_January 7, 2022_

### Fixed

- Storybook deploy.

## v5.8.2

_January 4, 2022_

### Added

- `f-form` to Circle CI cache.

## v5.8.1

_December 21, 2021_

### Changed

- Circle CI cached components to include new f-filter-pill component

## v5.8.0

_December 20, 2021_

### Changed

- fozzie package to the latest (v6.2.0).

## v5.7.0

_December 16, 2021_

### Removed

- CircleCI Approval process for builds.

## v5.6.0

_November 26, 2021_

### Changed

- Updated the circle ci config to include an approval process

## v5.5.0

_November 26, 2021_

### Added

- `peer-deps-externals-webpack-plugin` to automatically add a library's peerDependencies to the bundle's externals.

## v5.4.0

_November 22, 2021_

### Changed

- `chromedriver` dependency to `96.0.0`
- `.circleci/*.yaml` files to use new Docker image with Chrome v96

## v5.3.2

_November 12, 2021_

### Changed

- wdio configuration for component, visual and a11y tests.
- allure script in `wdio-shared.conf.js` and `package.json`.
- small update of generator to reflect above changes.

## v5.3.1

_November 12, 2021_

### Changed

- Updated documentation for visual regression test setup.

## v5.3.0

_November 9, 2021_

### Added

- `templates` and `pages` component directories added to lerna config.

### Changed

- Updated engine from Node v10 > v12 on all packages (as we only test in Node 12+).

## v5.2.0

_November 5, 2021_

### Changed

- Moved a number of `Organisms` over to the `Pages` directory.

## v5.1.4

_November 5, 2021_

### Changed

- Updates to `f-wdio-utils` package version across our components.

## v5.1.3

_November 3, 2021_

### Added

- `f-error-boundary` generated component.

## v5.1.2

_November 3, 2021_

### Added

- `f-card-with-content` generated component.

## v5.1.1

_November 2, 2021_

### Changed

- Updated Circle CI for new location of f-template-subnav

## v5.1.0

_October 28, 2021_

### Changed

- fozzie package update to the latest (6.0.0) to include latest pie-design-tokens.

## v5.0.4

_October 28, 2021_

### Added

- `f-spinner` to Circle CI cache.

## v5.0.4

_October 28, 2021_

### Changed

- Circle CI cached components to include new f-image-tile component

## v5.0.3

_October 28, 2021_

### Removed

- Label watcher GitHub Action and related scripts.
- `wip` labeller.

## v5.0.2

_October 25, 2021_

### Removed

- Unused Browserstack and Allure scripts
- Browserstack configuration files
- Reference to JE_ENV environment variable
- Percy and Browserstack tags

### Changed

- Filenames for component tests

## v5.0.1

_October 20, 2021_

### Added

- `f-promotions-showcase` to Circle CI cache

## v5.0.0

_October 21, 2021_

### Added

- Component folders for `templates` and `pages`.
- Templates are for layout components that are intended to handle page level layout decisions (for example, a sideNav layout such as on our account pages). Templates don't contain any logic around the actual set of pages, they just handle the overall layout structure and styling.
- Pages are for our largest organisms, whereby they are a collection of components that make up the main body of a page. For example, `f-registration` and `f-checkout` are both examples of `page` components.

### Changed

- Config for CircleCI, Lerna, yarn workspaces and danger.js updated to include new folder paths.
- Moved `f-registration` into `pages` directory. Will look to move other organisms one-by-one by liaising with each team working on these components.

## v4.7.1

_October 20, 2021_

### Added

- Document for recording agreed Do's and Don'ts on our codebase

## v4.7.0

_October 19, 2021_

### Changed

- `fozzie` package version bump.

## v4.6.3

_October 18, 2021_

### Added

- `f-compatibility` to Circle CI cache.

## v4.6.2

_October 18, 2021_

### Added

- `f-navigation-links` to Circle CI cache.

## v4.6.1

_October 12, 2021_

### Added

- `f-contact-preferences` to Circle CI cache.

## v4.6.0

_October 8, 2021_

### Changed

- Always run visual tests against master.
- Only run visual tests against changed packages.

## v4.5.0

_October 8, 2021_

### Changed

- webdriverIO to v91.

## v4.4.0

_October 7, 2021_

### Added

- Conditional logic to visual regression tests (via new `visual-regression-preflight.js` script).
- Custom Github Action for triggering Circle CI pipeline when `wip` tag is removed.

## v4.3.2

_October 6, 2021_

### Changed

- Only apply `wip` label to newly opened/reopened PRs.

## v4.3.1

_October 6, 2021_

### Changed

- `labeler` workflow config path

## v4.3.0

_October 6, 2021_

### Added

- Labeler action
  - Automatically applies `wip` label to new PRs
  - Applies category labels based on whether the PR affects `atoms`, `molecules`, `services`, etc.

## v4.2.0

_October 5, 2021_

### Changed

- `fozzie` package version bump to 6.0.0-beta.5 to include new colour theme and radius vars.

## v4.1.0

_October 4, 2021_

### Changed

- Circle CI cached components to include new f-restaurant-card component

## v4.0.0

_September 15, 2021_

### Changed

- fozzie version to make normalize styles optional. This will remove normalize styles from the components by default.
- JETSansDigital font instead of JustEatBasis for the components and storybook.

## v4.0.0-beta.0

_August 25, 2021_

### Changed

- fozzie version to include new font.

### Changed

- Storybook font to become new JETSansDigital instead of JustEatBasis.

## v3.54.0

_September 2, 2021_

### Changed

- Adding logging for local testing so it's easier to troubleshoot component tests.

## v3.53.2

_September 2, 2021_

### Fixed

- Typography documentation updated with correct syntax.

## v3.53.1

_August 23, 2021_

### Changed

- Removing all restore cache except master on build phase

### Added

- Added back in slack notifications on build steps

## v3.53.0

_August 23, 2021_

### Changed

- Changed the circle CI config to implement caching for our builds and splitting the build process into test and build

## v3.52.2

_August 12, 2021_

### Fixed

- Issue with deps not getting build when building Storybook.

## v3.52.1

_August 11, 2021_

### Changed

- Various packages to latest version of `f-wdio-utils - v0.3.0`

## v3.52.0

_August 5, 2021_

### Changed

- Upgraded webpack resolution to support storybook upgrade.

## v3.51.0

_August 4, 2021_

### Changed

- Storybook documentation update and updating some minor package versions.

## v3.50.0

_July 22, 2021_

### Added

- Names for unnamed Circle CI steps.

## v3.49.0

_July 20, 2021_

### Changed

- Fozzie version to v5.0.0-beta.10 which has the latest pie design token variables.

## v3.48.0

_July 19, 2021_

### Added

- Test level overview documentation to Storybook.

## v3.47.0

_July 19, 2021_

### Changed

- Bump dependency of `f-button` across a number of packages (no version bumps as no changes to the actual package were needed).
- Some other minor package version bumps.

## v3.46.0

_July 16, 2021_

### Added

- Feature Management service component (initial skeleton).

## v3.45.0

_July 14, 2021_

### Added

- `Storybook - Run Currently Open Story File` command in `launch.json`

## v3.44.6

_July 12, 2021_

### Fixed

- A few linting and formatting issues across files.

## v3.44.5

_July 7, 2021_

### Fixed

- Build all packages when running bundlewatch

## v3.44.4

_July 6, 2021_

## Fix

- Removed Bundlewatch comparison to master

## v3.44.3

_July 6, 2021_

## Fix

- Fix Bundlewatch fails

## v3.44.2

_July 5, 2021_

## Fix

- Fix CircleCI lint error when building one component.

## v3.44.1

_July 2, 2021_

## Fixed

- Issue where Bundlewatch fails on master as no packages have changed.

## v3.44.0

_July 1, 2021_

## Changed

- Bundlewatch to utilise lerna

## v3.43.0

_July 1, 2021_

### Changed

- Decrease maximum allowed package size for atoms and molecules.

## v3.42.7

_June 30, 2021_

### Fixed

- Fix to enable optional chaining in storybook

## v3.42.6

_June 29, 2021_

### Fixed

- Fix Storybook deploy CI build.

## v3.42.5

_June 24, 2021_

### Fixed

- Fix to output the changes varirable so that it works on CircleCI.

## v3.42.4

_June 24, 2021_

### Fixed

- Trying a different fix for the package comparison. Checks if variable is defined rather than a numeric comparison.

## v3.42.3

_June 24, 2021_

### Fixed

- Storybook deploy should reference yarn (to call lerna indirectly).

## v3.42.2

_June 24, 2021_

### Fixed

- Numeric comparison fixed in CircleCI bash script

## v3.42.1

_June 24, 2021_

### Fixed

- Added a couple of exclusions to the root entries that don't trigger a full build.

## v3.42.0

_June 23, 2021_

### Changed

- Optimises the build so that only packages that have been amended run in the build and are tested via Storybook.

### Fixed

- DangerJS now correctly reports when Storybook needs a version bump and CHANGELOG entry.

## v3.41.0

_June 18, 2021_

### Fixed

- Storybook deployer moved to the storybook package (so that it deploys the `index.html` to the root of `gh-pages` correctly).

## v3.40.0

_June 17, 2021_

### Changed

- Updated `@percy/cli` dependency.

## v3.39.0

_June 9, 2021_

### Changed

- Updated Percy tests to use Lerna

## v3.38.0

_June 7, 2021_

### Changed

- `fozzie` version.

## v3.37.0

_May 28, 2021_

### Added

- CircleCI config for running `build`, `lint` & `unit testing` steps individually locally.
- Documentation into storybook guides as to how to run these tests through CircleCI CLI locally and what each task is setup to do.

## v3.36.0

_May 27, 2021_

### Added

- `URL Builder` to all components for testing different knobs against storybook

## v3.35.0

_May 27, 2021_

### Changed

- Force Percy to run in parallel

## v3.34.0

_May 18, 2021_

### Changed

- fozzie to v5.0.0-beta.7 which uses new pie design tokens instead of fozzie-colour-palette vars

## v3.33.0

_May 18, 2021_

### Changed

- `@wdio` to `v7` to fix a Node 14 potential package conflict.

## v3.32.0

_May 5, 2021_

### Removed

- `f-utils` and `fozzie-colour-pallete` packages from dependencies as they are available through `fozzie` package

## v3.31.1

_May 5, 2021_

### Changed

- Heading updates to the storybook documentation – ensures storybook automatically generates anchor tags for these headings.

## v3.31.0

_May 4, 2021_

### Changed

- Replaced `console.logs` in component tests with error handling `%s` string title

### Removed

- Unused READMEs inside `test/component` and `test-utils/component-object` folders
- Extra intermediate `spec` folder in generator for future components (see below entry)

## v3.30.0

_April 30, 2021_

### Added

- Error handling added for `forEach` component tests
- General linting changes and test-cleanup

### Removed

- Unneeded extra intermediate `spec` folder in `test/spec/component`

## v3.29.1

_April 29, 2021_

### Added

- CircleCI config for local testing
- Documentation into storybook guides as to how to install CircleCI local with Docker

_April 16, 2021_

### Added

- `husky` to enable pre-commit lint / test checks

## v3.28.0

_April 14, 2021_

### Added

- Test tagging mechanism for chrome / browserstack

## v3.27.0

_April 13, 2021_

### Added

- Test tagging mechanism for chrome / browserstack

## v3.26.0

_March 29, 2021_

### Added

- A11y markup added for screen-reader support to f-registration.

## v3.25.0

_March 24, 2021_

### Added

- launch.json to provide ability to run / debug individual WDIO test specs against chrome / browserstack / Jest tests

### Removed

- jest-allure2 package

## v3.24.1

_March 23, 2021_

### Added

- `f-wdio-utils` package to all component folders
- `f-wdio-utils` package to generator

### Removed

- `f-wdio-utils` from root package.json

## v3.24.0

_March 22, 2021_

### Changed

- Refactored `jest-allure2` and `allure-reporter`
- Added script `report:test-component:chrome` into package.json for automating component test report
- Updated generator to reflect changes

## v3.23.0

_March 18, 2021_

### Changed

- Updated node `config.yml` to support chromedriver 89.0.0

## v3.22.0

_March 12, 2021_

### Changed

- `wdio-browserstack.conf.js` to support new Browserstack configs.

## v3.21.0

_March 4, 2021_

### Added

- Assertions to a11y tests

## v3.20.0

_March 3, 2021_

### Changed

- Accessibility / Alure folder structure

## v3.19.0

_March 3, 2021_

### Added

- JUnit reporting to show WebDriverIO test results in CircleCI.

## v3.18.0

_February 23, 2021_

### Removed

- `bundlewatch` exclude reverted for `f-status-banner`.

## v3.17.0

_February 22, 2021_

### Changed

- Extracted svgTransform from f-checkout to global test utils for reference by other packages
- Vue SFC files given an indent value of 4 in .editorconfig

## v3.16.0

_February 22, 2021_

### Changed

- Updated f-metadata ➡ f-braze-adapter reference in bundlewatch config

## v3.15.1

_February 18, 2021_

### Changed

- Bumped up fozzie dependency to 5.0.0.beta3

## v3.15.0

_February 18, 2021_

### Added

- Instructions for using `Fozzie` option mixins.

## v3.14.0

_February 15, 2021_

### Added

- `Utility Tools` page to Storybook docs.

### Changed

- `Setup Guides` just changed to `Guides` in Storybook sidebar.
- Content moved out of `Getting Started` and into separate sub-pages.

## v3.13.0

_February 12, 2021_

### Added

- `Contributing Guide` to Storybook docs.
- `Dependencies Guide` to Storybook docs.

### Changed

- `Getting Started` guide updated with links to new sections.
- `CONTRIBUTING.md` updated with new info to be in-line with the Storybook docs.

### Fixed

- Image path in `Typography Setup Guide`.

## v3.12.0

_February 8, 2021_

### Added

- What not to do guide to documentation
- Accessibility automated tests info to documentation
- More info to getting started guide

## v3.11.0

_February 5, 2021_

### Added

- Documentation ported over from the old docs site for `Browser Checklist` and `Content Standards`.

## v3.10.0

_February 5, 2021_

### Added

- Documentation ported over from the old docs site for `Development Principles`, `Accessibility Overview` and `Accessibility Checklist`.
- Some (horrible but necessary) inline CSS styles added for mdx pages in Storybook.

## v3.9.1

_February 4, 2021_

### Fixes

- Dangerfile path fix for storybook checks.

## v3.9.0

_February 4, 2021_

### Changed

- Updated `package.json` with `chromedriver` version to `88.0.0`.
- Updated CircleCI `config.yml` to support updated `chromedriver` version.

## v3.9.0

_February 4, 2021_

### Changed

- Re-organisation of the `/stories` folder.

### Fixed

- Danger not checking `storybook` package changes correctly, because path wasn't present in directory match.

## v3.8.0

_February 4, 2021_

### Added

- `f-wdio-utils` package in the services folder - for the `page-object` file and other webdriverio utils.

## v3.7.1

_February 3, 2021_

### Changed

- Update Axe Helper

## v3.7.0

_January 29, 2021_

### Changed

- Bundle watch maxSize value to `100kb` & target files `umd.min.js, .min & .es.js`.

## v3.7.0

_January 28, 2021_

### Added

- `.yo-rc.json` to signify the destination root of the generator (to use the base of the mono-repo as our root directory, wherever the generator is run).

## v3.6.0

_January 18, 2021_

### Changed

- Unit test directories updated so that they are named `_tests/` to match our previously agreed frontend guidelines.

## v3.5.0

_January 12, 2021_

### Changed

- CircleCI config to run jobs in parallel

## v3.4.0

_January 8, 2021_

### Added

- `eslint-plugin-vuejs-accessibility` dependency to add accessibility checks to linter
  - Existing issues are currently set to `warn` to avoid breaking the build.

## v3.3.0

_January 8, 2021_

### Added

- Automated Axe Core tests for UI components

## v3.2.1

_January 6, 2021_

### Fixed

- Addressed issue with danger checks not correctly identifying package changes with new paths.

## v3.2.0

_January 5, 2021_

### Fixed

- Fixes danger package checks.

## v3.1.0

_January 4, 2021_

### Fixed

- `bundlewatch` config updated in line with new structure.

## v3.0.0

_December 31, 2020_

### Changed

- Folder structure has changed to organise packages into subfolders. We now have `packages/components`, `packages/services` and `packages/tools`.
- Note when upgrading to this version – if you have any build issues, delete your `yarn.lock` and `node_modules` folder in the base of the repo, and do a clean `yarn install`.

## v2.26.0

_December 30, 2020_

### Changed

- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.

## v2.25.0

_December 21, 2020_

### Added

- Documentation for font optimisation and subsetting.

## v2.24.0

_December 11, 2020_

### Changed

- README's for components to remove references to demo files.

### Changed

- package.json component test scripts

## v2.23.0

_December 9, 2020_

### Changed

- CircleCI config to build / serve Storybook for component tests
- package.json component test scripts

### Removed

- Component demo files

## v2.22.1

_December 8, 2020_

### Changed

- Loglevel in `wdio.conf` to silent for less terminal-logging.

## v2.22.0

_December 7, 2020_

### Fixed

- Eslint ignore error for newlines around `option` tags.

## v2.21.1

_December 7, 2020_

### Fixed

- Broken test helper function.

### Added

- Fozzie bear now either approves or disapproves of your build!

## v2.21.0

_December 1, 2020_

### Added

- Ability for CircleCI to post build statuses to slack.

## v2.20.0

_November 30, 2020_

### Added

- `demo-controls-helper.js` to contain any shared functions for controlling props values in WebDriverIO tests

## v2.19.0

_November 24, 2020_

### Added

- Additional webdriver tests for f-header.
- Allure reporter in the package.json script of each component folder (so it can be called more easily).
- Video reporter in wdio.conf so errors are shown via recording in allure report.

## v2.18.0

_November 23, 2020_

### Removed

- Removing CircleCI status reference.

## v2.17.0

_November 17, 2020_

### Changed

- Consolidated test-ids in fozzie components - replaced `data-js-test` attribute with `data-test-id`.

## v2.16.0

_November 17, 2020_

### Changed

- Splitting out `sassOptions` config to allow Eyeglass includes, so all components can use the same config.

## v2.15.0

_November 12, 2020_

### Changed

- Version of `f-utils` updated to v1.

## v2.14.0

_November 11, 2020_

### Added

- `import/no-extraneous-dependencies` to the list of ignored linting rules because many dependencies are set at a workspace level rather than at each package level.

## v2.13.0

_November 10, 2020_

### Added

- Added Allure reporting using WebdriverIO and Jest to Fozzie Components.

## v2.12.0

_November 9, 2020_

### Added

- `services` folder to host services.

### Changed

- Lerna and yarn workspace configurations.

## v2.11.0

_November 6, 2020_

### Changed

- Fozzie updated to v5 beta branch (no changes in components required - mostly restructuring at this point).

## v2.10.0

_November 2, 2020_

### Added

- Added `mocha-each` to package.json.

## v2.9.0

_October 28, 2020_

### Added

- Added an entry to gitignore to ignore some local development tools for mocking http requests

## v2.8.3

_October 28, 2020_

### Added

- `CONTRIBUTING` file added to explain some of the guidelines we have around PRs.

## v2.8.2

_October 28, 2020_

### Removed

- Year from the copyright notes
- Authors from f-vue-icons
- Params from a corporate link
- travis yml file

## v2.8.1

_October 26, 2020_

### Changed

- 'jet' theme variable instead of 'je' in common.scss for the components.

## v2.8.0

_October 23, 2020_

### Added

- Stylelint added to lint styling on component builds (for relevant packages).

## v2.7.0

_October 21, 2020_

### Added

- Added `#globalconfig` flag that can be added to PR titles to stop danger running on all packages (only runs on root).

## v2.6.0

_October 21, 2020_

### Added

- Upgrading `fozzie-colour-palette` and `fozzie` package versions.

## v2.5.0

_October 15, 2020_

### Changed

- Circle CI Docker image
- Chromedriver version to v86.0.0

## v2.4.0

_October 13, 2020_

### Added

- Jest support to Storybook
- Made unit test folder names consistent

## v2.3.0

_October 5, 2020_

### Added

- Axe packages for running a11y tests in any component.

## v2.2.0

_September 29, 2020_

### Added

- Bundlewatch config for monitoring bundle file sizes.

## v2.1.0

_September 28, 2020_

### Removed

- Build config for visual regression tests

## v2.0.0

_September 24, 2020_

### Changed

- Updating components to use `JustEatBasis` and subsequent breaking changes to update font variables to hook into new design token variables in fozzie.

## v1.34.0

_September 24, 2020_

### Changed

- Lerna script to run component tests in series.
- `maxInstanstances` property in WebDriverIO config

### Removed

- Contract test dependency.
- Contract test publish npm script.
- Dependency for finding available ports.

## v1.33.0

_September 21, 2020_

### Removed

- Contract test dependencies + scripts

## v1.32.1

_September 23, 2020_

### Changed

- Updated typography CSS snippet to use valid comment.

## v1.32.0

_September 21, 2020_

### Changed

- Comment out npm publish build step

## v1.31.0

_September 17, 2020_

### Changed

- Updated typography font loading JS snippet to use `classList.add()`.

## v1.30.0

_September 14, 2020_

### Added

- New build step for to run component UI tests
- `local:tests` script to easily run all tests locally before submitting a PR

### Changed

- `wdio-chrome.conf.js` compnent test spec directory

## v1.29.0

_September 9, 2020_

### Added

- New build to publish npm packages as part of CI.

### Changed

- Build step name in config.yml to include addition of integration tests
- Move `@pact-foundation/pact` to devDependencies.

## v1.28.0

_September 9, 2020_

### Changed

- Updated typography font loading JS snippet to use a self-executing function in order to avoid polluting the global namespace.
- Updated typography font loading JS snippet to follow our lint rules more closely.

## v1.27.0

_September 8, 2020_

### Added

- `@pact-foundation/pact` dependency for pact tests
- .gitignore entry for `pacts` folder
- lerna script to execute `test:consumer` script
- `publish:pact` script to publish pacts to the broker

### Changed

- `testEnvironment` in `package.json` for consumer pact tests

## v1.26.0

_September 8, 2020_

### Changed

- Updating `peerDependencies` to use ranges values.
- Updating `devDependencies` in generator package to use same values as the other packages.

### Fixed

- Updated bundle name in generator readme template.

## v1.25.0

_September 1, 2020_

### Added

- WebDriverIO for browser driven component tests

## v1.24.1

_August 20, 2020_

### Changed

- Updated typography docs for importing custom font.

## v1.24.0

_August 18, 2020_

### Changed

- Updated to Storybook `v6` (and updated stories across other packages as part of the migration).

## v1.23.1

_August 18, 2020_

### Added

- CircleCI context to use shared variables.

## v1.23.0

_July 23, 2020_

### Added

- `storybook:serve` & `storybook:build` scripts re-added so that storybook can be run from the root of the mono-repo.

### Changed

- Updating `fozzie` and `fozzie-colour-palette` to latest version (Rebrand rollout - Phase 3).
- Minor package updates.

### Removed

- Moved some specific `f-vue-icons` dependencies away from the root, as not shared by any other package.

## v1.22.0

_July 16, 2020_

### Changed

- Adding package dependencies for new `f-vue-icons` release.

## v1.21.0

_July 13, 2020_

### Added

- Updated Docker image in `config.yml` to include Chrome for Percy visual regression tests
- New task in `config.yml` to run visual regression tests

### Changed

- Updated `sass-loader` to 7.3.1 to allow storybook to perform contextual import of common.scss files
  from Single File Components in subdirectories
- SSH key fingerprint that is used to deploy Storybook

## v1.20.0

_July 9, 2020_

### Changed

- Updating dependencies of `fozzie-header` and `f-footer` packages.

## v1.19.0

_June 25, 2020_

### Changed

- Updating base version of `fozzie-colour-palette` and updating any colour variables affected.
- Minor package updates.

## v1.18.0

_June 25, 2020_

### Added

- devDependency on `cross-env` to allow for cross-platform environment variables in CI scripts

### Changed

- scripts using `$LERNA_ARGS` to use `cross-env` as above

## v1.17.0

_June 24, 2020_

### Changed

- CircleCI params to restrict build concurrency to 1 to solve memory issues
- StoryBook CircleCI build to build packages first to ensure dependencies are available

## v1.16.0

_June 8, 2020_

### Changed

- Updated `fozzie` and `fozzie-colour-palette` dependencies to pull in updated JET theme variables for ML.

## v1.15.0

_June 4, 2020_

### Changed

- ESLint autofix turned off across all packages for default lint tasks so that tests don't pass due to `--fix` being applied (as they should fail when this happens to prompt engineers to autofix).

## v1.14.0

_June 3, 2020_

### Changed

- Updated `fozzie` and `fozzie-colour-palette` dependencies to pull in latest JET theme variables for ML.

## v1.13.0

_May 12, 2020_

### Changed

- Updating Storybook story file format.

## v1.12.0

_May 12, 2020_

### Changed

- Updated some base dependencies (all minor version bumps).

## v1.11.0

_May 1, 2020_

### Added

- `webdriverio` dependency so that we're able to utilise WebDriverIO functionality in our new `*.page.js` files.

## v1.10.0

_April 27, 2020_

### Added

- NPM Scripts at the root of the mono repo to run the Storybook docs through `yarn storybook:build` and `yarn storybook:serve`.

## v1.9.0

_April 23, 2020_

### Added

- `@storybook/storybook-deployer` dependency to easily deploy storybook using the `storybook:deploy` script
- Updated Circle CI config.yml to include new `deploy` workflow + other tweaks to existing `build` workflow
- Added link to hosted Storybook in fozzie-component docs.

## v1.9.0

_April 23, 2020_

### Added

- `generator-component` added to scaffold new components.

## v1.8.1

_April 9, 2020_

### Fixed

- Running build CI step before unit tests and linting tests, as some linting checks rely on the compiled `dist` asset to check against (when checking `import` for instance).

## v1.8.0

_April 3, 2020_

### Added

- Empty `babel.config.js` added at the mono-repo root, because otherwise `vue-cli` upgrade commands fail as it assumes its presence.

### Changed

- Upgraded `vue-cli` to `v4` where possible (includes `@vue/cli-service` and `@vue/cli-plugin-babel`). Have tried running auto-migration of `@vue/cli-plugin-eslint` and `@vue/cli-plugin-jest` but both of these tasks require further work, so have parked for now as not essential.

## v1.7.0

_March 31, 2020_

### Added

- `f-skeleton-component` added for use when creating base component structure.

## v1.6.0

_March 30, 2020_

### Added

- Added the `eslint-import-resolver-webpack` so that eslint can understand webpack special characters such as `@` used in import paths

### Changed

- Minor package updates

## v1.5.1

_February 24, 2020_

### Removed

- `isSettings` check from package babel configs. This is a custom `ENV` variable used in `f-searchbox` and isn't used anywhere else.

## v1.5.0

_February 24, 2020_

### Changed

- Updated packages to have consistent lint rules
- CircleCI Badge on README replaces TravisCI badge
- Node version (`package.json`) updated to be `>=10.0.0` across all packages, as that's what we test against.
- CircleCI Build now runs lint and build checks on all packages
- `f-services` patch release (deleted some redundant/unneeded packages)

## v1.4.1

_February 10, 2020_

### Fixed

- DangerJS fix for package paths and for false positive around reporting change in the root

## v1.4.0

_February 6, 2020_

### Added

- DangerJS Checks (via CircleCI)
- Pull Request Template
- `CODEOWNERS` file

## v1.3.0

_February 5, 2020_

### Added

- CircleCI base config for PR checks. Config currently will run unit tests across all `fozzie-components` packages

## v1.2.1

_January 30, 2020_

### Added

- Link to Fozzie docs

## v1.2.0

_September 18, 2019_

### Added

- `shared.service.js` for duplicated logic used in `f-header` and `f-footer`
- `@babel/plugin-proposal-optional-chaining` to be used in `f-header` and `f-footer` components

## v1.1.0

_June 21, 2019_

### Added

- Shareable browserslist config

### Changed

- ESLint configs moved to root of monorepo

## v1.0.0

_June 21, 2019_

### Added

- `package.json` versioning and changelog of the root package to follow root it's specific changes

### Changed

- Move dev dependencies from `f-vue-icons` to the root folder using `lerna link convert`
  Packages that are used by npm scripts left in the package to be able to run scripts not only from the root
