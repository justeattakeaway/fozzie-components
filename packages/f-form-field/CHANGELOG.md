# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


v0.2.0
------------------------------
*May 12, 2020*

### Added
- Added some simple initial tests.

### Changed
- Updating `vue-test-utils` to v1 and `@vue/cli-plugin-unit-test` to v4.3.1.
- Use `node current` in unit test Babel config, so that it supports `async > await` properly.

### Removed
- `testMatch` from jest config, as not needed.


v0.1.0
------------------------------
*May 1, 2020*

### Added
- Component structure and basic configuration (created using `generator-component`).
- Component markup and core functionality.
- Storybook config.
