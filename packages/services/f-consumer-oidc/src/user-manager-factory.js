/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import Cookies from 'js-cookie';

export function userManagerFactory ({ UserManager }, settings) {
    const root = `${location.protocol}//${location.host}`;

    function getCookieData () {
        return Cookies.getJSON(settings.cookie_name) || {};
    }

    function setCookieData (obj) {
        Cookies.set(settings.cookie_name, obj); // TODO: expiry
    }

    const userStore = {
        set: function (key, value) {
            const data = getCookieData();
            data[key] = value;
            setCookieData(data);
            return Promise.resolve();
        },
        get: function (key) {
            const data = getCookieData();
            const value = data[key];
            return Promise.resolve(value);
        },
        remove: function (key) {
            const data = getCookieData();
            delete data[key];
            setCookieData(data);
            return Promise.resolve();
        },
        getAllKeys: function () {
            const data = getCookieData();
            const allKeys = [];
            for (const key in data) {
                allKeys.push(key);
            }
            return Promise.resolve(allKeys);
        }
    };


    const defaultSettings = {
        authority: root,
        client_id: 'je_web_native',
        cookie_name: 'je-oidc', // Default cookie name
        response_type: 'code',
        scope: 'openid mobile_scope offline_access',
        silent_redirect_uri: `${root}/tokenweb/content/silent-callback.html`,
        loadUserInfo: false,
        userStore
    };

    const mergedSettings = { ...defaultSettings, ...settings };


    const oidcMgr = new UserManager(mergedSettings);

    return oidcMgr;
}
