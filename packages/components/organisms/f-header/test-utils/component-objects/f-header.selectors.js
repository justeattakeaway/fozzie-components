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
        icons: '[span="c-countrySelector-currentFlag-wrapper"]', 
        open: '[class="c-countrySelector c-nav-list-item has-sublist is-open"]',
        listOfFlags: '[class="c-countrySelector-list"] li'
    }
}
