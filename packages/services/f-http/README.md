<div align="center">

# f-http

<img width="125" alt="Fozzie Bear" src="../../../bear.png" />

Javascript HTTP client for interacting with restful services

</div>

---

[![npm version](https://badge.fury.io/js/%40justeat%2Ff-http.svg)](https://badge.fury.io/js/%40justeat%2Ff-http)
[![CircleCI](https://circleci.com/gh/justeat/fozzie-components.svg?style=svg)](https://circleci.com/gh/justeat/workflows/fozzie-components)
[![Coverage Status](https://coveralls.io/repos/github/justeat/f-http/badge.svg)](https://coveralls.io/github/justeat/f-http)
[![Known Vulnerabilities](https://snyk.io/test/github/justeat/f-http/badge.svg?targetFile=package.json)](https://snyk.io/test/github/justeat/f-http?targetFile=package.json)

This package exposes methods for interacting with restful services, it may abstract any number of popular NPM packages which provide the ability to perform GET, PUT, POST, PATH, DELETE requests; while also adding lots of additional benefits.

## Benefits (Now and later)
- Automatically collect stats showing how long real API calls take
- Easy configuration of reusable clients which can be retrieved from context
- Opt-in automatic logging of errors
- Opt-in ability to use dynamic timeouts
- Opt-in automatic providing of diagnostic headers, such as Conversation ID
- Enables us to switch to alternative HTTP packages when desired
- Sensible defaults, with the ability to override everything
- Opt-in Automatic providing of bearer tokens


## Usage

### Installation

Install the module using npm or Yarn:

```sh
yarn add @justeat/f-http
```


### Initialisation
Ideally the package should be initialised by your website and the httpClient placed in context or a prototype, rather than initialising it in each individual component or every time you make a request.

#### Initialise in a Nuxt Plugin (Works on Server and Client)
```js
import http from '@justeat/f-http';

const errorCallback = error => { // This is optional
    console.error(error);
};

export default (context, inject) => {
    const options = { // Options are described later
        baseUrl: 'https://jsonplaceholder.typicode.com',
        errorCallback
    };

    const httpClient = http.createClient(options);

    inject('http', httpClient); // Exposes GET, PUT, POST, PATCH, DELETE
};

```

#### Initialise in NodeServices or Vue CLI
```js
import Vue from 'vue';
import http from '@justeat/f-http';

const errorCallback = error => { // This is optional
    console.error(`Handled HTTP Error: ${error.message}`);
};

export default () => {
    const configuration = { // Options are described later
        baseUrl: 'https://jsonplaceholder.typicode.com',
        errorCallback
    };

    const httpClient = http.createClient(configuration);

    Vue.prototype.$http = httpClient; // Exposes GET, PUT, POST, PATCH, DELETE
};

```


### Basic Implementation
**Recommended**: Using the prototype (Vue) or context (Nuxt).

You can access $http in components, or anywhere the context is available including VueX

```js
export default {
  data () {
    return {
      apiResult: null
    }
  },
  async mounted () {
    this.apiResult = await this.$http.get('/todos/1');
  }
}
```

## Options
All options are optional, you don't need to specify any overrides if you are happy with the default values

Option | Description | Type | Default
------------- | ------------- | ------------- | -------------
baseUrl | Ensure all requests from this client use a relative url | string | ''
timeout | How long each request takes to timeout | number | 10000
errorCallback | A function you can use to globally handle errors (accepts error object) | function | null
contentType | Specify a value for the content type header | string | 'application/json'
