export default {
    locale: 'en-IE',
    companyName: 'Just Eat',
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
            url: '/#order-history',
            gtm: 'click_account_your_orders'
        },
        redeemAGiftcard: {
            text: 'Redeem a gift card',
            url: '/giftcards/redeem',
            gtm: 'click_account_redeem_giftcard'
        },
        contactPreferences: {
            text: 'Contact preferences',
            url: '/#personalinfo',
            gtm: 'click_account_contact_preferences'
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
    offers: {
        text: 'For you',
        url: '/offers'
    },
    countrySelector: {
        selectYourCountryText: 'Select your country',
        currentCountryKey: 'ie',
        changeCurrentCountry: 'You are on the Irish website, click here to change',
        goBackToMainMenu: 'Go back to main menu'
    },
    corporate: {
        text: 'Corporate Ordering',
        url: 'https://business.just-eat.co.uk/just-eat-pay-ie',
        gtm: 'click_corporate_ordering'
    }
};
