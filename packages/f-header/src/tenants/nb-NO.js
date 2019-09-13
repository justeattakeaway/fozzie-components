export default {
    locale: 'nb-NO',
    companyName: 'Just Eat',
    openMenuText: 'Open Menu',
    loginNoScriptLinkText: 'Konto',
    skipToMainContentText: 'Hopp til hovedinnhold',

    navLinks: {
        accountInfo: {
            text: 'Kontoinformasjon',
            url: '/account/info',
            gtm: 'click_account_your_account'
        },
        orderHistory: {
            text: 'Ordre',
            url: '/order-history',
            gtm: 'click_account_your_orders'
        },
        accountCredit: {
            text: 'Gavekort saldo',
            url: '/account/credit',
            gtm: 'click_account_credit'
        },
        savedCards: {
            text: 'Betalingsmetoder',
            url: '/member/savedcards',
            gtm: 'click_account_saved_cards'
        },
        addressBook: {
            text: 'Leveringsadresse',
            url: '/account/addressbook',
            gtm: 'click_account_address_books'
        },
        contactPreferences: {
            text: 'Foretrukne kontaktmetode',
            url: '/account/contact-preferences/',
            gtm: 'click_account_contact_preferences'
        }
    },

    logo: {
        gtm: 'click_logo'
    },
    help: {
        text: 'Hjelp',
        url: '/help',
        gtm: 'click_help'
    },
    accountLogin: {
        text: 'Logg inn',
        url: '/account/login?returnurl=',
        gtm: 'click_login'
    },
    accountLogout: {
        text: 'Logg ut',
        url: '/account/logout?returnurl=',
        gtm: 'click_logout'
    },
    deliveryEnquiry: {
        text: 'Deliver with Just Eat',
        url: 'https://couriers.just-eat.co.uk/application?utm_medium=referrer&utm_source=just-eat.co.uk&utm_campaign=ex1140-header',
        gtm: 'click_delivery_job'
    }
};
