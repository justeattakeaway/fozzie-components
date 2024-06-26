# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## v1.6.3

_April 29, 2024_

### Changed

- Bump `@vue/cli-plugin-babel` from v5.0.0 to v5.0.8


## v1.6.2

_April 10, 2024_

### Changed
- Create new prop for f-restaurant-card
- Use prop as the max review threshold to limit the actual number of reviews shown on restaurant card

## v1.6.1

_March 25, 2024_

### Changed
- Update fixed point value of restaurant rating from 2 to 1
- Update max number of reviews

## v1.6.0

_March 13, 2024_

### Changed

- node engines in `package.json` to include all versions above 14
- `@vue/cli-plugin-babel` to 5.0.0 to resolve snyk vulnerability

## v1.5.1

_April 04, 2023_

### Changed

- Background colour token changed from `$color-dark-container-dark` to `$color-container-dark` for the Promoted tag styling `c-restaurantTag--dark`

## v1.5.0

_March 27, 2023_

### Changed

- New focus styles
  - These require the new colour tokens from `pie-design-tokens` which are included in `fozzie` v11+.

## v1.4.0

_February 1, 2023_

### Added

- `maxRating` prop to RestaurantRatings

## v1.3.1

_November 21, 2022_

### Fixed

- Linting errors

## v1.3.0

_July 29, 2022_

### Added

- Node 16 compatible version of `@justeat/f-services`.
- Node 16 compatible version of `@justeat/f-vue-icons`.

## v1.2.0

_July 19, 2022_

### Added

- Node 16 support.

## v1.1.0

_July 5, 2022_

### Changed

- Update f-wdio-utils to v1.1.0
- Update component objects / specs to use ES6 syntax.

## v1.0.0

_June 22, 2022_

### Changed

- Update to `@use` and `@forward` SASS syntax

## v0.29.6

_June 9, 2022_

### Changed

- Bumped wdio version and fixed breaking changes.
- Refactor WebDriverIO tests to use async in order to support Node 16 using `codemod` utility.

## v0.29.5

_April 22, 2022_

### Fixed

- Removed `gap` property and replaced with margin for Safari support

## v0.29.4

_April 8, 2022_

### Fixed

- Text vertical alignment on restaurant dishes
- Image tag spacing to match logo spacing
- Gap between restaurant tags
- Prevent ratings count from wrapping

## v0.29.3

_April 1, 2022_

### Fixed

- Alignment of restaurant card content

## v0.29.2

_March 31, 2022_

### Fixed

- Dot separators for eta, availability and fees

## v0.29.1

_March 25, 2022_

### Fixed

- Moved margin declaration to parent `c-deliveryTimeMeta`

## v0.29.0

_March 24, 2022_

### Added

- new prop `inlineTileData` which, when enabled, prevents the ETA clearfix from being rendered (this is to assist with an experiment)

## v0.28.0

_March 24, 2022_

### Changed

- Updated colour variables to use non global values
- Updated component margins and spacing
- Updated SVG alignments and sizes

## v0.27.0

_March 18, 2022_

### Changed

- Show ratings if count is missing
- Split count and 'own rating' message elements to simplify template

## v0.26.0

_March 3, 2022_

### Added

- Performance tracking prop
- Calls to performance tracking on `mounted` lifecycle hook for the Card container and delivery meta components

## v0.25.0

_March 2, 2022_

### Added

- Skeleton loader styling and animations

### Changed

- Update `f-vue-icons` package to `3.8.0`
- Use darker background color for restaurant tags
- use `$color-focus` for outline

## v0.24.1

_February 22, 2022_

### Changed

- Make Servings not dependant on Calories data being present

## v0.24.0

_February 22, 2022_

### Changed

- Styled the positioning of restaurant card data points

## v0.23.0

_February 17, 2022_

### Changed

- inject test IDs into restaurant-tags
- sync restaurant dish test ids with searchweb

## v0.22.0

_February 17, 2022_

### Changed

- Sync a number of `data-test-id` attributes with the SearchWeb acceptance tests
- Updated a number of unit tests to support the new test ids

## v0.21.0

_February 16, 2022_

### Changed

- Sync a number of `data-test-id` attributes with the SearchWeb acceptance tests
- Removed an unused class modifier `c-restaurantCard--hasImg`
- Update unit tests with new test IDs

## v0.20.0

_February 15, 2022_

### Added

- Click handler logic unit test
- A new constants JS file to house the custom event key (and any more in the future)

### Changed

- Deleted the `RestaurantCard` wrapper component previously wrapping the `RestaurantCard.v1` component
- Renamed `RestaurantCard.v1` component to `RestaurantCard`
- updated storybook with flattend props object
- Updated click handler logic to emit an object containing the restaurant ID

## v0.19.0

_February 14, 2022_

### Added

- `sass:math` to `vue.config` to allow `dart-sass` migration.

## v0.18.0

_February 11, 2022_

### Changed

- added aria-label support to `RestaurantTag` component
- updated storybook with new aria label prop

## v0.17.0

_February 7, 2022_

### Added

- new `disabledMessage` prop that is rendered when a restaurant is disabled
- unit tests to test `disabledMessage` rendering logic

### Changed

- remove `disabled` prop
- remove any disabled check business logic from component
- add new color support to `IconText` component
- simplify SCSS color theme logic in `IconText` component using a mixin
- update storybook with the new prop changes

## v0.16.1

_February 3, 2022_

### Changed

- Use new `spacing()` values

## v0.16.0

_February 2, 2022_

### Added

- New `RestaurantAvailability` component for displaying pre-order and collection info
- Supporting unit tests
- New blue colour variant to `IconText` class modifiers
- Storybook file for the `RestaurantAvailability` component

### Changed

- Updated f-vue-icons to `3.5.0`
- Use new clock-small icon on ETA
- Directly target the SVG path elements in `IconText` colour modifiers to avoid default fills present in some icons
- Simplified restaurant Storybook selector
- Use pie design token aliases for `IconText` colours

## v0.15.0

_January 31, 2022_

### Added

- A renderless component to enable conditional dynamic components that do not render extra markup if the criteria is not met

### Changed

- Wrapped each data point on the restaurant card in a dynamic component that is injected into the card by the consumer - it will currently resolve to the injected component (i.e. an error boundary) or a renderless component
- Use better semantic markup for restaurant tags
- Added styling override to prevent fozzie list styling from affecting restaurant tags in SearchWeb
- Do not render ratings subcomponent if entire ratings data is missing

## v0.14.0

_January 20, 2022_

### Changed

- Fallback to gray background for restaurant image when image doesn't load or is missing
- Hide restaurant logo when image fails to load
- Add presentation role to restaurant logo
- Move restaurant logo to it's own folder

## v0.13.0

_January 17, 2022_

### Added

- RestaurantFees component to display delivery fee and minimum order
- RestaurantFees unit tests
- Default background colour to restaurant card image

### Changed

- Changed restaurant image role from "img" to "presentation"
- Added RestaurantFees data to storybook
- Updated f-vue-icons dependency for new cash small icon

## v0.12.0

_December 20, 2021_

### Added

- Scrollable and stackable restaurant dish list component
- Dish list component unit tests
- Dish component unit tests
- Dish and Dish list storybook files

### Changed

- Updated restaurant dish styling
- Added dish state to restaurant card storybook

## v0.11.1

_December 17, 2021_

### Added

- @justeat/f-vue-icons added as a dependency

## v0.11.0

_December 7, 2021_

### Added

- Local Legend Logo

## v0.10.0

_December 7, 2021_

### Added

- Restaurant offers
- associated unit tests to check render logic

### Changed

- updated storybook with offer example

## v0.9.0

_December 1, 2021_

### Added

- RestaurantRating component, used to display restaurant rating values
- Storybook entries for restaurant card subcomponents

### Changed

- Updated storybook for restaurant card
- Renamed RestaurantBadge and RestaurantBadges to RestaurantTag and RestaurantTags to align with language across the business
- Remove pie token import from tag component and use css class for default colours
- Hardcode colour scheme options for restaurant tags

## v0.8.0

_November 3, 2021_

### Added

- DeliveryTimeMeta and IconText components, which we use for ETA, distance, and address data

### Fixed

- Styles of cuisines component

## v0.7.0

_November 2, 2021_

### Added

- RestaurantBadge and RestaurantBadges components
- Basic positioning styles for badges within restaurant image

## v0.6.0

_October 28, 2021_

### Added

- Restaurant cuisines component

## v0.5.0

_October 28, 2021_

### Added

- Basic dish item styling

### Updated

- Broke down parts of card into subcomponents
- Add hover styling to card title
- Remove some placeholder text
- Move logo out of image container for potential fallback options in future

## v0.4.0

_October 25, 2021_

### Added

- Injectable error boundary to wrap around slots and subcomponents

## v0.3.0

_October 22, 2021_

### Added

- Basic component styling

### Updated

- Component HTML to use new classes, attributes and fewer elements
- Storybook args updated to use new component props contract

## v0.2.0

_October 7, 2021_

### Added

- Wrapper component to handle multiple component versions
- Passing props and slots through wrapper component
- Placeholder template and logic to component
- Wrapper component unit tests

## v0.1.0

_October 4, 2021_

### Added

- `f-restaurant-card` component structure and config.
