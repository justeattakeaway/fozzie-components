# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v2.2.0-beta.9
------------------------------
*December 03, 2020*

### Changed
- Added in the logging callback for f-metadata
- Updated f-metadata to latest


v2.2.0-beta.8
------------------------------
*November 30, 2020*

### Changed
- Bumped `@justeat/f-metadata` version


v2.2.0-beta.7
------------------------------
*November 30, 2020*

### Changed
- Minor change to remove last of legacy styles in the content card container


v2.2.0-beta.6
------------------------------
*November 25, 2020*

### Changed
- Incorporates changes from f-content-cards/2.1.x hotfix branch
- Updates f-metadata dependency to incorporate card-data changes from same branch


v2.2.0-beta.5
------------------------------
*November 25, 2020*

### Added
- Removed tenant specific styles
- Updated styles to match design


v2.2.0-beta.4
------------------------------
*November 16, 2020*

### Added
- Voucher code copy design change
- Updated tests


v2.2.0-beta.3
------------------------------
*November 06, 2020*

### Added
- Made design / style changes in accordance with design
- Updated test to support node 10


v2.2.0-beta.2
------------------------------
*October 26, 2020*

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


v2.2.0-beta.1
------------------------------
*October 14, 2020*

### Added
- Integrated card limit changes from HPC1 & 2 work

### Changed
- Bumped dependency on f-metadata to version `3.0.0-beta.2`
- Left-aligns Post-Order Card Headline
- Adds tracking for custom injected content cards


v2.1.3
------------------------------
*November 23, 2020*

### Fixed
- isCardCurrentlyActive now respects displayTimes JSON as specified


v2.1.2
------------------------------
*November 19, 2020*

### Fixed
- HomePromoCard 1 Alignment and spacing
- Limit number of skeleton cards to max of CardLimit
- Fix brand handling


v2.1.1
------------------------------
*November 18, 2020*

### Fixed
- HomePromoCard 1 & 2 render out content background colour correctly
- HomePromoCard 1 & 2 separates description lines into paragraph tags
- transformCardData now preserves brand_name as provided by braze


v2.1.0
------------------------------
*September 29, 2020*

### Changed
- `filterContentCards` method to perform brand and display time checks when Home Promotion Card 1 & 2 are filtered.
- Apply card types in order of given filters when limit is set to 1


v2.1.0-beta.1
------------------------------
*October 5, 2020*

### Added
- `@custom-cards-callback` event dispatched on mount to expose a callback for consuming code to inject
  custom content cards
- Beta release for ensuring the decoupling with f-metadata works before opening to a wider number of
  consumers

### Removed
- Card filtering/transforming/sorting logic moved to `f-metadata`; only the absolute limit number remains

### Changed
- Bumped dependency on f-metadata to version `3.0.0-beta.1`


v2.0.0
------------------------------
*September 23, 2020*

### Changed
- Moving component out of beta now font changes have been released.


v1.15.0
------------------------------
*September 15, 2020*

### Added
- `Home_Promotion_Card_2` template and type to allowed content card types

### Changed
- Naming and folder structure for brevity


v1.14.0
------------------------------
*September 7, 2020*

### Added
- `Home_Promotion_Card_1` template and type to allowed content card types


v2.0.0-beta.1
------------------------------
*August 28, 2020*

### Added
- Check for `console.error` being thrown in `utils` tests.

### Fixed
- Couple of old font references updated.


v2.0.0-beta.0
------------------------------
*August 27, 2020*

### Changed
- Now uses new `JustEatBasis` font and updated type variables.


v1.13.0
------------------------------
*September 1, 2020*

### Changed
- Pull Post Order Content Card title from Braze
- Update PostOrderCard storybook configuration
- Remove title prop from ContentCards


v1.12.0
------------------------------
*August 24, 2020*

### Changed
- Updated anniversary card to match new styling requirements


v1.11.0
------------------------------
*August 21, 2020*

### Added
- `Restaurant FTC Offer Card` card type, with associated tests and story.


v1.10.0
------------------------------
*August 18, 2020*

### Added
- `Terms and Conditions Card` (title) card type, with associated tests and story.


v1.9.0
------------------------------
*August 11, 2020*

### Changed
- Move content card type checks to appropriate components to avoid explicit card type comparisons in `CardContainer`.


v1.8.0
------------------------------
*August 6, 2020*

### Changed
- Transform incoming Braze SDK data at source to avoid manipulations throughout the component tree.


v1.7.0
------------------------------
*August 4, 2020*

### Added
- `limitCards` prop which applies a hard limit to the content card count


v1.6.0
------------------------------
*July 31, 2020*

### Added
- Added the following event emitters:
    - `@on-braze-init`
    - `@get-card-count`
    - `@has-loaded`
    - `@on-error`


v1.5.0
------------------------------
*July 31, 2020*

### Added
- `VoucherCard` component from HomeWeb's Offer page
- Associated stories for Voucher and Anniversary card types
- I18n config for 'Copy Code' button
- `locale` prop to enable above to take effect


v1.4.0
------------------------------
*July 24, 2020*

### Added
- `xhr-mock` and `faker` as dev dependencies
- Predictable faked card data for braze SDK responses

### Changed
- Story can multi-select different card types and then 'refresh'


v1.3.0
------------------------------
*July 23, 2020*

### Changed
- Open external links in `_blank` and internal links in `_self`
- Some small colour updates (small changes to greys and blues inline with rebrand phase 3.1).
- Changing `data-theme` to `data-theme-contentcards` to avoid clashing with any other components in the future.
- Vue CLI minor package updates.


v1.2.0
------------------------------
*July 21, 2020*

### Added
- Apply skeleton loading state


v1.1.0
------------------------------
*July 21, 2020*

### Added
- Add Skeleton loading state for post order content cards


v1.0.0
------------------------------
*July 21, 2020*

### Changed
- Styles separated out to individual components and scoped to avoid bleed-out


v0.11.0
------------------------------
*July 16, 2020*

### Added
- Skeleton loading state card template


v0.10.1
------------------------------
*July 10, 2020*

### Fixed
- A defect where the main content card image was applied as a background image with cover sizing which caused the image to be cropped dependent on it's aspect ratio/sizing.


v0.10.0
------------------------------
*July 7, 2020*

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


v0.9.0
------------------------------
*July 2nd, 2020*

### Changed
- README to include details on prerequisites, usage, development, testing and contributions


v0.8.2
------------------------------
*June 30th, 2020*

### Changed
- Conditional logic for `c-postOrderCard--condensed` to match card container.


v0.8.1
------------------------------
*June 26th, 2020*

### Added
- `.eslintrc.js` to allow `@justeat/f-metadata` to be updated without breaking the build

### Changed
- Updating colour variables to use new versions set in `fozzie-colour-palette`.


v0.8.0
------------------------------
*June 25th, 2020*

### Added
- `@justeat/f-metadata` to `transformIgnorePatterns` in jest config to avoid failures.

### Changed
- Mobile styling to fix defects with margins on both the title and content card


v0.7.0
------------------------------
*June 25th, 2020*

### Changed
- `@justeat/f-metadata` from a dependency to a devDependency

### Removed
- `vue-lazyload` while intermittent issues loading images are investigated and rectified.


v0.6.0
------------------------------
*June 24th, 2020*

### Added
- `@justeat/f-metadata` as a dependency


v0.5.0
------------------------------
*June 18th, 2020*

### Added
- Add responsive styling to `Post_Order_Card_1` template
- Expose prop for filtering content cards


v0.4.0
------------------------------
*June 16th, 2020*

### Added
- Add styling to `Post_Order_Card_1` template


v0.3.0
------------------------------
*June 16th, 2020*

### Added
- Post Order Content Card


v0.2.0
------------------------------
*June 9th, 2020*

### Added
- Existing content card templates
- Unit Tests
- Content card service
- Storybook entry


v0.1.0
------------------------------
*June 5th, 2020*

### Added
- Initial component documentation and configuration
- Placeholder component, unit test and storybook entry
