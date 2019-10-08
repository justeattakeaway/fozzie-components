# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


0.11.0
------------------------------
*October 4, 2019*

 ### Added
- `window-or-global` package for SSR issue`


0.10.0
------------------------------
*October 2, 2019*

 ### Added
- Tests for new services that have been added

 ### Changed
- `webpack.config.js` and packages for a better build
- Name of the export in the `index.js` to `sharedServices` for consistency


0.9.0
------------------------------
*October 1, 2019*

 ### Added
- `lodash-es` throttle for the `addEvent` service


0.8.0
------------------------------
*September 30, 2019*

 ### Added
- `getWindowWidth` method for returning the current width of the window
- `getWindowHeight` method for returning the current height of the window
- `addEvent` method for listening to a given event and applying a given function at a given time
- `removeEvent` method for clearing the listener for a given event and function


0.7.0
------------------------------
*September 27, 2019*

 ### Removed
- `transformLocale` as it is not needed any more


0.6.0
------------------------------
*September 26, 2019*

 ### Changed
- Webpack config to add babel polyfill


0.5.0
------------------------------
*September 26, 2019*

 ### Added
- `transformLocale` method for changing the case format of the locale


0.4.0
------------------------------
*September 25, 2019*

 ### Added
- String manipulation on locale in `getLocale` method


0.3.0
------------------------------
*September 24, 2019*

 ### Added
- Added fallback for other method in shared service


0.2.0
------------------------------
*September 24, 2019*

 ### Added
- Fallback for locale in shared logic


0.1.0
------------------------------
*September 24, 2019*

 ### Added
- Created service package for shared logic
- Tests for the methods inside
