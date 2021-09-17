# Feature Management for Vue

This service wraps [f-feature-management](../f-feature-management) for use with Vue 2 or 3, allowing features to be queried in a reactive way (so they refresh when new config is loaded) if required.  Non-reactive querying is also possible.

## Usage

The `settings` object is documented in the main [f-feature-management](../f-feature-management) module. What this module adds is that the return "Feature Management" object has a property called `reactive`. If you call `featureManagement.reactive.getValue()` from a Vue context, it will be reactive and will be re-evaluated when new config is loaded by the Feature Management SDK.

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

## vue-demi
[vue-demi](https://github.com/vueuse/vue-demi) provides some shims around Vue 2 / 3 to help libs be compatible with either.

For this library we are using the `set()` shim (only exists in Vue2).  There is a shim over `reactive()` for Vue2, which relies on the [composition-api](https://github.com/vuejs/composition-api) and converts the object to a Vue2 proxy (rather than creating a new proxy object, as `reactive()` does in Vue3).

We are not making use of this however, and indeed have not made `@vue/compositionapi` a peer dependency.  The use of the Feature Management instance within a Vue2 app will do this for us, and as long we we use the Vue2 `set()` function all should be well.

__Note: the tests are set up to run under Vue3. We would ideally have the ability to run the tests under Vue2 as well.__
