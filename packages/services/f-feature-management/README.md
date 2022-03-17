# Feature Management

This service allows querying of feature flags as configured using the Feature
Management service via an injectable Nuxt plugin

## Usage

To create an instance of the service:

```javascript
const featuresService = new FeaturesService(store, {
    httpClient: $axios, // nuxt-axios plugin instance or compliant http client
    cookies: $cookies, // cookie-universal-nuxt plugin or compliant cookie store
    analytics: $gtm, // @justeat/f-analytics instance
    log: $log // See below
});
```

To manually fetch a new configuration file from the CDN:

```javascript
await featuresService.update();
```

To inject as a nuxt plugin:

```javascript
inject('features', featuresService.plugin);
```

## Configuration

The following configuration should be available in the store:

```javascript
{
  scope: 'my-scope', // your team / component scope
  environment: 'development', // development | production
  obfuscationKey: 'xtpEe9PoYlHTv14hJq6m', // key provided with scope
  pollInterval: 1000 * 60 // How frequently config should be polled for in ms
}
```

The service accesses this configuration from the store at the following
location:

```javascript
store.state.configuration.settings.featureManagement
```

## Logging

The log class must provide the following interface:

```javascript

class Log {
  info (message, tags, payload = {}) { ... }

  warn (message, tags, payload = {}) { ... }

  error (message, exception, tags, payload = {}) { ... }
}
```
