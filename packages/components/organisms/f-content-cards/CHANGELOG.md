# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v10.6.1

_April 26, 2024_

### Changed

- Remove `jest` from dev dependencies (should come from the root).


## v10.6.0

_April 16, 2024_

### Changed

- `fozzie` in package.json to `11x`

## v10.5.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14
- `@vue/cli-plugin-babel` to 5.0.0 to resolve snyk vulnerability

## v10.4.3

_September 4, 2023_

### Changed

- Bump http-request-mock version to patch vulnerability.

## v10.4.2

_June 27, 2023_

### Updated

- minor package json change to remove dependencies into dev dependencies

## v10.4.1

_June 22, 2023_

### Updated

- minor package json change to remove dependencies into dev dependencies

## v10.4.0

_June 12, 2023_

### Updated

- permitted percentages to include numeric version
- updated es, it, ie and nz tenants to include default percentage

## v10.3.1

_May 24, 2023_

### Updated

- emitCardClick in ContentCardContainer.vue to include the el value

## v10.3.0

_January 26, 2023_

### Added

- New mock data
- ContentCardsBrazeAdapter.stories.js
- ContentCardsCustomAdapter.stories.js
- ContentCardsStampCardsAdapter.stories.js

### Updated

- StampCard content card
- Readme with starting more up to date docs

## v10.2.0

_December 1, 2022_

### Added

- Unit tests for extra states
- Analytic tracking events

## v10.1.1

_November 21, 2022_

### Fixed

- Linting errors

## v10.1.0

_November 15, 2022_

### Changed

- Added fozzie components as externals in Webpack config

## v10.0.0

_October 7, 2022_

### Changed

- ContentCards.js has been changed completely to support thew new adapter format

### Deleted

- temporarily removed story files as I will be adding in new story files in later PR's

## v9.1.0

_August 3, 2022_

### Added

- Node 16 compatible version of `@justeat/f-services`.
- Node 16 compatible version of `@justeat/f-braze-adapter`.
- Node 16 compatible version of `@justeat/f-vue-icons`.

## v9.0.0

_August 3, 2022_

### Changed

- Rebased and updated from the beta branch to fix the issue where two v8 versions were running side by side
- Added `@justeat/f-button` as a peerDependency + devDependency

## v8.0.0-beta.4 (beta 3 excluded due to error)

_May 24, 2022_

### Changed

- updated image to have minimum height and object fit properties

## v8.0.0-beta.2

_May 23, 2022_

### Changed

- removing unnecessary height value

## v8.0.0-beta.1

_May 11, 2022_

### Changed

- Updated to beta for use in offers page

## v8.0.0-alpha.8

_May 4, 2022_

### Changed

- Updated export to use new cards
- Adjusted card body component

## v8.0.0-alpha.7

_April 20, 2022_

### Added

- Promotion card one and story file

## v8.0.0-alpha.6

_April 11, 2022_

### Added

- new Voucher card based on updated icing changes

## v8.0.0-alpha.5

_April 11, 2022_

### Added

- New Promotion card two card.

## v8.0.0-alpha.4

_April 4, 2022_

### Added

- Voucher code component for new content cards template system.

## v8.0.0-alpha.3

_March 29, 2022_

### Added

- Container component for new content cards template system.

## v8.2.0

_July 25, 2022_

### Added

- Node 16 support.

## v8.0.0-alpha.2

_March 23, 2022_

### Added

- Body component for new content cards template system.

## v8.1.0

_July 7, 2022_

### Changed

- Update f-wdio-utils to v1.1.0 to use new Axe Core implementation.
- Accessibility tests to be async.

## v8.0.0

_June 27, 2022_

### Changed

- **breaking changes** Update to `@use` and `@forward` SASS syntax

## v7.4.1

_June 24, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.

### Changed

- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v8.0.0-alpha.1

_March 15, 2022_

### Added

- Added Image component as part of the new Icing changes
- Storybook knobs to controls

## v7.4.0

_February 23, 2022_

### Changed

- Updated f-braze-adapter package version to support new `$log` interface.
- Reame update.

### Removed

- `badge()` styles import as outdated and unused.

## v7.3.0

_February 17, 2022_

### Changed

- Updated braze adapter version to support location aware content card filtering

## v7.2.0

_February 15, 2022_

### Changed

- $logger interface to $log.

## v7.1.0

_February 11, 2022_

### Changed

- box-shadow values to use the elevation token from the pie-design-tokens.

## v7.0.0

_November 23, 2021_

### Changed

- Version bump to pull it out of beta into master

## v6.0.0-beta.2

_September 27, 2021_

### Changed

- Version bump braze adapter

## v6.0.0-beta.1

_September 20, 2021_

### Changed

- Updating braze adapter version
- Adding finer detailed logs
- Updated unit tests

## v6.0.0-beta.0

_September 20, 2021_

### Changed

- Changed version number to prevent conflict with main branch as v5 has now been used

## v5.0.0-beta.2 (INCORRECT VERSION NOW DUE TO MASTER USING V5)

_September 2, 2021_

### Changed

- Updating braze adapter version

## v5.0.0-beta.1 (INCORRECT VERSION NOW DUE TO MASTER USING V5)

_July 26, 2021_

### Changed

- Updated content cards to use beta 4 of braze adapter
- Updated tests to account for change in braze adapter

## v6.0.0

_October 5, 2021_

### Changed

- `$color-content-brand-strong` pie value to `$color-content-default` in line with icing phase 2.
- New colour scheme from `pie-design-tokens` in line with icing phase 2.

## v5.0.0

_September 15, 2021_

- Return beta to master. Component has JETSansDigital font.

### Removed

- Normalise styles from the build. Note that now if consuming application doesn't have normalised (reset) styles, there may be some slight style differences after this update. If the consuming application uses fozzie, there shouldn't be any style differences as normalised styles should be added as part of the fozzie import.

## v5.0.0-beta.0

_August 26, 2021_

### Updated

- New font JETSansDigital

## v4.8.0

_July 22, 2021_

### Changed

- Bumped version of f-braze-adapter to respect `is_visible` and `deduplication_key` KVPs
- Marked Terms and Conditions card as Deprecated - as we're handling this in the For You component separately

## v4.7.0

_June 10, 2021_

### Changed

- Added 10% stampcard graphics/Fixed 15% stampcard graphics for positioning
- Added stampcard percentage config to AU and UK

## v4.6.0

_May 25, 2021_

### Changed

- CSS variables to use pie design tokens instead of fozzie-colour-palette vars

## v4.5.0

_April 29, 2021_

### Changed

- Bumped version of f-braze-adapter to respect cookie preferences

## v4.4.1

_March 25, 2021_

### Fixed

- ContentCards Component Page Object model Fixed to use base page package.

## v4.4.0

_March 23, 2021_

### Updated

- Adds `StampCardPromotionCard` component, test, stories and docs
- Factors out some common card styling into a shared scss file
- Factors out some common non-visual behaviour into a shared component

### Fixed

- ContentCards stories when rendered as static site

## v4.3.0

_March 19, 2021_

### Updated

- `f-braze-adapter` version bump

## v4.2.0

_March 8, 2021_

### Added

- Mid-size stamp card in an intermediate breakpoint for tablet view

### Fixed

- Margin on bottom of restaurant icon in stampcard prevents text from butting up
  on the bottom of it when it flows onto the next line

## v4.1.0

_March 3, 2021_

### Added

- Adds some accessibility changes to help improve screen reader compatibility for stamp card content card

## v4.0.0

_February 22, 2021_

### Updated

- ContentCards component now surfaces card state via several named 'slots' as documented in README.md
- PostOrderCard now always opens its link in a new tab

## v3.4.0

_February 24, 2021_

### Updated

- f-content-cards now uses `vue-svg-loader` to bundle in SVG assets
- `isReadyToClaim` card prop for `StampCard1` can now be the string literal `'false'`
- `StampCard1`'s `expiryDate` is now interpreted as an ISO8601 date and formatted on
  the end of `expiryLine`
- `date-fns` is added as a devDependency

## v3.3.0

_February 22, 2021_

### Added

- Stamp Card component, card Type and story

### Updated

- package json reference from f-metadata to f-braze-adapter to fix optional chaining loader error
- References svgTransform in global test utils in prep for upcoming stamp cards changes

## v3.2.0

_February 15, 2021_

### Changed

- Home Promotion Cards 1 & 2 now use the tracking as supplied to the containing
  Content Cards component
- Home Promotion Cards 1 & 2 now render as a link for the full banner, rather than
  just a link for the CTA

## v3.1.1

_February 10, 2021_

### Changed

- Some style changes for home promotion cards

## v3.1.0

_February 9, 2021_

### Added

- `data-test-ids` for home promotion card components
- `test` folder with `accessibility` and `component` specs for home promotion cards 1 and 2
- `test-utils` folder with `selectors` file for home promotion tests and component classes for cards 1 and 2
- `@justeat/f-wdio-utils` package

## v3.0.0-beta.1

_January 5, 2021_

### Fixed

- Old references to font-size keys updated.

### Changed

- Updated config for latest `sass-loader`.
- Switches import in `common.scss` in line with fozzie v5-beta.
- Updated the content cards component to be a a renderless scoped slot component to reduce implementation complexity
- Removed the grouping, this is now done by flex if needed in consuming application.
- Updated tests to reflect change in content cards
- Changed the index.js file, no longer default installs component, instead now exports all components as type of library

## v2.2.0

_December 15, 2020_

### Fixed

- Styles to match designs in HPC 1&2
- Correct stories for HPC 1&2

### Updated

- Dynamically change HPC1 subtitle and HPC2 title and text between light/dark based on
  luminosity of BG colour(s)
- Tests to check above behave correctly

## v2.2.0-beta.9

_December 3, 2020_

### Changed

- Added in the logging callback for f-metadata
- Updated f-metadata to latest

## v2.2.0-beta.8

_November 30, 2020_

### Changed

- Bumped `@justeat/f-metadata` version

## v2.2.0-beta.7

_November 30, 2020_

### Changed

- Minor change to remove last of legacy styles in the content card container

## v2.2.0-beta.6

_November 25, 2020_

### Changed

- Incorporates changes from f-content-cards/2.1.x hotfix branch
- Updates f-metadata dependency to incorporate card-data changes from same branch

## v2.2.0-beta.5

_November 25, 2020_

### Added

- Removed tenant specific styles
- Updated styles to match design

## v2.2.0-beta.4

_November 16, 2020_

### Added

- Voucher code copy design change
- Updated tests

## v2.2.0-beta.3

_November 6, 2020_

### Added

- Made design / style changes in accordance with design
- Updated test to support node 10

## v2.2.0-beta.2

_October 26, 2020_

### Added

- Integrated card grouping via new Braze dispatcher method
- Prop groupCards for grouping by title
- Watcher for cardsGrouped enabling a new emitter containing the number of groups
- LogCardImpressions when grouped
- Stylelint added to lint styling on build

### Changed

- 'jet' theme instead of 'je'

### Removed

- While groupedCards is true limiting cannot be used, this is until we have decided how to apply limiting to groups.

## v2.2.0-beta.1

_October 14, 2020_

### Added

- Integrated card limit changes from HPC1 & 2 work

### Changed

- Bumped dependency on f-metadata to version `3.0.0-beta.2`
- Left-aligns Post-Order Card Headline
- Adds tracking for custom injected content cards

## v2.1.3

_November 23, 2020_

### Fixed

- isCardCurrentlyActive now respects displayTimes JSON as specified

## v2.1.2

_November 19, 2020_

### Fixed

- HomePromoCard 1 Alignment and spacing
- Limit number of skeleton cards to max of CardLimit
- Fix brand handling

## v2.1.1

_November 18, 2020_

### Fixed

- HomePromoCard 1 & 2 render out content background colour correctly
- HomePromoCard 1 & 2 separates description lines into paragraph tags
- transformCardData now preserves brand_name as provided by braze

## v2.1.0

_September 29, 2020_

### Changed

- `filterContentCards` method to perform brand and display time checks when Home Promotion Card 1 & 2 are filtered.
- Apply card types in order of given filters when limit is set to 1

## v2.1.0-beta.1

_October 5, 2020_

### Added

- `@custom-cards-callback` event dispatched on mount to expose a callback for consuming code to inject
  custom content cards
- Beta release for ensuring the decoupling with f-metadata works before opening to a wider number of
  consumers

### Removed

- Card filtering/transforming/sorting logic moved to `f-metadata`; only the absolute limit number remains

### Changed

- Bumped dependency on f-metadata to version `3.0.0-beta.1`

## v2.0.0

_September 23, 2020_

### Changed

- Moving component out of beta now font changes have been released.

## v1.15.0

_September 15, 2020_

### Added

- `Home_Promotion_Card_2` template and type to allowed content card types

### Changed

- Naming and folder structure for brevity

## v1.14.0

_September 7, 2020_

### Added

- `Home_Promotion_Card_1` template and type to allowed content card types

## v2.0.0-beta.1

_August 28, 2020_

### Added

- Check for `console.error` being thrown in `utils` tests.

### Fixed

- Couple of old font references updated.

## v2.0.0-beta.0

_August 27, 2020_

### Changed

- Now uses new `JustEatBasis` font and updated type variables.

## v1.13.0

_September 1, 2020_

### Changed

- Pull Post Order Content Card title from Braze
- Update PostOrderCard storybook configuration
- Remove title prop from ContentCards

## v1.12.0

_August 24, 2020_

### Changed

- Updated anniversary card to match new styling requirements

## v1.11.0

_August 21, 2020_

### Added

- `Restaurant FTC Offer Card` card type, with associated tests and story.

## v1.10.0

_August 18, 2020_

### Added

- `Terms and Conditions Card` (title) card type, with associated tests and story.

## v1.9.0

_August 11, 2020_

### Changed

- Move content card type checks to appropriate components to avoid explicit card type comparisons in `CardContainer`.

## v1.8.0

_August 6, 2020_

### Changed

- Transform incoming Braze SDK data at source to avoid manipulations throughout the component tree.

## v1.7.0

_August 4, 2020_

### Added

- `limitCards` prop which applies a hard limit to the content card count

## v1.6.0

_July 31, 2020_

### Added

- Added the following event emitters:
  - `@on-braze-init`
  - `@get-card-count`
  - `@has-loaded`
  - `@on-error`

## v1.5.0

_July 31, 2020_

### Added

- `VoucherCard` component from HomeWeb's Offer page
- Associated stories for Voucher and Anniversary card types
- I18n config for 'Copy Code' button
- `locale` prop to enable above to take effect

## v1.4.0

_July 24, 2020_

### Added

- `xhr-mock` and `faker` as dev dependencies
- Predictable faked card data for braze SDK responses

### Changed

- Story can multi-select different card types and then 'refresh'

## v1.3.0

_July 23, 2020_

### Changed

- Open external links in `_blank` and internal links in `_self`
- Some small colour updates (small changes to greys and blues inline with rebrand phase 3.1).
- Changing `data-theme` to `data-theme-contentcards` to avoid clashing with any other components in the future.
- Vue CLI minor package updates.

## v1.2.0

_July 21, 2020_

### Added

- Apply skeleton loading state

## v1.1.0

_July 21, 2020_

### Added

- Add Skeleton loading state for post order content cards

## v1.0.0

_July 21, 2020_

### Changed

- Styles separated out to individual components and scoped to avoid bleed-out

## v0.11.0

_July 16, 2020_

### Added

- Skeleton loading state card template

## v0.10.1

_July 10, 2020_

### Fixed

- A defect where the main content card image was applied as a background image with cover sizing which caused the image to be cropped dependent on it's aspect ratio/sizing.

## v0.10.0

_July 7, 2020_

### Added

- Accessibility add-on to Storybook story.
- ContentCards component accepts `pushToDataLayer` callback as a prop for feeding back
  analytics regarding content cards
- ContentCards component accepts `testId` parameter as a prop, which indicates the test
  id attribute of the component root element. If this is missing, all child components
  will also be rendered without test id attributes.

### Changed

- Updated @justeat/f-metadata version
- Updated README

## v0.9.0

_July 2nd, 2020_

### Changed

- README to include details on prerequisites, usage, development, testing and contributions

## v0.8.2

_June 30th, 2020_

### Changed

- Conditional logic for `c-postOrderCard--condensed` to match card container.

## v0.8.1

_June 26th, 2020_

### Added

- `.eslintrc.js` to allow `@justeat/f-metadata` to be updated without breaking the build

### Changed

- Updating colour variables to use new versions set in `fozzie-colour-palette`.

## v0.8.0

_June 25th, 2020_

### Added

- `@justeat/f-metadata` to `transformIgnorePatterns` in jest config to avoid failures.

### Changed

- Mobile styling to fix defects with margins on both the title and content card

## v0.7.0

_June 25th, 2020_

### Changed

- `@justeat/f-metadata` from a dependency to a devDependency

### Removed

- `vue-lazyload` while intermittent issues loading images are investigated and rectified.

## v0.6.0

_June 24th, 2020_

### Added

- `@justeat/f-metadata` as a dependency

## v0.5.0

_June 18th, 2020_

### Added

- Add responsive styling to `Post_Order_Card_1` template
- Expose prop for filtering content cards

## v0.4.0

_June 16th, 2020_

### Added

- Add styling to `Post_Order_Card_1` template

## v0.3.0

_June 16th, 2020_

### Added

- Post Order Content Card

## v0.2.0

_June 9th, 2020_

### Added

- Existing content card templates
- Unit Tests
- Content card service
- Storybook entry

## v0.1.0

_June 5th, 2020_

### Added

- Initial component documentation and configuration
- Placeholder component, unit test and storybook entry
