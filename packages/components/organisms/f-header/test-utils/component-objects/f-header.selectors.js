export const HEADER_COMPONENT = '[data-test-id="header-component"]'
export const HEADER_LOGO = '[data-test-id="header-logo"]'
export const MOBILE_NAVIGATION_BAR = '[data-test-id="nav-toggle"]'

export const NAVIGATION = {
    offers: {
        link: '[data-test-id="offers-link"]', 
    },
    help: {
        link: '[data-test-id="help-link"]', 
    },  
    delivery: {
        link: '[data-test-id="delivery-link"]', 
    }, 
    userAccount: {
        link: '[data-test-id="user-info-link"]', 
    }, 
    countrySelector: {
        link: '[data-test-id="country-selector"]', 
        flagsVisible: '[class="c-countrySelector c-nav-list-item has-sublist is-open"]',
        list:  '[class="c-countrySelector-list"]'   }
}

export const FLAGS = {
    gb: {
        id: '[data-test-id="countrySelector-countryList-gb"]'
    }, 
    au: { 
        id: '[data-test-id="countrySelector-countryList-au"]'
    }
    // fr: '[data-test-id="countrySelector-countryList-fr"]',
    // it: '[data-test-id="countrySelector-countryList-it"]',
    // nz: '[data-test-id="countrySelector-countryList-nz"]',
    // es: '[data-test-id="countrySelector-countryList-es"]'
}
