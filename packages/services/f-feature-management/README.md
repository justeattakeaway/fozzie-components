# Feature Management 

**This is a WIP**

This service allows querying of feature flags as provided by our backend Feature Management service.

## Usage

To instantiate the SDK:

```javascript
import featureManagement from '@justeat/f-feature-management';

const scope = 'je-my-team-scope';
const { getBooleanValue, getIntegerValue, getStringValue } = featureManagement(scope);

// e.g.
const myFeatureValue = getBooleanValue('my-feature-value');
```