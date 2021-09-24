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

const contextGetter = () => ({
  country: 'uk',
  anonUserId: getCookieValue('je-auser-id') // getCookieValue() implementation to be provided by integrator
})

const settings = { //see table below for details
  initialConfigAsJson: '{ ... }', 
  keyPrefix: 'je-coreweb',
  cdn: {
    scope: 'je-coreweb', 
    environment: 'production',
    key: '<key for scope/env>',
    poll: true,
    pollInterval: 30000
  },  
  contextGetter,
  onUpdated: () => { } 
};

const featureManagement = await createFeatureManagementInstance(settings);

// e.g.
const myFeatureValue = featureManagement.getValue('my-feature-value');
```

### Settings parameters:

|Parameter|Type|Required|Notes|
|--|--|--|--|
|`initialConfigAsJson`|string|No|Can be passed in if available prior to initialisation. Usually would originate on the Feature Management CDN.|
|`contextGetter`|function|Yes|Parameterless function that returns object containing `country` and `anonUserId`.|
|`onUpdated`|function|No|Parameterless function invoked when config is loaded / changed.|
|`keyPrefix`|string|No|String to prepend to feature keys, along with `::`.  If omitted, full key including prefix must be passed.  E.g. `<prefix>::<key>` rather than just `<key>`.|
|`cdn`|object|No|If config is to be loaded from the CDN by this lib this property must be set. See the Feature Management portal for details.|
|`cdn.scope`|string|Yes (if `cdn` set)|The Feature Management "scope". E.g. `je-coreweb`.|
|`cdn.environment`|string|Yes (if `cdn` set)|The Feature Management "environment". E.g. `production`.|
|`cdn.key`|string|Yes (if `cdn` set)|The Feature Management key for the scope/environment.|
|`cdn.poll`|Boolean|No (defaults to false)|Should we poll for config updates after the initial load.|
|`cdn.pollInterval`|integer|No (defaults to 30000)|Poll interval in ms.|

## Integration with vue
The intention is to make a wrapping library that integrates with Vue and makes these configuration values reactive.
