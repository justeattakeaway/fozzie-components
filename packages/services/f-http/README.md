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

## Benefits (Now)
- Easy configuration of reusable clients which can be retrieved from context
- Enables us to switch to alternative HTTP packages when desired
- Sensible defaults, with the ability to override everything
- Ability to set authorisation tokens for all requests for specific clients
- Ability to name each client, so output from it is grouped and labelled

## Benefits (Soon)
- _Automatically collect stats showing how long real API calls take_
- _Opt-in automatic logging of errors_
- _Opt-in ability to use dynamic timeouts_
- _Opt-in automatic providing of diagnostic headers, such as Conversation ID_

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
import httpModule from '@justeat/f-http';

const errorCallback = error => { // This is optional
    console.error(error);
};

export default (context, inject) => {
    const options = { // Options are described later
        instanceName: 'Example Nuxt client'
        baseUrl: 'https://jsonplaceholder.typicode.com',
        errorCallback
    };

    const httpClient = httpModule.createClient(options);

    inject('http', httpClient); // Exposes GET, PUT, POST, PATCH, DELETE
};

```

#### Initialise in NodeServices or Vue CLI
```js
import Vue from 'vue';
import httpModule from '@justeat/f-http';

const errorCallback = error => { // This is optional
    console.error(`Handled HTTP Error: ${error.message}`);
};

export default () => {
    const configuration = { // Options are described later
        instanceName: 'Example client'
        baseUrl: 'https://jsonplaceholder.typicode.com',
        errorCallback
    };

    const httpClient = httpModule.createClient(configuration);

    Vue.prototype.$http = httpClient; // Exposes GET, PUT, POST, PATCH, DELETE
};

```

### Basic Implementation
**Recommended**: Using the prototype (Vue) or context (Nuxt). You can access $http in components, or anywhere the context is available including VueX

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

### Alternative Implementation
If you would rather create the HTTPClient when you use it, that's fine too; it just means it can't be reused as easily and you will need to filter the configuration options down to the component.

```js
export default {
  async mounted () {
    const configuration = { // Options are described later
        instanceName: 'Example client'
        baseUrl: 'https://jsonplaceholder.typicode.com'
    };

    const httpClient = httpModule.createClient(configuration);

    const result = await httpClient.get('/todos/1');
  }
}
```

### Setting Authorisation Token
If you need to call an authorised endpoint, you could pass the authorisation token through as a header in every request; but if you group clients correctly you may be able to benefit from applying it once for the lifetime of that client.

```js
// Some event happened that means we now have a token
export default {
  async mounted () {
    this.$http.setAuthorisationToken('my token');

    // This and all future requests will use the provided token
    const result = await this.$http.get('/todos/1');
  }
}
```

### Unit Testing Guidance
Because $http exists in context, it should be really easy to mock it in any way you want. Check out the example below

```js
const wrapper = mount(MyComponent, {
  mocks: {
    $http: {
      get: jest.fn()
    }
  }
});
```

### Integration Testing Guidance
F-Http exposes a way to create a mockClient, this enables you to mock the underlying HTTPProvider with responses.

```js
import httpModule from '@justeat/f-http';

const { mockFactory, httpVerbs } = httpModule;

mockFactory.setupMockResponse(httpVerbs.POST, '/URL', REQUEST_DATA, 201);

// Accepts options payload
const $http = mockFactory.createMockClient({ instanceName: 'Integration Test Client'});

const wrapper = mount(MyComponent, {
  mocks: {
    $http
  }
});
```


## Options
All options are optional, you don't need to specify any overrides if you are happy with the default values

Option | Description | Type | Default
------------- | ------------- | ------------- | -------------
baseUrl | Ensure all requests from this client use a relative url | string | ''
timeout | How long each request takes to timeout | number | 10000
errorCallback | A function you can use to globally handle errors (accepts error object) | function | null
contentType | Specify a value for the content type header | string | 'application/json'
instanceName | Name the client so that stats and logs can be grouped by a specific API | string | 'Generic Front End'

<hr>

## Client Methods
These are all of the methods exposed by the httpClient

Method | Description | Parameters
------------- | ------------- | -------------
get | GET a resource | resource URL _[string]_, headers _[array]_
post | POST a resource | resource URL _[string]_, body _[object]_, headers _[array]_
put | PUT a resource | resource URL _[string]_, body _[object]_, headers _[array]_
patch | PATCH a resource | resource URL _[string]_, body _[object]_, headers _[array]_
delete | DELETE a resource | resource URL _[string]_, headers _[array]_
setAuthorisationToken | Set the authorisation token for all requests | authorisationToken _[string]_
readConfiguration | Returns the configuration which has been applied | None
