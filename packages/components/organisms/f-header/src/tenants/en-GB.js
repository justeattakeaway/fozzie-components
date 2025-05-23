export default {
    locale: 'en-GB',
    companyName: 'Just Eat',
    openMenuText: 'Open Menu',
    loginNoScriptLinkText: 'Account',
    skipToMainContentText: 'Skip to main content',
    navTitle: 'Main menu',

    navLinks: {
        accountInfo: {
            text: 'Your account',
            url: '/#personalinfo',
            gtm: 'click_account_your_account'
        },
        orderHistory: {
            text: 'Your orders',
            url: '/#order-history',
            gtm: 'click_account_your_orders'
        },
        redeemAGiftcard: {
            text: 'Redeem a gift card',
            url: '/giftcards/redeem',
            gtm: 'click_account_redeem_giftcard'
        },
        redeemVoucher: {
            text: 'Redeem a voucher',
            url: '/account/credit',
            gtm: 'click_account_redeem_voucher'
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
    deliveryEnquiry: {
        text: 'Deliver with Just Eat',
        url: 'https://couriers.just-eat.co.uk/application?utm_source=mainsite&utm_medium=Referral&utm_campaign=RC_M_WS_GBR_EN_[DELCO]_[AWRN]_[OWMD]_[English]',
        gtm: 'click_courier_signup'
    },
    offers: {
        text: 'For you',
        url: '/offers'
    },
    countrySelector: {
        selectYourCountryText: 'Select your country',
        currentCountryKey: 'gb',
        changeCurrentCountry: 'You are on the UK website, click here to change',
        goBackToMainMenu: 'Go back to main menu'
    },
    corporate: {
        text: 'Corporate Ordering',
        url: 'https://business.just-eat.co.uk/what-we-do',
        gtm: 'click_corporate_ordering'
    }
};
