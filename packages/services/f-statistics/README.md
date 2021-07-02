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

The purpose of this service is to abstract away the responsibility for pushing statistics. It is not responsible for collecting stats of any kind.

It is abstracted so that a myriad of statistic generators can rely on this interface; and should we wish to redirect where statistics go, this package can isolate those changes in an easily upgradeable format.

## Benefits (Now)
- Easy to provide statistics and not need to worry about how they are transported
- Ability to switch underlying providers in future if we wish

## Benefits (Soon)
- Batching options
- Sampling options
<hr></br>

## Usage

### Installation

```sh
yarn add @justeat/f-statistics
```
### Usage
```js
import statsModule from '@justeat/f-statistics';

const statsConfiguration = {
    endpointUri: 'your endpoint',
    environment: 'your environment name',
    tenant: 'uk',
    featureName: 'your website name'
};

const statsClient = statsModule(statsConfiguration);

statsClient.publish({
    measureOne: 'Test',
    measureTwo: 'test'
});

```

## Options
All options are required and should be provided when initialising the `statsModule`
Parameter | Description | Type
------------- | ------------- | -------------
endpointUri | The endpoint that Just Log will send logs too | String
environment | The name of the environment being used | String
tenant | The tenant that is being browsed on | String
featureName | The name of your feature | String
clientVersion: | The version of your feature if available | String

<hr></br>

## Client Methods
These are all of the methods exposed by the `f-statistics`

Method | Description | Parameters | Example
------------- | ------------- | ------------- | -------------
publish | Transports a message containing the payload provided | object | `{ measureOne: 'test', measureTwo: 'test' };`
</br>
