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

This package exposes methods for interacting with restful services, it may abstract any number of popular NPM packages which provide the ability to perform GET, PUT, POST, PATH, DELETE requests; while also adding some additional benefits.

## Benefits (Now)
- Easy configuration of reusable clients which can be retrieved from context
- Enables us to switch to alternative HTTP packages when desired
- Sensible defaults, with the ability to override everything
- Ability to set authorisation tokens for all requests for specific clients
- Ability to automatically collect stats showing how long real API calls take

## Benefits (Soon)
- _Opt-in ability to use dynamic timeouts_
- _Opt-in automatic providing of diagnostic headers, such as je-conversation
- _Opt-in automatic providing of headers, such as accept-tenant

## Usage

### Installation

Install the module using npm or yarn

```sh
yarn add @justeat/f-http
```


### Initialisation
Ideally the package should be initialised by your website and the httpClient placed in context or a prototype, rather than initialising it in each individual component or every time you make a request.

#### Initialise an httpClient
```js
import httpModule from '@justeat/f-http';

const options = { // Options are described later
    baseUrl: 'https://jsonplaceholder.typicode.com'
};

const httpClient = new httpModule.CreateClient(options);

// WHEN: Using a Nuxt Plugin
inject('http', httpClient);

// WHEN: Using Vue CLI
Vue.prototype.$http = httpClient;
```

### Basic Usage
**Recommended**: Using the prototype (Vue) or context (Nuxt). You can access $http in components, or anywhere the context is available including vuex modules.

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
        baseUrl: 'https://jsonplaceholder.typicode.com'
    };

    const httpClient = new httpModule.CreateClient(configuration);

    const result = await httpClient.get('/todos/1');
  }
}
```

### Setting Authorisation Token
You can optionally set an authorisation token globally so that all requests provide it

```js
// Some event happened that means we now have a token
export default {
  mounted () {
    this.$http.setAuthorisationToken('my token');
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

### Integration / System Testing Guidance
The module exposes a way to create a MockClient, so you can mock the underlying API with pre-configured responses.

```js
import { httpVerbs, MockFactory, CreateClient } from '@justeat/f-http';

const mockFactory = new MockFactory();
const httpClient = new CreateClient();

const wrapper = mount(MyComponent, {
  mocks: {
    $http: httpClient
  }
});

// Reset all previously configured responses
mockFactory.reset();

// Setup a fake response
mockFactory.setupMockResponse(httpVerbs.POST, '/URL', REQUEST_DATA, 201);
```

## Options
All options are optional, you don't need to specify any overrides if you are happy with the default values

Option | Description | Type | Default
------------- | ------------- | ------------- | -------------
baseUrl | Ensure all requests from this client use a relative url | string | ''
timeout | How long each request takes to timeout | number | 10000
errorCallback | A function you can use to globally handle errors (accepts error object) | function | null
contentType | Specify a value for the content type header | string | 'application/json'

<hr>

## Client Methods
These are all of the methods exposed by the `httpClient`

Method | Description | Parameters
------------- | ------------- | -------------
get | GET a resource | resource URL _[string]_, headers _[array]_
post | POST a resource | resource URL _[string]_, body _[object]_, headers _[array]_
put | PUT a resource | resource URL _[string]_, body _[object]_, headers _[array]_
patch | PATCH a resource | resource URL _[string]_, body _[object]_, headers _[array]_
delete | DELETE a resource | resource URL _[string]_, headers _[array]_
setAuthorisationToken | Set the authorisation token for all requests | authorisationToken _[string]_
readConfiguration | Returns the configuration which has been provided | None
