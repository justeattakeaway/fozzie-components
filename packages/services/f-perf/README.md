<div align="center">

# f-perf

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Web Performance Metrics and Monitoring - Real User Measurement (RUM) Vue plugin

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-perf.svg)](https://badge.fury.io/js/%40justeat%2Ff-perf)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-perf/badge.svg)](https://coveralls.io/github/justeat/f-perf)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-perf/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-perf?targetFile=package.json)

---

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-perf
```

```sh
npm install @justeat/f-perf
```

## Usage

Real User Measurement (RUM) Vue plugin, allows you to logs metrics in your Vue app. By default will push to GTM `dataLayer`.

It is non blocking to the page performance as it uses [requestidlecallback](https://developers.google.com/web/updates/2015/08/using-requestidlecallback).


```javascript
import webPerf from '@justeat/f-perf';

Vue.use(webPerf)
```

It implements PerfumeJS as Vue plugin. See more at https://github.com/zizzamia/perfume.js

#### Annotations

Methods or events can be annotated for their execution time to be recorded.

```javascript
// method annotations
this.$perfAnnotateStart('myMethodPerformance');
myMethod(400);
this.$perfAnnotateEnd('myMethodPerformance');
```

Note the metric name needs to match for `$perfAnnotateStart` and `$perfAnnotateEnd`. Also those will be prefixed with `webPerf_` to help filter those in your data.

#### Debug mode

It has the ability to run in debug mode, e.g. console logging output when `window.fPerfDebug` is set to true in the browser.

```javascript
window.fPerfDebug = true;
```

#### With custom logger function

Additionally user can overwrite the logging function with their own, when specified as an `option`. Custom logging function takes two arguments `metricName` and `data`.

```javascript
// Instantiate with own logger Function
import webPerf from '@justeat/f-perf';

/**
 * Custom logger
 * @param {String} metricName
 * @param {Object} data Performance data
 */
function ownPerfLogger (metricName, data) {
  console.log(metricName, data);
}

Vue.use(webPerf, {logger: ownPerfLogger})
```


