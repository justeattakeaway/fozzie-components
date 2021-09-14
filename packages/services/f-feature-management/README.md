# Feature Management 

This service allows querying of feature flags as configured using the Feature Management service.

## Usage

**This service is a WIP. The instructions cover the current way of working. This is subject to change.**

The SDK can either be given its configuration as part of initialisation, told how to fetch the configuration from the Feature Management CDN, or both.  It can also be set up to poll for configuration.

### Configuration on initialisation

The expected scenario where you might have the configuration to hand might be where the server has loaded the relevant configuration and includes the JSON in the page.  This saves the latency of having to load it as part of startup, as well as ensuring the client has the exact same configuration as was used by the server.

### Polling

Where the page is likely to be long-lived (e.g. in an SPA) you are going to want to poll periodically for config. Note that the CDN will be serving files with `Cache-Control` headers, hence the "polling" may just read the file from the browser cache.  `ETag`s are also used.  The point here being that a frequent polling interval is not destined to result in continued network calls from the client.  Talk to the Experimentation Platform team about cache policy. 

### Example

To instantiate the SDK:

```javascript
import createFeatureManagementInstance from '@justeat/f-feature-management';

const configJson = '{ ... }'; //Optional string containing configuration json, which will have been pulled down from the CDN.  

const contextGetter = () => ({
  country: 'uk',
  anonUserId: getCookieValue('je-auser-id') // getCookieValue() implementation to be provided by integrator
})

const settings = {
  json: configJson, //required only if config is available at init time; otherwise can set scope, environment, key
  poll: true, 
  scope: 'je-coreweb', //scope, environment, key required to load config from CDN
  environment: 'production',
  key: '<key for scope/env>'
  contextGetter,
  pollInterval: 30000 //defaults to 30000 (ms),
  onUpdated: () => { /* Callback function to indicate that new config has been loaded */ } 
};

const featureManagement = await createFeatureManagementInstance(settings);

// e.g.
const myFeatureValue = featureManagement.getValue('my-feature-value');
```