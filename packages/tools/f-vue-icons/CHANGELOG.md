# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html)

## v3.14.1
_April 30, 2024_

### Removed
- Unused `marked` dependency.


## v3.14.0

_March 13, 2024_

### Fixed

- node engines in `package.json` to include all versions above 14
- Replaced vulnerable `bili` package with rollup for generating icons
- bumped vulnerable `marked` package (snyk vulnerability)

## v3.13.1

_March 22, 2023_

### Fixed

- Issue where new icons weren't commited.

## v3.13.1

_March 10, 2023_

### Fixed

- Added VeganIcon icon to index file.
- Changed component name from Vegan to VeganIcon
- Increased maxBundle size to 155kB

## v3.13.0

_March 9, 2023_

### Added

- VeganIcon icon.

## v3.12.0

_August 2, 2022_

### Added

- Bumped `@justeat/f-icons` version to a bug with some icon sizes.

## v3.11.0

_July 25, 2022_

### Added

- Node 16 support.

## v3.10.0

_May 12 2022_

### Added

- `PaymentVisaTransparentNarrowIcon` icon.

## v3.9.0

_April 29 2022_

### Changed

- `PaymentVisaIcon` icon updated (latest brand guidelines)

### Added

- `PaymentVisaTransparentIcon` icon

## v3.8.0

_March 01 2022_

### Changed

- `star-empty` icon - remove whitespace
- `star-filled` icon - remove whitespace

## v3.7.0

_February 17, 2022_

### Added

- info icon (old name, new icon).
- success icon with fill removed

## v3.6.0

_February 01, 2022_

### Changed

- Updated cross icon

## v3.5.0

_February 01, 2022_

### Added

- Clock small icon
- Walking small icon

## v3.4.0

_January 17, 2022_

### Added

- Cash small icon

## v3.3.0

_December 7, 2021_

### Added

- Jet logos.

## v3.2.1

_December 7, 2021_

### Added

- `Legend` (old name, new icon).

## v3.2.0

_December 6, 2021_

### Added

- `Offer` (old name, new icon).

## v3.1.0

_November 30, 2021_

### Added

- `Legend` (old name, new icon).

## v3.0.0

_November 8, 2021_

### Changed

- Old `BagSadBgIcon` has been renamed to `BagSorryBgIcon`.
  - If you were using the old `BagSadBgIcon`, please make sure you're using the updated name.

### Added

- `BagSadBgIcon` (old name, new icon).
- `BagBinocularsBgIcon`
- `BagCryBgIcon`
- `BagHeart1BgIcon`
- `BagHeart2BgIcon`
- `BagHelpBgIcon`
- `BagListenBgIcon`
- `BagMagicBgIcon`
- `BagMoneyBgIcon`
- `BagSurfBgIcon`
- `BagXmasDecorateBgIcon`
- `BagXmasSantaBgIcon`
- `BagXmasSleighBgIcon`

## v2.8.0

_September 20, 2021_

### Changed

- Updated arrow icon.

## v2.7.0

_August 17, 2021_

### Added

- Collection icon

## v2.6.0

_August 13, 2021_

### Added

- BagRun icon
- BagSad icon
- PaymentVisa icon

## v2.5.0

_March 26, 2021_

### Added

- Note icon
- CloseCircle icon

## v2.4.0

_February 5, 2020_

### Added

- More-Vertical icon

## v2.3.1

_January 29, 2020_

### Fixed

- Update arrow icon from f-icons in order to fix issue when using CSS fill.

## v2.3.0

_January 18, 2020_

### Changed

- Replace gift and arrow icons to match new designs.

## v2.2.0

_January 14, 2020_

### Changed

- Replace arrow icon to match new designs.

## v2.1.0

_December 11, 2020_

### Fixed

- Using correct info icon.

## v2.0.1

_December 9, 2020_

### Fixed

- Question mark icon filename casing.

## v2.0.0

_December 9, 2020_

### Added

- Arrow icon.
- Celebrate bag bg icon.
- Bag icon.
- Bin icon.
- Chevron split icon.
- Moped icon.

### Changed

- Updated npm dependencies.
- Updated alert icon.
- Updated celebrate bag icon.
- Updated basket icon.
- Updated chevron icon.
- Updated cross icon.
- Updated info icon.
- Updated minus icon.
- Updated offer icon.
- Updated plus icon.
- Updated spicy icon.
- Updated star icons.
- Updated vegetarian icon.
- Updated warning icon.
- Renamed question mark icon.

### Removed

- Collection icons (use bag icons instead).
- Delivery icon (use moped icon instead).
- Legacy JE logo.
- Plus thick icon.

## v1.13.0

_December 1, 2020_

### Changed

- Geo outline icon default colour (removed fill property).
- Geo fill icon default colour (removed fill property).

## v1.12.0

_November 25, 2020_

### Added

- Geo outline icon.
- Geo fill icon.

## v1.11.0

_November 13, 2020_

### Added

- Caret icon.

### Fixed

- Unused ids.
- Removed superfluous elements which were preventing CSS styles from applying fill colours.

## v1.10.0

_November 02, 2020_

### Changed

- Updated f-icons dependency to include updated huawei icon.

## v1.9.0

_November 02, 2020_

### Added

- New huawei icon for the footer.

## v1.8.0

_October 30, 2020_

### Changed

- Eyeglass icon updated.

## v1.7.0

_October 29, 2020_

### Changed

- Updated f-icons dependency to include new flag icons.

## v1.6.0

_October 26, 2020_

### Changed

- Updated f-icons dependency.

## v1.5.0

_October 26, 2020_

### Changed

- Updated npm dependencies.
- Updated f-icons dependency pulled through updates to to SVG assets including missing elements and duplicated id's.

## v1.4.0

_October 13, 2020_

### Added

- Success and danger icons.

### Changed

- Info, warning and cross icons.

## v1.3.0

_September 28, 2020_

### Added

- Add bag celebrate icon

## v1.2.1

_September 24, 2020_

### Fixed

- Icons now display correctly from the built storybook distribution

## v1.2.0

_July 23, 2020_

### Added

- Adds a story to show all icons in a list view for demonstration purposes.

## v1.1.1

_July 23, 2020_

### Changed

- Moved some specific `devDependencies` used in this package away from the root (as they aren't currently shared by anything else).

## v1.1.0

_July 16, 2020_

### Changed

- Nothing changed (this is the same as `v1.0.0`) – package version name error :facepalm:

## v1.0.0

_July 16, 2020_

### Changed

- A lot! Component has been modified to pull in the new `f-icons` v2 package and build vue components from those icons. The main reason for making these changes is to allow for tree-shaking of `f-vue-icons` (previously, all icons had to be loaded in, which isn't good for performance when an application may only use a couple of the icons).
- Icons are now given a class of `c-ficon` (changed from `c-icon`). This is to make it really clear which version of `f-vue-icons` an application is now using.
- Some logo names have changed between the last beta release and the full v1 release. This was just part of normalising the icon names and so will need to be updated in consuming packages (the main logo names have changed for instance).
- ESLint autofix turned off (so that tests don't pass due to `--fix` being applied, but then publish subsequently fails).

## v1.0.0-beta.6

_June 8, 2020_

### Changed

- Update f-icons version to add new Menulog logo

## v1.0.0-beta.5

_September 11, 2019_

### Changed

- Update f-icons version to add gift icon

## v1.0.0-beta.4

_September 11, 2019_

### Changed

- Update f-icons version to add profile icon

## v1.0.0-beta.3

_September 5, 2019_

### Changed

- Update f-icons version to add je transparent logo and menulog logo

## v1.0.0-beta.2

_August 29, 2019_

### Fixed

- Bringing in new version of `f-icons`

## v1.0.0-beta.1

_August 29, 2019_

### Fixed

- Fixed tree shaking by adding `sideEffects`.

## v1.0.0-beta.0

_August 22, 2019_

### Changed

- Everything! Component has been modified now to pull in the new `f-icons` package and then build vue components from those files. This is the first beta commit – still needs testing in packages to check working as expected.

## v0.20.1

_June 3, 2020_

### Fixed

- Add `.vue` extensions to imports for icons in `v0.20.0`.

## v0.20.0

_June 2, 2020_

### Added

- Sort icon.
- Restaurant icon.

### Changed

- Updating `vue-test-utils` to v1 and `@vue/cli-plugin-unit-test` to v4.3.1.

### Removed

- `testMatch` from jest config, as not needed.

## v0.19.0

_May 7, 2020_

### Added

- Eyeglass icon.

## v0.18.1

_March 30, 2020_

### Changed

- Updated fileMock component name `TestFileStub` to comply with updated linting rules.
- Bumped `vue` dependency as was mismatched with other packages.

## v0.18.0

_February 11, 2019_

### Added

- Gift icon

## v0.17.0

_November 28, 2019_

### Added

- Alcohol age icon

## v0.16.2

_November 26, 2019_

### Changed

- Reverted previous change

## v0.16.1

_November 25, 2019_

### Changed

- Class on `DeliveryIcon` for toggle

## v0.16.0

_August 22, 2019_

### Added

- `TickIcon` component

## v0.15.1

_July 31, 2019_

### Changed

- Removed babel rule for ignoring polyfills for now

## v0.15.0

_July 29, 2019_

### Added

- `@vue/cli-plugin-babel` to the package dev dependencies, it wasn't picked up from the root monorepo level

### Changed

- Small Readme amends

## v0.14.0

_July 29, 2019_

### Added

- `FlagIcon` component

## v0.13.0

_July 19, 2019_

### Added

- Tests for `AppStoreIcon` and `BaseProviderIcon` components

## v0.12.0

_July 18, 2019_

### Changed

- Use destructuring instead of duplicate imports in `AppStoreIcon` component.
- Prefix svg ids to prevent conflicts

## v0.11.0

_July 17, 2019_

### Changed

- Names of Norwegian and Danish `AppStoreIcon` components to match the language code.
- `locale` rather than `language` is passed in as a prop to `AppStoreIcon` component.

## v0.10.0

_July 12, 2019_

### Added

- `BaseProviderIcon` and `AppStoreIcon` components

### Changed

- Move social and payment icons into their own folders
- Remove unnecessary exports

## v0.9.1

_July 11, 2019_

### Fixed

- Export payment and social icons
- Linting errors

## v0.9.0

_July 10, 2019_

### Added

- Social icons
- Payment/card icons

## v0.8.0

_June 21, 2019_

### Changed

- Move dev dependencies to the root folder using `lerna link convert`
  Packages that are used by npm scripts left in the package to be able to run scripts not only from the root

## v0.7.0

_June 18, 2019_

### Added

- Warning icon.

### Changed

- Updated npm dependency.

## v0.6.0

_May 31, 2019_

### Added

- Cash, Clock, Local Legend, Map pin, Padlock and Stopwatch icons.

## v0.5.0

_April 25, 2019_

### Added

- Alert, Basket, Collection, and Delivery icons.

### Changed

- Updated npm dependencies.

## v0.4.0

_April 11, 2019_

### Fixed

- Reverted `vue-svg-loader` update as it contains spread operators which aren't transpiled.

### Changed

- Updated npm dependencies.

## v0.3.0

_April 9, 2019_

### Added

- Chevron left CSS class.
- Chevron component unit tests.

### Changed

- Updated npm dependencies.
- Updated ESLint config.

## v0.2.0

_March 20, 2019_

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

## v0.1.0

_March 19, 2019_

### Added

- Added initial files.
