# f-development-context
- f-development-context provides entry points for the WebDriver Demo within components so that they can install the standard context of features
- You shouldn't manually add this to any of your components; the generator will add the devDependency and wire up the WebDriver test scripts automatically

<hr>

## Contexts Added
- **$logger** - The standard way to provide diagnostic output through `this.$logger`
- **$cookies** - The standard way to interact with cookies through `this.$cookies`
- **i18n** - The standard way to localise your components using `<i18n>`, `this.i18n` and `$t('message')`
- **VueX** - The standard way to store state information in components

### $logger Interface
- logError(message, store, additionalProperties)
- logWarn(message, store, additionalProperties)
- logInfo(message, store, additionalProperties)

### $cookies Interface
- Refer to third party documentation: https://www.npmjs.com/package/cookie-universal

### i18n Interface
- Refer to third party documentation: https://kazupon.github.io/vue-i18n/introduction.html

### VueX Interface
- Refer to third party documentation: https://vuex.vuejs.org/guide/
