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

### *Initialisation*
```js

// TODO

```

</br>

### *How to use*
```js
import httpModule from '@justeat/f-stat-client';

// TODO

```
<hr></br>

## Options
All options are optional, you don't need to specify any overrides if you are happy with the default values

Option | Description | Type | Default
------------- | ------------- | ------------- | -------------
featureName | This is key so stats can be identified & grouped by feature, e.g. `salesWebsite` | String | 'NotSpecified'
statPort | The port of the stat publishing endpoint | Number | 9200
statHost | The host of the stat publishing endpoint | String | '`http://localhost`'
statUN | The username to gain access to the stat publishing endpoint | String | ''
statPWD | The password to gain access to the stat publishing endpoint | String | ''
<hr></br>

## Client Methods
These are all of the methods exposed by the httpClient

Method | Description | Parameters
------------- | ------------- | -------------
publish | Send the details of a stat to the Endpoint | _TODO_
