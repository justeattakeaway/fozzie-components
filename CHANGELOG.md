# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v7.7.0
------------------------------
*April 29, 2022*

### Changed
- CircleCI docker image to use latest Node 14 + Chrome

v7.6.0
------------------------------
*April 13, 2022*

### Changed
- Node 12 / 14 now required in order to match CI.


v7.5.0
------------------------------
*April 11, 2022*

### Changed
- Upgrade Percy packages to prevent warnings in the Percy dashboard.

v7.4.0
------------------------------
*March 21, 2022*

### Changed
- Upgrade several Vue CLI packages to avoid a node-ipc issue


v7.3.0
------------------------------
*March 29, 2022*

### Changed
- Stylelint called directly now rather than through vue-cli in NPM scripts.


v7.2.0
------------------------------
*March 28, 2022*

### Removed
- f-development-context service removed.


v7.1.0
------------------------------
*March 9, 2022*
### Added
- `f-wido-utils` version bump.

### Removed
- Reference to `getAccessibilityTestResults` from `axe-helper` file.

### Changed
- References within mono-repo to take wrapper method `getAxeResults` instead.


v7.0.1
------------------------------
*March 1, 2022*

### Added
- `resource_class` to circleci `config.yml` file to increase resource level for more powerful VMs.


v7.0.0
------------------------------
*February 15, 2022*

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


v6.1.1
------------------------------
*February 4, 2022*

### Added
- Additional content to `visual-regression-setup.stories.mdx` readme for visual testing.


v6.1.0
------------------------------
*February 4, 2022*

### Changed
- Updated repo to use ESLint v8
- wdio plugin added to ESLint

### Removed
- Reliance on vue-cli for JS linting as meant we were tied to the version it supported (which is currently v6).


v6.0.0
------------------------------
*January 31, 2022*

### Changed
- `spacing()` calls throughout repo to new Pie token references e.g `spacing(x2)` > `spacing(d)`


v5.11.0
------------------------------
*January 27, 2022*

### Changed
- `test/shared.config` added additional filename `test/visual/*.visual.spec.js` to testType array.


v5.10.1
------------------------------
*January 21, 2022*

### Changed
- `axe-helper.js` with A11y Axe rules to match storybook and to increase our a11y test coverage.


v5.10.0
------------------------------
*January 20, 2022*

### Changed
- `.circleci/config.yml` to automatically publish new package versions to the npm registry.


v5.9.0
------------------------------
*January 20, 2022*

### Changed
- `.circleci/config.yml` to put danger checks in their own workflow.


v5.8.7
------------------------------
*January 17, 2022*

### Changed
- `axe-core` version to latest.

### Fixed
- `axe-helper.js` to create reports in the correct directory if tests fail locally.


v5.8.6
------------------------------
*January 13, 2022*

### Fixed
- Small issue with memory being exceeded with concurrency 2


v5.8.5
------------------------------
*January 10, 2022*

### Fixed
- Small `yarn.lock` update and whitespace fix


v5.8.4
------------------------------
*January 07, 2022*

### Fixed
- Storybook deploy + reverted to old cache mechanism.

v5.8.3
------------------------------
*January 07, 2022*

### Fixed
- Storybook deploy.

v5.8.2
------------------------------
*January 04, 2022*

### Added
- `f-form` to Circle CI cache.


v5.8.1
------------------------------
*December 21, 2021*

### Changed
- Circle CI cached components to include new f-filter-pill component


v5.8.0
------------------------------
*December 20, 2021*

### Changed
- fozzie package to the latest (v6.2.0).


v5.7.0
------------------------------
*December 16, 2021*

### Removed
- CircleCI Approval process for builds.


v5.6.0
------------------------------
*November 26, 2021*

### Changed
- Updated the circle ci config to include an approval process


v5.5.0
------------------------------
*November 26, 2021*

### Added
- `peer-deps-externals-webpack-plugin` to automatically add a library's peerDependencies to the bundle's externals.


v5.4.0
------------------------------
*November 22, 2021*

### Changed
- `chromedriver` dependency to `96.0.0`
- `.circleci/*.yaml` files to use new Docker image with Chrome v96


v5.3.2
------------------------------
*November 12, 2021*

### Changed
- wdio configuration for component, visual and a11y tests.
- allure script in `wdio-shared.conf.js` and `package.json`.
- small update of generator to reflect above changes.


v5.3.1
------------------------------
*November 12, 2021*

### Changed
- Updated documentation for visual regression test setup.


v5.3.0
------------------------------
*November 9, 2021*

### Added
- `templates` and `pages` component directories added to lerna config.

### Changed
- Updated engine from Node v10 > v12 on all packages (as we only test in Node 12+).


v5.2.0
------------------------------
*November 5, 2021*

### Changed
- Moved a number of `Organisms` over to the `Pages` directory.


v5.1.4
------------------------------
*November 5, 2021*

### Changed
- Updates to `f-wdio-utils` package version across our components.


v5.1.3
------------------------------
*November 3, 2021*

### Added
- `f-error-boundary` generated component.


v5.1.2
------------------------------
*November 3, 2021*

### Added
- `f-card-with-content` generated component.


v5.1.1
------------------------------
*November 2, 2021*

### Changed
- Updated Circle CI for new location of f-template-subnav


v5.1.0
------------------------------
*October 28, 2021*

### Changed
- fozzie package update to the latest (6.0.0) to include latest pie-design-tokens.

v5.0.4
------------------------------
*October 28, 2021*

### Added
- `f-spinner` to Circle CI cache.


v5.0.4
------------------------------
*October 28, 2021*

### Changed
- Circle CI cached components to include new f-image-tile component

v5.0.3
------------------------------
*October 28, 2021*

### Removed
- Label watcher GitHub Action and related scripts.
- `wip` labeller.


v5.0.2
------------------------------
*October 25, 2021*

### Removed
- Unused Browserstack and Allure scripts
- Browserstack configuration files
- Reference to JE_ENV environment variable
- Percy and Browserstack tags

### Changed
- Filenames for component tests


v5.0.1
------------------------------
*October 20, 2021*

### Added
- `f-promotions-showcase` to Circle CI cache


v5.0.0
------------------------------
*October 21, 2021*

### Added
- Component folders for `templates` and `pages`.
- Templates are for layout components that are intended to handle page level layout decisions (for example, a sideNav layout such as on our account pages). Templates don't contain any logic around the actual set of pages, they just handle the overall layout structure and styling.
- Pages are for our largest organisms, whereby they are a collection of components that make up the main body of a page. For example, `f-registration` and `f-checkout` are both examples of `page` components.

### Changed
- Config for CircleCI, Lerna, yarn workspaces and danger.js updated to include new folder paths.
- Moved `f-registration` into `pages` directory. Will look to move other organisms one-by-one by liaising with each team working on these components.


v4.7.1
------------------------------
*October 20, 2021*

### Added
- Document for recording agreed Do's and Don'ts on our codebase


v4.7.0
------------------------------
*October 19, 2021*

### Changed
- `fozzie` package version bump.


v4.6.3
------------------------------
*October 18, 2021*

### Added
- `f-compatibility` to Circle CI cache.


v4.6.2
------------------------------
*October 18, 2021*

### Added
- `f-navigation-links` to Circle CI cache.


v4.6.1
------------------------------
*October 12, 2021*

### Added
- `f-contact-preferences` to Circle CI cache.


v4.6.0
------------------------------
*October 8, 2021*

 ### Changed
 - Always run visual tests against master.
 - Only run visual tests against changed packages.


v4.5.0
------------------------------
*October 8, 2021*

### Changed
- webdriverIO to v91.


v4.4.0
------------------------------
*October 7, 2021*

### Added
- Conditional logic to visual regression tests (via new `visual-regression-preflight.js` script).
- Custom Github Action for triggering Circle CI pipeline when `wip` tag is removed.


v4.3.2
------------------------------
*October 6, 2021*

### Changed
- Only apply `wip` label to newly opened/reopened PRs.


v4.3.1
------------------------------
*October 6, 2021*

### Changed
- `labeler` workflow config path


v4.3.0
------------------------------
*October 6, 2021*

### Added
- Labeler action
  - Automatically applies `wip` label to new PRs
  - Applies category labels based on whether the PR affects `atoms`, `molecules`, `services`, etc.


v4.2.0
------------------------------
*October 5, 2021*

### Changed
- `fozzie` package version bump to 6.0.0-beta.5 to include new colour theme and radius vars.


v4.1.0
------------------------------
*October 4, 2021*

### Changed
- Circle CI cached components to include new f-restaurant-card component


v4.0.0
------------------------------
*September 15, 2021*

### Changed
- fozzie version to make normalize styles optional. This will remove normalize styles from the components by default.
- JETSansDigital font instead of JustEatBasis for the components and storybook.


v4.0.0-beta.0
------------------------------
*August 25, 2021*

### Changed
- fozzie version to include new font.

### Changed
- Storybook font to become new JETSansDigital instead of JustEatBasis.


v3.54.0
------------------------------
*September 2, 2021*

### Changed
- Adding logging for local testing so it's easier to troubleshoot component tests.


v3.53.2
------------------------------
*September 2, 2021*

### Fixed
- Typography documentation updated with correct syntax.


v3.53.1
------------------------------
*August 23, 2021*

### Changed
- Removing all restore cache except master on build phase

### Added
- Added back in slack notifications on build steps


v3.53.0
------------------------------
*August 23, 2021*

### Changed
- Changed the circle CI config to implement caching for our builds and splitting the build process into test and build


v3.52.2
------------------------------
*August 12, 2021*

### Fixed
- Issue with deps not getting build when building Storybook.


v3.52.1
------------------------------
*August 11, 2021*

### Changed
- Various packages to latest version of `f-wdio-utils - v0.3.0`


v3.52.0
------------------------------
*August 5, 2021*

### Changed
- Upgraded webpack resolution to support storybook upgrade.


v3.51.0
------------------------------
*August 4, 2021*

### Changed
- Storybook documentation update and updating some minor package versions.


v3.50.0
------------------------------
*July 22, 2021*

### Added
- Names for unnamed Circle CI steps.


v3.49.0
------------------------------
*July 20, 2021*

### Changed
- Fozzie version to v5.0.0-beta.10 which has the latest pie design token variables.


v3.48.0
------------------------------
*July 19, 2021*

### Added
- Test level overview documentation to Storybook.


v3.47.0
------------------------------
*July 19, 2021*

### Changed
- Bump dependency of `f-button` across a number of packages (no version bumps as no changes to the actual package were needed).
- Some other minor package version bumps.


v3.46.0
------------------------------
*July 16, 2021*

### Added
- Feature Management service component (initial skeleton).


v3.45.0
------------------------------
*July 14, 2021*

### Added
- `Storybook - Run Currently Open Story File` command in `launch.json`


v3.44.6
------------------------------
*July 12, 2021*

### Fixed
- A few linting and formatting issues across files.


v3.44.5
------------------------------
*July 7, 2021*

### Fixed
- Build all packages when running bundlewatch

v3.44.4
------------------------------
*July 6, 2021*

## Fix
- Removed Bundlewatch comparison to master

v3.44.3
------------------------------
*July 6, 2021*

## Fix
- Fix Bundlewatch fails

v3.44.2
------------------------------
*July 5, 2021*

## Fix
- Fix CircleCI lint error when building one component.

v3.44.1
------------------------------
*July 2, 2021*

## Fixed
- Issue where Bundlewatch fails on master as no packages have changed.


v3.44.0
------------------------------
*July 1, 2021*

## Changed
- Bundlewatch to utilise lerna


v3.43.0
------------------------------
*July 1, 2021*

### Changed
- Decrease maximum allowed package size for atoms and molecules.


v3.42.7
------------------------------
*June 30, 2021*

### Fixed
- Fix to enable optional chaining in storybook


v3.42.6
------------------------------
*June 29, 2021*

### Fixed
- Fix Storybook deploy CI build.


v3.42.5
------------------------------
*June 24, 2021*

### Fixed
- Fix to output the changes varirable so that it works on CircleCI.


v3.42.4
------------------------------
*June 24, 2021*

### Fixed
- Trying a different fix for the package comparison. Checks if variable is defined rather than a numeric comparison.


v3.42.3
------------------------------
*June 24, 2021*

### Fixed
- Storybook deploy should reference yarn (to call lerna indirectly).


v3.42.2
------------------------------
*June 24, 2021*

### Fixed
- Numeric comparison fixed in CircleCI bash script


v3.42.1
------------------------------
*June 24, 2021*

### Fixed
- Added a couple of exclusions to the root entries that don't trigger a full build.


v3.42.0
------------------------------
*June 23, 2021*

### Changed
- Optimises the build so that only packages that have been amended run in the build and are tested via Storybook.

### Fixed
- DangerJS now correctly reports when Storybook needs a version bump and CHANGELOG entry.


v3.41.0
------------------------------
*June 18, 2021*

### Fixed
- Storybook deployer moved to the storybook package (so that it deploys the `index.html` to the root of `gh-pages` correctly).


v3.40.0
------------------------------
*June 17, 2021*

### Changed
- Updated `@percy/cli` dependency.


v3.39.0
------------------------------
*June 9, 2021*

### Changed
- Updated Percy tests to use Lerna


v3.38.0
------------------------------
*June 7, 2021*

### Changed
- `fozzie` version.


v3.37.0
------------------------------
*May 28, 2021*

### Added
- CircleCI config for running `build`, `lint` & `unit testing` steps individually locally.
- Documentation into storybook guides as to how to run these tests through CircleCI CLI locally and what each task is setup to do.


v3.36.0
------------------------------
*May 27, 2021*

### Added
- `URL Builder` to all components for testing different knobs against storybook


v3.35.0
------------------------------
*May 27, 2021*

### Changed
- Force Percy to run in parallel


v3.34.0
------------------------------
*May 18, 2021*

### Changed
- fozzie to v5.0.0-beta.7 which uses new pie design tokens instead of fozzie-colour-palette vars


v3.33.0
------------------------------
*May 18, 2021*

### Changed
- `@wdio` to `v7` to fix a Node 14 potential package conflict.


v3.32.0
------------------------------
*May 5, 2021*

### Removed
- `f-utils` and `fozzie-colour-pallete` packages from dependencies as they are available through `fozzie` package


v3.31.1
------------------------------
*May 5, 2021*

### Changed
- Heading updates to the storybook documentation – ensures storybook automatically generates anchor tags for these headings.


v3.31.0
------------------------------
*May 4, 2021*

### Changed
- Replaced `console.logs` in component tests with error handling `%s` string title

### Removed
- Unused READMEs inside `test/component` and `test-utils/component-object` folders
- Extra intermediate `spec` folder in generator for future components (see below entry)


v3.30.0
------------------------------
*April 30, 2021*

### Added
- Error handling added for `forEach` component tests
- General linting changes and test-cleanup

### Removed
- Unneeded extra intermediate `spec` folder in `test/spec/component`


v3.29.1
------------------------------
*April 29, 2021*

### Added
- CircleCI config for local testing
- Documentation into storybook guides as to how to install CircleCI local with Docker

*April 16, 2021*

### Added
- `husky` to enable pre-commit lint / test checks


v3.28.0
------------------------------
*April 14, 2021*

### Added
- Test tagging mechanism for chrome / browserstack


v3.27.0
------------------------------
*April 13, 2021*

### Added
- Test tagging mechanism for chrome / browserstack


v3.26.0
------------------------------
*March 29, 2021*

### Added
- A11y markup added for screen-reader support to f-registration.


v3.25.0
------------------------------
*March 24, 2021*

### Added
- launch.json to provide ability to run / debug individual WDIO test specs against chrome / browserstack / Jest tests

### Removed
- jest-allure2 package


v3.24.1
------------------------------
*March 23, 2021*

### Added
- `f-wdio-utils` package to all component folders
- `f-wdio-utils` package to generator

### Removed
- `f-wdio-utils` from root package.json


v3.24.0
------------------------------
*March 22, 2021*

### Changed
- Refactored `jest-allure2` and `allure-reporter`
- Added script `report:test-component:chrome` into package.json for automating component test report
- Updated generator to reflect changes


v3.23.0
------------------------------
*March 18, 2021*

### Changed
- Updated node `config.yml` to support chromedriver 89.0.0


v3.22.0
------------------------------
*March 12, 2021*

### Changed
- `wdio-browserstack.conf.js` to support new Browserstack configs.


v3.21.0
------------------------------
*March 4, 2021*

### Added
- Assertions to a11y tests


v3.20.0
------------------------------
*March 3, 2021*

### Changed
- Accessibility / Alure folder structure


v3.19.0
------------------------------
*March 3, 2021*

### Added
- JUnit reporting to show WebDriverIO test results in CircleCI.


v3.18.0
------------------------------
*February 23, 2021*

### Removed
- `bundlewatch` exclude reverted for `f-status-banner`.


v3.17.0
------------------------------
*February 22, 2021*

### Changed
- Extracted svgTransform from f-checkout to global test utils for reference by other packages
- Vue SFC files given an indent value of 4 in .editorconfig


v3.16.0
------------------------------
*February 22, 2021*

### Changed
- Updated f-metadata ➡ f-braze-adapter reference in bundlewatch config


v3.15.1
------------------------------
*February 18, 2021*

### Changed
- Bumped up fozzie dependency to 5.0.0.beta3


v3.15.0
------------------------------
*February 18, 2021*

### Added
- Instructions for using `Fozzie` option mixins.


v3.14.0
------------------------------
*February 15, 2021*

### Added
- `Utility Tools` page to Storybook docs.

### Changed
- `Setup Guides` just changed to `Guides` in Storybook sidebar.
- Content moved out of `Getting Started` and into separate sub-pages.


v3.13.0
------------------------------
*February 12, 2021*

### Added
- `Contributing Guide` to Storybook docs.
- `Dependencies Guide` to Storybook docs.

### Changed
- `Getting Started` guide updated with links to new sections.
- `CONTRIBUTING.md` updated with new info to be in-line with the Storybook docs.

### Fixed
- Image path in `Typography Setup Guide`.


v3.12.0
------------------------------
*February 8, 2021*

### Added
- What not to do guide to documentation
- Accessibility automated tests info to documentation
- More info to getting started guide


v3.11.0
------------------------------
*February 5, 2021*

### Added
- Documentation ported over from the old docs site for `Browser Checklist` and `Content Standards`.


v3.10.0
------------------------------
*February 5, 2021*

### Added
- Documentation ported over from the old docs site for `Development Principles`, `Accessibility Overview` and `Accessibility Checklist`.
- Some (horrible but necessary) inline CSS styles added for mdx pages in Storybook.


v3.9.1
------------------------------
*February 4, 2021*

### Fixes
- Dangerfile path fix for storybook checks.


v3.9.0
------------------------------
*February 4, 2021*

### Changed
- Updated `package.json` with `chromedriver` version to `88.0.0`.
- Updated CircleCI `config.yml` to support updated `chromedriver` version.


v3.9.0
------------------------------
*February 4, 2021*

### Changed
- Re-organisation of the `/stories` folder.

### Fixed
- Danger not checking `storybook` package changes correctly, because path wasn't present in directory match.


v3.8.0
------------------------------
*February 4, 2021*

### Added
- `f-wdio-utils` package in the services folder - for the `page-object` file and other webdriverio utils.


v3.7.1
------------------------------
*February 3, 2021*

### Changed
- Update Axe Helper


v3.7.0
------------------------------
*January 29, 2021*

### Changed
- Bundle watch maxSize value to `100kb` & target files `umd.min.js, .min & .es.js`.


v3.7.0
------------------------------
*January 28, 2021*

### Added
- `.yo-rc.json` to signify the destination root of the generator (to use the base of the mono-repo as our root directory, wherever the generator is run).


v3.6.0
------------------------------
*January 18, 2021*

### Changed
- Unit test directories updated so that they are named `_tests/` to match our previously agreed frontend guidelines.


v3.5.0
------------------------------
*January 12, 2021*

### Changed
- CircleCI config to run jobs in parallel


v3.4.0
------------------------------
*January 8, 2021*

### Added
- `eslint-plugin-vuejs-accessibility` dependency to add accessibility checks to linter
  - Existing issues are currently set to `warn` to avoid breaking the build.


v3.3.0
------------------------------
*January 8, 2021*

### Added
- Automated Axe Core tests for UI components


v3.2.1
------------------------------
*January 6, 2021*

### Fixed
- Addressed issue with danger checks not correctly identifying package changes with new paths.


v3.2.0
------------------------------
*January 5, 2021*

### Fixed
- Fixes danger package checks.


v3.1.0
------------------------------
*January 4, 2021*

### Fixed
- `bundlewatch` config updated in line with new structure.


v3.0.0
------------------------------
*December 31, 2020*

### Changed
- Folder structure has changed to organise packages into subfolders. We now have `packages/components`, `packages/services` and `packages/tools`.
- Note when upgrading to this version – if you have any build issues, delete your `yarn.lock` and `node_modules` folder in the base of the repo, and do a clean `yarn install`.


v2.26.0
------------------------------
*December 30, 2020*

### Changed
- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.


v2.25.0
------------------------------
*December 21, 2020*

### Added
- Documentation for font optimisation and subsetting.


v2.24.0
------------------------------
*December 11, 2020*

### Changed
- README's for components to remove references to demo files.

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

### Changed
- Splitting out `sassOptions` config to allow Eyeglass includes, so all components can use the same config.


v2.15.0
------------------------------
*November 12, 2020*

### Changed
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
- `wdio-chrome.conf.js` compnent test spec directory


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
