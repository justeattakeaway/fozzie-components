const MOBILE_NAVIGATION_BAR = '[data-test-id="nav-toggle"]';
const COUNTRY_LINK = 'data-test-id="countrySelector-countryList-';
const IS_NAV_IN_VIEW = '.is-navInView';

const NAVIGATION = {
    corporate: {
        link: '[data-test-id="corporate-link"]'
    },
    offersIcon: {
        link: '[data-test-id="offers-iconLink"]'
    },
    offersLink: {
        link: '[data-test-id="offers-link"]'
    },
    help: {
        link: '[data-test-id="help-link"]'
    },
    delivery: {
        link: '[data-test-id="delivery-enquiry-link"]'
    },
    userAccount: {
        link: '[data-test-id="user-info-link"]'
    },
    countrySelector: {
        link: '[data-test-id="country-selector"]',
        currentIcon: '[data-test-id="current-flag-icon"]',
        countryList: '[data-test-id="countrySelector-list"] li'
    }
};

export {
    MOBILE_NAVIGATION_BAR,
    COUNTRY_LINK,
    IS_NAV_IN_VIEW,
    NAVIGATION
};
