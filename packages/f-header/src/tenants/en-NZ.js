export default {
    locale: 'en-NZ',
    companyName: 'Menulog',
    openMenuText: 'Open Menu',
    loginNoScriptLinkText: 'Account',
    skipToMainContentText: 'Skip to main content',

    navLinks: {
        accountInfo: {
            text: 'Account info',
            url: '/account/info',
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
        },
        addressBook: {
            text: 'Delivery addresses',
            url: '/account/addressbook',
            gtm: 'click_account_address_books'
        }
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
        url: '/account/login?returnurl=',
        gtm: 'click_login'
    },
    accountLogout: {
        text: 'Log out',
        url: '/account/logout?returnurl=',
        gtm: 'click_logout'
    },
    deliveryEnquiry: {
        text: 'Deliver with Just Eat',
        url: 'https://couriers.just-eat.co.uk/application?utm_medium=referrer&utm_source=just-eat.co.uk&utm_campaign=ex1140-header',
        gtm: 'click_delivery_job'
    }
};
