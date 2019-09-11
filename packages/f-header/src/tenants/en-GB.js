export default {
    locale: 'en-GB',
    companyName: 'Just Eat',
    openMenuText: 'Open Menu',
    loginNoScriptLinkText: 'Account',
    skipToMainContentText: 'Skip to main content',

    navLinks: {
        accountInfo: {
            text: 'Your account',
            url: '/member/updateuserinfo'
        },
        orderHistory: {
            text: 'Your orders',
            url: '/order-history'
        },
        savedCards: {
            text: 'Your saved cards',
            url: '/member/savedcards'
        },
        addressBook: {
            text: 'Your address book',
            url: '/member/addressbook'
        },
        redeemAGiftcard: {
            text: 'Redeem a gift card',
            url: '/giftcards/redeem'
        },
        redeemVoucher: {
            text: 'Redeem a voucher',
            url: '/member/useraccount'
        },
        contactPreferences: {
            text: 'Contact preferences',
            url: '/account/preferences'
        }
    },

    help: {
        text: 'Help',
        url: '/help'
    },
    accountLogin: {
        text: 'Log in',
        url: '/account/login?returnurl='
    },
    accountLogout: {
        text: 'Log out',
        url: '/account/logout?returnurl='
    }
};
