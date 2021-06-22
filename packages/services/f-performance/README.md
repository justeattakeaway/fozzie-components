<div align="center">

# f-performance

<img width="125" alt="Fozzie Bear" src="../../../../bear.png" />

Web Performance Metrics and Monitoring - Real User Measurement (RUM) Vue plugin

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-perf.svg)](https://badge.fury.io/js/%40justeat%2Ff-perf)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-performance/badge.svg)](https://coveralls.io/github/justeat/f-performance)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-performance/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-performance?targetFile=package.json)

---

### Installation
j
Install the module using npm or Yarn:

```sh
yarn add @justeat/f-performance
```

```sh
npm install @justeat/f-performance
```

## Usage

Real User Measurement (RUM) Vue plugin, allows you to logs metrics in your Vue app. By default will push to GTM `dataLayer`.

It is non blocking to the page performance as it uses [requestidlecallback](https://developers.google.com/web/updates/2015/08/using-requestidlecallback).


```javascript
import fPerformance from '@justeat/f-performance';

Vue.use(fPerformance)
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

_Tip_: Data can be viewed in console under `window.dataLayer`. [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna?hl=en) extension can also be helpful with the default GTM logging.

#### With custom logger function

Additionally user can overwrite the logging function with their own, when specified as an `config`. Custom logging function takes two arguments `metricName` and `data`.

```javascript
// Instantiate with own logger Function
import fPerformance from '@justeat/f-performance';

/**
 * Custom logger
 * @param {String} metricName
 * @param {Object} data Performance data
 */
function ownPerfLogger (metricName, data) {
  console.log(metricName, data);
}

Vue.use(fPerformance, {logger: ownPerfLogger})
```


