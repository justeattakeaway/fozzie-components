# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v1.5.1
------------------------------
*February 24, 2020*

### Removed
- `isSettings` check from package babel configs. This is a custom `ENV` variable used in `f-searchbox` and isn't used anywhere else.


v1.5.0
------------------------------
*February 24, 2020*

### Changed
- Updated packages to have consistent lint rules
- CircleCI Badge on README replaces TravisCI badge
- Node version (`package.json`) updated to be `>=10.0.0` across all packages, as that's what we test against.
- CircleCI Build now runs lint and build checks on all packages
- `f-services` patch release (deleted some redundant/unneeded packages)


v1.4.1
------------------------------
*February 10, 2020*

### Fixed
- DangerJS fix for package paths and for false positive around reporting change in the root


v1.4.0
------------------------------
*February 6, 2020*

### Added
- DangerJS Checks (via CircleCI)
- Pull Request Template
- `CODEOWNERS` file


v1.3.0
------------------------------
*February 5, 2020*

### Added
- CircleCI base config for PR checks. Config currently will run unit tests across all `fozzie-components` packages


v1.2.1
------------------------------
*January 30, 2020*

### Added
- Link to Fozzie docs


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
