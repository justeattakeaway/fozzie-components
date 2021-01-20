import { userManagerFactory } from './user-manager-factory';

let tokenPromise = null;

let state = 'unknown';

function reset () {
    tokenPromise = null;
    state = 'unknown';
}

function silentSignIn (OidcClient, settings, force = false) {
    // 1. always check if user exists - could have signed in in another tab.  Create the promise.
    // 2. else if promise exists and we've started the signin process, return that promise (means a login started that didn't end in failure)
    // 3. else change state to "sign-in-started" and use OIDC to get a token, then return that
    // 4. if the sign in fails, null the promise reference, to ensure we try again next time

    const oidcManager = userManagerFactory(OidcClient, settings);

    function doSignIn () {
        if (state === 'unknown') {
            state = 'sign-in-started'; // 3. set state to "sign-in-started"...
        }

        // eslint-disable-next-line no-return-assign
        return tokenPromise = oidcManager
            .signinSilent({ state: 'somestate' }) // 3b ...then start sign in using oidc / token web
            .then(user => {
                state = 'logged-in';
                return user.access_token;
            })
            .catch(error => {
                if (error && error.message === 'login_required') {
                    // subsequent calls to silentSignIn() will continue to return null.
                    // If in fact the customer has logged in to the site, but not had the oidc cookie set, refreshing the page
                    // will get them logged in in this scenario.
                    state = 'anonymous';
                    return null;
                }
                state = 'unknown';
                tokenPromise = null; // 4. set to null to ensure we don't return it next time
                throw error;
            });
    }

    if (force) {
        reset();
        return doSignIn();
    }

    return oidcManager
        .getUser() // 1. check if user exists and create the promise
        .then(user => {
            if (user) {
                return user.access_token;
            }
            if (tokenPromise && state !== 'unknown') {
                // 2. promise exists and we've already started the signin process (a login started that hasn't ended in failure)
                return tokenPromise;
            }
            return doSignIn();
        })
        .catch(() => doSignIn());
}

export { silentSignIn, reset };
