# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v1.3.0
------------------------------
*September 14, 2021*

### Removed
- `MainBannerContainer.test.js` due to GA events being deleted.
- `Services` directory due to GA events being deleted.
- Mounted hook GA calls.


v1.2.0
------------------------------
*June 23, 2021*

### Added
- Visual regression tests


*April 6, 2021*

### Added
- Component tests for `MainBannerContainer.vue` and `PageBanner.vue`
- `f-statusBanner.selector.js` file for storing test elements


v1.1.0
------------------------------
*February 23, 2021*

### Removed
- `header` & `footer` components so the consuming application can render their own.
- Tests that covered header & footer.
- Storybook dispatch error.


v1.0.0
------------------------------
*February 12, 2021*

### Added
- `PageBanner.vue`, `MainBannerContainer.vue` components.
- Copy for each tenant.
- Test to cover changes.
- `constants.js` file.
- `f-searchbox`, `f-header` & `f-footer` components.


v0.1.0
------------------------------
*February 10, 2021*

### Added
- Base component generator files.
