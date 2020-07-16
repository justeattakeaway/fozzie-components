# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v0.1.1
------------------------------
*Jul 16, 2020*

### Changed
- Removed component top margin. This should be set in the host app, if required


Latest (roll into next release)
------------------------------
*May 12, 2020*

### Changed
- Updating `vue-test-utils` to v1 and `@vue/cli-plugin-unit-test` to v4.3.1.
- ESLint autofix turned off (so that tests don't pass due to `--fix` being applied, but then publish subsequently fails)

### Removed
- `testMatch` from jest config, as not needed.


v0.1.0
------------------------------
*March 27, 2020*

### Added
- Adds `f-user-message` vue component
