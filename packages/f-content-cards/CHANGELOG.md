# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


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
