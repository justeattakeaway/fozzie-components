<div align="center">

# f-stat-client

<img width="125" alt="Fozzie Bear" src="../../../bear.png" />

Javascript HTTP client for publishing stats to ElasticSearch

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-stat-client.svg)](https://badge.fury.io/js/%40justeat%2Ff-stat-client)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-stat-client/badge.svg)](https://coveralls.io/github/justeat/f-stat-client)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-stat-client/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-stat-client?targetFile=package.json)

This client abstracts away the complexity of publishing stats to ElasticSearch, such as API timings so you can then graph on these results.  It also provides a standardised approach for to follow that can be used in a suite of features and components, allowing you to use and report in a generic way.

## Benefits (Now)
- Simple publish method that hides away the complexities of making posts requests to ElasticSearch
- Sensible defaults, with the ability to override all
- If you run ElasticSearch locally in a Docker Container and use the host `localhost` then you can see you results instantly (see https://www.elastic.co/guide/en/elasticsearch/reference/7.0/docker.html & https://elasticvue.com/)
- Built-in mock ability by providing a mock on the constructor (see https://github.com/elastic/elasticsearch-js-mock and an example below)

## Benefits (Soon)
- _encapsulated batch publishing_
- _encapsulated sample publishing_
- _encapsulated authentication_
<hr></br>

## Usage
</br>

### *Installation*

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-stat-client
```
### *Initialisation/Construction e.g.*
```js
import StatClient from '@justeat/f-stat-client';

const options = {
    statClientUri: 'http://public-elastic-search-endpoint',
    tenant: 'uk',
    featureName: 'checkoutweb'
};

const client = new StatClient(options);

```
### *How to use*
```js

await client.publish({ verb: 'GET', segment: '/search', status: 200, timing: 611 });

```
Note; the dynamic model passed to the `publish()` method will get deconstructed and written out as individual fields on the ElasticSearch document along with the fixed fields of `FeatureName`, `Tenant` and a `Timestamp`.

*An example of the final document written to ElasticSearch:*
<img alt="Output Example" src="README_1.png" />

## Constructor
Parameter | Description | Type | Example
------------- | ------------- | ------------- | -------------
options | The overrides for the default options | `json` _[string]_ | `{`</br>`statClientUri: 'http://localhost:9200',`</br>`tenant: 'ns',`</br>`featureName: 'Generic Front End'`</br>`}`</br>(See below the defaults for the options if not overridden via the constructor `options`)
mock | This can be supplied for testing purposes and will be used to return your mock response instead | @elastic/elasticsearch-mock | (see mock example below)
<hr></br>

## Options
Parameter | Description | Type | Default
------------- | ------------- | ------------- | -------------
statClientUri | The host of the stat publishing endpoint | String | '`http://localhost:9200`'
tenant | This is a key identifier to group stats by country, e.g. `uk` | String | 'ns'
featureName | This is a key identifier to group stats by feature, e.g. `salesWebsite` | String | 'Generic Front End'
statClientUser | The username to gain access to the stat publishing endpoint (if not supplied then no authentication will be used) | String | `null`
statClientPwd | The password to gain access to the stat publishing endpoint (ignored if `user` not supplied) | String | `null`
statClientIndexName | This is index to write to | String | 'justeat'
<hr></br>

## Client Methods
These are all of the methods exposed by the `f-stat-client`

Method | Description | Parameters | Example
------------- | ------------- | ------------- | -------------
publish | Sends a dynamic model (stat details) to the Endpoint | `json` _[string]_ | `{`</br>`verb: 'GET',`</br>`segment: '/search',`</br>`status: 200,`</br>`timing: 654`</br>`}`
</br>
## How to Test/Mock e.g.
<hr></br>

```js
import StatClient from '@justeat/f-stat-client';

const Mock = require('@elastic/elasticsearch-mock');

const mock = new Mock();

// Build a cut down mock reponse
const mockResponse = {
    _index: 'justeat',
    result: 'created',
    statusCode: 201
};

// Mock the action to return the mock response
mock.add({
    method: 'POST',
    path: '*'
}, () => (mockResponse));

const options = {
    statClientUri: 'http://localhost:9200',
    tenant: 'uk',
    featureName: 'checkoutweb_test',
    statClientIndexName: 'justeat'
};

// Supply the mock on the constructor
const client = new StatClient(options, mock);

// Act
const response = await client.publish({ verb: 'GET', segment: '/basket', status: 200, timimg: 654 });

// Assert
expect(response.body.result).toBe('created');

```
</br>
<hr></br>
