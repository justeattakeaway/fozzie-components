# Feature Management 

This service allows querying of feature flags as configured using the Feature Management service.

## Usage

**This service is a WIP. The instructions cover the current way of working. This is subject to change.**

To instantiate the SDK:

```javascript
import createFeatureManagementInstance from '@justeat/f-feature-management';

const configJson = //string containing configuration json.  The remote load functionality has not yet been added to this lib.

const contextGetter = function(){
  return {
    country: 'uk',
    anonUserId: getCookieValue('je-auser-id') //getCookieValue() implementation to be provided by integrator
  };
}

const settings = {
  json: configJson,
  contextGetter
};

const featureManagement = createFeatureManagementInstance(settings);

// e.g.
const myFeatureValue = featureManagement.getValue('my-feature-value');
```