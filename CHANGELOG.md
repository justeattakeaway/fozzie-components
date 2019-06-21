# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v1.0.0
------------------------------
*June 21, 2019*

### Added
- `package.json` versioning and changelog of the root package to follow root it's specific changes

### Changed
- Move dev dependencies from `f-vue-icons` to the root folder using `lerna link convert`
Packages that are used by npm scripts left in the package to be able to run scripts not only from the root
