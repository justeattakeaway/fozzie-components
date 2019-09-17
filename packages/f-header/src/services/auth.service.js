/**
 * @overview Auth Service
 *
 * @module auth/service
 */

import { logError } from '@justeat/f-logger';


const storeLocalAnalyticsBlob = result => {
    window.localStorage.setItem('je-analytics', JSON.stringify(result));
    return result;
};

const enrichUserDataWithCount = (userData, orderCountResponse) => {
    userData.orderCount = orderCountResponse.Count;
    return userData;
};

const pushUserData = userData => window.dataLayer.push({ userData });

const fetchOrderCountAndSave = userData => {
    const orderCountLink = document.querySelector('link[rel="ordercountlink"]');
    const orderCountUrl = orderCountLink && orderCountLink.getAttribute('href');

    if (orderCountUrl) {
        return fetch(orderCountUrl, {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(storeLocalAnalyticsBlob)
            .then(result => enrichUserDataWithCount(userData, result))
            .then(pushUserData)
            .catch(err => {
                logError(`Unable to get order count. ${err}`);
                pushUserData(userData);
            });
    }

    pushUserData(userData);
    return Promise.reject();
};

const getLocalAnalyticsBlob = () => window.localStorage.getItem('je-analytics');

const orderCountSupported = () => {
    const supportedEl = document.querySelector('[data-order-count-supported]');
    if (supportedEl && supportedEl.value) {
        // Case insensitive regex test for value="true"
        return /^true$/i.test(supportedEl.value);
    }
    return Promise.reject();
};

export const saveUserData = authData => {
    if (!authData.isAuthenticated) {
        return Promise.resolve();
    }

    const { userData } = authData;

    if (!orderCountSupported()) {
        pushUserData(userData);
        return Promise.resolve();
    }

    const savedAnalytics = getLocalAnalyticsBlob();
    if (!savedAnalytics) {
        return fetchOrderCountAndSave(userData);
    }

    const localOrderCount = JSON.parse(savedAnalytics);
    const currentTime = new Date().getTime();
    const localOrderCountExpires = Date.parse(localOrderCount.Expires);

    if (localOrderCountExpires < currentTime) {
        return fetchOrderCountAndSave(userData);
    }

    enrichUserDataWithCount(userData, localOrderCount);
    pushUserData(userData);

    return Promise.resolve();
};

const removeElement = element => element && element.remove();
const removeHiddenClass = element => element && element.classList.remove('is-hidden');

const updateDom = authData => {
    const authEl = document.querySelector('[data-auth-wrapper]');
    const loginEl = document.querySelector('[data-login]');

    if (authData.isAuthenticated) {
        const headerName = document.querySelector('[data-name]');
        const headerEmail = document.querySelector('[data-email]');

        if (headerName && authData.friendlyName !== '') {
            headerName.textContent = authData.friendlyName;
        }
        if (headerEmail && authData.email !== '') {
            headerEmail.textContent = authData.email;
        }

        removeHiddenClass(authEl);
        removeElement(loginEl);
    } else {
        removeHiddenClass(loginEl);
        removeElement(authEl);
    }

    return authData;
};

/**
 * Checks if authorisation details can be found in the current session hits .net
 * endpoint and is returned valid auth details or no details if not logged in
 */

export const checkForUser = () => {
    const authEl = document.querySelector('[data-auth-wrapper]');

    // if our auth wrapper exists, get our user details
    if (authEl) {
        // this fetch logic will be extracted to a new module
        return fetch('/api/account/details', {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(updateDom)
            .then(saveUserData)
            // should send this error to the f-logger but for now, just errorlog here inline
            .catch(error => {
                logError(error);
            });
    }

    return Promise.resolve();
};
