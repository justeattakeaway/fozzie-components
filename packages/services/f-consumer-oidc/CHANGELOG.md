# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

v1.4.0
------------------------------
*July 25, 2022*

### Added
- Node 16 support.


v1.3.1
------------------------------
*June 15, 2022*

### Removed
- Removed vite as a dependency and moved to monorepo root `package.json` to solve version conflict issue


v1.3.0
------------------------------
* September 8, 2021*

### Fixed
- `dist` references to resolve import error in consuming application.


v1.2.0
------------------------------
* September 3, 2021*

### Removed
- `webpack` references from package.json.
- `webpack.config.js` from directory.

### Added
- `vite` config & build command to package.json > scripts.


v1.1.0
------------------------------
* February 1, 2021*

### Added
- `uglifyjs-webpack-plugin` so we can output `min.js` files.


v1.0.0
------------------------------
* January 20, 2021*

### Added
- Migrate repository
