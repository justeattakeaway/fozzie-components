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
- Simple public publish method that requires minimal parameters
- Sensible defaults, with the ability to override most
- All setup parameters are held by the parent in their option file

## Benefits (Soon)
- _encapsualted batch publishing_
- _encapsualted sample publishing_
- _encapsualted authentication_
<hr></br>

## Usage
</br>

### *Installation*

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-stat-client
```
</br>

### *Initialisation/Construction e.g.*
```js
import StatClient from '@justeat/f-stat-client';

const client = new StatClient('http://localhost', 9200, 'uk', 'checkoutWeb');

```

</br>

### *How to use*
```js

await client.publish('GET', '/search', 200, 611);

```
<hr></br>

## Constructor
All values are optional, you don't need to specify any overrides if you are happy with the default values

Option | Description | Type | Default
------------- | ------------- | ------------- | -------------
url | The host of the stat publishing endpoint | String | '`http://localhost`'
port | The port of the stat publishing endpoint | Number | 9200
tenant | The current tenant | String | 'ns'
featureName | This is key so stats can be identified & grouped by feature, e.g. `salesWebsite` | String | 'NotSpecified'
user | The username to gain access to the stat publishing endpoint, if not supplied then no authentication will be used | String |
pwd | The password to gain access to the stat publishing endpoint | String |
indexName | This is index to write to | String | 'justeat'
mock | This can be supplied for testing purposes and will use/return your mock instead | String |
<hr></br>

## Client Methods
These are all of the methods exposed by the httpClient

Method | Description | Parameters | Example
------------- | ------------- | ------------- | -------------
publish | Sends the stat details to the Endpoint | `verb` _[string]_, `segment` _[string]_, `status` _[number]_, `timing` _[number]_ | `'GET', '/search', 200, 654`
