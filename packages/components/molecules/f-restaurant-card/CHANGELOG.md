# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v0.18.0
------------------------------
*February 08, 2022*

### Added
- `sass:math` to `vue.config` to allow `dart-sass` migration.


v0.17.0
------------------------------
*February 07, 2022*
### Added
- new `disabledMessage` prop that is rendered when a restaurant is disabled
- unit tests to test `disabledMessage` rendering logic
### Changed
- remove `disabled` prop
- remove any disabled check business logic from component
- add new color support to `IconText` component
- simplify SCSS color theme logic in `IconText` component using a mixin
- update storybook with the new prop changes


v0.16.1
------------------------------
*February 03, 2022*
### Changed
- Use new `spacing()` values

v0.16.0
------------------------------
*February 02, 2022*

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

v0.15.0
------------------------------
*January 31, 2022*

### Added
- A renderless component to enable conditional dynamic components that do not render extra markup if the criteria is not met
### Changed
- Wrapped each data point on the restaurant card in a dynamic component that is injected into the card by the consumer - it will currently resolve to the injected component (i.e. an error boundary) or a renderless component
- Use better semantic markup for restaurant tags
- Added styling override to prevent fozzie list styling from affecting restaurant tags in SearchWeb
- Do not render ratings subcomponent if entire ratings data is missing

v0.14.0
------------------------------
*January 20, 2022*

### Changed
- Fallback to gray background for restaurant image when image doesn't load or is missing
- Hide restaurant logo when image fails to load
- Add presentation role to restaurant logo
- Move restaurant logo to it's own folder

v0.13.0
------------------------------
*January 17, 2022*

### Added
- RestaurantFees component to display delivery fee and minimum order
- RestaurantFees unit tests
- Default background colour to restaurant card image
### Changed
- Changed restaurant image role from "img" to "presentation"
- Added RestaurantFees data to storybook
- Updated f-vue-icons dependency for new cash small icon

v0.12.0
------------------------------
*December 20, 2021*

### Added
- Scrollable and stackable restaurant dish list component
- Dish list component unit tests
- Dish component unit tests
- Dish and Dish list storybook files
### Changed
- Updated restaurant dish styling
- Added dish state to restaurant card storybook

v0.11.1
------------------------------
*December 17, 2021*
### Added
- @justeat/f-vue-icons added as a dependency

v0.11.0
------------------------------
*December 07, 2021*

### Added
- Local Legend Logo

v0.10.0
------------------------------
*December 07, 2021*

### Added
- Restaurant offers
- associated unit tests to check render logic

### Changed
- updated storybook with offer example

v0.9.0
------------------------------
*December 01, 2021*

### Added
- RestaurantRating component, used to display restaurant rating values
- Storybook entries for restaurant card subcomponents

### Changed
- Updated storybook for restaurant card
- Renamed RestaurantBadge and RestaurantBadges to RestaurantTag and RestaurantTags to align with language across the business
- Remove pie token import from tag component and use css class for default colours
- Hardcode colour scheme options for restaurant tags

v0.8.0
------------------------------
*November 03, 2021*

### Added
- DeliveryTimeMeta and IconText components, which we use for ETA, distance, and address data

### Fixed
- Styles of cuisines component

v0.7.0
------------------------------
*November 02, 2021*

### Added
- RestaurantBadge and RestaurantBadges components
- Basic positioning styles for badges within restaurant image

v0.6.0
------------------------------
*October 28, 2021*

### Added
- Restaurant cuisines component

v0.5.0
------------------------------
*October 28, 2021*

### Added
- Basic dish item styling
### Updated
- Broke down parts of card into subcomponents
- Add hover styling to card title
- Remove some placeholder text
- Move logo out of image container for potential fallback options in future

v0.4.0
------------------------------
*October 25, 2021*

### Added
- Injectable error boundary to wrap around slots and subcomponents

v0.3.0
------------------------------
*October 22, 2021*

### Added
- Basic component styling

### Updated
- Component HTML to use new classes, attributes and fewer elements
- Storybook args updated to use new component props contract

v0.2.0
------------------------------
*October 7, 2021*

### Added
- Wrapper component to handle multiple component versions
- Passing props and slots through wrapper component
- Placeholder template and logic to component
- Wrapper component unit tests

v0.1.0
------------------------------
*October 4, 2021*

### Added
- `f-restaurant-card` component structure and config.

