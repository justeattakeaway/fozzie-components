# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html)

v1.13.0
------------------------------
*December 1, 2020*

### Changed
- Geo outline icon default colour (removed fill property).
- Geo fill icon default colour (removed fill property).


v1.12.0
------------------------------
*November 25, 2020*

### Added
- Geo outline icon.
- Geo fill icon.


v1.11.0
------------------------------
*November 13, 2020*

### Added
- Caret icon.

### Fixed
- Unused ids.
- Removed superfluous elements which were preventing CSS styles from applying fill colours.


v1.10.0
------------------------------
*November 02, 2020*

### Changed
- Updated f-icons dependency to include updated huawei icon.


v1.9.0
------------------------------
*November 02, 2020*

### Added
- New huawei icon for the footer.


v1.8.0
------------------------------
*October 30, 2020*

### Changed
- Eyeglass icon updated.


v1.7.0
------------------------------
*October 29, 2020*

### Changed
- Updated f-icons dependency to include new flag icons.


v1.6.0
------------------------------
*October 26, 2020*

### Changed
- Updated f-icons dependency.


v1.5.0
------------------------------
*October 26, 2020*

### Changed
- Updated npm dependencies.
- Updated f-icons dependency pulled through updates to to SVG assets including missing elements and duplicated id's.


v1.4.0
------------------------------
*October 13, 2020*

### Added
- Success and danger icons.

### Changed
- Info, warning and cross icons.


v1.3.0
------------------------------
*September 28, 2020*

### Added
- Add bag celebrate icon


v1.2.1
------------------------------
*September 24, 2020*

### Fixed
- Icons now display correctly from the built storybook distribution


v1.2.0
------------------------------
*July 23, 2020*

### Added
- Adds a story to show all icons in a list view for demonstration purposes.


v1.1.1
------------------------------
*July 23, 2020*

### Changed
- Moved some specific `devDependencies` used in this package away from the root (as they aren't currently shared by anything else).


v1.1.0
------------------------------
*July 16, 2020*

### Changed
- Nothing changed (this is the same as `v1.0.0`) – package version name error :facepalm:


v1.0.0
------------------------------
*July 16, 2020*

### Changed
- A lot! Component has been modified to pull in the new `f-icons` v2 package and build vue components from those icons. The main reason for making these changes is to allow for tree-shaking of `f-vue-icons` (previously, all icons had to be loaded in, which isn't good for performance when an application may only use a couple of the icons).
- Icons are now given a class of `c-ficon` (changed from `c-icon`). This is to make it really clear which version of `f-vue-icons` an application is now using.
- Some logo names have changed between the last beta release and the full v1 release. This was just part of normalising the icon names and so will need to be updated in consuming packages (the main logo names have changed for instance).
- ESLint autofix turned off (so that tests don't pass due to `--fix` being applied, but then publish subsequently fails).


v1.0.0-beta.6
------------------------------
*June 8, 2020*

### Changed
- Update f-icons version to add new Menulog logo


v1.0.0-beta.5
------------------------------
*September 11, 2019*

### Changed
- Update f-icons version to add gift icon


v1.0.0-beta.4
------------------------------
*September 11, 2019*

### Changed
- Update f-icons version to add profile icon


v1.0.0-beta.3
------------------------------
*September 5, 2019*

### Changed
- Update f-icons version to add je transparent logo and menulog logo


v1.0.0-beta.2
------------------------------
*August 29, 2019*

### Fixed
- Bringing in new version of `f-icons`


v1.0.0-beta.1
------------------------------
*August 29, 2019*

### Fixed
- Fixed tree shaking by adding `sideEffects`.


v1.0.0-beta.0
------------------------------
*August 22, 2019*

### Changed
- Everything! Component has been modified now to pull in the new `f-icons` package and then build vue components from those files.  This is the first beta commit – still needs testing in packages to check working as expected.


v0.20.1
------------------------------
*June 3, 2020*

### Fixed
- Add `.vue` extensions to imports for icons in `v0.20.0`.


v0.20.0
------------------------------
*June 2, 2020*

### Added
- Sort icon.
- Restaurant icon.

### Changed
- Updating `vue-test-utils` to v1 and `@vue/cli-plugin-unit-test` to v4.3.1.

### Removed
- `testMatch` from jest config, as not needed.


v0.19.0
------------------------------
*May 7, 2020*

### Added
- Eyeglass icon.


v0.18.1
------------------------------
*March 30, 2020*

### Changed
- Updated fileMock component name `TestFileStub` to comply with updated linting rules.
- Bumped `vue` dependency as was mismatched with other packages.


v0.18.0
------------------------------
*February 11, 2019*

### Added
- Gift icon


v0.17.0
------------------------------
*November 28, 2019*

### Added
- Alcohol age icon


v0.16.2
------------------------------
*November 26, 2019*

### Changed
- Reverted previous change


v0.16.1
------------------------------
*November 25, 2019*

### Changed
- Class on `DeliveryIcon` for toggle


v0.16.0
------------------------------
*August 22, 2019*

### Added
- `TickIcon` component


v0.15.1
------------------------------
*July 31, 2019*

### Changed
- Removed babel rule for ignoring polyfills for now


v0.15.0
------------------------------
*July 29, 2019*

### Added
- `@vue/cli-plugin-babel` to the package dev dependencies, it wasn't picked up from the root monorepo level

### Changed
- Small Readme amends


v0.14.0
------------------------------
*July 29, 2019*

### Added
- `FlagIcon` component


v0.13.0
------------------------------
*July 19, 2019*

### Added
- Tests for `AppStoreIcon` and `BaseProviderIcon` components


v0.12.0
------------------------------
*July 18, 2019*

### Changed
- Use destructuring instead of duplicate imports in `AppStoreIcon` component.
- Prefix svg ids to prevent conflicts


v0.11.0
------------------------------
*July 17, 2019*

### Changed
- Names of Norwegian and Danish `AppStoreIcon` components to match the language code.
- `locale` rather than `language` is passed in as a prop to `AppStoreIcon` component.


v0.10.0
------------------------------
*July 12, 2019*

### Added
- `BaseProviderIcon` and `AppStoreIcon` components

### Changed
- Move social and payment icons into their own folders
- Remove unnecessary exports


v0.9.1
------------------------------
*July 11, 2019*

### Fixed
- Export payment and social icons
- Linting errors


v0.9.0
------------------------------
*July 10, 2019*

### Added
- Social icons
- Payment/card icons


v0.8.0
------------------------------
*June 21, 2019*

### Changed
- Move dev dependencies to the root folder using `lerna link convert`
Packages that are used by npm scripts left in the package to be able to run scripts not only from the root


v0.7.0
------------------------------
*June 18, 2019*

### Added
- Warning icon.

### Changed
- Updated npm dependency.


v0.6.0
------------------------------
*May 31, 2019*

### Added
- Cash, Clock, Local Legend, Map pin, Padlock and Stopwatch icons.


v0.5.0
------------------------------
*April 25, 2019*

### Added
- Alert, Basket, Collection, and Delivery icons.

### Changed
- Updated npm dependencies.


v0.4.0
------------------------------
*April 11, 2019*

### Fixed
- Reverted `vue-svg-loader` update as it contains spread operators which aren't transpiled.

### Changed
- Updated npm dependencies.


v0.3.0
------------------------------
*April 9, 2019*

### Added
- Chevron left CSS class.
- Chevron component unit tests.

### Changed
- Updated npm dependencies.
- Updated ESLint config.


v0.2.0
------------------------------
*March 20, 2019*

### Added
- Changelog file.
- Licence files.
- `package.json` details.
- New icon components and config.

### Changed
- Updated `.gitignore` file.
- Set `useBuiltIns` to false in `f-vue-icons` babel config.
- Moved dependencies back into `f-vue-icons`.
- Replaced `for in` loop with `Object.values` in entry module.


v0.1.0
------------------------------
*March 19, 2019*

### Added
- Added initial files.
