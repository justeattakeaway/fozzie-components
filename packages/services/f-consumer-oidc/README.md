This library allows consumer microsites to obtain tokens for interacting with HTTP APIs via Smart Gateway.

## Usage

### Installation and setup

```
npm install @justeat/f-consumer-oidc js-cookie
```

This library has a required `peerDependency` on `js-cookie` (to help reduce the bundle size).

An `Oidc` client object must be passed into the exported functions. This can come from the [`oidc-client`](https://github.com/IdentityModel/oidc-client-js/wiki) npm package or another source e.g. a global variable:

```javascript
import OidcClient from 'oidc-client';

const OidcClient = window.Oidc;
```

To use within a package, it is recommended to install this package as a _peer_ dependency.  This is because the module holds some state to remember the status of logins.  For example if two packages hosted by the same microsite both wanted to get a user token, you wouldn't want them both to go through the whole signin procedure.

### Recommended code

This library takes care of making the decision of whether and how to fetch an OIDC token.  You should call `silentSignIn()` before every Smart Gateway API call. If a token is available without going to TokenWeb, or if there is reason to believe that no token is available (i.e. the user is not logged in), no HTTP token request will be made and the promise will resolve immediately.

If the token turns out to be expired, Smart Gateway will return a 401. Due to the variety of ways the HTTP request could be sent, this library does not help with the detection of the 401.  If a 401 is received, you should call `silentSignIn()` again, this time passing `true` for `force`.  This will bypass the caching and request a new token. 

An example of how a wrapper function that applies these rules every time might look:

```javascript

import { silentSignIn } from '@justeat/je-consumer-oidc';

async function makeApiCall(url) {
    function makeApiCallWithToken(token){
        if (token){ //this assumes we are happy to make the call with no token.
                    //if the functionality always require a token we should do something else if token is null
            headers.Authorization = `Bearer ${token}`;
        }

        return fetch(url, {
            headers,
            credentials: 'include'
        });
    }

    const token = await silentSignIn();

    try {
        return makeApiCallWithToken(token)
    } 
    catch (error) {
        if (error.response && error.response.status === 401){
            var token = await silentSignIn(true);

            return makeApiCallWithToken(token);
        }

        throw error;
    }
    
}

```

## Exports

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

### 2. `userManagerFactory`

This function returns a `UserManager` object from the [`oidc-client`](https://github.com/IdentityModel/oidc-client-js/wiki#usermanager) library,
configured for use in Just Eat.

Usage:
```javascript
import { userManagerFactory } from `@justeat/f-consumer-oidc`;

var userManager = userManagerFactory(OidcClient, optionalSettings);
```
