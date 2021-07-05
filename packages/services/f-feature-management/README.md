# Feature Management 

**This is a WIP**

This service allows querying of feature flags as provided by our backend Feature Management service.

## Usage

To instantiate the SDK:

```javascript
import featureManagement from '@just-eat/je-feature-management'

const scope = 'je-my-team-scope'
const { getBooleanValue, getIntegerValue, getStringValue } = featureManagement(scope);

// e.g.
const myFeatureValue = getBooleanValue('my-feature-value');
```

*NOTE: if you're unsure what scope to use, please reach out to us in #team-experimentation-platform.*
