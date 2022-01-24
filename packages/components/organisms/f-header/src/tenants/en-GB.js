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
            url: '/member/updateuserinfo',
            gtm: 'click_account_your_account'
        },
        orderHistory: {
            text: 'Your orders',
            url: '/order-history',
            gtm: 'click_account_your_orders'
        },
        savedCards: {
            text: 'Your saved cards',
            url: '/account/paymentoptions',
            gtm: 'click_account_saved_cards'
        },
        addressBook: {
            text: 'Your address book',
            url: '/member/addressbook',
            gtm: 'click_account_address_books'
        },
        redeemAGiftcard: {
            text: 'Redeem a gift card',
            url: '/giftcards/redeem',
            gtm: 'click_account_redeem_giftcard'
        },
        redeemVoucher: {
            text: 'Redeem a voucher',
            url: '/member/useraccount',
            gtm: 'click_account_redeem_voucher'
        },
        contactPreferences: {
            text: 'Contact preferences',
            url: '/account/preferences',
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
        url: 'https://just-eat.co.uk/info/delivering-with-just-eat',
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
    }
};
