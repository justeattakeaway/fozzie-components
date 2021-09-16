# Feature Management for Vue 3

This service wraps [f-feature-management](../f-feature-management) for use with Vue 3, allowing features to be queried in a reactive way (so they refresh when new config is loaded) if required.  Non-reactive querying is also possible.

## Usage

The `settings` object is documented in the main [f-feature-management](../f-feature-management) module. What this module adds is that the return "Feature Management" object has a property called `reactive`. If you call `featureManagement.reactive.getValue()` from a Vue 3 context, it will be reactive and will be re-evaluated when new config is loaded by the Feature Management SDK.

Calling `getValue()` from the base "Feature Managment" object will not be reactive and the value will remain until you explicitly call it again.

So for example if you have:

```javascript
  data: () => {
      featureManagement: createFeatureManagementForVue3({/*settings*/})
    },
  computed: {    
    myDynamicFeatureStatus: () => {
      return this.featureManagement.reactive.getValue('my-feature') ? 'Feature On' : 'Feature Off'; //dynamic
    },
    myStaticFeatureStatus: () => {
      return this.featureManagement.getValue('my-feature') ? 'Feature On' : 'Feature Off'; //static
    }
  }
```
