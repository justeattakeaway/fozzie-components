This library allows consumer microsites to obtain tokens for interacting with HTTP APIs via Smart Gateway.

## Usage

To install directly in a microsite:

```
npm install @justeat/f-consumer-oidc js-cookie
```

This library has a required `peerDependency` on `js-cookie` (to help reduce the bundle size).

There is also a requirement that an `Oidc` client object is passed into the exported functions below, this can come from the [`oidc-client`](https://github.com/IdentityModel/oidc-client-js/wiki) npm package or another source i.e. a global variable e.g.

```javascript
import OidcClient from 'oidc-client';

const OidcClient = window.Oidc;
```

To use within a package, it is recommended to install this as a _peer_ dependency.  This is because the module holds some state to remember the status of logins.  For example if two packages hosted by the same microsite both wanted to get a user token, you wouldn't want them both to go through the whole signin procedure.

The exports are:

### 1. `silentSignIn`

This function attempts to get a valid JWT for the current user.  It works as follows:

* it stores the token in a cookie (`je-oidc`), so if the user has already done this in their session it will retrieve that
* for the page lifetime (i.e. JS variable) it remembers if the user is not logged in, so that it doesn't attempt to get a token repeatedly
* by default it will silently refresh the token close to its expiry time, if possible.  This functionality is built in to [`oidc-client`](https://github.com/IdentityModel/oidc-client-js/wiki).

Usage:

```javascript
import { silentSignIn } from `@justeat/f-consumer-oidc`;

silentSignIn(OidcClient, optionalSettings, force)
    .then((token) => /* will be a valid JWT for use in Auth header or null if user not logged in */ )
    .catch((error) => /* ... */);
```

* `OidcClient` is an instance of the `oidc-client` npm package which needs to be injected in from the consuming application.

  The client is injected in this way to avoid users downloading the client twice; once from the consuming application and then again from the iframe web page.
* `optionalSettings` can override the settings that initialise the `UserManager` object from the [`oidc-client`](https://github.com/IdentityModel/oidc-client-js/wiki#usermanager) library.
* `force` is an optional flag that can be provided to force the signin process to begin, regardless of the current state (defaults to false).

For more detail see flow diagram at bottom of this document.

### 2. `userManagerFactory`

This function returns a `UserManager` object from the [`oidc-client`](https://github.com/IdentityModel/oidc-client-js/wiki#usermanager) library,
configured for use in Just Eat.

Usage:
```javascript
import { userManagerFactory } from `@justeat/f-consumer-oidc`;

var userManager = userManagerFactory(OidcClient, optionalSettings);
```
