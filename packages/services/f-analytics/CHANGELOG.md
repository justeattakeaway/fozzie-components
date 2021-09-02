# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v0.12.0
------------------------------
*September 1, 2021*

### Added
- The ability to override/reset the Options `Feature Name` and/or `Locale` after plugin registration via the `pushPlatformData()` method.
- The ability to add a list of fields to pushPlatformData(), pushPageData() & pushUserData() methods that overrides any of the fields already present and if not present then adds the fields.


v0.10.0
------------------------------
*August 19, 2021*

### Changed
- Moved the prepPageData from Mixin into Service to allow the consumer to dictate when to push the GA data.
- Remove redundant Mixin
- Updated readme


v0.9.0
------------------------------
*August 16, 2021*

### Changed
- Moved the prepUserData from Mixin into Service to allow the consumer to dictate when to push the GA data.


v0.8.0
------------------------------
*August 12, 2021*

### Added
- Added push ad-hoc event method to global var

### Changed
- Moved the preparation of the server side plaform data to a plugin.
- Refactored the Store to allow store serverside events to be stored until clientside.


v0.7.0
------------------------------
*August 10, 2021*

### Added
- `PreparePageData` method

### Changed
- Replaced `MAP_ROUTE_TO_FEATURE_NAME` const with `mapRouteToGroup` & `mapRouteToFeature`


v0.6.0
------------------------------
*August 9, 2021*

### Added
- `PrepareUserData` method

### Changed
- `PrepareAnalytics` method renamed to `PreparePlatformData`
- `null` values changed to `undefined` because of analytics team requirement

### Removed
- Watch and mounted hook for prepare and push functions as now they will be called from a consuming app


v0.5.0
------------------------------
*July 28, 2021*

### Changed
- Moved the preparation of the gtm tags to a plugin.
- Expose service globally within the plugin.


v0.4.0
------------------------------
*July 26, 2021*

### Added
- Route to Feature name constant mapper.


v0.3.0
------------------------------
*July 2, 2021*

### Added
- Added `analytics.mixin.vue` to handle GTM/GA platformData push logic


v0.2.0
------------------------------
*July 1, 2021*

### Added
- Remove markup and convert to `Service`


v0.1.0
------------------------------
*June 17, 2021*


### Added
- Initial scaffolding for new component
