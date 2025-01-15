export default {
    locale: 'en-AU',
    companyName: 'Menulog',
    openMenuText: 'Open Menu',
    loginNoScriptLinkText: 'Account',
    skipToMainContentText: 'Skip to main content',
    navTitle: 'Main menu',

    navLinks: {
        accountInfo: {
            text: 'Account info',
            url: '/#personalinfo',
            gtm: 'click_account_your_account'
        },
        orderHistory: {
            text: 'Orders',
            url: '/order-history',
            gtm: 'click_account_your_orders'
        },
        accountCredit: {
            text: 'Account credit',
            url: '/account/credit',
            gtm: 'click_account_credit'
        }
    },

    userMenu: {
        buttonLabel: name => `${name}'s account`
    },

    logo: {
        gtm: 'click_logo'
    },
    help: {
        text: 'Help',
        url: '/help',
        gtm: 'click_help'
    },
    accountLogin: {
        text: 'Log in',
        url: '/account/login',
        gtm: 'click_login'
    },
    accountLogout: {
        text: 'Log out',
        url: '/account/logout',
        gtm: 'click_logout'
    },
    deliveryEnquiry: {
        text: 'Become a courier',
        url: 'https://couriers.menulog.com.au/application?utm_source=mainsite&utm_medium=Referral&utm_campaign=RC_M_WS_AUS_EN_[DELCO]_[AWRN]_[OWMD]_[English]',
        gtm: 'click_courier_signup'
    },
    offers: {
        text: 'For you',
        url: '/offers'
    },
    countrySelector: {
        selectYourCountryText: 'Select your country',
        currentCountryKey: 'au',
        changeCurrentCountry: 'You are on the AU website, click here to change',
        goBackToMainMenu: 'Go back to main menu'
    },
    corporate: {
        text: 'Corporate Ordering',
        url: 'https://www.menulog.com.au/business/',
        gtm: 'click_corporate_ordering'
    }
};
