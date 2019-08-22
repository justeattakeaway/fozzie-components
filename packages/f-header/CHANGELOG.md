# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v1.7.0
------------------------------
*March 27, 2019*

### Added
- Add a check to make sure that hamburger menu is closed when the user navigates back to the page
- Unit test for it


v1.6.0
------------------------------
*March 21, 2019*

### Changed
- Replace logo svgs with correct aspect ratio ones according to the designs
- Reduce size of logo for smaller devices

If you have a config.json with logo url path, be aware that logo svg name now is je-logo--light.v2.svg and je-logo.v2.svg, which needs to be updated in your config


v1.5.1
------------------------------
*March 6, 2019*

### Changed
- Hyperlinks to the login page now include a "rel='nofollow'" html attribute


v1.5.0
------------------------------
*February 18, 2019*

### Fixed
- Fixed issue with `is-navInView` class not being applied to narrow header element to stop scrolling of the page.  Also has to add new `is-navInView--noPad` to allow for transparent/fixed headers.

### Changed
- Tests changed from being snapshots where unnecessary.


v1.4.0
------------------------------
*February 15, 2019*

### Added
- Added payment link localisation for da-DK, nb-NO, es-ES.


v1.3.0
------------------------------
*February 14, 2019*

### Changed
- 'loginLinkText' from 'Log-in' to 'Log in'
- `c-skipTo` style amends


v1.2.1
------------------------------
*January 30, 2019*

### Added
- Added `babel-core` resolution.


v1.2.0
------------------------------
*January 30, 2019*

### Added
- Added `useTransparentHeader` flag for transparent header classes.


v1.1.1
------------------------------
*December 11, 2018*

### Fixed
- Fixed text colour of the popover menu, on hover.


v1.1.0
------------------------------
*November 8, 2018*

### Changed
- Updated `.c-header-button` position and increased tap area to size of narrow header.


v1.0.2
------------------------------
*November 6, 2018*

### Fixed
- Fixed Menulog logo positioning. Also removed the logo outline in transparent mode so if background colour changes we won't need to update the logo.


v1.0.1
------------------------------
*November 6, 2018*

### Fixed
- Fixed Menulog logo.


v1.0.0
------------------------------
*November 5, 2018*

### Changed
- Removed gradient effect from `c-header--gradient`. Added the new `c-header--gradient` class for gradient effect.

### Added
- Added transparency to the header icon.


v0.47.1
------------------------------
*October 23, 2018*

### Fixed
- Removed duplicate SCSS variable.


v0.47.0
------------------------------
*October 23, 2018*

### Added
- Added styles for `c-header-buttonCount`.


v0.46.0
------------------------------
*October 22, 2018*

### Changed
- Changed `z-index` on `c-header-button` to `high - 1` to stop elm showing when popover components are active


v0.45.0
------------------------------
*October 12, 2018*

### Changed
- Babel config and packages removed from module as now added by `gulp-build-fozzie`.
- Unfortunately cannot remove the `espree` resolution due to this needing to be locked down on a per package basis.


v0.44.0
------------------------------
*October 9, 2018*

### Fixed
- Travis build fixed by regenerating the yarn lock file.
- Lint parsing error fixed by adding "espree" resolution.
- Added `f-logger` to fix warnings about console logging in userData module.


v0.43.0
------------------------------
*October 8, 2018*

### Changed
- Added Menulog theme overrides that will be active when SCSS is compiled with `$theme: ml;`.
- Updated dependencies to use Babel 7

### Fixed
- Updated Snapshot files from previous commit (to fix snapshot tests)
- Added `f-logger` to fix warnings about console logging in userAuth module


v0.42.0
------------------------------
*October 8, 2018*

### Changed
- Updated `data-nav-enhance` to `data-nav-button` and `data-nav-accessible-button` to work with non-js accessible menu markup
- Updated unit tests to work after removal of `data-nav-enhance`

### Removed
- Removed JS functionality to convert input to a button as creates a bug in Chrome checkbox selection


v0.41.0
------------------------------
*October 4, 2018*

### Fixed
- Header button `z-index` value updated so that it displays above elements.


v0.40.0
------------------------------
*October 2, 2018*

### Changed
- Moved base header styles into `_header.scss` file for better separation
- Changed utils dependencies onto `@justeat/f-utils` module rather than using `kickoff/utils`
- Updated package dependencies


v0.39.0
------------------------------
*October 1, 2018*

### Fixed
- Header `z-index` value updated so that it displays above elements.
- Transparent header nav text link colour should always be white.

### Added
- Header CSS class variable to template.


v0.38.1
------------------------------
*September 27, 2018*

### Fixed
- Slack build notifications for Travis.


v0.38.0
------------------------------
*September 27, 2018*

### Added
- Added transparent header modifier.
- Slack build notifications from Travis.

### Changed
- Updated `.gitignore`.
- Tweaked the unit test npm scripts.
- Updated readme.
- eslint auto fixed changes in JS modules.

### Fixed
- Removed extra padding top from nav which was causing a very slight jump when the nav opened on small screens.


v0.37.0
------------------------------
*September 13, 2018*

### Changed
- Updated `c-header-button` click area.


v0.36.0
------------------------------
*September 11, 2018*

### Fixed
- Fixed positioning on `c-header-button`.

### Changed
- Changed targetting on `c-header-buttonIcon` SVG to apply fill.
- Updates `c-header` border.


v0.35.0
------------------------------
*August 29, 2018*

### Changed
- Added pseudo-locale `qps-ploc` for localisation testing on Windows.


v0.34.0
------------------------------
*August 23, 2018*

### Changed
- Updated burger menu icon to be consistent with JustEats current icon pack

v0.33.0
------------------------------
*August 23, 2018*

### Added
- `data-sticky-element` attribute to header
- Addition of `c-header-button` styles

v0.32.0
------------------------------
*August 10, 2018*

### Added
- Peer dependency to `f-icons` added to `package.json`
- CODEOWNERS file added

### Changed
- Chevron icon in language switcher now inlined using inlineSVG helper
- Tidied up some class names in the language switcher
- Updated PR template with new links and updated browsers

### Fixed
- The body container now doesn't jump around when the menu is opened.
- The navigation height is now correct when multi language versions of the site are viewed (it previously overlapped the header/logo when open).
- Fixed persistent scrollbar which was visible on narrow viewports.


v0.31.0
------------------------------
*July 23, 2018*

### Added
- Logo alt text added


v0.30.0
------------------------------
*June 18, 2018*

### Added
- Added basic menulog support for OrderWeb


v0.29.0
------------------------------
*June 15, 2018*

### Added
- rimraf dev dependency.
- Script to clean the `dist` directory before transpiling code which runs before compile script.
- snyk badge.

### Changed
- Prevent adding unit test files to the `dist` directory.

### Removed
- Removed the gemnasium badge from the readme.


v0.28.0
------------------------------
*June 15, 2018*

### Changed
- Updated DangerJS config.


v0.27.0
------------------------------
*May 11, 2018*

### Changed
- Updating package dependencies


v0.26.0
------------------------------
*April 25, 2018*

### Changed
- Support server-side rendering of the user menu without needing to use `checkForUser()` client-side.


v0.25.0
------------------------------
*April 24, 2018*

### Changed
- `$nav-text-size` to use new `base--scaleUp` property from the `fozzie` `$type` map.


v0.24.0
------------------------------
*April 17, 2018*

### Added
- Render language-switcher partial based on `isMultiLingual` flag


v0.23.0
------------------------------
*April 16, 2018*

### Added
- Conditional `target="_blank"` for the help menu link


v0.22.1
------------------------------
*April 12, 2018*

### Added
- Re-added some properties to docs data to fix the language switcher text.


v0.22.0
------------------------------
*April 11, 2018*

### Added
- Added localisation for en-AU and en-NZ.


v0.21.3
------------------------------
*April 11, 2018*

### Removed
- Removed links and unnecessary properties from docs data.


v0.21.2
------------------------------
*April 9, 2018*

### Fixed
- Fix typo in link.


v0.21.1
------------------------------
*April 5, 2018*

### Changed
- Undo renaming of templates and translations. Clashing of names shouldn't be an issue.


v0.21.0
------------------------------
*April 4, 2018*

### Changed
- Prepend template filenames with `header-`.
- Prepend translations with `header-`.

### Added
- `header-docs-data.json` containing the data for the header docs.


v0.20.5
------------------------------
*February 20, 2018*

### Changed
- Updated alternative language url property name.


v0.20.4
------------------------------
*February 20, 2018*

### Fixed
- Fixed issue when opening the mobile navigation and content still allowed to scroll.


v0.20.3
------------------------------
*February 19, 2018*

### Changed
- Made popover style prettier to match consumerweb uk.


v0.20.2
------------------------------
*February 19, 2018*

### Changed
- Moved all JavaScript unit tests under a single directory.


v0.20.1
------------------------------
*February 15, 2018*

### Changed
- Package bump.


v0.20.0
------------------------------
*February 15, 2018*

### Changed
- Change default exports to named exports
- Exporting `checkForUser` function.
- Ignore eslint rule for using default exports.
- Moved all JavaScript unit tests into the same directory.
- Moved jest modules into `devDependencies`.
- Updated Travis config.

### Removed
- Removed the `ordercountlink` link element.


v0.19.0
------------------------------
*February 14, 2018*

### Changed
- Added class `is-navInView` to `nav` partial.
- Added toggling funcionality of class `is-navInView` to html element to prevent users scrolling page when navigation is in viev.
- Added tests for the toggling of class to the HTML element.


v0.18.0
------------------------------
*February 14, 2018*

### Added
- Handlebars template for order count elements

### Changed
- checkForUser is no longer a default export


v0.17.0
------------------------------
*February 8, 2018*

### Added
- userAuth module from GlobalWeb (including `index.js`, `userData.js` and their unit tests).
- `jest.setup.js` file.
- Dependencies `jest-fetch-mock` and `jest-localstorage-mock`.


v0.16.0
------------------------------
*February 1, 2018*

### Changed
- Renamed alternate language links partial.

### Fixed
- Fixed variable name for alternate language links.


v0.15.0
------------------------------
*January 30, 2018*

### Added
- Added new shared header handlebars templates.
- Added header translations file.

### Changed
- Updated `f-copy-assets` config to output files to different directories.
- Updated `gulp-build-fozzie` to lates version.
- Included templates directory in published package.

### Removed
- Removed existing placeholder header template.


v0.14.0
------------------------------
*January 29, 2018*

### Changed
- Updated `browserslist`
- Updated package dependencies (minor updates)


v0.13.0
------------------------------
*January 22, 2018*

### Added
- Added `skipTo` SCSS partial.

### Changed
- Prefixed component classes with `c-`.


v0.12.0
------------------------------
*January 17, 2018*

### Added
- `dangerfile.js` added to check PRs via Travis

### Changed
- Updated `gulp-build-fozzie` and `fozzie-colour-palette` versions
- Updated `js-test-buddy` and associated test references


v0.11.4
------------------------------
*January 16, 2018*

### Changed
- Changed `concurrently` task to use escaped quotes as single quotes do not work on Windows.


v0.11.3
------------------------------
*January 12, 2018*

### Added
- Using concurrently to run npm scripts concurrently...!


v0.11.2
------------------------------
*January 9, 2018*

### Added
- Added the changelog.

### Changed
- Replaced babel ES2015 preset with env preset.


v0.11.1
------------------------------
*September 27, 2017*

### Fixed
- Fixed "files" values in package.json.


v0.11.0
------------------------------
*September 27, 2017*

### Changed
- Added `"files"` property to `package.json` to explicitly state which files should be published.
- Optimised and moved images to `img` directory.
- Configured images so that they will be copied out to consuming projects.


v0.10.0
------------------------------
*September 26, 2017*

### Added
- Added is-open state style.


v0.9.0
------------------------------
*September 26, 2017*

### Changed
- Kickoff utils is correctly listed as a dependency.
- Duplicated nav styles moved into mixin.


v0.8.0
------------------------------
*September 26, 2017*

### Changed
- Updated Travis config.
- Only display the nav trigger on small screens.

### Added
- Added compile npm script for JavaScript.
- Added JS module for the header which handles click events on the navigation trigger element.
- Added JS unit tests for new JS modules.


v0.1.0
------------------------------
*August 29, 2017*

### Added
- Added initial project files.
