
const setCookie = (name, value, minutes = 1) => {
    let expires = '';
    const millisecondsPerMinute = 60 * 1000;
    if (minutes) {
        const date = new Date();
        date.setTime(date.getTime() + (minutes * millisecondsPerMinute));
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${(value || '') + expires}; path=/`;
};

export const pushToDataLayer = (category, action, label) => {
    window.trak.event({
        event: 'trackEvent',
        category,
        action,
        label
    });
};

export const setGtmEventCookie = (category, action, label) => {
    setCookie('je-gtm-event', `${category}|${action}|${label}`);
};
