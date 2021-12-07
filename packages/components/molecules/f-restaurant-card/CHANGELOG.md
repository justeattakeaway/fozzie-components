# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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

