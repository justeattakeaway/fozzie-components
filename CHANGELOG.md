# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v1.2.1
------------------------------
*January 30, 2019*

### Added
- Link to Fozzie docs.

v1.2.0
------------------------------
*September 18, 2019*

### Added
- `shared.service.js` for duplicated logic used in `f-header` and `f-footer`
- `@babel/plugin-proposal-optional-chaining` to be used in `f-header` and `f-footer` components


v1.1.0
------------------------------
*June 21, 2019*

### Added
- Shareable browserslist config

### Changed
- ESLint configs moved to root of monorepo


v1.0.0
------------------------------
*June 21, 2019*

### Added
- `package.json` versioning and changelog of the root package to follow root it's specific changes

### Changed
- Move dev dependencies from `f-vue-icons` to the root folder using `lerna link convert`
Packages that are used by npm scripts left in the package to be able to run scripts not only from the root
