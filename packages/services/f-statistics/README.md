<div align="center">

# f-statistics

<img width="125" alt="Fozzie Bear" src="../../../bear.png" />

A service for publishing statistics from the client side

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-statistics.svg)](https://badge.fury.io/js/%40justeat%2Ff-statistics)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-statistics/badge.svg)](https://coveralls.io/github/justeat/f-statistics)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-statistics/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-statistics?targetFile=package.json)

> This package is an MVP (not yet stable), if you want to use it contact the team first.

- `f-statistics` is responsible for transporting statistics provided to it; for example response time statistics from `f-http`.

- It is likely the transportation method may change.

## Benefits (Now)
- Hide away how statistics are transported from every day development.
- Ability to be flexible with where our statistics are transported.
- Ability for properties to be provided during initialisation, which are included in every publication.

## Benefits (Soon)
- Batching options - to decrease network usage
- Sampling options - to increase scalability

<hr>

## Usage

### Installation

```sh
yarn add @justeat/f-statistics
```
### Usage
- It is not possible to instantiate multiple versions of Just Log in a single website, so provide a prepared Just Log instance where you can, or initialise one yourself.

```js
// Import the pre-requisite packages
import StatisticsModule from '@justeat/f-statistics';
import { justLog } from '@justeat/just-log';

// Initialise Just Log if one is not already available
justLog.forFeature({
    name: 'your website name',
    tenant: 'your tenant',
    version: 'your version number',
    environment: 'your environment name'
});

// Declare basic options
const statisticsConfiguration = {
    environment: 'your environment name',
    featureName: 'your website name',
    // optional batch logging config to overide the default values
    logsMaxByteSize: 2000,
    logsMaxLength: 5,
    logsIntervalTimer: 5000
};

// Optional (provide properties to publish with every statistic)
const baseProperties = {
  my_experiment_bucket: 'Bucket 1'
};

// Initialise a new instance of the statistics client
const statisticsClient = new StatisticsModule(justLog, statsConfiguration, baseProperties, store);

// Publish a statistic
statisticsClient.publish({
    measureOne: 'Test',
    measureTwo: 'test'
});

// Optionally (Nuxt) inject the statistics client into context
inject('statistics', statisticsClient);
```

## Options
Options should be provided when initialising the `statsModule`
Parameter | Required |Description | Type
------------- | ---- |------------- | -------------
environment | yes | The name of the environment being used | String
featureName | yes | The name of your feature | String
logsMaxByteSize | no | Total byte size of logs to store before triggering batch publishing | Number
logsMaxLength | no | The number of logs to store before triggering batch publishing. Use 1 to publish immediately | Number
logsIntervalTimer | no | Time in milliseconds to wait before publishing logs. Use 0 to disable batch publishing using timer  | Number

<hr></br>

## Client Methods
These are all of the methods exposed by `f-statistics`

Method | Description | Parameters | Example
------------- | ------------- | ------------- | -------------
publish | Transports a message containing the payload provided | object | `publish('This is a message', { measureOne: 'test', measureTwo: 'test' });`
</br>
