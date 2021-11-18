# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v0.6.1
------------------------------
*November 18, 2021*

### Changed 
 - Improved error logging

v0.6.0
------------------------------
*November 11, 2021*

### Changed
 - Added Vue service encapsulating Vue plugin and store logic
 - Separated Vue-specific and Vue-independent files
 - Updated tests to match new structure

v0.5.0
------------------------------
*October 27, 2021*

### Changed
 - Separate config loading and module initialisation
 - Switch from fetch to injected client + default axios client
 - Update tests to use jest-mock-axios

v0.4.0
------------------------------
*September 14, 2021*

### Added
- Ability to poll for config


v0.3.0
------------------------------
*August 31, 2021*

### Changed
- Switched from Webpack to Vite for the build

v0.2.0
------------------------------
*July 30, 2021*

### Added
- full implementation, aside from fetching config
- working e2e tests

v0.1.0
------------------------------
*July 6, 2021*

### Added
- Skeleton interface
- Disabled tests
